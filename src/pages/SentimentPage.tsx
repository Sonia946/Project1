import React, { useState, useMemo } from 'react';
import {
  Smile,
  Meh,
  Frown,
  TrendingUp,
  Filter,
  BarChart2,
  Share2,
  Clock,
  Sparkles,
  ShieldCheck,
  Search
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
import { ChartCard } from '../components/ChartCard';
import { EmotionBreakdown } from '../components/EmotionBreakdown';
import { FilterBar } from '../components/FilterBar';
import { EmptyState } from '../components/EmptyState';
import {
  sentimentOverview,
  emotionBreakdown,
  sentimentTimeline24h,
  sentimentByPlatform,
  recentSentimentSignals
} from '../data/mockData';
import { useAnalysis } from '../context/AnalysisContext';
import { NoDataset } from '../components/NoDataset';

export const SentimentPage: React.FC = () => {
  const { analysisResults } = useAnalysis();
  const overview = analysisResults ? { ...sentimentOverview, positive: analysisResults.sentiment.positive, neutral: analysisResults.sentiment.neutral, negative: analysisResults.sentiment.negative, volumeAnalyzed: `${analysisResults.dashboardStats.totalPosts} uploaded posts` } : sentimentOverview;
  const timeline = analysisResults?.sentimentTimeline || sentimentTimeline24h;
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState('X');
  const [sentimentFilter, setSentimentFilter] = useState('All');
  const [emotionFilter, setEmotionFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');

  const filteredSignals = useMemo(() => {
    return recentSentimentSignals.filter((signal) => {
      // Search
      if (
        searchQuery &&
        !signal.post.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !signal.author.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Platform: Exclusively X
      if (platformFilter !== 'All' && signal.platform !== 'X') {
        return false;
      }
      // Sentiment
      if (sentimentFilter !== 'All' && signal.sentiment !== sentimentFilter) {
        return false;
      }
      // Emotion
      if (emotionFilter !== 'All' && signal.emotion !== emotionFilter) {
        return false;
      }
      return true;
    });
  }, [searchQuery, platformFilter, sentimentFilter, emotionFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setPlatformFilter('X');
    setSentimentFilter('All');
    setEmotionFilter('All');
    setTimeFilter('All');
  };

  if (!analysisResults) return <NoDataset />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Sentiment Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Deep neural sentiment modeling, real-time emotion vectors, and signal anomaly detection across decentralized networks.
        </p>
      </div>

      {/* TOP CARDS: Positive 42%, Neutral 31%, Negative 27% */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Positive 42% */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Positive Sentiment
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Smile className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {overview.positive}%
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              +{overview.positiveChange}%
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5 flex items-center justify-between">
            <span>Volume: 539,400 posts</span>
            <span className="text-emerald-600 font-medium">Dominant Vector</span>
          </div>
        </div>

        {/* Neutral 31% */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Neutral Sentiment
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Meh className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {overview.neutral}%
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
              {overview.neutralChange}%
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5 flex items-center justify-between">
            <span>Volume: 398,140 posts</span>
            <span>Fact-based / Announcements</span>
          </div>
        </div>

        {/* Negative 27% */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-card-hover transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Negative Sentiment
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Frown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {overview.negative}%
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
              {overview.negativeChange}%
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 border-t border-slate-100 pt-2.5 flex items-center justify-between">
            <span>Volume: 346,780 posts</span>
            <span className="text-rose-600 font-medium">Trigger: AI Act & Cloud Fees</span>
          </div>
        </div>
      </div>

      {/* LARGE "SENTIMENT OVER TIME" CHART */}
      <ChartCard
        title="Sentiment Over Time"
        subtitle="Chronological polarity trajectory across 24h streaming window"
        badge="Multi-Variate"
        actions={
          <div className="text-xs text-slate-500 font-medium">
            Confidence index: <span className="font-bold text-slate-800">92.4%</span>
          </div>
        }
      >
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timeline}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="posGradSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="neuGradSent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="negGradSent" x1="0" y1="0" x2="0" y2="1">
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
                  name === 'positive' ? 'Positive' : name === 'neutral' ? 'Neutral' : 'Negative',
                ]}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(val) => (val === 'positive' ? 'Positive (42% Avg)' : val === 'neutral' ? 'Neutral (31% Avg)' : 'Negative (27% Avg)')}
              />
              <Area
                type="monotone"
                dataKey="positive"
                stroke="#16A34A"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#posGradSent)"
              />
              <Area
                type="monotone"
                dataKey="neutral"
                stroke="#64748B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#neuGradSent)"
              />
              <Area
                type="monotone"
                dataKey="negative"
                stroke="#DC2626"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#negGradSent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* TWO COLUMNS: EMOTION BREAKDOWN & SENTIMENT BY PLATFORM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Emotion Breakdown (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Emotion Breakdown"
            subtitle="Granular psychological vector classification"
            badge="6 Vectors"
            badgeColor="blue"
          >
            <div className="py-2">
              <EmotionBreakdown items={emotionBreakdown} />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Primary Driver: Product announcements</span>
              <span className="font-semibold text-slate-700">63% Positive Bias (Excitement+Support)</span>
            </div>
          </ChartCard>
        </div>

        {/* Sentiment by Platform (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Sentiment by Platform"
            subtitle="Cross-network emotional polarity comparison"
            badge="Normalized"
            badgeColor="cyan"
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentByPlatform}
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
                    formatter={(val: any, name: any) => [`${val}%`, name]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                    formatter={(val) => (val === 'positive' ? 'Positive' : val === 'neutral' ? 'Neutral' : 'Negative')}
                  />
                  <Bar dataKey="positive" fill="#16A34A" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="neutral" fill="#64748B" stackId="a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="negative" fill="#DC2626" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Instagram: Highest positive sentiment (58%)</span>
              <span>Reddit: Highest negative polarity (38%)</span>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* RECENT SENTIMENT SIGNALS TABLE WITH COMPLETE FILTERS */}
      <ChartCard
        title="Recent Sentiment Signals"
        subtitle="Individual incoming feed signals scored by sentiment, emotion, and neural confidence"
        badge="Real-time Stream"
        badgeColor="green"
      >
        {/* Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search post content, authors, keywords..."
          platformFilter={platformFilter}
          onPlatformChange={setPlatformFilter}
          customFilter1={{
            label: 'Sentiment',
            value: sentimentFilter,
            options: [
              { label: 'All Sentiments', value: 'All' },
              { label: 'Positive', value: 'Positive' },
              { label: 'Neutral', value: 'Neutral' },
              { label: 'Negative', value: 'Negative' },
            ],
            onChange: setSentimentFilter
          }}
          customFilter2={{
            label: 'Emotion',
            value: emotionFilter,
            options: [
              { label: 'All Emotions', value: 'All' },
              { label: 'Excitement', value: 'Excitement' },
              { label: 'Support', value: 'Support' },
              { label: 'Anxiety', value: 'Anxiety' },
              { label: 'Anger', value: 'Anger' },
              { label: 'Sarcasm', value: 'Sarcasm' },
              { label: 'Other', value: 'Other' },
            ],
            onChange: setEmotionFilter
          }}
          onReset={handleResetFilters}
          resultCount={filteredSignals.length}
          totalCount={recentSentimentSignals.length}
        />

        {filteredSignals.length === 0 ? (
          <EmptyState
            title="No sentiment signals match your filters"
            description="Adjust your emotion, platform, or search keyword to see recent stream data."
            onReset={handleResetFilters}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="pb-3 font-semibold w-1/2">Post / Snippet</th>
                  <th className="pb-3 font-semibold">Platform</th>
                  <th className="pb-3 font-semibold">Sentiment</th>
                  <th className="pb-3 font-semibold">Emotion</th>
                  <th className="pb-3 font-semibold text-right">Confidence</th>
                  <th className="pb-3 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredSignals.map((signal) => (
                  <tr key={signal.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 pr-4">
                      <p className="text-slate-900 font-medium leading-snug line-clamp-2">
                        "{signal.post}"
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className="font-mono text-slate-500 font-medium">@{signal.author}</span>
                        <span>•</span>
                        <span>{signal.engagement.toLocaleString()} interactions</span>
                      </div>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <span className="font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {signal.platform}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <span
                        className={`font-semibold text-[11px] px-2 py-0.5 rounded-full ${
                          signal.sentiment === 'Positive'
                            ? 'bg-emerald-50 text-emerald-700'
                            : signal.sentiment === 'Negative'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {signal.sentiment}
                      </span>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <span className="font-medium text-slate-700 text-[11px]">
                        {signal.emotion}
                      </span>
                    </td>
                    <td className="py-3 text-right font-mono font-medium whitespace-nowrap text-slate-800">
                      {signal.confidence}%
                    </td>
                    <td className="py-3 text-right whitespace-nowrap text-slate-400 text-[11px]">
                      {signal.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ChartCard>
    </div>
  );
};
