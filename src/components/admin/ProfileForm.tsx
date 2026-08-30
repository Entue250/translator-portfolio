"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { TextField, TextAreaField, CheckboxField } from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { Profile } from "@/lib/types";

export function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();
  const [values, setValues] = useState<Profile>(profile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const { id, ...payload } = values;
      const { error: updateError } = await supabase
        .from("profile")
        .update(payload)
        .eq("id", id);
      if (updateError) throw updateError;
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save your profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">Identity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="Full name"
            value={values.full_name}
            onChange={(e) => set("full_name", e.target.value)}
          />
          <TextField
            label="Headline"
            value={values.headline}
            onChange={(e) => set("headline", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <ImageUploader
            label="Profile photo"
            value={values.photo_url}
            onChange={(url) => set("photo_url", url)}
          />
        </div>
        <div className="mt-4">
          <TextAreaField
            label="Short bio (used in the hero section & page description)"
            value={values.bio_short}
            onChange={(e) => set("bio_short", e.target.value)}
          />
        </div>
        <div className="mt-4">
          <TextAreaField
            label="Full bio (used in the About section)"
            rows={6}
            value={values.bio_long}
            onChange={(e) => set("bio_long", e.target.value)}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="Location"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
          />
          <TextField
            label="Years of experience"
            type="number"
            value={values.years_experience}
            onChange={(e) => set("years_experience", Number(e.target.value))}
          />
        </div>
        <div className="mt-4">
          <CheckboxField
            label="Available for new projects (shows the badge on the homepage)"
            checked={values.available_for_work}
            onChange={(e) => set("available_for_work", e.target.checked)}
          />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">Contact details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="Email"
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <TextField
            label="Phone"
            value={values.phone ?? ""}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">Social links</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="LinkedIn URL"
            value={values.linkedin_url ?? ""}
            onChange={(e) => set("linkedin_url", e.target.value)}
          />
          <TextField
            label="X / Twitter URL"
            value={values.twitter_url ?? ""}
            onChange={(e) => set("twitter_url", e.target.value)}
          />
          <TextField
            label="Instagram URL"
            value={values.instagram_url ?? ""}
            onChange={(e) => set("instagram_url", e.target.value)}
          />
          <TextField
            label="WhatsApp URL"
            value={values.whatsapp_url ?? ""}
            onChange={(e) => set("whatsapp_url", e.target.value)}
          />
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-800">
          Hero interlinear gloss (the animated two-line quote)
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextField
            label="Source language code"
            placeholder="FR"
            value={values.hero_source_lang ?? ""}
            onChange={(e) => set("hero_source_lang", e.target.value)}
          />
          <TextField
            label="Target language code"
            placeholder="EN"
            value={values.hero_target_lang ?? ""}
            onChange={(e) => set("hero_target_lang", e.target.value)}
          />
          <TextField
            label="Source line"
            value={values.hero_source_text ?? ""}
            onChange={(e) => set("hero_source_text", e.target.value)}
          />
          <TextField
            label="Translated line"
            value={values.hero_target_text ?? ""}
            onChange={(e) => set("hero_target_text", e.target.value)}
          />
        </div>
      </section>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        {saved && <span className="text-sm text-emerald-600">Saved — live on your site now.</span>}
      </div>
    </div>
  );
}
