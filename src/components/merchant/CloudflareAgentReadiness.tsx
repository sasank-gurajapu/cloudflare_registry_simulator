import React, { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Code2, 
  TrendingUp, 
  Copy, 
  Check, 
  ShoppingBag,
  ArrowUpRight,
  Zap,
  Globe,
  Radio
} from 'lucide-react';

export const CloudflareAgentReadiness: React.FC = () => {
  const { 
    domain, 
    merchantName,
    isOptedIn, 
    toggleOptIn, 
    products, 
    agentLogs, 
    metrics 
  } = useSimulator();

  const [copiedUcp, setCopiedUcp] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  const ucpManifest = {
    "@context": "https://ucp.network/v1",
    "@type": "MerchantIndex",
    "registryId": "cf-parda-77291",
    "status": isOptedIn ? "PUBLISHED_ACTIVE" : "DRAFT_OFFLINE",
    "merchant": {
      "name": merchantName,
      "domain": domain,
      "type": "IndependentBrand",
      "country": "US",
      "currency": "USD",
      "trustScore": "0.99 (Verified Cloudflare Origin)"
    },
    "catalogEndpoint": `https://${domain}/api/ucp/catalog.json`,
    "agentPurchaseEndpoint": `https://${domain}/api/ucp/checkout`,
    "productsCount": products.length,
    "productsSample": products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      currency: p.currency,
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      category: p.category,
      directUcpUrl: p.ucpEndpoint
    }))
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(ucpManifest, null, 2));
    setCopiedUcp(true);
    setTimeout(() => setCopiedUcp(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-10 bg-white font-sans text-gray-800 space-y-8">
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
        <div className="flex items-center space-x-3 bg-gray-50 border border-gray-200 px-5 py-3 rounded-2xl shadow-xs self-start sm:self-auto">
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

      {/* STATE 1: WHEN TOGGLED OFF (Nothing on screen except clean opt-in CTA) */}
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
        /* STATE 2: WHEN TOGGLED ON (Bunch of rich stats, visits, charts, real-time feed!) */
        <div className="space-y-8 animate-fade-in">
          {/* Active Status Ribbon */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div>
                <span className="text-sm font-bold text-emerald-900">
                  ParDa is Live & Discoverable on Cloudflare Open Registry
                </span>
                <span className="text-xs text-emerald-700 ml-2 font-mono">
                  https://{domain}/.well-known/ucp.json
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 self-end md:self-auto">
              <button
                onClick={handleCopyJson}
                className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition flex items-center space-x-1 cursor-pointer"
              >
                {copiedUcp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-emerald-600" />}
                <span>{copiedUcp ? 'Copied UCP' : 'Copy UCP Manifest'}</span>
              </button>
              <button
                onClick={() => setShowJsonPreview(!showJsonPreview)}
                className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-800 hover:bg-emerald-50 transition cursor-pointer"
              >
                {showJsonPreview ? 'Hide Schema' : 'View Schema'}
              </button>
            </div>
          </div>

          {/* Raw JSON Schema Drawer (Optional toggle) */}
          {showJsonPreview && (
            <div className="p-5 bg-slate-900 text-slate-100 font-mono text-xs rounded-2xl overflow-x-auto max-h-72 shadow-lg border border-slate-800">
              <pre>{JSON.stringify(ucpManifest, null, 2)}</pre>
            </div>
          )}

          {/* 4 Rich KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: AI Agent Visits */}
            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2 hover:border-gray-300 transition">
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

            {/* Card 2: AI Queries Today */}
            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2 hover:border-gray-300 transition">
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

            {/* Card 3: UCP Synced Products */}
            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2 hover:border-gray-300 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Synced Catalog</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  100% Valid
                </span>
              </div>
              <div className="text-3xl font-extrabold text-gray-900">
                {products.length} Products
              </div>
              <div className="text-xs text-gray-400">
                Machine-readable UCP endpoints
              </div>
            </div>

            {/* Card 4: Est. Direct Inquiries */}
            <div className="p-5 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-2 hover:border-gray-300 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimated GMV</span>
                <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  0% Fee
                </span>
              </div>
              <div className="text-3xl font-extrabold text-gray-900">
                $2,480
              </div>
              <div className="text-xs text-gray-400">
                Direct to store (no marketplace cut)
              </div>
            </div>
          </div>

          {/* Two-Column Analytics Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (7 cols): Synced Products & Agent Distribution */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Catalog Card */}
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

                <div className="space-y-3">
                  {products.map(p => (
                    <div key={p.id} className="p-3.5 border border-gray-200 rounded-xl flex items-center justify-between hover:border-gray-300 transition">
                      <div className="flex items-center space-x-3.5">
                        <img src={p.imageUrl} alt={p.title} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                        <div>
                          <div className="text-sm font-bold text-gray-900 line-clamp-1">{p.title}</div>
                          <div className="text-xs text-cf-orange font-bold mt-0.5">${p.price} <span className="text-[10px] text-gray-400 font-normal">USD</span></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                          {p.stockCount} in stock
                        </span>
                        <div className="text-[11px] text-gray-400 font-mono mt-0.5">{p.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent Breakdown */}
              <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4">
                <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-cf-blue" />
                  <span>Traffic by AI Assistant</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-700">ChatGPT (OpenAI Agent)</span>
                      <span className="text-gray-900">65% (18 queries)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-700">Claude (Anthropic)</span>
                      <span className="text-gray-900">22% (6 queries)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-cf-orange h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-gray-700">Perplexity AI</span>
                      <span className="text-gray-900">13% (4 queries)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-cf-blue h-2 rounded-full" style={{ width: '13%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Live Inquiries Stream */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-xs space-y-4 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <span>Live AI Inquiries Feed</span>
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-mono">
                      Real-time
                    </span>
                  </div>

                  {/* List of query events */}
                  <div className="space-y-3">
                    {agentLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-1.5 hover:bg-gray-100/70 transition">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-900 flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-cf-blue"></span>
                            <span>{log.agent}</span>
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">{log.timestamp}</span>
                        </div>
                        <div className="text-xs text-gray-700 italic">
                          "{log.query}"
                        </div>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-gray-200/60">
                          <span className="text-emerald-700 font-semibold">
                            {log.outcome}
                          </span>
                          <span className="text-gray-400 font-mono">{log.latencyMs}ms</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 mt-4">
                  💡 <strong>Test it in real time:</strong> Switch to the <strong>Shopper (ChatGPT)</strong> tab, submit a query like <em>"Women's bag under $200"</em>, and watch the query and visitor count update here immediately!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
