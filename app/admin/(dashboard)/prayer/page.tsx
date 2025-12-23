import { listPrayerTimes } from "../../../../lib/db";
import { updatePrayerTimeAction } from "../../../../lib/actions";
import { getLang, translations } from "../../../../lib/i18n";
import SavedAlert from "../SavedAlert";

export const runtime = "nodejs";

export default async function AdminPrayerPage({ searchParams }: { searchParams?: { lang?: string; saved?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const prayerTimes = await listPrayerTimes();

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      {searchParams?.saved === "1" && <SavedAlert message={copy.admin.prayer.updated} />}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-moss-900">{copy.admin.prayer.title}</h2>
        <span className="text-xs text-moss-500">{copy.admin.prayer.hint}</span>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-moss-600">
            <tr>
              <th className="pb-3 text-left font-semibold">{copy.admin.prayer.table.prayer}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.prayer.table.prayerBn}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.prayer.table.adhan}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.prayer.table.iqamah}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.prayer.table.update}</th>
            </tr>
          </thead>
          <tbody>
            {prayerTimes.map((time) => (
              <tr key={time.id} className="border-t border-moss-100">
                <td className="py-3 font-medium text-moss-800">{time.name}</td>
                <td className="py-3">
                  <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-3 py-2 text-sm" form={`prayer-${time.id}`} name="nameBn" defaultValue={time.name_bn ?? ""} />
                </td>
                <td className="py-3">
                  <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-3 py-2 text-sm" form={`prayer-${time.id}`} name="azanTime" defaultValue={time.azan_time} />
                </td>
                <td className="py-3">
                  <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-3 py-2 text-sm" form={`prayer-${time.id}`} name="prayerTime" defaultValue={time.prayer_time} />
                </td>
                <td className="py-3">
                  <form action={updatePrayerTimeAction} id={`prayer-${time.id}`}>
                    <input type="hidden" name="id" value={time.id} />
                    <input type="hidden" name="lang" value={lang} />
                    <button className="rounded-full bg-moss-600 px-4 py-2 text-xs font-semibold text-white" type="submit">{copy.admin.prayer.save}</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
