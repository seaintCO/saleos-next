"use client";

import ProtectedRoute from "@/components/layout/ProtectedRoute";

import HeroSection from "@/components/dashboard/HeroSection";
import KpiGrid from "@/components/dashboard/KpiGrid";
import RealtimeFeedSection from "@/components/dashboard/RealtimeFeedSection";
import TeamIntelligence from "@/components/dashboard/TeamIntelligence";
import InfrastructureStatus from "@/components/dashboard/InfrastructureStatus";

import RevenueChart from "@/components/charts/RevenueChart";
import AiInsights from "@/components/alma/AiInsights";

import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {

  const metrics = useDashboardMetrics();

  const { user } = useAuth();

  return (
    <ProtectedRoute>

      <div className="min-h-screen text-zinc-100 relative overflow-hidden">

        <div className="absolute top-[-240px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />

        <div className="relative z-10">

          <HeroSection
            email={user?.email}
          />

          <KpiGrid
            metrics={metrics}
          />

          <RealtimeFeedSection />

          <div className="mt-8">
            <RevenueChart />
          </div>

          <div className="mt-8">
            <AiInsights />
          </div>

          <div className="mt-8">
            <TeamIntelligence />
          </div>

          <InfrastructureStatus />

        </div>

      </div>

    </ProtectedRoute>
  );
}