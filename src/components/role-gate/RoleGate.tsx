import { getSession } from "../../lib/auth.ts";
import type { PropsWithChildren } from "react";
import type { Role } from "../../types/user.ts";

export function RoleGate({
  allow,
  children,
}: PropsWithChildren<{ allow: Role[] }>) {
  const role = getSession();
  if (role && allow.includes(role)) return <>{children}</>;
  return null;
}
