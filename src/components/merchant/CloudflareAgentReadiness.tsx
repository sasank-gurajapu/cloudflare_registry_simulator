import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  ShoppingBag,
  ArrowRight,
  Radio
} from 'lucide-react';

export const CloudflareAgentReadiness: React.FC = () => {
  const { 
    isOptedIn, 
    toggleOptIn, 
    products, 
    metrics,
    setActiveTab 
  } = useSimulator();

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-10 bg-white font-sans text-gray-800 space-y-8 select-none">
      {/* Top Header & Main Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 font-semibold mb-1">
            <span>Agent Readiness & Optimization</span>
            <span>/</span>
            <span className="text-cf-orange font-bold">UCP Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            AI Agent Discovery & Registry
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Opt-in to be actively discovered by AI agents (ChatGPT, Claude, Perplexity).
          </p>
        </div>

        {/* Global Opt-In Switch */}
        <div className="flex items-center space-x-3.5 bg-gray-50 border border-gray-200 px-5 py-3 rounded-2xl shadow-xs self-start sm:self-auto">
          <div className="text-right">
            <div className="text-sm font-bold text-gray-900">
              {isOptedIn ? 'AI Discovery: ACTIVE' : 'AI Discovery: OFF'}
            </div>
            <div className="text-xs text-gray-500">
              {isOptedIn ? 'ParDa listed in UCP format' : 'Store not indexed by AI agents'}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={isOptedIn}
            onClick={() => toggleOptIn()}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isOptedIn ? 'bg-cf-orange' : 'bg-gray-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                isOptedIn ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* STATE 1: WHEN TOGGLED OFF (Clean minimal screen, no clutter) */}
      {!isOptedIn ? (
        <div className="flex flex-col items-center justify-center py-20 text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-200 text-cf-orange flex items-center justify-center shadow-xs">
            <Bot className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              AI Agent Discovery is currently OFF
            </h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
              Opt-in to convert your product catalog into Universal Commerce Protocol (UCP) format and get actively discovered by AI shopping assistants.
            </p>
          </div>

          <button
            type="button"
            onClick={() => toggleOptIn(true)}
            className="px-6 py-3 bg-cf-orange hover:bg-cf-darkOrange text-white text-sm font-bold rounded-xl shadow-md transition transform active:scale-95 cursor-pointer flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Opt-in to be Discovered by AI Agents</span>
          </button>
        </div>
      ) : (
        /* STATE 2: WHEN TOGGLED ON */
        <div className="space-y-8 animate-fade-in">
          {/* Key Metrics Cards (Clean, visits + queries + products) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Referral Visits</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center">
                  <TrendingUp className="w-3 h-3 mr-0.5" /> +18%
                </span>
              </div>
              <div className="text-3xl font-extrabold text-gray-900">
                {metrics.uniqueVisitors}
              </div>
              <div className="text-xs text-gray-400">
                Direct shoppers referred via AI agents
              </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Agent Queries Today</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center">
                  <Radio className="w-3 h-3 mr-0.5 animate-pulse" /> Live
                </span>
              </div>
              <div className="text-3xl font-extrabold text-cf-blue font-mono">
                {metrics.agentQueriesToday + 12}
              </div>
              <div className="text-xs text-gray-400">
                ChatGPT, Claude & Perplexity lookups
              </div>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Synced Products</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  100% UCP
                </span>
              </div>
              <div className="text-3xl font-extrabold text-gray-900">
                {products.length} Products
              </div>
              <div className="text-xs text-gray-400">
                Machine-readable UCP endpoints
              </div>
            </div>
          </div>

          {/* Active Synced Product Catalog */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4 text-cf-orange" />
                <span>Active Products in UCP Registry ({products.length})</span>
              </h3>
              <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
                Auto-Synced via Edge Worker
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p.id} className="p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition space-y-2.5">
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 right-2 bg-cf-orange text-white font-bold text-xs px-2 py-0.5 rounded shadow">
                      ${p.price}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 line-clamp-1">{p.title}</div>
                    <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{p.category}</div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
                    <span className="text-emerald-600 font-semibold">{p.stockCount} in stock</span>
                    <span className="font-mono text-gray-400 text-[11px]">{p.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic by Assistant Breakdown */}
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                <Bot className="w-4 h-4 text-cf-blue" />
                <span>Traffic Distribution by AI Assistant</span>
              </h3>
              <button
                onClick={() => setActiveTab('trends')}
                className="text-xs text-cf-blue hover:underline font-bold flex items-center space-x-1 cursor-pointer"
              >
                <span>Explore AI Trends</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">ChatGPT (OpenAI)</span>
                  <span className="text-gray-900 font-bold">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Claude (Anthropic)</span>
                  <span className="text-gray-900 font-bold">22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cf-orange h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Perplexity AI</span>
                  <span className="text-gray-900 font-bold">13%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-cf-blue h-2 rounded-full" style={{ width: '13%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
