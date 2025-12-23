"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { deleteDonationAction } from "../../lib/actions";

export default function DeleteDonationButton({
  id,
  label,
  confirmTitle,
  confirmMessage,
  cancelLabel,
  confirmLabel
}: {
  id: number;
  label: string;
  confirmTitle: string;
  confirmMessage: string;
  cancelLabel: string;
  confirmLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        type="button"
        className="rounded-full border border-red-200 px-4 py-2 text-xs font-semibold text-red-600"
        onClick={() => setOpen(true)}
      >
        {label}
      </button>
      {open && mounted
        ? createPortal(
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30 px-4">
              <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-moss-900">{confirmTitle}</h3>
                <p className="mt-2 text-sm text-moss-600">{confirmMessage}</p>
                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-moss-200 px-4 py-2 text-xs font-semibold text-moss-700"
                    onClick={() => setOpen(false)}
                  >
                    {cancelLabel}
                  </button>
                  <form
                    ref={formRef}
                    action={async (formData) => {
                      await deleteDonationAction(formData);
                      setOpen(false);
                    }}
                  >
                    <input type="hidden" name="id" value={id} />
                    <button
                      type="submit"
                      className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white"
                    >
                      {confirmLabel}
                    </button>
                  </form>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
