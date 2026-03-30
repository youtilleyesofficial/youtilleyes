import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { LogOut, Briefcase, FileText, Users, Activity, MoreHorizontal, Home, ChevronRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";

const AVATAR_KEY = "youtilleyes_avatar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-purple-100 text-purple-700 border-purple-200",
  CLIENT: "bg-blue-100 text-blue-700 border-blue-200",
  USER: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const roleAvatarBg: Record<string, string> = {
  ADMIN: "bg-purple-600",
  CLIENT: "bg-blue-600",
  USER: "bg-secondary",
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout: clearAuth } = useAuth();
  const [location] = useLocation();
  const logoutMutation = useLogout();
  const [avatarSrc] = useState<string | null>(() => localStorage.getItem(AVATAR_KEY));

  const handleLogout = () => {
    logoutMutation.mutate(undefined, { onSuccess: () => clearAuth() });
  };

  // All nav items for desktop sidebar
  let allNavItems: NavItem[] = [];

  if (user?.role === "ADMIN") {
    allNavItems = [
      { title: "Dashboard", href: "/admin/dashboard", icon: Activity },
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Projects", href: "/admin/projects", icon: Briefcase },
      { title: "Bids", href: "/admin/bids", icon: FileText },
      { title: "Submissions", href: "/admin/submissions", icon: FileText },
    ];
  } else if (user?.role === "CLIENT") {
    allNavItems = [
      { title: "Dashboard", href: "/client/dashboard", icon: Activity },
      { title: "My Projects", href: "/client/projects", icon: Briefcase },
    ];
  } else if (user?.role === "USER") {
    allNavItems = [
      { title: "Dashboard", href: "/user/dashboard", icon: Activity },
      { title: "Browse Projects", href: "/user/projects", icon: Briefcase },
      { title: "My Bids", href: "/user/bids", icon: FileText },
      { title: "Assigned Projects", href: "/user/assigned", icon: Building2 },
      { title: "My Submissions", href: "/user/submissions", icon: FileText },
    ];
  }

  // Extra items for mobile hamburger — only items NOT covered by MobileBottomNav
  let extraMobileItems: NavItem[] = [];
  if (user?.role === "USER") {
    extraMobileItems = [
      { title: "My Bids", href: "/user/bids", icon: FileText },
      { title: "My Submissions", href: "/user/submissions", icon: FileText },
    ];
  } else if (user?.role === "ADMIN") {
    extraMobileItems = [
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Bids", href: "/admin/bids", icon: FileText },
      { title: "Submissions", href: "/admin/submissions", icon: FileText },
    ];
  } else if (user?.role === "CLIENT") {
    extraMobileItems = [];
  }

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  const avatarBg = roleAvatarBg[user?.role ?? "USER"] ?? "bg-secondary";
  const roleBadgeClass = roleColors[user?.role ?? "USER"] ?? "";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="flex flex-col flex-1 p-4 h-full">

          {/* Logo */}
          <div className="flex items-center px-2 pt-4 pb-3">
            <img src={logoImg} alt="YouTillEyes Logo" className="h-10 w-auto" />
          </div>

          {/* Profile Card — clickable → /profile */}
          <Link href="/profile">
            <div className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 mb-4 cursor-pointer transition-all group",
              "hover:bg-sidebar-accent/60 border border-sidebar-border/40 hover:border-sidebar-accent",
              location === "/profile" ? "bg-sidebar-accent/80 border-sidebar-accent" : "bg-sidebar-accent/20"
            )}>
              {avatarSrc ? (
                <img src={avatarSrc} alt="avatar" className="h-10 w-10 rounded-full object-cover shrink-0 shadow-sm ring-2 ring-sidebar-border" />
              ) : (
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-base shrink-0 shadow-sm", avatarBg)}>
                  {user?.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col overflow-hidden flex-1 min-w-0">
                <span className="text-sm font-semibold truncate text-sidebar-foreground leading-tight">{user?.name}</span>
                <Badge variant="outline" className={cn("mt-1 w-fit text-[10px] px-1.5 py-0 border font-semibold", roleBadgeClass)}>
                  {user?.role}
                </Badge>
              </div>
              <ChevronRight className="h-4 w-4 text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70 shrink-0 transition-colors" />
            </div>
          </Link>

          <nav className="flex-1 space-y-0.5">
            {/* Home */}
            <Link href="/" className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              location === "/"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <Home className="h-4 w-4" />
              Home
            </Link>

            {/* Divider */}
            <div className="my-2 border-t border-sidebar-border/40" />

            {/* Role-specific nav items */}
            {allNavItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b bg-sidebar text-sidebar-foreground z-50 flex items-center justify-between px-4">
        <img src={logoImg} alt="Logo" className="h-8 w-auto" />

        <div className="flex items-center gap-2">
          {user && (
            <Link href="/profile">
              <div className="flex items-center gap-2 cursor-pointer">
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="h-8 w-8 rounded-full object-cover ring-2 ring-sidebar-border/60" />
                ) : (
                  <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0", avatarBg)}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>
          )}
        {extraMobileItems.length > 0 && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 p-0 flex flex-col bg-sidebar text-sidebar-foreground border-sidebar-border">
              <SheetTitle className="sr-only">More navigation options</SheetTitle>
              <div className="flex flex-col flex-1 p-4">

                {/* Profile in mobile sheet too */}
                <Link href="/profile">
                  <div className="flex items-center gap-3 rounded-xl px-3 py-3 mb-4 bg-sidebar-accent/20 border border-sidebar-border/40 cursor-pointer hover:bg-sidebar-accent/60 transition-all">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="avatar" className="h-9 w-9 rounded-full object-cover shrink-0 ring-2 ring-sidebar-border" />
                    ) : (
                      <div className={cn("h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0", avatarBg)}>
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold truncate">{user?.name}</span>
                      <Badge variant="outline" className={cn("mt-0.5 w-fit text-[10px] px-1.5 py-0 border font-semibold", roleBadgeClass)}>
                        {user?.role}
                      </Badge>
                    </div>
                  </div>
                </Link>

                <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-3 mb-2">
                  More
                </p>
                <nav className="flex-1 space-y-0.5">
                  {extraMobileItems.map((item) => (
                    <Link key={item.href} href={item.href} className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                    )}>
                      <item.icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto border-t border-sidebar-border pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent/50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 md:pt-0 min-h-screen overflow-x-hidden">
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full min-w-0 pb-20 md:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
