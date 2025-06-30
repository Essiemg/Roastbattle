export interface User {
  id: string;
  username: string;
  karma: number;
  karmaLevel: string;
  roastCred: number;
  level: number;
  avatar: string;
  joinedCommunities: string[];
  wins: number;
  losses: number;
  totalBattles: number;
  achievements: Achievement[];
  favoriteRoast?: string;
}

export interface Community {
  id: string;
  name: string;
  displayName: string;
  icon: string;
  members: number;
  description: string;
  isPinned?: boolean;
}

export interface Battle {
  id: string;
  participants: User[];
  community?: string;
  status: 'waiting' | 'active' | 'completed';
  currentRound: number;
  maxRounds: number;
  roasts: Roast[];
  spectators: number;
  votes: { [userId: string]: string };
  winner?: string;
  createdAt: Date;
  theme?: string;
}

export interface Roast {
  id: string;
  userId: string;
  text: string;
  round: number;
  timestamp: Date;
  votes: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  score: number;
  change: number;
}