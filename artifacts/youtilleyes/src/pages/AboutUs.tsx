import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import {
  ArrowRight, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Phone, Mail, MapPin, Users, Target, Heart, Zap, Globe, CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AboutUs() {
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
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-semibold">About Us</Link>
            <Link href="/vision" className="text-muted-foreground hover:text-primary transition-colors">Vision</Link>
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
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              About YouTillEyes
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-6">
              Utilize Yourself.<br />
              <span className="text-primary">Aap Nazro Tak.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a people-powered ecosystem designed to help individuals identify their true abilities, purpose, and place in society.
            </p>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">What We Believe</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Everyone Carries Unique Value</h2>
            </div>
            <div className="prose prose-lg max-w-none text-slate-600 space-y-6">
              <p className="text-lg leading-relaxed">
                YouTillEyes was born from a simple but powerful belief — <strong className="text-foreground">every person carries unique value, skills, and potential that can contribute meaningfully to the world.</strong>
              </p>
              <p className="text-lg leading-relaxed">
                We believe that everyone has skills in their life that need to be utilized in the right directions to reach the right places and connections. It is people's right to make the world convenient — for themselves and for each other.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform creates a structured journey of self-identification, growth, collaboration, and opportunity, enabling people to connect through shared objectives, talents, and tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">Our Philosophy</div>
            <blockquote className="text-2xl md:text-3xl font-bold italic leading-relaxed mb-8">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
            <p className="text-primary-foreground/80 text-lg max-w-3xl mx-auto leading-relaxed">
              YouTillEyes represents a modern framework of origin, existence, and human utilization — where individuals are recognized not only for who they are, but for what they can create, contribute, and achieve together.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">What We Do</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Folks-Force Mission</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Through the Folks-Force Platform, we aim to build a powerful network that helps identify the right individuals for the right opportunities.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Target, title: "Identify Capable Individuals", desc: "We help people discover who they truly are — their strengths, skills, and purpose in society.", color: "bg-primary/10 text-primary" },
                { icon: Users, title: "Build Collaborative Networks", desc: "Connecting like-minded people, professionals, and businesses to achieve shared goals together.", color: "bg-secondary/10 text-secondary" },
                { icon: Zap, title: "Match People with Opportunities", desc: "Ensuring every person finds the right platform, project, or mission that fits their unique profile.", color: "bg-primary/10 text-primary" },
                { icon: Heart, title: "Empower Communities", desc: "Strengthening communities by putting individual talents to work for collective progress.", color: "bg-secondary/10 text-secondary" },
                { icon: Globe, title: "Real-World Execution", desc: "Transforming ideas, ambitions, and skills into real outcomes through structured collaboration.", color: "bg-primary/10 text-primary" },
                { icon: CheckCircle2, title: "A Force of Creation", desc: "When the right people connect, everything becomes possible. We make those connections happen.", color: "bg-secondary/10 text-secondary" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">Our Story</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">From Uttar Pradesh to the World</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                YouTillEyes was founded in Uttar Pradesh, India, with the vision of creating a platform where every individual — regardless of background, qualification, or location — can be seen, valued, and utilized for their unique capabilities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We saw a gap: countless talented people with extraordinary skills going unnoticed, while businesses and clients struggled to find the right people for their projects. We built YouTillEyes to bridge that gap — not just as a marketplace, but as a full ecosystem of identification, connection, and growth.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This is more than a platform — <strong className="text-foreground">it is a Force of Capability, Collaboration, and Creation.</strong> And we are just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of the Movement</h2>
            <p className="text-primary-foreground/80 text-xl mb-10">
              Join the Folks-Force Platform and help us build a world where every individual's potential is identified, valued, and utilized.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Join YouTillEyes
                </Button>
              </Link>
              <Link href="/vision">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white/10">
                  Read Our Vision
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
