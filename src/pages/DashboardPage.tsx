import React, { useState } from 'react';
import {
  MessageSquare,
  Users,
  TrendingUp,
  Smile,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Database
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { KPICard } from '../components/KPICard';
import { ChartCard } from '../components/ChartCard';
import { AlertCard } from '../components/AlertCard';
import {
  dashboardStats,
  sentimentTimeline24h,
  liveIntelligenceFeed,
  trendingTopics,
  platformActivity
} from '../data/mockData';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const context = useOutletContext<{ openReportModal: () => void }>();
  const [timelineMetric, setTimelineMetric] = useState<'all' | 'positive' | 'negative'>('all');
  const { analysisResults, twitterHandle, twitterProfile } = useAnalysis();
  const stats = analysisResults?.dashboardStats || dashboardStats;
  const timeline = analysisResults?.sentimentTimeline || sentimentTimeline24h;
  const topics = analysisResults?.trendingTopics || trendingTopics;
  const activity = analysisResults?.platformActivity || platformActivity;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner with Quick Report Generator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Active X (Twitter) Source: <strong className="font-mono text-slate-900">{twitterHandle}</strong></span>
            <span className="text-blue-300">•</span>
            <button
              onClick={() => navigate('/data-sources')}
              className="text-blue-600 hover:text-blue-800 underline text-[11px] font-medium"
            >
              Analyze New ID
            </button>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Social Intelligence Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time Twitter stream insights, neural polarity trajectories, and community cascade topology.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          {/* <button
            onClick={() => context?.openReportModal()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-subtle transition-all shadow-blue-500/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate Intelligence Report
          </button> */}
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="TOTAL POSTS"
          value={stats?.totalPosts || 0}
          change={stats?.totalPostsChange || 0}
          icon={MessageSquare}
          sparklineData={stats?.sparklines.posts || []}
        />
        <KPICard
          title="ACTIVE ACCOUNTS"
          value={stats?.activeAccounts || 0}
          change={stats?.activeAccountsChange || 0}
          icon={Users}
          sparklineData={stats?.sparklines.accounts || []}
        />
        <KPICard
          title="TRENDING TOPICS"
          value={stats?.trendingTopics || 0}
          change={32.4}
          changeLabel="+8 new"
          icon={TrendingUp}
          sparklineData={stats?.sparklines.topics || []}
          badgeText="+8 new"
        />
        <KPICard
          title="OVERALL SENTIMENT"
          value={`${stats?.overallSentiment || 0}%`}
          change={stats?.overallSentimentChange || 0}
          icon={Smile}
          sparklineData={stats?.sparklines.sentiment || []}
          badgeText="Healthy Polarity"
        />
      </div>

      {/* MAIN SECTION: LEFT Sentiment Timeline, RIGHT Live Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sentiment Timeline (8 cols) */}
        <div className="lg:col-span-8">
          <ChartCard
            title="Sentiment Timeline"
            subtitle="Percentage distribution of emotional polarity across all platforms (24h)"
            badge="Hourly Aggregate"
            actions={
              <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setTimelineMetric('all')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    timelineMetric === 'all'
                      ? 'bg-white text-slate-900 shadow-subtle'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Signals
                </button>
                <button
                  onClick={() => setTimelineMetric('positive')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    timelineMetric === 'positive'
                      ? 'bg-white text-emerald-700 shadow-subtle'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Positive Only
                </button>
                <button
                  onClick={() => setTimelineMetric('negative')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    timelineMetric === 'negative'
                      ? 'bg-white text-rose-700 shadow-subtle'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Negative Only
                </button>
              </div>
            }
          >
            <div className="h-72 sm:h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={timeline}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="neuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="negGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="time"
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
                      fontSize: '12px',
                    }}
                    formatter={(value: any, name: any) => [
                      `${value}%`,
                      name === 'positive'
                        ? 'Positive'
                        : name === 'neutral'
                        ? 'Neutral'
                        : 'Negative',
                    ]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(val) =>
                      val === 'positive'
                        ? 'Positive'
                        : val === 'neutral'
                        ? 'Neutral'
                        : 'Negative'
                    }
                  />

                  {(timelineMetric === 'all' || timelineMetric === 'positive') && (
                    <Area
                      type="monotone"
                      dataKey="positive"
                      stroke="#16A34A"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#posGrad)"
                    />
                  )}

                  {timelineMetric === 'all' && (
                    <Area
                      type="monotone"
                      dataKey="neutral"
                      stroke="#64748B"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#neuGrad)"
                    />
                  )}

                  {(timelineMetric === 'all' || timelineMetric === 'negative') && (
                    <Area
                      type="monotone"
                      dataKey="negative"
                      stroke="#DC2626"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#negGrad)"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                Negative spike observed at 15:00 UTC (44% negative during GPU export commentary)
              </span>
              <button
                onClick={() => navigate('/sentiment')}
                className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                Detailed Analysis <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </ChartCard>
        </div>

        {/* Live Intelligence Feed (4 cols) */}
        <div className="lg:col-span-4 flex flex-col">
          <ChartCard
            title="Live Intelligence"
            subtitle="Autonomous anomaly and cascade telemetry"
            badge="Streaming"
            badgeColor="green"
            className="h-full flex flex-col justify-between"
            actions={
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            }
          >
            <div className="space-y-3 flex-1">
              {liveIntelligenceFeed.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>

            <button
              onClick={() => navigate('/ai-insights')}
              className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              Open AI Intelligence Center
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </ChartCard>
        </div>
      </div>

      {/* BELOW: TRENDING TOPICS + PLATFORM ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trending Topics (7 cols) */}
        <div className="lg:col-span-7">
          <ChartCard
            title="Trending Topics"
            subtitle="Ranked by multi-platform mention volume and hourly velocity"
            badge="Top Mentions"
            actions={
              <button
                onClick={() => navigate('/trends')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View all trends <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="pb-2.5 font-semibold">Topic</th>
                    <th className="pb-2.5 font-semibold text-right">Mentions</th>
                    <th className="pb-2.5 font-semibold text-right">Growth</th>
                    <th className="pb-2.5 font-semibold text-right">Polarity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {topics.slice(0, 5).map((topic) => (
                    <tr
                      key={topic.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => navigate('/trends')}
                    >
                      <td className="py-3">
                        <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {topic.tag}
                        </div>
                        <div className="text-[11px] text-slate-400">{topic.name}</div>
                      </td>
                      <td className="py-3 text-right font-mono font-medium text-slate-800">
                        {topic.mentions.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <span className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
                          <ArrowUpRight className="w-3 h-3" />
                          +{topic.growth}%
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                            topic.sentiment === 'positive'
                              ? 'bg-emerald-50 text-emerald-700'
                              : topic.sentiment === 'negative'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {topic.sentimentScore}% {topic.sentiment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>
        </div>

        {/* Platform Activity (5 cols) */}
        <div className="lg:col-span-5">
          <ChartCard
            title="Platform Activity"
            subtitle="Volume and share distribution across active data pipelines"
            badge="5 Feeds"
            actions={
              <span className="text-xs text-slate-400 font-mono">
                Total: 1.28M
              </span>
            }
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activity}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="platform"
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#E2E8F0' }}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${Number(val).toLocaleString()} posts`, 'Volume']}
                  />
                  <Bar
                    dataKey="posts"
                    fill="#2563EB"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-5 gap-2 text-center text-xs">
              {activity.map((p) => (
                <div key={p.platform} className="p-1 rounded hover:bg-slate-50">
                  <div className="text-[10px] text-slate-400 font-medium">{p.platform}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{p.share}%</div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};
