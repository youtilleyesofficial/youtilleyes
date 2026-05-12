import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function HeroIllustration() {
  return (
    <svg viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="260" cy="210" r="120" fill="#1A428A" fillOpacity="0.07" />
      <circle cx="260" cy="210" r="80" fill="#1A428A" fillOpacity="0.08" />
      <circle cx="260" cy="210" r="40" fill="#F58220" fillOpacity="0.18" />
      <circle cx="260" cy="210" r="18" fill="#F58220" fillOpacity="0.85" />
      <circle cx="260" cy="210" r="10" fill="#F58220" />
      {[
        { cx: 120, cy: 100 }, { cx: 390, cy: 90 }, { cx: 420, cy: 280 },
        { cx: 100, cy: 310 }, { cx: 220, cy: 60 }, { cx: 370, cy: 180 },
        { cx: 145, cy: 220 }, { cx: 310, cy: 355 },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.cx} y1={n.cy} x2="260" y2="210" stroke="#1A428A" strokeWidth="1.2" strokeOpacity="0.25" strokeDasharray="5 4" />
          <circle cx={n.cx} cy={n.cy} r="22" fill="#1A428A" fillOpacity="0.08" />
          <circle cx={n.cx} cy={n.cy} r="13" fill="#1A428A" fillOpacity="0.15" />
          <circle cx={n.cx} cy={n.cy} r="7" fill="#1A428A" fillOpacity="0.7" />
        </g>
      ))}
      <circle cx="420" cy="280" r="7" fill="#F58220" fillOpacity="0.9" />
      <circle cx="120" cy="100" r="7" fill="#F58220" fillOpacity="0.9" />
      <text x="130" y="58" fontSize="11" fill="#1A428A" fontWeight="600" opacity="0.7">Talent</text>
      <text x="370" y="72" fontSize="11" fill="#F58220" fontWeight="600" opacity="0.9">Client</text>
      <text x="425" y="300" fontSize="11" fill="#1A428A" fontWeight="600" opacity="0.7">Growth</text>
      <text x="58" y="330" fontSize="11" fill="#F58220" fontWeight="600" opacity="0.9">Skills</text>
      <text x="190" y="38" fontSize="11" fill="#1A428A" fontWeight="600" opacity="0.7">Identify</text>
      <text x="320" y="175" fontSize="11" fill="#1A428A" fontWeight="600" opacity="0.7">Connect</text>
      <rect x="30" y="370" width="460" height="2" rx="1" fill="#1A428A" fillOpacity="0.07" />
      <text x="200" y="396" fontSize="13" fill="#1A428A" fontWeight="700" opacity="0.55">Folks-Force Platform</text>
    </svg>
  );
}

function NetworkIllustration() {
  return (
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="400" height="260" rx="16" fill="#1A428A" fillOpacity="0.04" />
      {[60,160,260,340].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={90} r="28" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.13" />
          <circle cx={x} cy={90} r="16" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.22" />
          <circle cx={x} cy={90} r="8" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.8" />
          {i < 3 && <line x1={x + 16} y1={90} x2={[60,160,260,340][i+1] - 16} y2={90} stroke="#1A428A" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="6 4"/>}
        </g>
      ))}
      <rect x="30" y="140" width="80" height="8" rx="4" fill="#1A428A" fillOpacity="0.15" />
      <rect x="130" y="140" width="80" height="8" rx="4" fill="#F58220" fillOpacity="0.2" />
      <rect x="230" y="140" width="80" height="8" rx="4" fill="#1A428A" fillOpacity="0.15" />
      <rect x="310" y="140" width="60" height="8" rx="4" fill="#F58220" fillOpacity="0.2" />
      <rect x="30" y="158" width="50" height="6" rx="3" fill="#1A428A" fillOpacity="0.09" />
      <rect x="130" y="158" width="60" height="6" rx="3" fill="#1A428A" fillOpacity="0.09" />
      <rect x="230" y="158" width="55" height="6" rx="3" fill="#1A428A" fillOpacity="0.09" />
      <rect x="310" y="158" width="45" height="6" rx="3" fill="#1A428A" fillOpacity="0.09" />
      <circle cx="200" cy="210" r="30" fill="#F58220" fillOpacity="0.1" />
      <circle cx="200" cy="210" r="16" fill="#F58220" fillOpacity="0.2" />
      <circle cx="200" cy="210" r="8" fill="#F58220" fillOpacity="0.85" />
      <line x1="60" y1="105" x2="180" y2="200" stroke="#F58220" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4"/>
      <line x1="340" y1="105" x2="220" y2="200" stroke="#F58220" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4"/>
    </svg>
  );
}

function StepGraphic({ number, color }: { number: string; color: string }) {
  return (
    <div className="relative">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg`} style={{ background: color }}>
        {number}
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Vision", href: "/vision" },
  { label: "Contact Us", href: "/contact" },
];

const footerQuickLinks = [
  { label: "Browse Projects", href: "/user/projects" },
  { label: "Client Dashboard", href: "/client/dashboard" },
  { label: "Post a Project", href: "/client/projects/new" },
  { label: "My Bids", href: "/user/bids" },
  { label: "My Submissions", href: "/user/submissions" },
  { label: "My Wallet", href: "/user/wallet" },
];

export default function Landing() {
  const { user } = useAuth();
  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <img src={logoImg} alt="YouTillEyes" className="h-10 w-auto" />
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href={dashboardHref}><Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Go to Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" className="hidden sm:flex text-slate-600 font-medium">Log in</Button></Link>
                <Link href="/register"><Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold">Get Started</Button></Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-orange-50/30 py-20 md:py-28 px-6">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-semibold mb-8">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                  Folks-Force Platform
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 leading-tight">
                  Aap Nazro Tak
                </h1>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-5" style={{ color: "#F58220" }}>
                  Utilize Yourself
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-4">
                  Discover your identity. Unlock your potential.
                </p>
                <p className="text-base text-slate-500 leading-relaxed mb-10">
                  YouTillEyes is a people-powered ecosystem that helps individuals identify their true abilities, purpose, and place in society — connecting talent with the right opportunities, projects, and missions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register">
                    <Button size="lg" className="h-13 px-8 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 w-full sm:w-auto">
                      Join as Talent
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" variant="outline" className="h-13 px-8 text-base font-semibold border-2 border-slate-200 hover:border-primary hover:text-primary w-full sm:w-auto">
                      Post a Project
                    </Button>
                  </Link>
                </div>
                <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-500 font-medium">
                  <span className="flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</span> Identify Yourself</span>
                  <span className="flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</span> Showcase Skills</span>
                  <span className="flex items-center gap-2"><span className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">✓</span> Grow and Earn</span>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 px-6 border-y border-slate-100 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "6", label: "Identify Steps", color: "#1A428A" },
                { num: "100%", label: "People Powered", color: "#F58220" },
                { num: "3", label: "User Roles", color: "#1A428A" },
                { num: "1", label: "Mission: You", color: "#F58220" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-5xl font-black mb-1" style={{ color: s.color }}>{s.num}</div>
                  <div className="text-sm text-slate-500 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-secondary text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "#F58220" }}>The Philosophy Behind YouTillEyes</p>
            <blockquote className="text-2xl md:text-4xl font-bold italic leading-relaxed mb-8">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              YouTillEyes represents a modern framework of origin, existence, and human utilization — where individuals are recognized not only for who they are, but for what they can create, contribute, and achieve together. Through the Folks-Force Platform, we build powerful networks that help identify the right individuals for the right opportunities.
            </p>
          </div>
        </section>

        {/* 6-Step Journey */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>It's All About You</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">The Identify Yourself Journey</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">A structured path from self-discovery to real-world opportunity — six steps that transform who you are into what you can achieve.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { n: "01", title: "Identify Yourself", tag: "Who Are You?", desc: "Understand your personality, strengths, mindset, and purpose. Self-awareness is the foundation of everything great you will build.", gradient: "from-blue-600 to-blue-800" },
                { n: "02", title: "Identify Your Objectives", tag: "What Do You Want?", desc: "Define your goals, ambitions, and future direction. A person with clear objectives moves forward with unstoppable momentum.", gradient: "from-orange-500 to-orange-700" },
                { n: "03", title: "Identify Your Skills", tag: "What Can You Do?", desc: "Showcase your talents, expertise, and practical abilities. Every skill you own has the power to change someone else's world.", gradient: "from-blue-700 to-indigo-800" },
                { n: "04", title: "Identify Your Eligibility", tag: "Where Do You Fit?", desc: "Discover where your qualifications and capabilities fit best. The right fit creates extraordinary results for both you and those around you.", gradient: "from-orange-600 to-red-600" },
                { n: "05", title: "Identify Your Tasks", tag: "What Work Suits You?", desc: "Connect with meaningful work, projects, and responsibilities. Purposeful work is not just a job — it is a contribution to something greater.", gradient: "from-blue-500 to-blue-700" },
                { n: "06", title: "Identify Your Platform", tag: "Where Will You Grow?", desc: "Find the right environment, people, and opportunities to grow. The right platform amplifies your potential beyond what you imagined.", gradient: "from-orange-500 to-yellow-600" },
              ].map((item, i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-transparent hover:-translate-y-1">
                  <div className={`h-2 bg-gradient-to-r ${item.gradient}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} text-white font-black text-lg flex items-center justify-center shadow-md`}>
                        {item.n}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.tag}</p>
                        <h4 className="font-bold text-slate-900 text-sm leading-tight">{item.title}</h4>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Join */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>Time to Explore</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">Who Can Join YouTillEyes?</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Whether you are a student with extraordinary hobbies, an artist waiting to be discovered, or a professional with skills to share — your place is here.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: "🎓", title: "Students and Learners", desc: "You have extraordinary skills and hobbies that the world needs to see. Turn your passion into earnings and build your future today.", bg: "bg-blue-50", border: "border-blue-100" },
                { emoji: "🏠", title: "Property Owners", desc: "You have spaces sitting idle with unused potential. Now is the time to turn them into earnings and fulfill all your needs.", bg: "bg-orange-50", border: "border-orange-100" },
                { emoji: "🎨", title: "Artists and Creators", desc: "You have not yet been exhibited in people's eyes. Become the professional you are meant to be and get the recognition your work deserves.", bg: "bg-blue-50", border: "border-blue-100" },
                { emoji: "⭐", title: "Multi-Talented Professionals", desc: "You do extraordinary things beyond your normal job. Let the world see the real star you are and turn your extra talent into real opportunity.", bg: "bg-orange-50", border: "border-orange-100" },
                { emoji: "💡", title: "Buyers and Explorers", desc: "You want to find the best worth for what you seek. Let people come to your eyes and discover everything you need right here.", bg: "bg-blue-50", border: "border-blue-100" },
                { emoji: "🤝", title: "Helpful Individuals", desc: "You carry helpful principles in favour of society. Now get recognized, get paid, and receive the gratitude your service truly earns.", bg: "bg-orange-50", border: "border-orange-100" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} border ${item.border} rounded-2xl p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <div className="text-5xl mb-5">{item.emoji}</div>
                  <h4 className="font-bold text-slate-900 text-lg mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Folks-Force */}
        <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full" style={{ background: "#F58220", opacity: 0.05 }} />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#F58220" }}>Folks-Force Platform</p>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">A Force of Capability, Collaboration and Creation</h2>
                <p className="text-blue-200 text-lg leading-relaxed mb-8">
                  The Folks-Force Platform is designed to build a powerful network that helps identify the right individuals for the right opportunities, projects, and missions. This is more than a platform — it is a movement that transforms ideas into real-world execution.
                </p>
                <p className="text-white font-bold text-lg italic mb-10" style={{ borderLeft: "4px solid #F58220", paddingLeft: "1rem" }}>
                  "Because when the right people connect, everything becomes possible."
                </p>
                <Link href="/register">
                  <Button size="lg" className="h-13 px-8 font-bold text-base" style={{ background: "#F58220", color: "white" }}>
                    Join the Platform
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { n: "01", text: "Identify capable individuals across all fields and backgrounds" },
                  { n: "02", text: "Build strong collaborative networks between people and organizations" },
                  { n: "03", text: "Match people with suitable opportunities, projects, and missions" },
                  { n: "04", text: "Empower communities through talent utilization and recognition" },
                  { n: "05", text: "Transform ideas into real-world execution through meaningful collaboration" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white/5 rounded-xl p-5 border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg shrink-0" style={{ background: "#F58220", color: "white" }}>{item.n}</span>
                    <p className="text-blue-100 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>User-Friendly Portal</p>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">Platform Features</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our intuitive portal helps you navigate opportunities through smart categorization and personalized selection — so you always find exactly where you belong.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {[
                  { icon: "🎯", title: "Choose Your Interests", desc: "Personalize your entire experience by telling us what matters most to you." },
                  { icon: "🔀", title: "Select Your User Stream", desc: "Whether you are Talent, Client, or Explorer — your path is clearly defined." },
                  { icon: "📂", title: "Explore Relevant Categories", desc: "Browse curated categories that perfectly match your skills and objectives." },
                  { icon: "⚙️", title: "Set Default Preferences", desc: "Configure your settings once and let the platform work for you automatically." },
                  { icon: "🌐", title: "Connect with Community", desc: "Build real connections with like-minded people, collaborators, and supporters." },
                  { icon: "💼", title: "Discover Opportunities", desc: "Find the right work, projects, and missions that are meant specifically for you." },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-5 p-5 rounded-2xl hover:bg-slate-50 transition-colors group">
                    <div className="text-3xl w-12 shrink-0 text-center">{f.icon}</div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{f.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hidden md:block">
                <NetworkIllustration />
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: "For Talent", sub: "Artists, Experts and More", color: "#1A428A" },
                    { label: "For Clients", sub: "Brands and Businesses", color: "#F58220" },
                    { label: "Grow and Earn", sub: "Collabs and Gigs", color: "#1A428A" },
                    { label: "Smart Matching", sub: "Right People, Right Jobs", color: "#F58220" },
                  ].map((c, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center hover:shadow-md transition-shadow">
                      <div className="h-8 w-8 rounded-lg mx-auto mb-2" style={{ background: c.color + "20" }}>
                        <div className="h-full w-full rounded-lg flex items-center justify-center" style={{ color: c.color, fontSize: 16, fontWeight: 900 }}>⚡</div>
                      </div>
                      <p className="font-bold text-slate-900 text-xs">{c.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{c.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-5">How YouTillEyes Works</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">A structured platform built around three clear roles — ensuring accountability, transparency, and high-quality outcomes for everyone involved.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🏢", title: "For Clients", color: "#1A428A", bg: "bg-blue-50",
                  desc: "Post your projects with full details, review proposals from skilled and dedicated talent, and track the progress of your work through a clean and intuitive dashboard.",
                  points: ["Post structured project briefs", "Review and select the best talent", "Receive high-quality deliverables"],
                },
                {
                  icon: "👤", title: "For Talent", color: "#F58220", bg: "bg-orange-50",
                  desc: "Identify your skills, browse premium opportunities posted by real businesses, submit your best proposal, and get paid for the expertise and effort you bring to the table.",
                  points: ["Browse open projects freely", "Submit professional bids", "Earn and build your reputation"],
                },
                {
                  icon: "🛡️", title: "Admin Oversight", color: "#1A428A", bg: "bg-slate-100",
                  desc: "Our dedicated admin team monitors all platform activity, reviews submitted work, ensures quality standards are upheld, and guarantees fair outcomes for every party.",
                  points: ["Quality assurance on all work", "Submission review and approval", "Fair and transparent resolution"],
                },
              ].map((role, i) => (
                <div key={i} className={`${role.bg} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                  <div className="text-5xl mb-5">{role.icon}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{role.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{role.desc}</p>
                  <div className="space-y-2">
                    {role.points.map((p, j) => (
                      <div key={j} className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="h-5 w-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: role.color }}>{j + 1}</span>
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-slate-500 text-lg">Everything you need to know before you begin your journey on YouTillEyes.</p>
            </div>
            <div className="space-y-4">
              {[
                { q: "What is YouTillEyes?", a: "YouTillEyes is a people-powered Folks-Force Platform designed to help individuals identify their true abilities, connect with the right opportunities, and grow through meaningful work and collaboration. We believe every person has unique value waiting to be utilized." },
                { q: "Who can join the platform?", a: "Everyone is welcome here. Students, artists, professionals, property owners, businesses, and anyone with skills, time, or resources to offer. If you have something valuable to contribute to the world, YouTillEyes is your platform." },
                { q: "How does the bidding process work?", a: "Talent browse open projects and submit proposals with a timeline and budget. Clients then review all bids and select the best fit for their needs. Our Admin team formalizes the assignment and provides oversight throughout the project." },
                { q: "How do I get paid for my work?", a: "Once your submission is reviewed and approved by the admin team and forwarded to the client, your earnings are credited to your YouTillEyes wallet. You can request a withdrawal to your bank account or UPI at any time." },
                { q: "What is the Folks-Force Platform?", a: "The Folks-Force Platform is our core network engine — designed to identify capable individuals, build collaborative networks between people and organizations, and match everyone with the right missions and opportunities based on their profile and skills." },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:border-primary/20 hover:shadow-md transition-all">
                  <h4 className="font-bold text-lg text-slate-900 mb-3">{faq.q}</h4>
                  <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F58220 0%, #e06b0a 100%)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              <circle cx="100" cy="200" r="150" fill="white" />
              <circle cx="700" cy="100" r="100" fill="white" />
              <circle cx="600" cy="350" r="80" fill="white" />
            </svg>
          </div>
          <div className="container mx-auto max-w-3xl text-center text-white relative z-10">
            <p className="text-white/80 text-sm font-bold uppercase tracking-[0.2em] mb-4">Be Seen · Get Hired · Grow Your Career</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Utilize Yourself?</h2>
            <p className="text-white/85 text-xl leading-relaxed mb-10">Join the Folks-Force Platform. Identify your potential. Connect with the right people. Build something amazing together.</p>
            <Link href="/register">
              <Button size="lg" className="h-14 px-10 text-lg font-black bg-white hover:bg-slate-100 text-slate-900 shadow-2xl">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <img src={footerLogoImg} alt="YouTillEyes" className="h-12 w-auto mb-5" />
                <p className="text-sm leading-relaxed text-slate-400 mb-6">Aap Nazro Tak — Utilize Yourself. A people-powered ecosystem helping individuals identify their true abilities and connect with the right opportunities.</p>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><MapPin className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />Uttar Pradesh, India</div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><Phone className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />+91 7084424242</div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><Mail className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />info@youtilleyes.com</div>
                </div>
                <div className="flex gap-2.5">
                  {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-orange-500 flex items-center justify-center transition-colors">
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-3 text-sm">
                  {navLinks.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  {footerQuickLinks.map(link => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-3 text-sm">
                  {["Terms and Conditions", "Privacy Policy", "Cookie Policy", "Refund Policy", "Disclaimer"].map(label => (
                    <li key={label}><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <p>&copy; {new Date().getFullYear()} YouTillEyes. All rights reserved.</p>
              <p>Made with love by Niskutech &nbsp;|&nbsp; Currency: ₹ INR</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
