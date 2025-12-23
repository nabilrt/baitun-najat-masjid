import { listHadiths } from "../../../../lib/db";
import { addHadithAction, deleteHadithAction } from "../../../../lib/actions";
import { getLang, translations } from "../../../../lib/i18n";

export const runtime = "nodejs";

export default async function AdminHadithsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const hadiths = await listHadiths();

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-lg font-semibold text-moss-900">{copy.admin.hadiths.title}</h2>
      <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px_auto]" action={addHadithAction}>
        <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="text" placeholder={copy.admin.hadiths.fields.text} required />
        <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="source" placeholder={copy.admin.hadiths.fields.source} required />
        <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white" type="submit">{copy.admin.hadiths.add}</button>
      </form>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="text-moss-600">
            <tr>
              <th className="pb-3 text-left font-semibold">{copy.admin.hadiths.table.text}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.hadiths.table.source}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.hadiths.table.remove}</th>
            </tr>
          </thead>
          <tbody>
            {hadiths.map((hadith) => (
              <tr key={hadith.id} className="border-t border-moss-100">
                <td className="py-3 text-moss-800">{hadith.text}</td>
                <td className="py-3 text-moss-600">{hadith.source}</td>
                <td className="py-3">
                  <form action={deleteHadithAction}>
                    <input type="hidden" name="id" value={hadith.id} />
                    <button className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700" type="submit">{copy.admin.hadiths.delete}</button>
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
