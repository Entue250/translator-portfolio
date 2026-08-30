import { getProjects } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  {
    key: "category",
    label: "Category",
    type: "select",
    options: ["Legal", "Literary", "Medical", "Localization", "Technical", "Media", "Academic", "Marketing", "Other"],
  },
  { key: "language_pair", label: "Language pair", type: "text", required: true, placeholder: "EN → FR" },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "image_url", label: "Image", type: "image" },
  { key: "link_url", label: "Reference link (optional)", type: "text" },
  { key: "featured", label: "Featured project", type: "checkbox" },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Portfolio</h1>
      <p className="mt-1 text-sm text-slate-500">The case-file cards shown on your public site.</p>
      <div className="mt-6">
        <CrudManager
          table="projects"
          fields={fields}
          initialItems={projects}
          titleField="title"
          subtitleField="language_pair"
          emptyItem={{
            title: "",
            category: "Legal",
            language_pair: "",
            description: "",
            image_url: null,
            link_url: "",
            featured: false,
            sort_order: 1,
          }}
        />
      </div>
    </div>
  );
}
