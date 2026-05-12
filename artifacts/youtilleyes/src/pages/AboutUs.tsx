import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function AboutIllustration() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="400" height="300" rx="20" fill="#1A428A" fillOpacity="0.04" />
      <circle cx="200" cy="130" r="70" fill="#1A428A" fillOpacity="0.07" />
      <circle cx="200" cy="130" r="45" fill="#1A428A" fillOpacity="0.1" />
      <circle cx="200" cy="130" r="25" fill="#F58220" fillOpacity="0.2" />
      <circle cx="200" cy="130" r="12" fill="#F58220" fillOpacity="0.9" />
      {[
        { cx: 80, cy: 70 }, { cx: 320, cy: 70 }, { cx: 320, cy: 200 },
        { cx: 80, cy: 200 }, { cx: 200, cy: 30 }, { cx: 200, cy: 240 },
      ].map((p, i) => (
        <g key={i}>
          <line x1={p.cx} y1={p.cy} x2="200" y2="130" stroke="#1A428A" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
          <circle cx={p.cx} cy={p.cy} r="16" fill="#1A428A" fillOpacity="0.1" />
          <circle cx={p.cx} cy={p.cy} r="9" fill={i % 2 === 0 ? "#1A428A" : "#F58220"} fillOpacity="0.7" />
        </g>
      ))}
      <rect x="40" y="265" width="320" height="24" rx="8" fill="#1A428A" fillOpacity="0.06" />
      <text x="130" y="281" fontSize="12" fill="#1A428A" fontWeight="700" opacity="0.5">Aap Nazro Tak — Utilize Yourself</text>
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Vision", href: "/vision" },
  { label: "Contact Us", href: "/contact" },
];

export default function AboutUs() {
  const { user } = useAuth();
  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-10 w-auto cursor-pointer" /></Link>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/about" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <Link href={dashboardHref}><Button className="bg-primary hover:bg-primary/90 text-white font-semibold">Go to Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" className="hidden sm:flex text-slate-600">Log in</Button></Link>
                <Link href="/register"><Button className="bg-secondary hover:bg-secondary/90 text-white font-semibold">Get Started</Button></Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 md:py-28 px-6" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #fff8f0 100%)" }}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-semibold mb-8">
                  About YouTillEyes
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                  Utilize Yourself.
                </h1>
                <h2 className="text-3xl font-extrabold mb-6" style={{ color: "#F58220" }}>Aap Nazro Tak.</h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  We are a people-powered ecosystem designed to help individuals identify their true abilities, purpose, and place in society — because every person carries unique value that deserves to be seen and utilized.
                </p>
              </div>
              <div className="hidden md:block"><AboutIllustration /></div>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#F58220" }}>What We Believe</p>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Everyone Carries Unique Value</h2>
                <p className="text-slate-600 leading-relaxed mb-5 text-lg">
                  YouTillEyes was born from a simple but powerful belief — every person carries unique value, skills, and potential that can contribute meaningfully to the world.
                </p>
                <p className="text-slate-600 leading-relaxed mb-5">
                  We believe that everyone has skills in their life that need to be utilized in the right directions to reach the right places and connections. It is people's right to make the world convenient — for themselves and for each other.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Our platform creates a structured journey of self-identification, growth, collaboration, and opportunity, enabling people to connect through shared objectives, talents, and tasks.
                </p>
              </div>
              <div className="space-y-5">
                {[
                  { n: "5000+", label: "Talented Individuals", sub: "waiting to be identified" },
                  { n: "100+", label: "Active Projects", sub: "posted by real clients" },
                  { n: "6", label: "Identify Steps", sub: "in your growth journey" },
                  { n: "1", label: "Mission", sub: "to utilize you, fully" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-5 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                    <div className="text-3xl font-black shrink-0 w-20 text-center" style={{ color: i % 2 === 0 ? "#1A428A" : "#F58220" }}>{s.n}</div>
                    <div>
                      <p className="font-bold text-slate-900">{s.label}</p>
                      <p className="text-sm text-slate-400">{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <p className="text-sm font-bold uppercase tracking-[0.2em] mb-6" style={{ color: "#F58220" }}>Our Philosophy</p>
            <blockquote className="text-2xl md:text-4xl font-black italic leading-relaxed mb-8">
              "The strength of society begins with the identification of individual potential."
            </blockquote>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
              YouTillEyes represents a modern framework of origin, existence, and human utilization — where individuals are recognized not only for who they are, but for what they can create, contribute, and achieve together.
            </p>
          </div>
        </section>

        {/* Mission Cards */}
        <section className="py-24 px-6 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>The Folks-Force Mission</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">What We Do Every Day</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Through the Folks-Force Platform, we build a powerful network that helps identify the right individuals for the right opportunities.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { emoji: "🎯", title: "Identify Capable Individuals", desc: "We help people discover who they truly are — their strengths, skills, and purpose in society. No talent goes unnoticed on our platform.", bg: "bg-blue-50", border: "border-blue-100" },
                { emoji: "🤝", title: "Build Collaborative Networks", desc: "Connecting like-minded people, professionals, and businesses so they can achieve shared goals together and create something extraordinary.", bg: "bg-orange-50", border: "border-orange-100" },
                { emoji: "⚡", title: "Match People with Opportunities", desc: "Every person finds the right platform, project, or mission that fits their unique profile — no more mismatches, only perfect connections.", bg: "bg-blue-50", border: "border-blue-100" },
                { emoji: "💪", title: "Empower Communities", desc: "Strengthening communities by putting individual talents to work for collective progress — because society grows when every member contributes.", bg: "bg-orange-50", border: "border-orange-100" },
                { emoji: "🚀", title: "Real-World Execution", desc: "Transforming ideas, ambitions, and skills into real outcomes through structured collaboration. We do not just talk — we deliver.", bg: "bg-blue-50", border: "border-blue-100" },
                { emoji: "✨", title: "A Force of Creation", desc: "When the right people connect, everything becomes possible. We make those connections happen every single day, for every single person.", bg: "bg-orange-50", border: "border-orange-100" },
              ].map((item, i) => (
                <div key={i} className={`${item.bg} border ${item.border} rounded-2xl p-7 hover:shadow-lg transition-all hover:-translate-y-1 duration-300`}>
                  <div className="text-5xl mb-5">{item.emoji}</div>
                  <h4 className="font-bold text-slate-900 text-lg mb-3">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24 px-6 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#F58220" }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5">From Uttar Pradesh to the World</h2>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-10 md:p-14 border border-slate-100 shadow-sm">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                YouTillEyes was founded in Uttar Pradesh, India, with the vision of creating a platform where every individual — regardless of background, qualification, or location — can be seen, valued, and utilized for their unique capabilities.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We saw a gap: countless talented people with extraordinary skills going unnoticed, while businesses and clients struggled to find the right people for their projects. We built YouTillEyes to bridge that gap — not just as a marketplace, but as a full ecosystem of identification, connection, and growth.
              </p>
              <p className="text-xl text-slate-800 leading-relaxed font-semibold italic" style={{ borderLeft: "4px solid #F58220", paddingLeft: "1.25rem" }}>
                This is more than a platform — it is a Force of Capability, Collaboration, and Creation. And we are just getting started.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-3xl text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-6">Be Part of the Movement</h2>
            <p className="text-blue-100 text-xl mb-10 leading-relaxed">Join the Folks-Force Platform and help us build a world where every individual's potential is identified, valued, and utilized.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="h-14 px-8 text-base font-bold text-slate-900 hover:opacity-90" style={{ background: "#F58220", color: "white" }}>Join YouTillEyes</Button></Link>
              <Link href="/vision"><Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold border-white text-white hover:bg-white/10">Read Our Vision</Button></Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
              <div>
                <img src={footerLogoImg} alt="YouTillEyes" className="h-12 w-auto mb-5" />
                <p className="text-sm leading-relaxed text-slate-400 mb-6">Aap Nazro Tak — Utilize Yourself. A people-powered ecosystem connecting talent with opportunity.</p>
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><MapPin className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />Uttar Pradesh, India</div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><Phone className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />+91 7084424242</div>
                  <div className="flex items-center gap-2.5 text-sm text-slate-400"><Mail className="h-4 w-4 shrink-0" style={{ color: "#F58220" }} />info@youtilleyes.com</div>
                </div>
                <div className="flex gap-2.5">
                  {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="h-9 w-9 rounded-full bg-slate-700 hover:bg-orange-500 flex items-center justify-center transition-colors"><Icon className="h-4 w-4" /></a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-3 text-sm">
                  {navLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  {[{ label: "Browse Projects", href: "/user/projects" }, { label: "Post a Project", href: "/client/projects/new" }, { label: "My Bids", href: "/user/bids" }, { label: "My Wallet", href: "/user/wallet" }].map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
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
