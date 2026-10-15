import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export function RecruitmentSelect({ label, value, options, onChange }: { label: string; value: string; options: readonly string[]; onChange: (value: string) => void }) {
  return <div className="space-y-2 min-w-0"><span className="text-sm font-medium">{label}</span><Select value={value} onValueChange={onChange}><SelectTrigger aria-label={label}><SelectValue /></SelectTrigger><SelectContent className="motion-reduce:animate-none">{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div>;
}
export function RecruitmentCTA() { return <Button asChild variant="link" className="px-0 h-auto whitespace-normal text-hirex-cyan"><Link to="/contact">See HIREXAI Applied to Your Hiring Workflow.<ArrowRight /></Link></Button>; }
export function DemoLabel() { return <p className="text-xs text-hirex-cyan mb-4">ILLUSTRATIVE DEMONSTRATION · FICTIONAL DATA · NO LIVE RECRUITMENT</p>; }
