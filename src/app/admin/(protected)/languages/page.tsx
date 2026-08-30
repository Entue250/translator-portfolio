import { getLanguages } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "name", label: "Language name", type: "text", required: true, placeholder: "French" },
  { key: "code", label: "Code", type: "text", required: true, placeholder: "FR" },
  {
    key: "proficiency",
    label: "Proficiency",
    type: "select",
    options: ["Native", "Fluent", "Professional", "Working"],
  },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminLanguagesPage() {
  const languages = await getLanguages();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Languages</h1>
      <p className="mt-1 text-sm text-slate-500">
        The visa-stamp language pairs shown on your public site.
      </p>
      <div className="mt-6">
        <CrudManager
          table="languages"
          fields={fields}
          initialItems={languages}
          titleField="name"
          subtitleField="proficiency"
          emptyItem={{ name: "", code: "", proficiency: "Professional", direction: "⇄", sort_order: 1 }}
        />
      </div>
    </div>
  );
}
