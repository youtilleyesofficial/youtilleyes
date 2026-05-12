import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import {
  CheckCircle2, Users, Building, ShieldCheck, ArrowRight,
  Briefcase, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Phone, Mail, MapPin, Target, Star, Zap, Globe, Eye, Lightbulb
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Landing() {
  const { user } = useAuth();

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-background flex flex-col pb-16 md:pb-0">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logoImg} alt="YouTillEyes Logo" className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-semibold">Home</Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link href="/vision" className="text-muted-foreground hover:text-primary transition-colors">Vision</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
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
              Folks-Force Platform — People-Powered Ecosystem
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
              Aap Nazro Tak
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Utilize Yourself
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
              Discover Your Identity. Unlock Your Potential.
            </p>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              YouTillEyes is a people-powered ecosystem designed to help individuals identify their true abilities, purpose, and place in society — connecting talent with the right opportunities, projects, and missions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Join as Talent
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 w-full sm:w-auto hover:bg-slate-100">
                  Post a Project
                </Button>
              </Link>
            </div>

            <div className="mt-16 pt-10 border-t flex flex-wrap justify-center gap-10 text-muted-foreground font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="text-secondary h-5 w-5" /> Identify Yourself</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-secondary h-5 w-5" /> Showcase Your Skills</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="text-secondary h-5 w-5" /> Grow & Earn</div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 px-4 bg-primary text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">The Philosophy</div>
            <blockquote className="text-2xl md:text-3xl font-bold italic leading-relaxed mb-6">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Youtilleyes represents a modern framework of origin, existence, and human utilization — where individuals are recognized not only for who they are, but for what they can create, contribute, and achieve together.
            </p>
          </div>
        </section>

        {/* 6-Step Journey */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">It's All About You</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">The 6-Step Identify Yourself Journey</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A structured path from self-discovery to real-world opportunity and growth.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Identify Yourself", sub: "Who Are You?", desc: "Understand your personality, strengths, mindset, and purpose.", icon: Eye },
                { step: "02", title: "Identify Your Objectives", sub: "What Do You Want?", desc: "Define your goals, ambitions, and future direction.", icon: Target },
                { step: "03", title: "Identify Your Skills", sub: "What Can You Do?", desc: "Showcase your talents, expertise, and practical abilities.", icon: Star },
                { step: "04", title: "Identify Your Eligibility", sub: "Where Do You Fit?", desc: "Discover where your qualifications and capabilities fit best.", icon: CheckCircle2 },
                { step: "05", title: "Identify Your Tasks", sub: "What Work Suits You?", desc: "Connect with meaningful work, projects, and responsibilities.", icon: Briefcase },
                { step: "06", title: "Identify Your Platform", sub: "Where Will You Grow?", desc: "Find the right environment, people, and opportunities to grow.", icon: Globe },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div className="h-9 w-9 rounded bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs font-semibold text-secondary mb-2 uppercase tracking-wide">{item.sub}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Join */}
        <section className="py-24 px-4 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">It's Time to Explore</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Can Join YouTillEyes?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Whether you are a student, an artist, a professional, or a business — there is a place for you here.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "🎓", title: "Students & Learners", desc: "Have extraordinary skills and hobbies? Put them to work and make your pocket full." },
                { icon: "🏠", title: "Property Owners", desc: "Have spaces with no use? Turn them into earnings and fulfill your needs." },
                { icon: "🎨", title: "Starving Artists", desc: "Not yet exhibited in people's eyes? Become a professional — get the work and recognition you deserve." },
                { icon: "⭐", title: "Multi-Talented Professionals", desc: "Doing extra activities beyond your normal job? Turn yourself into a real life star in people's eyes." },
                { icon: "💡", title: "Buyers & Explorers", desc: "Want to buy things and explore the best worth? Make people come to your eyes — get everything right." },
                { icon: "🤝", title: "Helpful Individuals", desc: "Have helpful principles in favour of society? Get paid and receive the blessings of people." },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Folks-Force Platform */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">Folks-Force Platform</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  A Force of Capability, Collaboration & Creation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  The Folks-Force Platform is designed to build a powerful network that helps identify the right individuals for the right opportunities, projects, and missions. This is more than a platform — it is a movement.
                </p>
                <ul className="space-y-4">
                  {[
                    "Identify capable individuals",
                    "Build strong collaborative networks",
                    "Match people with suitable opportunities",
                    "Empower communities through talent utilization",
                    "Transform ideas into real-world execution",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="h-6 w-6 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-primary font-semibold italic">
                  "Because when the right people connect, everything becomes possible."
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "For Talent", desc: "Artists, Influencers, Experts & More", icon: Users, color: "bg-primary/10 text-primary" },
                  { label: "For Clients", desc: "Brands, Businesses, Projects", icon: Building, color: "bg-secondary/10 text-secondary" },
                  { label: "Grow & Earn", desc: "Collabs · Gigs · Visibility", icon: Zap, color: "bg-primary/10 text-primary" },
                  { label: "Smart Matching", desc: "Right People, Right Opportunities", icon: Lightbulb, color: "bg-secondary/10 text-secondary" },
                ].map((card, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100 text-center hover:shadow-md transition-shadow">
                    <div className={`h-12 w-12 rounded-full mx-auto mb-3 flex items-center justify-center ${card.color}`}>
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{card.label}</h4>
                    <p className="text-xs text-slate-500">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-24 px-4 bg-slate-50 border-t border-slate-100">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">User-Friendly Portal</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A portal designed to help you navigate opportunities through smart categorization and personalized selection.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Choose Your Interests", desc: "Personalize your experience by selecting what matters most to you.", icon: Star },
                { title: "Select Your User Stream", desc: "Whether you are a Talent, Client, or Explorer — choose your path.", icon: Target },
                { title: "Explore Relevant Categories", desc: "Browse curated categories matching your skills and objectives.", icon: Globe },
                { title: "Set Default Preferences", desc: "Configure your defaults and let the platform work for you.", icon: ShieldCheck },
                { title: "Connect with Community", desc: "Build real connections with like-minded people and collaborators.", icon: Users },
                { title: "Discover Opportunities", desc: "Find the right work, projects, and missions based on your profile.", icon: Briefcase },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex gap-4 hover:shadow-md transition-shadow">
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

        {/* How It Works - 3 Roles */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">How YouTillEyes Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">A structured platform for real outcomes — from posting projects to delivering excellence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Clients</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Post your projects, review proposals from skilled talent, and track progress through a clean dashboard.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Post structured projects</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Review talent proposals</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Receive final deliverables</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">For Talent</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Identify your skills, browse premium opportunities, bid on projects, and get paid for your expertise.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-secondary" /> Browse open projects</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-secondary" /> Submit professional bids</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-secondary" /> Earn & build reputation</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-slate-200 text-slate-700 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Admin Oversight</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">Our admin team monitors all activity, reviews submissions, and ensures quality standards across the platform.</p>
                <ul className="space-y-2 text-sm font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-600" /> Quality assurance</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-600" /> Submission review</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-slate-600" /> Fair dispute resolution</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Everything you need to know about YouTillEyes.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is YouTillEyes?", a: "YouTillEyes is a people-powered Folks-Force Platform designed to help individuals identify their true abilities, connect with the right opportunities, and grow through meaningful work and collaboration." },
                { q: "Who can join the platform?", a: "Everyone! Students, artists, professionals, property owners, businesses, and anyone with skills, time, or resources to offer. There is a place for every type of talent here." },
                { q: "How does the bidding process work?", a: "Talent browse open projects and submit proposals with timeline and budget. Clients review bids and select the best fit. Our Admin team formalizes the assignment and oversees quality." },
                { q: "How do I get paid?", a: "Once your submission is approved by the admin and forwarded to the client, earnings are credited to your wallet. You can request a withdrawal at any time." },
                { q: "What is the Folks-Force Platform?", a: "The Folks-Force Platform is our network engine — designed to identify capable individuals, build collaborative networks, and match people with the right missions and opportunities." },
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
            <div className="text-secondary text-sm font-bold uppercase tracking-widest mb-4">Be Seen · Get Hired · Grow Your Career</div>
            <h2 className="text-4xl font-bold mb-6">Ready to Utilize Yourself?</h2>
            <p className="text-primary-foreground/80 text-xl mb-10">
              Join the Folks-Force Platform. Identify your potential. Connect with the right people. Build something amazing together.
            </p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <img src={footerLogoImg} alt="YouTillEyes Logo" className="h-12 w-auto mb-4" />
                <p className="text-sm leading-relaxed text-slate-400 mb-5">
                  A people-powered ecosystem helping individuals identify their true abilities, purpose, and place in society. Aap Nazro Tak — Utilize Yourself.
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
                  {[
                    { icon: Linkedin, label: "LinkedIn" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: Instagram, label: "Instagram" },
                    { icon: Youtube, label: "YouTube" },
                  ].map(({ icon: Icon, label }) => (
                    <a key={label} href="#" aria-label={label} className="h-9 w-9 rounded-full bg-slate-700 hover:bg-secondary flex items-center justify-center transition-colors">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Home", href: "/" },
                    { label: "About Us", href: "/about" },
                    { label: "Vision", href: "/vision" },
                    { label: "Contact Us", href: "/contact" },
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
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Browse Projects", href: "/user/projects" },
                    { label: "Client Dashboard", href: "/client/dashboard" },
                    { label: "Post a Project", href: "/client/projects/new" },
                    { label: "My Bids", href: "/user/bids" },
                    { label: "My Submissions", href: "/user/submissions" },
                    { label: "My Wallet", href: "/user/wallet" },
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
              <div>
                <h4 className="text-white font-bold text-base mb-5 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Terms & Conditions", href: "#" },
                    { label: "Privacy Policy", href: "#" },
                    { label: "Cookie Policy", href: "#" },
                    { label: "Refund Policy", href: "#" },
                    { label: "Disclaimer", href: "#" },
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
