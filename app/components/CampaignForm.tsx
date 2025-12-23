"use client";

import { useRef } from "react";
import { addCampaignAction } from "../../lib/actions";

export default function CampaignForm({
  copy
}: {
  copy: {
    admin: {
      campaigns: {
        fields: { title: string; goal: string; description: string };
        create: string;
      };
    };
  };
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      ref={formRef}
      className="mt-4 grid gap-3 lg:grid-cols-[1fr_260px_auto]"
      action={async (formData) => {
        await addCampaignAction(formData);
        formRef.current?.reset();
      }}
    >
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="title" placeholder={copy.admin.campaigns.fields.title} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="goalAmount" type="number" min="1" placeholder={copy.admin.campaigns.fields.goal} />
      <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white" type="submit">
        {copy.admin.campaigns.create}
      </button>
      <textarea
        className="lg:col-span-3 w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm"
        name="description"
        placeholder={copy.admin.campaigns.fields.description}
        rows={3}
        required
      />
    </form>
  );
}
