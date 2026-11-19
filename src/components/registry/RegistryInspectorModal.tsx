import React, { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { Globe } from 'lucide-react';

export const RegistryInspectorModal: React.FC = () => {
  const { isOptedIn, domain, merchantName, products, toggleOptIn } = useSimulator();
  const [activeCodeTab, setActiveCodeTab] = useState<'ucp' | 'worker' | 'registry'>('ucp');

  const ucpJson = {
    "$schema": "https://ucp.network/schemas/v1/merchant.json",
    "protocolVersion": "1.0",
    "registrySnapshotDate": new Date().toISOString(),
    "merchant": {
      "identifier": "cf-parda-77291",
      "legalName": merchantName,
      "canonicalDomain": domain,
      "neutralTrustScore": 0.99,
      "independentMerchantVerified": true
    },
    "discoveryIndex": {
      "indexedCategories": ["Women's Bags", "Leather Goods", "Accessories"],
      "itemCount": products.length,
      "pricingFloorUSD": 68.0,
      "pricingCeilingUSD": 185.0
    },
    "catalog": products.map(p => ({
      "sku": p.id,
      "name": p.title,
      "unitPrice": { "amount": p.price, "currency": p.currency },
      "inventoryLevel": p.stockCount,
      "availability": "https://schema.org/InStock",
      "ucpEndpoint": p.ucpEndpoint,
      "agentCheckoutAllowed": true
    }))
  };

  const workerCode = `// Cloudflare Edge Worker: Auto UCP Translator for ParDa
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Serve Universal Commerce Protocol manifest
    if (url.pathname === '/.well-known/ucp.json') {
      const ucpManifest = await env.UCP_STORE.get('manifest');
      return new Response(ucpManifest, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'X-Cloudflare-UCP-Verified': 'true'
        }
      });
    }

    // Pass-through to original origin with Schema.org Microdata injection
    return fetch(request);
  }
};`;

  const registryQueryExample = `// LLM Agent Query to Cloudflare Registry
const registryResponse = await fetch('https://registry.cloudflare.com/v1/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <ai_agent_token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: "Women's bag under $200",
    preferredType: "IndependentBrand",
    maxPriceUSD: 200
  })
});

// Result: Points AI agent directly to ParDa's UCP Endpoint!`;

  return (
    <div className="flex-1 overflow-y-auto p-8 bg-slate-900 text-slate-100 font-sans space-y-7">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs text-orange-400 font-mono font-bold">
            <Globe className="w-4 h-4" />
            <span>CLOUDFLARE COMMERCE PROTOCOL ENGINE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Cloudflare Open Registry & UCP Inspector
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Neutral, open index enabling AI agents to answer "who sells X?" for independent merchants like ParDa without relying exclusively on closed aggregator monopolies.
          </p>
        </div>

        <button
          onClick={() => toggleOptIn()}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-md cursor-pointer self-start sm:self-auto ${
            isOptedIn 
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
              : 'bg-cf-orange hover:bg-orange-500 text-white'
          }`}
        >
          {isOptedIn ? 'ParDa Registry: ONLINE' : 'ParDa Registry: OFFLINE (Click to Opt In)'}
        </button>
      </div>

      {/* Live Pipeline Architecture Diagram */}
      <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 space-y-4">
        <h2 className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
          End-to-End Discovery Pipeline
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Node 1: Merchant Store */}
          <div className="p-5 bg-slate-900/90 rounded-xl border border-slate-700 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-orange-500/20 text-cf-orange flex items-center justify-center mx-auto text-sm font-bold">
              1
            </div>
            <div className="text-sm font-bold text-white">Merchant Website</div>
            <div className="text-xs font-mono text-slate-400">{domain}</div>
            <div className={`text-xs px-2.5 py-0.5 rounded-full inline-block font-bold ${
              isOptedIn ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'
            }`}>
              {isOptedIn ? 'Opted In' : 'Not Opted In'}
            </div>
          </div>

          {/* Node 2: Cloudflare Edge Conversion */}
          <div className="p-5 bg-slate-900/90 rounded-xl border border-slate-700 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto text-sm font-bold">
              2
            </div>
            <div className="text-sm font-bold text-white">Cloudflare Worker</div>
            <div className="text-xs font-mono text-slate-400">HTML → UCP Schema</div>
            <div className="text-xs text-slate-400">Code-Free Conversion</div>
          </div>

          {/* Node 3: Open Registry Index */}
          <div className="p-5 bg-slate-900/90 rounded-xl border border-slate-700 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-sm font-bold">
              3
            </div>
            <div className="text-sm font-bold text-white">Open Registry Index</div>
            <div className="text-xs font-mono text-slate-400">registry.cloudflare.com</div>
            <div className="text-xs text-emerald-400 font-bold">
              {isOptedIn ? 'ParDa Snapshot Stored' : 'No Snapshot Stored'}
            </div>
          </div>

          {/* Node 4: LLM Shopper Agent */}
          <div className="p-5 bg-slate-900/90 rounded-xl border border-slate-700 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto text-sm font-bold">
              4
            </div>
            <div className="text-sm font-bold text-white">Shopper AI Agent</div>
            <div className="text-xs font-mono text-slate-400">ChatGPT / Claude</div>
            <div className="text-xs text-purple-300 font-bold">
              {isOptedIn ? 'Discovers ParDa' : 'Discovers Major Retailers'}
            </div>
          </div>
        </div>
      </div>

      {/* Code / JSON Explorer */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800 text-xs">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveCodeTab('ucp')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition cursor-pointer ${
                activeCodeTab === 'ucp' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              .well-known/ucp.json
            </button>
            <button
              onClick={() => setActiveCodeTab('worker')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition cursor-pointer ${
                activeCodeTab === 'worker' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              worker-schema-converter.ts
            </button>
            <button
              onClick={() => setActiveCodeTab('registry')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition cursor-pointer ${
                activeCodeTab === 'registry' ? 'bg-orange-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              agent-registry-query.js
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            {activeCodeTab === 'ucp' ? 'JSON-LD / UCP Specification' : 'TypeScript / Edge Engine'}
          </span>
        </div>

        <div className="p-6 font-mono text-xs text-slate-300 overflow-x-auto max-h-96 leading-relaxed">
          {activeCodeTab === 'ucp' && (
            <pre className="text-emerald-400">{JSON.stringify(ucpJson, null, 2)}</pre>
          )}
          {activeCodeTab === 'worker' && (
            <pre className="text-blue-300">{workerCode}</pre>
          )}
          {activeCodeTab === 'registry' && (
            <pre className="text-purple-300">{registryQueryExample}</pre>
          )}
        </div>
      </div>
    </div>
  );
};
