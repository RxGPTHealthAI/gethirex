import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RecruitmentAgentPanel from "@/components/business/RecruitmentAgentPanel";
import RecruitmentDashboard, { RecruitingWorkflowPreview } from "@/components/business/RecruitmentDashboard";
import JobShortlistDemo from "@/components/business/JobShortlistDemo";
import HiringWorkloadExplorer, { workloadTotals } from "@/components/business/HiringWorkloadExplorer";
import EmployerAudiencePreview from "@/components/business/EmployerAudiencePreview";
import { rankCandidates } from "@/components/business/recruitmentDemoData";
afterEach(cleanup);
const wrap=(child:React.ReactNode)=>render(<MemoryRouter>{child}</MemoryRouter>);
describe("Employer local recruitment previews",()=>{
 it("scores only explicit skills and relevant experience",()=>{
  const result=rankCandidates("Software Engineer",["JavaScript","React"],2);
  expect(result[0].score).toBe(100);expect(result[0].qualified).toBe(true);
  expect(result[1].score).toBe(67);expect(result[1].missing).toEqual(["React"]);
  expect(rankCandidates("Software Engineer",["SQL"],5).every(c=>!c.qualified)).toBe(true);
 });
 it("opens all eight existing agents",()=>{
  for(const name of ["TalentScout","CandidateRank","InterviewPro","ResumeIQ","JobAmplify","FastTrack","GlobalReach","HireX Orchestrator"]){
   const view=wrap(<RecruitmentAgentPanel name={name}/>);
   expect(screen.getByRole("heading",{name})).toBeInTheDocument();expect(screen.getByText(/NO LIVE RECRUITMENT/)).toBeInTheDocument();
   expect(screen.getByRole("link",{name:/See HIREXAI Applied/})).toHaveAttribute("href","/contact");view.unmount();
  }
 });
 it("reveals discovery, screening and interview coordination",()=>{
  for(const [name,label,text] of [["TalentScout","Discover sample candidates","Sample Candidate A"],["ResumeIQ","Screen sample resume","Recruiter must verify"],["InterviewPro","Preview interview coordination","Nothing is scheduled"]]){
   const view=wrap(<RecruitmentAgentPanel name={name}/>);fireEvent.click(screen.getByRole("button",{name:label}));expect(screen.getByText(new RegExp(text))).toBeInTheDocument();view.unmount();
  }
 });
 it("changes dashboard roles and human-decision stages",()=>{
  wrap(<RecruitmentDashboard/>);fireEvent.click(screen.getByRole("button",{name:/Sales Manager/}));fireEvent.click(screen.getByRole("button",{name:/Hiring decision/}));
  expect(screen.getByRole("heading",{name:"Sales Manager · Hiring decision"})).toBeInTheDocument();expect(screen.getByText(/Awaiting a human hiring decision/)).toBeInTheDocument();
 });
 it("runs criteria selection and clears stale shortlist results",()=>{
  wrap(<JobShortlistDemo/>);fireEvent.click(screen.getByRole("button",{name:"Start demonstration"}));expect(screen.getByText("100%")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("checkbox",{name:"Require SQL"}));expect(screen.queryByRole("button",{name:"Reset demonstration"})).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Start demonstration"}));expect(screen.getAllByText(/Does not meet every/).length).toBeGreaterThan(0);
  fireEvent.click(screen.getByRole("button",{name:"Reset demonstration"}));expect(screen.queryByRole("button",{name:"Candidate Ranking"})).not.toBeInTheDocument();
 });
 it("disables shortlist start with no essential skills",()=>{
  wrap(<JobShortlistDemo/>);fireEvent.click(screen.getByRole("checkbox",{name:"Require JavaScript"}));fireEvent.click(screen.getByRole("checkbox",{name:"Require React"}));
  expect(screen.getByRole("button",{name:"Start demonstration"})).toBeDisabled();expect(screen.getByRole("alert")).toHaveTextContent("Select at least one");
 });
 it("calculates workload with guards and editable allocations, never savings",()=>{
  expect(workloadTotals(10,12,2,1000)).toEqual({total:120,perRecruiter:60,cost:10000});expect(workloadTotals(0,12,0,null)).toEqual({total:0,perRecruiter:0,cost:null});
  wrap(<HiringWorkloadExplorer/>);expect(screen.getByText("120 hrs")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Sourcing allocation (%)"),{target:{value:"40"}});expect(screen.getByRole("alert")).toHaveTextContent("total 100%");
  fireEvent.change(screen.getByLabelText("Screening allocation (%)"),{target:{value:"20"}});expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Recruiters involved"),{target:{value:"0"}});expect(screen.getByRole("alert")).toHaveTextContent("at least one recruiter");
  fireEvent.click(screen.getByRole("button",{name:"Reset workload explorer"}));expect(screen.getByLabelText("Recruiters involved")).toHaveValue(2);
 });
 it("moves through all workflow steps",()=>{
  wrap(<RecruitingWorkflowPreview/>);fireEvent.click(screen.getByRole("button",{name:"AI Screening"}));expect(screen.getByRole("heading",{name:"AI Screening · ResumeIQ"})).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button",{name:"Continue to Interview Coordination"}));expect(screen.getByText(/No invitations or calendar changes/)).toBeInTheDocument();
 });
 it("expands employer-specific existing modules",()=>{
  for(const title of ["Startups","Growth & Enterprise","Campus & Volume Hiring"]){const view=wrap(<EmployerAudiencePreview title={title}/>);fireEvent.click(screen.getByRole("button",{name:"Explore recommended workflow"}));expect(screen.getByText(/Recommended modules:/)).toBeInTheDocument();view.unmount();}
 });
});
