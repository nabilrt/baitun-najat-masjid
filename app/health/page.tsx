import { listPrayerTimes } from "../../lib/db";

export const runtime = "nodejs";

export default async function HealthPage() {
  const times = await listPrayerTimes();
  const ok = times.length > 0;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="rounded-3xl bg-white p-8 shadow-soft text-center">
        <div className={`text-2xl font-semibold ${ok ? "text-moss-700" : "text-red-600"}`}>
          {ok ? "OK" : "DB Error"}
        </div>
        <div className="mt-2 text-sm text-moss-600">Health check for DB connectivity.</div>
      </div>
    </main>
  );
}
