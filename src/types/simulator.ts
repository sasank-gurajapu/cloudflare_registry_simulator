export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  description: string;
  rating: number;
  reviewsCount: number;
  merchant: string;
  merchantDomain: string;
  imageUrl: string;
  isArtisan: boolean;
  ucpEndpoint: string;
}

export interface RetailProduct {
  id: string;
  title: string;
  price: number;
  currency: string;
  retailer: string;
  shipping: string;
  description: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  badge: string;
}

export interface AgentLogEntry {
  id: string;
  timestamp: string;
  agent: 'ChatGPT' | 'Claude' | 'Perplexity' | 'Google Gemini';
  agentType: 'Shopping Agent' | 'Scraper' | 'Search Bot';
  query: string;
  outcome: 'ParDa Discovered (UCP)' | 'Big Brand Indexed' | 'Catalog Synced';
  targetEndpoint: string;
  latencyMs: number;
}

export interface AITrendItem {
  id: string;
  query: string;
  volume: string;
  growth: string;
  started: string;
  isActive: boolean;
  sparklinePoints: number[];
  categoryBreakdown: {
    category: string;
    percentage: number;
    queryCount: string;
  }[];
  agentSummary: string;
}

export type SimulatorTab = 'merchant' | 'shopper' | 'trends' | 'registry';
export type MerchantSection = 'overview' | 'agent-readiness' | 'analytics' | 'caching' | 'dns';
