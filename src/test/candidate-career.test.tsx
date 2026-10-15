import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CandidateCareerExplorer from "@/components/candidate/CandidateCareerExplorer";
import CareerDemoControls from "@/components/candidate/CareerDemoControls";
import CareerAgentPreview from "@/components/CareerAgentPreview";

afterEach(cleanup);
describe("Candidate local demonstrations", () => {
  it("explains all six fictional dashboard metrics", () => {
    render(<MemoryRouter><CandidateCareerExplorer onExploreAgent={() => {}} /></MemoryRouter>);
    for (const title of ["Career readiness", "Resume readiness", "Skills assessment", "Interview preparation", "Job-match preview", "Roadmap milestones"]) {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${title}`) }));
      expect(within(document.getElementById("career-metric-detail") as HTMLElement).getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });
  it("updates gaps, improvement priorities and resets selections", () => {
    render(<MemoryRouter><CandidateCareerExplorer onExploreAgent={() => {}} /></MemoryRouter>);
    fireEvent.click(screen.getByRole("checkbox", { name: "Already possess Testing" }));
    expect(screen.getByText("Testing — deepen an existing strength")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "Already possess Accessibility" }));
    expect(screen.getByText(/All sample areas selected/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset skill selections" }));
    expect(screen.getByRole("checkbox", { name: "Already possess Testing" })).not.toBeChecked();
  });
  it("opens each journey stage", () => {
    render(<MemoryRouter><CandidateCareerExplorer onExploreAgent={() => {}} /></MemoryRouter>);
    for (const title of ["Build Your Profile", "Strengthen Your Skills", "Prepare for Interviews", "Pursue Relevant Opportunities"]) {
      fireEvent.click(screen.getByRole("button", { name: new RegExp(title) }));
      expect(within(document.getElementById("career-journey-detail") as HTMLElement).getByRole("heading", { name: title })).toBeInTheDocument();
    }
  });
  it("shows and resets a sample resume revision", () => {
    render(<CareerDemoControls agent="ResumeReviver" />);
    fireEvent.click(screen.getByRole("button", { name: "Preview resume improvements" }));
    expect(screen.getByText(/Built a React reading-list/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset resume preview" }));
    expect(screen.getByText("Revision not yet shown.")).toBeInTheDocument();
  });
  it("provides incorrect and correct technical practice feedback", () => {
    render(<CareerDemoControls agent="CodeCoach" />);
    fireEvent.click(screen.getByRole("button", { name: "O(1)" }));
    expect(screen.getByRole("status")).toHaveTextContent("Try again");
    fireEvent.click(screen.getByRole("button", { name: "O(n)", exact: true }));
    expect(screen.getByRole("status")).toHaveTextContent("Correct");
  });
  it("builds a sample roadmap and reveals offer preparation", () => {
    const view = render(<CareerDemoControls agent="CareerPilot" />);
    fireEvent.click(screen.getByRole("button", { name: "Build sample roadmap" }));
    expect(screen.getByRole("status")).toHaveTextContent("Sample Frontend Developer roadmap");
    view.unmount();
    render(<CareerDemoControls agent="OfferNinja" />);
    fireEvent.click(screen.getByRole("button", { name: "Explore negotiation scenario" }));
    expect(screen.getByText(/No outcome is guaranteed/)).toBeInTheDocument();
  });
  it("retains all six agent panels with explicit demo boundaries and contact links", () => {
    for (const name of ["ResumeReviver", "JobScout", "CodeCoach", "InterviewPro", "CareerPilot", "OfferNinja"]) {
      const view = render(<MemoryRouter><CareerAgentPreview agent={{ name, desc: "Sample" }} onClose={() => {}} /></MemoryRouter>);
      expect(screen.getByRole("heading", { name, exact: true })).toBeInTheDocument();
      expect(screen.getByText(/NOT A LIVE AI SESSION/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: `Ask about ${name}` })).toHaveAttribute("href", "/contact");
      view.unmount();
    }
  });
});
