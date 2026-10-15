import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: "9rab9P1HiGU",
    label: "Employer portal",
    title: "HIREXAI Employer Portal Demo",
    description: "A guided look at the employer portal for AI-powered recruitment.",
  },
  {
    id: "ubFnv2H2LVE",
    label: "For employers",
    title: "HireX for Employers",
    description: "See the AI recruiting experience built for hiring teams.",
  },
  {
    id: "dKeWLSqNOtQ",
    label: "For candidates",
    title: "HireX for Candidates",
    description: "Explore the AI-assisted job search experience for candidates.",
  },
];

const VideoFrame = ({ id, title }: { id: string; title: string }) => (
  <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-card">
    <iframe
      className="absolute inset-0 h-full w-full"
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  </div>
);

const VideosPage = () => {
  const [featured, ...more] = videos;
  return (
    <main className="min-h-screen bg-background pt-28">
      <section className="container pb-12 pt-8 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">HIREX AI | Product Experience</p>
        <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl">See HireX in <span className="grad-text-cyan">Action</span></h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Discover how AI is transforming the way companies find, assess, and hire talent. Explore the HireX experience through our product demonstrations.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full font-semibold">
            <Link to="/how-it-works">Explore HireX <ArrowRight /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full font-semibold">
            <Link to="/demo"><CalendarDays /> Book a Demo</Link>
          </Button>
        </div>
      </section>

      <section className="container pb-20" aria-labelledby="featured-demo">
        <div className="space-y-6">
          <VideoFrame id={featured.id} title={featured.title} />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"><PlayCircle className="h-4 w-4" /> Featured demonstration</span>
            <h2 id="featured-demo" className="mt-4 text-3xl">{featured.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{featured.description}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/40 py-20">
        <div className="container">
          <h2 className="mb-10 text-center text-3xl">More Product Demonstrations</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {more.map((v) => (
              <article key={v.id}>
                <VideoFrame id={v.id} title={v.title} />
                <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">{v.label}</p>
                <h3 className="mt-2 text-xl">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 text-center">
        <h2 className="text-3xl md:text-4xl">Ready to see HireX for your team?</h2>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full font-semibold"><Link to="/demo">Book a Demo</Link></Button>
          <Button asChild size="lg" variant="outline" className="rounded-full font-semibold"><Link to="/contact">Start Free Trial</Link></Button>
        </div>
      </section>
    </main>
  );
};

export default VideosPage;