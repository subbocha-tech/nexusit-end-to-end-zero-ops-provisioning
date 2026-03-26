import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  LayoutGrid,
  ListTodo,
  CheckCircle,
  Key,
  CreditCard,
  Zap
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
export function AppSidebar(): JSX.Element {
  const { t } = useTranslation();
  const location = useLocation();
  const menuItems = [
    { title: t('nav.dashboard'), icon: LayoutDashboard, url: "/" },
    { title: t('nav.catalog'), icon: LayoutGrid, url: "/catalog" },
    { title: t('nav.requests'), icon: ListTodo, url: "/requests" },
    { title: t('nav.approvals'), icon: CheckCircle, url: "/approvals" },
    { title: t('nav.licenses'), icon: Key, url: "/licenses" },
    { title: t('nav.billing'), icon: CreditCard, url: "/billing" },
  ];
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="h-16 flex items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">NexusIT</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Enterprise Management
          </SidebarGroupLabel>
          <SidebarMenu className="px-3 py-2 space-y-1">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  className={cn(
                    "w-full justify-start gap-3 px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    location.pathname === item.url ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <Link to={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6">
        <div className="rounded-lg bg-accent/50 p-4 border border-border/40">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-xs font-semibold text-foreground">Zero-Ops Mode</p>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
            Automated provisioning is active for 8 connected SaaS platforms.
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}