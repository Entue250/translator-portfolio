import { getStats } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "label", label: "Label", type: "text", required: true, placeholder: "Years certified" },
  { key: "value", label: "Value", type: "text", required: true, placeholder: "9" },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminStatsPage() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Stats strip</h1>
      <p className="mt-1 text-sm text-slate-500">
        The four small stamped numbers shown right under the hero.
      </p>
      <div className="mt-6">
        <CrudManager
          table="stats"
          fields={fields}
          initialItems={stats}
          titleField="label"
          subtitleField="value"
          emptyItem={{ label: "", value: "", sort_order: 1 }}
        />
      </div>
    </div>
  );
}
