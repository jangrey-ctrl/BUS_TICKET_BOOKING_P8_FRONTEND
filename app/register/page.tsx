
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { BusFront, Eye, EyeOff, Ticket } from "lucide-react";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      toast.success("Account Created Successfully!", {
        description: "You can now log in to your account.",
        duration: 3000,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: any) {
      setError(
        err?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F0E6] p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#D9E2D9] bg-white shadow-xl md:grid-cols-2">

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
                Start your journey
                <br />
                with us today.
              </h1>

              <p className="max-w-sm text-sm leading-relaxed text-white/75">
                Create your account and enjoy a simple and convenient
                way to manage your bus reservations.
              </p>
            </div>
          </div>

          <p className="relative z-10 text-xs text-white/60">
            © 2026 Bus Ticket Booking System
          </p>
        </div>

        {/* Register Form */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Mobile Branding */}
            <div className="mb-8 flex items-center justify-center gap-3 md:hidden">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#174D3A] text-white">
                <BusFront className="size-6" />
              </div>

              <div>
                <h2 className="font-bold text-[#174D3A]">
                  BUS BOOKING
                </h2>

                <p className="text-xs text-[#64746B]">
                  Your Journey Starts Here
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8 space-y-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#4C8479]">
                Create Account
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-[#174D3A]">
                Get started today
              </h1>

              <p className="text-sm text-[#64746B]">
                Create your account using a username and password.
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-6">

              {/* Error Message */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-semibold text-[#174D3A]"
                >
                  Username
                </Label>

                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  required
                  disabled={loading}
                  className="h-12 rounded-xl border-[#D9E2D9] bg-white px-4 text-sm focus-visible:ring-[#4C8479]"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#174D3A]"
                >
                  Password
                </Label>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    required
                    disabled={loading}
                    className="h-12 rounded-xl border-[#D9E2D9] bg-white px-4 pr-12 text-sm focus-visible:ring-[#4C8479]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64746B] transition hover:text-[#174D3A]"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-[#174D3A] text-sm font-semibold text-white shadow-sm transition hover:bg-[#23664D]"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Login Link */}
              <p className="pt-2 text-center text-sm text-[#64746B]">
                Already have an account?{" "}
                <Link
                  href={CONFIG.ROUTES.LOGIN}
                  className="font-semibold text-[#174D3A] underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
