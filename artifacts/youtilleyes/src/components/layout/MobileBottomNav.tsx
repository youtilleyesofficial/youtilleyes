import { Link, useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { Home, Briefcase, FolderOpen, User, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLogout } from "@workspace/api-client-react";

export function MobileBottomNav() {
  const { user, logout: clearAuth } = useAuth();
  const [location] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        clearAuth();
        setProfileOpen(false);
      },
    });
  };

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
    : "/user/assigned";

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <>
      <nav
        style={{ display: "flex" }}
        className="md:!hidden fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t-2 border-gray-100 h-16 items-stretch shadow-[0_-2px_10px_rgba(0,0,0,0.08)]"
      >
        {/* Home */}
        <Link href={homeHref} style={{ flex: 1, display: "flex" }}>
          <div className={cn(
            "flex flex-col items-center justify-center gap-0.5 w-full",
            isActive(homeHref) && location !== "/" || location === "/" && homeHref === "/"
              ? "text-primary"
              : isActive(homeHref) ? "text-primary" : "text-gray-400"
          )}>
            <Home className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Home</span>
          </div>
        </Link>

        {/* Live Projects */}
        <Link href={liveProjectsHref} style={{ flex: 1, display: "flex" }}>
          <div className={cn(
            "flex flex-col items-center justify-center gap-0.5 w-full",
            isActive(liveProjectsHref) ? "text-primary" : "text-gray-400"
          )}>
            <Briefcase className="h-5 w-5" />
            <span className="text-[10px] font-semibold">Live Projects</span>
          </div>
        </Link>

        {/* My Projects — only for logged-in users */}
        {user ? (
          <Link href={myProjectsHref} style={{ flex: 1, display: "flex" }}>
            <div className={cn(
              "flex flex-col items-center justify-center gap-0.5 w-full",
              isActive(myProjectsHref) ? "text-primary" : "text-gray-400"
            )}>
              <FolderOpen className="h-5 w-5" />
              <span className="text-[10px] font-semibold">My Projects</span>
            </div>
          </Link>
        ) : (
          <Link href="/register" style={{ flex: 1, display: "flex" }}>
            <div className={cn(
              "flex flex-col items-center justify-center gap-0.5 w-full",
              isActive("/register") ? "text-primary" : "text-gray-400"
            )}>
              <FolderOpen className="h-5 w-5" />
              <span className="text-[10px] font-semibold">My Projects</span>
            </div>
          </Link>
        )}

        {/* Profile / Login */}
        {user ? (
          <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
            <SheetTrigger asChild>
              <button style={{ flex: 1 }} className="flex flex-col items-center justify-center gap-0.5 text-gray-400">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[10px] font-semibold">Profile</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {user.role}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <Link href="/login" style={{ flex: 1, display: "flex" }}>
            <div className={cn(
              "flex flex-col items-center justify-center gap-0.5 w-full",
              isActive("/login") ? "text-primary" : "text-gray-400"
            )}>
              <LogIn className="h-5 w-5" />
              <span className="text-[10px] font-semibold">Login</span>
            </div>
          </Link>
        )}
      </nav>
    </>
  );
}
