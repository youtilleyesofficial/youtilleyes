import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import { Linkedin, Twitter, Facebook, Instagram, Youtube, Phone, Mail, MapPin, Send, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Vision", href: "/vision" },
  { label: "Contact Us", href: "/contact" },
];

function ContactSVG() {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-xs mx-auto md:max-w-full">
      <rect width="400" height="320" rx="24" fill="#1A428A" fillOpacity="0.04" />
      {/* Phone card */}
      <rect x="30" y="30" width="160" height="100" rx="16" fill="white" stroke="#1A428A" strokeWidth="1.2" strokeOpacity="0.12" />
      <circle cx="65" cy="60" r="14" fill="#F58220" fillOpacity="0.85" />
      <circle cx="65" cy="60" r="7" fill="#F58220" />
      <rect x="90" y="52" width="80" height="7" rx="3.5" fill="#1A428A" fillOpacity="0.18" />
      <rect x="90" y="66" width="55" height="5" rx="2.5" fill="#1A428A" fillOpacity="0.09" />
      <rect x="40" y="90" width="130" height="5" rx="2.5" fill="#1A428A" fillOpacity="0.08" />
      <rect x="40" y="108" width="100" height="5" rx="2.5" fill="#1A428A" fillOpacity="0.06" />
      {/* Mail card */}
      <rect x="210" y="30" width="160" height="100" rx="16" fill="white" stroke="#F58220" strokeWidth="1.2" strokeOpacity="0.18" />
      <circle cx="245" cy="60" r="14" fill="#1A428A" fillOpacity="0.8" />
      <circle cx="245" cy="60" r="7" fill="#1A428A" />
      <rect x="270" y="52" width="80" height="7" rx="3.5" fill="#F58220" fillOpacity="0.18" />
      <rect x="270" y="66" width="55" height="5" rx="2.5" fill="#F58220" fillOpacity="0.09" />
      <rect x="220" y="90" width="130" height="5" rx="2.5" fill="#1A428A" fillOpacity="0.08" />
      <rect x="220" y="108" width="100" height="5" rx="2.5" fill="#1A428A" fillOpacity="0.06" />
      {/* Form card */}
      <rect x="60" y="155" width="280" height="140" rx="16" fill="white" stroke="#1A428A" strokeWidth="1.2" strokeOpacity="0.1" />
      <rect x="60" y="155" width="280" height="36" rx="12" fill="#1A428A" fillOpacity="0.06" />
      <circle cx="85" cy="173" r="7" fill="#F58220" fillOpacity="0.75" />
      <circle cx="103" cy="173" r="7" fill="#1A428A" fillOpacity="0.3" />
      <circle cx="121" cy="173" r="7" fill="#1A428A" fillOpacity="0.15" />
      <rect x="80" y="205" width="100" height="7" rx="3.5" fill="#1A428A" fillOpacity="0.11" />
      <rect x="200" y="205" width="120" height="7" rx="3.5" fill="#1A428A" fillOpacity="0.11" />
      <rect x="80" y="224" width="240" height="6" rx="3" fill="#1A428A" fillOpacity="0.07" />
      <rect x="80" y="240" width="240" height="6" rx="3" fill="#1A428A" fillOpacity="0.07" />
      <rect x="120" y="260" width="160" height="22" rx="8" fill="#F58220" fillOpacity="0.85" />
      <text x="165" y="275" fontSize="10" fill="white" fontWeight="900">Send Message</text>
    </svg>
  );
}

export default function ContactUs() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const dashboardHref =
    user?.role === "ADMIN" ? "/admin/dashboard" :
    user?.role === "CLIENT" ? "/client/dashboard" : "/user/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message Sent!", description: "Thank you for reaching out. We will get back to you within 24 hours." });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link href="/"><img src={logoImg} alt="YouTillEyes" className="h-9 md:h-10 w-auto cursor-pointer" /></Link>
          <nav className="hidden md:flex gap-7 text-sm font-medium">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className={`transition-colors ${l.href === "/contact" ? "text-primary font-bold" : "text-slate-500 hover:text-primary"}`}>{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <Link href={dashboardHref}><Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold text-xs md:text-sm">Dashboard</Button></Link>
            ) : (
              <>
                <Link href="/login"><Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600">Log in</Button></Link>
                <Link href="/register"><Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white font-semibold text-xs md:text-sm">Get Started</Button></Link>
              </>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
              {mobileOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/98">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(l => (
                <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${l.href === "/contact" ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50"}`}>
                  {l.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-3 pt-3 border-t border-slate-100">
                <Link href="/login" className="flex-1"><Button variant="outline" className="w-full">Log in</Button></Link>
                <Link href="/register" className="flex-1"><Button className="w-full bg-secondary text-white">Get Started</Button></Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-14 md:py-28 px-4 md:px-6" style={{ background: "linear-gradient(145deg, #eef2ff 0%, #fafbff 50%, #fff8f0 100%)" }}>
          <div className="absolute top-8 right-6 w-3 h-3 rounded-full bg-orange-400 animate-pulse opacity-50" />
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs md:text-sm font-bold mb-6" style={{ background: "rgba(26,66,138,0.08)", borderColor: "rgba(26,66,138,0.2)", color: "#1A428A" }}>
                  💬 Contact Us
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3 leading-[1.1]">
                  We're Here to Help You
                </h1>
                <h2 className="text-2xl md:text-3xl font-extrabold mb-5" style={{ color: "#F58220" }}>Get in Touch</h2>
                <p className="text-sm md:text-lg text-slate-600 leading-relaxed mb-8">
                  Have a question, an idea, or want to collaborate? The YouTillEyes team is always ready to listen, guide, and help you find your place on the Folks-Force Platform.
                </p>
                {/* Quick contact chips on mobile */}
                <div className="flex flex-wrap gap-3 md:hidden mb-6">
                  <a href="tel:+917084424242" className="flex items-center gap-2 rounded-full px-4 py-2.5 font-bold text-xs text-white" style={{ background: "#1A428A", boxShadow: "0 4px 16px rgba(26,66,138,0.25)" }}>
                    <Phone className="h-3.5 w-3.5" /> Call Now
                  </a>
                  <a href="mailto:info@youtilleyes.com" className="flex items-center gap-2 rounded-full px-4 py-2.5 font-bold text-xs text-white" style={{ background: "#F58220", boxShadow: "0 4px 16px rgba(245,130,32,0.25)" }}>
                    <Mail className="h-3.5 w-3.5" /> Email Us
                  </a>
                  <a href="https://wa.me/917084424242" className="flex items-center gap-2 rounded-full px-4 py-2.5 font-bold text-xs border-2 border-green-500 text-green-600">
                    💬 WhatsApp
                  </a>
                </div>
              </div>
              {/* SVG visible on all screens */}
              <div className="flex items-center justify-center mt-4 md:mt-0">
                <ContactSVG />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-14 md:py-20 px-4 md:px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-5">Reach Out to Us</h2>
                <p className="text-slate-500 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed">
                  Whether you are a talent looking to showcase your skills, a client with a project to post, or simply curious about what YouTillEyes can do for you — we are just one message away.
                </p>
                <div className="space-y-4 md:space-y-6 mb-10 md:mb-12">
                  {[
                    { icon: "📞", title: "Phone and WhatsApp", value: "+91 7084424242", sub: "Available for calls and WhatsApp messages", href: "tel:+917084424242", color: "#1A428A" },
                    { icon: "✉️", title: "Email Address", value: "info@youtilleyes.com", sub: "We reply to every message within 24 hours", href: "mailto:info@youtilleyes.com", color: "#F58220" },
                    { icon: "📍", title: "Location", value: "Uttar Pradesh, India", sub: "Serving talent and clients across India", href: null, color: "#1A428A" },
                    { icon: "🕐", title: "Support Hours", value: "Monday to Saturday, 9 AM to 7 PM", sub: "Indian Standard Time (IST)", href: null, color: "#F58220" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 md:p-6 rounded-2xl border hover:shadow-md transition-all" style={{ background: "#FAFBFF", borderColor: item.color + "18" }}>
                      <div className="text-2xl md:text-3xl w-10 md:w-12 text-center shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1 text-sm md:text-base">{item.title}</p>
                        {item.href ? (
                          <a href={item.href} className="text-base md:text-lg font-semibold hover:opacity-80 transition-opacity" style={{ color: item.color }}>{item.value}</a>
                        ) : (
                          <p className="text-base md:text-lg font-semibold" style={{ color: item.color }}>{item.value}</p>
                        )}
                        <p className="text-xs md:text-sm text-slate-400 mt-1">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="font-bold text-slate-900 mb-3 md:mb-4 text-sm md:text-base">Follow Us on Social Media</p>
                  <div className="flex gap-2.5 mb-2 md:mb-3">
                    {[
                      { Icon: Instagram, label: "Instagram" },
                      { Icon: Linkedin, label: "LinkedIn" },
                      { Icon: Twitter, label: "Twitter" },
                      { Icon: Facebook, label: "Facebook" },
                      { Icon: Youtube, label: "YouTube" },
                    ].map(({ Icon, label }) => (
                      <a key={label} href="#" aria-label={label} className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-600 flex items-center justify-center transition-all duration-200">
                        <Icon className="h-4 w-4 md:h-5 md:w-5" />
                      </a>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-slate-400">Find us as @YouTillEyes on all major platforms</p>
                </div>
              </div>

              {/* Form */}
              <div className="rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm" style={{ background: "linear-gradient(135deg, #fafbff, #fff8f0)" }}>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">Send Us a Message</h3>
                <p className="text-slate-500 text-sm mb-6 md:mb-8">Fill in the form below and we will get back to you as soon as possible.</p>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <Input placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required className="bg-white h-11 md:h-12 rounded-xl border-slate-200 focus:border-primary text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                      <Input placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="bg-white h-11 md:h-12 rounded-xl border-slate-200 focus:border-primary text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <Input type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required className="bg-white h-11 md:h-12 rounded-xl border-slate-200 focus:border-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Subject</label>
                    <Input placeholder="What is this message about?" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} required className="bg-white h-11 md:h-12 rounded-xl border-slate-200 focus:border-primary text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-slate-700 mb-2">Your Message</label>
                    <Textarea placeholder="Tell us how we can help you..." rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required className="bg-white rounded-xl border-slate-200 focus:border-primary resize-none text-sm" />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full h-12 md:h-14 text-sm md:text-base font-black rounded-xl shadow-lg" style={{ background: "#1A428A", boxShadow: "0 8px 24px rgba(26,66,138,0.25)" }}>
                    {submitting ? (
                      <span className="flex items-center gap-3">
                        <span className="h-5 w-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending your message...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Send className="h-4 w-4 md:h-5 md:w-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Connect */}
        <section className="py-12 md:py-16 px-4 md:px-6" style={{ background: "linear-gradient(135deg, #1A428A 0%, #0d2a5e 100%)" }}>
          <div className="container mx-auto max-w-4xl text-center text-white">
            <h2 className="text-xl md:text-3xl font-black mb-3 md:mb-4">Need Immediate Assistance?</h2>
            <p className="text-blue-100 text-sm md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
              Call or WhatsApp us directly. Our team is ready to assist you in identifying the right path and helping you get started on the Folks-Force Platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a href="tel:+917084424242" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-black gap-3 text-white" style={{ background: "#F58220" }}>
                  <Phone className="h-4 w-4 md:h-5 md:w-5" /> Call: +91 7084424242
                </Button>
              </a>
              <a href="mailto:info@youtilleyes.com" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-12 md:h-14 px-6 md:px-8 text-sm md:text-base font-semibold border-white text-white hover:bg-white/10 gap-3">
                  <Mail className="h-4 w-4 md:h-5 md:w-5" /> Email Us
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-14 md:py-20 px-4 md:px-6 bg-slate-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 mb-3 md:mb-4">Still Have Questions?</h2>
            <p className="text-slate-500 text-sm md:text-lg mb-8 md:mb-10">Check out our frequently asked questions or write to us directly — we are always happy to help.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
              {[
                { emoji: "🎯", title: "For Talent", desc: "Questions about joining, bidding, or getting paid? We have all the answers." },
                { emoji: "🏢", title: "For Clients", desc: "Want to post a project or understand how the platform works? Just ask." },
                { emoji: "🤝", title: "For Partnerships", desc: "Interested in partnering with YouTillEyes or the Folks-Force Platform? Reach out." },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 md:p-7 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl md:text-4xl mb-3 md:mb-4">{item.emoji}</div>
                  <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-base">{item.title}</h4>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-16 pb-8 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
              <div className="col-span-2 lg:col-span-1">
                <img src={footerLogoImg} alt="YouTillEyes" className="h-10 md:h-12 w-auto mb-4" />
                <p className="text-xs text-slate-400 mb-4 leading-relaxed">Aap Nazro Tak — Utilize Yourself.</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400"><MapPin className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />Uttar Pradesh, India</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400"><Phone className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />+91 7084424242</div>
                  <div className="flex items-center gap-2 text-xs text-slate-400"><Mail className="h-3 w-3 shrink-0" style={{ color: "#F58220" }} />info@youtilleyes.com</div>
                </div>
                <div className="flex gap-2">
                  {[Linkedin, Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="h-8 w-8 rounded-full bg-slate-700 hover:bg-orange-500 flex items-center justify-center transition-colors"><Icon className="h-3.5 w-3.5" /></a>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Our Pages</h4>
                <ul className="space-y-2.5 text-xs">
                  {navLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2.5 text-xs">
                  {[{ label: "Browse Projects", href: "/user/projects" }, { label: "Post a Project", href: "/client/projects/new" }, { label: "My Bids", href: "/user/bids" }, { label: "My Wallet", href: "/user/wallet" }].map(link => (
                    <li key={link.label}><Link href={link.href} className="text-slate-400 hover:text-orange-400 transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold text-xs mb-4 uppercase tracking-wider">Legal</h4>
                <ul className="space-y-2.5 text-xs">
                  {["Terms and Conditions", "Privacy Policy", "Cookie Policy", "Refund Policy", "Disclaimer"].map(label => (
                    <li key={label}><a href="#" className="text-slate-400 hover:text-orange-400 transition-colors">{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <p>&copy; {new Date().getFullYear()} YouTillEyes. All rights reserved.</p>
              <p>Made with love by Niskutech &nbsp;|&nbsp; ₹ INR</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
