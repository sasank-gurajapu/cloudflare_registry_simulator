import React, { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Globe, 
  Bot, 
  Store, 
  ShoppingBag, 
  CheckCircle2, 
  XCircle, 
  Play, 
  ArrowRight, 
  Sparkles,
  Layers,
  Radio,
  FileCode,
  Zap,
  Check
} from 'lucide-react';

export const RegistryDataFlowView: React.FC = () => {
  const { isOptedIn, toggleOptIn, setActiveTab, sendChatMessage } = useSimulator();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulateFlow = () => {
    setIsSimulating(true);
    setActiveStep(1);

    setTimeout(() => setActiveStep(2), 700);
    setTimeout(() => setActiveStep(3), 1500);
    setTimeout(() => {
      setActiveStep(4);
      setIsSimulating(false);
    }, 2400);
  };

  const handleGoToChat = () => {
    setActiveTab('shopper');
    sendChatMessage("Women's bag under $200");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 font-sans p-8 lg:p-10 space-y-8 select-none">
      {/* Title & Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-cf-orange uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Architecture & Data Flow Simulation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            UCP Registry Data Flow
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Visualizing how AI shopping agents query the neutral Cloudflare Registry to show SMB products alongside mass retail feeds.
          </p>
        </div>

        {/* Live Canvas Interactive Controls */}
        <div className="flex items-center space-x-3 self-start md:self-auto">
          {/* ParDa Opt-In Toggle */}
          <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
            <span className="text-xs text-slate-300 font-medium">ParDa Opt-In:</span>
            <button
              type="button"
              role="switch"
              aria-checked={isOptedIn}
              onClick={() => toggleOptIn()}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isOptedIn ? 'bg-cf-orange' : 'bg-slate-700'
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isOptedIn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${isOptedIn ? 'text-emerald-400' : 'text-slate-400'}`}>
              {isOptedIn ? 'Active (UCP)' : 'Off'}
            </span>
          </div>

          {/* Trigger Step Animation Button */}
          <button
            onClick={handleSimulateFlow}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-xs shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? 'Tracing Query Flow...' : 'Simulate Query Flow'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Flow Canvas */}
      <div className="relative bg-slate-900/90 border border-slate-800 rounded-3xl p-6 lg:p-10 shadow-2xl overflow-hidden">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

        {/* 5 Key Connected Nodes */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* NODE 1: Customer Input (Left, 3 cols) */}
          <div className={`lg:col-span-3 p-5 rounded-2xl border transition-all duration-300 ${
            activeStep === 1 
              ? 'bg-slate-800/90 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Step 1: Shopper Query</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-200 font-mono">
              "Women's bag under $200"
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Submitted in the customer chat tab by shopper.
            </p>
          </div>

          {/* NODE 2: AI Agent (ChatGPT) (Center-Left, 3 cols) */}
          <div className={`lg:col-span-3 p-5 rounded-2xl border transition-all duration-300 ${
            activeStep === 2 
              ? 'bg-slate-800/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg shadow-emerald-500/10' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <Bot className="w-4 h-4" />
              <span>Step 2: AI Agent (ChatGPT)</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              Splits discovery query across two distinct channels:
            </div>
            <div className="mt-2 space-y-1.5 text-[11px] font-mono">
              <div className="flex items-center space-x-1.5 text-cf-orange">
                <ArrowRight className="w-3 h-3" />
                <span>1. Cloudflare Open Registry</span>
              </div>
              <div className="flex items-center space-x-1.5 text-blue-400">
                <ArrowRight className="w-3 h-3" />
                <span>2. Direct Retail (Walmart)</span>
              </div>
            </div>
          </div>

          {/* NODE 3: CLOUDFLARE REGISTRY (THE HERO CENTER, 3 cols) */}
          <div className={`lg:col-span-3 p-6 rounded-2xl border-2 transition-all duration-300 relative ${
            isOptedIn
              ? 'bg-gradient-to-b from-orange-950/40 via-slate-900 to-slate-950 border-cf-orange ring-4 ring-orange-500/20 shadow-2xl'
              : 'bg-slate-950 border-slate-700 opacity-80'
          }`}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cf-orange text-white text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow">
              Core Neutral Index
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-cf-orange uppercase tracking-wider mb-2 mt-1">
              <span className="flex items-center space-x-1.5">
                <Globe className="w-4 h-4" />
                <span>Cloudflare Registry</span>
              </span>
              <span className={`w-2.5 h-2.5 rounded-full ${isOptedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
            </div>

            <div className="text-xs text-slate-300 font-medium">
              registry.cloudflare.com/v1/search
            </div>

            <div className={`mt-3 p-3 rounded-xl border text-[11px] font-mono ${
              isOptedIn 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}>
              {isOptedIn ? (
                <>
                  <div className="font-bold text-emerald-400">✓ ParDa UCP Snapshot: FOUND</div>
                  <div>• Price: $185 USD</div>
                  <div>• URL: parda.com/.well-known/ucp.json</div>
                </>
              ) : (
                <>
                  <div className="font-bold text-amber-500">⚠ ParDa: NOT OPTED IN</div>
                  <div>• No UCP snapshot indexed</div>
                </>
              )}
            </div>
          </div>

          {/* NODE 4: Final Output Result (Right, 3 cols) */}
          <div className={`lg:col-span-3 p-5 rounded-2xl border transition-all duration-300 ${
            activeStep === 4 
              ? 'bg-slate-800/90 border-purple-500 ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/10' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Step 4: Customer Response</span>
            </div>
            
            <div className="space-y-2 text-xs">
              {isOptedIn ? (
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Dual Discovery Result:</div>
                  <div className="font-bold text-white flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cf-orange"></span>
                    <span>1. ParDa Italian Tote ($185)</span>
                  </div>
                  <div className="text-slate-300 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>2. Walmart Time and Tru ($22.98)</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Big Brand Only:</div>
                  <div className="text-slate-300 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>1. Walmart Time and Tru ($22.98)</span>
                  </div>
                  <div className="text-slate-300 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                    <span>2. Target Commuter Tote ($28.00)</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleGoToChat}
              className="w-full mt-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <span>View in Customer Chat Tab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FEED SOURCES ROW (Bottom row connecting to the nodes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-800/80">
          {/* Feed A: ParDa SMB Opt-In Source */}
          <div className={`p-5 rounded-2xl border transition-all ${
            isOptedIn 
              ? 'bg-orange-950/20 border-orange-500/40' 
              : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-cf-orange">
                <Store className="w-4 h-4" />
                <span>ParDa SMB Storefront (parda.com)</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                isOptedIn ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {isOptedIn ? 'Opted In (Merchant Tab)' : 'Not Opted In'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              When opted in via the Merchant tab, Cloudflare Workers automatically translate ParDa's HTML catalog into Universal Commerce Protocol (UCP) format and publishes it to the registry.
            </p>
          </div>

          {/* Feed B: Walmart Direct Connect Feed */}
          <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-400">
                <Layers className="w-4 h-4" />
                <span>Walmart & Major Retail Direct Connect</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-900/60 text-blue-300">
                Always Scraped
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Large retail conglomerate feeds always exist in web scrapers. Without the Cloudflare registry, AI agents only see these results.
            </p>
          </div>
        </div>
      </div>

      {/* Narrative Summary Callout */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-cf-orange" />
            <span>How Cloudflare Solves Independent Merchant Discovery:</span>
          </div>
          <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
            By sitting between the SMB storefront and AI shopping agents, Cloudflare’s neutral registry lets independent merchants compete on equal footing with big-box retailers.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('merchant')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer self-start md:self-auto"
        >
          Configure Opt-In in Merchant Tab
        </button>
      </div>
    </div>
  );
};
