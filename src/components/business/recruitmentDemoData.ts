export const jobs = {
  "Software Engineer": { description: "Build and test web services, collaborate on code reviews and document technical decisions.", skills: ["JavaScript", "React", "Testing", "SQL"], candidates: [{ name: "Sample Candidate A", skills: ["JavaScript", "React", "Testing"], years: 3, strength: "Documented web projects and automated tests." }, { name: "Sample Candidate B", skills: ["JavaScript", "SQL"], years: 2, strength: "Data-backed service projects." }, { name: "Sample Candidate C", skills: ["React", "Testing", "SQL"], years: 1, strength: "Small application projects with test coverage." }] },
  "Sales Manager": { description: "Develop account plans, coach a sales team and maintain an accurate CRM pipeline.", skills: ["CRM", "Account planning", "Coaching", "Forecasting"], candidates: [{ name: "Sample Candidate A", skills: ["CRM", "Account planning", "Coaching"], years: 5, strength: "Team coaching and account-planning examples." }, { name: "Sample Candidate B", skills: ["CRM", "Forecasting"], years: 3, strength: "Pipeline reporting and forecasting examples." }, { name: "Sample Candidate C", skills: ["Account planning", "Coaching", "Forecasting"], years: 2, strength: "Structured account and team-development plans." }] },
  "Customer Support Associate": { description: "Resolve customer tickets, document issues and communicate clear next steps through support channels.", skills: ["Ticketing", "Written communication", "Troubleshooting", "Documentation"], candidates: [{ name: "Sample Candidate A", skills: ["Ticketing", "Written communication", "Troubleshooting"], years: 2, strength: "Clear customer responses and issue triage." }, { name: "Sample Candidate B", skills: ["Written communication", "Documentation"], years: 1, strength: "Structured help articles and response samples." }, { name: "Sample Candidate C", skills: ["Ticketing", "Troubleshooting", "Documentation"], years: 0, strength: "Fictional practice tickets and troubleshooting notes." }] },
};
export type JobRole = keyof typeof jobs;
export const jobRoles = Object.keys(jobs) as JobRole[];
export const pipelineStages = ["Candidates discovered", "Resumes screened", "Shortlist generated", "Interviews coordinated", "Hiring decision"];
export const workflowStages = [
  { title: "Candidate Discovery", agent: "TalentScout", action: "Review a fictional source pool against the sample requirements.", input: "Software Engineer · JavaScript and React · 2+ years", output: "Three fictional profiles ready for screening.", next: "AI Screening" },
  { title: "AI Screening", agent: "ResumeIQ", action: "Compare stated skills and experience with job requirements.", input: "Three fictional profiles and an explicit skills checklist", output: "Requirement evidence and gaps for recruiter review.", next: "Interview Coordination" },
  { title: "Interview Coordination", agent: "InterviewPro", action: "Draft interview questions and proposed time slots.", input: "Recruiter-approved shortlist and fictional availability", output: "A draft interview plan. No invitations or calendar changes are sent.", next: "Human hiring review" },
];
export const agentDetails: Record<string, { purpose: string; input: string; output: string; workflow: string }> = {
  TalentScout: { purpose: "Discover potential candidates for a defined role.", input: "Job description, essential skills and approved sourcing preferences.", output: "Potential profiles for a recruiter to review.", workflow: "Requirements → sample source pool → discovery list" },
  CandidateRank: { purpose: "Explain how profiles meet job-related criteria.", input: "Candidate skill evidence and required experience.", output: "An illustrative comparison with explicit gaps and human review.", workflow: "Criteria → evidence comparison → explainable ordering" },
  InterviewPro: { purpose: "Prepare role-relevant interviews and coordinate availability.", input: "Approved shortlist, interview topics and availability.", output: "Draft questions, proposed slots and a coordination checklist.", workflow: "Shortlist → interview plan → recruiter-approved scheduling" },
  ResumeIQ: { purpose: "Review resume evidence against stated requirements.", input: "Resume content and an essential-skills checklist.", output: "Relevant evidence and missing requirements to verify.", workflow: "Resume → requirements review → screening notes" },
  JobAmplify: { purpose: "Adapt a job description for different publishing channels.", input: "An approved job description and selected channel.", output: "A draft description to review before publication.", workflow: "Approved description → channel draft → editorial review" },
  FastTrack: { purpose: "Move recruiter-approved profiles through workflow stages.", input: "Qualification evidence and reviewer approval.", output: "A proposed stage update and next-action checklist.", workflow: "Screening → human approval → interview preparation" },
  GlobalReach: { purpose: "Organise a multi-location hiring scenario.", input: "Hiring locations, role requirements and interview availability.", output: "A sample location and coordination plan.", workflow: "Locations → role plan → local availability review" },
  "HireX Orchestrator": { purpose: "Coordinate recruitment tasks across the agent modules.", input: "Job requirements, pipeline stages and reviewer decisions.", output: "A workflow overview with explicit human checkpoints.", workflow: "TalentScout → ResumeIQ → CandidateRank → InterviewPro → human decision" },
};
export function rankCandidates(role: JobRole, skills: string[], minYears: number) {
  return jobs[role].candidates.map(candidate => {
    const matched = skills.filter(skill => candidate.skills.includes(skill));
    const missing = skills.filter(skill => !candidate.skills.includes(skill));
    const experienceMet = candidate.years >= minYears;
    const score = Math.round(((matched.length + Number(experienceMet)) / (skills.length + 1)) * 100);
    return { ...candidate, matched, missing, experienceMet, score, qualified: missing.length === 0 && experienceMet };
  }).sort((a,b) => b.score - a.score || a.name.localeCompare(b.name));
}
