import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { CloudflareNavbar } from './CloudflareNavbar';
import { CloudflareSidebar } from './CloudflareSidebar';
import { CloudflareOverview } from './CloudflareOverview';
import { CloudflareAgentReadiness } from './CloudflareAgentReadiness';
import { CloudflareRightPanel } from './CloudflareRightPanel';

export const CloudflareDashboard: React.FC = () => {
  const { merchantSection } = useSimulator();

  return (
    <div className="flex flex-col h-full bg-white text-gray-900 overflow-hidden font-sans border-r border-gray-300">
      {/* Cloudflare Top Header */}
      <CloudflareNavbar />

      {/* Main App Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <CloudflareSidebar />

        {/* Center Content: Overview or Agent Readiness */}
        <div className="flex-1 flex overflow-hidden">
          {merchantSection === 'overview' ? (
            <CloudflareOverview />
          ) : (
            <CloudflareAgentReadiness />
          )}

          {/* Right Info Sidebar (as shown in reference image 1) */}
          <CloudflareRightPanel />
        </div>
      </div>
    </div>
  );
};
