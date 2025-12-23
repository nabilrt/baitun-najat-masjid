import { redirect } from "next/navigation";
import { isAdminSession } from "../../../lib/auth";
import { logoutAdminAction } from "../../../lib/actions";
import AdminShell from "./AdminShell";

export const runtime = "nodejs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const isAdmin = isAdminSession();
  if (!isAdmin) {
    redirect("/admin");
  }

  return <AdminShell logoutAction={logoutAdminAction}>{children}</AdminShell>;
}
