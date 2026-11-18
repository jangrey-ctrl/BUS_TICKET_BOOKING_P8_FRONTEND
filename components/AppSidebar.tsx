
"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Ticket, CalendarDays, History, UserRound, BusFront } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserRole } from "@/lib/auth";
import { LogoutDialog } from "@/components/ui/LogoutDialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const passengerMenuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Book a Ticket", icon: Ticket, path: "/book-ticket" },
  { title: "My Bookings", icon: CalendarDays, path: "/my-bookings" },
  { title: "Travel History", icon: History, path: "/travel-history" },
  { title: "My Profile", icon: UserRound, path: "/profile" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(getUserRole());
  }, []);

  const isAdmin = role === "admin";

  return (
    <Sidebar className="!border-r !border-[#285E4B] !bg-[#174D3A] !text-white dark:!border-[#20372D] dark:!bg-[#102F25] [&_[data-sidebar=sidebar]]:!bg-[#174D3A] dark:[&_[data-sidebar=sidebar]]:!bg-[#102F25] [&_[data-sidebar=header]]:!bg-[#174D3A] dark:[&_[data-sidebar=header]]:!bg-[#102F25]">
      <SidebarHeader className="!border-b !border-[#285E4B] !bg-[#174D3A] px-5 py-6 dark:!border-[#20372D] dark:!bg-[#102F25]">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-[#4C8479] shadow-sm">
            <BusFront size={24} className="text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold tracking-wide text-white">BusTicket</h2>
            <p className="text-[11px] text-[#B8CEC3]">
              {isAdmin ? "Admin Portal" : "Passenger Portal"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="!bg-[#174D3A] px-3 py-5 dark:!bg-[#102F25]">
        {role === "user" && (
          <SidebarGroup className="gap-3">
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold tracking-[0.15em] text-[#AFC8BB]">
              MAIN MENU
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
              {passengerMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.path}
                    onClick={() => router.push(item.path)}
                    title={item.title}
                    className="h-11 rounded-lg px-3 text-sm font-medium text-[#E8F0E9] transition-colors hover:bg-[#285E4B] hover:text-white data-[active=true]:bg-[#E8F0E9] data-[active=true]:font-semibold data-[active=true]:text-[#174D3A]"
                  >
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}

        {isAdmin && (
          <SidebarGroup className="gap-3">
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold tracking-[0.15em] text-[#AFC8BB]">
              ADMIN MENU
            </SidebarGroupLabel>
            <SidebarMenu className="gap-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/admin"}
                  onClick={() => router.push("/admin")}
                  title="Dashboard"
                  className="h-11 rounded-lg px-3 text-sm font-medium text-[#E8F0E9] transition-colors hover:bg-[#285E4B] hover:text-white data-[active=true]:bg-[#E8F0E9] data-[active=true]:font-semibold data-[active=true]:text-[#174D3A]"
                >
                  <LayoutDashboard className="size-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname.startsWith("/admin/buses")}
                  onClick={() => router.push("/admin/buses")}
                  title="Bus Management"
                  className="h-11 rounded-lg px-3 text-sm font-medium text-[#E8F0E9] transition-colors hover:bg-[#285E4B] hover:text-white data-[active=true]:bg-[#E8F0E9] data-[active=true]:font-semibold data-[active=true]:text-[#174D3A]"
                >
                  <BusFront className="size-5" />
                  <span>Bus Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="!border-t !border-[#285E4B] !bg-[#174D3A] p-4 dark:!border-[#20372D] dark:!bg-[#102F25]">
        <LogoutDialog />
      </SidebarFooter>
    </Sidebar>
  );
}
