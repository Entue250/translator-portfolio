"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Message } from "@/lib/types";

export function MessagesInbox({ initialMessages }: { initialMessages: Message[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initialMessages);
  const [openId, setOpenId] = useState<number | null>(null);

  async function toggleRead(m: Message) {
    const supabase = createClient();
    await supabase.from("messages").update({ read: !m.read }).eq("id", m.id);
    setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, read: !x.read } : x)));
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this message?")) return;
    const supabase = createClient();
    await supabase.from("messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((x) => x.id !== id));
    router.refresh();
  }

  function openMessage(m: Message) {
    setOpenId(openId === m.id ? null : m.id);
    if (!m.read) toggleRead(m);
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
        No messages yet — inquiries submitted through your contact form will land here.
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
      {messages.map((m) => (
        <li key={m.id}>
          <div className="flex items-start gap-4 p-4">
            <button
              onClick={() => openMessage(m)}
              className="flex flex-1 items-start gap-4 text-left min-w-0"
            >
              {m.read ? (
                <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
              ) : (
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-slate-900" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className={`truncate text-sm ${m.read ? "font-normal text-slate-600" : "font-semibold text-slate-900"}`}>
                    {m.name} <span className="text-slate-400 font-normal">· {m.email}</span>
                  </p>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(m.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-0.5 truncate text-sm text-slate-500">{m.subject}</p>
                {openId === m.id && (
                  <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm text-slate-700 whitespace-pre-wrap">
                    {m.language_pair && (
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                        Language pair: {m.language_pair}
                      </p>
                    )}
                    {m.message}
                  </div>
                )}
              </div>
            </button>
            <button
              onClick={() => handleDelete(m.id)}
              aria-label="Delete message"
              className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
