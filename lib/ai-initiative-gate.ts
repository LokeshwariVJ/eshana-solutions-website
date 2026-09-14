export const gatePath = "/services/ai-initiative-gate";
export const gateContactPath = "/contact?service=ai-initiative-gate";

export const gateChecks = [
  { title: "Intake", description: "Problem, users, data, integration, risk, ownership." },
  { title: "Feasibility & infrastructure", description: "Can the current systems, data, security, and people support the initiative?" },
  { title: "ROI & pilot criteria", description: "What is the realistic value, cost, payback, and what must a pilot prove?" },
];

export const gateEngagement = [
  {
    stage: "Start",
    title: "AI Initiative Gate Workshop",
    summaryTitle: "Workshop",
    description: "A focused half-day working session using your existing AI idea list.",
    includes: ["Initial ranking", "Hard stops", "Evidence gaps", "Recommendation on which ideas deserve deeper assessment"],
  },
  {
    stage: "Decide",
    title: "Full Gate Assessment",
    summaryTitle: "Full Gate Assessment",
    description: "A deeper assessment covering:",
    includes: ["Feasibility", "Infrastructure readiness", "Ownership", "Risk", "ROI", "Pilot success criteria", "Go / Conditional / No-Go recommendation"],
  },
  {
    stage: "Prove",
    title: "Independent Pilot Evaluation",
    summaryTitle: "Independent Pilot Evaluation",
    description: "Independent measurement of the pilot against agreed baseline and scale/stop criteria.",
  },
];

export const gateDeliverables = [
  { title: "Ranked idea list", description: "A clear order for deciding what to pursue next." },
  { title: "Scorecard per idea", description: "A consistent record of the evidence behind each decision." },
  { title: "Infrastructure + readiness gaps", description: "Dependencies and estimated effort to close them." },
  { title: "Editable ROI model", description: "A working model using your own assumptions and baseline." },
  { title: "Pilot exit criteria + leadership recommendation", description: "A concise decision brief with thresholds for scaling or stopping." },
];
