
"use client";

import { useState } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Bus,
  Ticket,
  CalendarCheck,
  CheckCircle,
  Clock,
  XCircle,
  CalendarDays,
  Bell,
} from "lucide-react";

export default function DashboardPage() {
  const { isChecking } = useAuthGuard({ requireAuth: true });
  const [showNotifications, setShowNotifications] = useState(false);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E6]">
        <p className="text-sm text-[#64746B]">
          Verifying session...
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="min-h-screen bg-[#F5F0E6]">
        <div className="p-5 sm:p-6">
          <div className="mx-auto max-w-6xl space-y-6">

            {/* Header */}
            <header className="flex items-center justify-between gap-4 border-b border-[#D9E2D9] pb-5">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="size-16 text-[#174D3A] [&>svg]:size-9" />

                <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight text-[#174D3A]">
                    Dashboard
                  </h1>

                  <p className="text-xs text-[#64746B]">
                    Welcome back! Manage your bus bookings here.
                  </p>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Notifications"
                  title="Notifications"
                  aria-expanded={showNotifications}
                  onClick={() =>
                    setShowNotifications(!showNotifications)
                  }
                  className="relative size-10 shrink-0 rounded-xl border-[#D9E2D9] bg-white text-[#174D3A] shadow-sm hover:bg-[#E8F0E9] hover:text-[#174D3A]"
                >
                  <Bell className="size-5" />

                  <span className="absolute right-2 top-2 size-2 rounded-full bg-[#4C8479] ring-2 ring-white" />
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-[#D9E2D9] bg-white shadow-lg">
                    <div className="flex items-center justify-between border-b border-[#D9E2D9] px-4 py-3">
                      <h3 className="text-sm font-semibold text-[#174D3A]">
                        Notifications
                      </h3>

                      <button
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        className="text-xs text-[#64746B] hover:text-[#174D3A]"
                      >
                        Close
                      </button>
                    </div>

                    <div className="px-4 py-8 text-center">
                      <Bell
                        size={28}
                        className="mx-auto mb-2 text-[#AFC8BB]"
                      />

                      <p className="text-sm font-medium text-[#174D3A]">
                        No notifications yet
                      </p>

                      <p className="mt-1 text-xs text-[#64746B]">
                        You're all caught up!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </header>

            {/* Statistics Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {/* Total Buses */}
              <Card className="border-[#D9E2D9] bg-white shadow-sm">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#64746B]">
                      Total Buses
                    </p>

                    <h2 className="text-2xl font-bold text-[#174D3A]">
                      0
                    </h2>

                    <p className="text-[11px] text-[#64746B]">
                      Available buses
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#E8F0E9] p-3">
                    <Bus className="size-5 text-[#4C8479]" />
                  </div>
                </CardContent>
              </Card>

              {/* My Bookings */}
              <Card className="border-[#D9E2D9] bg-white shadow-sm">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#64746B]">
                      My Bookings
                    </p>

                    <h2 className="text-2xl font-bold text-[#174D3A]">
                      0
                    </h2>

                    <p className="text-[11px] text-[#64746B]">
                      Your reservations
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#E8F0E9] p-3">
                    <Ticket className="size-5 text-[#4C8479]" />
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Trips */}
              <Card className="border-[#D9E2D9] bg-white shadow-sm">
                <CardContent className="flex items-center justify-between p-5">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#64746B]">
                      Upcoming Trips
                    </p>

                    <h2 className="text-2xl font-bold text-[#174D3A]">
                      0
                    </h2>

                    <p className="text-[11px] text-[#64746B]">
                      Scheduled trips
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#E8F0E9] p-3">
                    <CalendarCheck className="size-5 text-[#4C8479]" />
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Booking Overview */}
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-[#174D3A]">
                  Booking Overview
                </h2>

                <p className="text-xs text-[#64746B]">
                  Keep track of your booking status.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">

                {/* Confirmed */}
                <Card className="border-[#D9E2D9] bg-white shadow-sm">
                  <CardContent className="flex items-center gap-3 p-5">
                    <div className="rounded-xl bg-[#E8F0E9] p-3">
                      <CheckCircle className="size-5 text-[#4C8479]" />
                    </div>

                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
                      >
                        Confirmed
                      </Badge>

                      <h3 className="text-xl font-bold text-[#174D3A]">
                        0
                      </h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Pending */}
                <Card className="border-[#D9E2D9] bg-white shadow-sm">
                  <CardContent className="flex items-center gap-3 p-5">
                    <div className="rounded-xl bg-[#FDF2D5] p-3">
                      <Clock className="size-5 text-[#B88628]" />
                    </div>

                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                      >
                        Pending
                      </Badge>

                      <h3 className="text-xl font-bold text-[#174D3A]">
                        0
                      </h3>
                    </div>
                  </CardContent>
                </Card>

                {/* Cancelled */}
                <Card className="border-[#D9E2D9] bg-white shadow-sm">
                  <CardContent className="flex items-center gap-3 p-5">
                    <div className="rounded-xl bg-[#FCE8E8] p-3">
                      <XCircle className="size-5 text-[#DC4444]" />
                    </div>

                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="border-red-200 bg-red-50 text-red-700 hover:bg-red-50"
                      >
                        Cancelled
                      </Badge>

                      <h3 className="text-xl font-bold text-[#174D3A]">
                        0
                      </h3>
                    </div>
                  </CardContent>
                </Card>

              </div>
            </div>

            {/* Recent Bookings */}
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-[#174D3A]">
                  My Recent Bookings
                </h2>

                <p className="text-xs text-[#64746B]">
                  View your latest bus reservations.
                </p>
              </div>

              <Card className="border-[#D9E2D9] bg-white shadow-sm">
                <CardHeader className="p-5 pb-2">
                  <CardTitle className="text-base text-[#174D3A]">
                    Latest Reservations
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 pt-2">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#D9E2D9] text-[#64746B]">
                          <th className="px-3 py-3 font-medium">
                            Booking Code
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Route
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Travel Date
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td
                            colSpan={4}
                            className="px-3 py-10 text-center text-[#64746B]"
                          >
                            No bookings available yet.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Schedules */}
            <div className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-[#174D3A]">
                  Upcoming Schedules
                </h2>

                <p className="text-xs text-[#64746B]">
                  Check the available bus departures.
                </p>
              </div>

              <Card className="border-[#D9E2D9] bg-white shadow-sm">
                <CardHeader className="p-5 pb-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-[#4C8479]" />

                    <CardTitle className="text-base text-[#174D3A]">
                      Scheduled Trips
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-2">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#D9E2D9] text-[#64746B]">
                          <th className="px-3 py-3 font-medium">
                            Bus Number
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Route
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Departure
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Arrival
                          </th>

                          <th className="px-3 py-3 font-medium">
                            Fare
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td
                            colSpan={5}
                            className="px-3 py-10 text-center text-[#64746B]"
                          >
                            No upcoming schedules available.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Welcome Card */}
            <Card className="border-[#D9E2D9] bg-white shadow-sm">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="text-base text-[#174D3A]">
                  Welcome to our Bus Ticket Booking System!
                </CardTitle>
              </CardHeader>

              <CardContent className="p-5 pt-2">
                <p className="text-xs leading-relaxed text-[#64746B]">
                  Book your bus tickets online and plan your trips
                  with ease. Check available buses, manage your
                  reservations, and enjoy a convenient travel
                  experience.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
