import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@workspace/api-client-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, X } from "lucide-react";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401_1774898763065.webp";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    setErrorMsg(null);
    loginMutation.mutate(
      { data },
      {
        onSuccess: (response) => {
          login(response.token, response.user);
          // Redirect based on role
          if (response.user.role === "ADMIN") {
            setLocation("/admin/dashboard");
          } else if (response.user.role === "CLIENT") {
            setLocation("/client/dashboard");
          } else {
            setLocation("/user/dashboard");
          }
        },
        onError: (error) => {
          setErrorMsg(error.error?.message || "Invalid email or password");
        },
      }
    );
  };

  const quickLogin = (email: string, password: string) => {
    form.setValue("email", email);
    form.setValue("password", password);
    setErrorMsg(null);
    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (response) => {
          login(response.token, response.user);
          if (response.user.role === "ADMIN") setLocation("/admin/dashboard");
          else if (response.user.role === "CLIENT") setLocation("/client/dashboard");
          else setLocation("/user/dashboard");
        },
        onError: () => setErrorMsg("Quick login failed"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 pb-20 md:pb-4">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <img src={logoImg} alt="YouTillEyes Logo" className="h-12 w-auto rounded shadow-sm" />
          <span className="font-bold text-2xl text-primary tracking-tight">YouTillEyes</span>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-lg border-0 ring-1 ring-slate-200 relative">
        <Link href="/">
          <button className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-slate-100 hover:text-foreground transition-colors z-10">
            <X className="h-5 w-5" />
          </button>
        </Link>
        <CardHeader className="space-y-1 text-center pb-6 pt-8">
          <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMsg && (
            <Alert variant="destructive" className="mb-6 bg-red-50 text-red-900 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMsg}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="name@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full h-11 text-base mt-6" 
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : null}
                Sign in to Dashboard
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6 bg-slate-50 rounded-b-xl">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Quick Demo Login */}
      <div className="mt-6 w-full max-w-md">
        <p className="text-center text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Quick Demo Login</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => quickLogin("user1@example.com", "User@123")}
            className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary hover:bg-primary/5 transition-all"
          >
            <span className="text-lg">👤</span>
            <span className="text-xs font-bold text-primary">User</span>
            <span className="text-[10px] text-muted-foreground">Demo</span>
          </button>
          <button
            type="button"
            onClick={() => quickLogin("client1@example.com", "Client@123")}
            className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-dashed border-secondary/40 hover:border-secondary hover:bg-secondary/5 transition-all"
          >
            <span className="text-lg">🏢</span>
            <span className="text-xs font-bold text-secondary">Client</span>
            <span className="text-[10px] text-muted-foreground">Demo</span>
          </button>
          <button
            type="button"
            onClick={() => quickLogin("admin1@youtilleyes.com", "Admin@123")}
            className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-gray-500 hover:bg-gray-50 transition-all"
          >
            <span className="text-lg">🛡️</span>
            <span className="text-xs font-bold text-gray-700">Admin</span>
            <span className="text-[10px] text-muted-foreground">Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
