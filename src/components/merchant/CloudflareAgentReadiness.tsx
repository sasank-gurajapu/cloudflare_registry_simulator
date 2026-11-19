import React, { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  ShoppingBag,
  ChevronDown,
  Calendar,
  Layers,
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { AITrendItem } from '../../types/simulator';

export const CloudflareAgentReadiness: React.FC = () => {
  const { 
    isOptedIn, 
    toggleOptIn, 
    products, 
    metrics, 
    aiTrends, 
    selectedTrend, 
    setSelectedTrend 
  } = useSimulator();

  // Mini sparkline SVG generator
  const renderSparkline = (points: number[], isSelected: boolean = false) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const width = 120;
    const height = 36;
    
    const svgPoints = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 8) - 4;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg className="w-28 h-9 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={isSelected ? '#34D399' : '#10B981'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={svgPoints}
        />
      </svg>
    );
  };

  // Detailed larger chart for the granular breakdown panel
  const renderLargeSparkline = (points: number[]) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const width = 360;
    const height = 110;
    
    const linePoints = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 20) - 10;
      return { x, y };
    });

    const polylineStr = linePoints.map(pt => `${pt.x},${pt.y}`).join(' ');
    const areaStr = `0,${height} ` + polylineStr + ` ${width},${height}`;

    return (
      <div className="relative w-full h-28 my-3">
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Subtle grid lines */}
          <line x1="0" y1="30" x2={width} y2="30" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
          <line x1="0" y1="70" x2={width} y2="70" stroke="#334155" strokeDasharray="3 3" opacity="0.4" />
          
          <polygon fill="url(#trendGradient)" points={areaStr} />
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylineStr}
          />
          {/* Current dot */}
          {linePoints.length > 0 && (
            <circle
              cx={linePoints[linePoints.length - 1].x}
              cy={linePoints[linePoints.length - 1].y}
              r="4.5"
              fill="#34D399"
              stroke="#064E3B"
              strokeWidth="2"
            />
          )}
        </svg>
        <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1">
          <span>7 days ago</span>
          <span>now</span>
        </div>
      </div>
    );
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
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Live Index
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

          {/* NEW SECTION: AI SHOPPING TRENDS (Inspired directly by Google Trends) */}
          <div className="bg-[#1E1F20] text-gray-100 rounded-2xl p-6 lg:p-7 shadow-lg border border-[#303134] space-y-6">
            {/* Trends Section Header & Filter Pills */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#303134]">
              <div>
                <div className="flex items-center space-x-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Agent Search Intelligence</span>
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  AI Shopping Trends
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Macro shopper queries from AI agents aggregated into categories and demand volume.
                </p>
              </div>

              {/* Filter Pills (Google Trends Style) */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#2D2E31] border border-[#3C4043] rounded-full text-gray-200 cursor-pointer hover:bg-[#383A3E] transition">
                  <span>United States</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#2D2E31] border border-[#3C4043] rounded-full text-gray-200 cursor-pointer hover:bg-[#383A3E] transition">
                  <Calendar className="w-3 h-3 text-gray-400" />
                  <span>Past 7 days</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
                <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#2D2E31] border border-[#3C4043] rounded-full text-gray-200 cursor-pointer hover:bg-[#383A3E] transition">
                  <ShoppingBag className="w-3 h-3 text-gray-400" />
                  <span>Shopping</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Master-Detail Trends View (Matching Google Trends screenshot) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Macro Trends Table (7 columns) */}
              <div className="lg:col-span-7 overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-[#303134] text-gray-400 text-[11px] font-semibold">
                      <th className="pb-3 pl-2">AI Search Query</th>
                      <th className="pb-3 px-3">Volume</th>
                      <th className="pb-3 px-3">Started</th>
                      <th className="pb-3 pr-2 text-right">Past 7 days</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2B2C2F]">
                    {aiTrends.map((trend) => {
                      const isSelected = selectedTrend.id === trend.id;
                      return (
                        <tr
                          key={trend.id}
                          onClick={() => setSelectedTrend(trend)}
                          className={`cursor-pointer transition group ${
                            isSelected 
                              ? 'bg-[#2B2C2F] text-white font-medium' 
                              : 'hover:bg-[#252628] text-gray-300'
                          }`}
                        >
                          {/* Query & Selection indicator */}
                          <td className="py-3.5 pl-2">
                            <div className="flex items-center space-x-2.5">
                              <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-transparent group-hover:bg-gray-600'}`}></div>
                              <span className="text-sm font-semibold group-hover:text-white transition">
                                {trend.query}
                              </span>
                            </div>
                          </td>

                          {/* Volume & Growth */}
                          <td className="py-3.5 px-3 font-mono">
                            <div className="text-xs font-bold text-gray-100">{trend.volume}</div>
                            <div className="text-[10px] text-emerald-400 font-semibold">{trend.growth}</div>
                          </td>

                          {/* Started & Active Status */}
                          <td className="py-3.5 px-3">
                            <div className="text-xs text-gray-300">{trend.started}</div>
                            <div className="text-[10px] text-emerald-400 flex items-center space-x-1 mt-0.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                              <span>Active</span>
                            </div>
                          </td>

                          {/* Sparkline Graph */}
                          <td className="py-3.5 pr-2 text-right">
                            <div className="flex justify-end">
                              {renderSparkline(trend.sparklinePoints, isSelected)}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Granular Category Breakdown Panel (5 columns, matching image 4) */}
              <div className="lg:col-span-5 bg-[#252628] border border-[#3C4043] rounded-2xl p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                      Granular Breakdown
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      {selectedTrend.query}
                    </h3>
                  </div>
                  <span className="text-xs bg-[#303134] text-gray-300 px-2.5 py-1 rounded-full font-mono">
                    {selectedTrend.volume} total
                  </span>
                </div>

                {/* Prominent Trend Graph */}
                {renderLargeSparkline(selectedTrend.sparklinePoints)}

                {/* Sub-Category Aggregated Intent */}
                <div className="space-y-3 pt-1 border-t border-[#35373A]">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-300">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-cf-orange" />
                      <span>Aggregated Category Distribution</span>
                    </span>
                    <span className="text-gray-400 text-[11px]">Share</span>
                  </div>

                  <div className="space-y-2.5">
                    {selectedTrend.categoryBreakdown.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-300">{item.category}</span>
                          <span className="font-mono text-gray-200 font-semibold">
                            {item.percentage}% ({item.queryCount})
                          </span>
                        </div>
                        <div className="w-full bg-[#35373A] rounded-full h-1.5">
                          <div 
                            className="bg-emerald-400 h-1.5 rounded-full transition-all duration-500" 
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Agent Query Insight Summary */}
                <div className="p-3 bg-[#1E1F20] border border-[#3C4043] rounded-xl text-xs text-gray-300 space-y-1">
                  <div className="font-bold text-white flex items-center space-x-1.5">
                    <Bot className="w-3.5 h-3.5 text-cf-blue" />
                    <span>AI Shopper Query Pattern:</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    {selectedTrend.agentSummary}
                  </p>
                </div>
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
        </div>
      )}
    </div>
  );
};
