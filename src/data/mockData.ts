import type { User, Community, Battle, Achievement } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'RoastMaster2024',
  karma: 15420,
  karmaLevel: 'Witty Warrior',
  roastCred: 850,
  level: 12,
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  joinedCommunities: ['gaming', 'funny', 'roastme', 'programming', 'memes'],
  wins: 23,
  losses: 8,
  totalBattles: 31,
  achievements: [
    {
      id: '1',
      name: 'First Blood',
      description: 'Won your first roast battle',
      icon: '🏆',
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Community Champion',
      description: 'Won 5 battles in a single community',
      icon: '👑',
      unlockedAt: new Date('2024-02-20')
    }
  ],
  favoriteRoast: "Your code is so bad, even Stack Overflow wouldn't help you debug it."
};

export const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'gaming',
    displayName: 'r/gaming',
    icon: '🎮',
    members: 34200000,
    description: 'A subreddit for (almost) anything related to games',
    isPinned: true
  },
  {
    id: '2',
    name: 'funny',
    displayName: 'r/funny',
    icon: '😂',
    members: 52100000,
    description: 'Welcome to r/Funny, Reddit\'s largest humour depository',
    isPinned: true
  },
  {
    id: '3',
    name: 'roastme',
    displayName: 'r/RoastMe',
    icon: '🔥',
    members: 2800000,
    description: 'Roast me like one of your french fries'
  },
  {
    id: '4',
    name: 'programming',
    displayName: 'r/programming',
    icon: '💻',
    members: 4200000,
    description: 'Computer Programming'
  },
  {
    id: '5',
    name: 'memes',
    displayName: 'r/memes',
    icon: '🐸',
    members: 22500000,
    description: 'Memes! A way of describing cultural information being shared'
  }
];

export const mockBattles: Battle[] = [
  {
    id: '1',
    participants: [
      mockUser,
      {
        id: '2',
        username: 'CodeNinja47',
        karma: 12800,
        karmaLevel: 'Witty Warrior',
        roastCred: 720,
        level: 10,
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        joinedCommunities: ['programming'],
        wins: 18,
        losses: 12,
        totalBattles: 30,
        achievements: []
      }
    ],
    community: 'programming',
    status: 'active',
    currentRound: 2,
    maxRounds: 3,
    roasts: [
      {
        id: '1',
        userId: '1',
        text: "Your code is so messy, even your comments need comments to explain what they're trying to say.",
        round: 1,
        timestamp: new Date(),
        votes: 12
      },
      {
        id: '2',
        userId: '2',
        text: "I've seen more structure in a bowl of spaghetti than in your JavaScript functions.",
        round: 1,
        timestamp: new Date(),
        votes: 8
      }
    ],
    spectators: 47,
    votes: {},
    createdAt: new Date(),
    theme: 'Programming Fails'
  },
  {
    id: '2',
    participants: [
      {
        id: '3',
        username: 'MemeLord2024',
        karma: 8500,
        karmaLevel: 'Newbie Roaster',
        roastCred: 340,
        level: 6,
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        joinedCommunities: ['memes'],
        wins: 12,
        losses: 15,
        totalBattles: 27,
        achievements: []
      }
    ],
    community: 'memes',
    status: 'waiting',
    currentRound: 0,
    maxRounds: 3,
    roasts: [],
    spectators: 23,
    votes: {},
    createdAt: new Date(),
    theme: 'Classic Memes'
  }
];