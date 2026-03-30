import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useLogout } from "@workspace/api-client-react";
import { LogOut, Home, Briefcase, FileText, Users, Activity, Menu, User, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const [profileOpen, setProfileOpen] = useState(false);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuth();
      },
    });
  };

  let navItems: NavItem[] = [];

  if (user?.role === "ADMIN") {
    navItems = [
      { title: "Dashboard", href: "/admin/dashboard", icon: Activity },
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Projects", href: "/admin/projects", icon: Briefcase },
      { title: "Bids", href: "/admin/bids", icon: FileText },
      { title: "Submissions", href: "/admin/submissions", icon: FileText },
    ];
  } else if (user?.role === "CLIENT") {
    navItems = [
      { title: "Dashboard", href: "/client/dashboard", icon: Activity },
      { title: "My Projects", href: "/client/projects", icon: Briefcase },
    ];
  } else if (user?.role === "USER") {
    navItems = [
      { title: "Dashboard", href: "/user/dashboard", icon: Activity },
      { title: "Browse Projects", href: "/user/projects", icon: Briefcase },
      { title: "My Bids", href: "/user/bids", icon: FileText },
      { title: "Assigned Projects", href: "/user/assigned", icon: Briefcase },
      { title: "My Submissions", href: "/user/submissions", icon: FileText },
    ];
  }

  const NavLinks = () => (
    <>
      <div className="flex items-center gap-3 px-2 py-4 mb-6">
        <img src={logoImg} alt="YouTillEyes Logo" className="h-8 w-auto rounded object-cover bg-white p-1" />
        <span className="font-bold text-lg tracking-tight">YouTillEyes</span>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}>
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
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
    </>
  );

  const homeHref = user?.role === "ADMIN" ? "/admin/dashboard" : user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";
  const liveProjectsHref = user?.role === "ADMIN" ? "/admin/projects" : user?.role === "CLIENT" ? "/client/dashboard" : "/user/projects";
  const myProjectsHref = user?.role === "ADMIN" ? "/admin/projects" : user?.role === "CLIENT" ? "/client/projects" : "/user/assigned";

  const bottomNavItems = [
    { title: "Home", href: homeHref, icon: Home },
    { title: "Live Projects", href: liveProjectsHref, icon: Briefcase },
    { title: "My Projects", href: myProjectsHref, icon: FolderOpen },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="flex flex-col flex-1 p-4 h-full">
          <NavLinks />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b bg-sidebar text-sidebar-foreground z-50 flex items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4 flex flex-col bg-sidebar text-sidebar-foreground border-sidebar-border">
            <NavLinks />
          </SheetContent>
        </Sheet>
        <div className="ml-4 flex items-center gap-2">
          <img src={logoImg} alt="Logo" className="h-6 w-auto rounded bg-white p-0.5" />
          <span className="font-bold">YouTillEyes</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 md:pt-0 min-h-screen">
        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-20 md:pb-8">
          {children}
        </div>
      </main>

      {/* Mobile Sticky Bottom Nav */}
      <nav
        style={{ display: 'flex' }}
        className="md:!hidden fixed bottom-0 left-0 right-0 z-[999] bg-white border-t-2 border-gray-200 h-16 items-stretch"
      >
        {bottomNavItems.map((item) => {
          const isActive = location === item.href || location.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} style={{ flex: 1, display: 'flex' }}>
              <div className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
                isActive ? "text-primary" : "text-gray-400"
              )}>
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-semibold leading-tight text-center">{item.title}</span>
              </div>
            </Link>
          );
        })}
        {/* Profile tab */}
        <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
          <SheetTrigger asChild>
            <button style={{ flex: 1 }} className="flex flex-col items-center justify-center gap-0.5 text-gray-400 transition-colors">
              <User className="h-5 w-5" />
              <span className="text-[10px] font-semibold leading-tight">Profile</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="rounded-t-2xl p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {user?.role}
                </span>
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  setProfileOpen(false);
                  handleLogout();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
