"use client";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { AppSidebar} from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Bus,
  MapPin,
  CalendarDays,
  Ticket,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

const adminModules = [
  {
    title: "Bus Management",
    description: "Add, view, edit, and manage your buses.",
    icon: Bus,
    href: "/admin/buses",
    action: "Manage Buses",
  },
  {
    title: "Route Management",
    description: "Manage bus routes and destinations.",
    icon: MapPin,
    href: "#",
    action: "Coming Soon",
  },
  {
    title: "Schedule Management",
    description: "Manage trip schedules and departure times.",
    icon: CalendarDays,
    href: "#",
    action: "Coming Soon",
  },
  {
    title: "Booking Management",
    description: "View and manage passenger bookings.",
    icon: Ticket,
    href: "#",
    action: "Coming Soon",
  },
];

export default function AdminDashboardPage() {
  const { isChecking } = useAuthGuard({
    requireAuth: true,
    allowedRoles: ["admin"],
  });

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <p className="text-sm text-[#64746B]">Checking account...</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="bg-[#F5F0E6]">
        <header className="flex h-16 items-center gap-4 border-b border-[#D9E2D9] bg-[#F5F0E6] px-6">
          <SidebarTrigger className="text-[#174D3A]" />

          <div>
            <h1 className="text-lg font-bold text-[#174D3A]">
              Admin Dashboard
            </h1>
            <p className="text-xs text-[#64746B]">
              Manage your bus ticket booking system
            </p>
          </div>
        </header>

        <main className="space-y-8 p-6">
          <section className="rounded-2xl bg-[#174D3A] p-7 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-3">
                <LayoutDashboard size={25} />
              </div>

              <div>
                <p className="text-sm text-white/75">Administration</p>
                <h2 className="text-2xl font-bold">
                  Welcome, Admin!
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/80">
              Manage buses and organize the operations of your bus ticket
              booking system from one place.
            </p>
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[#174D3A]">
                Management Modules
              </h2>
              <p className="text-sm text-[#64746B]">
                Select a module to manage your system.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {adminModules.map((module) => {
                const Icon = module.icon;
                const isAvailable = module.href !== "#";

                return (
                  <div
                    key={module.title}
                    className="rounded-2xl border border-[#D9E2D9] bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="rounded-xl bg-[#E8F0E9] p-3 text-[#174D3A]">
                        <Icon size={24} />
                      </div>

                      {isAvailable && (
                        <span className="rounded-full bg-[#E8F0E9] px-3 py-1 text-xs font-medium text-[#174D3A]">
                          Available
                        </span>
                      )}
                    </div>

                    <h3 className="mt-5 font-bold text-[#174D3A]">
                      {module.title}
                    </h3>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-[#64746B]">
                      {module.description}
                    </p>

                    {isAvailable ? (
                      <Link
                        href={module.href}
                        className="mt-5 flex items-center justify-between rounded-lg bg-[#174D3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#22644B]"
                      >
                        {module.action}
                        <ArrowRight size={17} />
                      </Link>
                    ) : (
                      <div className="mt-5 rounded-lg bg-[#F5F0E6] px-4 py-3 text-center text-sm font-medium text-[#64746B]">
                        {module.action}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
