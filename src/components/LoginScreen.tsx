import React, { useState } from 'react';
import { Shield, Zap, Trophy, Users, Star, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const { login, loading } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-roast-dark via-roast-dark-light to-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-reddit-orange to-roast-secondary p-4 rounded-full">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 font-reddit">
            Roast Battle
            <span className="text-reddit-orange"> Arena</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Challenge Redditors to epic text battles. Earn Roast Cred. Climb the leaderboards. 
            Show the world your wit is sharper than your code.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 text-reddit-orange mr-3" />
              Battle Features
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-reddit-orange/20 p-2 rounded-lg mt-1">
                  <Shield className="w-4 h-4 text-reddit-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Karma-Based Matching</h3>
                  <p className="text-gray-300 text-sm">Fight opponents in your skill tier for fair battles</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-reddit-orange/20 p-2 rounded-lg mt-1">
                  <Users className="w-4 h-4 text-reddit-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Community Battles</h3>
                  <p className="text-gray-300 text-sm">Compete within your favorite Reddit communities</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-reddit-orange/20 p-2 rounded-lg mt-1">
                  <Star className="w-4 h-4 text-reddit-orange" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Roast Cred System</h3>
                  <p className="text-gray-300 text-sm">Earn points, unlock cosmetics, and level up</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-reddit-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <p className="text-gray-300">Connect your Reddit account securely</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-reddit-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <p className="text-gray-300">Get matched with opponents of similar skill</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-reddit-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <p className="text-gray-300">Battle in 3 rounds with 60-second turns</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-reddit-orange text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                <p className="text-gray-300">Community votes decide the winner</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleLogin}
            disabled={isLoggingIn || loading}
            className="bg-gradient-to-r from-reddit-orange to-roast-secondary hover:from-roast-secondary hover:to-reddit-orange text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
          >
            {isLoggingIn || loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                <span>Connecting to Reddit...</span>
              </>
            ) : (
              <>
                <span>Login with Reddit</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
          <p className="text-gray-400 text-sm mt-4">
            We only access your public Reddit data and communities
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;