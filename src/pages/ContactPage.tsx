import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", type: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        type: formData.type || null,
        message: formData.message,
      });
      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          type: formData.type,
          message: formData.message,
        },
      });

      toast.success("Message sent! We'll get back to you within one business day.");
      setFormData({ name: "", email: "", company: "", type: "", message: "" });
    } catch {
      toast.error("Could not send message. Please email us at customersupport@gethirex.space");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-[140px] pb-[60px] bg-hirex-bg2">
        <div className="container text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-primary/10 border border-primary/25 text-primary-light mb-6">
            We respond within 1 business day
          </div>
          <h1 className="font-display text-[clamp(44px,6vw,80px)] font-extrabold mb-4">
            Get in <span className="grad-text">Touch.</span>
          </h1>
          <p className="text-hirex-text2 max-w-[440px] mx-auto text-[17px] leading-relaxed">
            For demo or trial requests, reach out directly or use the form below.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-[100px] max-md:py-[72px]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] max-w-[1000px] mx-auto items-start">
            {/* Left */}
            <div>
              <h2 className="text-[28px] font-bold mb-6">Let's talk HR automation.</h2>
              <p className="text-hirex-text2 mb-8 text-[15px] leading-relaxed">
                Whether you're a startup ready to deploy your first agents or an enterprise looking for global-scale HR automation, we're here to help.
              </p>
              <div className="flex flex-col gap-5 mb-9">
                {[
                  { icon: "✉", title: "Email Us", desc: <a href="mailto:customersupport@gethirex.space" className="text-primary-light text-sm no-underline">customersupport@gethirex.space</a> },
                  { icon: "🚀", title: "Start a Free Trial", desc: <span className="text-hirex-text2 text-sm">14 days, no credit card required</span> },
                  { icon: "🏢", title: "Enterprise & MNC Demo", desc: <span className="text-hirex-text2 text-sm">Dedicated 45-min walkthrough with our team</span> },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-[10px] bg-primary/[0.12] flex items-center justify-center text-lg shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-sm mb-1">{item.title}</div>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-hirex-surface border border-border rounded-md p-6">
                <div className="text-xs font-bold uppercase tracking-[0.1em] text-hirex-text3 mb-3">Response Time</div>
                <div className="font-display text-[22px] font-extrabold text-primary-light">&lt; 1 Business Day</div>
                <div className="text-[13px] text-hirex-text3 mt-1">For enterprise inquiries, usually within 2 hours.</div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="bg-hirex-surface border border-border rounded-lg p-10">
              <h3 className="font-display text-xl font-bold mb-7">Send us a message</h3>
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-hirex-text2">Your Name *</label>
                  <input
                    type="text"
                    className="px-4 py-3.5 rounded-md bg-hirex-surface border-[1.5px] border-border text-foreground text-[15px] outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,110,245,0.15)] placeholder:text-hirex-text3"
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-hirex-text2">Work Email *</label>
                  <input
                    type="email"
                    className="px-4 py-3.5 rounded-md bg-hirex-surface border-[1.5px] border-border text-foreground text-[15px] outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,110,245,0.15)] placeholder:text-hirex-text3"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-hirex-text2">Company</label>
                  <input
                    type="text"
                    className="px-4 py-3.5 rounded-md bg-hirex-surface border-[1.5px] border-border text-foreground text-[15px] outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,110,245,0.15)] placeholder:text-hirex-text3"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-hirex-text2">What can we help with?</label>
                  <select
                    className="px-4 py-3.5 rounded-md bg-hirex-surface border-[1.5px] border-border text-foreground text-[15px] outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,110,245,0.15)]"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">Select a topic...</option>
                    <option value="demo">Book a Demo</option>
                    <option value="trial">Start Free Trial</option>
                    <option value="enterprise">Enterprise / MNC Inquiry</option>
                    <option value="investor">Investor Briefing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-hirex-text2">Message *</label>
                  <textarea
                    className="px-4 py-3.5 rounded-md bg-hirex-surface border-[1.5px] border-border text-foreground text-[15px] outline-none transition-all focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,110,245,0.15)] placeholder:text-hirex-text3 resize-y min-h-[140px]"
                    placeholder="Tell us about your hiring challenges or what you'd like to see in a demo..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-4 rounded-md font-semibold text-[15px] bg-primary text-primary-foreground hover:bg-primary-light transition-all hover:shadow-[0_12px_32px_rgba(91,110,245,0.4)] disabled:opacity-50"
                >
                  {loading ? "Sending…" : "Send Message →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
