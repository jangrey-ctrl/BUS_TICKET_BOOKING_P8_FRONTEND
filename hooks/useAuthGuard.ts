"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole, isAuthenticated } from "@/lib/auth";
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
  const [isChecking, setIsChecking] = useState(true);
  const allowedRolesKey = allowedRoles?.join("|") ?? "";

  useEffect(() => {
    let isMounted = true;

    const checkAuth = () => {
      try {
        const userIsAuth = isAuthenticated();
        const role = getUserRole();

        if (requireAuth && !userIsAuth) {
          router.replace(CONFIG.ROUTES.LOGIN);
          return;
        }

        if (!requireAuth && userIsAuth) {
          router.replace(role === "admin" ? "/admin" : CONFIG.ROUTES.DASHBOARD);
          return;
        }

        const roles = allowedRolesKey ? allowedRolesKey.split("|") : [];

        if (requireAuth && roles.length > 0 && !roles.includes(role || "")) {
          router.replace(role === "admin" ? "/admin" : CONFIG.ROUTES.DASHBOARD);
          return;
        }

        if (isMounted) {
          setIsChecking(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);

        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [requireAuth, allowedRolesKey, router]);

  return { isChecking };
}