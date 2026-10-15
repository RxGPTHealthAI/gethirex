import { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["Career Readiness", "Skills Development", "Resume Readiness", "Interview Preparation", "Internship Readiness", "Placement Preparation"];
const dimensions = ["Technical skills", "Communication", "Projects", "Certifications", "Interview preparation", "AI literacy"];
const developmentRecommendations = [
  ["Choose a foundational technical topic and build a small exercise.", "Practise a two-minute introduction with a career adviser.", "Document one coursework project and your contribution.", "Explore relevant certifications before choosing a learning path.", "Practise one behavioural question with human feedback.", "Learn how to verify AI-generated answers and protect personal data."],
  ["Extend a technical project with tests and a clear write-up.", "Explain a project to a non-technical audience and seek feedback.", "Add an industry-style problem and document your approach.", "Compare certification requirements with your intended roles.", "Practise explaining technical decisions in a mock interview.", "Evaluate an AI tool's limitations using a non-sensitive example."],
  ["Review role-specific technical gaps with a mentor.", "Prepare concise examples of collaboration and leadership.", "Refine your portfolio with evidence of project outcomes.", "Review which existing credentials support your target roles.", "Rehearse structured answers and request adviser feedback.", "Explain responsible AI use and validation in your project work."],
];
const students = [
  { name: "Sample Student A", year: "Year 2 · Career discovery", scores: [4, 5, 3, 2, 3, 2], readiness: [5, 4, 3, 2, 2, 4], recommendations: ["Explore two career paths and identify the skills they require.", "Build a foundation in one technical skill through a small project.", "Draft a first resume with coursework and project experience.", "Practise a short introduction and one behavioural question.", "Document a project and explore internship requirements.", "Start a preparation checklist; this is not a placement prediction."] },
  { name: "Sample Student B", year: "Year 3 · Industry readiness", scores: [6, 7, 5, 4, 6, 4], readiness: [7, 5, 6, 4, 4, 6], recommendations: ["Compare career options with your current project experience.", "Extend a project with tests and a clear technical write-up.", "Add evidence of project outcomes and relevant skills.", "Practise explaining technical decisions with examples.", "Prepare an internship portfolio and review role requirements.", "Identify preparation gaps before the final-year application cycle."] },
  { name: "Sample Student C", year: "Year 4 · Placement preparation", scores: [8, 7, 8, 6, 7, 7], readiness: [7, 6, 8, 5, 6, 7], recommendations: ["Refine your target roles and review their requirements.", "Review role-specific technical topics and skills gaps.", "Tailor your resume to a sample job description.", "Practise structured answers and seek human feedback.", "Reflect on internship or project experience with concrete examples.", "Review your application checklist with a career adviser."] },
];

function ReadinessScale({ value, label }: { value: number; label: string }) {
  return <div role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={10} aria-valuenow={value} aria-valuetext={`${value} of 10 illustrative readiness`} className="grid grid-cols-10 gap-1 h-2.5 mt-3">{Array.from({ length: 10 }, (_, i) => <span key={i} className={`rounded-sm ${i < value ? "bg-hirex-cyan" : "bg-muted"}`} />)}</div>;
}

export default function CampusDashboardPreview() {
  const [studentIndex, setStudentIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [dimensionIndex, setDimensionIndex] = useState(0);
  const student = students[studentIndex];
  return <section aria-labelledby="campus-preview-heading" className="py-20 bg-hirex-deep-navy text-foreground border-y border-border">
    <div className="container">
      <p className="text-hirex-cyan font-semibold text-xs mb-4">DEMONSTRATION PREVIEW · SYNTHETIC STUDENT DATA</p>
      <h2 id="campus-preview-heading" className="text-3xl md:text-4xl tracking-normal max-w-3xl">Your Campus. Your Talent. One AI-Powered View.</h2>
      <p className="text-hirex-text2 mt-4 max-w-3xl leading-relaxed">Explore how AI-powered career-readiness tools can help institutions understand student preparation, identify skills gaps, and organise placement-readiness activities.</p>
      <div className="mt-8 border border-border rounded-lg bg-secondary overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 border-b border-border"><div className="flex gap-3 items-center"><GraduationCap className="text-hirex-cyan" /><div><p className="font-semibold">Campus readiness</p><p className="text-xs text-hirex-text2">Sample profiles · Not live college analytics</p></div></div><div className="flex flex-wrap gap-2" aria-label="Sample student profiles">{students.map((s, i) => <Button key={s.name} variant={studentIndex === i ? "default" : "outline"} aria-pressed={studentIndex === i} onClick={() => setStudentIndex(i)} className="text-xs">{s.name}</Button>)}</div></div>
        <div className="p-5 md:p-7" aria-live="polite"><h3 className="text-xl tracking-normal">{student.name}</h3><p className="text-hirex-text2 text-sm mt-1">{student.year}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">{categories.map((category, i) => <Button key={category} variant="outline" onClick={() => setCategoryIndex(i)} aria-pressed={categoryIndex === i} aria-controls="campus-recommendation" className={`block text-left h-auto p-4 whitespace-normal ${categoryIndex === i ? "border-hirex-cyan bg-hirex-cyan/10" : "bg-background"}`}><div className="flex justify-between gap-2"><span className="text-sm">{category}</span><span className="text-hirex-cyan text-xs">{student.scores[i]}/10</span></div><ReadinessScale value={student.scores[i]} label={`${category} sample score`} /></Button>)}</div>
          <div id="campus-recommendation" className="mt-6 py-5 border-y border-border"><p className="text-sm text-hirex-cyan font-semibold">{categories[categoryIndex]} · Example recommendation</p><p className="text-hirex-text2 text-sm mt-2">{student.recommendations[categoryIndex]}</p></div>
          <h3 className="text-xl mt-7 tracking-normal">Placement Readiness Explorer</h3><div className="grid md:grid-cols-2 gap-8 mt-4"><div className="grid grid-cols-2 gap-2 content-start">{dimensions.map((d, i) => <Button key={d} variant={dimensionIndex === i ? "default" : "outline"} aria-pressed={dimensionIndex === i} aria-controls="dimension-recommendation" onClick={() => setDimensionIndex(i)} className="text-xs h-auto min-h-11 whitespace-normal motion-reduce:transition-none">{d}</Button>)}</div><div id="dimension-recommendation"><p className="flex items-center justify-between gap-4 text-sm"><span>{dimensions[dimensionIndex]}</span><span className="text-hirex-cyan shrink-0">{student.readiness[dimensionIndex]}/10 sample</span></p><ReadinessScale label={`${dimensions[dimensionIndex]} illustrative readiness`} value={student.readiness[dimensionIndex]} /><p className="text-hirex-warm-teal text-xs font-semibold mt-5">EXAMPLE DEVELOPMENT RECOMMENDATION</p><p className="text-foreground text-sm mt-2">{developmentRecommendations[studentIndex][dimensionIndex]}</p><p className="text-hirex-text2 text-sm mt-4">A preparation category to review with a career adviser, not a prediction of placement success.</p></div></div>
          <p className="flex gap-2 items-start text-xs text-hirex-text2 mt-7"><Info className="h-4 w-4 shrink-0" />All profiles, scores and recommendations are illustrative, not genuine assessments. This preview does not process student information or represent confirmed live dashboard availability.</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><h3 className="text-xl tracking-normal">Explore HIREXAI for Your Institution</h3><Button asChild className="h-auto min-h-11 whitespace-normal text-left"><Link to="/contact">Request an Institutional Demo <ArrowRight /></Link></Button></div>
    </div>
  </section>;
}