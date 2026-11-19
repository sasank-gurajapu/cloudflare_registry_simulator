import React from 'react';
import { useSimulator } from './context/SimulatorContext';
import { HeaderNavigation } from './components/common/HeaderNavigation';
import { CloudflareDashboard } from './components/merchant/CloudflareDashboard';
import { ChatGPTInterface } from './components/shopper/ChatGPTInterface';

export const AppContent: React.FC = () => {
  const { activeTab } = useSimulator();

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 select-none">
      {/* Top Simulator Control Bar */}
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
      </main>
    </div>
  );
};

export default function App() {
  return <AppContent />;
}
