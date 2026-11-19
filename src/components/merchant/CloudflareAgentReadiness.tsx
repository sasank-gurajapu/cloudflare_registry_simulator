import React, { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Bot, 
  Code2, 
  TrendingUp, 
  Copy, 
  Check, 
  Shield
} from 'lucide-react';

export const CloudflareAgentReadiness: React.FC = () => {
  const { 
    domain, 
    merchantName,
    isOptedIn, 
    toggleOptIn, 
    schemaConversionActive, 
    setSchemaConversionActive,
    agentReadinessScore,
    products,
    agentLogs,
    metrics
  } = useSimulator();

  const [activeStepTab, setActiveStepTab] = useState<1 | 2 | 3 | 4>(2);
  const [copiedUcp, setCopiedUcp] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);

  // Simulated UCP JSON representation
  const ucpManifest = {
    "@context": "https://ucp.network/v1",
    "@type": "MerchantIndex",
    "registryId": "cf-reg-parda-7729",
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
    <div className="flex-1 overflow-y-auto p-8 bg-white font-sans text-gray-800 space-y-7">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-gray-500 font-semibold">
            <span>Agent Readiness & Optimization</span>
            <span>/</span>
            <span className="text-cf-orange font-bold">Cloudflare Open Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">
            Universal Commerce Protocol (UCP) Registry
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-3xl leading-relaxed">
            A neutral, open index that lets AI shopping agents (ChatGPT, Claude, Perplexity) answer "who sells X?" for independent merchants like ParDa, ensuring your products are discovered alongside big brands.
          </p>
        </div>

        {/* Global Opt-In Switch */}
        <div className="flex items-center space-x-3.5 bg-gray-50 border border-gray-200 px-5 py-3 rounded-xl shadow-sm self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs font-bold text-gray-900">
              {isOptedIn ? 'Registry Opt-In: ACTIVE' : 'Registry Opt-In: OFF'}
            </div>
            <div className="text-xs text-gray-500">
              {isOptedIn ? 'ParDa published to AI agents' : 'Only big brands indexed'}
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

      {/* 4 Epics Workflow Navigation Pills */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <button
          onClick={() => setActiveStepTab(1)}
          className={`p-4 rounded-xl border text-left transition cursor-pointer ${
            activeStepTab === 1 
              ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-500 shadow-sm' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-sm font-bold text-gray-900">Make Store Readable</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">One-Click Bot Control & Schema</p>
        </button>

        <button
          onClick={() => setActiveStepTab(2)}
          className={`p-4 rounded-xl border text-left transition cursor-pointer ${
            activeStepTab === 2 
              ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500 shadow-sm' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">2</span>
            <span className="text-sm font-bold text-gray-900">Directory & Sync</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">Fast Joining & UCP Schema</p>
        </button>

        <button
          onClick={() => setActiveStepTab(3)}
          className={`p-4 rounded-xl border text-left transition cursor-pointer ${
            activeStepTab === 3 
              ? 'border-blue-500 bg-blue-50/70 ring-2 ring-blue-500 shadow-sm' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">3</span>
            <span className="text-sm font-bold text-gray-900">Agent Traffic Analytics</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">ChatGPT, Claude Intent Tracking</p>
        </button>

        <button
          onClick={() => setActiveStepTab(4)}
          className={`p-4 rounded-xl border text-left transition cursor-pointer ${
            activeStepTab === 4 
              ? 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-500 shadow-sm' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">4</span>
            <span className="text-sm font-bold text-gray-900">Peer Benchmarking</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">Readiness Score {agentReadinessScore}%</p>
        </button>
      </div>

      {/* Main Content Area */}
      {activeStepTab === 1 && (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-orange-500" />
              <span>Step 1: Make Store Readable for Agents (Epic 1)</span>
            </h2>
            <p className="text-sm text-gray-500">
              Configure edge security to allow legitimate AI shopping agents while safeguarding against rogue data scrapers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800">One-Click Bot Control</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-bold">Enabled</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Allows ChatGPT, Claude, and Perplexity shopping agents through Cloudflare WAF while throttling aggressive content scrapers.
                </p>
              </div>

              <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-800">Code-Free Schema Conversion</span>
                  <button 
                    onClick={() => setSchemaConversionActive(!schemaConversionActive)}
                    className="text-sm text-cf-blue hover:underline font-semibold cursor-pointer"
                  >
                    {schemaConversionActive ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Cloudflare Workers automatically parse your HTML product pages and inject Schema.org/Product Microdata and UCP endpoints without touching your store code.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeStepTab === 2 && (
        <div className="space-y-6">
          {/* Status Box */}
          <div className={`p-6 rounded-xl border transition shadow-sm ${
            isOptedIn 
              ? 'bg-emerald-50/60 border-emerald-300' 
              : 'bg-amber-50/70 border-amber-300'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <span className={`w-3.5 h-3.5 rounded-full ${isOptedIn ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`} />
                  <h3 className="text-base font-bold text-gray-900">
                    {isOptedIn ? 'ParDa Is Active & Indexed on Cloudflare Open Registry' : 'ParDa Is Not Yet Opted In to Registry'}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                  {isOptedIn
                    ? 'When shoppers ask LLMs "Women\'s bag under $200", agents query the registry snapshot and include ParDa handcrafted bags.'
                    : 'Without opt-in, AI shopping queries only return standard results from large corporate brands like Walmart.'}
                </p>
              </div>

              <button
                onClick={() => toggleOptIn()}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition whitespace-nowrap cursor-pointer ${
                  isOptedIn
                    ? 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-100'
                    : 'bg-cf-orange text-white hover:bg-cf-darkOrange'
                }`}
              >
                {isOptedIn ? 'Withdraw from Registry' : 'Opt-in to Cloudflare Registry'}
              </button>
            </div>
          </div>

          {/* Machine-Readable UCP Data Conversion Preview */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <Code2 className="w-5 h-5 text-cf-orange" />
                <span className="text-sm font-bold text-gray-900 font-mono">
                  https://{domain}/.well-known/ucp.json
                </span>
                <span className="bg-gray-200 text-gray-700 text-xs px-2.5 py-0.5 rounded font-mono font-medium">
                  UCP v1.0 Spec
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  {copiedUcp ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  <span>{copiedUcp ? 'Copied' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={() => setShowJsonPreview(!showJsonPreview)}
                  className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                >
                  {showJsonPreview ? 'Hide Raw Schema' : 'View Raw Schema'}
                </button>
              </div>
            </div>

            {showJsonPreview ? (
              <div className="p-5 bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-80 leading-relaxed">
                <pre>{JSON.stringify(ucpManifest, null, 2)}</pre>
              </div>
            ) : (
              <div className="p-5 space-y-3.5">
                <div className="text-sm text-gray-600 font-bold">
                  ParDa Catalog Synced into UCP Format ({products.length} products):
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="p-4 border border-gray-200 rounded-xl flex items-center justify-between bg-white hover:border-gray-300 transition shadow-xs">
                      <div className="flex items-center space-x-3.5">
                        <img src={p.imageUrl} alt={p.title} className="w-14 h-14 object-cover rounded-lg border border-gray-100" />
                        <div>
                          <div className="text-sm font-bold text-gray-900 line-clamp-1">{p.title}</div>
                          <div className="text-sm text-cf-orange font-bold mt-0.5">${p.price} <span className="text-xs text-gray-400 font-normal">USD</span></div>
                          <div className="text-xs text-emerald-600 font-semibold flex items-center space-x-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            <span>{p.stockCount} in stock • UCP Ready</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono font-medium">
                        {p.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeStepTab === 3 && (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900 flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-blue-500" />
                  <span>Step 3: Agent Traffic & Intent Analytics (Epic 3)</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Live audit log of AI Shopping Agents querying the Cloudflare Registry for ParDa products.
                </p>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-gray-500">Live Agent Queries:</span>
                <span className="text-lg font-bold text-cf-blue font-mono">{metrics.agentQueriesToday}</span>
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-sm font-sans">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Agent</th>
                    <th className="py-3 px-4">Shopper Query</th>
                    <th className="py-3 px-4">Registry Discovery Outcome</th>
                    <th className="py-3 px-4">Latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {agentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-3 px-4 font-mono text-gray-500 text-xs">{log.timestamp}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-cf-blue"></span>
                        <span>{log.agent}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-700 italic">"{log.query}"</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          log.outcome === 'ParDa Discovered (UCP)'
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.outcome === 'Catalog Synced'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {log.outcome}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-400 text-xs">{log.latencyMs}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeStepTab === 4 && (
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6 bg-white space-y-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span>Step 4: Category Benchmarking & Growth (Epic 4)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="text-xs text-gray-500 font-semibold uppercase">Peer Readiness Score</div>
                <div className="text-3xl font-extrabold text-gray-900">{agentReadinessScore}%</div>
                <div className="text-xs text-gray-500 pt-1">
                  {agentReadinessScore >= 90 ? 'Top 5% of independent leather merchants' : 'Standard index state (Action recommended)'}
                </div>
              </div>
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="text-xs text-gray-500 font-semibold uppercase">UCP Discovery Advantage</div>
                <div className="text-3xl font-extrabold text-emerald-600">+340%</div>
                <div className="text-xs text-gray-500 pt-1">Direct agent-to-store routing without marketplace fees</div>
              </div>
              <div className="p-5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="text-xs text-gray-500 font-semibold uppercase">Brand Visibility Status</div>
                <div className="text-3xl font-extrabold text-cf-orange">
                  {isOptedIn ? 'Indexed' : 'Unlisted'}
                </div>
                <div className="text-xs text-gray-500 pt-1">
                  {isOptedIn ? 'AI shopping agents recommend ParDa' : 'Only big corporate retailers appear'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
