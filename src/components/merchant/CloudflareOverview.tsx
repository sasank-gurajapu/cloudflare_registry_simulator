import React, { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { ExternalLink, Plus, Sparkles, TrendingUp } from 'lucide-react';

export const CloudflareOverview: React.FC = () => {
  const { 
    domain, 
    metrics, 
    isOptedIn, 
    toggleOptIn, 
    setMerchantSection 
  } = useSimulator();
  
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');

  return (
    <div className="flex-1 overflow-y-auto p-8 lg:p-10 bg-white font-sans text-gray-800 space-y-7">
      {/* Title & Top Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Overview</span>
          <div className="flex items-center space-x-3 mt-1">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{domain}</h1>
            <a href="#docs" className="text-cf-blue hover:underline text-sm flex items-center space-x-1 font-medium">
              <span>view docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Monitor and configure how Cloudflare processes your web traffic with the services in the menu.
          </p>
        </div>

        <button className="flex items-center space-x-1.5 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-xs transition self-start sm:self-auto cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add tag</span>
        </button>
      </div>

      {/* AI Commerce Registry Notification Banner */}
      <div className={`p-5 rounded-2xl border transition shadow-xs ${
        isOptedIn 
          ? 'bg-gradient-to-r from-orange-50/70 to-emerald-50/50 border-orange-200' 
          : 'bg-gradient-to-r from-amber-50/70 to-orange-50/50 border-amber-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className={`p-2.5 rounded-xl flex-shrink-0 ${isOptedIn ? 'bg-orange-500 text-white shadow-xs' : 'bg-amber-100 text-amber-700'}`}>
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <h3 className="text-base font-bold text-gray-900">
                  {isOptedIn ? 'AI Agent Discovery: Active (UCP Format)' : 'AI Agent Discovery & UCP Registry'}
                </h3>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  isOptedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {isOptedIn ? 'Active' : 'Action Recommended'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                {isOptedIn 
                  ? 'ParDa is actively discoverable across AI shopping assistants (ChatGPT, Claude, Perplexity) in machine-readable UCP format.'
                  : 'Opt-in to be actively discovered by AI agents when shoppers ask for women\'s bags and handcrafted leather goods.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end md:self-center flex-shrink-0">
            <button
              onClick={() => setMerchantSection('agent-readiness')}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition cursor-pointer"
            >
              Configure UCP
            </button>
            <button
              onClick={() => toggleOptIn()}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition shadow-xs cursor-pointer ${
                isOptedIn
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  : 'bg-cf-orange text-white hover:bg-cf-darkOrange'
              }`}
            >
              {isOptedIn ? 'Opt Out' : '1-Click Opt In'}
            </button>
          </div>
        </div>
      </div>

      {/* Time Range Bar & Date */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200 text-sm font-medium">
          <button 
            onClick={() => setTimeRange('24h')}
            className={`px-4 py-1.5 rounded-md transition ${timeRange === '24h' ? 'bg-white shadow text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
          >
            24 Hours
          </button>
          <button 
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-1.5 rounded-md transition ${timeRange === '7d' ? 'bg-white shadow text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-1.5 rounded-md transition ${timeRange === '30d' ? 'bg-white shadow text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
          >
            30 Days
          </button>
        </div>

        <span className="text-xs text-gray-400 font-mono tracking-wider uppercase font-semibold">
          18 NOVEMBER — 19 NOVEMBER
        </span>
      </div>

      {/* Chart 1: Unique Visitors */}
      <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs hover:border-gray-300 transition">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">Unique Visitors</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-1 flex items-baseline space-x-3">
              <span>{metrics.uniqueVisitors}</span>
              {isOptedIn && (
                <span className="text-xs text-emerald-600 font-bold flex items-center bg-emerald-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> +{metrics.agentQueriesToday} via AI Shopping Agents
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-5 h-36 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="110" x2="600" y2="110" stroke="#e2e8f0" />

            <path
              d="M 0 95 L 40 90 L 80 82 L 120 78 L 160 80 L 200 70 L 240 65 L 280 85 L 320 68 L 360 88 L 400 85 L 440 50 L 480 110 L 520 95 L 560 82 L 600 75 L 600 120 L 0 120 Z"
              fill="#E0F2FE"
              opacity="0.65"
            />
            <path
              d="M 0 95 L 40 90 L 80 82 L 120 78 L 160 80 L 200 70 L 240 65 L 280 85 L 320 68 L 360 88 L 400 85 L 440 50 L 480 110 L 520 95 L 560 82 L 600 75"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
          </svg>

          <div className="flex justify-between text-xs text-gray-400 font-mono mt-3">
            <span>12 PM</span>
            <span>4 PM</span>
            <span>8 PM</span>
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
          </div>
        </div>
      </div>

      {/* Chart 2: Total Requests */}
      <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs hover:border-gray-300 transition">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm text-gray-500 font-medium">Total Requests</div>
            <div className="text-3xl font-extrabold text-gray-900 mt-1">
              {(metrics.totalRequests / 1000).toFixed(2)}k
            </div>
          </div>
        </div>

        <div className="mt-5 h-36 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="50" x2="600" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="0" y1="110" x2="600" y2="110" stroke="#e2e8f0" />

            <path
              d="M 0 100 L 50 90 L 100 85 L 150 60 L 200 55 L 230 15 L 260 55 L 300 55 L 350 95 L 400 90 L 450 98 L 500 80 L 550 95 L 600 88"
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
          </svg>

          <div className="flex justify-between text-xs text-gray-400 font-mono mt-3">
            <span>12 PM</span>
            <span>4 PM</span>
            <span>8 PM</span>
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
