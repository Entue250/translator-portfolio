"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const labelClass = "block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1.5";
const baseInputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500";

export function TextField({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input className={baseInputClass} {...props} />
    </label>
  );
}

export function TextAreaField({
  label,
  ...props
}: { label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea className={baseInputClass + " min-h-24"} {...props} />
    </label>
  );
}

export function SelectField({
  label,
  options,
  ...props
}: { label: string; options: string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <select className={baseInputClass} {...props}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckboxField({
  label,
  ...props
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-700 select-none">
      <input type="checkbox" className="h-4 w-4 rounded border-slate-300" {...props} />
      {label}
    </label>
  );
}
