import React, { useState, useRef, useEffect } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { 
  Plus, 
  Mic, 
  Volume2, 
  Send, 
  ChevronDown, 
  PanelLeft, 
  Sparkles, 
  Image as ImageIcon, 
  Zap, 
  HelpCircle, 
  Settings, 
  ExternalLink,
  Search,
  ShoppingBag,
  CheckCircle,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Compass,
  Check
} from 'lucide-react';

export const ChatGPTInterface: React.FC = () => {
  const { 
    messages, 
    isChatLoading, 
    sendChatMessage, 
    resetChat,
    isOptedIn 
  } = useSimulator();

  const [inputQuery, setInputQuery] = useState('');
  const [selectedProductAction, setSelectedProductAction] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isChatLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || isChatLoading) return;
    const q = inputQuery;
    setInputQuery('');
    sendChatMessage(q);
  };

  const handleChipClick = (query: string) => {
    if (isChatLoading) return;
    sendChatMessage(query);
  };

  const handleProductCardClick = (title: string, actionName: string) => {
    setSelectedProductAction(`${actionName}: ${title}`);
    setTimeout(() => {
      setSelectedProductAction(null);
    }, 3000);
  };

  return (
    <div className="flex h-full w-full bg-[#212121] text-[#ECECEC] font-sans overflow-hidden select-none">
      {/* ChatGPT Dark Sidebar */}
      <aside className="w-72 bg-[#171717] border-r border-[#2F2F2F] flex flex-col justify-between p-4 hidden lg:flex text-sm flex-shrink-0">
        <div className="space-y-5">
          <div className="flex items-center justify-between px-2 py-1">
            <button className="flex items-center space-x-2 text-white font-semibold hover:bg-[#212121] px-3 py-2 rounded-xl transition text-base">
              <span>ChatGPT</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
            <button className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-[#212121] transition">
              <PanelLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-1.5 text-[#C4C4C4] text-sm">
            <button
              onClick={resetChat}
              className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left cursor-pointer"
            >
              <Plus className="w-5 h-5 text-white" />
              <span className="font-semibold text-white">New chat</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left">
              <ImageIcon className="w-5 h-5" />
              <span>Images</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left">
              <Zap className="w-5 h-5" />
              <span>Plugins</span>
            </button>

            <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5" />
                <span>See plans and pricing</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </button>

            <button className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5" />
                <span>Help</span>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-500" />
            </button>

            <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left">
              <Compass className="w-5 h-5" />
              <span>Deep research</span>
            </button>

            <button className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl hover:bg-[#212121] hover:text-white transition text-left">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        <div className="bg-[#212121] border border-[#2F2F2F] rounded-2xl p-4 space-y-3">
          <div className="text-sm font-bold text-white">Get responses tailored to you</div>
          <p className="text-xs text-[#A0A0A0] leading-relaxed">
            Log in to get answers based on saved chats, plus discover independent merchants with Cloudflare UCP.
          </p>
          <button className="w-full py-2 bg-[#2F2F2F] hover:bg-[#3D3D3D] text-white rounded-xl text-xs font-bold transition border border-[#3E3E3E] cursor-pointer">
            Log in
          </button>
        </div>
      </aside>

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
        {/* Top ChatGPT bar */}
        <div className="h-16 border-b border-[#2F2F2F] flex items-center justify-between px-8 z-10 bg-[#212121]/95 backdrop-blur-sm flex-shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-white text-lg">ChatGPT</span>
            <span className="bg-[#2F2F2F] text-gray-400 text-xs px-3 py-1 rounded-full font-mono">
              Shopping Agent • UCP Enabled
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-xs font-bold hover:bg-gray-100 transition cursor-pointer">
              Log in
            </button>
            <button className="px-4 py-2 bg-[#2F2F2F] text-white rounded-full text-xs font-bold hover:bg-[#3B3B3B] transition border border-[#3E3E3E] cursor-pointer">
              Sign up for free
            </button>
          </div>
        </div>

        {/* In-chat interaction pill (no redirects) */}
        {selectedProductAction && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-emerald-950 border border-emerald-500/50 text-emerald-200 px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center space-x-2 z-40 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{selectedProductAction} (Simulated In-App Action)</span>
          </div>
        )}

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center space-y-8 my-auto pt-12">
              <h2 className="text-4xl font-bold text-white tracking-tight">
                Where should we begin?
              </h2>

              {/* Sample Prompts Pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleChipClick("Women's bag under $200")}
                  className="px-5 py-3 bg-[#2F2F2F] hover:bg-[#383838] border border-[#3E3E3E] rounded-full text-sm font-medium text-[#ECECEC] transition flex items-center space-x-2.5 cursor-pointer shadow-md group"
                >
                  <ShoppingBag className="w-4 h-4 text-cf-orange group-hover:scale-110 transition" />
                  <span>"Women's bag under $200"</span>
                  <span className="text-xs bg-orange-950/90 text-orange-400 px-2 py-0.5 rounded-full font-mono font-semibold">
                    Simulate
                  </span>
                </button>

                <button
                  onClick={() => handleChipClick("Handcrafted Italian leather tote")}
                  className="px-5 py-3 bg-[#2F2F2F] hover:bg-[#383838] border border-[#3E3E3E] rounded-full text-sm font-medium text-[#ECECEC] transition flex items-center space-x-2.5 cursor-pointer shadow-md"
                >
                  <span>"Handcrafted Italian leather tote"</span>
                </button>

                <button
                  onClick={() => handleChipClick("Slim minimalist leather wallet")}
                  className="px-5 py-3 bg-[#2F2F2F] hover:bg-[#383838] border border-[#3E3E3E] rounded-full text-sm font-medium text-[#ECECEC] transition flex items-center space-x-2.5 cursor-pointer shadow-md"
                >
                  <span>"Slim minimalist leather wallet"</span>
                </button>
              </div>

              {/* Status Note */}
              <div className="p-4 bg-[#171717] rounded-2xl border border-[#2F2F2F] text-xs text-gray-400 max-w-lg text-center leading-relaxed">
                Currently, merchant <strong className="text-white">ParDa</strong> is{' '}
                <span className={isOptedIn ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                  {isOptedIn ? 'OPTED IN' : 'NOT OPTED IN'}
                </span>{' '}
                to the Cloudflare Registry.{' '}
                {isOptedIn ? (
                  <span>AI agent recommendations include ParDa alongside major retailers.</span>
                ) : (
                  <span>Only major retailers (Walmart, Target) will appear in search results.</span>
                )}
              </div>
            </div>
          ) : (
            /* Active Message Flow */
            <div className="max-w-4xl mx-auto space-y-8">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-4">
                  {msg.sender === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-[#2F2F2F] text-[#ECECEC] px-5 py-3 rounded-3xl max-w-xl text-base border border-[#3E3E3E] shadow-sm leading-relaxed">
                        {msg.content}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-[#10A37F] flex items-center justify-center flex-shrink-0 mt-0.5 text-white font-bold text-sm shadow-md">
                        <Sparkles className="w-4 h-4" />
                      </div>

                      <div className="flex-1 space-y-4 overflow-hidden text-base">
                        {/* Agent Protocol Reasoning Callout */}
                        {msg.queryResults && (
                          <div className="p-3.5 bg-[#1A1A1A] border border-[#2F2F2F] rounded-xl text-xs font-mono space-y-2">
                            <div className="flex items-center justify-between text-gray-400">
                              <span className="flex items-center space-x-2 text-cf-orange font-semibold">
                                <Search className="w-4 h-4 animate-pulse" />
                                <span>Agent Registry Query (UCP Protocol)</span>
                              </span>
                              <span className="text-gray-500 font-mono">{msg.queryResults.registryResponseLatency}ms</span>
                            </div>
                            <div className="text-gray-300 truncate">
                              GET {msg.queryResults.ucpQueryEndpoint}
                            </div>
                            <div className="flex items-center space-x-2 text-xs pt-1 border-t border-[#2A2A2A]">
                              <span className="text-gray-400">Registry Result:</span>
                              {msg.queryResults.isFromCloudflareRegistry ? (
                                <span className="text-emerald-400 font-semibold">
                                  ✓ ParDa UCP Indexed + Major Retail Match
                                </span>
                              ) : (
                                <span className="text-gray-400 font-semibold">
                                  Standard Web Index (Walmart, Target)
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="text-[#ECECEC] leading-relaxed text-base font-normal">
                          {msg.content}
                        </div>

                        {/* PRODUCT CARDS DISPLAY */}
                        <div className="space-y-4 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* IF OPTED IN: Show 1 from ParDa AND 1 from Walmart! */}
                            {msg.queryResults?.isFromCloudflareRegistry && msg.queryResults.merchantProducts?.map((p) => (
                              <div
                                key={p.id}
                                className="bg-[#262626] border border-[#3E3E3E] rounded-2xl p-4 space-y-3 hover:border-cf-orange transition group shadow-md"
                              >
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                                  <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                  />
                                  <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center space-x-1.5 shadow-sm">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    <span>Cloudflare UCP Verified</span>
                                  </div>
                                  <div className="absolute bottom-2.5 right-2.5 bg-cf-orange text-white font-extrabold text-sm px-2.5 py-1 rounded-lg shadow-md">
                                    ${p.price} USD
                                  </div>
                                </div>

                                <div>
                                  <div className="text-base font-bold text-white line-clamp-1">{p.title}</div>
                                  <div className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                                    {p.description}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-[#333] text-xs">
                                  <span className="text-gray-400 font-medium">Merchant:</span>
                                  <span className="text-cf-orange font-bold font-mono">parda.com</span>
                                </div>

                                <div className="flex items-center space-x-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => handleProductCardClick(p.title, "View Details")}
                                    className="flex-1 py-2 bg-[#333] hover:bg-[#444] text-white rounded-xl text-center text-xs font-semibold transition cursor-pointer"
                                  >
                                    View Product
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleProductCardClick(p.title, "Agent Purchase Initiated")}
                                    className="flex-1 py-2 bg-cf-orange hover:bg-cf-darkOrange text-white rounded-xl text-center text-xs font-bold transition shadow-sm cursor-pointer"
                                  >
                                    Buy via Agent
                                  </button>
                                </div>
                              </div>
                            ))}

                            {/* RETAIL PRODUCTS (Walmart / Target) */}
                            {msg.queryResults?.retailProducts?.map((p) => (
                              <div
                                key={p.id}
                                className="bg-[#262626] border border-[#3E3E3E] rounded-2xl p-4 space-y-3 shadow-md"
                              >
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black/40">
                                  <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className={`absolute top-2.5 left-2.5 text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm ${
                                    p.retailer === 'Walmart' 
                                      ? 'bg-blue-900/90 text-blue-200 border-blue-400/30' 
                                      : 'bg-red-900/90 text-red-200 border-red-400/30'
                                  }`}>
                                    {p.badge}
                                  </div>
                                  <div className="absolute bottom-2.5 right-2.5 bg-slate-800 text-white font-extrabold text-sm px-2.5 py-1 rounded-lg">
                                    ${p.price} USD
                                  </div>
                                </div>

                                <div>
                                  <div className="text-base font-bold text-white line-clamp-1">{p.title}</div>
                                  <div className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                                    {p.description}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-[#333] text-xs">
                                  <span className="text-gray-400">Store:</span>
                                  <span className="text-gray-200 font-bold">{p.retailer}</span>
                                </div>

                                <div className="pt-1">
                                  <button
                                    type="button"
                                    onClick={() => handleProductCardClick(p.title, `Selected ${p.retailer} Item`)}
                                    className="w-full py-2 bg-[#333] hover:bg-[#3D3D3D] text-gray-200 rounded-xl text-center text-xs font-semibold transition cursor-pointer"
                                  >
                                    View on {p.retailer}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action buttons under response */}
                        <div className="flex items-center space-x-4 text-gray-500 pt-2 text-sm">
                          <button className="hover:text-white transition cursor-pointer">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="hover:text-white transition cursor-pointer">
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button className="hover:text-white transition cursor-pointer">
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                          <button className="hover:text-white transition cursor-pointer">
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isChatLoading && (
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#10A37F] flex items-center justify-center text-white text-sm font-bold animate-pulse">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Search className="w-4 h-4 animate-spin text-cf-orange" />
                      <span>Searching product catalogs and registry...</span>
                    </div>
                    <div className="h-4 w-60 bg-[#2F2F2F] rounded-lg animate-pulse"></div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Bottom Pill Input Form */}
        <div className="p-5 md:px-16 bg-gradient-to-t from-[#212121] via-[#212121] to-transparent flex-shrink-0">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative bg-[#2F2F2F] border border-[#3E3E3E] rounded-full px-5 py-3.5 flex items-center space-x-3.5 shadow-xl focus-within:border-gray-500 transition">
              <button
                type="button"
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-[#3D3D3D] transition cursor-pointer"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask ChatGPT"
                className="flex-1 bg-transparent text-white text-base focus:outline-none placeholder-gray-400"
              />

              {inputQuery.trim() ? (
                <button
                  type="submit"
                  disabled={isChatLoading}
                  className="w-9 h-9 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-gray-200 transition shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center space-x-2 text-gray-400">
                  <button type="button" className="p-1 hover:text-white transition cursor-pointer">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-1.5 rounded-full bg-cf-blue text-white hover:bg-blue-600 transition cursor-pointer">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {messages.length === 0 && (
              <div className="flex justify-center mt-3.5">
                <button
                  type="button"
                  onClick={() => handleChipClick("How do shopping agents use the Cloudflare Commerce Registry?")}
                  className="px-4 py-1.5 bg-[#2F2F2F] hover:bg-[#383838] border border-[#3E3E3E] text-xs font-medium text-gray-300 rounded-full transition cursor-pointer"
                >
                  What can you do?
                </button>
              </div>
            )}

            <div className="text-center text-xs text-gray-500 mt-2.5">
              ChatGPT is AI. By using it, you agree to our Terms & Privacy Policy. Discovering merchants via Cloudflare UCP Open Registry.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
