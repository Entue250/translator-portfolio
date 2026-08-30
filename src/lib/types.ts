export type Profile = {
  id: number;
  full_name: string;
  headline: string;
  bio_short: string;
  bio_long: string;
  photo_url: string | null;
  email: string;
  phone: string | null;
  location: string;
  years_experience: number;
  resume_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  whatsapp_url: string | null;
  proz_url: string | null;
  hero_source_text: string | null;
  hero_source_lang: string | null;
  hero_target_text: string | null;
  hero_target_lang: string | null;
  available_for_work: boolean;
};

export type Stat = {
  id: number;
  label: string;
  value: string;
  sort_order: number;
};

export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
};

export type Language = {
  id: number;
  name: string;
  code: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Working";
  direction: string;
  sort_order: number;
};

export type Experience = {
  id: number;
  role: string;
  organization: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  sort_order: number;
};

export type Education = {
  id: number;
  degree: string;
  institution: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  sort_order: number;
};

export type Certification = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  credential_url: string | null;
  sort_order: number;
};

export type Project = {
  id: number;
  title: string;
  category: string;
  language_pair: string;
  description: string;
  image_url: string | null;
  link_url: string | null;
  featured: boolean;
  sort_order: number;
};

export type Reference = {
  id: number;
  name: string;
  role: string;
  organization: string | null;
  sort_order: number;
};

export type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  language_pair: string | null;
  created_at: string;
  read: boolean;
};

export type PortfolioContent = {
  profile: Profile;
  stats: Stat[];
  services: ServiceItem[];
  languages: Language[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  references: Reference[];
};
