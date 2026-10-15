import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AIWorkforceExplorer from "@/components/AIWorkforceExplorer";
import CampusDashboardPreview from "@/components/CampusDashboardPreview";
import CareerAgentPreview from "@/components/CareerAgentPreview";

afterEach(cleanup);
describe("Local illustrative previews", () => {
  it("reveals recruitment stage inputs and human review", () => {
    render(<MemoryRouter><AIWorkforceExplorer /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Candidate Shortlisting" }));
    expect(screen.getByRole("heading", { name: "Candidate Shortlisting" })).toBeInTheDocument();
    expect(screen.getByText(/a ranking is not a hiring decision/)).toBeInTheDocument();
  });
  it("updates synthetic student scores and recommendations", () => {
    render(<MemoryRouter><CampusDashboardPreview /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Sample Student C" }));
    expect(screen.getByRole("meter", { name: "Resume Readiness sample score" })).toHaveAttribute("aria-valuenow", "8");
    fireEvent.click(screen.getByRole("button", { name: /^Resume Readiness/ }));
    expect(screen.getByText("Tailor your resume to a sample job description.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Request an Institutional Demo" })).toHaveAttribute("href", "/contact");
  });
  it("reveals and hides explicitly illustrative interview feedback", () => {
    render(<MemoryRouter><CareerAgentPreview agent={{ name: "InterviewPro", desc: "Interview practice" }} onClose={() => {}} /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "Reveal example answer" }));
    expect(screen.getByText("Illustrative feedback:")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hide example answer" }));
    expect(screen.queryByText("Illustrative feedback:")).not.toBeInTheDocument();
  });
});