import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  Certification,
  Education,
  Experience,
  Language,
  PortfolioContent,
  Profile,
  Project,
  Reference,
  ServiceItem,
  Stat,
} from "@/lib/types";

/**
 * DEMO CONTENT
 * -------------------------------------------------------------
 * Shown until Supabase is connected (see supabase/schema.sql +
 * README) or for any table an admin hasn't populated yet, so the
 * site always looks complete instead of breaking or showing gaps.
 */

const demoProfile: Profile = {
  id: 1,
  full_name: "Blaise Umurengezi",
  headline: "Translator · Interpreter · Transcriptionist · Subtitler",
  bio_short:
    "Final-year Translation & Interpreting student at the University of Rwanda, delivering accurate, culturally sensitive translation, transcription, subtitling and interpreting across Kinyarwanda, English, French and Kiswahili.",
  bio_long:
    "I'm a Translation and Interpreting student in my final year at the University of Rwanda, working across Kinyarwanda, English, French and Kiswahili. Since 2022 I've translated and transcribed documents and media for individual and institutional clients across East Africa, subtitled films and educational content, and trained in consecutive and simultaneous conference interpreting through a rigorous academic programme. I'm ICDL-certified in digital skills and committed to work that is linguistically accurate and culturally sensitive — for clients anywhere in the world.",
  photo_url: null,
  email: "matuidiblaise692@gmail.com",
  phone: "+250 788 584 711",
  location: "Musanze, Northern Province, Rwanda",
  years_experience: 4,
  resume_url: "/Blaise-Umurengezi-CV.pdf",
  linkedin_url: null,
  twitter_url: null,
  instagram_url: null,
  whatsapp_url: "https://wa.me/250788584711",
  proz_url: null,
  hero_source_text: null,
  hero_source_lang: null,
  hero_target_text: null,
  hero_target_lang: null,
  available_for_work: true,
};

const demoStats: Stat[] = [
  { id: 1, label: "Years of experience", value: "4+", sort_order: 1 },
  { id: 2, label: "Languages spoken", value: "4", sort_order: 2 },
  { id: 3, label: "Interpreting modes", value: "2", sort_order: 3 },
  { id: 4, label: "Digital skills certified", value: "ICDL", sort_order: 4 },
];

const demoServices: ServiceItem[] = [
  {
    id: 1,
    title: "Translation & Localization",
    description:
      "English, French, Kiswahili and Kinyarwanda translation for individual and institutional clients — documents, correspondence and content adapted with cultural accuracy.",
    icon: "globe",
    sort_order: 1,
  },
  {
    id: 2,
    title: "Consecutive & Simultaneous Interpreting",
    description:
      "Conference-style interpreting in both consecutive and simultaneous modes, developed through a rigorous university programme in Translation & Interpreting.",
    icon: "mic",
    sort_order: 2,
  },
  {
    id: 3,
    title: "Audio & Video Transcription",
    description:
      "Accurate multilingual transcription of audio and video content for media, academic and corporate clients, maintaining accuracy and confidentiality.",
    icon: "document",
    sort_order: 3,
  },
  {
    id: 4,
    title: "Subtitling & Captioning",
    description:
      "Timed, broadcast-ready subtitles and captions for films, educational videos and online content, adapting dialogue for cultural relevance and timing precision.",
    icon: "captions",
    sort_order: 4,
  },
  {
    id: 5,
    title: "Terminology Research & Glossary Management",
    description:
      "Building and maintaining glossaries and terminology across legal, literary, medical and technical domains for consistent, high-quality translation.",
    icon: "book",
    sort_order: 5,
  },
  {
    id: 6,
    title: "Digital Skills Training",
    description:
      "ICDL-certified support in spreadsheets, documents, presentations, cyber security and online collaboration tools for individuals and community members.",
    icon: "check",
    sort_order: 6,
  },
];

const demoLanguages: Language[] = [
  { id: 1, name: "Kinyarwanda", code: "RW", proficiency: "Native", direction: "⇄", sort_order: 1 },
  { id: 2, name: "English", code: "EN", proficiency: "Fluent", direction: "⇄", sort_order: 2 },
  { id: 3, name: "French", code: "FR", proficiency: "Fluent", direction: "⇄", sort_order: 3 },
  { id: 4, name: "Kiswahili", code: "SW", proficiency: "Fluent", direction: "⇄", sort_order: 4 },
];

const demoExperience: Experience[] = [
  {
    id: 1,
    role: "Freelance Translator & Transcriptionist",
    organization: "Self-Employed (Remote)",
    location: null,
    start_date: "2022-01-01",
    end_date: null,
    is_current: true,
    description:
      "Provide English↔Kinyarwanda, English↔French and Kiswahili↔English translation for individual and institutional clients across East Africa. Transcribe audio and video content for media, academic and corporate clients, and create subtitles and captions for films, educational videos and online content.",
    sort_order: 1,
  },
  {
    id: 2,
    role: "Academic Interpreter & Language Practitioner",
    organization: "University of Rwanda — Department of Translation & Interpreting",
    location: null,
    start_date: "2022-01-01",
    end_date: null,
    is_current: true,
    description:
      "Participate in simulated conference interpreting sessions (consecutive and simultaneous modes). Conduct comparative linguistic analysis across Kinyarwanda, English, French and Kiswahili, and collaborate on translation projects covering legal, literary, medical and technical subject matter using CAT tools and terminology management.",
    sort_order: 2,
  },
  {
    id: 3,
    role: "Digital Skills Facilitator (Volunteer)",
    organization: "Community & Peer Support",
    location: "Musanze, Rwanda",
    start_date: "2023-01-01",
    end_date: null,
    is_current: true,
    description:
      "Assist community members with basic computer literacy, building on ICDL-certified expertise in spreadsheets, documents, presentations and online collaboration. Support peers in using Google Suite and MS Office for academic and professional purposes.",
    sort_order: 3,
  },
];

const demoEducation: Education[] = [
  {
    id: 1,
    degree: "Bachelor's Degree — Translation and Interpreting",
    institution: "University of Rwanda",
    location: null,
    start_date: "2022-01-01",
    end_date: "2026-12-31",
    is_current: true,
    description:
      "Final-year coursework spanning legal, literary, medical and technical translation, CAT tools and terminology management, plus simulated conference interpreting in consecutive and simultaneous modes. (Expected 2026.)",
    sort_order: 1,
  },
  {
    id: 2,
    degree: "Advanced Diploma — Literature in English, Kinyarwanda & Kiswahili",
    institution: "Groupe Scolaire Muhoza I",
    location: null,
    start_date: "2018-01-01",
    end_date: "2021-12-31",
    is_current: false,
    description: "",
    sort_order: 2,
  },
  {
    id: 3,
    degree: "Secondary Level Certificate",
    institution: "Groupe Scolaire Karwasa",
    location: null,
    start_date: "2015-01-01",
    end_date: "2017-12-31",
    is_current: false,
    description: "",
    sort_order: 3,
  },
  {
    id: 4,
    degree: "Primary Level Certificate",
    institution: "Groupe Scolaire Karwasa",
    location: null,
    start_date: "2009-01-01",
    end_date: "2015-12-31",
    is_current: false,
    description: "",
    sort_order: 4,
  },
];

const demoCertifications: Certification[] = [
  {
    id: 1,
    title: "ICDL Profile Certificate",
    issuer: "ICDL Africa — Spreadsheets, Computer & Online Essentials, Cyber Security, Online Collaboration, Presentation, Documents",
    year: "2023",
    credential_url: null,
    sort_order: 1,
  },
];

const demoProjects: Project[] = [
  {
    id: 1,
    title: "Legal & Institutional Translation",
    category: "Legal",
    language_pair: "EN ⇄ RW / FR",
    description:
      "Translating contracts, official correspondence and institutional documents for individual and institutional clients across East Africa, maintaining accuracy and strict confidentiality.",
    image_url: null,
    link_url: null,
    featured: true,
    sort_order: 1,
  },
  {
    id: 2,
    title: "Media & Academic Transcription",
    category: "Media",
    language_pair: "Multilingual",
    description:
      "Transcribing audio and video content in multiple languages for media, academic and corporate clients, preserving accuracy across dialects and registers.",
    image_url: null,
    link_url: null,
    featured: true,
    sort_order: 2,
  },
  {
    id: 3,
    title: "Subtitling & Captioning",
    category: "Media",
    language_pair: "Multilingual",
    description:
      "Creating timed, culturally adapted subtitles and captions for films, educational videos and online content.",
    image_url: null,
    link_url: null,
    featured: false,
    sort_order: 3,
  },
  {
    id: 4,
    title: "Academic Translation Coursework",
    category: "Academic",
    language_pair: "EN ⇄ FR / RW / SW",
    description:
      "Collaborative translation projects spanning legal, literary, medical and technical subject matter, completed with peers and faculty at the University of Rwanda.",
    image_url: null,
    link_url: null,
    featured: false,
    sort_order: 4,
  },
];

const demoReferences: Reference[] = [
  {
    id: 1,
    name: "Assoc. Prof. Pierre Canisius Ruterana",
    role: "Lecturer",
    organization: "University of Rwanda",
    sort_order: 1,
  },
  {
    id: 2,
    name: "Dr. Augustin Rudacogora",
    role: "Lecturer",
    organization: "University of Rwanda",
    sort_order: 2,
  },
  {
    id: 3,
    name: "Mrs. Sony Primitive Musabyimana",
    role: "Teacher",
    organization: null,
    sort_order: 3,
  },
];

/** Generic helper: return Supabase rows, or the demo fallback if empty/unavailable. */
async function fetchTable<T>(
  table: string,
  fallback: T[],
  orderBy = "sort_order"
): Promise<T[]> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: true });
    if (error || !data || data.length === 0) return fallback;
    return data as T[];
  } catch {
    return fallback;
  }
}

export async function getProfile(): Promise<Profile> {
  if (!isSupabaseConfigured()) return demoProfile;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", 1)
      .single();
    if (error || !data) return demoProfile;
    return data as Profile;
  } catch {
    return demoProfile;
  }
}

export const getStats = () => fetchTable<Stat>("stats", demoStats);
export const getServices = () => fetchTable<ServiceItem>("services", demoServices);
export const getLanguages = () => fetchTable<Language>("languages", demoLanguages);
export const getExperience = () =>
  fetchTable<Experience>("experience", demoExperience, "sort_order");
export const getEducation = () =>
  fetchTable<Education>("education", demoEducation, "sort_order");
export const getCertifications = () =>
  fetchTable<Certification>("certifications", demoCertifications);
export const getProjects = () => fetchTable<Project>("projects", demoProjects);
export const getReferences = () =>
  fetchTable<Reference>("professional_references", demoReferences);

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const [profile, stats, services, languages, experience, education, certifications, projects, references] =
    await Promise.all([
      getProfile(),
      getStats(),
      getServices(),
      getLanguages(),
      getExperience(),
      getEducation(),
      getCertifications(),
      getProjects(),
      getReferences(),
    ]);
  return {
    profile,
    stats,
    services,
    languages,
    experience,
    education,
    certifications,
    projects,
    references,
  };
}
