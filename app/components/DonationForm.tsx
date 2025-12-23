"use client";

import { useRef } from "react";
import { submitDonationAction } from "../../lib/actions";

type Campaign = { id: number; title: string };

export default function DonationForm({
  campaigns,
  copy
}: {
  campaigns: Campaign[];
  copy: {
    donate: {
      fields: {
        campaign: string;
        name: string;
        amount: string;
        bkash: string;
        trx: string;
        note: string;
        submit: string;
      };
    };
  };
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      ref={formRef}
      className="mt-4 grid gap-3"
      action={async (formData) => {
        await submitDonationAction(formData);
        formRef.current?.reset();
      }}
    >
      <select className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="campaignId">
        <option value="">{copy.donate.fields.campaign}</option>
        {campaigns.map((campaign) => (
          <option key={campaign.id} value={campaign.id}>
            {campaign.title}
          </option>
        ))}
      </select>
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="name" placeholder={copy.donate.fields.name} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="amount" type="number" min="1" placeholder={copy.donate.fields.amount} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="bkashNumber" placeholder={copy.donate.fields.bkash} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="transactionId" placeholder={copy.donate.fields.trx} required />
      <textarea className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="note" placeholder={copy.donate.fields.note} rows={3} />
      <button className="mt-2 rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-soft" type="submit">
        {copy.donate.fields.submit}
      </button>
    </form>
  );
}
