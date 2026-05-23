"use client";

import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import {
  ClipboardCheck,
  AlertTriangle,
  CheckCircle2,
  Download,
} from "lucide-react";

type ChecklistItem = {
  id: string;
  label: string;
  complete: boolean;
};

const initialChecklist: ChecklistItem[] = [
  { id: "company-info", label: "Company information collected", complete: false },
  { id: "main-contact", label: "Main point of contact confirmed", complete: false },
  { id: "crm-access", label: "CRM / current system access received", complete: false },
  { id: "domain-access", label: "Domain login received", complete: false },
  { id: "hosting-access", label: "Website / hosting access received", complete: false },
  { id: "email-access", label: "Email / Google Workspace access received", complete: false },
  { id: "calendar-access", label: "Calendar access received", complete: false },
  { id: "payment-access", label: "Stripe / payment access received", complete: false },
  { id: "sms-access", label: "Twilio / SMS access received", complete: false },
  { id: "api-keys", label: "API keys collected", complete: false },
  { id: "vendor-list", label: "Vendor list collected", complete: false },
  { id: "team-list", label: "Team user list collected", complete: false },
  { id: "workflow", label: "Workflow / pipeline stages documented", complete: false },
  { id: "data-export", label: "Lead/client/project export received", complete: false },
];

export default function OnboardingPage() {
  const [clientName, setClientName] = useState("");
  const [projectType, setProjectType] = useState("SalesOS White Label CRM");
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState(initialChecklist);

  useEffect(() => {
    const saved = localStorage.getItem("salesos_onboarding");

    if (saved) {
      const parsed = JSON.parse(saved);

      setClientName(parsed.clientName || "");
      setProjectType(parsed.projectType || "");
      setNotes(parsed.notes || "");
      setChecklist(parsed.checklist || initialChecklist);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "salesos_onboarding",
      JSON.stringify({
        clientName,
        projectType,
        notes,
        checklist,
      })
    );
  }, [clientName, projectType, notes, checklist]);

  const completed = checklist.filter((item) => item.complete).length;

  const readiness = Math.round(
    (completed / checklist.length) * 100
  );

  const status = useMemo(() => {
    if (readiness >= 90) return "Ready for Build";
    if (readiness >= 60) return "Almost Ready";
    return "Missing Critical Info";
  }, [readiness]);

  function toggleItem(id: string) {
    setChecklist(
      checklist.map((item) =>
        item.id === id
          ? {
              ...item,
              complete: !item.complete,
            }
          : item
      )
    );
  }

  function exportPDF() {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(22);
    doc.text("SALESOS BUILD HANDOFF", 14, y);

    y += 14;

    doc.setFontSize(12);

    doc.text(`Client: ${clientName}`, 14, y);
    y += 8;

    doc.text(`Project Type: ${projectType}`, 14, y);
    y += 8;

    doc.text(`Readiness Score: ${readiness}%`, 14, y);
    y += 8;

    doc.text(`Status: ${status}`, 14, y);

    y += 14;

    doc.setFontSize(16);
    doc.text("Implementation Notes", 14, y);

    y += 10;

    doc.setFontSize(11);

    const splitNotes = doc.splitTextToSize(
      notes || "No notes provided.",
      180
    );

    doc.text(splitNotes, 14, y);

    y += splitNotes.length * 7 + 10;

    doc.setFontSize(16);
    doc.text("Checklist", 14, y);

    y += 10;

    doc.setFontSize(11);

    checklist.forEach((item) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.text(
        `${item.complete ? "✓" : "•"} ${item.label}`,
        16,
        y
      );

      y += 8;
    });

    doc.save(
      `${clientName || "salesos"}-build-handoff.pdf`
    );
  }

  return (
    <div className="min-h-screen text-white">

      <div className="mb-10">

        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5">
          <ClipboardCheck size={14} />
          SALESOS ONBOARDING SYSTEM
        </div>

        <h1 className="text-4xl font-semibold tracking-tight">
          Client Onboarding
        </h1>

        <p className="text-zinc-500 mt-2 max-w-3xl">
          Prevent missing APIs, vendor access, workflow issues,
          and failed delivery timelines before implementation begins.
        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 space-y-6">

          <div className="glass-card p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-semibold">
                Project Details
              </h2>

              <button
                onClick={exportPDF}
                className="bg-white text-black rounded-xl px-5 py-3 font-semibold flex items-center gap-2"
              >
                <Download size={18} />
                Export Handoff PDF
              </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                className="soft-input"
                placeholder="Client / Company Name"
                value={clientName}
                onChange={(e) =>
                  setClientName(e.target.value)
                }
              />

              <select
                className="soft-input"
                value={projectType}
                onChange={(e) =>
                  setProjectType(e.target.value)
                }
              >
                <option>SalesOS White Label CRM</option>
                <option>LegacyOS Real Estate CRM</option>
                <option>ConstructionOS CRM</option>
                <option>Custom CRM Buildout</option>
              </select>

            </div>

            <textarea
              className="soft-input min-h-[140px] mt-4"
              placeholder="Important implementation notes, blockers, client expectations, vendor notes, deployment concerns..."
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
            />

          </div>

          <div className="glass-card p-6">

            <h2 className="text-2xl font-semibold">
              Build Readiness Checklist
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

              {checklist.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`text-left border rounded-2xl p-4 transition ${
                    item.complete
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-white/10 bg-black/30 hover:bg-black/50"
                  }`}
                >
                  <div className="flex items-start gap-3">

                    {item.complete ? (
                      <CheckCircle2
                        size={18}
                        className="text-emerald-400 mt-0.5"
                      />
                    ) : (
                      <AlertTriangle
                        size={18}
                        className="text-yellow-400 mt-0.5"
                      />
                    )}

                    <p className="text-sm text-zinc-200">
                      {item.label}
                    </p>

                  </div>
                </button>
              ))}

            </div>

          </div>

        </div>

        <div className="space-y-6">

          <div className="glass-card p-6">

            <h2 className="text-2xl font-semibold">
              Readiness Score
            </h2>

            <div className="mt-6">

              <p className="text-6xl font-semibold">
                {readiness}%
              </p>

              <p
                className={`mt-3 text-sm font-semibold ${
                  readiness >= 90
                    ? "text-emerald-400"
                    : readiness >= 60
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {status}
              </p>

              <div className="mt-5 h-3 rounded-full bg-zinc-900 overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${readiness}%`,
                  }}
                />
              </div>

            </div>

          </div>

          <div className="glass-card p-6">

            <h2 className="text-2xl font-semibold">
              ALMA Onboarding Analysis
            </h2>

            <div className="mt-5 border border-white/10 rounded-2xl p-5 bg-black/30 text-sm text-zinc-300 leading-relaxed">

              {readiness < 60 && (
                <p>
                  Project is not ready. Missing APIs,
                  vendor access, workflows, or operational requirements.
                </p>
              )}

              {readiness >= 60 && readiness < 90 && (
                <p>
                  Project is close to implementation readiness,
                  but final access/data requirements are still missing.
                </p>
              )}

              {readiness >= 90 && (
                <p>
                  Project is fully prepared for implementation.
                  Safe to begin development and deployment.
                </p>
              )}

            </div>

          </div>

          <div className="glass-card p-6">

            <h2 className="text-2xl font-semibold">
              Handoff Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">

              <p className="text-zinc-400">
                Client:
                <span className="text-white ml-2">
                  {clientName || "Not set"}
                </span>
              </p>

              <p className="text-zinc-400">
                Project:
                <span className="text-white ml-2">
                  {projectType}
                </span>
              </p>

              <p className="text-zinc-400">
                Completed:
                <span className="text-white ml-2">
                  {completed}/{checklist.length}
                </span>
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}