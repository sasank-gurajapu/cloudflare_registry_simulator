import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { ChevronDown, Sparkles, HelpCircle, Bell } from 'lucide-react';

export const CloudflareNavbar: React.FC = () => {
  const { domain, isOptedIn } = useSimulator();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 text-sm font-sans select-none z-20">
      {/* Left: Cloudflare Cloud Logo + Account Switcher */}
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-3">
          {/* Official Cloudflare Orange Cloud Icon */}
          <div className="text-cf-orange cursor-pointer hover:opacity-90 transition">
            <svg className="w-9 h-9 fill-current" viewBox="0 0 48 48">
              <path d="M37.5 19.8c-.8-6.1-6-10.8-12.3-10.8-5.3 0-9.8 3.3-11.6 8-5.1.7-9.1 5.1-9.1 10.5 0 5.8 4.7 10.5 10.5 10.5h22.2c5.4 0 9.8-4.4 9.8-9.8 0-4.6-3.2-8.4-7.5-9.4z" />
            </svg>
          </div>
          
          <button className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-gray-800 hover:bg-gray-100 font-semibold transition text-sm">
            <span>ParDa</span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="h-5 w-px bg-gray-300" />

        {/* Current Domain Pill */}
        <div className="flex items-center space-x-2.5">
          <span className="text-gray-400 text-sm">★</span>
          <span className="font-bold text-gray-900 text-sm">{domain}</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded font-normal">
            free
          </span>
          {isOptedIn && (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full flex items-center space-x-1.5 font-semibold animate-pulse-subtle">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              <span>UCP Registry Active</span>
            </span>
          )}
        </div>
      </div>

      {/* Right: Actions & User Avatar */}
      <div className="flex items-center space-x-4 text-gray-600">
        <button className="flex items-center space-x-2 px-3.5 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition font-medium">
          <Sparkles className="w-4 h-4 text-cf-blue" />
          <span>Ask AI</span>
        </button>

        <button className="flex items-center space-x-2 px-3.5 py-2 rounded-md hover:bg-gray-100 text-sm text-gray-700 transition font-medium">
          <HelpCircle className="w-4 h-4 text-gray-500" />
          <span>Support</span>
        </button>

        <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500 transition relative">
          <Bell className="w-5 h-5" />
          {isOptedIn && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cf-orange rounded-full"></span>
          )}
        </button>

        <div className="w-8 h-8 rounded-full bg-cf-blue text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer hover:bg-cf-darkBlue transition">
          PD
        </div>
      </div>
    </header>
  );
};
