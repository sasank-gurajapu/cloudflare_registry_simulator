import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Store, 
  Bot, 
  Globe, 
  RotateCcw, 
  Play, 
  CheckCircle2, 
  ShieldAlert,
  ArrowRightLeft
} from 'lucide-react';

export const HeaderNavigation: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    isOptedIn, 
    toggleOptIn, 
    resetDemo, 
    sendChatMessage, 
    isChatLoading 
  } = useSimulator();

  const handleRunDemoQuery = () => {
    setActiveTab('shopper');
    if (isChatLoading) return;
    sendChatMessage("Women's bag under $200");
  };

  return (
    <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6 text-sm font-sans select-none z-30 shadow-md">
      {/* Brand & Concept */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2.5">
          {/* Cloudflare Orange Cloud Mini */}
          <div className="w-6 h-6 text-cf-orange">
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">
              Cloudflare Registry Simulator
            </span>
            <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-mono">
              UCP Protocol
            </span>
          </div>
        </div>
      </div>

      {/* Main View Switcher (Full Screen Views) */}
      <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 shadow-inner">
        <button
          onClick={() => setActiveTab('merchant')}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${
            activeTab === 'merchant'
              ? 'bg-orange-500 text-white font-semibold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Merchant (Cloudflare)</span>
        </button>

        <button
          onClick={() => setActiveTab('shopper')}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${
            activeTab === 'shopper'
              ? 'bg-emerald-600 text-white font-semibold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Shopper (ChatGPT)</span>
        </button>

        <button
          onClick={() => setActiveTab('registry')}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition ${
            activeTab === 'registry'
              ? 'bg-blue-600 text-white font-semibold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Registry & UCP Inspector</span>
        </button>
      </div>

      {/* Interactive Controls & Scenario Triggers */}
      <div className="flex items-center space-x-3">
        {/* ParDa Opt-in quick toggle */}
        <div className="flex items-center space-x-2.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
          <span className="text-slate-400 text-xs font-medium">ParDa Registry:</span>
          
          <button
            type="button"
            role="switch"
            aria-checked={isOptedIn}
            onClick={() => toggleOptIn()}
            className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isOptedIn ? 'bg-cf-orange' : 'bg-slate-700'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isOptedIn ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>

          <button
            onClick={() => toggleOptIn()}
            className={`flex items-center space-x-1.5 text-xs font-semibold px-2 py-0.5 rounded transition cursor-pointer ${
              isOptedIn
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900/60'
                : 'bg-amber-950 text-amber-400 border border-amber-800 hover:bg-amber-900/60'
            }`}
          >
            {isOptedIn ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Opted In</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span>Not Opted In</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Demo Trigger: "Women's bag under $200" */}
        <button
          onClick={handleRunDemoQuery}
          disabled={isChatLoading}
          className="flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg font-medium text-xs shadow-sm transition disabled:opacity-50 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Test Prompt: "Women's bag under $200"</span>
        </button>

        {/* Reset Demo */}
        <button
          onClick={resetDemo}
          title="Reset Simulator"
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
