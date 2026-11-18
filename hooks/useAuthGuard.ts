
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { clearTokens, getUserRole } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

interface AuthGuardOptions {
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export function useAuthGuard({
  requireAuth = true,
  allowedRoles,
}: AuthGuardOptions = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const allowedRolesKey = allowedRoles?.join("|") ?? "";

  useEffect(() => {
    const role = getUserRole();

    if (!requireAuth) {
      if (role) {
        router.replace(role === "admin" ? "/admin" : CONFIG.ROUTES.DASHBOARD);
        return;
      }

      setIsChecking(false);
      return;
    }

    if (!role) {
      clearTokens();
      router.replace(CONFIG.ROUTES.LOGIN);
      return;
    }

    const roles = allowedRolesKey ? allowedRolesKey.split("|") : [];

    if (roles.length > 0 && !roles.includes(role)) {
      const destination = role === "admin" ? "/admin" : CONFIG.ROUTES.DASHBOARD;

      if (pathname !== destination) {
        router.replace(destination);
        return;
      }

      clearTokens();
      router.replace(CONFIG.ROUTES.LOGIN);
      return;
    }

    setIsChecking(false);
  }, [requireAuth, allowedRolesKey, pathname, router]);

  return { isChecking };
}
