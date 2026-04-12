export type PrayerTime = {
  id: number;
  name: string;
  name_bn: string | null;
  azan_time: string;
  prayer_time: string;
};

export type Announcement = {
  id: number;
  title: string;
  title_bn: string | null;
  message: string;
  message_bn: string | null;
  start_at: string;
  end_at: string;
  is_active: number;
  created_at: string;
};

export type Campaign = {
  id: number;
  title: string;
  description: string;
  goal_amount: number | null;
  slug: string;
  share_token: string | null;
  is_active: number;
  created_at: string;
  archived_at: string | null;
  total_confirmed: number;
};

export type Hadith = {
  id: number;
  text: string;
  text_bn: string | null;
  source: string;
  source_bn: string | null;
  category: string | null;
  category_bn: string | null;
  created_at: string;
};

export type AppConfig = {
  brand: {
    name: string;
    address: string;
  };
  contact: {
    title: string;
    address: string;
    contact: string;
    phone: string;
    email: string;
    website: string;
    quick: string;
    quickItems: string[];
  };
  bkashNumber: string;
  menu: Array<{ key: string; label: string; enabled: boolean }>;
  features: Record<string, boolean>;
};

export type HomeResponse = {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    friday: string;
    highlightsTitle: string;
    highlights: string[];
  };
  prayer: {
    title: string;
    subtitle: string;
    items: PrayerTime[];
  };
  announcements: Announcement[];
  campaigns: Campaign[];
  hadith: {
    title: string;
    subtitle: string;
    items: Hadith[];
  };
  guides: {
    title: string;
    subtitle: string;
    items: Array<{ key: string; title: string; subtitle: string }>;
  };
};

export type GuidesResponse = {
  namazGuide: {
    title: string;
    subtitle: string;
    rakahTitle: string;
    rakahNote: string;
    rakahItems: Array<{ name: string; detail: string }>;
    rulesTitle: string;
    rules: string[];
    duasTitle: string;
    transliterationEnLabel: string;
    transliterationBnLabel: string;
    meaningEnLabel: string;
    meaningBnLabel: string;
    hadithLabel: string;
    specialTitle: string;
    specialSubtitle: string;
    duasItems: Array<{
      name: string;
      arabic: string;
      transliterationEn: string;
      translationEn: string;
      transliterationBn: string;
      translationBn: string;
    }>;
    specialItems: Array<{
      name: string;
      arabic: string;
      transliterationEn: string;
      translationEn: string;
      transliterationBn: string;
      translationBn: string;
      hadiths: Array<{ text: string; ref: string }>;
    }>;
  };
  hadithLibrary: {
    title: string;
    subtitle: string;
    categories: Array<{ title: string; items: Array<{ text: string; ref: string }> }>;
  };
};
