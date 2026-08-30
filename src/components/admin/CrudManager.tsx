"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/admin/FormFields";
import { ImageUploader } from "@/components/admin/ImageUploader";

export type FieldType = "text" | "textarea" | "number" | "checkbox" | "select" | "image" | "date";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

type Row = { id: number; [key: string]: unknown };

export function CrudManager({
  table,
  fields,
  initialItems,
  titleField,
  subtitleField,
  emptyItem,
  orderField = "sort_order",
}: {
  table: string;
  fields: FieldDef[];
  initialItems: Row[];
  titleField: string;
  subtitleField?: string;
  emptyItem: Record<string, unknown>;
  orderField?: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState<Row[]>(initialItems);
  const [editingId, setEditingId] = useState<number | "new" | null>(null);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    const supabase = createClient();
    const { data } = await supabase
      .from(table)
      .select("*")
      .order(orderField, { ascending: true });
    if (data) setItems(data as Row[]);
    router.refresh();
  }

  function startCreate() {
    setEditingId("new");
    setFormValues({ ...emptyItem, [orderField]: items.length + 1 });
    setError(null);
  }

  function startEdit(item: Row) {
    setEditingId(item.id);
    setFormValues({ ...item });
    setError(null);
  }

  function cancel() {
    setEditingId(null);
    setFormValues({});
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      for (const field of fields) {
        if (field.required && !String(formValues[field.key] ?? "").trim()) {
          throw new Error(`"${field.label}" is required.`);
        }
      }

      const supabase = createClient();
      const payload = { ...formValues };
      delete payload.id;
      delete payload.created_at;

      if (editingId === "new") {
        const { error: insertError } = await supabase.from(table).insert(payload);
        if (insertError) throw insertError;
      } else {
        const { error: updateError } = await supabase
          .from(table)
          .update(payload)
          .eq("id", editingId);
        if (updateError) throw updateError;
      }

      await refresh();
      cancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save this item.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from(table).delete().eq("id", id);
    if (deleteError) {
      alert(deleteError.message);
      return;
    }
    await refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{items.length} item{items.length === 1 ? "" : "s"}</p>
        <button
          onClick={startCreate}
          className="inline-flex items-center gap-1.5 rounded-md bg-slate-900 px-3.5 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          <Plus className="h-4 w-4" /> Add new
        </button>
      </div>

      {editingId !== null && (
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800">
              {editingId === "new" ? "New item" : "Edit item"}
            </h3>
            <button onClick={cancel} aria-label="Cancel" className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const value = formValues[field.key];
              if (field.type === "image") {
                return (
                  <div key={field.key} className="sm:col-span-2">
                    <ImageUploader
                      label={field.label}
                      value={(value as string) ?? null}
                      onChange={(url) => setFormValues((v) => ({ ...v, [field.key]: url }))}
                    />
                  </div>
                );
              }
              if (field.type === "textarea") {
                return (
                  <div key={field.key} className="sm:col-span-2">
                    <TextAreaField
                      label={field.label}
                      value={(value as string) ?? ""}
                      placeholder={field.placeholder}
                      onChange={(e) => setFormValues((v) => ({ ...v, [field.key]: e.target.value }))}
                    />
                  </div>
                );
              }
              if (field.type === "select") {
                return (
                  <SelectField
                    key={field.key}
                    label={field.label}
                    options={field.options ?? []}
                    value={(value as string) ?? field.options?.[0]}
                    onChange={(e) => setFormValues((v) => ({ ...v, [field.key]: e.target.value }))}
                  />
                );
              }
              if (field.type === "checkbox") {
                return (
                  <CheckboxField
                    key={field.key}
                    label={field.label}
                    checked={Boolean(value)}
                    onChange={(e) => setFormValues((v) => ({ ...v, [field.key]: e.target.checked }))}
                  />
                );
              }
              return (
                <TextField
                  key={field.key}
                  label={field.label}
                  type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                  placeholder={field.placeholder}
                  value={(value as string | number) ?? ""}
                  onChange={(e) =>
                    setFormValues((v) => ({
                      ...v,
                      [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value,
                    }))
                  }
                />
              );
            })}
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={cancel}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul className="mt-6 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {items.length === 0 && (
          <li className="p-6 text-center text-sm text-slate-400">
            Nothing here yet — add your first item.
          </li>
        )}
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-800">
                {String(item[titleField] ?? "Untitled")}
              </p>
              {subtitleField && (
                <p className="truncate text-xs text-slate-500 mt-0.5">
                  {String(item[subtitleField] ?? "")}
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => startEdit(item)}
                aria-label="Edit"
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                aria-label="Delete"
                className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
