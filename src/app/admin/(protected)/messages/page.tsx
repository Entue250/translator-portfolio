import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { MessagesInbox } from "@/components/admin/MessagesInbox";
import type { Message } from "@/lib/types";

export const dynamic = "force-dynamic";

async function getMessages(): Promise<Message[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Message[]) ?? [];
}

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Inbox</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every contact-form submission, saved here in addition to being emailed to you.
      </p>
      <div className="mt-6">
        <MessagesInbox initialMessages={messages} />
      </div>
    </div>
  );
}
