import { createClient, type Client, type InArgs } from "@libsql/client";
import crypto from "crypto";

type PrayerTime = {
  id: number;
  name: string;
  name_bn: string | null;
  azan_time: string;
  prayer_time: string;
};

type Hadith = {
  id: number;
  text: string;
  source: string;
  created_at: string;
};

type Donation = {
  id: number;
  name: string;
  amount: number;
  bkash_number: string;
  transaction_id: string;
  note: string | null;
  campaign_id: number | null;
  created_at: string;
  confirmed: number;
  confirmed_at: string | null;
};

type Campaign = {
  id: number;
  title: string;
  description: string;
  goal_amount: number | null;
  slug: string;
  share_token: string | null;
  is_active: number;
  created_at: string;
  archived_at: string | null;
};

type CampaignWithTotals = Campaign & {
  total_confirmed: number;
};

type Announcement = {
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

type DisplayLink = {
  id: number;
  slug: string;
  token: string;
  created_at: string;
};

let client: Client | null = null;
let initPromise: Promise<void> | null = null;

function getClient() {
  if (!client) {
    const url = process.env.TURSO_URL || "file:./data/baitun-najat.db";
    const authToken = process.env.TURSO_AUTH_TOKEN;
    client = createClient({ url, authToken });
  }
  return client;
}

async function exec(sql: string, args: InArgs = []) {
  return getClient().execute({ sql, args });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function uniqueCampaignSlug(title: string) {
  const base = slugify(title) || "campaign";
  let slug = base;
  let index = 1;
  while (true) {
    const res = await exec("SELECT COUNT(*) as count FROM campaigns WHERE slug = ?", [slug]);
    const count = Number((res.rows[0]?.count ?? 0) as number);
    if (count === 0) return slug;
    slug = `${base}-${index}`;
    index += 1;
  }
}

async function uniqueShareToken() {
  while (true) {
    const token = crypto.randomBytes(8).toString("base64url");
    const res = await exec("SELECT COUNT(*) as count FROM campaigns WHERE share_token = ?", [token]);
    const count = Number((res.rows[0]?.count ?? 0) as number);
    if (count === 0) return token;
  }
}

async function initDb() {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    const statements = [
      `CREATE TABLE IF NOT EXISTS prayer_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        name_bn TEXT,
        azan_time TEXT NOT NULL,
        prayer_time TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS hadiths (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        source TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        bkash_number TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        note TEXT,
        campaign_id INTEGER,
        created_at TEXT NOT NULL,
        confirmed INTEGER NOT NULL DEFAULT 0,
        confirmed_at TEXT,
        FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
      )`,
      `CREATE TABLE IF NOT EXISTS campaigns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        goal_amount INTEGER,
        slug TEXT,
        share_token TEXT,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        archived_at TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS announcements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        title_bn TEXT,
        message TEXT NOT NULL,
        message_bn TEXT,
        start_at TEXT NOT NULL,
        end_at TEXT NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS display_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        token TEXT NOT NULL,
        created_at TEXT NOT NULL
      )`
    ];

    for (const sql of statements) {
      await exec(sql);
    }

    const prayerCount = await exec("SELECT COUNT(*) as count FROM prayer_times");
    if (Number(prayerCount.rows[0]?.count ?? 0) === 0) {
      const defaults = [
        ["Fajr", "ফজর", "04:20 AM", "04:35 AM"],
        ["Dhuhr", "যোহর", "12:40 PM", "12:55 PM"],
        ["Asr", "আসর", "04:30 PM", "04:45 PM"],
        ["Maghrib", "মাগরিব", "06:25 PM", "06:30 PM"],
        ["Isha", "এশা", "07:45 PM", "08:00 PM"],
        ["Jumu'ah", "জুমুআ", "01:05 PM", "01:30 PM"]
      ];
      for (const row of defaults) {
        await exec("INSERT INTO prayer_times (name, name_bn, azan_time, prayer_time) VALUES (?, ?, ?, ?)", row);
      }
    }

    const hadithCount = await exec("SELECT COUNT(*) as count FROM hadiths");
    if (Number(hadithCount.rows[0]?.count ?? 0) === 0) {
      const now = new Date().toISOString();
      const defaults = [
        [
          "The most beloved deeds to Allah are those that are consistent, even if small.",
          "Sahih al-Bukhari 6464"
        ],
        ["The best among you are those who learn the Qur'an and teach it.", "Sahih al-Bukhari 5027"],
        ["Whoever builds a mosque for Allah, Allah will build for him a house in Paradise.", "Sahih Muslim 533"]
      ];
      for (const row of defaults) {
        await exec("INSERT INTO hadiths (text, source, created_at) VALUES (?, ?, ?)", [row[0], row[1], now]);
      }
    }

    const campaignCount = await exec("SELECT COUNT(*) as count FROM campaigns");
    if (Number(campaignCount.rows[0]?.count ?? 0) === 0) {
      const now = new Date().toISOString();
      const defaults = [
        [
          "Renovation & Prayer Hall Upgrade",
          "Help us renovate the main prayer hall, improve lighting, and replace worn carpets.",
          150000
        ],
        [
          "Qur'an Learning Support",
          "Support our evening Qur'an classes with books, materials, and teacher honorariums.",
          60000
        ]
      ];
      for (const row of defaults) {
        const slug = slugify(String(row[0]));
        const token = await uniqueShareToken();
        await exec(
          "INSERT INTO campaigns (title, description, goal_amount, slug, share_token, is_active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)",
          [row[0], row[1], row[2], slug, token, now]
        );
      }
    }

    const emptySlugs = await exec("SELECT id, title FROM campaigns WHERE slug IS NULL OR slug = ''");
    for (const row of emptySlugs.rows) {
      const slug = await uniqueCampaignSlug(String(row.title));
      await exec("UPDATE campaigns SET slug = ? WHERE id = ?", [slug, row.id]);
    }

    const emptyTokens = await exec("SELECT id FROM campaigns WHERE share_token IS NULL OR share_token = ''");
    for (const row of emptyTokens.rows) {
      const token = await uniqueShareToken();
      await exec("UPDATE campaigns SET share_token = ? WHERE id = ?", [token, row.id]);
    }

    const missingPrayerBn = await exec("SELECT id, name FROM prayer_times WHERE name_bn IS NULL OR name_bn = ''");
    const map: Record<string, string> = {
      Fajr: "ফজর",
      Dhuhr: "যোহর",
      Asr: "আসর",
      Maghrib: "মাগরিব",
      Isha: "এশা",
      "Jumu'ah": "জুমুআ"
    };
    for (const row of missingPrayerBn.rows) {
      const name = String(row.name);
      await exec("UPDATE prayer_times SET name_bn = ? WHERE id = ?", [map[name] ?? name, row.id]);
    }

    const displayCount = await exec("SELECT COUNT(*) as count FROM display_links WHERE slug = 'prayer-display'");
    if (Number(displayCount.rows[0]?.count ?? 0) === 0) {
      const token = await uniqueDisplayToken();
      const now = new Date().toISOString();
      await exec("INSERT INTO display_links (slug, token, created_at) VALUES (?, ?, ?)", [
        "prayer-display",
        token,
        now
      ]);
    }
  })();
  return initPromise;
}

async function uniqueDisplayToken() {
  while (true) {
    const token = crypto.randomBytes(8).toString("base64url");
    const res = await exec("SELECT COUNT(*) as count FROM display_links WHERE token = ?", [token]);
    const count = Number((res.rows[0]?.count ?? 0) as number);
    if (count === 0) return token;
  }
}

export async function listPrayerTimes(): Promise<PrayerTime[]> {
  await initDb();
  const res = await exec("SELECT * FROM prayer_times ORDER BY id");
  return res.rows as unknown as PrayerTime[];
}

export async function updatePrayerTime(id: number, nameBn: string, azanTime: string, prayerTime: string) {
  await initDb();
  await exec("UPDATE prayer_times SET name_bn = ?, azan_time = ?, prayer_time = ? WHERE id = ?", [
    nameBn,
    azanTime,
    prayerTime,
    id
  ]);
}

export async function listHadiths(): Promise<Hadith[]> {
  await initDb();
  const res = await exec("SELECT * FROM hadiths ORDER BY created_at DESC");
  return res.rows as unknown as Hadith[];
}

export async function addHadith(text: string, source: string) {
  await initDb();
  const now = new Date().toISOString();
  await exec("INSERT INTO hadiths (text, source, created_at) VALUES (?, ?, ?)", [text, source, now]);
}

export async function deleteHadith(id: number) {
  await initDb();
  await exec("DELETE FROM hadiths WHERE id = ?", [id]);
}

export async function addDonation(data: {
  name: string;
  amount: number;
  bkashNumber: string;
  transactionId: string;
  note?: string;
  campaignId?: number | null;
}) {
  await initDb();
  const now = new Date().toISOString();
  await exec(
    "INSERT INTO donations (name, amount, bkash_number, transaction_id, note, campaign_id, created_at, confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, 0)",
    [
      data.name,
      data.amount,
      data.bkashNumber,
      data.transactionId,
      data.note ?? null,
      data.campaignId ?? null,
      now
    ]
  );
}

export async function addConfirmedDonation(data: {
  name: string;
  amount: number;
  bkashNumber: string;
  transactionId: string;
  note?: string;
  campaignId?: number | null;
}) {
  await initDb();
  const now = new Date().toISOString();
  await exec(
    "INSERT INTO donations (name, amount, bkash_number, transaction_id, note, campaign_id, created_at, confirmed, confirmed_at) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)",
    [
      data.name,
      data.amount,
      data.bkashNumber,
      data.transactionId,
      data.note ?? null,
      data.campaignId ?? null,
      now,
      now
    ]
  );
}

export async function listConfirmedDonations(): Promise<Donation[]> {
  await initDb();
  const res = await exec(
    "SELECT * FROM donations WHERE confirmed = 1 ORDER BY confirmed_at DESC, created_at DESC"
  );
  return res.rows as unknown as Donation[];
}

export async function listPendingDonations(): Promise<Donation[]> {
  await initDb();
  const res = await exec("SELECT * FROM donations WHERE confirmed = 0 ORDER BY created_at DESC");
  return res.rows as unknown as Donation[];
}

export async function confirmDonation(id: number) {
  await initDb();
  const now = new Date().toISOString();
  await exec("UPDATE donations SET confirmed = 1, confirmed_at = ? WHERE id = ?", [now, id]);
}

export async function deleteDonation(id: number) {
  await initDb();
  await exec("DELETE FROM donations WHERE id = ?", [id]);
}

export async function listActiveCampaigns(): Promise<Campaign[]> {
  await initDb();
  const res = await exec("SELECT * FROM campaigns WHERE is_active = 1 ORDER BY created_at DESC");
  return res.rows as unknown as Campaign[];
}

export async function listAllCampaigns(): Promise<Campaign[]> {
  await initDb();
  const res = await exec("SELECT * FROM campaigns ORDER BY created_at DESC");
  return res.rows as unknown as Campaign[];
}

export async function addCampaign(data: { title: string; description: string; goalAmount?: number | null }) {
  await initDb();
  const now = new Date().toISOString();
  const slug = await uniqueCampaignSlug(data.title);
  const token = await uniqueShareToken();
  await exec(
    "INSERT INTO campaigns (title, description, goal_amount, slug, share_token, is_active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)",
    [data.title, data.description, data.goalAmount ?? null, slug, token, now]
  );
}

export async function archiveCampaign(id: number) {
  await initDb();
  const now = new Date().toISOString();
  await exec("UPDATE campaigns SET is_active = 0, archived_at = ? WHERE id = ?", [now, id]);
}

export async function restoreCampaign(id: number) {
  await initDb();
  await exec("UPDATE campaigns SET is_active = 1, archived_at = NULL WHERE id = ?", [id]);
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  await initDb();
  const res = await exec("SELECT * FROM campaigns WHERE slug = ?", [slug]);
  return (res.rows[0] as unknown as Campaign | undefined) ?? null;
}

export async function getCampaignById(id: number): Promise<Campaign | null> {
  await initDb();
  const res = await exec("SELECT * FROM campaigns WHERE id = ?", [id]);
  return (res.rows[0] as unknown as Campaign | undefined) ?? null;
}

export async function getCampaignByShareToken(token: string): Promise<Campaign | null> {
  await initDb();
  const res = await exec("SELECT * FROM campaigns WHERE share_token = ?", [token]);
  return (res.rows[0] as unknown as Campaign | undefined) ?? null;
}

export async function getDisplayLinkBySlug(slug: string): Promise<DisplayLink | null> {
  await initDb();
  const res = await exec("SELECT * FROM display_links WHERE slug = ?", [slug]);
  return (res.rows[0] as unknown as DisplayLink | undefined) ?? null;
}

export async function getDisplayLinkByToken(token: string): Promise<DisplayLink | null> {
  await initDb();
  const res = await exec("SELECT * FROM display_links WHERE token = ?", [token]);
  return (res.rows[0] as unknown as DisplayLink | undefined) ?? null;
}

export async function listActiveCampaignsWithTotals(): Promise<CampaignWithTotals[]> {
  await initDb();
  const res = await exec(
    `SELECT c.*, COALESCE(SUM(d.amount), 0) as total_confirmed
     FROM campaigns c
     LEFT JOIN donations d ON d.campaign_id = c.id AND d.confirmed = 1
     WHERE c.is_active = 1
     GROUP BY c.id
     ORDER BY c.created_at DESC`
  );
  return res.rows as unknown as CampaignWithTotals[];
}

export async function listAllCampaignsWithTotals(): Promise<CampaignWithTotals[]> {
  await initDb();
  const res = await exec(
    `SELECT c.*, COALESCE(SUM(d.amount), 0) as total_confirmed
     FROM campaigns c
     LEFT JOIN donations d ON d.campaign_id = c.id AND d.confirmed = 1
     GROUP BY c.id
     ORDER BY c.created_at DESC`
  );
  return res.rows as unknown as CampaignWithTotals[];
}

export async function getCampaignBySlugWithTotals(slug: string): Promise<CampaignWithTotals | null> {
  await initDb();
  const res = await exec(
    `SELECT c.*, COALESCE(SUM(d.amount), 0) as total_confirmed
     FROM campaigns c
     LEFT JOIN donations d ON d.campaign_id = c.id AND d.confirmed = 1
     WHERE c.slug = ?
     GROUP BY c.id`,
    [slug]
  );
  return (res.rows[0] as unknown as CampaignWithTotals | undefined) ?? null;
}

export async function listActiveAnnouncements(nowIso: string): Promise<Announcement[]> {
  await initDb();
  const res = await exec(
    `SELECT * FROM announcements
     WHERE is_active = 1 AND start_at <= ? AND end_at >= ?
     ORDER BY start_at DESC`,
    [nowIso, nowIso]
  );
  return res.rows as unknown as Announcement[];
}

export async function listAllAnnouncements(): Promise<Announcement[]> {
  await initDb();
  const res = await exec("SELECT * FROM announcements ORDER BY created_at DESC");
  return res.rows as unknown as Announcement[];
}

export async function addAnnouncement(data: {
  title: string;
  titleBn?: string | null;
  message: string;
  messageBn?: string | null;
  startAt: string;
  endAt: string;
}) {
  await initDb();
  const now = new Date().toISOString();
  await exec(
    "INSERT INTO announcements (title, title_bn, message, message_bn, start_at, end_at, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?)",
    [data.title, data.titleBn ?? null, data.message, data.messageBn ?? null, data.startAt, data.endAt, now]
  );
}

export async function archiveAnnouncement(id: number) {
  await initDb();
  await exec("UPDATE announcements SET is_active = 0 WHERE id = ?", [id]);
}

export async function restoreAnnouncement(id: number) {
  await initDb();
  await exec("UPDATE announcements SET is_active = 1 WHERE id = ?", [id]);
}

export async function deleteAnnouncement(id: number) {
  await initDb();
  await exec("DELETE FROM announcements WHERE id = ?", [id]);
}
