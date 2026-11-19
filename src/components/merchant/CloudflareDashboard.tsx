import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { CloudflareNavbar } from './CloudflareNavbar';
import { CloudflareSidebar } from './CloudflareSidebar';
import { CloudflareOverview } from './CloudflareOverview';
import { CloudflareAgentReadiness } from './CloudflareAgentReadiness';

export const CloudflareDashboard: React.FC = () => {
  const { merchantSection } = useSimulator();

  return (
    <div className="flex flex-col h-full w-full bg-white text-gray-900 overflow-hidden font-sans">
      {/* Cloudflare Top Header */}
      <CloudflareNavbar />

      {/* Main App Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <CloudflareSidebar />

        {/* Center Content: Overview or Agent Readiness (Full Width now!) */}
        <div className="flex-1 flex overflow-hidden bg-white">
          {merchantSection === 'overview' ? (
            <CloudflareOverview />
          ) : (
            <CloudflareAgentReadiness />
          )}
        </div>
      </div>
    </div>
  );
};
