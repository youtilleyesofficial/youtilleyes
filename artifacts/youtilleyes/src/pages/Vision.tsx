import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import {
  ArrowRight, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Phone, Mail, MapPin, Eye, Target, Star, Zap, Globe, Users,
  CheckCircle2, Lightbulb, TrendingUp
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Vision() {
  const { user } = useAuth();
  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <img src={logoImg} alt="YouTillEyes Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="/vision" className="text-foreground hover:text-primary transition-colors font-semibold">Vision</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href={dashboardHref}>
                <Button className="font-semibold bg-primary hover:bg-primary/90 text-white">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="hidden sm:flex font-medium">Log in</Button>
                </Link>
                <Link href="/register">
                  <Button className="font-medium bg-secondary hover:bg-secondary/90 text-secondary-foreground">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 md:py-28 px-4 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 font-medium">
              <Eye className="h-4 w-4 mr-2" />
              Our Vision
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              A World Where Every<br />
              <span className="text-primary">Individual is Seen</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We envision a future where no talent goes unnoticed, no potential remains unused, and every person finds their right place in the world.
            </p>
          </div>
        </section>

        {/* Vision Statement */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">The Big Picture</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Aap Nazro Tak — <span className="italic">Until You Are Seen</span>
            </h2>
            <p className="text-primary-foreground/80 text-xl leading-relaxed max-w-3xl mx-auto mb-8">
              Our vision is to create a world where every individual's identity, skills, and purpose are identified, recognized, and put to meaningful use — where talent meets opportunity at every level of society.
            </p>
            <blockquote className="text-2xl font-bold italic border-l-4 border-secondary pl-6 text-left max-w-2xl mx-auto">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
          </div>
        </section>

        {/* The 6 Identifications */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">The Identify Yourself Framework</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision for Every Individual</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We see a future where every person walks through these 6 stages of self-identification and finds their rightful place.
              </p>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
              <div className="space-y-12">
                {[
                  {
                    step: "01", icon: Eye, title: "Identify Yourself — Who Are You?",
                    desc: "We envision a world where every person deeply understands their own personality, strengths, mindset, and purpose. Self-awareness is the first step to a meaningful life.",
                    side: "left"
                  },
                  {
                    step: "02", icon: Target, title: "Identify Your Objectives",
                    desc: "A future where individuals are empowered to clearly define their goals, ambitions, and direction — and have the support structures to pursue them confidently.",
                    side: "right"
                  },
                  {
                    step: "03", icon: Star, title: "Identify Your Skills",
                    desc: "We envision a platform where talent — from art to technology, from trades to leadership — is recognized, showcased, and valued equally.",
                    side: "left"
                  },
                  {
                    step: "04", icon: CheckCircle2, title: "Identify Your Eligibility",
                    desc: "A world where qualifications and capabilities are matched intelligently to the right roles and opportunities — creating perfect fits rather than mismatched placements.",
                    side: "right"
                  },
                  {
                    step: "05", icon: Zap, title: "Identify Your Tasks",
                    desc: "We see a future where meaningful work finds the right person — every project, mission, and responsibility connected to the most capable individual for the job.",
                    side: "left"
                  },
                  {
                    step: "06", icon: Globe, title: "Identify Your Platform",
                    desc: "Our ultimate vision: every individual finds their perfect environment — the right community, network, and ecosystem to grow, collaborate, and thrive.",
                    side: "right"
                  },
                ].map((item, i) => (
                  <div key={i} className={`grid lg:grid-cols-2 gap-8 items-center ${item.side === "right" ? "lg:grid-flow-dense" : ""}`}>
                    <div className={`${item.side === "right" ? "lg:col-start-2" : ""}`}>
                      <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold shrink-0">
                            {item.step}
                          </div>
                          <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                            <item.icon className="h-5 w-5" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className={`hidden lg:flex justify-center ${item.side === "right" ? "lg:col-start-1 lg:row-start-auto" : ""}`}>
                      <div className="h-16 w-16 rounded-full bg-primary/10 border-4 border-white shadow-lg flex items-center justify-center">
                        <item.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Utilize Points */}
        <section className="py-24 px-4 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">Utilize Point</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Want to Create</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our vision is built on the idea of exposing, empowering, and enabling every individual in society.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Eye, title: "Expose",
                  desc: "Be exposed around the society — make yourself visible everywhere at once. Get your needs fulfilled from anywhere by someone who can carry and take care of your requirements wherever you are.",
                  color: "bg-primary/10 text-primary"
                },
                {
                  icon: TrendingUp, title: "Empower",
                  desc: "Every talent, every skill, every individual ability deserves a platform to grow. We envision a world where people are empowered to utilize themselves at every level — personally, professionally, and socially.",
                  color: "bg-secondary/10 text-secondary"
                },
                {
                  icon: Users, title: "Connect",
                  desc: "Building bridges between people who have skills and people who need them. From students to businesses, from artists to organizations — the right connection changes everything.",
                  color: "bg-primary/10 text-primary"
                },
                {
                  icon: Lightbulb, title: "Enable",
                  desc: "Creating the conditions where ideas become actions, where potential becomes achievement, and where individuals become the leaders of their own success story.",
                  color: "bg-secondary/10 text-secondary"
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 ${item.color}`}>
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Folks-Force Vision */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">Folks-Force Platform</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">When the Right People Connect,<br />Everything Becomes Possible</h2>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-10 border border-primary/10">
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Through the Folks-Force Platform, we are building a powerful global network — a collaborative force that identifies the right individuals for the right opportunities, missions, and projects.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                {[
                  { label: "Identify", desc: "Capable individuals across all fields", icon: Eye },
                  { label: "Connect", desc: "Build strong collaborative networks", icon: Users },
                  { label: "Create", desc: "Transform ideas into real-world outcomes", icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.label}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Help Us Build This Future</h2>
            <p className="text-primary-foreground/80 text-xl mb-10">
              Join the Folks-Force Platform. Be seen. Utilize yourself. Together, we will create a world where every individual's potential is recognized and realized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Join YouTillEyes
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white/10">
                  Read About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <img src={footerLogoImg} alt="YouTillEyes Logo" className="h-12 w-auto mb-4" />
                <p className="text-sm leading-relaxed text-slate-400 mb-5">
                  Aap Nazro Tak — Utilize Yourself. A people-powered ecosystem helping individuals identify their true abilities and connect with the right opportunities.
                </p>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-2">
                  <MapPin className="h-4 w-4 text-secondary shrink-0" />Uttar Pradesh, India
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-2">
                  <Phone className="h-4 w-4 text-secondary shrink-0" />+91 7084424242
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-5">
                  <Mail className="h-4 w-4 text-secondary shrink-0" />info@youtilleyes.com
                </div>
                <div className="flex gap-3">
                  {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-3 text-sm">
                  {[{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Vision", href: "/vision" }, { label: "Contact Us", href: "/contact" }].map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 opacity-50" />{link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Browse Projects", href: "/user/projects" },
                    { label: "Post a Project", href: "/client/projects/new" },
                    { label: "My Bids", href: "/user/bids" },
                    { label: "My Wallet", href: "/user/wallet" },
                  ].map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 opacity-50" />{link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3 text-sm">
                  {["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Refund Policy", "Disclaimer"].map(label => (
                    <li key={label}>
                      <a href="#" className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 opacity-50" />{label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <p>&copy; {new Date().getFullYear()} YouTillEyes. All rights reserved.</p>
              <p>Made with ❤ Niskutech &nbsp;|&nbsp; Currency: ₹ INR</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
