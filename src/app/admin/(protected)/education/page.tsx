import { getEducation } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "degree", label: "Degree / certificate", type: "text", required: true },
  { key: "institution", label: "Institution", type: "text", required: true },
  { key: "location", label: "Location", type: "text" },
  { key: "start_date", label: "Start date", type: "date", required: true },
  { key: "end_date", label: "End date (leave blank if current)", type: "date" },
  { key: "is_current", label: "Currently studying here", type: "checkbox" },
  { key: "description", label: "Description (optional)", type: "textarea" },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminEducationPage() {
  const education = await getEducation();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Education</h1>
      <p className="mt-1 text-sm text-slate-500">The academic transcript on your public site.</p>
      <div className="mt-6">
        <CrudManager
          table="education"
          fields={fields}
          initialItems={education}
          titleField="degree"
          subtitleField="institution"
          emptyItem={{
            degree: "",
            institution: "",
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
