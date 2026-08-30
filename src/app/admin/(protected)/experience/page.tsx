import { getExperience } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "role", label: "Role", type: "text", required: true },
  { key: "organization", label: "Organization", type: "text", required: true },
  { key: "location", label: "Location", type: "text" },
  { key: "start_date", label: "Start date", type: "date", required: true },
  { key: "end_date", label: "End date (leave blank if current)", type: "date" },
  { key: "is_current", label: "This is my current role", type: "checkbox" },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminExperiencePage() {
  const experience = await getExperience();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Experience</h1>
      <p className="mt-1 text-sm text-slate-500">The entry/exit ledger on your public site.</p>
      <div className="mt-6">
        <CrudManager
          table="experience"
          fields={fields}
          initialItems={experience}
          titleField="role"
          subtitleField="organization"
          emptyItem={{
            role: "",
            organization: "",
            location: "",
            start_date: "",
            end_date: null,
            is_current: false,
            description: "",
            sort_order: 1,
          }}
        />
      </div>
    </div>
  );
}
