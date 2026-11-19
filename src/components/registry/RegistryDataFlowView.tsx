import React, { useState, useEffect } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import {
  Globe,
  Bot,
  Store,
  ShoppingBag,
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';

type FlowStep = 0 | 1 | 2 | 3 | 4;

export const RegistryDataFlowView: React.FC = () => {
  const { isOptedIn, toggleOptIn, setActiveTab, sendChatMessage } = useSimulator();
  const [activeStep, setActiveStep] = useState<FlowStep>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);

  // Animated dots traveling along each connector
  const [dot1Active, setDot1Active] = useState(false);
  const [dot2Active, setDot2Active] = useState(false);
  const [dot3Active, setDot3Active] = useState(false);
  const [dot4Active, setDot4Active] = useState(false);

  const handleSimulateFlow = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setHasSimulated(false);
    setActiveStep(0);
    setDot1Active(false);
    setDot2Active(false);
    setDot3Active(false);
    setDot4Active(false);

    setTimeout(() => { setActiveStep(1); }, 200);
    setTimeout(() => { setDot1Active(true); }, 500);
    setTimeout(() => { setActiveStep(2); setDot1Active(false); }, 1100);
    setTimeout(() => { setDot2Active(true); }, 1300);
    setTimeout(() => { setActiveStep(3); setDot2Active(false); }, 2000);
    setTimeout(() => { setDot3Active(true); }, 2200);
    setTimeout(() => { setDot4Active(true); }, 2600);
    setTimeout(() => {
      setActiveStep(4);
      setDot3Active(false);
      setDot4Active(false);
      setIsSimulating(false);
      setHasSimulated(true);
    }, 3200);
  };

  const handleGoToChat = () => {
    setActiveTab('shopper');
    sendChatMessage("Women's bag under $200");
  };

  const stepActive = (s: number) => activeStep >= s;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 font-sans select-none">
      {/* Page Header */}
      <div className="px-8 lg:px-12 pt-8 pb-6 border-b border-slate-800/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] font-mono font-bold text-cf-orange uppercase tracking-widest mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Architecture · Data Flow</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            UCP Registry Flow
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            How AI agents discover independent merchants through the Cloudflare Open Registry.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          {/* Opt-In Toggle */}
          <div className="flex items-center space-x-2.5 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl">
            <span className="text-xs text-slate-300 font-medium">ParDa Opt-In</span>
            <button
              type="button"
              role="switch"
              aria-checked={isOptedIn}
              onClick={() => toggleOptIn()}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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
            <span className={`text-xs font-bold ${isOptedIn ? 'text-emerald-400' : 'text-slate-500'}`}>
              {isOptedIn ? 'Active' : 'Off'}
            </span>
          </div>

          {/* Simulate Button */}
          <button
            onClick={handleSimulateFlow}
            disabled={isSimulating}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-bold text-xs shadow-md transition disabled:opacity-60 cursor-pointer"
          >
            {isSimulating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>{isSimulating ? 'Running…' : 'Simulate Query Flow'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="px-8 lg:px-12 py-8 space-y-6">

        {/* ── FLOW DIAGRAM ── */}
        <div className="relative bg-slate-900/70 border border-slate-800 rounded-3xl p-8 lg:p-10 overflow-hidden shadow-2xl">
          {/* Dot-grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none rounded-3xl" />

          {/* Top label row */}
          <div className="relative z-10 grid grid-cols-4 gap-4 mb-3 text-center">
            {['Shopper', 'AI Agent', 'Cloudflare Registry', 'Result'].map((label, i) => (
              <div key={i} className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                stepActive(i + 1) ? 'text-white' : 'text-slate-600'
              }`}>{label}</div>
            ))}
          </div>

          {/* Main 4-node row */}
          <div className="relative z-10 grid grid-cols-4 gap-0 items-center">

            {/* NODE 1: Shopper */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${stepActive(1) ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${
                stepActive(1)
                  ? 'bg-blue-600 border-blue-400 shadow-blue-500/30'
                  : 'bg-slate-900 border-slate-700'
              }`}>
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div className="mt-3 text-center space-y-1">
                <div className="text-sm font-bold text-white">Shopper Query</div>
                <div className="text-xs text-slate-400 font-mono bg-slate-800/80 px-2 py-1 rounded-lg border border-slate-700 leading-tight">
                  "Women's bag<br/>under $200"
                </div>
              </div>
            </div>

            {/* CONNECTOR 1→2 */}
            <ConnectorArrow active={dot1Active} stepDone={stepActive(2)} />

            {/* NODE 2: AI Agent */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${stepActive(2) ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${
                stepActive(2)
                  ? 'bg-emerald-600 border-emerald-400 shadow-emerald-500/30'
                  : 'bg-slate-900 border-slate-700'
              }`}>
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div className="mt-3 text-center space-y-1">
                <div className="text-sm font-bold text-white">AI Agent</div>
                <div className="text-xs text-slate-400 text-center leading-relaxed">
                  Fans query to<br/>two channels
                </div>
              </div>
            </div>

            {/* CONNECTOR 2→3 */}
            <ConnectorArrow active={dot2Active} stepDone={stepActive(3)} />

            {/* NODE 3: Cloudflare Registry (HERO) */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${stepActive(3) ? 'opacity-100' : 'opacity-40'}`}>
              {/* "Core Registry" pill */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cf-orange text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow whitespace-nowrap">
                Open Registry
              </div>

              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-xl ${
                isOptedIn && stepActive(3)
                  ? 'bg-gradient-to-br from-orange-600 to-amber-500 border-cf-orange shadow-orange-500/40 ring-4 ring-orange-500/20'
                  : stepActive(3)
                  ? 'bg-slate-800 border-slate-600 shadow-slate-500/10'
                  : 'bg-slate-900 border-slate-700'
              }`}>
                <Globe className="w-9 h-9 text-white" />
              </div>

              <div className="mt-3 text-center space-y-1.5">
                <div className="text-sm font-bold text-white">Cloudflare Registry</div>
                <div className={`text-[11px] font-mono px-2 py-1 rounded-lg border leading-tight transition-colors ${
                  isOptedIn
                    ? 'text-emerald-300 bg-emerald-950/40 border-emerald-500/40'
                    : 'text-slate-500 bg-slate-900 border-slate-800'
                }`}>
                  {isOptedIn ? '✓ ParDa: indexed' : '⚠ ParDa: not indexed'}
                </div>
              </div>

              {/* Pulsing ring when active */}
              {isOptedIn && stepActive(3) && (
                <div className="absolute inset-0 rounded-2xl animate-ping border-2 border-cf-orange opacity-20 pointer-events-none" style={{ top: '0px', width: '80px', height: '80px' }} />
              )}
            </div>

            {/* CONNECTOR 3→4 (two lines: one for Retail feed, one for Registry) */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Top wire: Retail (always present) */}
              <div className="relative w-full flex items-center mb-2">
                <div className={`h-0.5 flex-1 transition-colors duration-500 ${stepActive(4) ? 'bg-blue-500' : 'bg-slate-700'}`} />
                {dot3Active && <TravelingDot color="bg-blue-400" />}
              </div>
              {/* Bottom wire: Registry (opt-in gated) */}
              <div className="relative w-full flex items-center mt-2">
                <div className={`h-0.5 flex-1 transition-colors duration-500 ${isOptedIn && stepActive(4) ? 'bg-cf-orange' : 'bg-slate-800'}`} />
                {dot4Active && isOptedIn && <TravelingDot color="bg-orange-400" />}
              </div>
              <ArrowRight className={`w-4 h-4 absolute right-0 transition-colors duration-500 ${stepActive(4) ? 'text-slate-300' : 'text-slate-700'}`} />
            </div>

            {/* NODE 4: Result */}
            <div className={`relative flex flex-col items-center transition-all duration-500 ${stepActive(4) ? 'opacity-100' : 'opacity-40'}`}>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-lg ${
                stepActive(4)
                  ? isOptedIn
                    ? 'bg-purple-600 border-purple-400 shadow-purple-500/30'
                    : 'bg-slate-700 border-slate-600'
                  : 'bg-slate-900 border-slate-700'
              }`}>
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div className="mt-3 text-center space-y-2">
                <div className="text-sm font-bold text-white">Customer Result</div>
                {isOptedIn ? (
                  <div className="space-y-1 text-left">
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-cf-orange flex-shrink-0" />
                      <span className="text-white font-semibold">ParDa Tote ($185)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="text-slate-300">Walmart Tote ($22.98)</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-left">
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                      <span className="text-slate-300">Walmart Tote ($22.98)</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs">
                      <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-slate-300">Target Tote ($28.00)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Step progress bar */}
          <div className="relative z-10 mt-10 flex items-center space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                  stepActive(s) ? (s === 3 && isOptedIn ? 'bg-cf-orange' : 'bg-blue-500') : 'bg-slate-800'
                }`} />
              </React.Fragment>
            ))}
          </div>
          <div className="relative z-10 mt-2 flex items-center justify-between text-[10px] font-mono text-slate-600">
            <span>query submitted</span>
            <span>agent routing</span>
            <span>registry lookup</span>
            <span>response delivered</span>
          </div>
        </div>

        {/* ── TWO FEED SOURCES ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Feed A: ParDa */}
          <div className={`p-6 rounded-2xl border transition-all duration-500 ${
            isOptedIn
              ? 'bg-orange-950/20 border-orange-500/50 shadow-lg shadow-orange-500/5'
              : 'bg-slate-900/50 border-slate-800'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                  isOptedIn ? 'bg-orange-500/20 border-orange-500/40' : 'bg-slate-800 border-slate-700'
                }`}>
                  <Store className={`w-4.5 h-4.5 ${isOptedIn ? 'text-cf-orange' : 'text-slate-500'}`} />
                </div>
                <div>
                  <div className={`text-sm font-bold ${isOptedIn ? 'text-white' : 'text-slate-400'}`}>
                    ParDa (parda.com)
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">SMB Merchant</div>
                </div>
              </div>
              <div className={`flex items-center space-x-1.5 text-[11px] px-2.5 py-1 rounded-full font-bold ${
                isOptedIn
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {isOptedIn ? (
                  <><CheckCircle2 className="w-3 h-3" /><span>Opted In</span></>
                ) : (
                  <><XCircle className="w-3 h-3" /><span>Not opted in</span></>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isOptedIn
                ? 'Cloudflare Workers translate ParDa\'s catalog into UCP format and sync it to the neutral registry. AI agents can now surface ParDa products directly alongside major retailers.'
                : 'ParDa has not opted in. Cloudflare Workers have no UCP snapshot to publish, so AI agents receive no results for parda.com.'}
            </p>
            {isOptedIn && (
              <div className="mt-3 font-mono text-[11px] text-emerald-400 bg-emerald-950/30 px-3 py-2 rounded-lg border border-emerald-500/20">
                GET parda.com/.well-known/ucp.json → 200 OK
              </div>
            )}
          </div>

          {/* Feed B: Major Retail */}
          <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/40 shadow-lg shadow-blue-500/5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                  <Layers className="w-4.5 h-4.5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Walmart & Major Retail</div>
                  <div className="text-[11px] text-slate-500 font-mono">Direct Retail Feed</div>
                </div>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full font-bold bg-blue-900/60 text-blue-300 border border-blue-500/30">
                Always Indexed
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Large retail chains are always present in AI agent web indexes via direct scraping. Without the Cloudflare registry, only these brands surface in discovery results.
            </p>
          </div>
        </div>

        {/* ── Bottom CTA Row ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-cf-orange flex-shrink-0" />
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
              {isOptedIn
                ? <><strong className="text-white">ParDa is live on the registry.</strong> AI agents will surface ParDa products alongside Walmart and Target in shopper responses.</>
                : <><strong className="text-white">ParDa is not opted in.</strong> Toggle opt-in above or head to the Merchant tab to enable AI discovery.</>
              }
            </p>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={() => setActiveTab('merchant')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer whitespace-nowrap"
            >
              Merchant Tab
            </button>
            {hasSimulated && (
              <button
                onClick={handleGoToChat}
                className="px-4 py-2 bg-cf-orange hover:bg-cf-darkOrange text-white rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap flex items-center space-x-1.5"
              >
                <span>See in Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// ── Helper: Connector Arrow with traveling dot ──
const ConnectorArrow: React.FC<{ active: boolean; stepDone: boolean }> = ({ active, stepDone }) => (
  <div className="relative flex items-center justify-center px-1">
    <div className={`h-0.5 w-full transition-colors duration-500 ${stepDone ? 'bg-slate-500' : 'bg-slate-800'}`} />
    {active && <TravelingDot color="bg-white" />}
    <ArrowRight className={`w-4 h-4 absolute right-0 -translate-y-0 transition-colors duration-300 ${stepDone ? 'text-slate-400' : 'text-slate-700'}`} />
  </div>
);

// ── Helper: Animated traveling dot ──
const TravelingDot: React.FC<{ color: string }> = ({ color }) => (
  <div
    className={`absolute left-0 w-3 h-3 rounded-full ${color} shadow-lg animate-travel-dot`}
    style={{ zIndex: 10 }}
  />
);
