const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <main className="pt-16">
    <section className="bg-hero-gradient py-20">
      <div className="container-main text-center">
        <h1 className="font-syne text-4xl font-bold text-white">{title}</h1>
      </div>
    </section>
    <section className="section-padding bg-navy-dark">
      <div className="container-main max-w-3xl prose prose-invert font-inter text-white/70 [&_h2]:font-syne [&_h2]:text-white [&_h2]:text-2xl [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:font-syne [&_h3]:text-white [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2">
        {children}
      </div>
    </section>
  </main>
);

export default LegalPage;
