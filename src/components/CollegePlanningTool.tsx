import { useState } from "react";
import { ArrowRight, Calculator, RotateCcw, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialInputs = { students: "", departments: "", costs: "", participants: "" };
const fields = [
  { key: "students", label: "Number of students", hint: "Total students in the planning scope", integer: true },
  { key: "departments", label: "Number of departments", hint: "Departments included in this scenario", integer: true },
  { key: "costs", label: "Current placement support costs (₹)", hint: "Use your chosen planning period", integer: false },
  { key: "participants", label: "Planned student participation", hint: "Number of students expected to participate", integer: true },
] as const;
const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);

export default function CollegePlanningTool() {
  const [inputs, setInputs] = useState(initialInputs);
  const [allocation, setAllocation] = useState<string | null>(null);
  const students = Number(inputs.students);
  const departments = Number(inputs.departments);
  const costs = Number(inputs.costs);
  const participants = Number(inputs.participants);
  const entered = Object.values(inputs).every(value => value.trim() !== "");
  const valid = entered && Object.values(inputs).every(value => Number.isFinite(Number(value)) && Number(value) >= 0)
    && Number.isInteger(students) && Number.isInteger(departments) && Number.isInteger(participants) && students > 0 && departments > 0 && participants <= students;
  const participation = students > 0 ? participants / students * 100 : 0;
  const allocationPercent = allocation === null ? participation : Number(allocation);
  const allocationValid = allocation !== "" && Number.isFinite(allocationPercent) && allocationPercent >= 0 && allocationPercent <= 100;
  const allocatedCosts = costs * allocationPercent / 100;
  const update = (key: keyof typeof inputs, value: string) => setInputs(current => ({ ...current, [key]: value }));

  return <>
    <section aria-labelledby="college-planning-heading" className="py-20 bg-secondary border-y border-border">
      <div className="container">
        <p className="text-hirex-cyan text-xs font-semibold mb-4">INSTITUTIONAL PLANNING · OPTIONAL</p>
        <div className="flex items-start justify-between gap-4">
          <div><h2 id="college-planning-heading" className="text-3xl md:text-4xl tracking-normal">College ROI Planning Tool</h2><p className="mt-4 text-hirex-text2 max-w-2xl">An editable cost-allocation scenario for your institution. Not a HIREXAI quote, savings estimate or financial return forecast.</p></div>
          <Calculator aria-hidden="true" className="h-8 w-8 text-hirex-warm-teal shrink-0" />
        </div>
        <div className="grid lg:grid-cols-2 gap-10 mt-10">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6"><h3 className="text-xl tracking-normal">Your figures</h3><Button variant="ghost" size="icon" aria-label="Reset planning inputs" title="Reset planning inputs" onClick={() => { setInputs(initialInputs); setAllocation(null); }}><RotateCcw /></Button></div>
            <div className="grid sm:grid-cols-2 gap-6">
              {fields.map(field => <div key={field.key} className="space-y-2">
                <Label htmlFor={`planning-${field.key}`}>{field.label}</Label>
                <Input id={`planning-${field.key}`} type="number" min={field.key === "students" || field.key === "departments" ? 1 : 0} step={field.integer ? 1 : "0.01"} value={inputs[field.key]} onChange={e => update(field.key, e.target.value)} aria-describedby={`planning-${field.key}-hint`} />
                <p id={`planning-${field.key}-hint`} className="text-xs text-hirex-text2">{field.hint}</p>
              </div>)}
            </div>
            {entered && !valid && <p role="alert" className="mt-4 text-sm text-destructive">Use positive whole numbers for students and departments, non-negative costs, and participation between zero and the total student count.</p>}
            <p className="flex items-start gap-2 text-xs text-hirex-text2 mt-6"><ShieldCheck className="h-4 w-4 shrink-0" />Figures stay on this page; they are not stored or sent to a service.</p>
          </div>
          <div className="border-l-0 lg:border-l border-border lg:pl-10" aria-live="polite">
            <h3 className="text-xl tracking-normal mb-2">Scenario breakdown</h3>
            <p className="text-xs text-hirex-text2 mb-6">All amounts use the same planning period as your entered costs.</p>
            {!valid ? <div className="border-y border-border py-10 text-hirex-text2 text-sm">Awaiting valid institutional figures.</div> : <>
              <dl className="divide-y divide-border">
                {[["Current support costs · your figure", money(costs)], ["Planned participation · your figure", `${participants.toLocaleString("en-IN")} / ${students.toLocaleString("en-IN")} students`], ["Participation share · calculated", `${participation.toFixed(1)}%`], ["Current cost per student · calculated", money(costs / students)]].map(([label, value]) => <div key={label} className="py-3 flex flex-wrap items-center justify-between gap-2"><dt className="text-sm text-hirex-text2">{label}</dt><dd className="font-semibold text-sm tabular-nums">{value}</dd></div>)}
              </dl>
              <div className="mt-5 space-y-2">
                <Label htmlFor="planning-allocation">Cost allocation assumption (%)</Label>
                <Input id="planning-allocation" type="number" min={0} max={100} step="0.1" value={allocation ?? participation.toFixed(2)} onChange={e => setAllocation(e.target.value)} aria-describedby="allocation-hint" />
                <p id="allocation-hint" className="text-xs text-hirex-text2">Initially proportional to participation; edit to reflect your own allocation assumption. This is not an expected saving.</p>
              </div>
              {!allocationValid ? <p role="alert" className="text-destructive text-sm mt-3">Enter an allocation between 0 and 100%.</p> : <dl className="divide-y divide-border mt-4">
                {[["Scenario allocated support costs", money(allocatedCosts)], ["Allocated cost per participant", participants > 0 ? money(allocatedCosts / participants) : "Not applicable · no participants"], ["Allocated cost per department", money(allocatedCosts / departments)]].map(([label, value]) => <div key={label} className="py-3 flex flex-wrap justify-between gap-2"><dt className="text-sm text-hirex-text2">{label}</dt><dd className="text-hirex-warm-teal font-semibold text-sm tabular-nums">{value}</dd></div>)}
                <p className="text-xs text-hirex-text2 pt-3">Per-department allocation assumes an equal split. No HIREXAI fees or savings assumptions are included.</p>
              </dl>}
            </>}
          </div>
        </div>
      </div>
    </section>
    <section aria-labelledby="institutional-demo-heading" className="py-16 bg-hirex-deep-navy border-b border-border">
      <div className="container flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl"><h2 id="institutional-demo-heading" className="text-3xl tracking-normal">Ready to Explore AI-Powered Campus Readiness?</h2><p className="mt-4 text-hirex-text2">Discover how HIREXAI could support career preparation, student readiness, and institutional hiring workflows.</p></div>
        <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal self-start lg:self-center"><Link to="/contact">Request an Institutional Demo <ArrowRight /></Link></Button>
      </div>
    </section>
  </>;
}