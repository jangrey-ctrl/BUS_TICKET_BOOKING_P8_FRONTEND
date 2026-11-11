
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertCircleIcon,
  BusFront,
  Eye,
  EyeOff,
  Ticket,
} from "lucide-react";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  if (isChecking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setProgress(0);
    setLoading(true);

    const progressInterval = setInterval(() => {
      setProgress((prev) =>
        Math.min(prev + Math.floor(Math.random() * 8) + 3, 90)
      );
    }, 250);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!data.accessToken) {
        throw new Error("Invalid username or password.");
      }

      setTokens(data.accessToken, data.refreshToken);
      setProgress(100);

      await new Promise((resolve) => setTimeout(resolve, 350));
      router.push(CONFIG.ROUTES.DASHBOARD);

    } catch (err: any) {
      setError("Incorrect username or password.");
      setProgress(0);

    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F0E6] p-4 dark:bg-[#14231D]">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#D9E2D9] bg-white shadow-xl dark:border-[#344A40] dark:bg-[#20372D] md:grid-cols-2">

        {/* Left Branding Section */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-[#174D3A] p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 size-72 rounded-full border-[35px] border-white/5" />
          <div className="absolute -bottom-24 -left-20 size-80 rounded-full border-[45px] border-white/5" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-white/15">
              <BusFront className="size-7" />
            </div>

            <div>
              <h2 className="font-bold tracking-wide">
                BUS BOOKING
              </h2>
              <p className="text-xs text-white/70">
                Your Journey Starts Here
              </p>
            </div>
          </div>

          <div className="relative z-10 space-y-5">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/10">
              <Ticket className="size-9" />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight">
                Travel with comfort.
                <br />
                Book with ease.
              </h1>

              <p className="max-w-sm text-sm leading-relaxed text-white/75">
                Welcome to our Bus Ticket Booking System.
                Manage your reservations and plan your next journey
                in one convenient place.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/60">
            © 2026 Bus Ticket Booking System
          </p>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Mobile Branding */}
            <div className="mb-8 flex items-center justify-center gap-3 md:hidden">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#174D3A] text-white">
                <BusFront className="size-6" />
              </div>

              <div>
                <h2 className="font-bold text-[#174D3A] dark:text-[#E8F0E9]">
                  BUS BOOKING
                </h2>
                <p className="text-xs text-[#64746B] dark:text-[#B7C8BE]">
                  Your Journey Starts Here
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#4C8479]">
                Welcome Back
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#174D3A] dark:text-[#E8F0E9]">
                Sign in to your account
              </h1>

              <p className="text-sm text-[#64746B] dark:text-[#B7C8BE]">
                Enter your username and password to continue.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Error Message */}
              {error && (
                <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircleIcon className="size-5 shrink-0" />

                  <div>
                    <p className="font-semibold">Login Failed</p>
                    <p className="mt-1">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-[#174D3A] dark:text-[#E8F0E9]"
                >
                  Username
                </Label>

                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl border-[#D9E2D9] bg-white px-4 text-sm focus-visible:ring-[#4C8479] dark:border-[#344A40] dark:bg-[#14231D] dark:text-[#E8F0E9]"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#174D3A] dark:text-[#E8F0E9]"
                >
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                    disabled={loading}
                    className="h-12 rounded-xl border-[#D9E2D9] bg-white px-4 pr-12 text-sm focus-visible:ring-[#4C8479] dark:border-[#344A40] dark:bg-[#14231D] dark:text-[#E8F0E9]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64746B] transition hover:text-[#174D3A] dark:text-[#B7C8BE] dark:hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress */}
              {loading && (
                <Progress value={progress} className="w-full gap-2">
                  <div className="flex w-full items-center justify-between">
                    <ProgressLabel className="text-[#174D3A] dark:text-[#E8F0E9]">
                      Logging in...
                    </ProgressLabel>
                    <ProgressValue />
                  </div>
                </Progress>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#174D3A] text-sm font-semibold text-white shadow-sm transition hover:bg-[#23664D] dark:bg-[#4C8479] dark:hover:bg-[#5B998B]"
              >
                {loading ? "Logging in..." : "Login to Account"}
              </Button>

              {/* Register Link */}
              <p className="pt-2 text-center text-sm text-[#64746B] dark:text-[#B7C8BE]">
                Don't have an account?{" "}
                <Link
                  href={CONFIG.ROUTES.REGISTER}
                  className="font-semibold text-[#174D3A] underline-offset-4 hover:underline dark:text-[#8DBDAE]"
                >
                  
                Sign up here
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
