export const gatePath = "/services/ai-initiative-gate";
export const gateContactPath = "/contact?service=ai-initiative-gate";

export const gateChecks = [
  {
    title: "Intake",
    question: "Problem, users, data, integration, risk, ownership, and operating responsibility.",
    description:
      "A structured intake captures the business problem, current baseline, intended users, ownership, data needs, integration requirements, risk, and operational responsibility.",
    detail:
      "Some criteria are hard stops. Without an accountable operating owner, an agreed problem, or a usable baseline, an idea needs more work before funding can be justified.",
  },
  {
    title: "Feasibility & infrastructure",
    question: "Can the current systems, data, security, and people support the idea?",
    description:
      "We identify infrastructure gaps, integration constraints, security considerations, operating dependencies, and the cost required to close readiness gaps.",
    detail:
      "We examine data access and quality, integration boundaries, sensitive-data handling, monitoring, and the people who will support the system. Readiness gaps become explicit dependencies with estimated effort and cost.",
  },
  {
    title: "ROI & pilot criteria",
    question: "What does the idea need to prove before it deserves scale?",
    description:
      "We assess the baseline cost today, realistic benefit, implementation and recurring costs, expected payback, and the exact success criteria a pilot must meet before scaling.",
    detail:
      "The model accounts for review effort, adoption, and ongoing operation. Pilot criteria name the metric, baseline, scale threshold, and stop threshold so a promising demonstration is not mistaken for a proven business case.",
  },
];

export const gateOutputs = [
  "Ranked idea list",
  "Scorecard per idea",
  "Infrastructure gap assessment",
  "Estimated cost to close gaps",
  "Editable ROI calculator",
  "Pilot exit criteria",
  "Leadership-ready one-page recommendation",
];

export const gateEngagement = [
  {
    title: "Half-day workshop",
    description:
      "Run the structured intake against your current idea list with the people who raised the initiatives.",
    outcome: "A same-day ranked view of the ideas worth deeper assessment.",
  },
  {
    title: "Gate assessment · 2–3 weeks",
    description:
      "Full feasibility, infrastructure readiness, ownership, risk, and ROI assessment for the top two or three initiatives.",
    outcome: "Go / Conditional / No-Go recommendation per idea with supporting evidence.",
  },
  {
    title: "Pilot evaluation · optional",
    description:
      "Define measurement criteria, capture the baseline, and independently verify whether the pilot met its agreed exit criteria.",
  },
];

export const gateBoundaries = [
  "We do not build the AI solution as part of the gate.",
  "We do not pick a vendor for you.",
  "We do not write your entire AI strategy or policy.",
  "We do not promise ROI that has not been measured.",
  "We do not force a positive recommendation.",
];

export const gateDeliverables = [
  { title: "Ranked idea list", description: "Every initiative scored against the same criteria." },
  { title: "Scorecard per idea", description: "Intake findings, feasibility, infrastructure gaps, and decision rationale." },
  { title: "Infrastructure readiness", description: "Gaps, dependencies, and estimated effort/cost to close them." },
  { title: "ROI calculator", description: "Editable model using the client's own assumptions and baseline." },
  { title: "Pilot exit criteria", description: "Define the metric, baseline, scale threshold, and stop threshold before the pilot starts." },
  { title: "Leadership one-pager", description: "Plain-language recommendation for leadership and KPI discussions." },
];
