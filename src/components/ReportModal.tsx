import React, { useState } from 'react';
import { Modal } from './Modal';
import { Download, Printer, CheckCircle2, ShieldCheck, Sparkles, FileText, Share2 } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloaded?: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onDownloaded }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      if (onDownloaded) onDownloaded();
    }, 900);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Executive Intelligence Report"
      subtitle="Comprehensive cross-platform social sentiment & propagation synthesis"
      maxWidth="4xl"
    >
      <div className="space-y-6 text-slate-800">
        {/* Report Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Classification:</span>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-semibold">
              TLP:CLEAR / DEMO INTELLIGENCE
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 font-mono">DOC-SPAI-2026-09</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-subtle transition-colors disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Compiling PDF...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-subtle space-y-6 print:border-none print:p-0">
          {/* Header Banner */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs tracking-wider uppercase mb-1">
                <ShieldCheck className="w-4 h-4" />
                SocialPulse AI Automated Synthesis
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Cross-Platform Intelligence Briefing: AI Regulation & Sentiment Dynamics
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Monitoring Period: Last 24 Hours • 1,284,320 Posts Analyzed • 84,231 Nodes Tracked
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 font-mono hidden sm:block">
              <div>Version 3.4.2</div>
              <div>Generated: Real-time</div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Executive Summary
            </h4>
            <p className="text-xs leading-relaxed text-slate-700 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              Between 10:00 and 18:00 UTC, social intelligence sensors recorded an unprecedented <strong>213% velocity surge</strong> in narratives surrounding <em>Global AI Regulatory Frameworks</em> and compute export restrictions. While overall platform sentiment held positive at <strong>68%</strong>, localized developer communities experienced a severe negative divergence (44% negative at 15:00 peak) driven primarily by anxiety over model auditing overhead and cloud API price changes.
            </p>
          </div>

          {/* Section 2: Key Metric Indicators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Core Telemetry Matrix
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-[11px] text-slate-500">Volume Analyzed</div>
                <div className="text-lg font-bold text-slate-900 mt-1">1.28M</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+18.4% surge</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-[11px] text-slate-500">Primary Vector</div>
                <div className="text-lg font-bold text-slate-900 mt-1">#AIRegulation</div>
                <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Velocity: Extreme</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-[11px] text-slate-500">Peak Negative Rate</div>
                <div className="text-lg font-bold text-rose-600 mt-1">44%</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Window: 14:20 - 15:10</div>
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="text-[11px] text-slate-500">Super-Nodes Active</div>
                <div className="text-lg font-bold text-slate-900 mt-1">4 Core</div>
                <div className="text-[10px] text-cyan-600 font-semibold mt-0.5">Node Alpha (PR: 0.94)</div>
              </div>
            </div>
          </div>

          {/* Section 3: Cross-Community Propagation Analysis */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              3. Cascade & Propagation Topology
            </h4>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-mono text-[11px]">1</span>
                <span>Origin: Technology developer repositories and Discord server leaks (10:15 UTC)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center font-mono text-[11px]">2</span>
                <span>Amplification: News and media wire handles (@node_beta_reg) syndicated quotes (11:40 UTC)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[11px]">3</span>
                <span>Secondary Spillover: Academic and research channels evaluated compliance feasibility (13:10 UTC)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-mono text-[11px]">4</span>
                <span>Cross-Platform Infiltration: Unverified Telegram security alerts triggered Reddit thread brigades (14:25 UTC)</span>
              </div>
            </div>
          </div>

          {/* Section 4: Strategic Recommendations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              4. Strategic Action Items
            </h4>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Proactive Communications:</strong> Issue explicit architectural clarification regarding data boundary protection before the news cycle accelerates into mainstream morning broadcasts.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Node Engagement:</strong> Coordinate technical outreach to the top 3 high-betweenness developer nodes to provide factual open-source audit guidelines.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Automated Anomaly Watch:</strong> Maintain 60-second polling on Telegram relay nodes for potential botnet syndication cascades.</span>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed italic">
            Disclaimer: Synthesized automatically by SocialPulse AI neural analytics pipeline. Metrics reflect observational statistical correlations within scraped and streamed feeds; no personal identifying information was processed or stored.
          </div>
        </div>
      </div>
    </Modal>
  );
};
