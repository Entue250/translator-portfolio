import { getPortfolioContent } from "@/lib/data";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { StatsStrip } from "@/components/site/StatsStrip";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { LanguagesSection } from "@/components/site/LanguagesSection";
import { Portfolio } from "@/components/site/Portfolio";
import { ExperienceTimeline } from "@/components/site/ExperienceTimeline";
import { Education } from "@/components/site/Education";
import { Certifications } from "@/components/site/Certifications";
import { References } from "@/components/site/References";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

// Always fetch fresh from Supabase so admin edits go live the moment
// they're saved — no rebuild, no cache invalidation to wait on.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const content = await getPortfolioContent();

  return (
    <>
      <Nav name={content.profile.full_name} resumeUrl={content.profile.resume_url} />
      <main className="flex-1">
        <Hero profile={content.profile} />
        <StatsStrip stats={content.stats} />
        <About profile={content.profile} />
        <Services services={content.services} />
        <LanguagesSection languages={content.languages} />
        <Portfolio projects={content.projects} />
        <ExperienceTimeline experience={content.experience} />
        <Education education={content.education} />
        <Certifications certifications={content.certifications} />
        <References references={content.references} />
        <Contact profile={content.profile} />
      </main>
      <Footer profile={content.profile} />
    </>
  );
}
