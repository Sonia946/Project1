import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  Search,
  Check,
  ShieldCheck,
  Radio,
  ExternalLink,
  MessageSquare,
  Users,
  Smile,
  BarChart3
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export const DataSourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const { twitterHandle, isAnalyzing, analyzeTwitterAccount, twitterProfile } = useAnalysis();

  const [inputHandle, setInputHandle] = useState(twitterHandle.replace(/^@/, ''));
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analyzedSuccess, setAnalyzedSuccess] = useState(false);

  const quickHandles = [
    { handle: 'elonmusk', label: 'Elon Musk' },
    { handle: 'OpenAI', label: 'OpenAI' },
    { handle: 'sama', label: 'Sam Altman' },
    { handle: 'GoogleDeepMind', label: 'DeepMind' },
    { handle: 'socialpulse_ai', label: 'SocialPulse AI' }
  ];

  const handleAnalyze = async (handleToAnalyze?: string) => {
    const target = (handleToAnalyze || inputHandle).trim().replace(/^@/, '');
    if (!target) return;

    setAnalyzedSuccess(false);
    setAnalysisStep(1);

    const stepTimer = setInterval(() => {
      setAnalysisStep(prev => {
        if (prev >= 3) {
          clearInterval(stepTimer);
          return 3;
        }
        return prev + 1;
      });
    }, 280);

    await analyzeTwitterAccount(target);
    clearInterval(stepTimer);
    setAnalysisStep(0);
    setAnalyzedSuccess(true);
  };

  const steps = [
    'Connecting to live X (Twitter) stream...',
    'Scraping account mentions & post telemetry...',
    'Running neural sentiment & network cascade modeling...',
    'Analysis complete!'
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Data Sources & Stream Ingestion
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Connect your X (Twitter) account or handle to ingest live mentions, tweets, and community cascades.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: SELECT DATA SOURCE (Only X) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Data Source
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected
              </span>
            </div>

            {/* ONLY X / TWITTER */}
            <div className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50/20 flex items-start gap-3.5 transition-all">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shrink-0 shadow-subtle">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">X (Twitter)</h4>
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  Real-time firehose streaming, mentions, and cascade topology.
                </p>
                <div className="mt-2 text-[10px] text-blue-700 font-mono font-semibold">
                  Protocol: X API v2 Firehose (Demo Stream)
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Integration
              </span>
              <span className="font-mono">Latency: 28ms</span>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>How Analysis Works</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Enter any public Twitter / X handle. The SocialPulse AI engine analyzes public mentions, sentiment distribution, and viral cascade graphs in real-time.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: TWITTER ID INPUT & ANALYZE ACTION */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Input Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card">
            <div className="mb-5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Step 1: Account Specification
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Enter Twitter / X Account ID
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Type any Twitter handle to run real-time sentiment, trend, and audience intelligence analysis.
              </p>
            </div>

            {/* Input & Analyze Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAnalyze();
              }}
              className="space-y-4"
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-base">
                  @
                </div>
                <input
                  type="text"
                  value={inputHandle}
                  onChange={(e) => setInputHandle(e.target.value)}
                  placeholder="elonmusk, OpenAI, sama, tech_lead..."
                  className="w-full pl-9 pr-32 py-3.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing || !inputHandle.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-40"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analyze</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Suggestions */}
              <div>
                <div className="text-[11px] font-semibold text-slate-500 mb-2">
                  Or select a popular account to test:
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickHandles.map((item) => (
                    <button
                      key={item.handle}
                      type="button"
                      onClick={() => {
                        setInputHandle(item.handle);
                        handleAnalyze(item.handle);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-xs font-medium text-slate-700 transition-all"
                    >
                      <span className="text-slate-400">@</span>
                      <span>{item.handle}</span>
                      <span className="text-[10px] text-slate-400">({item.label})</span>
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Analyzing Progress State */}
            {isAnalyzing && (
              <div className="mt-6 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                  <div className="flex-1">
                    <div className="text-xs font-bold text-blue-900">
                      {steps[analysisStep] || 'Processing Twitter intelligence...'}
                    </div>
                    <div className="w-full bg-blue-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.max(25, (analysisStep + 1) * 25)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ANALYZED PROFILE RESULT CARD */}
          {twitterProfile && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-card space-y-6 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-subtle shadow-blue-500/20">
                    {twitterProfile.avatarText}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-slate-900">
                        {twitterProfile.displayName}
                      </h3>
                      {twitterProfile.verified && (
                        <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Analyzed
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      {twitterProfile.handle}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 max-w-lg leading-relaxed">
                      {twitterProfile.bio}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-subtle transition-all"
                  >
                    <span>View on Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Stream: Active (24h)
                  </span>
                </div>
              </div>

              {/* 4 Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Followers</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {twitterProfile.followers}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Audience tracked
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Posts Scanned</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {twitterProfile.totalTweetsScanned.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                    Live window
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Overall Polarity</div>
                  <div className="text-lg font-bold text-emerald-600 mt-0.5">
                    {twitterProfile.sentimentScore}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Positive bias
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] text-slate-500 font-medium">Engagement Rate</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">
                    {twitterProfile.engagementRate}
                  </div>
                  <div className="text-[10px] text-purple-600 font-semibold mt-0.5">
                    Top 5% on X
                  </div>
                </div>
              </div>

              {/* Sentiment Polarity Distribution */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-800">
                    Sentiment Polarity Breakdown:
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-emerald-600 font-bold">{twitterProfile.positivePct}% Pos</span>
                    <span className="text-slate-500 font-bold">{twitterProfile.neutralPct}% Neu</span>
                    <span className="text-rose-600 font-bold">{twitterProfile.negativePct}% Neg</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 flex overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${twitterProfile.positivePct}%` }}
                    title={`Positive: ${twitterProfile.positivePct}%`}
                  />
                  <div
                    className="bg-slate-400 h-full transition-all duration-500"
                    style={{ width: `${twitterProfile.neutralPct}%` }}
                    title={`Neutral: ${twitterProfile.neutralPct}%`}
                  />
                  <div
                    className="bg-rose-500 h-full transition-all duration-500"
                    style={{ width: `${twitterProfile.negativePct}%` }}
                    title={`Negative: ${twitterProfile.negativePct}%`}
                  />
                </div>
              </div>

              {/* Top Hashtags & Topics */}
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  Top Detected Topic Hashtags:
                </div>
                <div className="flex flex-wrap gap-2">
                  {twitterProfile.topHashtags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Tweets Sample */}
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2.5">
                  Recent Scanned Posts & Polarity:
                </div>
                <div className="space-y-2">
                  {twitterProfile.recentTweets.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <p className="text-slate-800 font-medium flex-1">
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-3 shrink-0 text-[11px]">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            t.sentiment === 'Positive'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {t.sentiment}
                        </span>
                        <span className="text-slate-400 font-mono">{t.timeAgo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
