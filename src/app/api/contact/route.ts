import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getProfile } from "@/lib/data";
import { isMailerConfigured, sendContactAutoReply, sendContactNotification } from "@/lib/mailer";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z.string().trim().min(2, "Please add a short subject.").max(150),
  message: z.string().trim().min(10, "Please write a bit more about your request.").max(5000),
  languagePair: z.string().trim().max(120).optional(),
  // Honeypot field: real visitors never fill this in.
  company: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message ?? "Invalid submission.";
    return NextResponse.json({ error: firstIssue }, { status: 400 });
  }

  const { name, email, subject, message, languagePair } = parsed.data;

  // Always persist the message so it shows up in the admin inbox,
  // even if outbound email happens to fail.
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.from("messages").insert({
        name,
        email,
        subject,
        message,
        language_pair: languagePair || null,
      });
    } catch {
      // Non-fatal: we still try to send the email below.
    }
  }

  if (isMailerConfigured()) {
    try {
      const profile = await getProfile();
      await sendContactNotification({
        toEmail: profile.email,
        fromName: name,
        fromEmail: email,
        subject,
        message,
        languagePair,
      });
      await sendContactAutoReply({
        toEmail: email,
        toName: name,
        ownerName: profile.full_name,
      });
    } catch (err) {
      console.error("Failed to send contact email:", err);
      return NextResponse.json(
        {
          error:
            "Your message was saved, but the email notification couldn't be sent. It will still be reviewed.",
        },
        { status: 207 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
