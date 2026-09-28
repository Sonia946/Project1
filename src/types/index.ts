export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface DashboardStats {
  totalPosts: number;
  totalPostsChange: number;
  activeAccounts: number;
  activeAccountsChange: number;
  trendingTopics: number;
  trendingTopicsNew: number;
  overallSentiment: number;
  overallSentimentChange: number;
  sparklines: {
    posts: number[];
    accounts: number[];
    topics: number[];
    sentiment: number[];
  };
}

export interface SentimentTimelinePoint {
  time: string;
  positive: number;
  neutral: number;
  negative: number;
  volume?: number;
}

export interface LiveIntelligenceAlert {
  id: string;
  title: string;
  timeAgo: string;
  type: 'trend' | 'negative_spike' | 'node' | 'propagation' | 'volume';
  badgeColor: 'blue' | 'red' | 'amber' | 'cyan' | 'green';
  description: string;
  confidence: number;
  affectedCommunities: string[];
}

export interface TrendingTopic {
  id: string;
  tag: string;
  name: string;
  mentions: number;
  growth: number;
  category: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
}

export interface PlatformActivity {
  platform: string;
  posts: number;
  engagement: number;
  share: number;
  color: string;
}

export interface EmotionItem {
  emotion: string;
  percentage: number;
  color: string;
  description: string;
}

export interface SentimentSignal {
  id: string;
  post: string;
  author: string;
  platform: 'X' | 'Telegram' | 'Instagram' | 'Reddit' | 'YouTube';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  emotion: 'Excitement' | 'Support' | 'Anxiety' | 'Anger' | 'Sarcasm' | 'Other';
  confidence: number;
  time: string;
  engagement: number;
}

export interface DemographicData {
  ageGroups: { range: string; percentage: number; count: number }[];
  languages: { language: string; percentage: number; speakers: string }[];
  interests: { cluster: string; percentage: number; growth: number }[];
  segments: { name: string; percentage: number; reach: string; description: string }[];
  geoRegions: { region: string; share: number; sentiment: number; activeUsers: string }[];
  activityTimeline: { hour: string; activeUsers: number; interactions: number }[];
}

export interface TrendDetectionItem {
  id: string;
  topic: string;
  mentions: number;
  growth: number;
  velocity: 'Low' | 'Medium' | 'High' | 'Very High' | 'Extreme';
  engagement: number;
  status: 'Emerging' | 'Rising' | 'Stable' | 'Peaking';
  platform: 'All' | 'X' | 'Telegram' | 'Instagram' | 'Reddit' | 'YouTube';
  firstSeen: string;
}

export interface TopicEvolutionPoint {
  time: string;
  aiRegulation: number;
  cybersecurity: number;
  artificialIntelligence: number;
  machineLearning: number;
}

export interface RelatedNarrative {
  title: string;
  mentions: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  shift: string;
  keyPhrases: string[];
}

export interface InfluentialNode {
  id: string;
  name: string;
  handle: string;
  community: 'Technology' | 'News' | 'Education' | 'Business';
  influenceScore: number;
  connections: number;
  degreeCentrality: number;
  betweenness: number;
  pageRank: number;
  communitySize: number;
  avatarBg: string;
}

export interface AIInsightItem {
  id: string;
  title: string;
  type: 'Emerging Topic Detected' | 'Sentiment Shift' | 'Cross-Community Propagation' | 'Anomaly Detection';
  timestamp: string;
  summary: string;
  impactScore: number;
  status: 'Critical' | 'High' | 'Medium';
  recommendations: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  clusters?: { name: string; percentage: number }[];
  timelineData?: { time: string; value: number }[];
  disclaimer?: string;
  propagationPath?: string[];
}

export interface DataSourceItem {
  id: string;
  name: string;
  icon: string;
  status: 'Connected' | 'Demo Mode' | 'Offline';
  latency: string;
  eventsPerMin: string;
  lastSync: string;
}
