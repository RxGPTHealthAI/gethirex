import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import CareerDemoControls from "@/components/candidate/CareerDemoControls";
import { agentDetails } from "@/components/candidate/careerDemoData";

export default function CareerAgentPreview({ agent, onClose }: { agent: { name: string; desc: string } | null; onClose: () => void }) {
  const returnFocus = useRef<HTMLElement | null>(null);
  const details = agent ? agentDetails[agent.name] : undefined;
  return <Dialog open={Boolean(agent)} onOpenChange={open => { if (!open) onClose(); }}><DialogContent className="max-w-2xl max-h-[85dvh] overflow-y-auto motion-reduce:animate-none"><DialogHeader><DialogTitle className="text-2xl tracking-normal">{agent?.name}</DialogTitle><DialogDescription>{details?.purpose ?? agent?.desc}</DialogDescription></DialogHeader>{details && <><p className="text-xs text-hirex-teal">ILLUSTRATIVE AGENT EXAMPLE · NOT A LIVE AI SESSION</p><div><h3 className="font-semibold text-sm">The candidate problem</h3><p className="text-sm text-hirex-text2 mt-2">{details.problem}</p></div><dl className="grid sm:grid-cols-2 gap-5 text-sm"><div><dt className="font-semibold">You provide</dt><dd className="text-hirex-text2 mt-2">{details.input}</dd></div><div><dt className="font-semibold">Expected output</dt><dd className="text-hirex-text2 mt-2">{details.output}</dd></div></dl><div className="border-y border-border py-5"><h3 className="text-base font-semibold mb-3">Example interaction</h3><p className="text-sm text-hirex-text2 mb-4">{details.example}</p><CareerDemoControls key={agent?.name} agent={agent?.name ?? ""} /></div><p className="text-xs text-hirex-text2">Fictional, predefined examples only. No AI processing, live job search or personal assessment occurs. Examples are not assessments or guarantees. Confirm current feature access and availability with the HIREXAI team.</p><Button asChild variant="link" className="justify-start px-0"><Link to="/contact">Ask about {agent?.name}<ArrowRight /></Link></Button></>}</DialogContent></Dialog>;
}
