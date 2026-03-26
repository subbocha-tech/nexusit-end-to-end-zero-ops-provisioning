import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
type AppLayoutProps = {
  children: React.ReactNode;
  container?: boolean;
  className?: string;
  contentClassName?: string;
};
export function AppLayout({ children, container = false, className, contentClassName }: AppLayoutProps): JSX.Element {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className={cn("relative flex flex-col min-h-screen bg-background", className)}>
        {/* Global Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="h-4 w-px bg-border/60 hidden md:block" />
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Docs</span>
              <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Support</span>
            </nav>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <LanguageToggle />
            <ThemeToggle className="static" />
            <div className="h-8 w-px bg-border/60 mx-1" />
            <Avatar className="h-8 w-8 cursor-pointer ring-offset-background transition-colors hover:ring-2 hover:ring-ring">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1">
          {container ? (
            <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 lg:py-12", contentClassName)}>
              {children}
            </div>
          ) : (
            children
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}