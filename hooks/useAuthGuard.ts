
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

interface AuthGuardOptions {
  requireAuth?: boolean;
}

export function useAuthGuard({
  requireAuth = true,
}: AuthGuardOptions = {}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = () => {
      try {
        const userIsAuth = isAuthenticated();

        if (requireAuth && !userIsAuth) {
          router.replace(CONFIG.ROUTES.LOGIN);
          return;
        }

        if (!requireAuth && userIsAuth) {
          router.replace(CONFIG.ROUTES.DASHBOARD);
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
  }, [requireAuth, router]);

  return { isChecking };
}
