import React from 'react';
import { LogOut, Settings, Trophy, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-reddit-orange to-roast-secondary p-2 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Roast Battle Arena</h1>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-reddit-orange" />
                <span className="text-sm font-semibold text-gray-900">{user.roastCred} Roast Cred</span>
              </div>
              <div className="text-xs text-gray-500">Level {user.level} • {user.karmaLevel}</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
          </div>

          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-10 h-10 rounded-full border-2 border-reddit-orange"
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">u/{user.username}</div>
              <div className="text-xs text-gray-500">{user.karma.toLocaleString()} karma</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={logout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;