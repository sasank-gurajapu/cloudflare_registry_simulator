import React from 'react';
import { useSimulator } from './context/SimulatorContext';
import { HeaderNavigation } from './components/common/HeaderNavigation';
import { CloudflareDashboard } from './components/merchant/CloudflareDashboard';
import { ChatGPTInterface } from './components/shopper/ChatGPTInterface';
import { RegistryInspectorModal } from './components/registry/RegistryInspectorModal';

export const AppContent: React.FC = () => {
  const { activeTab, lastSimulatedEvent } = useSimulator();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 select-none">
      {/* Top Simulator Control Bar with View Toggle */}
      <HeaderNavigation />

      {/* Main Full-Screen Workspace */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'merchant' && (
          <div className="flex-1 h-full w-full overflow-hidden">
            <CloudflareDashboard />
          </div>
        )}

        {activeTab === 'shopper' && (
          <div className="flex-1 h-full w-full overflow-hidden">
            <ChatGPTInterface />
          </div>
        )}

        {activeTab === 'registry' && (
          <div className="flex-1 h-full w-full overflow-hidden">
            <RegistryInspectorModal />
          </div>
        )}

        {/* Global Toast Notification for Simulator Events */}
        {lastSimulatedEvent && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/95 border border-orange-500/60 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center space-x-2.5 z-50 animate-bounce">
            <span className="w-2.5 h-2.5 rounded-full bg-cf-orange animate-ping"></span>
            <span>{lastSimulatedEvent}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
