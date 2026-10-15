import { Link } from "react-router-dom";
import { CalendarDays, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  {
    id: "9rab9P1HiGU",
    label: "Employer portal",
    title: "HIREXAI Employer Portal Demo | AI-Powered Recruitment Platform",
  },
  {
    id: "9BC9TkCyOuQ",
    label: "Campus recruitment",
    title: "HIREXAI Campus Agent Demo | AI-Powered Campus Recruitment",
  },
  {
    id: "eBzyl98Pupw",
    label: "Product demonstration",
    title: "HIREXAI Product Demo | AI-Powered Hiring Platform for Investors",
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
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">HIREXAI | Product Experience</p>
        <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl">See HIREXAI in <span className="grad-text-cyan">Action</span></h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Explore our product demonstrations to understand how HIREXAI approaches AI-powered recruitment workflows.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20 text-center">
        <h2 className="text-3xl md:text-4xl">Want to See More?</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">Book a live demonstration to explore HIREXAI and discuss your recruitment requirements.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full font-semibold"><Link to="/demo">Book a Demo</Link></Button>
        </div>
      </section>
    </main>
  );
};

export default VideosPage;