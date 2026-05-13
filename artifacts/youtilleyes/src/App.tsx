import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import { useHealthCheck, getHealthCheckQueryKey } from "@workspace/api-client-react";

// Public Pages
import Landing from "@/pages/Landing";
import AboutUs from "@/pages/AboutUs";
import Vision from "@/pages/Vision";
import ContactUs from "@/pages/ContactUs";
import Services from "@/pages/Services";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

// Client Pages
import ClientDashboard from "@/pages/client/Dashboard";
import ClientProjects from "@/pages/client/Projects";
import CreateProject from "@/pages/client/CreateProject";
import ClientProjectDetail from "@/pages/client/ProjectDetail";

// User Pages
import UserDashboard from "@/pages/user/Dashboard";
import BrowseProjects from "@/pages/user/BrowseProjects";
import UserProjectDetail from "@/pages/user/ProjectDetail";
import MyBids from "@/pages/user/MyBids";
import AssignedProjects from "@/pages/user/AssignedProjects";
import SubmitWork from "@/pages/user/SubmitWork";
import MySubmissions from "@/pages/user/MySubmissions";

// Community Page
import Community from "@/pages/Community";

// Profile Page
import ProfilePage from "@/pages/Profile";

// Admin Routes
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminProjects from "@/pages/admin/Projects";
import AdminProjectDetail from "@/pages/admin/ProjectDetail";
import AdminBids from "@/pages/admin/Bids";
import AdminSubmissions from "@/pages/admin/Submissions";
import AdminWithdrawals from "@/pages/admin/Withdrawals";

// User Wallet
import WalletPage from "@/pages/user/Wallet";

const queryClient = new QueryClient();

// Protected Route (no layout wrapper)
function ProtectedRouteRaw({ component: Component }: { component: any }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (!isLoading && !user) setLocation("/login");
  }, [isLoading, user, setLocation]);
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!user) return null;
  return <Component />;
}

// Protected Route Wrapper
function ProtectedRoute({ component: Component, allowedRoles }: { component: any, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useHealthCheck({
    query: { queryKey: getHealthCheckQueryKey(), staleTime: 60000 }
  });

  useEffect(() => {
    if (isLoading) return;
    if (!user) { setLocation("/login"); return; }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      if (user.role === "ADMIN") setLocation("/admin/dashboard");
      else if (user.role === "CLIENT") setLocation("/client/dashboard");
      else setLocation("/user/dashboard");
    }
  }, [isLoading, user, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;
  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={Landing} />
      <Route path="/about" component={AboutUs} />
      <Route path="/services" component={Services} />
      <Route path="/vision" component={Vision} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Client Routes */}
      <Route path="/client/dashboard">
        {() => <ProtectedRoute component={ClientDashboard} allowedRoles={["CLIENT"]} />}
      </Route>
      <Route path="/client/projects/new">
        {() => <ProtectedRoute component={CreateProject} allowedRoles={["CLIENT"]} />}
      </Route>
      <Route path="/client/projects/:id">
        {() => <ProtectedRoute component={ClientProjectDetail} allowedRoles={["CLIENT"]} />}
      </Route>
      <Route path="/client/projects">
        {() => <ProtectedRoute component={ClientProjects} allowedRoles={["CLIENT"]} />}
      </Route>

      {/* User Routes */}
      <Route path="/user/dashboard">
        {() => <ProtectedRoute component={UserDashboard} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/projects/:id">
        {() => <ProtectedRoute component={UserProjectDetail} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/projects">
        {() => <ProtectedRoute component={BrowseProjects} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/bids">
        {() => <ProtectedRoute component={MyBids} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/assigned">
        {() => <ProtectedRoute component={AssignedProjects} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/submit/:id">
        {() => <ProtectedRoute component={SubmitWork} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/submissions">
        {() => <ProtectedRoute component={MySubmissions} allowedRoles={["USER"]} />}
      </Route>
      <Route path="/user/wallet">
        {() => <ProtectedRoute component={WalletPage} allowedRoles={["USER"]} />}
      </Route>

      {/* Community Route */}
      <Route path="/community" component={Community} />

      {/* Profile Route */}
      <Route path="/profile">
        {() => <ProtectedRouteRaw component={ProfilePage} />}
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        {() => <ProtectedRoute component={AdminDashboard} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/users">
        {() => <ProtectedRoute component={AdminUsers} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/projects/:id">
        {() => <ProtectedRoute component={AdminProjectDetail} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/projects">
        {() => <ProtectedRoute component={AdminProjects} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/bids">
        {() => <ProtectedRoute component={AdminBids} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/submissions">
        {() => <ProtectedRoute component={AdminSubmissions} allowedRoles={["ADMIN"]} />}
      </Route>
      <Route path="/admin/withdrawals">
        {() => <ProtectedRoute component={AdminWithdrawals} allowedRoles={["ADMIN"]} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <Router />
            <MobileBottomNav />
          </AuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
