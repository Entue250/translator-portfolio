import { getProfile } from "@/lib/data";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Profile</h1>
      <p className="mt-1 text-sm text-slate-500">
        This powers the hero, about section, and contact details on your public site.
      </p>
      <div className="mt-6">
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
