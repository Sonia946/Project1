import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';

export const NoDataset: React.FC = () => {
  const navigate = useNavigate();
  const { analyzeTwitterAccount } = useAnalysis();

  return (
    <div className="min-h-[55vh] flex items-center justify-center">
      <div className="text-center bg-white border border-slate-200 rounded-3xl p-9 max-w-md shadow-card">
        <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-subtle">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </div>
        <h2 className="font-bold text-lg mt-4 text-slate-900">No Twitter ID Analyzed</h2>
        <p className="text-xs text-slate-500 mt-2">
          Enter any Twitter / X account ID to ingest live sentiment, topic clusters, and audience reach.
        </p>
        <div className="flex gap-2.5 justify-center mt-5">
          <button
            onClick={() => navigate('/data-sources')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-subtle transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Enter Twitter ID
          </button>
          <button
            onClick={() => analyzeTwitterAccount('@socialpulse_ai')}
            className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all"
          >
            Load Demo Account
          </button>
        </div>
      </div>
    </div>
  );
};
