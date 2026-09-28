import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User as UserIcon,
  HelpCircle,
  FileText,
  AlertTriangle,
  TrendingUp,
  Share2,
  CheckCircle2,
  Download,
  Info
} from 'lucide-react';
import { ChartCard } from '../components/ChartCard';
import {
  suggestedAIQuestions,
  mockAIResponses,
  aiInsightItems
} from '../data/mockData';
import { useAnalysis } from '../context/AnalysisContext';
import { NoDataset } from '../components/NoDataset';
import { useOutletContext } from 'react-router-dom';

interface ChatEntry {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  clusters?: { name: string; percentage: number }[];
  propagationPath?: string[];
  disclaimer?: string;
  timestamp: string;
}

export const AIInsightsPage: React.FC = () => {
  const { analysisResults } = useAnalysis();
  const insights = analysisResults ? aiInsightItems.map((item, i) => ({ ...item, title: i === 0 ? `Emerging Topic: ${analysisResults.trendingTopics[0]?.name || 'Uploaded conversation'}` : item.title, summary: i === 0 ? `${analysisResults.dashboardStats.totalPosts} uploaded records were analyzed with deterministic frontend heuristics.` : item.summary })) : aiInsightItems;
  const context = useOutletContext<{ openReportModal: () => void; showToast?: (type: any, msg: string, title?: string) => void }>();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [chatLog, setChatLog] = useState<ChatEntry[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: "Hello! I am SocialPulse AI, your continuous neural intelligence assistant. I analyze multi-platform data streams, cluster topic cascades, and calculate sentiment divergence in real time.\n\nSelect a recommended analysis below or ask your own question about today's social signals.",
      timestamp: 'Just now'
    }
  ]);

  const handleSendQuestion = (question: string) => {
    if (!question.trim()) return;

    const userEntry: ChatEntry = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: question,
      timestamp: 'Just now'
    };

    setChatLog((prev) => [...prev, userEntry]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      // Find matching mock response or fallback
      const foundMock = mockAIResponses[question] || {
        text: `Analysis for "${question}":\n\nCross-referencing 1.28M real-time posts indicates high engagement within developer and policy communities. Key metrics show consistent sentiment stability with isolated velocity bursts in #ArtificialIntelligence (+187%) and #AIRegulation (+213%).`,
        clusters: [
          { name: 'Core Narrative', percentage: 54 },
          { name: 'Secondary Spillover', percentage: 28 },
          { name: 'Peripheral Noise', percentage: 18 }
        ],
        disclaimer: 'This represents correlation in the observed dataset and does not establish causation.'
      };

      const aiEntry: ChatEntry = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: foundMock.text,
        clusters: foundMock.clusters,
        propagationPath: foundMock.propagationPath,
        disclaimer: foundMock.disclaimer,
        timestamp: 'Just now'
      };

      setChatLog((prev) => [...prev, aiEntry]);
      setIsTyping(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendQuestion(inputText);
  };

  if (!analysisResults) return <NoDataset />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI Intelligence Center
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Autonomous neural synthesis, natural language inquiry, and automated executive intelligence reporting.
          </p>
        </div>

        {/* Generate Intelligence Report Button */}
        {/* <button
          onClick={() => context?.openReportModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <FileText className="w-4 h-4" />
          Generate Intelligence Report
        </button> */}
      </div>

      {/* AI INSIGHT CARDS (3 Cards from specs) */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Active Autonomous Neural Alerts</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.status === 'Critical'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : item.status === 'High'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.summary}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Recommended Actions:</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-500 mb-3">
                  {item.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Impact Score</span>
                  <span className="font-mono font-bold text-blue-600">{item.impactScore}/100</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CARD: "ASK SOCIALPULSE AI" CHAT INTERFACE */}
      {/* <ChartCard
        title="Ask SocialPulse AI"
        subtitle="Natural language conversational queries over streaming intelligence"
        badge="Neural NLP"
        badgeColor="blue"
      > */}
        {/* Suggested Questions Pills */}
        {/* <div className="mb-4 pb-3 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Suggested Inquiries (Click to run):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedAIQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendQuestion(q)}
                className="text-xs bg-slate-50 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-all text-left font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        </div> */}

        {/* Chat History Box */}
        {/* <div className="min-h-[320px] max-h-[500px] overflow-y-auto space-y-4 pr-1 mb-4">
          {chatLog.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            > */}
              {/* <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-subtle ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-white'
                }`}
              > */}
                {/* {msg.sender === 'user' ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div> */}

              {/* <div
                className={`p-4 rounded-2xl max-w-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-none shadow-subtle'
                }`}
              > */}
                {/* <div className="whitespace-pre-line font-normal">{msg.text}</div> */}

                {/* Clusters breakdown if provided */}
                {/* {msg.clusters && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
                    <div className="font-bold text-[11px] text-slate-700 uppercase tracking-wider">
                      Associated Topic Clusters:
                    </div>
                    {msg.clusters.map((c) => (
                      <div key={c.name} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-600 font-medium">{c.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${c.percentage}%` }}
                            />
                          </div>
                          <span className="font-mono font-bold text-slate-800">{c.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}

                {/* Propagation Path if provided */}
                {/* {msg.propagationPath && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80">
                    <div className="font-bold text-[11px] text-slate-700 uppercase tracking-wider mb-1.5">
                      Cascade Sequence:
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                      {msg.propagationPath.map((step, idx) => (
                        <React.Fragment key={step}>
                          <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold text-slate-800">
                            {step}
                          </span>
                          {idx < msg.propagationPath!.length - 1 && (
                            <span className="text-slate-400">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* Mandatory Disclaimer */}
                {/* {msg.disclaimer && (
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 italic flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{msg.disclaimer}</span>
                  </div>
                )}
              </div>
            </div>
          ))} */}

          {/* {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                <span>Synthesizing multi-platform graph correlation...</span>
              </div>
            </div>
          )}
        </div> */}

        {/* Input Form */}
        {/* <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask why sentiment changed, what is trending, or how a topic spread..."
            className="w-full pl-4 pr-24 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-all disabled:opacity-40 flex items-center gap-1"
          >
            <span>Query</span>
            <Send className="w-3 h-3" />
          </button>
        </form> */}
      {/* {/* </ChartCard> */}
     </div> 
  );
};
