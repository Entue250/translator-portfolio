import { getReferences } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "role", label: "Role", type: "text", required: true },
  { key: "organization", label: "Organization (optional)", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminReferencesPage() {
  const references = await getReferences();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">References</h1>
      <p className="mt-1 text-sm text-slate-500">
        People who can vouch for you, shown on your public site — name, role and organization only
        (no contact details are published).
      </p>
      <div className="mt-6">
        <CrudManager
          table="professional_references"
          fields={fields}
          initialItems={references}
          titleField="name"
          subtitleField="role"
          emptyItem={{
            name: "",
            role: "",
            organization: "",
            sort_order: 1,
          }}
        />
      </div>
    </div>
  );
}
