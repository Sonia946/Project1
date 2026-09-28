import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { ReportModal } from '../components/ReportModal';
import { Toast, ToastMessage } from '../components/Toast';
import { useAnalysis } from '../context/AnalysisContext';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { selectedPlatform, setSelectedPlatform, dateRange, setDateRange } = useAnalysis();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const getPageMeta = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'Social Intelligence Overview',
          subtitle: 'Real-time insights across connected social platforms'
        };
      
      case '/sentiment':
        return {
          title: 'Sentiment Intelligence',
          subtitle: 'Multi-lingual emotional polarity and narrative signal tracking'
        };
      case '/audience':
        return {
          title: 'Audience Intelligence',
          subtitle: 'Aggregated and anonymized audience insights across demographic vectors'
        };
      case '/trends':
        return {
          title: 'Trend Intelligence',
          subtitle: 'Algorithmic viral trajectory and keyword acceleration detection'
        };
      case '/network':
        return {
          title: 'Network Intelligence',
          subtitle: 'Topological community graphs, super-node influence, and propagation paths'
        };
      case '/ai-insights':
        return {
          title: 'AI Intelligence Center',
          subtitle: 'Neural hypothesis generation, conversational query engine, and automated synthesis'
        };
      case '/settings':
        return {
          title: 'Platform Settings & Data Feeds',
          subtitle: 'Manage connected platform streams, alert thresholds, and privacy parameters'
        };
      case '/data-sources':
        return { title: 'Data Sources', subtitle: 'Upload and map social-media datasets for local analysis' };
      default:
        return {
          title: 'SocialPulse AI Intelligence',
          subtitle: 'Enterprise Social Analytics Engine'
        };
    }
  };

  const { title, subtitle } = getPageMeta();

  const showToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToast({ id: Date.now().toString(), type, message, title });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-h-screen">
        <Header
          title={title}
          subtitle={subtitle}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(p) => {
            setSelectedPlatform(p);
            showToast('info', `Platform filter updated to ${p}`, 'Stream Filtered');
          }}
          selectedTimeRange={dateRange}
          onSelectTimeRange={(t) => {
            setDateRange(t);
            showToast('info', `Window shifted to ${t === '24h' ? 'Last 24 Hours' : t === '7d' ? 'Last 7 Days' : 'Last 30 Days'}`, 'Time Window');
          }}
          onGlobalSearch={(q) => {
            if (q.trim()) {
              showToast('info', `Executed semantic scan for: "${q}"`, 'Global Search');
            }
          }}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet
            context={{
              selectedPlatform,
              selectedTimeRange: dateRange,
              openReportModal: () => setIsReportModalOpen(true),
              showToast,
            }}
          />
        </main>
      </div>

      {/* Global Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onDownloaded={() => {
          showToast('success', 'SocialPulse AI Intelligence Briefing exported to PDF format.', 'Download Complete');
        }}
      />

      {/* Toast Alert */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};
