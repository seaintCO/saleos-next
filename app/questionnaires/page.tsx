"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import {
  Download,
  ClipboardList,
  Save,
  AlertTriangle,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

type Section = {
  heading: string;
  questions: string[];
};

type Questionnaire = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  sections: Section[];
};

const questionnaires: Questionnaire[] = [
  {
    id: "crm-build",
    title: "High-Ticket CRM Build Intake",
    description:
      "Use before any custom CRM, SalesOS, LegacyOS, ConstructionOS, or backend system build.",
    fileName: "crm-build-intake-completed.pdf",
    sections: [
      {
        heading: "Company Information",
        questions: [
          "Company legal name",
          "Main point of contact",
          "Email",
          "Phone",
          "Website",
          "Industry / niche",
          "Team size",
          "Primary locations served",
        ],
      },
      {
        heading: "Current Systems",
        questions: [
          "What CRM or software do you currently use?",
          "What tools does your team use daily?",
          "What is not working with your current process?",
          "Where are leads currently stored?",
          "Where are client notes stored?",
          "Where are tasks and follow-ups tracked?",
        ],
      },
      {
        heading: "Access / API Requirements",
        questions: [
          "CRM login/API access",
          "Website login",
          "Domain registrar login",
          "Hosting login",
          "Google Workspace access",
          "Stripe/payment processor access",
          "Twilio/SMS provider access",
          "Calendar access",
          "Zapier/Make access",
          "Vendor API keys",
        ],
      },
      {
        heading: "Pipeline / Workflow",
        questions: [
          "What are your lead stages?",
          "What are your deal/project stages?",
          "Who owns each stage?",
          "What happens after a new lead comes in?",
          "What follow-up should happen automatically?",
          "What should trigger reminders?",
          "What reports does leadership need?",
        ],
      },
      {
        heading: "Data / Vendor List",
        questions: [
          "List all vendors used",
          "List all software subscriptions",
          "List all integrations needed",
          "List all team members needing access",
          "Upload/export current leads",
          "Upload/export current clients",
          "Upload/export current deals/projects",
        ],
      },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate CRM Intake",
    description:
      "For LegacyOS, real estate investors, agents, acquisitions teams, and property pipelines.",
    fileName: "real-estate-crm-intake-completed.pdf",
    sections: [
      {
        heading: "Business Model",
        questions: [
          "Are you an agent, investor, wholesaler, brokerage, or property manager?",
          "What property types do you focus on?",
          "What cities/markets do you serve?",
          "How many leads per month?",
          "How many deals per month?",
        ],
      },
      {
        heading: "Pipeline Requirements",
        questions: [
          "Seller lead stages",
          "Buyer/client stages",
          "Property stages",
          "Appointment stages",
          "Follow-up schedule",
          "Offer tracking needs",
          "Contract/document tracking needs",
        ],
      },
      {
        heading: "Access Needed",
        questions: [
          "MLS/IDX access if applicable",
          "Google Calendar access",
          "Email access",
          "CRM export",
          "Lead source access",
          "Website/domain access",
          "Text/call system access",
        ],
      },
    ],
  },
  {
    id: "construction",
    title: "Construction CRM Intake",
    description:
      "For contractors, masonry, commercial jobs, estimates, bids, crews, suppliers, and project tracking.",
    fileName: "construction-crm-intake-completed.pdf",
    sections: [
      {
        heading: "Company & Services",
        questions: [
          "Company name",
          "Services offered",
          "Commercial, industrial, residential, or mixed?",
          "Average project value",
          "Service areas",
          "Crew size",
        ],
      },
      {
        heading: "Job Workflow",
        questions: [
          "How do new job leads come in?",
          "How do you track estimates?",
          "How do you track bids?",
          "How do you track awarded jobs?",
          "What project statuses do you need?",
          "Who assigns crews?",
          "What reports do you need weekly?",
        ],
      },
      {
        heading: "Access / Vendors",
        questions: [
          "Estimator software access",
          "Supplier/vendor list",
          "Material pricing source",
          "Email access",
          "Calendar access",
          "CRM/spreadsheet export",
          "Project documents/folders",
          "API access if any",
        ],
      },
    ],
  },
];

export default function QuestionnairesPage() {
  const [selectedId, setSelectedId] = useState(questionnaires[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [clientName, setClientName] = useState("");
  const [saved, setSaved] = useState(false);

  const selected = questionnaires.find((q) => q.id === selectedId)!;

  useEffect(() => {
    const savedData = localStorage.getItem("salesos_questionnaires");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setAnswers(parsed.answers || {});
      setClientName(parsed.clientName || "");
      setSelectedId(parsed.selectedId || questionnaires[0].id);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "salesos_questionnaires",
      JSON.stringify({
        answers,
        clientName,
        selectedId,
      })
    );
  }, [answers, clientName, selectedId]);

  const allQuestions = useMemo(() => {
    return selected.sections.flatMap((section) =>
      section.questions.map((question) => ({
        section: section.heading,
        question,
        key: `${selected.id}-${section.heading}-${question}`,
      }))
    );
  }, [selected]);

  const completed = allQuestions.filter((q) => answers[q.key]?.trim()).length;
  const completion = Math.round((completed / allQuestions.length) * 100);

  const missingCritical = allQuestions.filter((q) => {
    const lower = q.question.toLowerCase();

    return (
      !answers[q.key]?.trim() &&
      (lower.includes("api") ||
        lower.includes("access") ||
        lower.includes("login") ||
        lower.includes("vendor") ||
        lower.includes("export"))
    );
  });

  function updateAnswer(key: string, value: string) {
    setAnswers({
      ...answers,
      [key]: value,
    });
  }

  function manualSave() {
    localStorage.setItem(
      "salesos_questionnaires",
      JSON.stringify({
        answers,
        clientName,
        selectedId,
      })
    );

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function downloadPDF() {
    const doc = new jsPDF();
    let y = 18;

    doc.setFontSize(20);
    doc.text("SALESOS CLIENT INTAKE", 14, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(selected.title, 14, y);
    y += 8;

    doc.text(`Client: ${clientName || "Not provided"}`, 14, y);
    y += 8;

    doc.text(`Completion: ${completion}%`, 14, y);
    y += 12;

    doc.setFontSize(10);
    const description = doc.splitTextToSize(selected.description, 180);
    doc.text(description, 14, y);
    y += description.length * 6 + 8;

    selected.sections.forEach((section) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(section.heading, 14, y);
      y += 8;

      section.questions.forEach((question) => {
        const key = `${selected.id}-${section.heading}-${question}`;
        const answer = answers[key] || "Not provided";

        if (y > 250) {
          doc.addPage();
          y = 20;
        }

        doc.setFontSize(10);
        doc.text(`${question}:`, 16, y);
        y += 6;

        const splitAnswer = doc.splitTextToSize(answer, 170);
        doc.text(splitAnswer, 18, y);
        y += splitAnswer.length * 6 + 6;
      });

      y += 4;
    });

    doc.save(`${clientName || selected.id}-${selected.fileName}`);
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5">
          <ClipboardList size={14} />
          SALESOS CLIENT INTAKE SYSTEM
        </div>

        <h1 className="text-4xl font-semibold tracking-tight">
          Client Questionnaires
        </h1>

        <p className="text-zinc-500 mt-2 max-w-3xl">
          Fill, save, and export completed intake PDFs before any CRM or system
          build. This prevents missing API keys, vendor lists, access, workflows,
          and data exports.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="space-y-4">
          {questionnaires.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`w-full text-left glass-card p-5 transition ${
                selected.id === item.id
                  ? "border-blue-500 bg-blue-500/10"
                  : ""
              }`}
            >
              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-sm text-zinc-500 mt-2">
                {item.description}
              </p>
            </button>
          ))}
        </div>

        <div className="xl:col-span-2 glass-card p-7">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-8">
            <div>
              <h2 className="text-3xl font-semibold">
                {selected.title}
              </h2>

              <p className="text-zinc-500 mt-2">
                {selected.description}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={manualSave}
                className="bg-zinc-900 border border-white/10 rounded-xl px-5 py-3 font-semibold flex items-center gap-2"
              >
                <Save size={18} />
                Save
              </button>

              <button
                onClick={downloadPDF}
                className="bg-white text-black rounded-xl px-5 py-3 font-semibold flex items-center gap-2"
              >
                <Download size={18} />
                PDF
              </button>
            </div>
          </div>

          {saved && (
            <div className="mb-5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 rounded-2xl p-4 text-sm">
              Questionnaire saved.
            </div>
          )}

          <div className="mb-6">
            <label className="text-sm text-zinc-400">
              Client / Company Name
            </label>

            <input
              className="soft-input mt-2"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Example: CR Masonry"
            />
          </div>

          <div className="space-y-10">
            {selected.sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-semibold mb-4">
                  {section.heading}
                </h3>

                <div className="space-y-4">
                  {section.questions.map((question) => {
                    const key = `${selected.id}-${section.heading}-${question}`;
                    const filled = Boolean(answers[key]?.trim());

                    return (
                      <div
                        key={key}
                        className="border border-white/10 rounded-2xl p-4 bg-black/30"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {filled ? (
                            <CheckCircle2
                              size={16}
                              className="text-emerald-400"
                            />
                          ) : (
                            <AlertTriangle
                              size={16}
                              className="text-yellow-400"
                            />
                          )}

                          <p className="text-sm font-medium text-zinc-200">
                            {question}
                          </p>
                        </div>

                        <textarea
                          value={answers[key] || ""}
                          onChange={(e) =>
                            updateAnswer(key, e.target.value)
                          }
                          className="soft-input min-h-[90px]"
                          placeholder="Type answer here..."
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">
              Intake Completion
            </h2>

            <p className="text-6xl font-semibold mt-6">
              {completion}%
            </p>

            <p
              className={`mt-3 text-sm font-semibold ${
                completion >= 90
                  ? "text-emerald-400"
                  : completion >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              {completion >= 90
                ? "Ready for handoff"
                : completion >= 60
                ? "Almost ready"
                : "Missing key info"}
            </p>

            <div className="mt-5 h-3 rounded-full bg-zinc-900 overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{
                  width: `${completion}%`,
                }}
              />
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="text-purple-400" size={22} />

              <h2 className="text-2xl font-semibold">
                ALMA Intake Analysis
              </h2>
            </div>

            <div className="border border-white/10 rounded-2xl p-5 bg-black/30 text-sm text-zinc-300 leading-relaxed">
              {missingCritical.length > 0 ? (
                <div>
                  <p className="text-red-400 font-semibold mb-3">
                    Critical missing items:
                  </p>

                  <div className="space-y-2">
                    {missingCritical.slice(0, 6).map((item) => (
                      <p key={item.key}>• {item.question}</p>
                    ))}
                  </div>

                  <p className="mt-4 text-zinc-400">
                    Do not start implementation until these are collected.
                  </p>
                </div>
              ) : (
                <p>
                  No critical access gaps detected. This intake is ready to move
                  into onboarding and build handoff.
                </p>
              )}
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-2xl font-semibold">
              Rep Instructions
            </h2>

            <div className="text-sm text-zinc-400 mt-4 space-y-3 leading-relaxed">
              <p>
                1. Fill every answer before promising a build date.
              </p>

              <p>
                2. Download the completed PDF and attach it to the client file.
              </p>

              <p>
                3. Move the client to Onboarding once access and API keys are
                confirmed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}