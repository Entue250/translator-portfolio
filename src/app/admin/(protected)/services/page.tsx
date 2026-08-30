import { getServices } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  {
    key: "icon",
    label: "Icon",
    type: "select",
    options: ["stamp", "mic", "book", "globe", "captions", "check", "document", "languages"],
  },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Services</h1>
      <p className="mt-1 text-sm text-slate-500">The service cards shown on your public site.</p>
      <div className="mt-6">
        <CrudManager
          table="services"
          fields={fields}
          initialItems={services}
          titleField="title"
          subtitleField="description"
          emptyItem={{ title: "", icon: "stamp", description: "", sort_order: 1 }}
        />
      </div>
    </div>
  );
}
