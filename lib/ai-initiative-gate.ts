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
    price: "$1,500 fixed",
    description: "Half-day working session using your existing AI idea list.",
    includes: ["Initial ranking", "Hard stops", "Evidence gaps", "Recommendation on which ideas deserve deeper assessment"],
    note: "Workshop fee credited in full toward a Full Gate Assessment if you proceed within 30 days.",
  },
  {
    stage: "Decide",
    title: "Full Gate Assessment",
    summaryTitle: "Full Gate Assessment",
    price: "From $7,500",
    scope: "Includes up to 3 initiatives.",
    description: "Feasibility, infrastructure readiness, ownership, risk, ROI, pilot criteria, and recommendation.",
    additional: "Additional initiatives: +$2,000 each",
    note: "Final scope confirmed after the workshop.",
  },
  {
    stage: "Prove",
    title: "Independent Pilot Evaluation",
    summaryTitle: "Independent Pilot Evaluation",
    price: "From $1,500/week",
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
