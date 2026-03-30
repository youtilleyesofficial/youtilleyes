import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegister } from "@workspace/api-client-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2, X } from "lucide-react";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401_1774898763065.webp";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CLIENT", "USER"]),
  phone: z.string().optional(),
  bio: z.string().optional(),
  skills: z.string().optional(),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "CLIENT",
      phone: "",
      bio: "",
      skills: "",
    },
  });

  const registerMutation = useRegister();
  const selectedRole = form.watch("role");

  const onSubmit = (data: RegisterFormValues) => {
    setErrorMsg(null);
    registerMutation.mutate(
      { data },
      {
        onSuccess: (response) => {
          login(response.token, response.user);
          if (response.user.role === "CLIENT") {
            setLocation("/client/dashboard");
          } else {
            setLocation("/user/dashboard");
          }
        },
        onError: (error) => {
          setErrorMsg(error.error?.message || "Registration failed");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 py-12 pb-20 md:pb-12">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <img src={logoImg} alt="YouTillEyes Logo" className="h-12 w-auto rounded shadow-sm" />
          <span className="font-bold text-2xl text-primary tracking-tight">YouTillEyes</span>
        </Link>
      </div>

      <Card className="w-full max-w-xl shadow-lg border-0 ring-1 ring-slate-200 relative">
        <Link href="/">
          <button className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-slate-100 hover:text-foreground transition-colors z-10">
            <X className="h-5 w-5" />
          </button>
        </Link>
        <CardHeader className="space-y-1 text-center pb-6 pt-8">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>
            Join the premium marketplace for professionals
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>I want to</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="CLIENT">Hire Talent (Client)</SelectItem>
                          <SelectItem value="USER">Find Projects (Freelancer)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t pt-4 mt-6">
                <h4 className="text-sm font-medium mb-4 text-muted-foreground">Optional Details</h4>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedRole === "USER" && (
                  <>
                    <FormField
                      control={form.control}
                      name="skills"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Skills (comma separated)</FormLabel>
                          <FormControl>
                            <Input placeholder="React, Node.js, Design..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Professional Bio</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell clients about your experience..." className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base mt-8" 
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : null}
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6 bg-slate-50 rounded-b-xl">
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
