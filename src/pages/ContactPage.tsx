import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', company: '', type: 'general', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('contact_submissions').insert([form]);
    setLoading(false);
    if (error) {
      toast.error('Failed to send. Please try again.');
    } else {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', company: '', type: 'general', message: '' });
    }
  };

  return (
    <main className="pt-16">
      <section className="bg-hero-gradient section-padding">
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
              Contact <span className="text-cyan-cta">Us</span>
            </h1>
            <p className="text-white/70 font-inter text-lg">
              Questions? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-navy-dark">
        <div className="container-main max-w-2xl">
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-white/70 text-sm font-inter block mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-navy-light/30 border border-navy-light/50 rounded-lg px-4 py-3 text-white font-inter focus:border-cyan-cta/50 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm font-inter block mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-navy-light/30 border border-navy-light/50 rounded-lg px-4 py-3 text-white font-inter focus:border-cyan-cta/50 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="text-white/70 text-sm font-inter block mb-2">Company (optional)</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-navy-light/30 border border-navy-light/50 rounded-lg px-4 py-3 text-white font-inter focus:border-cyan-cta/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm font-inter block mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-navy-light/30 border border-navy-light/50 rounded-lg px-4 py-3 text-white font-inter focus:border-cyan-cta/50 focus:outline-none transition-colors resize-none"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-cta w-full disabled:opacity-50">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="mt-12 text-center text-white/50 font-inter text-sm">
            <p>✉️ support@gethirex.space</p>
            <p className="mt-1">📞 +91 8827647684</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
