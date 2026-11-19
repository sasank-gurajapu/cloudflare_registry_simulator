import React from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Sparkles, 
  ChevronDown, 
  Calendar, 
  ShoppingBag, 
  Layers, 
  Bot, 
  Filter, 
  ArrowUpRight,
  TrendingUp,
  Globe
} from 'lucide-react';

export const AITrendsView: React.FC = () => {
  const { aiTrends, selectedTrend, setSelectedTrend } = useSimulator();

  // Mini sparkline for table rows
  const renderSparkline = (points: number[], isSelected: boolean = false) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const width = 110;
    const height = 32;
    
    const svgPoints = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 8) - 4;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg className="w-28 h-8 overflow-visible" viewBox={`0 0 ${width} ${height}`}>
        <polyline
          fill="none"
          stroke={isSelected ? '#059669' : '#10B981'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={svgPoints}
        />
      </svg>
    );
  };

  // Detailed larger chart for granular breakdown panel
  const renderLargeSparkline = (points: number[]) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const width = 360;
    const height = 110;
    
    const linePoints = points.map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 24) - 12;
      return { x, y };
    });

    const polylineStr = linePoints.map(pt => `${pt.x},${pt.y}`).join(' ');
    const areaStr = `0,${height} ` + polylineStr + ` ${width},${height}`;

    return (
      <div className="relative w-full h-32 my-3 bg-white rounded-xl p-2 border border-gray-100">
        <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="lightTrendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="30" x2={width} y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1="0" y1="70" x2={width} y2="70" stroke="#E2E8F0" strokeDasharray="3 3" />
          
          <polygon fill="url(#lightTrendGradient)" points={areaStr} />
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylineStr}
          />
          {linePoints.length > 0 && (
            <circle
              cx={linePoints[linePoints.length - 1].x}
              cy={linePoints[linePoints.length - 1].y}
              r="4.5"
              fill="#10B981"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          )}
        </svg>
        <div className="flex justify-between text-[11px] text-gray-400 font-mono mt-1 px-1">
          <span>7 days ago</span>
          <span>now</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white text-gray-900 font-sans p-8 lg:p-10 space-y-8 select-none">
      {/* Top Header & Google Trends-style Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-cf-orange mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Shopping Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            AI Shopping Trends
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Aggregated macro demand from AI shopping agents (ChatGPT, Claude, Perplexity), broken down by categories.
          </p>
        </div>

        {/* Filter Pills (Google Trends light mode layout) */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center space-x-1.5 px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-full text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-gray-500" />
            <span>United States</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-1.5 px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-full text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-gray-500" />
            <span>Past 7 days</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-1.5 px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-full text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition shadow-2xs">
            <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
            <span>Shopping</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>

          <div className="flex items-center space-x-1.5 px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-full text-gray-700 font-medium cursor-pointer hover:bg-gray-100 transition shadow-2xs">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            <span>By volume</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Two-Column Trends Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Macro Trends Table */}
        <div className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-600">
            <span>Trending AI Agent Search Topics</span>
            <span className="text-gray-400 font-normal">Click a query to inspect breakdown</span>
          </div>

          <table className="w-full text-left text-sm font-sans">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-xs font-semibold bg-white">
                <th className="py-3.5 pl-4">AI Search Query</th>
                <th className="py-3.5 px-3">Search Volume</th>
                <th className="py-3.5 px-3">Started</th>
                <th className="py-3.5 pr-4 text-right">Past 7 days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {aiTrends.map((trend) => {
                const isSelected = selectedTrend.id === trend.id;
                return (
                  <tr
                    key={trend.id}
                    onClick={() => setSelectedTrend(trend)}
                    className={`cursor-pointer transition ${
                      isSelected 
                        ? 'bg-emerald-50/70 border-l-4 border-emerald-600 text-gray-900 font-semibold' 
                        : 'hover:bg-gray-50/80 text-gray-700'
                    }`}
                  >
                    {/* Query */}
                    <td className="py-4 pl-4">
                      <div className="flex items-center space-x-3">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-600' : 'bg-gray-300'}`} />
                        <span className="text-sm font-semibold">{trend.query}</span>
                      </div>
                    </td>

                    {/* Volume & Growth */}
                    <td className="py-4 px-3 font-mono">
                      <div className="text-sm font-bold text-gray-900">{trend.volume}</div>
                      <div className="text-xs text-emerald-600 font-bold">{trend.growth}</div>
                    </td>

                    {/* Started & Active Status */}
                    <td className="py-4 px-3">
                      <div className="text-xs text-gray-600 font-medium">{trend.started}</div>
                      <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>Active</span>
                      </div>
                    </td>

                    {/* Sparkline Graph */}
                    <td className="py-4 pr-4 text-right">
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

        {/* Right Column (5 cols): Granular Category Breakdown */}
        <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100/70 px-2 py-0.5 rounded">
                Granular Breakdown
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1.5">
                {selectedTrend.query}
              </h2>
            </div>
            <span className="text-xs bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full font-mono font-bold shadow-2xs">
              {selectedTrend.volume} total
            </span>
          </div>

          {/* Large High-Res Trend Curve */}
          {renderLargeSparkline(selectedTrend.sparklinePoints)}

          {/* Aggregated Category Distribution */}
          <div className="space-y-3.5 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span className="flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-cf-orange" />
                <span>Aggregated Category Breakdown</span>
              </span>
              <span className="text-gray-400">Share</span>
            </div>

            <div className="space-y-3">
              {selectedTrend.categoryBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-gray-700">{item.category}</span>
                    <span className="font-mono text-gray-900 font-bold">
                      {item.percentage}% ({item.queryCount})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Query Intent Insight Summary */}
          <div className="p-4 bg-white border border-gray-200 rounded-xl text-xs text-gray-700 space-y-1.5 shadow-2xs">
            <div className="font-bold text-gray-900 flex items-center space-x-1.5">
              <Bot className="w-4 h-4 text-cf-blue" />
              <span>AI Shopper Query Pattern:</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {selectedTrend.agentSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
