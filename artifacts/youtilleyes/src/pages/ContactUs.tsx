import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoImg from "@assets/24754a480f78dd7bd6173cfa1eb74401-Photoroom_1774903197281.png";
import footerLogoImg from "@assets/20260331_030902_1774906812939.png";
import {
  ArrowRight, Linkedin, Twitter, Facebook, Instagram, Youtube,
  Phone, Mail, MapPin, Clock, MessageSquare, Send
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactUs() {
  const { user } = useAuth();
  const { toast } = useToast();
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
            <Link href="/vision" className="text-muted-foreground hover:text-primary transition-colors">Vision</Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-semibold">Contact Us</Link>
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
        <section className="py-20 md:py-24 px-4 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 font-medium">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              We're Here to Help You<br />
              <span className="text-primary">Get in Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have a question, idea, or want to collaborate? Reach out to the YouTillEyes team — we'd love to hear from you.
            </p>
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-foreground">Get in Touch</h2>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                  Whether you're a talent looking to showcase your skills, a client with a project, or simply curious about the Folks-Force Platform — we are just a message away.
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Phone / WhatsApp</h4>
                      <a href="tel:+917084424242" className="text-slate-600 hover:text-primary transition-colors text-lg">+91 7084424242</a>
                      <p className="text-sm text-slate-400 mt-1">Available for calls and WhatsApp</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                      <a href="mailto:info@youtilleyes.com" className="text-slate-600 hover:text-primary transition-colors text-lg">info@youtilleyes.com</a>
                      <p className="text-sm text-slate-400 mt-1">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Location</h4>
                      <p className="text-slate-600 text-lg">Uttar Pradesh, India</p>
                      <p className="text-sm text-slate-400 mt-1">Serving talent and clients across India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Support Hours</h4>
                      <p className="text-slate-600 text-lg">Mon – Sat: 9:00 AM – 7:00 PM</p>
                      <p className="text-sm text-slate-400 mt-1">IST (Indian Standard Time)</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, label: "@YouTillEyes", href: "#" },
                      { icon: Linkedin, label: "LinkedIn", href: "#" },
                      { icon: Twitter, label: "Twitter", href: "#" },
                      { icon: Facebook, label: "Facebook", href: "#" },
                      { icon: Youtube, label: "YouTube", href: "#" },
                    ].map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="h-10 w-10 rounded-full bg-slate-100 hover:bg-secondary hover:text-white text-slate-600 flex items-center justify-center transition-all"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                  <p className="text-sm text-slate-400 mt-3">@YouTillEyes on Instagram</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h3>
                <p className="text-slate-500 mb-8">Fill in the form below and we'll get back to you soon.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                      <Input
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                      <Input
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject *</label>
                    <Input
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                    <Textarea
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-white resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Connect Banner */}
        <section className="py-16 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Call or WhatsApp us directly — our team is ready to assist you in identifying the right path on the Folks-Force Platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+917084424242">
                <Button size="lg" className="h-14 px-8 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                  <Phone className="h-5 w-5" /> Call: +91 7084424242
                </Button>
              </a>
              <a href="mailto:info@youtilleyes.com">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white text-white hover:bg-white/10 gap-2">
                  <Mail className="h-5 w-5" /> Email Us
                </Button>
              </a>
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
