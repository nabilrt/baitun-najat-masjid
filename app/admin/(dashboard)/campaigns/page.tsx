import { listAllCampaignsWithTotals } from "../../../../lib/db";
import { addCampaignAction, archiveCampaignAction, restoreCampaignAction } from "../../../../lib/actions";
import { getLang, translations } from "../../../../lib/i18n";

export const runtime = "nodejs";

export default async function AdminCampaignsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const campaigns = await listAllCampaignsWithTotals();

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-lg font-semibold text-moss-900">{copy.admin.campaigns.title}</h2>
      <form className="mt-4 grid gap-3 lg:grid-cols-[1fr_260px_auto]" action={addCampaignAction}>
        <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="title" placeholder={copy.admin.campaigns.fields.title} required />
        <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="goalAmount" type="number" min="1" placeholder={copy.admin.campaigns.fields.goal} />
        <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white" type="submit">{copy.admin.campaigns.create}</button>
        <textarea className="lg:col-span-3 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="description" placeholder={copy.admin.campaigns.fields.description} rows={3} required />
      </form>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[980px] text-sm">
          <thead className="text-moss-600">
            <tr>
              <th className="pb-3 text-left font-semibold">{copy.admin.campaigns.table.title}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.campaigns.table.goal}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.campaigns.table.progress}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.campaigns.table.status}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.campaigns.table.assets}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.campaigns.table.action}</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-moss-500">{copy.admin.campaigns.table.empty}</td>
              </tr>
            )}
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-t border-moss-100">
                <td className="py-3 text-moss-800">{campaign.title}</td>
                <td className="py-3 text-moss-600">{campaign.goal_amount ? `BDT ${campaign.goal_amount}` : "—"}</td>
                <td className="py-3 text-moss-600">
                  {campaign.goal_amount ? (
                    <div>
                      <div className="flex justify-between text-xs text-moss-500">
                        <span>BDT {campaign.total_confirmed}</span>
                        <span>{Math.min(100, Math.round((campaign.total_confirmed / campaign.goal_amount) * 100))}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-moss-100">
                        <div
                          className="h-2 rounded-full bg-gold-400"
                          style={{ width: `${Math.min(100, Math.round((campaign.total_confirmed / campaign.goal_amount) * 100))}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span>BDT {campaign.total_confirmed}</span>
                  )}
                </td>
                <td className="py-3 text-moss-600">{campaign.is_active ? copy.admin.campaigns.active : copy.admin.campaigns.archived}</td>
                <td className="py-3 text-moss-600">
                  <div className="flex flex-wrap gap-2">
                    <a
                      className="rounded-full border border-moss-200 px-3 py-2 text-xs font-semibold text-moss-700"
                      href={lang === "bn" ? `/admin/campaigns/${campaign.id}/qr?lang=bn` : `/admin/campaigns/${campaign.id}/qr`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.admin.campaigns.qrEn}
                    </a>
                    <a
                      className="rounded-full border border-moss-200 px-3 py-2 text-xs font-semibold text-moss-700"
                      href={`/admin/campaigns/${campaign.id}/qr?lang=bn`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.admin.campaigns.qrBn}
                    </a>
                    <a
                      className="rounded-full bg-moss-600 px-3 py-2 text-xs font-semibold text-white"
                      href={lang === "bn" ? `/admin/campaigns/${campaign.id}/poster?lang=bn` : `/admin/campaigns/${campaign.id}/poster`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.admin.campaigns.posterEn}
                    </a>
                    <a
                      className="rounded-full bg-moss-600 px-3 py-2 text-xs font-semibold text-white"
                      href={`/admin/campaigns/${campaign.id}/poster?lang=bn`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.admin.campaigns.posterBn}
                    </a>
                  </div>
                </td>
                <td className="py-3">
                  {campaign.is_active ? (
                    <form action={archiveCampaignAction}>
                      <input type="hidden" name="id" value={campaign.id} />
                      <button className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700" type="submit">{copy.admin.campaigns.archive}</button>
                    </form>
                  ) : (
                    <form action={restoreCampaignAction}>
                      <input type="hidden" name="id" value={campaign.id} />
                      <button className="rounded-full bg-moss-600 px-4 py-2 text-xs font-semibold text-white" type="submit">{copy.admin.campaigns.restore}</button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
