import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Home, Briefcase, FolderOpen, LogIn, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { user } = useAuth();
  const [location] = useLocation();

  const dashboardHref = user?.role === "ADMIN"
    ? "/admin/dashboard"
    : user?.role === "CLIENT"
    ? "/client/dashboard"
    : user?.role === "USER"
    ? "/user/dashboard"
    : null;

  const liveProjectsHref = user?.role === "ADMIN"
    ? "/admin/projects"
    : user?.role === "USER"
    ? "/user/projects"
    : user?.role === "CLIENT"
    ? "/client/projects"
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

  return (
    <nav
      style={{ display: "flex" }}
      className="md:!hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-2 border-gray-100 h-16 items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.08)]"
    >
      {/* Home → always landing page */}
      <Link href="/" style={{ flex: 1, display: "flex" }}>
        <div className={cn(
          "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
          location === "/" ? "text-primary" : "text-gray-400"
        )}>
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </div>
      </Link>

      {/* Dashboard → role-specific dashboard (only when logged in) */}
      {user && dashboardHref ? (
        <Link href={dashboardHref} style={{ flex: 1, display: "flex" }}>
          <div className={cn(
            "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
            isActive(dashboardHref) ? "text-primary" : "text-gray-400"
          )}>
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Dashboard</span>
          </div>
        </Link>
      ) : (
        <Link href="/login" style={{ flex: 1, display: "flex" }}>
          <div className={cn(
            "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
            isActive("/login") ? "text-primary" : "text-gray-400"
          )}>
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Dashboard</span>
          </div>
        </Link>
      )}

      {/* Live / Browse Projects */}
      <Link href={liveProjectsHref} style={{ flex: 1, display: "flex" }}>
        <div className={cn(
          "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
          isActive(liveProjectsHref) && liveProjectsHref !== "/" ? "text-primary" : "text-gray-400"
        )}>
          <Briefcase className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Projects</span>
        </div>
      </Link>

      {/* My Projects / Assigned */}
      <Link href={myProjectsHref} style={{ flex: 1, display: "flex" }}>
        <div className={cn(
          "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
          isActive(myProjectsHref) ? "text-primary" : "text-gray-400"
        )}>
          <FolderOpen className="h-5 w-5" />
          <span className="text-[10px] font-semibold">My Work</span>
        </div>
      </Link>

      {/* Profile / Login */}
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
