import React, { useState } from 'react';
import { Sword, Clock, Users, Trophy, Plus, Eye } from 'lucide-react';
import type { Battle } from '../types';
import { mockBattles } from '../data/mockData';

interface BattlePanelProps {
  onJoinBattle: (battle: Battle) => void;
}

const BattlePanel: React.FC<BattlePanelProps> = ({ onJoinBattle }) => {
  const [battles] = useState<Battle[]>(mockBattles);
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed'>('available');

  const availableBattles = battles.filter(b => b.status === 'waiting');
  const activeBattles = battles.filter(b => b.status === 'active');
  const completedBattles = battles.filter(b => b.status === 'completed');

  const getBattlesByTab = () => {
    switch (activeTab) {
      case 'available': return availableBattles;
      case 'active': return activeBattles;
      case 'completed': return completedBattles;
      default: return [];
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Sword className="w-5 h-5 text-reddit-orange mr-2" />
            Roast Battles
          </h2>
          <button className="bg-reddit-orange text-white px-4 py-2 rounded-lg hover:bg-roast-secondary transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Battle</span>
          </button>
        </div>

        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { key: 'available', label: 'Available', count: availableBattles.length },
            { key: 'active', label: 'Active', count: activeBattles.length },
            { key: 'completed', label: 'Completed', count: completedBattles.length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === key
                  ? 'bg-white text-reddit-orange shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {getBattlesByTab().map((battle) => (
            <BattleCard
              key={battle.id}
              battle={battle}
              onJoin={() => onJoinBattle(battle)}
            />
          ))}
          {getBattlesByTab().length === 0 && (
            <div className="text-center py-12">
              <Sword className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No {activeTab} battles found</p>
              <p className="text-sm text-gray-400">Check back later or create a new battle!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BattleCard: React.FC<{
  battle: Battle;
  onJoin: () => void;
}> = ({ battle, onJoin }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'Waiting for opponent';
      case 'active': return `Round ${battle.currentRound}/${battle.maxRounds}`;
      case 'completed': return 'Battle ended';
      default: return status;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-reddit-orange hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(battle.status)}`}>
              {getStatusText(battle.status)}
            </span>
            {battle.theme && (
              <span className="px-2 py-1 text-xs bg-reddit-orange text-white rounded-full">
                {battle.theme}
              </span>
            )}
          </div>
          
          {battle.community && (
            <p className="text-sm text-gray-600 mb-2">r/{battle.community}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{battle.spectators}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>2h ago</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {battle.participants.map((participant, index) => (
          <div key={participant.id} className="flex items-center space-x-3">
            <img
              src={participant.avatar}
              alt={participant.username}
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-gray-900">u/{participant.username}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {participant.karmaLevel}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {participant.wins}W • {participant.losses}L • {participant.karma.toLocaleString()} karma
              </div>
            </div>
            {battle.winner === participant.id && (
              <Trophy className="w-5 h-5 text-yellow-500" />
            )}
          </div>
        ))}
        
        {battle.participants.length === 1 && battle.status === 'waiting' && (
          <div className="flex items-center space-x-3 opacity-50">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-gray-500 italic">Waiting for opponent...</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {battle.roasts.length} roasts • {battle.votes ? Object.keys(battle.votes).length : 0} votes
        </div>
        <button
          onClick={onJoin}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            battle.status === 'waiting'
              ? 'bg-reddit-orange text-white hover:bg-roast-secondary'
              : battle.status === 'active'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {battle.status === 'waiting' ? 'Join Battle' : 
           battle.status === 'active' ? 'View Battle' : 'View Results'}
        </button>
      </div>
    </div>
  );
};

export default BattlePanel;