
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";

export function LogoutDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLogout = async () => {
    setLoading(true);
    setProgress(30);

    await new Promise((resolve) => setTimeout(resolve, 400));
    setProgress(70);

    clearTokens();

    await new Promise((resolve) => setTimeout(resolve, 400));
    setProgress(100);

    setOpen(false);
    router.replace(CONFIG.ROUTES.LOGIN);
  };

  return (
    <AlertDialog open={open} onOpenChange={(nextOpen) => {
      if (!loading) setOpen(nextOpen);
    }}>
      <Button
        type="button"
        onClick={() => {
          setProgress(0);
          setLoading(false);
          setOpen(true);
        }}
        className="bg-red-600 text-white hover:bg-red-600 hover:text-white"
      >
        Logout
      </Button>

      <AlertDialogContent className="bg-card text-card-foreground border-border overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to logout?
          </AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account. Do you want to continue?
          </AlertDialogDescription>

          {loading && (
            <Progress value={progress} className="w-full gap-2">
              <div className="flex w-full items-center justify-between">
                <ProgressLabel className="text-[#174D3A]">Logging out...</ProgressLabel>
                <ProgressValue />
              </div>
            </Progress>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="flex flex-row justify-end gap-2 bg-card border-t border-border pt-4">
          <AlertDialogCancel disabled={loading} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }} className="bg-red-600 text-white hover:bg-red-700 hover:text-white">
            {loading ? "Logging out..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
