export const roleSkills = {
  "Frontend Developer": ["JavaScript", "React", "Accessibility", "Testing"],
  "Data Analyst": ["SQL", "Spreadsheets", "Data visualisation", "Statistics"],
  "Product Designer": ["User research", "Prototyping", "Accessibility", "Design systems"],
};
export type CareerRole = keyof typeof roleSkills;
export const careerRoles = Object.keys(roleSkills) as CareerRole[];
export const allSkills = [...new Set(Object.values(roleSkills).flat())];
export const agentDetails: Record<string, { purpose: string; problem: string; input: string; output: string; example: string }> = {
  ResumeReviver: { purpose: "Improve resume structure and role-relevant wording.", problem: "Your contribution can get lost in a vague or difficult-to-scan resume.", input: "Resume content and a target role.", output: "Suggested resume structure and role-relevant wording.", example: "For a frontend role, describe what you built, the tools used and your contribution." },
  JobScout: { purpose: "Explore opportunities against your career preferences.", problem: "Broad searches can produce roles that do not fit your goals.", input: "Skills, target roles and job preferences.", output: "Potential opportunities to review against your preferences.", example: "A sample search could focus on junior frontend roles with React experience." },
  CodeCoach: { purpose: "Practise technical reasoning and review solutions.", problem: "Knowing a tool is different from explaining a solution in an interview.", input: "A technical topic and a practice solution.", output: "Practice exercises and feedback to support learning.", example: "Explain the time complexity of your solution and consider an edge case." },
  InterviewPro: { purpose: "Prepare structured answers and reflect on interview responses.", problem: "It can be difficult to explain your experience clearly under pressure.", input: "A target role and an interview response.", output: "Mock-interview practice and suggested improvements.", example: "Use a clear situation, action and result when describing a project challenge." },
  CareerPilot: { purpose: "Turn a career goal into practical next steps.", problem: "Too many learning options can make it hard to choose where to start.", input: "Career goals, skills and experience.", output: "A career roadmap to review and adapt.", example: "Compare your skills with a target role, then choose one practical learning goal." },
  OfferNinja: { purpose: "Compare offer trade-offs and prepare a negotiation discussion.", problem: "A headline salary alone does not explain the whole offer.", input: "Offer details and compensation priorities.", output: "Negotiation preparation and points to discuss.", example: "Consider the whole offer, including responsibilities, benefits and development opportunities." },
};
