import { listActiveCampaigns, listConfirmedDonations, listPendingDonations } from "../../../../lib/db";
import { addAdminDonationAction, confirmDonationAction } from "../../../../lib/actions";
import { getLang, translations } from "../../../../lib/i18n";
import DeleteDonationButton from "../../../components/DeleteDonationButton";

export const runtime = "nodejs";

export default async function AdminDonationsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const pendingDonations = await listPendingDonations();
  const confirmedDonations = await listConfirmedDonations();
  const campaigns = await listActiveCampaigns();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-moss-900">{copy.admin.donations.addTitle}</h2>
          <span className="text-xs text-moss-500">{copy.admin.donations.addHint}</span>
        </div>
        <form className="mt-4 grid gap-3 lg:grid-cols-[1fr_200px_auto]" action={addAdminDonationAction}>
          <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="name" placeholder={copy.admin.donations.fields.name} required />
          <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="amount" type="number" min="1" placeholder={copy.admin.donations.fields.amount} required />
          <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white" type="submit">{copy.admin.donations.fields.submit}</button>
          <select className="lg:col-span-3 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="campaignId">
            <option value="">{copy.admin.donations.fields.campaign}</option>
            {campaigns.map((campaign) => (
              <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
            ))}
          </select>
          <input className="lg:col-span-3 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="bkashNumber" placeholder={copy.admin.donations.fields.bkash} required />
          <input className="lg:col-span-3 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="transactionId" placeholder={copy.admin.donations.fields.trx} required />
          <textarea className="lg:col-span-3 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="note" placeholder={copy.admin.donations.fields.note} rows={2} />
        </form>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-moss-900">{copy.admin.donations.pendingTitle}</h2>
          <span className="text-xs text-moss-500">{copy.admin.donations.pendingHint}</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-moss-600">
              <tr>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.name}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.amount}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.bkash}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.trx}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.confirm}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.delete}</th>
              </tr>
            </thead>
            <tbody>
              {pendingDonations.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-moss-500">{copy.admin.donations.table.empty}</td>
                </tr>
              )}
              {pendingDonations.map((donation) => (
                <tr key={donation.id} className="border-t border-moss-100">
                  <td className="py-3 font-medium text-moss-800">{donation.name}</td>
                  <td className="py-3 text-moss-700">BDT {donation.amount}</td>
                  <td className="py-3 text-moss-700">{donation.bkash_number}</td>
                  <td className="py-3 text-moss-700">{donation.transaction_id}</td>
                <td className="py-3">
                  <form action={confirmDonationAction}>
                    <input type="hidden" name="id" value={donation.id} />
                    <button className="rounded-full bg-gold-400 px-4 py-2 text-xs font-semibold text-[#1a1a1a]" type="submit">{copy.admin.donations.confirm}</button>
                  </form>
                </td>
                <td className="py-3">
                  <DeleteDonationButton
                    id={donation.id}
                    label={copy.admin.donations.delete}
                    confirmTitle={copy.admin.donations.deleteTitle}
                    confirmMessage={copy.admin.donations.deleteMessage}
                    cancelLabel={copy.admin.donations.deleteCancel}
                    confirmLabel={copy.admin.donations.deleteConfirm}
                  />
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-moss-900">{copy.admin.donations.confirmedTitle}</h2>
          <span className="text-xs text-moss-500">{copy.admin.donations.confirmedHint}</span>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-moss-600">
              <tr>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.name}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.amount}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.bkash}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.trx}</th>
                <th className="pb-3 text-left font-semibold">{copy.admin.donations.table.delete}</th>
              </tr>
            </thead>
            <tbody>
              {confirmedDonations.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-moss-500">{copy.admin.donations.table.empty}</td>
                </tr>
              )}
              {confirmedDonations.map((donation) => (
                <tr key={donation.id} className="border-t border-moss-100">
                  <td className="py-3 font-medium text-moss-800">{donation.name}</td>
                  <td className="py-3 text-moss-700">BDT {donation.amount}</td>
                  <td className="py-3 text-moss-700">{donation.bkash_number}</td>
                  <td className="py-3 text-moss-700">{donation.transaction_id}</td>
                  <td className="py-3">
                    <DeleteDonationButton
                      id={donation.id}
                      label={copy.admin.donations.delete}
                      confirmTitle={copy.admin.donations.deleteTitle}
                      confirmMessage={copy.admin.donations.deleteMessage}
                      cancelLabel={copy.admin.donations.deleteCancel}
                      confirmLabel={copy.admin.donations.deleteConfirm}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
