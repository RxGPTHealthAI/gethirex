import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, FileSearch, ListChecks, CalendarDays, Workflow, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  { name: "Candidate Sourcing", icon: Search, purpose: "Identify potential candidates against a role brief and search criteria.", input: "Role requirements, target skills and sourcing preferences.", output: "Potential profiles for recruiter review.", capability: "TalentScout — described on the Employers page.", review: "Recruiters approve search criteria and review potential candidates." },
  { name: "Resume Screening", icon: FileSearch, purpose: "Compare resume information with the requirements of the role.", input: "Candidate resumes and agreed role requirements.", output: "A structured comparison highlighting relevant experience and gaps.", capability: "AI screening — described on the Employers page.", review: "Recruiters check missing context and validate the evaluation criteria." },
  { name: "Candidate Shortlisting", icon: ListChecks, purpose: "Organise candidate comparisons into a proposed shortlist.", input: "Reviewed profiles and role-specific evaluation criteria.", output: "Suggested candidates and factors for discussion.", capability: "CandidateRank — described on the Employers page.", review: "The hiring team approves the shortlist; a ranking is not a hiring decision." },
  { name: "Interview Coordination", icon: CalendarDays, purpose: "Help organise the next interview stage and candidate communication.", input: "An approved shortlist, interviewer availability and interview format.", output: "Proposed interview next steps for the hiring team.", capability: "InterviewPro and HireX Orchestrator — described on the Employers page.", review: "People confirm schedules and conduct the interviews." },
  { name: "Hiring Workflow Management", icon: Workflow, purpose: "Keep the recruitment stages and follow-up actions organised.", input: "Hiring-stage updates and approved next actions.", output: "A view of progress and outstanding actions.", capability: "Recruitment workflow support — described on the Employers page.", review: "Your team retains approval over candidate progression and final hiring decisions." },
];

export default function AIWorkforceExplorer() {
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return (
    <section aria-labelledby="workforce-heading" className="bg-hirex-deep-navy text-foreground border-y border-border py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <p className="text-hirex-teal text-xs font-semibold mb-4">ILLUSTRATIVE WORKFLOW</p>
        <h2 id="workforce-heading" className="text-3xl md:text-4xl tracking-normal">Meet Your AI Hiring Workforce</h2>
        <p className="mt-4 text-hirex-text2 max-w-2xl">Explore how specialised AI capabilities can support different stages of the recruitment workflow.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 my-8" aria-label="Recruitment stages">
          {stages.map((item, i) => <Button key={item.name} variant="outline" aria-label={item.name} aria-pressed={active === i} aria-controls="workforce-panel" onClick={() => setActive(i)} className={`relative h-auto min-h-24 whitespace-normal flex-col items-start text-left p-4 motion-reduce:transition-none ${active === i ? "border-hirex-teal bg-hirex-teal/10 text-hirex-teal" : "bg-secondary text-hirex-text2"}`}><div className="flex w-full justify-between"><item.icon className="h-5 w-5" /><span className="text-xs">0{i + 1}</span></div><span>{item.name}</span>{i < stages.length - 1 && <ArrowRight aria-hidden="true" className="hidden lg:block absolute -right-3 top-1/2 z-10 text-hirex-teal bg-hirex-deep-navy" />}</Button>)}
        </div>
        <div id="workforce-panel" role="region" aria-live="polite" aria-label={stage.name} className="border-t border-border pt-7 grid md:grid-cols-[1fr_1.2fr] gap-8 min-h-80">
          <div><p className="text-sm text-hirex-teal">Stage {active + 1} / 5</p><h3 className="text-2xl mt-2 tracking-normal">{stage.name}</h3><p className="text-hirex-text2 mt-4 leading-relaxed">{stage.purpose}</p><Button asChild variant="link" className="mt-4 px-0 text-hirex-teal"><Link to="/business">Explore employer capabilities <ArrowRight /></Link></Button></div>
          <dl className="grid gap-5 sm:grid-cols-2 text-sm"><div><dt className="font-semibold mb-2">Input</dt><dd className="text-hirex-text2">{stage.input}</dd></div><div><dt className="font-semibold mb-2">Output</dt><dd className="text-hirex-text2">{stage.output}</dd></div><div><dt className="font-semibold mb-2">Capability</dt><dd className="text-hirex-text2">{stage.capability}</dd></div><div><dt className="font-semibold mb-2 flex gap-2 items-center"><ShieldCheck className="w-4 h-4 text-hirex-teal" />Human review</dt><dd className="text-hirex-text2">{stage.review}</dd></div></dl>
        </div>
        <p className="text-xs text-hirex-text2 mt-6 border-t border-border pt-4">Illustrative exploration of publicly described capabilities, not a live product run. Availability and automation depend on your requirements and plan; confirm with the HIREXAI team.</p>
      </div>
    </section>
  );
}