import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Home, FolderOpen, LogIn, LayoutDashboard, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const getAvatarKey = (userId: number) => `youtilleyes_avatar_${userId}`;

export function MobileBottomNav() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [avatarSrc] = useState<string | null>(() => user?.id ? localStorage.getItem(getAvatarKey(user.id)) : null);

  const dashboardHref = user?.role === "ADMIN"
    ? "/admin/dashboard"
    : user?.role === "CLIENT"
    ? "/client/dashboard"
    : user?.role === "USER"
    ? "/user/dashboard"
    : null;

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
      {/* Home */}
      <Link href="/" style={{ flex: 1, display: "flex" }}>
        <div className={cn(
          "flex flex-col items-center justify-center gap-0.5 w-full transition-colors",
          location === "/" ? "text-primary" : "text-gray-400"
        )}>
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Home</span>
        </div>
      </Link>

      {/* Dashboard */}
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

      {/* Community — replaces Projects */}
      <Link href="/community" style={{ flex: 1, display: "flex" }}>
        <div className={cn(
          "flex flex-col items-center justify-center gap-0.5 w-full transition-colors relative",
          isActive("/community") ? "text-primary" : "text-gray-400"
        )}>
          {isActive("/community") && (
            <span className="absolute top-1.5 right-3 h-2 w-2 rounded-full animate-pulse" style={{ background: "#F58220" }} />
          )}
          <Users className="h-5 w-5" />
          <span className="text-[10px] font-semibold">Community</span>
        </div>
      </Link>

      {/* My Work */}
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
            avatarSrc ? (
              <img src={avatarSrc} alt="avatar" className={cn("h-6 w-6 rounded-full object-cover ring-2", isActive(profileHref) ? "ring-primary" : "ring-gray-300")} />
            ) : (
              <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
                isActive(profileHref) ? "bg-primary" : "bg-gray-400"
              )}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )
          ) : (
            <LogIn className="h-5 w-5" />
          )}
          <span className="text-[10px] font-semibold">{user ? "Profile" : "Login"}</span>
        </div>
      </Link>
    </nav>
  );
}
