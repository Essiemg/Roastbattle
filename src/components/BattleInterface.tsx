import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Trophy, Send, Eye } from 'lucide-react';
import type { Battle } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface BattleInterfaceProps {
  battle: Battle;
  onBack: () => void;
}

const BattleInterface: React.FC<BattleInterfaceProps> = ({ battle, onBack }) => {
  const { user } = useAuth();
  const [roastText, setRoastText] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isMyTurn, setIsMyTurn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsMyTurn(false);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmitRoast = () => {
    if (roastText.trim()) {
      // Here would normally submit to backend
      setRoastText('');
      setIsMyTurn(false);
      setTimeLeft(60);
    }
  };

  const wordCount = roastText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const opponent = battle.participants.find(p => p.id !== user?.id);

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-reddit-orange to-roast-secondary text-white">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Battles</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>{battle.spectators} watching</span>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold">Round {battle.currentRound}/{battle.maxRounds}</div>
              {battle.theme && <div className="text-sm opacity-90">{battle.theme}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Battle Arena */}
      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {battle.roasts.map((roast, index) => {
              const isCurrentUser = roast.userId === user?.id;
              const roastUser = battle.participants.find(p => p.id === roast.userId);
              
              return (
                <div
                  key={roast.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    isCurrentUser
                      ? 'bg-reddit-orange text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={roastUser?.avatar}
                        alt={roastUser?.username}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className={`text-xs font-medium ${
                        isCurrentUser ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        u/{roastUser?.username} • Round {roast.round}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{roast.text}</p>
                    <div className={`flex items-center justify-between mt-2 text-xs ${
                      isCurrentUser ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      <span>{roast.votes} votes</span>
                      <span>{new Date(roast.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${
                  isMyTurn ? 'text-green-600' : 'text-gray-500'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{timeLeft}s</span>
                </div>
                <div className={`text-sm ${
                  wordCount > 100 ? 'text-red-500' : wordCount > 80 ? 'text-yellow-500' : 'text-gray-500'
                }`}>
                  {wordCount}/100 words
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {isMyTurn ? 'Your turn' : `${opponent?.username}'s turn`}
              </div>
            </div>

            <div className="flex space-x-3">
              <div className="flex-1">
                <textarea
                  value={roastText}
                  onChange={(e) => setRoastText(e.target.value)}
                  placeholder={isMyTurn ? "Craft your devastating roast..." : "Waiting for opponent..."}
                  disabled={!isMyTurn}
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                  rows={3}
                />
              </div>
              <button
                onClick={handleSubmitRoast}
                disabled={!isMyTurn || !roastText.trim() || wordCount > 100}
                className="px-6 py-3 bg-reddit-orange text-white rounded-lg hover:bg-roast-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Roast!</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 flex flex-col">
          {/* Participants */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Fighters
            </h3>
            <div className="space-y-3">
              {battle.participants.map((participant) => {
                const isCurrentUser = participant.id === user?.id;
                return (
                  <div
                    key={participant.id}
                    className={`p-3 rounded-lg border ${
                      isCurrentUser ? 'border-reddit-orange bg-reddit-orange/5' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={participant.avatar}
                        alt={participant.username}
                        className="w-10 h-10 rounded-full border-2 border-reddit-orange"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          u/{participant.username}
                          {isCurrentUser && <span className="text-reddit-orange ml-1">(You)</span>}
                        </div>
                        <div className="text-sm text-gray-500">
                          {participant.wins}W • {participant.losses}L
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-600">
                      {participant.karma.toLocaleString()} karma • {participant.karmaLevel}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Spectator Voting */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Trophy className="w-4 h-4 mr-2" />
              Community Votes
            </h3>
            <div className="space-y-2">
              {battle.participants.map((participant) => {
                const votes = Math.floor(Math.random() * 30) + 1; // Mock votes
                return (
                  <div key={participant.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src={participant.avatar}
                        alt={participant.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-700">u/{participant.username}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-gray-200 rounded-full h-2 w-16">
                        <div
                          className="bg-reddit-orange h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(votes / 50) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{votes}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Battle Stats */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Battle Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Community:</span>
                <span className="font-medium">r/{battle.community}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Started:</span>
                <span className="font-medium">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Roasts:</span>
                <span className="font-medium">{battle.roasts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Spectators:</span>
                <span className="font-medium">{battle.spectators}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleInterface;