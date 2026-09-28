import React from 'react';
import {
  Users,
  Globe2,
  Languages,
  PieChart as PieIcon,
  ShieldCheck,
  TrendingUp,
  Activity,
  Layers,
  MapPin
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { audienceDemographics } from '../data/mockData';
import { useAnalysis } from '../context/AnalysisContext';
import { NoDataset } from '../components/NoDataset';

export const AudiencePage: React.FC = () => {
  const { analysisResults } = useAnalysis();
  const audience = analysisResults ? { ...audienceDemographics, languages: analysisResults.languages.map(l => ({ language: l.language, percentage: l.percentage, speakers: `${l.count} posts` })), segments: analysisResults.segments } : audienceDemographics;
  if (!analysisResults) return <NoDataset />;
  const ageColors = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];
  const languageColors = ['#2563EB', '#06B6D4', '#10B981', '#64748B'];
  const interestColors = ['#2563EB', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#94A3B8'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Privacy Guarantee Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Audience Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Aggregated and anonymized audience insights across 84,231 clustered profiles
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Zero PII Policy: Synthetic K-Anonymity Verified</span>
        </div>
      </div>

      {/* TOP GRID: AGE DISTRIBUTION & LANGUAGE DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Age Distribution (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Age Distribution"
            subtitle="Aggregated generational cohorts"
            badge="Anonymized Cohorts"
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={audience.ageGroups}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="range"
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
                    formatter={(val: any) => [`${val}%`, 'Share']}
                  />
                  <Bar dataKey="percentage" fill="#2563EB" radius={[6, 6, 0, 0]}>
                    {audience.ageGroups.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ageColors[index % ageColors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-xs">
              {audience.ageGroups.map((g) => (
                <div key={g.range} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-medium">{g.range}</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{g.percentage}%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{g.count.toLocaleString()} accts</div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Language Distribution (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Language Distribution"
            subtitle="Multi-lingual dialect and discourse split"
            badge="NLP Vector"
            badgeColor="cyan"
          >
            <div className="h-64 w-full flex items-center justify-center pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audience.languages}
                    dataKey="percentage"
                    nameKey="language"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {audience.languages.map((_, index) => (
                      <Cell key={`cell-lang-${index}`} fill={languageColors[index % languageColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val}%`, 'Prevalence']}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                    formatter={(val, entry: any) => `${val} (${entry.payload.percentage}%)`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-xs">
              {audience.languages.map((l, i) => (
                <div key={l.language} className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-[11px] text-slate-500 font-medium">{l.language}</div>
                  <div className="font-bold text-slate-900 text-sm mt-0.5">{l.percentage}%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{l.speakers}</div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* INTEREST CLUSTERS & GEOGRAPHIC DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interest Clusters (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Interest Clusters"
            subtitle="Top topical affinity domains mined from mention semantics"
            badge="Semantic Graph"
          >
            <div className="space-y-3.5 py-1">
              {audience.interests.map((interest, i) => (
                <div key={interest.cluster} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{interest.cluster}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-600 font-medium">+{interest.growth}% MoM</span>
                      <span className="font-bold font-mono text-slate-900">{interest.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${interest.percentage * 2.5}%`,
                        backgroundColor: interestColors[i % interestColors.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Technology + Business represent 53% share</span>
              <span className="text-blue-600 font-medium">High commercial intent</span>
            </div>
          </ChartCard>
        </div>

        {/* Geographic Distribution Visualization (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Geographic Distribution"
            subtitle="Anonymized regional audience presence and local sentiment index"
            badge="Global Aggregation"
            badgeColor="cyan"
          >
            <div className="space-y-3 py-1">
              {audience.geoRegions.map((region) => (
                <div
                  key={region.region}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-slate-900">{region.region}</div>
                      <div className="text-[11px] text-slate-400">{region.activeUsers} active accounts</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{region.share}%</div>
                      <div className="text-[10px] text-slate-400">Share</div>
                    </div>
                    <div className="min-w-[60px]">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          region.sentiment >= 65
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {region.sentiment}% pos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>North America & APAC lead aggregate engagement volume</span>
              <span className="font-semibold text-slate-700">72.6% total global reach</span>
            </div>
          </ChartCard>
        </div>
      </div>

      {/* AUDIENCE SEGMENTS & ACTIVITY TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Audience Segments (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Audience Segments"
            subtitle="Machine-learning unsupervised audience categorization"
            badge="Clustered"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {audience.segments.map((seg, i) => (
                <div
                  key={seg.name}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:shadow-subtle transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900">{seg.name}</span>
                    <span className="text-xs font-extrabold text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded-full">
                      {seg.percentage}%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mb-2">
                    {seg.reach}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {seg.description}
                  </p>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Audience Activity Timeline (6 cols) */}
        <div className="lg:col-span-6">
          <ChartCard
            title="Audience Activity Timeline"
            subtitle="Concurrent active profiles and interaction velocity over 24 hours"
            badge="Temporal Dynamics"
            badgeColor="green"
          >
            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={audience.activityTimeline}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="activeUsersGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis
                    dataKey="hour"
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
                    formatter={(val: any, name: any) => [
                      Number(val).toLocaleString(),
                      name === 'activeUsers' ? 'Active Profiles' : 'Interactions',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="activeUsers"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#activeUsersGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Peak activity recorded at 12:00 UTC (84,230 active accounts)</span>
              <span className="font-semibold text-slate-800">215k interactions/hr</span>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};
