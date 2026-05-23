"use client";

import { useMemo, useState } from "react";
import {
  BrainCircuit,
  Sparkles,
  Check,
  Layers3,
  Building2,
  Hammer,
  BadgeDollarSign,
} from "lucide-react";

type CoreCRM = {
  id: string;
  title: string;
  description: string;
  price: number;
  monthly: number;
};

type AddOn = {
  id: string;
  title: string;
  description: string;
  price: number;
  monthly?: number;
};

const coreCrms: CoreCRM[] = [
  {
    id: "legacy",
    title: "LegacyOS Real Estate CRM",
    description:
      "Enterprise CRM buildout for investors, acquisitions teams, lead tracking, seller pipelines, AI follow-up, and operations management.",
    price: 18000,
    monthly: 1500,
  },
  {
    id: "salesos",
    title: "SalesOS White Label CRM",
    description:
      "White-label sales operating system for agencies, closers, operators, dashboards, reporting, automation, and AI sales workflows.",
    price: 25000,
    monthly: 2500,
  },
  {
    id: "construction",
    title: "ConstructionOS CRM",
    description:
      "Construction operations buildout for bids, estimates, project tracking, crews, suppliers, AI dispatching, and reporting.",
    price: 35000,
    monthly: 3500,
  },
];

const addOns: AddOn[] = [
  {
    id: "alma-agent",
    title: "ALMA AI Voice Agent",
    description:
      "AI receptionist, follow-up, qualification, and client handling system.",
    price: 4000,
    monthly: 297,
  },
  {
    id: "lead-system",
    title: "Lead Automation System",
    description:
      "Lead capture, routing, tagging, automated follow-up, and nurture system.",
    price: 2500,
    monthly: 197,
  },
  {
    id: "dashboard",
    title: "Executive Analytics Dashboard",
    description:
      "Enterprise analytics, forecasting, KPI monitoring, and AI insights.",
    price: 5000,
  },
  {
    id: "ai-followup",
    title: "AI Follow-Up Engine",
    description:
      "Automated SMS, email, and sales pipeline reactivation system.",
    price: 3000,
    monthly: 197,
  },
  {
    id: "media-system",
    title: "Media & Content System",
    description:
      "Ad creatives, social media system, content pipeline, and marketing assets.",
    price: 4500,
  },
  {
    id: "seo",
    title: "SEO + Google Presence",
    description:
      "SEO optimization, Google Business setup, authority pages, and rankings.",
    price: 3500,
    monthly: 297,
  },
  {
    id: "booking",
    title: "Booking & Calendar Automation",
    description:
      "Integrated calendar booking, reminders, confirmations, and scheduling.",
    price: 2000,
  },
  {
    id: "payments",
    title: "Stripe + Payments Infrastructure",
    description:
      "Subscriptions, invoices, automation, and embedded payment flows.",
    price: 2500,
  },
];

export default function PricingOffersPage() {
  const [selectedCore, setSelectedCore] = useState<CoreCRM | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [intake, setIntake] = useState("");
  const [analysis, setAnalysis] = useState("");

  function toggleAddon(id: string) {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((x) => x !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  }

  const selectedAddOnObjects = addOns.filter((x) =>
    selectedAddOns.includes(x.id)
  );

  const totals = useMemo(() => {
    const corePrice = selectedCore?.price || 0;
    const coreMonthly = selectedCore?.monthly || 0;

    const addonPrice = selectedAddOnObjects.reduce(
      (acc, item) => acc + item.price,
      0
    );

    const addonMonthly = selectedAddOnObjects.reduce(
      (acc, item) => acc + (item.monthly || 0),
      0
    );

    return {
      setup: corePrice + addonPrice,
      monthly: coreMonthly + addonMonthly,
    };
  }, [selectedCore, selectedAddOnObjects]);

  function generateAnalysis() {
    if (!selectedCore) {
      setAnalysis(
        "Select a core CRM system before generating ALMA analysis."
      );
      return;
    }

    setAnalysis(`
ALMA STRATEGIC ANALYSIS

Recommended Core System:
${selectedCore.title}

Estimated Build Investment:
$${totals.setup.toLocaleString()}

Monthly Retainer:
$${totals.monthly.toLocaleString()}/mo

Implementation Positioning:
This client should be positioned around operational scalability, AI automation, lead management, follow-up infrastructure, and backend operational visibility.

Suggested Sales Angle:
Focus on operational inefficiencies, lack of automation, missed follow-up, fragmented systems, and inability to scale manually.

Recommended Close Strategy:
Position this as long-term infrastructure rather than a one-time website or software purchase.

Recommended Add-Ons:
${selectedAddOnObjects.length > 0
  ? selectedAddOnObjects.map((x) => `• ${x.title}`).join("\n")
  : "• No add-ons selected"}

ALMA Risk Analysis:
${
  intake.toLowerCase().includes("manual")
    ? "Client appears highly manual. Strong automation opportunity detected."
    : "No major operational risk detected from intake."
}

Deployment Priority:
HIGH PRIORITY IMPLEMENTATION
    `);
  }

  return (
    <div className="min-h-screen text-white">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 border border-zinc-800 bg-zinc-950/70 rounded-full px-4 py-2 text-xs text-zinc-400 mb-5">
          <BadgeDollarSign size={14} />
          SALESOS ENTERPRISE OFFER SYSTEM
        </div>

        <h1 className="text-5xl font-semibold tracking-tight">
          High-Ticket CRM Offer Builder
        </h1>

        <p className="text-zinc-500 mt-3 max-w-4xl text-lg">
          Start with the core CRM infrastructure, then stack AI,
          automation, analytics, media, and operational add-ons
          around the main system.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-8">
          <div className="glass-card p-7">
            <h2 className="text-3xl font-semibold mb-3">
              Client Intake
            </h2>

            <p className="text-zinc-500 mb-5">
              Write what the rep knows: niche, pain points,
              current system, urgency, revenue goals, team size,
              and operational problems.
            </p>

            <textarea
              value={intake}
              onChange={(e) => setIntake(e.target.value)}
              className="soft-input min-h-[180px]"
              placeholder="Example: Real estate acquisitions company struggling with lead follow-up, appointment tracking, AI automation, and operator accountability..."
            />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <Building2 className="text-blue-400" />
              <h2 className="text-4xl font-semibold">
                Core CRM Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {coreCrms.map((crm) => {
                const active = selectedCore?.id === crm.id;

                return (
                  <button
                    key={crm.id}
                    onClick={() => setSelectedCore(crm)}
                    className={`text-left glass-card p-7 transition border ${
                      active
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10"
                    }`}
                  >
                    <p className="text-xs tracking-[0.2em] uppercase text-blue-400 mb-4">
                      Core CRM
                    </p>

                    <h3 className="text-3xl font-semibold leading-tight">
                      {crm.title}
                    </h3>

                    <p className="text-zinc-400 mt-5 leading-relaxed">
                      {crm.description}
                    </p>

                    <div className="mt-8">
                      <p className="text-4xl font-semibold">
                        ${crm.price.toLocaleString()}
                      </p>

                      <p className="text-zinc-500 mt-2">
                        Retainer: $
                        {crm.monthly.toLocaleString()}/mo
                      </p>
                    </div>

                    {active && (
                      <div className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-400">
                        <Check size={16} />
                        Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-5">
              <Layers3 className="text-purple-400" />
              <h2 className="text-4xl font-semibold">
                Add-On Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {addOns.map((addon) => {
                const active = selectedAddOns.includes(addon.id);

                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`text-left glass-card p-6 transition border ${
                      active
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {addon.title}
                        </h3>

                        <p className="text-zinc-400 mt-3 leading-relaxed">
                          {addon.description}
                        </p>
                      </div>

                      {active && (
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shrink-0">
                          <Check size={16} />
                        </div>
                      )}
                    </div>

                    <div className="mt-6">
                      <p className="text-3xl font-semibold">
                        ${addon.price.toLocaleString()}
                      </p>

                      {addon.monthly && (
                        <p className="text-zinc-500 mt-2">
                          ${addon.monthly}/mo support
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 sticky top-6">
            <h2 className="text-3xl font-semibold">
              Selected Estimate
            </h2>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Core System
              </p>

              <p className="mt-2 text-xl font-semibold">
                {selectedCore?.title || "No core CRM selected"}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Add-Ons
              </p>

              <div className="mt-3 space-y-2">
                {selectedAddOnObjects.length > 0 ? (
                  selectedAddOnObjects.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span>{item.title}</span>
                      <span>${item.price.toLocaleString()}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 text-sm">
                    No add-ons selected.
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 my-8" />

            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">
                  Total Build
                </span>

                <span className="text-3xl font-semibold">
                  ${totals.setup.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-zinc-400">
                  Monthly Retainer
                </span>

                <span className="text-xl font-semibold">
                  ${totals.monthly.toLocaleString()}/mo
                </span>
              </div>
            </div>

            <button
              onClick={generateAnalysis}
              className="mt-8 w-full bg-white text-black rounded-2xl py-4 font-semibold text-lg"
            >
              Generate ALMA Analysis
            </button>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-5">
              <BrainCircuit className="text-purple-400" />

              <h2 className="text-3xl font-semibold">
                ALMA Rep Analysis
              </h2>
            </div>

            <div className="border border-white/10 rounded-2xl bg-black/40 p-5 min-h-[420px] whitespace-pre-wrap leading-relaxed text-zinc-300 text-sm">
              {analysis || `
ALMA is ready.

Select a core CRM, stack add-ons,
write intake notes, then generate
an enterprise-level recommendation.
              `}
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Hammer className="text-orange-400" />

              <h2 className="text-2xl font-semibold">
                Rep Guidance
              </h2>
            </div>

            <div className="space-y-4 text-sm text-zinc-400 leading-relaxed">
              <p>
                1. Sell the infrastructure first.
              </p>

              <p>
                2. Position add-ons as operational leverage.
              </p>

              <p>
                3. Never discount the core CRM.
              </p>

              <p>
                4. Use ALMA analysis before sending proposal.
              </p>

              <p>
                5. Move signed clients into onboarding immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}