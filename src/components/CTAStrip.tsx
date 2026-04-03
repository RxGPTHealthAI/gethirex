import { Link } from "react-router-dom";

const CTAStrip = ({ title = "Ready to Transform Your HR?", subtitle = "Start your 14-day free trial today. No credit card required." }: { title?: string; subtitle?: string }) => (
  <section className="py-[60px]">
    <div className="container">
      <div className="bg-gradient-to-br from-primary-dark to-primary rounded-lg p-16 max-md:p-10 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22%20fill=%22rgba(255,255,255,0.06)%22/%3E%3C/svg%3E')]" />
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold mb-4 relative">{title}</h2>
        <p className="text-[17px] opacity-85 mb-9 relative">{subtitle}</p>
        <div className="flex gap-3 justify-center flex-wrap relative">
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] no-underline bg-foreground text-primary-dark hover:bg-accent hover:-translate-y-0.5 transition-all">
            Start Free Trial →
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-[15px] no-underline border-[1.5px] border-foreground/40 text-foreground hover:bg-foreground/10 hover:border-foreground hover:-translate-y-0.5 transition-all">
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTAStrip;
