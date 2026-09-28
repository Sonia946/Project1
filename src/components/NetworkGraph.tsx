import React, { useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  BackgroundVariant
} from 'reactflow';
import 'reactflow/dist/style.css';
import { networkTimelineSnapshots } from '../data/mockData';

interface NetworkGraphProps {
  timeline: string;
  edgeFilters: {
    mentions: boolean;
    replies: boolean;
    reposts: boolean;
    follows: boolean;
  };
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

const communityColors = {
  Technology: { bg: '#EFF6FF', border: '#3B82F6', text: '#1D4ED8', badge: 'bg-blue-100 text-blue-800' },
  News: { bg: '#ECFEFF', border: '#06B6D4', text: '#0E7490', badge: 'bg-cyan-100 text-cyan-800' },
  Education: { bg: '#F0FDF4', border: '#22C55E', text: '#15803D', badge: 'bg-emerald-100 text-emerald-800' },
  Business: { bg: '#FFFBEB', border: '#F59E0B', text: '#B45309', badge: 'bg-amber-100 text-amber-800' },
};

const CustomNodeComponent = ({ data }: any) => {
  const colors = communityColors[data.community as keyof typeof communityColors] || communityColors.Technology;
  const isSelected = data.isSelected;

  return (
    <div
      className={`relative rounded-xl transition-all duration-200 cursor-pointer shadow-subtle ${
        isSelected ? 'ring-4 ring-blue-500/30 scale-105 shadow-md' : 'hover:scale-102 hover:shadow-card'
      }`}
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${isSelected ? '#2563EB' : colors.border}`,
        padding: '10px 14px',
        minWidth: '130px',
        maxWidth: '180px',
      }}
    >
      {data.isSuperNode && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white"></span>
        </span>
      )}
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${colors.badge}`}>
          {data.community}
        </span>
        <span className="text-[10px] font-mono text-slate-500 font-semibold">
          sz:{data.size}
        </span>
      </div>
      <div className="font-semibold text-xs text-slate-900 leading-tight truncate">
        {data.label}
      </div>
      <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1">
        <span>Centrality</span>
        <span className="font-medium text-slate-700 font-mono">{(data.size / 55).toFixed(2)}</span>
      </div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNodeComponent,
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  timeline,
  edgeFilters,
  onSelectNode,
  selectedNodeId,
}) => {
  const currentSnapshot = networkTimelineSnapshots[timeline] || networkTimelineSnapshots['18:00'];

  const nodes: Node[] = useMemo(() => {
    return currentSnapshot.nodes.map((n) => {
      const isSuperNode = n.id === '1' || n.id === '4' || n.id === '6';
      return {
        id: n.id,
        type: 'custom',
        position: { x: n.x * 1.5, y: n.y * 1.4 },
        data: {
          label: n.label,
          community: n.community,
          size: n.size,
          isSuperNode,
          isSelected: selectedNodeId === n.id,
        },
      };
    });
  }, [currentSnapshot, selectedNodeId]);

  const edges: Edge[] = useMemo(() => {
    return currentSnapshot.edges
      .filter((e) => {
        if (e.type === 'mentions' && !edgeFilters.mentions) return false;
        if (e.type === 'replies' && !edgeFilters.replies) return false;
        if (e.type === 'reposts' && !edgeFilters.reposts) return false;
        if (e.type === 'follows' && !edgeFilters.follows) return false;
        return true;
      })
      .map((e) => {
        const edgeColorMap = {
          mentions: '#3B82F6',
          replies: '#10B981',
          reposts: '#F59E0B',
          follows: '#8B5CF6',
        };

        return {
          id: e.id,
          source: e.source,
          target: e.target,
          animated: e.animated || e.type === 'reposts',
          style: {
            stroke: edgeColorMap[e.type] || '#94A3B8',
            strokeWidth: e.animated ? 2.5 : 1.5,
            strokeDasharray: e.type === 'follows' ? '4,4' : undefined,
          },
          label: e.type.toUpperCase(),
          labelStyle: {
            fontSize: 9,
            fill: '#64748B',
            fontWeight: 600,
          },
          labelBgStyle: {
            fill: '#FFFFFF',
            fillOpacity: 0.9,
            rx: 4,
            ry: 4,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeColorMap[e.type] || '#94A3B8',
            width: 14,
            height: 14,
          },
        };
      });
  }, [currentSnapshot, edgeFilters]);

  return (
    <div className="w-full h-[540px] rounded-xl overflow-hidden border border-slate-200 bg-white relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => onSelectNode(node.id)}
        fitView
        attributionPosition="bottom-left"
        minZoom={0.5}
        maxZoom={1.8}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color="#E2E8F0" />
        <Controls
          showInteractive={false}
          className="bg-white border border-slate-200 rounded-lg shadow-subtle p-1"
        />
        <MiniMap
          nodeColor={(n: any) => {
            if (n.data?.community === 'Technology') return '#3B82F6';
            if (n.data?.community === 'News') return '#06B6D4';
            if (n.data?.community === 'Education') return '#22C55E';
            return '#F59E0B';
          }}
          className="border border-slate-200 rounded-lg shadow-subtle bg-white/90"
          maskColor="rgba(241, 245, 249, 0.6)"
        />
      </ReactFlow>

      {/* Floating Network Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl p-3 shadow-subtle flex flex-col gap-1.5 z-10 text-[11px] pointer-events-auto">
        <span className="font-semibold text-slate-800 text-[11px] mb-1">Community Clusters</span>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-100" />
          <span className="text-slate-600 font-medium">Technology</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 ring-2 ring-cyan-100" />
          <span className="text-slate-600 font-medium">News & Media</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
          <span className="text-slate-600 font-medium">Education</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100" />
          <span className="text-slate-600 font-medium">Business</span>
        </div>
      </div>
    </div>
  );
};
