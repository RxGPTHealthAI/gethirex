import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CollegePlanningTool from "@/components/CollegePlanningTool";
import CampusDashboardPreview from "@/components/CampusDashboardPreview";

afterEach(cleanup);
const fill = (label: RegExp, value: string) => fireEvent.change(screen.getByLabelText(label), { target: { value } });
describe("College planning and readiness", () => {
  it("calculates an editable allocation without savings claims and resets", () => {
    render(<MemoryRouter><CollegePlanningTool /></MemoryRouter>);
    fill(/^Number of students$/, "1000"); fill(/^Number of departments$/, "5");
    fill(/^Current placement support costs/, "100000"); fill(/^Planned student participation$/, "250");
    expect(screen.getByText("25.0%")).toBeInTheDocument();
    expect(screen.getByText("₹25,000.00")).toBeInTheDocument();
    fill(/^Cost allocation assumption/, "50");
    expect(screen.getByText("₹50,000.00")).toBeInTheDocument();
    expect(screen.getByText("₹200.00")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reset planning inputs" }));
    expect(screen.getByText("Awaiting valid institutional figures.")).toBeInTheDocument();
  });
  it("rejects excess participation and safely handles zero participants", () => {
    render(<MemoryRouter><CollegePlanningTool /></MemoryRouter>);
    fill(/^Number of students$/, "100"); fill(/^Number of departments$/, "2");
    fill(/^Current placement support costs/, "2000"); fill(/^Planned student participation$/, "101");
    expect(screen.getByRole("alert")).toBeInTheDocument();
    fill(/^Planned student participation$/, "0");
    expect(screen.getByText("Not applicable · no participants")).toBeInTheDocument();
    fill(/^Cost allocation assumption/, "101");
    expect(screen.getByRole("alert")).toHaveTextContent("between 0 and 100%");
  });
  it("changes recommendations with category and sample profile", () => {
    render(<MemoryRouter><CampusDashboardPreview /></MemoryRouter>);
    fireEvent.click(screen.getByRole("button", { name: "AI literacy" }));
    expect(screen.getByText("Learn how to verify AI-generated answers and protect personal data.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Sample Student C" }));
    expect(screen.getByText("Explain responsible AI use and validation in your project work.")).toBeInTheDocument();
    expect(screen.getByRole("meter", { name: "AI literacy illustrative readiness" })).toHaveAttribute("aria-valuenow", "7");
  });
});