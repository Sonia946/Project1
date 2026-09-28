import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  dashboardStats as defaultStats,
  sentimentTimeline24h as defaultTimeline,
  trendingTopics as defaultTopics,
  platformActivity as defaultActivity,
  liveIntelligenceFeed
} from '../data/mockData';

export type UploadedPost = Record<string, unknown> & {
  id?: string;
  platform?: string;
  authorId?: string;
  text?: string;
  timestamp?: string;
  likes?: number;
  replies?: number;
  shares?: number;
  language?: string;
  parentPostId?: string;
};

export interface TwitterProfileData {
  handle: string;
  displayName: string;
  avatarText: string;
  verified: boolean;
  bio: string;
  followers: string;
  following: string;
  totalTweetsScanned: number;
  sentimentScore: number;
  positivePct: number;
  neutralPct: number;
  negativePct: number;
  engagementRate: string;
  topHashtags: string[];
  recentTweets: {
    id: string;
    text: string;
    likes: number;
    retweets: number;
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    timeAgo: string;
  }[];
}

export interface AnalysisResults {
  dashboardStats: typeof defaultStats;
  sentimentTimeline: typeof defaultTimeline;
  trendingTopics: typeof defaultTopics;
  platformActivity: typeof defaultActivity;
  liveAlerts: typeof liveIntelligenceFeed;
  sentiment: { positive: number; neutral: number; negative: number };
  languages: { language: string; count: number; percentage: number }[];
  segments: { name: string; percentage: number; reach: string; description: string }[];
  twitterProfile?: TwitterProfileData;
}

interface AnalysisState {
  twitterHandle: string;
  isAnalyzing: boolean;
  selectedPlatform: string;
  dateRange: string;
  analysisResults: AnalysisResults;
  twitterProfile: TwitterProfileData;
  setSelectedPlatform: (value: string) => void;
  setDateRange: (value: string) => void;
  analyzeTwitterAccount: (handle: string) => Promise<void>;
  resetToDefault: () => void;
}

const AnalysisContext = createContext<AnalysisState | null>(null);

// Generator for realistic Twitter profile data based on handle
export function generateTwitterData(rawHandle: string): { profile: TwitterProfileData; results: AnalysisResults } {
  const cleanHandle = rawHandle.trim().replace(/^@+/, '') || 'socialpulse_ai';
  const formattedHandle = `@${cleanHandle}`;
  const lower = cleanHandle.toLowerCase();

  // Custom traits based on handle
  let displayName = cleanHandle.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  let bio = `Official intelligence stream and network engagement for ${formattedHandle}. Real-time analytics on X.`;
  let followers = '142.8K';
  let following = '642';
  let hashtags = ['#AI', '#TechNews', '#Innovation', '#X', '#MachineLearning'];
  let sentimentPos = 58;
  let sentimentNeu = 28;
  let sentimentNeg = 14;

  if (lower.includes('elon') || lower.includes('musk')) {
    displayName = 'Elon Musk';
    bio = 'X, xAI, Tesla, SpaceX, Neuralink, Starlink, Boring Co. Accelerationist.';
    followers = '198.4M';
    following = '812';
    hashtags = ['#Grok', '#Tesla', '#SpaceX', '#Starship', '#X', '#AI'];
    sentimentPos = 62;
    sentimentNeu = 22;
    sentimentNeg = 16;
  } else if (lower.includes('openai')) {
    displayName = 'OpenAI';
    bio = 'Developing safe and beneficial artificial general intelligence for all of humanity.';
    followers = '3.8M';
    following = '112';
    hashtags = ['#GPT4o', '#Reasoning', '#ChatGPT', '#OpenAI', '#AIAgents'];
    sentimentPos = 68;
    sentimentNeu = 24;
    sentimentNeg = 8;
  } else if (lower.includes('sama') || lower.includes('altman')) {
    displayName = 'Sam Altman';
    bio = 'CEO at OpenAI. Technology, compute, humanity.';
    followers = '3.1M';
    following = '540';
    hashtags = ['#AGI', '#OpenAI', '#Compute', '#FutureOfWork', '#Energy'];
    sentimentPos = 65;
    sentimentNeu = 25;
    sentimentNeg = 10;
  } else if (lower.includes('deepmind') || lower.includes('google')) {
    displayName = 'Google DeepMind';
    bio = 'We solve intelligence to advance science and benefit humanity.';
    followers = '1.4M';
    following = '245';
    hashtags = ['#Gemini', '#AlphaFold', '#DeepMind', '#Science', '#AI'];
    sentimentPos = 72;
    sentimentNeu = 20;
    sentimentNeg = 8;
  }

  const profile: TwitterProfileData = {
    handle: formattedHandle,
    displayName,
    avatarText: cleanHandle.slice(0, 2).toUpperCase(),
    verified: true,
    bio,
    followers,
    following,
    totalTweetsScanned: 2840,
    sentimentScore: sentimentPos,
    positivePct: sentimentPos,
    neutralPct: sentimentNeu,
    negativePct: sentimentNeg,
    engagementRate: '4.7%',
    topHashtags: hashtags,
    recentTweets: [
      {
        id: 'tw-1',
        text: `Remarkable progress in our latest multi-modal benchmark evaluations. Latency reduced by 4.2x while maintaining high reasoning fidelity. ${hashtags[0]} ${hashtags[1]}`,
        likes: 12450,
        retweets: 3820,
        sentiment: 'Positive',
        timeAgo: '42m ago'
      },
      {
        id: 'tw-2',
        text: `Deploying new network updates across all regions today. Please let us know if you experience any unexpected API rate limiting or timeout latency.`,
        likes: 4210,
        retweets: 890,
        sentiment: 'Neutral',
        timeAgo: '2h ago'
      },
      {
        id: 'tw-3',
        text: `The pace of open-source tooling acceleration right now is unlike anything we've seen in computing history. Exciting times ahead!`,
        likes: 21890,
        retweets: 5410,
        sentiment: 'Positive',
        timeAgo: '6h ago'
      },
      {
        id: 'tw-4',
        text: `Addressing feedback regarding data privacy frameworks: all telemetry remains strictly anonymized under strict SOC2 compliance.`,
        likes: 3120,
        retweets: 640,
        sentiment: 'Neutral',
        timeAgo: '14h ago'
      }
    ]
  };

  // Build adjusted dashboard results for X
  const results: AnalysisResults = {
    dashboardStats: {
      ...defaultStats,
      totalPosts: 1284320,
      activeAccounts: 84231,
      overallSentiment: sentimentPos,
      sparklines: {
        posts: [45, 52, 58, 64, 71, 79, 85, 91, 95, 98],
        accounts: [30, 36, 42, 50, 58, 65, 72, 80, 84, 88],
        topics: [14, 18, 20, 22, 24, 25, 26, 27, 27, 27],
        sentiment: [50, 52, 55, 58, 60, 62, 65, 68, 70, sentimentPos]
      }
    },
    sentimentTimeline: defaultTimeline.map(point => ({
      ...point,
      positive: Math.min(100, Math.round(point.positive * (sentimentPos / 45))),
      negative: Math.max(5, Math.round(point.negative * (sentimentNeg / 25)))
    })),
    trendingTopics: hashtags.map((tag, idx) => ({
      id: `topic-${idx}`,
      tag: tag.startsWith('#') ? tag : `#${tag}`,
      name: tag.replace(/^#/, ''),
      mentions: 82431 - idx * 12500,
      growth: 187 - idx * 28,
      category: 'X (Twitter) Feed',
      sentiment: idx === 2 ? 'neutral' : 'positive',
      sentimentScore: idx === 2 ? 54 : 78
    })),
    // Platform activity for X specifically: breakdown by post types on X!
    platformActivity: [
      { platform: 'Original Posts', posts: 512400, engagement: 2140000, share: 39.8, color: '#2563EB' },
      { platform: 'Retweets & Reposts', posts: 384100, engagement: 1450000, share: 29.9, color: '#06B6D4' },
      { platform: 'Replies & Threads', posts: 214800, engagement: 1890000, share: 16.7, color: '#3B82F6' },
      { platform: 'Quote Posts', posts: 112400, engagement: 980000, share: 8.8, color: '#D97706' },
      { platform: 'Media & Videos', posts: 60620, engagement: 820000, share: 4.8, color: '#16A34A' },
    ],
    liveAlerts: [
      {
        id: 'x-alert-1',
        title: `Real-time activity spike on ${formattedHandle}`,
        timeAgo: '1 min ago',
        type: 'trend',
        badgeColor: 'blue',
        description: `Mention velocity surged +194% following latest post published by ${formattedHandle}.`,
        confidence: 98.2,
        affectedCommunities: ['X Technology', 'X News']
      },
      ...liveIntelligenceFeed.slice(1)
    ],
    sentiment: {
      positive: sentimentPos,
      neutral: sentimentNeu,
      negative: sentimentNeg
    },
    languages: [
      { language: 'English', count: 655000, percentage: 51 },
      { language: 'Hindi', count: 359000, percentage: 28 },
      { language: 'Hinglish', count: 166000, percentage: 13 },
      { language: 'Other', count: 102000, percentage: 8 }
    ],
    segments: [
      {
        name: 'Technology Enthusiasts',
        percentage: 42,
        reach: '539,400 followers',
        description: `Highly active developer and engineering community engaging with ${formattedHandle}.`
      },
      {
        name: 'Industry & Business',
        percentage: 26,
        reach: '333,900 followers',
        description: 'Founders, investors, and analysts tracking strategic announcements.'
      },
      {
        name: 'News & Media Wire',
        percentage: 19,
        reach: '244,000 followers',
        description: 'Journalists and automated amplification accounts republishing quotes.'
      },
      {
        name: 'General Public',
        percentage: 13,
        reach: '166,900 followers',
        description: 'Casual community observers and discussion participants.'
      }
    ],
    twitterProfile: profile
  };

  return { profile, results };
}

export const AnalysisProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [twitterHandle, setTwitterHandle] = useState<string>(() => {
    return localStorage.getItem('socialpulse-twitter-handle') || '@socialpulse_ai';
  });

  const [selectedPlatform, setSelectedPlatform] = useState<string>('X');
  const [dateRange, setDateRange] = useState<string>('24h');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Initialize with Twitter data
  const initialData = useMemo(() => generateTwitterData(twitterHandle), []);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults>(() => {
    try {
      const saved = localStorage.getItem('socialpulse-analysis-results');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialData.results;
  });

  const [twitterProfile, setTwitterProfile] = useState<TwitterProfileData>(() => {
    try {
      const saved = localStorage.getItem('socialpulse-twitter-profile');
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialData.profile;
  });

  const analyzeTwitterAccount = async (handle: string): Promise<void> => {
    setIsAnalyzing(true);
    // Simulate real-time streaming pipeline
    await new Promise(resolve => setTimeout(resolve, 800));

    const { profile, results } = generateTwitterData(handle);
    setTwitterHandle(profile.handle);
    setTwitterProfile(profile);
    setAnalysisResults(results);
    setSelectedPlatform('X');

    try {
      localStorage.setItem('socialpulse-twitter-handle', profile.handle);
      localStorage.setItem('socialpulse-twitter-profile', JSON.stringify(profile));
      localStorage.setItem('socialpulse-analysis-results', JSON.stringify(results));
    } catch {}

    setIsAnalyzing(false);
  };

  const resetToDefault = () => {
    analyzeTwitterAccount('@socialpulse_ai');
  };

  const value = useMemo(
    () => ({
      twitterHandle,
      isAnalyzing,
      selectedPlatform: 'X', // Exclusively X
      dateRange,
      analysisResults,
      twitterProfile,
      setSelectedPlatform: () => {}, // Locked to X
      setDateRange,
      analyzeTwitterAccount,
      resetToDefault
    }),
    [twitterHandle, isAnalyzing, dateRange, analysisResults, twitterProfile]
  );

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
};

export const useAnalysis = () => {
  const value = useContext(AnalysisContext);
  if (!value) throw new Error('useAnalysis must be used within AnalysisProvider');
  return value;
};
