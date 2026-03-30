import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Home, Briefcase, FolderOpen, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { user } = useAuth();
  const [location] = useLocation();

  const homeHref = user?.role === "ADMIN"
    ? "/admin/dashboard"
    : user?.role === "CLIENT"
    ? "/client/dashboard"
    : user?.role === "USER"
    ? "/user/dashboard"
    : "/";

  const liveProjectsHref = user?.role === "ADMIN"
    ? "/admin/projects"
    : user?.role === "USER"
    ? "/user/projects"
    : "/";

  const myProjectsHref = user?.role === "ADMIN"
    ? "/admin/projects"
    : user?.role === "CLIENT"
    ? "/client/projects"
    : user?.role === "USER"
    ? "/user/assigned"
    : "/register";

  const profileHref = user ? "/profile" : "/login";

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  const tabs = [
    { href: homeHref, icon: Home, label: "Home" },
    { href: liveProjectsHref, icon: Briefcase, label: "Live Projects" },
    { href: myProjectsHref, icon: FolderOpen, label: "My Projects" },
  ];

  return (
    <nav
      style={{ display: "flex" }}
      className="md:!hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-2 border-gray-100 h-16 items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.08)]"
    >
      {tabs.map(({ href, icon: Icon, label }) => (
        <Link key={label} href={href} style={{ flex: 1, display: "flex" }}>
          <div className={cn(
            "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
            isActive(href) ? "text-primary" : "text-gray-400"
          )}>
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-semibold">{label}</span>
          </div>
        </Link>
      ))}

      {/* Profile / Login tab */}
      <Link href={profileHref} style={{ flex: 1, display: "flex" }}>
        <div className={cn(
          "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
          isActive(profileHref) ? "text-primary" : "text-gray-400"
        )}>
          {user ? (
            <div className={cn(
              "h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
              isActive(profileHref) ? "bg-primary" : "bg-gray-400"
            )}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <LogIn className="h-5 w-5" />
          )}
          <span className="text-[10px] font-semibold">{user ? "Profile" : "Login"}</span>
        </div>
      </Link>
    </nav>
  );
}
