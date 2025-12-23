import { listAllAnnouncements } from "../../../../lib/db";
import {
  addAnnouncementAction,
  archiveAnnouncementAction,
  deleteAnnouncementAction,
  restoreAnnouncementAction
} from "../../../../lib/actions";
import { getLang, translations } from "../../../../lib/i18n";

export const runtime = "nodejs";

export default async function AdminAnnouncementsPage({ searchParams }: { searchParams?: { lang?: string } }) {
  const lang = getLang(searchParams?.lang);
  const copy = translations[lang];
  const announcements = await listAllAnnouncements();

  return (
    <div className="rounded-3xl bg-white p-5 shadow-soft sm:p-6">
      <h2 className="text-lg font-semibold text-moss-900">{copy.admin.announcements.title}</h2>
      <form className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]" action={addAnnouncementAction}>
        <input
          className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
          name="title"
          placeholder={copy.admin.announcements.fields.title}
          required
        />
        <input
          className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
          name="titleBn"
          placeholder={copy.admin.announcements.fields.titleBn}
        />
        <div className="grid gap-2">
          <label className="text-xs font-semibold text-moss-600">{copy.admin.announcements.fields.start}</label>
          <input
            className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
            type="datetime-local"
            name="startAt"
            required
          />
        </div>
        <div className="grid gap-2">
          <label className="text-xs font-semibold text-moss-600">{copy.admin.announcements.fields.end}</label>
          <input
            className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
            type="datetime-local"
            name="endAt"
            required
          />
        </div>
        <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white" type="submit">
          {copy.admin.announcements.create}
        </button>
        <textarea
          className="lg:col-span-2 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
          name="message"
          placeholder={copy.admin.announcements.fields.message}
          rows={3}
          required
        />
        <textarea
          className="lg:col-span-2 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
          name="messageBn"
          placeholder={copy.admin.announcements.fields.messageBn}
          rows={3}
        />
      </form>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="text-moss-600">
            <tr>
              <th className="pb-3 text-left font-semibold">{copy.admin.announcements.table.title}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.announcements.table.period}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.announcements.table.status}</th>
              <th className="pb-3 text-left font-semibold">{copy.admin.announcements.table.action}</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-moss-500">{copy.admin.announcements.table.empty}</td>
              </tr>
            )}
            {announcements.map((announcement) => (
              <tr key={announcement.id} className="border-t border-moss-100">
                <td className="py-3 text-moss-800">
                  <div className="font-semibold">{announcement.title}</div>
                  {announcement.title_bn && (
                    <div className="text-xs text-moss-500">{announcement.title_bn}</div>
                  )}
                  <div className="mt-2 text-xs text-moss-500">{announcement.message}</div>
                  {announcement.message_bn && (
                    <div className="text-xs text-moss-500">{announcement.message_bn}</div>
                  )}
                </td>
                <td className="py-3 text-moss-600">
                  {new Date(announcement.start_at).toLocaleString()} → {new Date(announcement.end_at).toLocaleString()}
                </td>
                <td className="py-3 text-moss-600">
                  {announcement.is_active ? copy.admin.announcements.active : copy.admin.announcements.archived}
                </td>
                <td className="py-3">
                  <div className="flex flex-wrap gap-2">
                    {announcement.is_active ? (
                      <form action={archiveAnnouncementAction}>
                        <input type="hidden" name="id" value={announcement.id} />
                        <button className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700" type="submit">
                          {copy.admin.announcements.archive}
                        </button>
                      </form>
                    ) : (
                      <form action={restoreAnnouncementAction}>
                        <input type="hidden" name="id" value={announcement.id} />
                        <button className="rounded-full bg-moss-600 px-4 py-2 text-xs font-semibold text-white" type="submit">
                          {copy.admin.announcements.restore}
                        </button>
                      </form>
                    )}
                    <form action={deleteAnnouncementAction}>
                      <input type="hidden" name="id" value={announcement.id} />
                      <button className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600" type="submit">
                        {copy.admin.announcements.delete}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
