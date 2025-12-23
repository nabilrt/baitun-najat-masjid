import fs from "fs";
import path from "path";
import { createClient } from "@libsql/client";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const index = trimmed.indexOf("=");
    if (index === -1) return;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^\"|\"$/g, "");
    if (!process.env[key]) process.env[key] = value;
  });
}

const args = new Set(process.argv.slice(2));
const force = args.has("--force");

const dbPath = path.join(process.cwd(), "data", "baitun-najat.db");
loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env"));
if (!fs.existsSync(dbPath)) {
  console.error(`Local DB not found at ${dbPath}.`);
  process.exit(1);
}

const tursoUrl = process.env.TURSO_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;
if (!tursoUrl || !tursoToken) {
  console.error("TURSO_URL and TURSO_AUTH_TOKEN must be set.");
  process.exit(1);
}

const source = createClient({ url: `file:${dbPath}` });
const dest = createClient({ url: tursoUrl, authToken: tursoToken });

async function exec(client, sql, args = []) {
  return client.execute({ sql, args });
}

async function ensureSchema() {
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
    await exec(dest, sql);
  }
}

async function tableHasRows(table) {
  const res = await exec(dest, `SELECT COUNT(*) as count FROM ${table}`);
  return Number(res.rows[0]?.count ?? 0) > 0;
}

async function maybeClear() {
  const tables = ["display_links", "donations", "announcements", "hadiths", "campaigns", "prayer_times"];
  for (const table of tables) {
    if (await tableHasRows(table)) {
      if (!force) {
        console.error(`Destination table '${table}' is not empty. Re-run with --force to overwrite.`);
        process.exit(1);
      }
      await exec(dest, `DELETE FROM ${table}`);
    }
  }
}

async function copyTable(table, columns) {
  const res = await exec(source, `SELECT ${columns.join(", ")} FROM ${table}`);
  const placeholders = columns.map(() => "?").join(", ");
  const sql = `INSERT INTO ${table} (${columns.join(", ")}) VALUES (${placeholders})`;

  for (const row of res.rows) {
    const values = columns.map((col) => row[col]);
    await exec(dest, sql, values);
  }
  console.log(`Copied ${res.rows.length} rows into ${table}.`);
}

async function main() {
  await ensureSchema();
  await maybeClear();

  await copyTable("prayer_times", ["id", "name", "name_bn", "azan_time", "prayer_time"]);
  await copyTable("hadiths", ["id", "text", "source", "created_at"]);
  await copyTable("campaigns", [
    "id",
    "title",
    "description",
    "goal_amount",
    "slug",
    "share_token",
    "is_active",
    "created_at",
    "archived_at"
  ]);
  await copyTable("donations", [
    "id",
    "name",
    "amount",
    "bkash_number",
    "transaction_id",
    "note",
    "campaign_id",
    "created_at",
    "confirmed",
    "confirmed_at"
  ]);
  await copyTable("announcements", [
    "id",
    "title",
    "title_bn",
    "message",
    "message_bn",
    "start_at",
    "end_at",
    "is_active",
    "created_at"
  ]);
  const displayRows = await exec(source, "SELECT COUNT(*) as count FROM display_links");
  if (Number(displayRows.rows[0]?.count ?? 0) > 0) {
    await copyTable("display_links", ["id", "slug", "token", "created_at"]);
  }

  console.log("Migration completed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
