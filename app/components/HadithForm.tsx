"use client";

import { useRef } from "react";
import { addHadithAction } from "../../lib/actions";

export default function HadithForm({
  copy
}: {
  copy: {
    admin: {
      hadiths: {
        fields: { text: string; source: string };
        add: string;
      };
    };
  };
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      ref={formRef}
      className="mt-4 grid gap-3 sm:grid-cols-[1fr_220px_auto]"
      action={async (formData) => {
        await addHadithAction(formData);
        formRef.current?.reset();
      }}
    >
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="text" placeholder={copy.admin.hadiths.fields.text} required />
      <input className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 text-sm" name="source" placeholder={copy.admin.hadiths.fields.source} required />
      <button className="rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-white" type="submit">
        {copy.admin.hadiths.add}
      </button>
    </form>
  );
}
