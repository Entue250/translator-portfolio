import { getCertifications } from "@/lib/data";
import { CrudManager, type FieldDef } from "@/components/admin/CrudManager";

export const dynamic = "force-dynamic";

const fields: FieldDef[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "issuer", label: "Issuer", type: "text", required: true },
  { key: "year", label: "Year", type: "text", required: true, placeholder: "2020" },
  { key: "credential_url", label: "Credential URL (optional)", type: "text" },
  { key: "sort_order", label: "Order", type: "number" },
];

export default async function AdminCertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Certifications</h1>
      <p className="mt-1 text-sm text-slate-500">Credentials shown on your public site.</p>
      <div className="mt-6">
        <CrudManager
          table="certifications"
          fields={fields}
          initialItems={certifications}
          titleField="title"
          subtitleField="issuer"
          emptyItem={{ title: "", issuer: "", year: "", credential_url: "", sort_order: 1 }}
        />
      </div>
    </div>
  );
}
