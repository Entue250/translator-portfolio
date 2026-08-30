"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "media";

export function ImageUploader({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: false });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5">
        {label}
      </span>

      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt=""
            width={140}
            height={140}
            className="h-28 w-28 rounded-md border border-slate-300 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -right-2 -top-2 rounded-full bg-slate-900 p-1 text-white"
            aria-label="Remove image"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <label className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-2 border-dashed border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-500">
          <UploadCloud className="h-5 w-5" />
          <span className="text-[11px]">{uploading ? "Uploading…" : "Upload"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      )}
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
