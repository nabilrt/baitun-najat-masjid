"use client";

import { useRef } from "react";
import { addHadithAction } from "../../lib/actions";

export default function HadithForm({
  copy
}: {
  copy: {
    admin: {
      hadiths: {
        fields: { text: string; textBn: string; source: string; sourceBn: string };
        add: string;
      };
    };
  };
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      ref={formRef}
      className="mt-4 grid gap-3 md:grid-cols-2"
      action={async (formData) => {
        await addHadithAction(formData);
        formRef.current?.reset();
      }}
    >
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="text" placeholder={copy.admin.hadiths.fields.text} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="textBn" placeholder={copy.admin.hadiths.fields.textBn} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="source" placeholder={copy.admin.hadiths.fields.source} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="sourceBn" placeholder={copy.admin.hadiths.fields.sourceBn} required />
      <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white md:col-span-2 md:justify-self-start" type="submit">
        {copy.admin.hadiths.add}
      </button>
    </form>
  );
}
