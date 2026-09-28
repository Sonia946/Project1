import {
  DashboardStats,
  SentimentTimelinePoint,
  LiveIntelligenceAlert,
  TrendingTopic,
  PlatformActivity,
  EmotionItem,
  SentimentSignal,
  DemographicData,
  TrendDetectionItem,
  TopicEvolutionPoint,
  RelatedNarrative,
  InfluentialNode,
  AIInsightItem,
  ChatMessage,
  DataSourceItem
} from '../types';

export const dashboardStats: DashboardStats = {
  totalPosts: 1284320,
  totalPostsChange: 18.4,
  activeAccounts: 84231,
  activeAccountsChange: 12.7,
  trendingTopics: 27,
  trendingTopicsNew: 8,
  overallSentiment: 68,
  overallSentimentChange: 4.2,
  sparklines: {
    posts: [40, 48, 45, 55, 62, 58, 70, 78, 85, 92],
    accounts: [32, 35, 38, 42, 40, 48, 52, 60, 68, 74],
    topics: [18, 19, 21, 20, 22, 24, 25, 26, 26, 27],
    sentiment: [60, 62, 61, 64, 63, 65, 66, 65, 67, 68],
  }
};

export const sentimentTimeline24h: SentimentTimelinePoint[] = [
  { time: '00:00', positive: 45, neutral: 35, negative: 20, volume: 32000 },
  { time: '02:00', positive: 48, neutral: 34, negative: 18, volume: 24000 },
  { time: '04:00', positive: 50, neutral: 33, negative: 17, volume: 19000 },
  { time: '06:00', positive: 47, neutral: 36, negative: 17, volume: 38000 },
  { time: '08:00', positive: 44, neutral: 38, negative: 18, volume: 68000 },
  { time: '10:00', positive: 46, neutral: 34, negative: 20, volume: 92000 },
  { time: '12:00', positive: 42, neutral: 33, negative: 25, volume: 115000 },
  { time: '14:00', positive: 36, neutral: 28, negative: 36, volume: 142000 },
  { time: '15:00', positive: 32, neutral: 24, negative: 44, volume: 168000 }, // Negative sentiment spike
  { time: '16:00', positive: 39, neutral: 32, negative: 29, volume: 130000 },
  { time: '18:00', positive: 44, neutral: 34, negative: 22, volume: 121000 },
  { time: '20:00', positive: 48, neutral: 32, negative: 20, volume: 104000 },
  { time: '22:00', positive: 49, neutral: 33, negative: 18, volume: 76000 },
];

export const liveIntelligenceFeed: LiveIntelligenceAlert[] = [
  {
    id: 'alert-1',
    title: 'Emerging trend detected',
    timeAgo: '2 min ago',
    type: 'trend',
    badgeColor: 'blue',
    description: 'Sudden 213% velocity surge in topic #AIRegulation across developer and policy clusters.',
    confidence: 96.4,
    affectedCommunities: ['Technology', 'News']
  },
  {
    id: 'alert-2',
    title: 'Negative sentiment spike',
    timeAgo: '8 min ago',
    type: 'negative_spike',
    badgeColor: 'red',
    description: 'Sarcasm and anxiety indices climbed 18% within X and Reddit discussions regarding GPU export controls.',
    confidence: 91.8,
    affectedCommunities: ['Technology', 'Business']
  },
  {
    id: 'alert-3',
    title: 'New influence node detected',
    timeAgo: '14 min ago',
    type: 'node',
    badgeColor: 'cyan',
    description: 'Anonymized Hub node @Node_Alpha achieved PageRank score of 0.892 via high-degree cross-reposts.',
    confidence: 88.5,
    affectedCommunities: ['News', 'Education']
  },
  {
    id: 'alert-4',
    title: 'Cross-community propagation',
    timeAgo: '21 min ago',
    type: 'propagation',
    badgeColor: 'amber',
    description: 'Cybersecurity alert narrative crossed from private Telegram channels into mainstream X feeds.',
    confidence: 94.1,
    affectedCommunities: ['Technology', 'Telegram', 'News']
  },
];

export const trendingTopics: TrendingTopic[] = [
  {
    id: 't-1',
    tag: '#ArtificialIntelligence',
    name: 'Artificial Intelligence',
    mentions: 82431,
    growth: 187,
    category: 'Technology',
    sentiment: 'positive',
    sentimentScore: 78
  },
  {
    id: 't-2',
    tag: '#CyberSecurity',
    name: 'Cybersecurity Architecture',
    mentions: 54210,
    growth: 94,
    category: 'Infra & Security',
    sentiment: 'neutral',
    sentimentScore: 54
  },
  {
    id: 't-3',
    tag: '#AIRegulation',
    name: 'Global AI Regulatory Frameworks',
    mentions: 21430,
    growth: 213,
    category: 'Policy & Law',
    sentiment: 'negative',
    sentimentScore: 32
  },
  {
    id: 't-4',
    tag: '#MachineLearning',
    name: 'Machine Learning Infrastructure',
    mentions: 18230,
    growth: 42,
    category: 'Data Science',
    sentiment: 'positive',
    sentimentScore: 82
  },
  {
    id: 't-5',
    tag: '#AutonomousAgents',
    name: 'Autonomous Agent Orchestration',
    mentions: 14890,
    growth: 156,
    category: 'Technology',
    sentiment: 'positive',
    sentimentScore: 74
  },
  {
    id: 't-6',
    tag: '#QuantumComputing',
    name: 'Post-Quantum Cryptography',
    mentions: 11200,
    growth: 38,
    category: 'Research',
    sentiment: 'positive',
    sentimentScore: 68
  }
];

export const platformActivity: PlatformActivity[] = [
  { platform: 'X', posts: 512400, engagement: 2140000, share: 39.8, color: '#2563EB' },
  { platform: 'Telegram', posts: 284100, engagement: 1450000, share: 22.1, color: '#06B6D4' },
  { platform: 'Instagram', posts: 214800, engagement: 1890000, share: 16.7, color: '#3B82F6' },
  { platform: 'Reddit', posts: 162400, engagement: 980000, share: 12.6, color: '#D97706' },
  { platform: 'YouTube', posts: 110620, engagement: 820000, share: 8.8, color: '#DC2626' },
];

export const sentimentOverview = {
  positive: 42,
  neutral: 31,
  negative: 27,
  positiveChange: +5.1,
  neutralChange: -1.8,
  negativeChange: -3.3,
  confidenceAverage: 92.4,
  volumeAnalyzed: '1.28M posts'
};

export const emotionBreakdown: EmotionItem[] = [
  { emotion: 'Excitement', percentage: 34, color: '#2563EB', description: 'Product announcements & breakthrough algorithmic models' },
  { emotion: 'Support', percentage: 29, color: '#16A34A', description: 'Community endorsements, open-source adoption, and tutorials' },
  { emotion: 'Anxiety', percentage: 16, color: '#D97706', description: 'Concerns regarding workforce shifts and hardware bottlenecks' },
  { emotion: 'Anger', percentage: 11, color: '#DC2626', description: 'Reactions to platform rate limits and vendor price increases' },
  { emotion: 'Sarcasm', percentage: 7, color: '#8B5CF6', description: 'Satirical commentary on overhyped startup claims' },
  { emotion: 'Other', percentage: 3, color: '#64748B', description: 'Ambiguous or mixed expressive signals' },
];

export const sentimentByPlatform = [
  { platform: 'X', positive: 38, neutral: 33, negative: 29 },
  { platform: 'Telegram', positive: 45, neutral: 34, negative: 21 },
  { platform: 'Instagram', positive: 58, neutral: 28, negative: 14 },
  { platform: 'Reddit', positive: 32, neutral: 30, negative: 38 },
  { platform: 'YouTube', positive: 46, neutral: 32, negative: 22 },
];

export const recentSentimentSignals: SentimentSignal[] = [
  {
    id: 'sig-1',
    post: "The newly published benchmarks on open-weight reasoning models completely shatter expectations. Latency dropped by 4x while retention improved.",
    author: "Node_DevAlpha",
    platform: 'X',
    sentiment: 'Positive',
    emotion: 'Excitement',
    confidence: 97.2,
    time: '2m ago',
    engagement: 4210
  },
  {
    id: 'sig-2',
    post: "Notice how strict the updated compliance requirements are under the new EU AI Act? Startups without legal teams are going to suffer immense overhead.",
    author: "LegalTechPulse",
    platform: 'X',
    sentiment: 'Negative',
    emotion: 'Anxiety',
    confidence: 94.6,
    time: '6m ago',
    engagement: 1890
  },
  {
    id: 'sig-3',
    post: "Distributed cluster checkpointing is now fully integrated into the production training pipeline. Great work by the infrastructure team.",
    author: "SysArch_Global",
    platform: 'Telegram',
    sentiment: 'Positive',
    emotion: 'Support',
    confidence: 92.1,
    time: '11m ago',
    engagement: 840
  },
  {
    id: 'sig-4',
    post: "Wait, so every cloud provider just decided in unison to hike per-token inference rates? What an incredible coincidence for all of us building on their APIs.",
    author: "SaaSBuilder99",
    platform: 'Reddit',
    sentiment: 'Negative',
    emotion: 'Sarcasm',
    confidence: 96.0,
    time: '15m ago',
    engagement: 3410
  },
  {
    id: 'sig-5',
    post: "Standardized benchmarking protocol released for multi-agent coordination frameworks. Initial evaluations align closely with synthetic benchmarks.",
    author: "AgenticResearch",
    platform: 'X',
    sentiment: 'Neutral',
    emotion: 'Support',
    confidence: 91.4,
    time: '22m ago',
    engagement: 1205
  },
  {
    id: 'sig-6',
    post: "Complete visual breakdown: How real-time vector embeddings index 500 million tokens in under 12 milliseconds.",
    author: "DataVizStudio",
    platform: 'Instagram',
    sentiment: 'Positive',
    emotion: 'Excitement',
    confidence: 95.8,
    time: '34m ago',
    engagement: 8920
  },
  {
    id: 'sig-7',
    post: "Our security operations center flagged unauthorized token scraping originating from unknown botnets targeting public documentation mirrors.",
    author: "CyberWatchHQ",
    platform: 'Telegram',
    sentiment: 'Negative',
    emotion: 'Anger',
    confidence: 93.7,
    time: '45m ago',
    engagement: 2190
  },
  {
    id: 'sig-8',
    post: "Comprehensive 45-minute deep dive comparing decentralized agent architectures versus centralized master orchestrators.",
    author: "TechInsightsMedia",
    platform: 'YouTube',
    sentiment: 'Neutral',
    emotion: 'Support',
    confidence: 89.9,
    time: '1h ago',
    engagement: 15400
  },
  {
    id: 'sig-9',
    post: "Incredible community feedback on our open PR today! More than 40 contributors stepped in to debug the edge-case race condition.",
    author: "OpenSourceLead",
    platform: 'X',
    sentiment: 'Positive',
    emotion: 'Excitement',
    confidence: 98.4,
    time: '1h 12m ago',
    engagement: 3100
  },
  {
    id: 'sig-10',
    post: "Another quarter, another round of regulatory mandates that nobody actually knows how to audit from a neural weight standpoint.",
    author: "NeuralAuditGuru",
    platform: 'Reddit',
    sentiment: 'Negative',
    emotion: 'Anxiety',
    confidence: 92.5,
    time: '1h 30m ago',
    engagement: 4180
  },
  {
    id: 'sig-11',
    post: "The conference keynote schedule for Q4 is now live. Sessions will cover federated fine-tuning, security audits, and privacy preservation.",
    author: "GlobalAIFoundation",
    platform: 'X',
    sentiment: 'Neutral',
    emotion: 'Support',
    confidence: 93.0,
    time: '1h 45m ago',
    engagement: 1670
  },
  {
    id: 'sig-12',
    post: "High-level summary of the cross-border digital governance treaties discussed this morning in Geneva.",
    author: "PolicyDigestNet",
    platform: 'Telegram',
    sentiment: 'Neutral',
    emotion: 'Other',
    confidence: 88.2,
    time: '2h ago',
    engagement: 920
  }
];

export const audienceDemographics: DemographicData = {
  ageGroups: [
    { range: '18–24', percentage: 31, count: 26110 },
    { range: '25–34', percentage: 42, count: 35377 },
    { range: '35–44', percentage: 19, count: 16003 },
    { range: '45+', percentage: 8, count: 6738 },
  ],
  languages: [
    { language: 'English', percentage: 51, speakers: '655,000+' },
    { language: 'Hindi', percentage: 28, speakers: '359,000+' },
    { language: 'Hinglish', percentage: 13, speakers: '166,000+' },
    { language: 'Other', percentage: 8, speakers: '102,000+' },
  ],
  interests: [
    { cluster: 'Technology', percentage: 32, growth: 24.5 },
    { cluster: 'Business', percentage: 21, growth: 16.2 },
    { cluster: 'Education', percentage: 17, growth: 12.8 },
    { cluster: 'Entertainment', percentage: 14, growth: 8.4 },
    { cluster: 'Sports', percentage: 9, growth: 5.1 },
    { cluster: 'Other', percentage: 7, growth: 3.0 },
  ],
  segments: [
    {
      name: 'Technology-focused',
      percentage: 42,
      reach: '539,400 active profiles',
      description: 'Software engineers, AI researchers, infra architects, cybersecurity analysts actively engaging with code and architecture releases.'
    },
    {
      name: 'Education & Career',
      percentage: 26,
      reach: '333,900 active profiles',
      description: 'University students, boot camp graduates, and upskilling professionals following tutorials, certifications, and career shifts.'
    },
    {
      name: 'General News',
      percentage: 19,
      reach: '244,000 active profiles',
      description: 'Broad audience following mainstream media coverage, tech legislation, economic market movements, and geopolitical shifts.'
    },
    {
      name: 'Entertainment',
      percentage: 13,
      reach: '166,900 active profiles',
      description: 'Creators, casual viewers, gaming enthusiasts, and digital culture participants following meme dynamics and viral trends.'
    },
  ],
  geoRegions: [
    { region: 'North America', share: 38.4, sentiment: 71, activeUsers: '493,100' },
    { region: 'Asia-Pacific (APAC)', share: 34.2, sentiment: 69, activeUsers: '439,200' },
    { region: 'Europe (EU/UK)', share: 18.6, sentiment: 58, activeUsers: '238,800' },
    { region: 'Latin America', share: 5.2, sentiment: 64, activeUsers: '66,700' },
    { region: 'Middle East & Africa', share: 3.6, sentiment: 66, activeUsers: '46,200' },
  ],
  activityTimeline: [
    { hour: '00:00', activeUsers: 24000, interactions: 52000 },
    { hour: '02:00', activeUsers: 18000, interactions: 38000 },
    { hour: '04:00', activeUsers: 14000, interactions: 28000 },
    { hour: '06:00', activeUsers: 29000, interactions: 64000 },
    { hour: '08:00', activeUsers: 54000, interactions: 122000 },
    { hour: '10:00', activeUsers: 78000, interactions: 184000 },
    { hour: '12:00', activeUsers: 84230, interactions: 215000 },
    { hour: '14:00', activeUsers: 81000, interactions: 204000 },
    { hour: '16:00', activeUsers: 76000, interactions: 188000 },
    { hour: '18:00', activeUsers: 71000, interactions: 172000 },
    { hour: '20:00', activeUsers: 62000, interactions: 148000 },
    { hour: '22:00', activeUsers: 42000, interactions: 95000 },
  ]
};

export const trendDetectionStats = {
  emergingTrends: 12,
  viralTopics: 5,
  risingKeywords: 34,
  trendVelocity: 47,
};

export const trendDetectionItems: TrendDetectionItem[] = [
  {
    id: 'tr-1',
    topic: 'Artificial Intelligence',
    mentions: 82431,
    growth: 187,
    velocity: 'Very High',
    engagement: 64201,
    status: 'Rising',
    platform: 'All',
    firstSeen: '4h ago'
  },
  {
    id: 'tr-2',
    topic: 'Cybersecurity',
    mentions: 54210,
    growth: 94,
    velocity: 'High',
    engagement: 38210,
    status: 'Rising',
    platform: 'X',
    firstSeen: '12h ago'
  },
  {
    id: 'tr-3',
    topic: 'AI Regulation',
    mentions: 21430,
    growth: 213,
    velocity: 'Extreme',
    engagement: 31820,
    status: 'Emerging',
    platform: 'All',
    firstSeen: '1h ago'
  },
  {
    id: 'tr-4',
    topic: 'Machine Learning',
    mentions: 18230,
    growth: 42,
    velocity: 'Medium',
    engagement: 12340,
    status: 'Stable',
    platform: 'Reddit',
    firstSeen: '24h ago'
  },
  {
    id: 'tr-5',
    topic: 'Autonomous Agents',
    mentions: 16800,
    growth: 164,
    velocity: 'Very High',
    engagement: 22400,
    status: 'Emerging',
    platform: 'X',
    firstSeen: '2h ago'
  },
  {
    id: 'tr-6',
    topic: 'Semiconductor Supply',
    mentions: 14350,
    growth: 28,
    velocity: 'Medium',
    engagement: 9800,
    status: 'Stable',
    platform: 'Telegram',
    firstSeen: '36h ago'
  },
  {
    id: 'tr-7',
    topic: 'Vector Databases',
    mentions: 12900,
    growth: 88,
    velocity: 'High',
    engagement: 14200,
    status: 'Rising',
    platform: 'X',
    firstSeen: '8h ago'
  },
  {
    id: 'tr-8',
    topic: 'Quantum Cryptography',
    mentions: 8900,
    growth: -12,
    velocity: 'Low',
    engagement: 5400,
    status: 'Peaking',
    platform: 'YouTube',
    firstSeen: '48h ago'
  },
];

export const topicEvolutionData: TopicEvolutionPoint[] = [
  { time: '06:00', artificialIntelligence: 34000, cybersecurity: 28000, aiRegulation: 4200, machineLearning: 12000 },
  { time: '08:00', artificialIntelligence: 42000, cybersecurity: 31000, aiRegulation: 6100, machineLearning: 13200 },
  { time: '10:00', artificialIntelligence: 55000, cybersecurity: 38000, aiRegulation: 9400, machineLearning: 14500 },
  { time: '12:00', artificialIntelligence: 68000, cybersecurity: 44000, aiRegulation: 13800, machineLearning: 15900 },
  { time: '14:00', artificialIntelligence: 76000, cybersecurity: 49000, aiRegulation: 18200, machineLearning: 17100 },
  { time: '16:00', artificialIntelligence: 81000, cybersecurity: 52000, aiRegulation: 20900, machineLearning: 17800 },
  { time: '18:00', artificialIntelligence: 82431, cybersecurity: 54210, aiRegulation: 21430, machineLearning: 18230 },
];

export const relatedNarratives: RelatedNarrative[] = [
  {
    title: 'AI Jobs',
    mentions: '38.4k mentions',
    sentiment: 'neutral',
    shift: '+14% discussion volume',
    keyPhrases: ['Prompt Engineer demand', 'Displacement vs Augmentation', 'Enterprise Re-skilling']
  },
  {
    title: 'AI Agents',
    mentions: '52.1k mentions',
    sentiment: 'positive',
    shift: '+88% velocity week-over-week',
    keyPhrases: ['Multi-agent workflows', 'Autonomous coding', 'Tool calling benchmarks']
  },
  {
    title: 'AI Regulation',
    mentions: '21.4k mentions',
    sentiment: 'negative',
    shift: '+213% spike in 6 hours',
    keyPhrases: ['Compliance audits', 'Model disclosure', 'EU Act enforcement']
  },
  {
    title: 'AI Coding',
    mentions: '46.8k mentions',
    sentiment: 'positive',
    shift: '+36% steady growth',
    keyPhrases: ['Copilot productivity', 'Refactoring agents', 'Full-stack automation']
  }
];

export const influentialNodes: InfluentialNode[] = [
  {
    id: 'node-a',
    name: 'Node Alpha (Tech Pioneer)',
    handle: '@node_alpha_sys',
    community: 'Technology',
    influenceScore: 94,
    connections: 12431,
    degreeCentrality: 0.884,
    betweenness: 0.742,
    pageRank: 0.941,
    communitySize: 4210,
    avatarBg: '#2563EB'
  },
  {
    id: 'node-b',
    name: 'Node Beta (Policy Wire)',
    handle: '@node_beta_reg',
    community: 'News',
    influenceScore: 89,
    connections: 9842,
    degreeCentrality: 0.762,
    betweenness: 0.698,
    pageRank: 0.887,
    communitySize: 2890,
    avatarBg: '#06B6D4'
  },
  {
    id: 'node-c',
    name: 'Node Gamma (Academia Hub)',
    handle: '@node_gamma_edu',
    community: 'Education',
    influenceScore: 84,
    connections: 7231,
    degreeCentrality: 0.689,
    betweenness: 0.584,
    pageRank: 0.824,
    communitySize: 1950,
    avatarBg: '#16A34A'
  },
  {
    id: 'node-d',
    name: 'Node Delta (Market Analyst)',
    handle: '@node_delta_biz',
    community: 'Business',
    influenceScore: 79,
    connections: 5890,
    degreeCentrality: 0.612,
    betweenness: 0.490,
    pageRank: 0.781,
    communitySize: 1620,
    avatarBg: '#D97706'
  }
];

export const networkTimelineSnapshots: Record<string, {
  nodes: { id: string; label: string; community: 'Technology' | 'News' | 'Education' | 'Business'; size: number; x: number; y: number }[];
  edges: { id: string; source: string; target: string; type: 'mentions' | 'replies' | 'reposts' | 'follows'; animated?: boolean }[];
}> = {
  '10:00': {
    nodes: [
      { id: '1', label: 'Node Alpha (Tech)', community: 'Technology', size: 36, x: 180, y: 140 },
      { id: '2', label: 'DevHub Core', community: 'Technology', size: 24, x: 260, y: 80 },
      { id: '3', label: 'InfraArch', community: 'Technology', size: 22, x: 120, y: 220 },
      { id: '4', label: 'Node Beta (News)', community: 'News', size: 30, x: 420, y: 160 },
      { id: '5', label: 'TechWire Daily', community: 'News', size: 20, x: 500, y: 100 },
      { id: '6', label: 'Node Gamma (Edu)', community: 'Education', size: 26, x: 300, y: 320 },
      { id: '7', label: 'CS Research Dept', community: 'Education', size: 18, x: 220, y: 380 },
      { id: '8', label: 'Node Delta (Biz)', community: 'Business', size: 25, x: 520, y: 300 },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'mentions' },
      { id: 'e1-3', source: '1', target: '3', type: 'replies' },
      { id: 'e4-5', source: '4', target: '5', type: 'reposts' },
      { id: 'e6-7', source: '6', target: '7', type: 'follows' },
      { id: 'e1-4', source: '1', target: '4', type: 'mentions' },
    ]
  },
  '12:00': {
    nodes: [
      { id: '1', label: 'Node Alpha (Tech)', community: 'Technology', size: 42, x: 170, y: 130 },
      { id: '2', label: 'DevHub Core', community: 'Technology', size: 28, x: 260, y: 70 },
      { id: '3', label: 'InfraArch', community: 'Technology', size: 26, x: 110, y: 220 },
      { id: '4', label: 'Node Beta (News)', community: 'News', size: 36, x: 410, y: 150 },
      { id: '5', label: 'TechWire Daily', community: 'News', size: 24, x: 510, y: 90 },
      { id: '6', label: 'Node Gamma (Edu)', community: 'Education', size: 30, x: 290, y: 310 },
      { id: '7', label: 'CS Research Dept', community: 'Education', size: 22, x: 210, y: 370 },
      { id: '8', label: 'Node Delta (Biz)', community: 'Business', size: 28, x: 520, y: 290 },
      { id: '9', label: 'OpenWeights Watch', community: 'Technology', size: 20, x: 190, y: 250 },
      { id: '10', label: 'Global Dispatch', community: 'News', size: 18, x: 480, y: 200 }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'mentions' },
      { id: 'e1-3', source: '1', target: '3', type: 'replies' },
      { id: 'e4-5', source: '4', target: '5', type: 'reposts' },
      { id: 'e6-7', source: '6', target: '7', type: 'follows' },
      { id: 'e1-4', source: '1', target: '4', type: 'reposts', animated: true },
      { id: 'e4-6', source: '4', target: '6', type: 'mentions', animated: true },
      { id: 'e1-9', source: '1', target: '9', type: 'mentions' },
      { id: 'e4-10', source: '4', target: '10', type: 'reposts' },
      { id: 'e4-8', source: '4', target: '8', type: 'mentions' },
    ]
  },
  '15:00': {
    nodes: [
      { id: '1', label: 'Node Alpha (Tech)', community: 'Technology', size: 48, x: 160, y: 120 },
      { id: '2', label: 'DevHub Core', community: 'Technology', size: 32, x: 260, y: 60 },
      { id: '3', label: 'InfraArch', community: 'Technology', size: 30, x: 100, y: 220 },
      { id: '4', label: 'Node Beta (News)', community: 'News', size: 44, x: 400, y: 140 },
      { id: '5', label: 'TechWire Daily', community: 'News', size: 30, x: 510, y: 80 },
      { id: '6', label: 'Node Gamma (Edu)', community: 'Education', size: 38, x: 280, y: 300 },
      { id: '7', label: 'CS Research Dept', community: 'Education', size: 28, x: 200, y: 370 },
      { id: '8', label: 'Node Delta (Biz)', community: 'Business', size: 34, x: 520, y: 280 },
      { id: '9', label: 'OpenWeights Watch', community: 'Technology', size: 24, x: 190, y: 240 },
      { id: '10', label: 'Global Dispatch', community: 'News', size: 26, x: 480, y: 190 },
      { id: '11', label: 'Telegram Relay 01', community: 'Technology', size: 32, x: 330, y: 210 },
      { id: '12', label: 'Venture Radar', community: 'Business', size: 22, x: 600, y: 320 }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'mentions' },
      { id: 'e1-4', source: '1', target: '4', type: 'reposts', animated: true },
      { id: 'e4-6', source: '4', target: '6', type: 'mentions', animated: true },
      { id: 'e6-11', source: '6', target: '11', type: 'replies', animated: true },
      { id: 'e11-8', source: '11', target: '8', type: 'mentions', animated: true },
      { id: 'e4-5', source: '4', target: '5', type: 'reposts' },
      { id: 'e8-12', source: '8', target: '12', type: 'reposts' },
      { id: 'e6-7', source: '6', target: '7', type: 'follows' },
      { id: 'e1-3', source: '1', target: '3', type: 'replies' },
      { id: 'e1-11', source: '1', target: '11', type: 'mentions', animated: true }
    ]
  },
  '18:00': {
    nodes: [
      { id: '1', label: 'Node Alpha (Tech)', community: 'Technology', size: 54, x: 150, y: 120 },
      { id: '2', label: 'DevHub Core', community: 'Technology', size: 36, x: 260, y: 60 },
      { id: '3', label: 'InfraArch', community: 'Technology', size: 32, x: 90, y: 210 },
      { id: '4', label: 'Node Beta (News)', community: 'News', size: 50, x: 390, y: 130 },
      { id: '5', label: 'TechWire Daily', community: 'News', size: 34, x: 520, y: 70 },
      { id: '6', label: 'Node Gamma (Edu)', community: 'Education', size: 44, x: 270, y: 300 },
      { id: '7', label: 'CS Research Dept', community: 'Education', size: 30, x: 190, y: 370 },
      { id: '8', label: 'Node Delta (Biz)', community: 'Business', size: 40, x: 530, y: 270 },
      { id: '9', label: 'OpenWeights Watch', community: 'Technology', size: 28, x: 180, y: 230 },
      { id: '10', label: 'Global Dispatch', community: 'News', size: 30, x: 490, y: 180 },
      { id: '11', label: 'Telegram Relay 01', community: 'Technology', size: 38, x: 320, y: 200 },
      { id: '12', label: 'Venture Radar', community: 'Business', size: 26, x: 620, y: 310 },
      { id: '13', label: 'Policy RoundTable', community: 'News', size: 30, x: 420, y: 240 }
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', type: 'mentions' },
      { id: 'e1-4', source: '1', target: '4', type: 'reposts', animated: true },
      { id: 'e4-6', source: '4', target: '6', type: 'mentions', animated: true },
      { id: 'e6-11', source: '6', target: '11', type: 'replies', animated: true },
      { id: 'e11-8', source: '11', target: '8', type: 'mentions', animated: true },
      { id: 'e4-5', source: '4', target: '5', type: 'reposts' },
      { id: 'e8-12', source: '8', target: '12', type: 'reposts' },
      { id: 'e6-7', source: '6', target: '7', type: 'follows' },
      { id: 'e1-3', source: '1', target: '3', type: 'replies' },
      { id: 'e1-11', source: '1', target: '11', type: 'mentions', animated: true },
      { id: 'e4-13', source: '4', target: '13', type: 'reposts' },
      { id: 'e13-8', source: '13', target: '8', type: 'mentions' }
    ]
  }
};

export const aiInsightItems: AIInsightItem[] = [
  {
    id: 'ai-1',
    title: 'Emerging Topic: AI Regulatory Enforcement',
    type: 'Emerging Topic Detected',
    timestamp: '14 min ago',
    summary: 'Accelerating mention volume (+213%) with high sentiment divergence. High density of policy terminology detected across technical discussion forums.',
    impactScore: 92,
    status: 'Critical',
    recommendations: [
      'Monitor European jurisdiction hashtags (#EUAIAct, #Compliance)',
      'Track developer migration towards local edge models',
      'Deploy synthetic audit filter on high-engagement threads'
    ]
  },
  {
    id: 'ai-2',
    title: 'Sentiment Shift: Compute Pricing Resentment',
    type: 'Sentiment Shift',
    timestamp: '32 min ago',
    summary: 'Negative sentiment increased from 21% to 44% between 14:20 and 15:10, concentrated heavily within Reddit and X developer communities.',
    impactScore: 84,
    status: 'High',
    recommendations: [
      'Segment developer complaints from general consumer chatter',
      'Analyze churn sentiment around API rate updates',
      'Track alternative open-source benchmark discussions'
    ]
  },
  {
    id: 'ai-3',
    title: 'Cross-Community Propagation: Telegram to X',
    type: 'Cross-Community Propagation',
    timestamp: '1 hour ago',
    summary: 'Infra vulnerability disclosure originating in private Telegram security channels bridged to public X feeds through Node Beta within 23 minutes.',
    impactScore: 78,
    status: 'Medium',
    recommendations: [
      'Identify the top 3 bridge nodes linking private groups to X',
      'Flag automated bot repost syndication networks',
      'Generate automated summary briefing for cybersecurity ops'
    ]
  }
];

export const suggestedAIQuestions = [
  "Why did negative sentiment increase today?",
  "What topics are growing fastest?",
  "How did the AI regulation discussion spread?",
  "Which communities are most engaged?"
];

export const mockAIResponses: Record<string, {
  text: string;
  clusters?: { name: string; percentage: number }[];
  propagationPath?: string[];
  disclaimer: string;
}> = {
  "Why did negative sentiment increase today?": {
    text: "Negative sentiment increased from 21% to 44% between 14:20 and 15:10.\n\nThe strongest associated topic clusters were:\n1. AI Regulation — 41%\n2. Platform Policy — 27%\n3. AI Jobs — 18%\n\nActivity was initially concentrated in the Technology community before appearing in News and Education communities.",
    clusters: [
      { name: 'AI Regulation', percentage: 41 },
      { name: 'Platform Policy', percentage: 27 },
      { name: 'AI Jobs', percentage: 18 },
      { name: 'Hardware Pricing', percentage: 14 }
    ],
    disclaimer: "This represents correlation in the observed dataset and does not establish causation."
  },
  "What topics are growing fastest?": {
    text: "Top 3 highest velocity topics over the current monitoring window:\n\n1. AI Regulation (+213% velocity surge, 21,430 mentions)\n2. Artificial Intelligence (+187% expansion, 82,431 mentions)\n3. Autonomous Agents (+156% acceleration, 14,890 mentions)\n\nNarratives around AI Regulation exhibit extreme propagation speed across policy, enterprise, and developer sectors.",
    clusters: [
      { name: 'AI Regulation', percentage: 46 },
      { name: 'Autonomous Agents', percentage: 32 },
      { name: 'Open-Source LLMs', percentage: 22 }
    ],
    disclaimer: "Growth metrics are computed from real-time streaming window calculations and may be subject to sample variance."
  },
  "How did the AI regulation discussion spread?": {
    text: "The AI Regulation discussion originated in developer repositories and specialized forums before crossing community boundaries:\n\n1. Technology Community (Origin: 10:15 UTC)\n2. Mainstream News & Media Nodes (11:40 UTC)\n3. Academic / Education Hubs (13:10 UTC)\n4. Telegram & Messaging Relays (14:25 UTC)\n\nThe primary bridging actor was @Node_Alpha whose repost was amplified by @Node_Beta across 9,842 secondary nodes.",
    propagationPath: ['Technology', 'News', 'Education', 'Telegram Channels', 'Public Forums'],
    disclaimer: "Propagation path analysis reflects graph link discovery and anonymized cascade modeling."
  },
  "Which communities are most engaged?": {
    text: "Community engagement ranking by interaction intensity and reply density:\n\n1. Technology Community (42% total interactions, 64.2k avg replies)\n2. Education & Career Sector (26% engagement, high retention on educational threads)\n3. News & Media Amplifiers (19% total volume, high repost velocity)\n4. Business & Enterprise Strategy (13% volume, high quote-retweet sentiment weighting)",
    clusters: [
      { name: 'Technology Community', percentage: 42 },
      { name: 'Education & Career', percentage: 26 },
      { name: 'News & Media', percentage: 19 },
      { name: 'Business Strategy', percentage: 13 }
    ],
    disclaimer: "Community segmentation utilizes unsupervised graph clustering based on mutual interaction density."
  }
};

export const dataSources: DataSourceItem[] = [
  { id: 'ds-1', name: 'X (Twitter)', icon: 'Twitter', status: 'Connected', latency: '42ms', eventsPerMin: '18,400/min', lastSync: 'Real-time' },
  { id: 'ds-2', name: 'Telegram Channels', icon: 'Send', status: 'Connected', latency: '68ms', eventsPerMin: '9,200/min', lastSync: 'Real-time' },
  { id: 'ds-3', name: 'Instagram Graph', icon: 'Instagram', status: 'Demo Mode', latency: '120ms', eventsPerMin: '5,800/min', lastSync: '5m ago' },
  { id: 'ds-4', name: 'Facebook Groups', icon: 'Facebook', status: 'Demo Mode', latency: '145ms', eventsPerMin: '3,400/min', lastSync: '12m ago' },
  { id: 'ds-5', name: 'Reddit Firehose', icon: 'MessageSquare', status: 'Demo Mode', latency: '95ms', eventsPerMin: '7,100/min', lastSync: '1m ago' },
  { id: 'ds-6', name: 'YouTube Data Feed', icon: 'Video', status: 'Demo Mode', latency: '210ms', eventsPerMin: '2,900/min', lastSync: '15m ago' }
];
