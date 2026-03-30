import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import { CheckCircle2, Users, Building, ShieldCheck, ArrowRight, Briefcase, Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  const dashboardHref = user?.role === "ADMIN"
    ? "/admin/dashboard"
    : user?.role === "CLIENT"
    ? "/client/dashboard"
    : "/user/dashboard";

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logoImg}
              alt="YouTillEyes Logo"
              className="h-9 w-auto max-w-[44px] object-contain object-left"
              style={{ imageRendering: 'auto' }}
            />
            <span className="font-extrabold text-lg tracking-tight text-primary leading-none">
              YouTillEyes
              <span className="block text-[10px] font-medium text-muted-foreground tracking-normal leading-tight">Where Talent Meets Opportunity</span>
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href={dashboardHref}>
                <Button className="font-semibold bg-primary hover:bg-primary/90 text-white">
                  Go to Dashboard
                </Button>
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
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl" />
          
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 font-medium">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              The Premium Talent Marketplace
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6">
              Where Talent Meets <span className="text-primary">Opportunity</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect with top-tier professionals or find high-value projects. YouTillEyes provides a secure, structured platform for serious B2B collaboration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Hire Talent
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 w-full sm:w-auto hover:bg-slate-100">
                  Find Projects
                </Button>
              </Link>
            </div>
            
            <div className="mt-20 pt-10 border-t flex flex-wrap justify-center gap-10 text-muted-foreground font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-secondary h-5 w-5" /> Secure Escrow</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-secondary h-5 w-5" /> Vetted Professionals</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-secondary h-5 w-5" /> Dedicated Support</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Everything You Need to Succeed</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A full suite of tools designed to make hiring and working a seamless experience.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Smart Bidding", desc: "Submit structured proposals with timelines and budgets to stand out to clients.", icon: Briefcase },
                { title: "Secure Deliverables", desc: "Upload your work securely and track its approval status in real-time.", icon: ShieldCheck },
                { title: "Direct Communication", desc: "Clear channels for feedback and admin notes ensure everyone is aligned.", icon: Users },
                { title: "Admin Oversight", desc: "Every project is monitored by our admin team for quality and compliance.", icon: CheckCircle2 },
                { title: "Fast Approvals", desc: "Get your deliverables approved quickly with our streamlined review process.", icon: ArrowRight },
                { title: "Verified Profiles", desc: "Work with confidence knowing all users are vetted and verified.", icon: Building },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4">
                  <div className="mt-1 h-10 w-10 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-slate-900">{feature.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roles / How it works */}
        <section id="how-it-works" className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Built for Professional Success</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our platform is structured around clear roles to ensure accountability, transparency, and high-quality outcomes.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Clients</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Post detailed project briefs, review competitive bids from specialized talent, and manage deliverables through a streamlined dashboard.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Create structured projects</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Review candidate proposals</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Track submission progress</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Professionals</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Browse premium opportunities, submit structured bids, and deliver work through a system that ensures you get paid for your expertise.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-secondary" /> Access verified projects</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-secondary" /> Submit professional bids</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-secondary" /> Build your reputation</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Platform Security</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Our admin team monitors all activity, resolves disputes, and ensures high standards are maintained across all marketplace interactions.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-600" /> Quality assurance</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-600" /> Identity verification</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-600" /> Dispute resolution</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-4 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Everything you need to know about working on YouTillEyes.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "How do I get paid?", a: "Payments are handled securely through our platform. Once a client approves your submission, funds are released to your linked account." },
                { q: "Who can join the platform?", a: "We welcome verified businesses (Clients) and professional freelancers (Users). All profiles undergo a basic review process." },
                { q: "How does the bidding process work?", a: "Freelancers review open projects and submit a proposed amount, timeline, and cover letter. Clients review bids and select the best fit, at which point an Admin formalizes the assignment." },
                { q: "What happens if there's a dispute?", a: "Our Admin team acts as a mediator for any disagreements, ensuring fair resolutions based on the original project requirements and submitted work." }
              ].map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-lg p-6">
                  <h4 className="font-bold text-lg mb-2 text-slate-900">{faq.q}</h4>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">Ready to scale your workforce?</h2>
            <p className="text-primary-foreground/80 text-xl mb-10">Join thousands of businesses and professionals already collaborating on YouTillEyes.</p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>

        {/* 4-Column Footer */}
        <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

              {/* Column 1 – Company */}
              <div>
                <img src={logoImg} alt="YouTillEyes Logo" className="h-12 w-auto mb-4" />
                <p className="text-sm leading-relaxed text-slate-400 mb-5">
                  The premier B2B talent marketplace connecting exceptional professionals with high-value opportunities across Uttar Pradesh and beyond.
                </p>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-2">
                  <MapPin className="h-4 w-4 text-secondary shrink-0" />
                  Uttar Pradesh, India
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-2">
                  <Phone className="h-4 w-4 text-secondary shrink-0" />
                  +91 7084424242
                </div>
                <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-5">
                  <Mail className="h-4 w-4 text-secondary shrink-0" />
                  info@youtilleyes.com
                </div>
                <div className="flex gap-3">
                  <a href="#" aria-label="LinkedIn" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label="Twitter" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a href="#" aria-label="YouTube" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Column 2 – Our Pages */}
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Features", href: "#features" },
                    { label: "How it Works", href: "#how-it-works" },
                    { label: "Testimonials", href: "#testimonials" },
                    { label: "FAQ", href: "#faq" },
                    { label: "Contact Us", href: "#contact" },
                  ].map(link => (
                    <li key={link.label}>
                      <a href={link.href} className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 opacity-50" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3 – For Users & Clients */}
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Browse Projects", href: "/user/projects" },
                    { label: "Client Dashboard", href: "/client/dashboard" },
                    { label: "My Work", href: "/user/assigned" },
                    { label: "Post a Project", href: "/client/projects/create" },
                    { label: "My Bids", href: "/user/bids" },
                    { label: "Help & Support", href: "#contact" },
                  ].map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 opacity-50" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4 – Legal */}
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Terms & Conditions", href: "#" },
                    { label: "Privacy Policy", href: "#" },
                    { label: "Cookie Policy", href: "#" },
                    { label: "Refund Policy", href: "#" },
                    { label: "Disclaimer", href: "#" },
                    { label: "FAQ", href: "#faq" },
                  ].map(link => (
                    <li key={link.label}>
                      <a href={link.href} className="text-slate-400 hover:text-secondary transition-colors flex items-center gap-1.5">
                        <ArrowRight className="h-3 w-3 opacity-50" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <p>&copy; {new Date().getFullYear()} YouTillEyes. All rights reserved.</p>
              <p>Made with ❤ in Uttar Pradesh, India &nbsp;|&nbsp; Currency: ₹ INR</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
