import Link from "next/link";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Inbox, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

async function getOverviewData() {
  if (!isSupabaseConfigured()) {
    return { messageCount: 0, unreadCount: 0, recent: [] as { id: number; name: string; subject: string; created_at: string; read: boolean }[] };
  }
  const supabase = await createClient();
  const [{ count: messageCount }, { count: unreadCount }, { data: recent }] = await Promise.all([
    supabase.from("messages").select("*", { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }).eq("read", false),
    supabase
      .from("messages")
      .select("id, name, subject, created_at, read")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  return {
    messageCount: messageCount ?? 0,
    unreadCount: unreadCount ?? 0,
    recent: recent ?? [],
  };
}

export default async function AdminOverviewPage() {
  const configured = isSupabaseConfigured();
  const { messageCount, unreadCount, recent } = await getOverviewData();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
      <p className="mt-1 text-sm text-slate-500">
        Every change you save here goes live on the public site immediately.
      </p>

      {!configured && (
        <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Supabase isn&apos;t connected yet — the public site is showing demo content. Add your
          Supabase keys to <code className="rounded bg-amber-100 px-1">.env.local</code> and run
          the schema in <code className="rounded bg-amber-100 px-1">supabase/schema.sql</code>{" "}
          to start editing for real. See the README for step-by-step instructions.
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total messages
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{messageCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Unread</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{unreadCount}</p>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">Recent inquiries</h2>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="mt-3 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
          {recent.length === 0 && (
            <li className="flex items-center gap-3 p-6 text-sm text-slate-400">
              <Inbox className="h-4 w-4" /> No messages yet.
            </li>
          )}
          {recent.map((m) => (
            <li key={m.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-slate-800">{m.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{m.subject}</p>
              </div>
              {!m.read && (
                <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                  New
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
