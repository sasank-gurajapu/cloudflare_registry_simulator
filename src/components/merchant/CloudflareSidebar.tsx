import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  BarChart3, 
  Clock, 
  Bot, 
  Sparkles, 
  LineChart, 
  Activity, 
  Globe, 
  Mail, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  Zap, 
  Database, 
  Share2, 
  Sliders, 
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Search
} from 'lucide-react';

export const CloudflareSidebar: React.FC = () => {
  const { merchantSection, setMerchantSection, isOptedIn } = useSimulator();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'recents', label: 'Recents', icon: Clock, hasChevron: true },
    { id: 'ai-crawl-control', label: 'AI Crawl Control', icon: Bot, hasChevron: true },
    { 
      id: 'agent-readiness', 
      label: 'Agent Readiness', 
      icon: Sparkles, 
      highlight: true, 
      hasChevron: true,
      badge: isOptedIn ? 'Active' : 'Action Req'
    },
    { id: 'analytics', label: 'Analytics', icon: LineChart, hasChevron: true },
    { id: 'observability', label: 'Observability', icon: Activity, badge: 'New' },
    { id: 'dns', label: 'DNS', icon: Globe, hasChevron: true },
    { id: 'email', label: 'Email', icon: Mail, hasChevron: true },
    { id: 'ssl', label: 'SSL/TLS', icon: Lock, hasChevron: true },
    { id: 'security', label: 'Security', icon: ShieldCheck, hasChevron: true },
    { id: 'access', label: 'Access', icon: KeyRound },
    { id: 'speed', label: 'Speed', icon: Zap, hasChevron: true },
    { id: 'caching', label: 'Caching', icon: Database, hasChevron: true },
    { id: 'workers-routes', label: 'Workers Routes', icon: Share2 },
    { id: 'rules', label: 'Rules', icon: Sliders, hasChevron: true },
    { id: 'error-pages', label: 'Error Pages', icon: AlertTriangle, badge: 'New' }
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-[calc(100vh-4rem)] select-none text-sm font-sans flex-shrink-0">
      {/* Search Bar */}
      <div className="p-3.5">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Quick search... ⌘K"
            className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs md:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cf-blue focus:ring-1 focus:ring-cf-blue"
            readOnly
          />
        </div>
      </div>

      {/* Back to Domains */}
      <div className="px-3.5 pb-2 border-b border-gray-200">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 py-2 px-2.5 rounded-lg w-full hover:bg-gray-100 transition text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Domains</span>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-2.5 px-2.5 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = merchantSection === item.id;
          const isHighlighted = item.highlight;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'overview' || item.id === 'agent-readiness' || item.id === 'analytics' || item.id === 'dns' || item.id === 'caching') {
                  setMerchantSection(item.id as any);
                }
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition text-left cursor-pointer ${
                isActive
                  ? 'bg-cf-blue/10 text-cf-blue font-semibold'
                  : isHighlighted
                  ? 'text-gray-900 hover:bg-orange-50 font-medium'
                  : 'text-gray-700 hover:bg-gray-200/60'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive
                      ? 'text-cf-blue'
                      : isHighlighted
                      ? 'text-cf-orange'
                      : 'text-gray-500'
                  }`}
                />
                <span className="truncate text-sm">{item.label}</span>
              </div>

              <div className="flex items-center space-x-1.5 flex-shrink-0">
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                      item.badge === 'Active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.badge === 'Action Req'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-50 text-cf-blue border border-blue-200'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.hasChevron && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footnote */}
      <div className="p-3.5 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between bg-white/60">
        <span>Cloudflare Commerce</span>
        <span className="font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded">v2.4-ucp</span>
      </div>
    </aside>
  );
};
