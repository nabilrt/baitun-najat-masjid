"use client";

import { useState } from "react";

export default function PasswordField({
  placeholder,
  showLabel,
  hideLabel
}: {
  placeholder: string;
  showLabel: string;
  hideLabel: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        className="w-full rounded-2xl border border-moss-100 bg-moss-50 px-4 py-3 pr-20 text-sm"
        type={show ? "text" : "password"}
        name="password"
        placeholder={placeholder}
        required
      />
      <button
        type="button"
        onClick={() => setShow((value) => !value)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-moss-200 px-3 py-1 text-xs font-semibold text-moss-700"
      >
        {show ? hideLabel : showLabel}
      </button>
    </div>
  );
}
