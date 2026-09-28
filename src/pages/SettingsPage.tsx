import React, { useState } from 'react';
import {
  User,
  Bell,
  Sun,
  Database,
  Shield,
  CheckCircle2,
  Sliders,
  Sparkles,
  Save,
  Radio,
  ExternalLink,
  Lock
} from 'lucide-react';
import { ChartCard } from '../components/ChartCard';
import { dataSources } from '../data/mockData';
import { useAuth } from '../auth/AuthContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useOutletContext } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { twitterHandle, isAnalyzing, analyzeTwitterAccount, twitterProfile } = useAnalysis();
  const [settingsHandle, setSettingsHandle] = useState(twitterHandle.replace(/^@/, ''));
  const context = useOutletContext<{ showToast?: (type: any, msg: string, title?: string) => void }>();
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'preferences' | 'datasources' | 'privacy'>('datasources');

  // Form states
  const [name, setName] = useState(user?.name || 'Admin User');
  const [email, setEmail] = useState(user?.email || 'admin@socialpulse.ai');
  const [role, setRole] = useState(user?.role || 'Principal Intelligence Director');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [negativeSpikeAlerts, setNegativeSpikeAlerts] = useState(true);
  const [crossCommunityAlerts, setCrossCommunityAlerts] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);

  const [refreshInterval, setRefreshInterval] = useState('30s');
  const [confidenceThreshold, setConfidenceThreshold] = useState('90%');
  const [anonymityLevel, setAnonymityLevel] = useState('k-5-Strict');

  const handleSave = () => {
    if (context?.showToast) {
      context.showToast('success', 'Configuration successfully synchronized with platform runtime.', 'Settings Saved');
    }
  };

  const tabs = [
    { id: 'datasources', label: 'Data Sources', icon: Database, badge: 'X (Twitter)' },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Sun, badge: 'Light Mode' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Dashboard Preferences', icon: Sliders },
    { id: 'privacy', label: 'Privacy & Anonymity', icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Settings & Infrastructure
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure connected platform feeds, neural anomaly thresholds, account credentials, and privacy guarantees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT NAV TABS (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-card space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/70 shadow-subtle'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs text-blue-900">
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Demo Platform Mode</span>
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              All data streaming and neural analysis are run in client-side high-fidelity simulation mode for presentation safety.
            </p>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION (8 cols) */}
        <div className="lg:col-span-8">
          {/* DATA SOURCES TAB - EXCLUSIVELY X (TWITTER) */}
          {activeTab === 'datasources' && (
            <ChartCard
              title="Connected Data Source: X (Twitter)"
              subtitle="Live Twitter firehose stream, account mentions, and cascade topology"
              badge="Exclusive Active Source"
              badgeColor="green"
            >
              <div className="space-y-6 py-1">
                {/* Active X Source Card */}
                <div className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm shadow-subtle shrink-0">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">X (Twitter) Firehose</span>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Connected & Streaming
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Active Account: <strong className="text-slate-800 font-mono">{twitterHandle}</strong> • Protocol: X API v2 Real-time
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
                    Latency: 28ms
                  </span>
                </div>

                {/* Twitter ID Analysis Input */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Analyze Twitter / X Account ID
                    </label>
                    <p className="text-xs text-slate-500">
                      Enter any Twitter handle to stream and analyze its sentiment, follower reach, and viral topics.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                        @
                      </span>
                      <input
                        type="text"
                        value={settingsHandle}
                        onChange={(e) => setSettingsHandle(e.target.value)}
                        placeholder="elonmusk, OpenAI, sama..."
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={isAnalyzing || !settingsHandle.trim()}
                      onClick={async () => {
                        await analyzeTwitterAccount(settingsHandle);
                        if (context?.showToast) {
                          context.showToast('success', `Intelligence stream updated for @${settingsHandle.replace(/^@/, '')}`, 'X Analyzed');
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-subtle transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
                    </button>
                  </div>

                  {/* Current Analyzed Profile Quick Overview */}
                  {twitterProfile && (
                    <div className="mt-3 pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-medium">Handle</div>
                        <div className="font-bold text-slate-800 font-mono truncate mt-0.5">{twitterProfile.handle}</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-medium">Followers</div>
                        <div className="font-bold text-slate-800 mt-0.5">{twitterProfile.followers}</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-medium">Sentiment</div>
                        <div className="font-bold text-emerald-600 mt-0.5">{twitterProfile.sentimentScore}% Pos</div>
                      </div>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                        <div className="text-[10px] text-slate-400 font-medium">Engagement</div>
                        <div className="font-bold text-purple-600 mt-0.5">{twitterProfile.engagementRate}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ChartCard>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <ChartCard
              title="User Profile & Access Level"
              subtitle="Manage analyst credentials and dashboard role designation"
              actions={
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Profile
                </button>
              }
            >
              <div className="space-y-4 py-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Role / Intelligence Clearance
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="font-semibold text-slate-800">Security Clearance Status:</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Tier 3 Enterprise Full Access • MFA Token Synchronized • Demo Session
                  </div>
                </div>
              </div>
            </ChartCard>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <ChartCard
              title="Application Theme & Visuals"
              subtitle="Theme selection and enterprise presentation options"
            >
              <div className="space-y-4 py-1">
                <div className="p-4 rounded-xl border-2 border-blue-600 bg-blue-50/20 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-amber-500" />
                      <span className="font-bold text-sm text-slate-900">Light / White Theme (Active)</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Optimized for high readability, crisp chart contrast, and professional executive presentation. Strict enterprise white palette.
                    </p>
                  </div>
                  <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    System Standard
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 opacity-60 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-sm text-slate-700">Dark Theme (Disabled)</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Disabled per product specification: SocialPulse AI enforces an enterprise light theme throughout all screens.
                    </p>
                  </div>
                  <span className="bg-slate-200 text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Locked
                  </span>
                </div>
              </div>
            </ChartCard>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <ChartCard
              title="Intelligence Alert Rules"
              subtitle="Configure neural alert triggers for sudden volume and sentiment changes"
              actions={
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Alerts
                </button>
              }
            >
              <div className="space-y-3 py-1">
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Negative Sentiment Spike Alerts</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Notify when negative polarity surges &gt;15% in under 30 minutes</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={negativeSpikeAlerts}
                    onChange={(e) => setNegativeSpikeAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Cross-Community Cascade Alerts</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Alert when topics bridge across 3 or more independent clusters</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={crossCommunityAlerts}
                    onChange={(e) => setCrossCommunityAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Daily Executive PDF Briefing Digest</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Automated morning synthesis delivered to connected analyst emails</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={dailyDigest}
                    onChange={(e) => setDailyDigest(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                </label>
              </div>
            </ChartCard>
          )}

          {/* DASHBOARD PREFERENCES TAB */}
          {activeTab === 'preferences' && (
            <ChartCard
              title="Dashboard Telemetry Preferences"
              subtitle="Tune stream sampling rates and neural confidence thresholds"
              actions={
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-subtle transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  Apply
                </button>
              }
            >
              <div className="space-y-4 py-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Stream Polling Frequency
                  </label>
                  <select
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900"
                  >
                    <option value="10s">10 Seconds (Ultra-Fast)</option>
                    <option value="30s">30 Seconds (Default Balanced)</option>
                    <option value="60s">1 Minute</option>
                    <option value="5m">5 Minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Minimum Sentiment Neural Confidence Filter
                  </label>
                  <select
                    value={confidenceThreshold}
                    onChange={(e) => setConfidenceThreshold(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-900"
                  >
                    <option value="85%">85% Minimum Confidence</option>
                    <option value="90%">90% High Precision (Default)</option>
                    <option value="95%">95% Conservative Rigor</option>
                  </select>
                </div>
              </div>
            </ChartCard>
          )}

          {/* PRIVACY TAB */}
          {/* {activeTab === 'privacy' && (
            <ChartCard
              title="Privacy Guarantees & Anonymization"
              subtitle="Strict aggregate-only data processing safeguards"
              badge="Compliance: Strict"
              badgeColor="green"
            >
              <div className="space-y-4 py-1 text-xs text-slate-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Zero PII Guarantee</div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      SocialPulse AI strictly removes and hashes usernames, IP addresses, and unique device fingerprints before telemetry ingestion. Only aggregate demographic cohorts and anonymized graph nodes are stored or displayed.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-slate-900">Anonymity Safeguards in effect:</div>
                  <ul className="space-y-1.5 text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>K-Anonymity factor: <strong>k ≥ 5</strong> for all demographic clusters</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Differential privacy noise added to regional user counts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Compliance aligned with GDPR, CCPA, and EU AI Act Title III</span>
                    </li>
                  </ul>
                </div>
              </div>
            </ChartCard>
          )} */}
        </div>
      </div>
    </div>
  );
};
