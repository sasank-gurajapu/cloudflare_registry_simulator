import React, { createContext, useContext, useState } from 'react';
import { Product, WalmartProduct, AgentLogEntry, SimulatorTab, MerchantSection } from '../types/simulator';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  queryResults?: {
    isFromCloudflareRegistry: boolean;
    merchantProducts?: Product[];
    walmartProducts?: WalmartProduct[];
    ucpQueryEndpoint?: string;
    registryResponseLatency?: number;
    matchedCategory?: string;
  };
}

interface SimulatorContextType {
  // Navigation
  activeTab: SimulatorTab;
  setActiveTab: (tab: SimulatorTab) => void;
  merchantSection: MerchantSection;
  setMerchantSection: (section: MerchantSection) => void;

  // Merchant Opt-in & Registry State
  isOptedIn: boolean;
  toggleOptIn: (override?: boolean) => void;
  botPreferenceSync: boolean;
  toggleBotPreferenceSync: () => void;
  schemaConversionActive: boolean;
  setSchemaConversionActive: (val: boolean) => void;
  agentReadinessScore: number;

  // Merchant Domain & Catalog
  domain: string;
  merchantName: string;
  products: Product[];
  walmartProducts: WalmartProduct[];

  // Metrics & Logs
  metrics: {
    uniqueVisitors: number;
    totalRequests: number;
    percentCached: number;
    agentQueriesToday: number;
    agentConversions: number;
  };
  agentLogs: AgentLogEntry[];
  addAgentLog: (log: Omit<AgentLogEntry, 'id' | 'timestamp'>) => void;

  // Shopper Chat State
  messages: ChatMessage[];
  isChatLoading: boolean;
  sendChatMessage: (query: string) => Promise<void>;
  resetChat: () => void;

  // Global Actions
  resetDemo: () => void;
  lastSimulatedEvent: string | null;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'parda-01',
    title: 'ParDa Handcrafted Italian Leather Tote',
    price: 185,
    currency: 'USD',
    category: "Women's Bags",
    inStock: true,
    stockCount: 14,
    description: 'Artisan full-grain Tuscan cowhide with reinforced vegetable-tanned handles and brushed brass hardware. Hand-stitched in Florence.',
    rating: 4.9,
    reviewsCount: 128,
    merchant: 'ParDa',
    merchantDomain: 'parda.com',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    isArtisan: true,
    ucpEndpoint: 'https://parda.com/.well-known/ucp.json#parda-01'
  },
  {
    id: 'parda-02',
    title: 'ParDa Minimalist City Crossbody Bag',
    price: 145,
    currency: 'USD',
    category: "Women's Bags",
    inStock: true,
    stockCount: 22,
    description: 'Sleek structured crossbody crafted from water-resistant pebble leather with magnetic flap closure and adjustable shoulder strap.',
    rating: 4.8,
    reviewsCount: 94,
    merchant: 'ParDa',
    merchantDomain: 'parda.com',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    isArtisan: true,
    ucpEndpoint: 'https://parda.com/.well-known/ucp.json#parda-02'
  },
  {
    id: 'parda-03',
    title: 'ParDa Classic Bi-Fold Slim Wallet',
    price: 68,
    currency: 'USD',
    category: 'Accessories',
    inStock: true,
    stockCount: 45,
    description: 'Ultra-slim RFID-shielded wallet in full-grain chestnut leather with 8 card slots and cash sleeve.',
    rating: 4.9,
    reviewsCount: 210,
    merchant: 'ParDa',
    merchantDomain: 'parda.com',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    isArtisan: true,
    ucpEndpoint: 'https://parda.com/.well-known/ucp.json#parda-03'
  }
];

const WALMART_FALLBACKS: WalmartProduct[] = [
  {
    id: 'wm-01',
    title: 'Time and Tru Women’s Classic Faux Leather Tote Bag',
    price: 22.98,
    currency: 'USD',
    retailer: 'Walmart.com',
    shipping: 'Free pickup today at Supercenter',
    description: 'Synthetic faux leather shoulder bag with spacious main interior and double top handles. Available nationwide.',
    rating: 4.1,
    reviewsCount: 489,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular Retail'
  },
  {
    id: 'wm-02',
    title: 'Everyday Quilted Nylon Lightweight Shoulder Bag',
    price: 34.99,
    currency: 'USD',
    retailer: 'Walmart.com',
    shipping: 'Standard Shipping (Arrives in 3-5 days)',
    description: 'Polyester quilted zip-top bag with exterior zipper pockets and adjustable nylon strap.',
    rating: 3.9,
    reviewsCount: 142,
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    badge: 'Walmart Online'
  },
  {
    id: 'wm-03',
    title: 'Mainstays Dual-Strap Everyday Tote Handbag',
    price: 18.50,
    currency: 'USD',
    retailer: 'Walmart.com',
    shipping: 'Free delivery with Walmart+',
    description: 'Classic durable vinyl casual shopper tote with dual handles and open pocket interior.',
    rating: 3.7,
    reviewsCount: 310,
    imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    badge: 'Everyday Low Price'
  }
];

const INITIAL_LOGS: AgentLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '10:14 AM',
    agent: 'ChatGPT',
    agentType: 'Shopping Agent',
    query: "Women's bag under $200",
    outcome: 'Big Brand Indexed',
    targetEndpoint: 'https://walmart.com/search?q=womens+bag',
    latencyMs: 295
  },
  {
    id: 'log-2',
    timestamp: '09:42 AM',
    agent: 'Perplexity',
    agentType: 'Search Bot',
    query: 'Bespoke leather tote makers USA',
    outcome: 'Big Brand Indexed',
    targetEndpoint: 'https://walmart.com/c/bags',
    latencyMs: 245
  },
  {
    id: 'log-3',
    timestamp: '08:21 AM',
    agent: 'Google Gemini',
    agentType: 'Shopping Agent',
    query: 'Best leather handbag gift ideas',
    outcome: 'Big Brand Indexed',
    targetEndpoint: 'https://target.com/s?k=handbag',
    latencyMs: 198
  }
];

const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const SimulatorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<SimulatorTab>('merchant');
  const [merchantSection, setMerchantSection] = useState<MerchantSection>('agent-readiness');

  // Opt-in toggle state
  const [isOptedIn, setIsOptedIn] = useState<boolean>(false);
  const [botPreferenceSync, setBotPreferenceSync] = useState<boolean>(false);
  const [schemaConversionActive, setSchemaConversionActive] = useState<boolean>(true);

  // Dynamic Metrics
  const [uniqueVisitors, setUniqueVisitors] = useState<number>(146);
  const [totalRequests, setTotalRequests] = useState<number>(3320);
  const [agentQueriesToday, setAgentQueriesToday] = useState<number>(0);
  const [agentConversions, setAgentConversions] = useState<number>(0);

  const [agentLogs, setAgentLogs] = useState<AgentLogEntry[]>(INITIAL_LOGS);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [lastSimulatedEvent, setLastSimulatedEvent] = useState<string | null>(null);

  // Agent Readiness Score
  const agentReadinessScore = isOptedIn ? 98 : (botPreferenceSync ? 54 : 32);

  const toggleOptIn = (override?: boolean) => {
    const nextVal = override !== undefined ? override : !isOptedIn;
    setIsOptedIn(nextVal);
    if (nextVal) {
      setBotPreferenceSync(true);
      setLastSimulatedEvent(`ParDa is now listed in the Cloudflare Open Registry (UCP active at parda.com/.well-known/ucp.json)`);
      const syncLog: AgentLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        agent: 'ChatGPT',
        agentType: 'Shopping Agent',
        query: 'Cloudflare Registry Catalog Sync',
        outcome: 'Catalog Synced',
        targetEndpoint: 'https://registry.cloudflare.com/v1/merchants/parda.com',
        latencyMs: 84
      };
      setAgentLogs(prev => [syncLog, ...prev]);
    } else {
      setLastSimulatedEvent(`ParDa opted out from Registry. AI shopping discovery will only index standard big brands.`);
    }
  };

  const toggleBotPreferenceSync = () => {
    const next = !botPreferenceSync;
    setBotPreferenceSync(next);
    if (next && !isOptedIn) {
      setIsOptedIn(true);
      setLastSimulatedEvent(`Bot Preference Sync activated. ParDa indexed in Cloudflare Open Registry.`);
    }
  };

  const addAgentLog = (entry: Omit<AgentLogEntry, 'id' | 'timestamp'>) => {
    const newEntry: AgentLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setAgentLogs(prev => [newEntry, ...prev]);
  };

  const sendChatMessage = async (query: string) => {
    if (!query.trim()) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        sender: 'user',
        content: query,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
    setMessages(newMessages);
    setIsChatLoading(true);

    // Realistic agent response delay
    await new Promise(res => setTimeout(res, 950));

    if (isOptedIn) {
      // Merchant IS opted in! ParDa is indexed in UCP format
      const responseMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: `Here are the top-rated women's bags under $200 found through the **Cloudflare Open Registry**, featuring verified independent label **ParDa**:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        queryResults: {
          isFromCloudflareRegistry: true,
          merchantProducts: INITIAL_PRODUCTS.slice(0, 2),
          ucpQueryEndpoint: 'https://registry.cloudflare.com/v1/search?q=' + encodeURIComponent(query),
          registryResponseLatency: 68,
          matchedCategory: "Women's Bags"
        }
      };

      setMessages([...newMessages, responseMsg]);
      setIsChatLoading(false);

      // Update merchant dashboard metrics live
      setUniqueVisitors(v => v + 1);
      setTotalRequests(r => r + 4);
      setAgentQueriesToday(q => q + 1);
      setAgentConversions(c => c + 1);

      addAgentLog({
        agent: 'ChatGPT',
        agentType: 'Shopping Agent',
        query: query,
        outcome: 'ParDa Discovered (UCP)',
        targetEndpoint: 'https://parda.com/api/ucp/products/parda-01',
        latencyMs: 68
      });

      setLastSimulatedEvent(`ChatGPT discovered ParDa via Cloudflare Registry! Merchant metrics updated.`);
    } else {
      // Merchant is NOT opted in: only big brands like Walmart appear in web indexes
      const responseMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: `Here are popular options for "${query}" from major retail stores:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        queryResults: {
          isFromCloudflareRegistry: false,
          walmartProducts: WALMART_FALLBACKS,
          ucpQueryEndpoint: 'https://registry.cloudflare.com/v1/search?q=' + encodeURIComponent(query),
          registryResponseLatency: 280,
          matchedCategory: 'Major Retail'
        }
      };

      setMessages([...newMessages, responseMsg]);
      setIsChatLoading(false);

      addAgentLog({
        agent: 'ChatGPT',
        agentType: 'Shopping Agent',
        query: query,
        outcome: 'Big Brand Indexed',
        targetEndpoint: 'https://walmart.com/search?q=' + encodeURIComponent(query),
        latencyMs: 280
      });

      setLastSimulatedEvent(`ChatGPT searched shopping index. Only major retailers appeared.`);
    }
  };

  const resetChat = () => {
    setMessages([]);
  };

  const resetDemo = () => {
    setIsOptedIn(false);
    setBotPreferenceSync(false);
    setUniqueVisitors(146);
    setTotalRequests(3320);
    setAgentQueriesToday(0);
    setAgentConversions(0);
    setAgentLogs(INITIAL_LOGS);
    setMessages([]);
    setLastSimulatedEvent('Simulator reset: ParDa is not opted in. Switch to Shopper view to test.');
  };

  return (
    <SimulatorContext.Provider
      value={{
        activeTab,
        setActiveTab,
        merchantSection,
        setMerchantSection,
        isOptedIn,
        toggleOptIn,
        botPreferenceSync,
        toggleBotPreferenceSync,
        schemaConversionActive,
        setSchemaConversionActive,
        agentReadinessScore,
        domain: 'parda.com',
        merchantName: 'ParDa',
        products: INITIAL_PRODUCTS,
        walmartProducts: WALMART_FALLBACKS,
        metrics: {
          uniqueVisitors,
          totalRequests,
          percentCached: 0.01,
          agentQueriesToday,
          agentConversions
        },
        agentLogs,
        addAgentLog,
        messages,
        isChatLoading,
        sendChatMessage,
        resetChat,
        resetDemo,
        lastSimulatedEvent
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};
