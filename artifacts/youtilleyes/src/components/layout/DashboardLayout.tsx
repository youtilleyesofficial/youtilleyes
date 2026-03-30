import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { LogOut, Briefcase, FileText, Users, Activity, Menu, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401_1774898763065.webp";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout: clearAuth } = useAuth();
  const [location] = useLocation();
  const logoutMutation = useLogout();

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
      { title: "Assigned Projects", href: "/user/assigned", icon: Briefcase },
      { title: "My Submissions", href: "/user/submissions", icon: FileText },
    ];
  }

  // Extra items for mobile hamburger — only items NOT covered by MobileBottomNav
  // MobileBottomNav covers: Home (dashboard), Browse/Projects, My Projects/Assigned, Profile
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

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="flex flex-col flex-1 p-4 h-full">
          {/* Logo only — no title text */}
          <div className="flex items-center px-2 py-4 mb-6">
            <img src={logoImg} alt="YouTillEyes Logo" className="h-9 w-auto rounded object-cover bg-white p-1" />
          </div>

          <nav className="flex-1 space-y-1">
            {allNavItems.map((item) => (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}>
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="p-4 mt-auto border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4 px-2">
              <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{user?.name}</span>
                <span className="text-xs text-sidebar-foreground/60 truncate">{user?.role}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header — logo only, + hamburger only if there are extra items */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b bg-sidebar text-sidebar-foreground z-50 flex items-center justify-between px-4">
        {/* Logo only — no title text */}
        <img src={logoImg} alt="Logo" className="h-7 w-auto rounded bg-white p-0.5" />

        {/* Hamburger for extra pages not in bottom nav */}
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
                <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider px-3 mb-3">
                  More
                </p>
                <nav className="flex-1 space-y-1">
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
                  <div className="flex items-center gap-3 mb-3 px-2">
                    <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium truncate">{user?.name}</span>
                      <span className="text-xs text-sidebar-foreground/60 truncate">{user?.role}</span>
                    </div>
                  </div>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 md:pt-0 min-h-screen">
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
