import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { Info, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const CloudflareRightPanel: React.FC = () => {
  const { botPreferenceSync, toggleBotPreferenceSync, isOptedIn, toggleOptIn, domain } = useSimulator();

  return (
    <div className="w-88 bg-white border-l border-gray-200 p-6 space-y-6 text-sm font-sans select-none overflow-y-auto h-[calc(100vh-4rem)] flex-shrink-0">
      {/* DNS Section */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-gray-900 text-lg">DNS</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center space-x-1.5">
            <span>DNS Setup:</span>
            <span className="font-semibold text-gray-800">Full</span>
            <Info className="w-4 h-4 text-gray-400" />
          </span>
        </div>
        <button className="text-cf-blue hover:underline text-sm font-semibold block cursor-pointer">
          DNS Records
        </button>
      </div>

      <hr className="border-gray-200" />

      {/* Domain Registration Section */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-800 text-sm">Domain Registration</h4>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Registrar</span>
            <span className="text-gray-800 font-semibold flex items-center space-x-1.5">
              <svg className="w-4 h-4 fill-cf-orange inline" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
              </svg>
              <span>Cloudflare</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-emerald-600 font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>Active</span>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Renews</span>
            <span className="text-gray-700 font-mono text-xs">June 24, 2027</span>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Connected Workers Section */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-800 text-sm">Connected Workers</h4>
          <ArrowRight className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-3 text-xs font-mono">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="font-bold text-gray-800 font-sans text-xs">mailgun-webhook</div>
            <div className="text-gray-500 truncate mt-0.5">mailgun.webhooks.{domain}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="font-bold text-gray-800 font-sans text-xs">assets</div>
            <div className="text-gray-500 truncate mt-0.5">assets.{domain}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="font-bold text-gray-800 font-sans text-xs">urlshortener</div>
            <div className="text-gray-500 truncate mt-0.5">l.{domain}</div>
          </div>
          {isOptedIn && (
            <div className="p-3 bg-orange-50/70 rounded-lg border border-orange-200">
              <div className="font-bold text-cf-orange font-sans flex items-center space-x-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ucp-schema-worker</span>
              </div>
              <div className="text-gray-700 truncate mt-0.5">{domain}/.well-known/ucp.json</div>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Manage AI bot access */}
      <div className="space-y-3.5">
        <h4 className="font-bold text-gray-900 text-base">Manage AI bot access</h4>
        
        <div className="flex items-start justify-between space-x-3">
          <div className="space-y-1">
            <label htmlFor="bot-sync-toggle" className="text-sm font-semibold text-gray-800 block cursor-pointer">
              Enable Bot Preference Sync
            </label>
            <p className="text-xs text-gray-500 leading-relaxed">
              Syncs robots.txt with Cloudflare Commerce Registry signals for AI Shopping Agents.
            </p>
          </div>
          <button
            id="bot-sync-toggle"
            type="button"
            role="switch"
            aria-checked={botPreferenceSync}
            onClick={toggleBotPreferenceSync}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              botPreferenceSync ? 'bg-cf-blue' : 'bg-gray-300'
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                botPreferenceSync ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Registry Quick Opt-In Banner */}
        <div className={`mt-4 p-4 rounded-xl border text-xs transition ${
          isOptedIn 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          <div className="flex items-center space-x-2 font-bold text-sm mb-1.5">
            {isOptedIn ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ParDa Listed on Registry</span>
              </>
            ) : (
              <>
                <Info className="w-4 h-4 text-amber-600" />
                <span>ParDa Not Listed on Registry</span>
              </>
            )}
          </div>
          <p className="text-gray-600 text-xs leading-relaxed mb-3">
            {isOptedIn
              ? 'AI agents query your UCP endpoint directly when shoppers ask who sells women bags or leather accessories.'
              : 'When not opted in, AI agents only index major retail conglomerates like Walmart.'}
          </p>
          <button
            onClick={() => toggleOptIn()}
            className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
              isOptedIn
                ? 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50'
                : 'bg-cf-orange hover:bg-cf-darkOrange text-white shadow-sm'
            }`}
          >
            {isOptedIn ? 'Revoke Registry Listing' : 'Opt-in to Registry Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
