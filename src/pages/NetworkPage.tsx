import React, { useState } from 'react';
import {
  Share2,
  Sliders,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
  Layers,
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ChartCard } from '../components/ChartCard';
import { NetworkGraph } from '../components/NetworkGraph';
import { influentialNodes } from '../data/mockData';
import { useAnalysis } from '../context/AnalysisContext';
import { NoDataset } from '../components/NoDataset';

export const NetworkPage: React.FC = () => {
  const { analysisResults } = useAnalysis();
  const nodes = analysisResults ? influentialNodes.map((node, i) => ({ ...node, name: analysisResults.segments[i]?.name || node.name, connections: analysisResults.dashboardStats.activeAccounts, communitySize: analysisResults.dashboardStats.totalPosts })) : influentialNodes;
  const [timeline, setTimeline] = useState<'10:00' | '12:00' | '15:00' | '18:00'>('18:00');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('1');

  const [edgeFilters, setEdgeFilters] = useState({
    mentions: true,
    replies: true,
    reposts: true,
    follows: true,
  });

  const timelineSteps: Array<'10:00' | '12:00' | '15:00' | '18:00'> = ['10:00', '12:00', '15:00', '18:00'];

  const toggleFilter = (key: keyof typeof edgeFilters) => {
    setEdgeFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedInfluentialNode = nodes[0];

  if (!analysisResults) return <NoDataset />;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Network Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Topological community graph showing node centrality, cross-cluster information cascade, and influence bridges.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-subtle text-xs font-semibold text-slate-700 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>Graph Engine: ReactFlow WebGL Accelerated</span>
        </div>
      </div>

      {/* CONTROLS BAR: EDGE TOGGLES + TIMELINE SLIDER */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Edge Type Filters */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>Edge Relationship Filters</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => toggleFilter('mentions')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  edgeFilters.mentions
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold shadow-subtle'
                    : 'bg-slate-50 text-slate-400 border-slate-200 line-through'
                }`}
              >
                Mentions (Blue)
              </button>
              <button
                onClick={() => toggleFilter('replies')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  edgeFilters.replies
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold shadow-subtle'
                    : 'bg-slate-50 text-slate-400 border-slate-200 line-through'
                }`}
              >
                Replies (Green)
              </button>
              <button
                onClick={() => toggleFilter('reposts')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  edgeFilters.reposts
                    ? 'bg-amber-50 text-amber-700 border-amber-300 font-semibold shadow-subtle'
                    : 'bg-slate-50 text-slate-400 border-slate-200 line-through'
                }`}
              >
                Reposts (Amber / Glow)
              </button>
              <button
                onClick={() => toggleFilter('follows')}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  edgeFilters.follows
                    ? 'bg-purple-50 text-purple-700 border-purple-300 font-semibold shadow-subtle'
                    : 'bg-slate-50 text-slate-400 border-slate-200 line-through'
                }`}
              >
                Follows (Purple)
              </button>
            </div>
          </div>

          {/* Timeline Scrubber */}
          <div className="min-w-[260px]">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Cascade Timeline Scrubber</span>
              </span>
              <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold">
                {timeline} UTC
              </span>
            </div>

            <div className="flex items-center gap-2">
              {timelineSteps.map((step) => (
                <button
                  key={step}
                  onClick={() => setTimeline(step)}
                  className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded-lg border transition-all ${
                    timeline === step
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {step}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SECTION: INTERACTIVE GRAPH (8 cols) + RIGHT PANEL (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Interactive Network Graph (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          <ChartCard
            title="Community Graph Topology"
            subtitle="Drag, zoom, and click nodes to analyze cluster interactions and edge weight"
            badge="Interactive ReactFlow"
            className="flex-1"
          >
            <NetworkGraph
              timeline={timeline}
              edgeFilters={edgeFilters}
              onSelectNode={(id) => setSelectedNodeId(id)}
              selectedNodeId={selectedNodeId}
            />

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Tip: Click any node to highlight incident edges and inspect centrality metrics.</span>
              </div>
              <span className="font-mono font-semibold text-slate-800">
                Current Snapshot: {timeline === '10:00' ? 'Origin (8 nodes)' : timeline === '12:00' ? 'Expansion (10 nodes)' : timeline === '15:00' ? 'Cross-Spillover (12 nodes)' : 'Full Saturation (13 nodes)'}
              </span>
            </div>
          </ChartCard>
        </div>

        {/* RIGHT PANEL: INFLUENTIAL NODES & METRICS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <ChartCard
            title="Influential Nodes"
            subtitle="Ranked by PageRank and Betweenness centrality"
            badge="Top Influencers"
          >
            <div className="space-y-3.5">
              {nodes.map((node) => {
                const isSelected = selectedNodeId === (node.id === 'node-a' ? '1' : node.id === 'node-b' ? '4' : '6');
                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id === 'node-a' ? '1' : node.id === 'node-b' ? '4' : '6')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-subtle'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0"
                          style={{ backgroundColor: node.avatarBg }}
                        >
                          {node.name.slice(5, 6)}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 leading-tight">
                            {node.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {node.handle}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-blue-600 font-mono">
                          {node.influenceScore}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          Influence Score
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100/80 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Connections</span>
                        <span className="font-semibold text-slate-800 font-mono text-xs">
                          {node.connections.toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Community</span>
                        <span className="font-semibold text-slate-800 text-xs">
                          {node.community}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Metrics Breakdown */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-4 gap-1 text-center">
                      <div className="p-1 rounded bg-slate-50">
                        <div className="text-[9px] text-slate-400 font-medium">Deg. Cent</div>
                        <div className="text-[10px] font-mono font-bold text-slate-700">{node.degreeCentrality}</div>
                      </div>
                      <div className="p-1 rounded bg-slate-50">
                        <div className="text-[9px] text-slate-400 font-medium">Between</div>
                        <div className="text-[10px] font-mono font-bold text-slate-700">{node.betweenness}</div>
                      </div>
                      <div className="p-1 rounded bg-slate-50">
                        <div className="text-[9px] text-slate-400 font-medium">PageRank</div>
                        <div className="text-[10px] font-mono font-bold text-slate-700">{node.pageRank}</div>
                      </div>
                      <div className="p-1 rounded bg-slate-50">
                        <div className="text-[9px] text-slate-400 font-medium">Cluster</div>
                        <div className="text-[10px] font-mono font-bold text-slate-700">{node.communitySize}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* PROPAGATION PATH VISUALIZATION */}
      {/* <ChartCard
        title="Propagation Path"
        subtitle="Chronological cascade trace across distinct community silos"
        badge="Cascade Topology"
        badgeColor="green"
      > */}
        {/* <div className="p-6 bg-slate-50/70 rounded-xl border border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            {/* Step 1: Technology */}
            {/* <div className="flex-1 w-full p-4 rounded-xl bg-white border border-blue-200 shadow-subtle text-center relative group hover:shadow-card transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Step 1 (10:15 UTC)
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center font-bold text-sm mb-2 mt-1">
                TECH
              </div>
              <div className="font-bold text-xs text-slate-900">Technology</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Developer repositories, arXiv prepress discussions, and open-weight model issues.
              </p>
            </div> */} 

            {/* <div className="hidden md:flex text-slate-400 shrink-0">
              <ArrowRight className="w-5 h-5 text-blue-500 animate-pulse" />
            </div> */}

            {/* Step 2: News */}
            {/* <div className="flex-1 w-full p-4 rounded-xl bg-white border border-cyan-200 shadow-subtle text-center relative group hover:shadow-card transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Step 2 (11:40 UTC)
              </span>
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 mx-auto flex items-center justify-center font-bold text-sm mb-2 mt-1">
                NEWS
              </div>
              <div className="font-bold text-xs text-slate-900">News & Media</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Wire services and tech journalists picked up policy summaries via Node Beta.
              </p>
            </div> */}

            {/* <div className="hidden md:flex text-slate-400 shrink-0">
              <ArrowRight className="w-5 h-5 text-cyan-500 animate-pulse" />
            </div> */}

            {/* Step 3: Education */}
            {/* <div className="flex-1 w-full p-4 rounded-xl bg-white border border-emerald-200 shadow-subtle text-center relative group hover:shadow-card transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Step 3 (13:10 UTC)
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center font-bold text-sm mb-2 mt-1">
                EDU
              </div>
              <div className="font-bold text-xs text-slate-900">Education & Academia</div>
              <p className="text-[11px] text-slate-500 mt-1">
                University labs and educators debated student access constraints under the proposed rules.
              </p>
            </div> */}

            {/* <div className="hidden md:flex text-slate-400 shrink-0">
              <ArrowRight className="w-5 h-5 text-emerald-500 animate-pulse" />
            </div> */}

            {/* Step 4: Telegram */}
            {/* <div className="flex-1 w-full p-4 rounded-xl bg-white border border-amber-200 shadow-subtle text-center relative group hover:shadow-card transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                Step 4 (14:25 UTC)
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center font-bold text-sm mb-2 mt-1">
                TG
              </div>
              <div className="font-bold text-xs text-slate-900">Telegram & Communities</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Cross-channel syndication bots spread summaries to 28,000+ subscriber broadcast groups.
              </p>
            </div>
          </div> */}

          {/* <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Cascade transmission completed in 4 hours 10 minutes with 94.1% propagation fidelity</span>
          </div> */}
        {/* </div>
      </ChartCard> */}
    </div>
  );
};
