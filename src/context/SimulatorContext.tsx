import React, { createContext, useContext, useState } from 'react';
import { Product, RetailProduct, AgentLogEntry, SimulatorTab, MerchantSection, AITrendItem } from '../types/simulator';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  queryResults?: {
    isFromCloudflareRegistry: boolean;
    merchantProducts?: Product[];
    retailProducts?: RetailProduct[];
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
  retailProducts: RetailProduct[];
  aiTrends: AITrendItem[];
  selectedTrend: AITrendItem;
  setSelectedTrend: (trend: AITrendItem) => void;

  // Metrics & Logs
  metrics: {
    uniqueVisitors: number;
    totalRequests: number;
    percentCached: number;
    agentQueriesToday: number;
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

const INITIAL_RETAIL_PRODUCTS: RetailProduct[] = [
  {
    id: 'wm-01',
    title: 'Time and Tru Women’s Classic Faux Leather Tote',
    price: 22.98,
    currency: 'USD',
    retailer: 'Walmart',
    shipping: 'Free pickup today at Supercenter',
    description: 'Synthetic faux leather shoulder bag with spacious main interior and double top handles.',
    rating: 4.1,
    reviewsCount: 489,
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    badge: 'Walmart'
  },
  {
    id: 'tgt-01',
    title: 'Universal Thread Commuter Dual-Handle Tote',
    price: 28.00,
    currency: 'USD',
    retailer: 'Target',
    shipping: 'Free 2-day delivery on $35+',
    description: 'Structured vegan leather tote bag with interior laptop sleeve and magnetic snap closure.',
    rating: 4.3,
    reviewsCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80',
    badge: 'Target'
  },
  {
    id: 'amz-01',
    title: 'Everyday Classic Structured Shoulder Bag',
    price: 34.50,
    currency: 'USD',
    retailer: 'Amazon',
    shipping: 'Prime Free One-Day',
    description: 'Imported polyester-lined casual bag with multiple zip organizer pockets.',
    rating: 4.0,
    reviewsCount: 654,
    imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    badge: 'Amazon'
  }
];

const INITIAL_AI_TRENDS: AITrendItem[] = [
  {
    id: 'trend-1',
    query: "Women's Handcrafted Leather Bags",
    volume: '25K+',
    growth: '↑ 85%',
    started: 'yesterday',
    isActive: true,
    sparklinePoints: [30, 32, 35, 40, 48, 75, 95],
    categoryBreakdown: [
      { category: 'Tote & Shopper Bags', percentage: 46, queryCount: '11.5K' },
      { category: 'Crossbody & Flap Bags', percentage: 31, queryCount: '7.7K' },
      { category: 'Shoulder & Hobo Bags', percentage: 15, queryCount: '3.7K' },
      { category: 'Small Leather Clutches', percentage: 8, queryCount: '2.0K' }
    ],
    agentSummary: "AI shoppers actively specify genuine full-grain leather under $200 with artisan craftsmanship. High conversion alignment with ParDa Italian Leather Tote."
  },
  {
    id: 'trend-2',
    query: 'Minimalist Everyday Crossbody under $200',
    volume: '18K+',
    growth: '↑ 120%',
    started: '2 days ago',
    isActive: true,
    sparklinePoints: [20, 25, 28, 45, 60, 85, 100],
    categoryBreakdown: [
      { category: 'Pebble Leather Crossbody', percentage: 52, queryCount: '9.3K' },
      { category: 'Compact Phone & Card Bags', percentage: 28, queryCount: '5.0K' },
      { category: 'Convertible Strap Bags', percentage: 20, queryCount: '3.6K' }
    ],
    agentSummary: "Queries surge for water-resistant, durable everyday carry bags. Direct match with ParDa Minimalist City Crossbody."
  },
  {
    id: 'trend-3',
    query: 'Full-Grain Tuscan Leather Totes',
    volume: '12K+',
    growth: '↑ 65%',
    started: '3 days ago',
    isActive: true,
    sparklinePoints: [40, 42, 45, 50, 62, 78, 88],
    categoryBreakdown: [
      { category: 'Vegetable-Tanned Totes', percentage: 58, queryCount: '7.0K' },
      { category: 'Unlined Work Totes', percentage: 27, queryCount: '3.2K' },
      { category: 'Zippered Travel Handbags', percentage: 15, queryCount: '1.8K' }
    ],
    agentSummary: "Shoppers asking LLMs for European artisan heritage brands without retail markups."
  },
  {
    id: 'trend-4',
    query: 'Slim RFID-Shielded Leather Wallets',
    volume: '8K+',
    growth: '↑ 40%',
    started: '4 days ago',
    isActive: true,
    sparklinePoints: [50, 48, 52, 55, 60, 68, 72],
    categoryBreakdown: [
      { category: 'Bifold Wallets', percentage: 60, queryCount: '4.8K' },
      { category: 'Card Holders', percentage: 30, queryCount: '2.4K' },
      { category: 'Coin & Key Wallets', percentage: 10, queryCount: '800' }
    ],
    agentSummary: "Gifting and accessory queries seeking slim profile and genuine chestnut leather."
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

  // Trends
  const [aiTrends] = useState<AITrendItem[]>(INITIAL_AI_TRENDS);
  const [selectedTrend, setSelectedTrend] = useState<AITrendItem>(INITIAL_AI_TRENDS[0]);

  const [agentLogs, setAgentLogs] = useState<AgentLogEntry[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Agent Readiness Score
  const agentReadinessScore = isOptedIn ? 98 : (botPreferenceSync ? 54 : 32);

  const toggleOptIn = (override?: boolean) => {
    const nextVal = override !== undefined ? override : !isOptedIn;
    setIsOptedIn(nextVal);
    if (nextVal) {
      setBotPreferenceSync(true);
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
    }
  };

  const toggleBotPreferenceSync = () => {
    const next = !botPreferenceSync;
    setBotPreferenceSync(next);
    if (next && !isOptedIn) {
      setIsOptedIn(true);
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

    await new Promise(res => setTimeout(res, 900));

    if (isOptedIn) {
      // WHEN OPTED IN: One is from ParDa, the other is from Walmart!
      const responseMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: `Here are top recommendations for "${query}", including independent label **ParDa** and major retailer options:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        queryResults: {
          isFromCloudflareRegistry: true,
          merchantProducts: [INITIAL_PRODUCTS[0]], // ParDa Handcrafted Tote
          retailProducts: [INITIAL_RETAIL_PRODUCTS[0]], // Walmart Time and Tru Tote
          ucpQueryEndpoint: 'https://registry.cloudflare.com/v1/search?q=' + encodeURIComponent(query),
          registryResponseLatency: 68,
          matchedCategory: "Women's Bags"
        }
      };

      setMessages([...newMessages, responseMsg]);
      setIsChatLoading(false);

      setUniqueVisitors(v => v + 1);
      setTotalRequests(r => r + 4);
      setAgentQueriesToday(q => q + 1);

      addAgentLog({
        agent: 'ChatGPT',
        agentType: 'Shopping Agent',
        query: query,
        outcome: 'ParDa Discovered (UCP)',
        targetEndpoint: 'https://parda.com/api/ucp/products/parda-01',
        latencyMs: 68
      });
    } else {
      // WHEN NOT OPTED IN: Only big brands (Walmart AND Target, not Walmart alone!)
      const responseMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: `Here are popular options for "${query}" from major retail stores:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        queryResults: {
          isFromCloudflareRegistry: false,
          retailProducts: [INITIAL_RETAIL_PRODUCTS[0], INITIAL_RETAIL_PRODUCTS[1]], // Walmart AND Target!
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
    setAgentLogs([]);
    setMessages([]);
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
        retailProducts: INITIAL_RETAIL_PRODUCTS,
        aiTrends,
        selectedTrend,
        setSelectedTrend,
        metrics: {
          uniqueVisitors,
          totalRequests,
          percentCached: 0.01,
          agentQueriesToday
        },
        agentLogs,
        addAgentLog,
        messages,
        isChatLoading,
        sendChatMessage,
        resetChat,
        resetDemo
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
