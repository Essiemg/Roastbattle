import React, { useState } from 'react';
import { Pin, PinOff, Search, Star, Users } from 'lucide-react';
import type { Community } from '../types';
import { mockCommunities } from '../data/mockData';

const CommunityPanel: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [searchTerm, setSearchTerm] = useState('');

  const togglePin = (communityId: string) => {
    setCommunities(prev =>
      prev.map(community =>
        community.id === communityId
          ? { ...community, isPinned: !community.isPinned }
          : community
      )
    );
  };

  const filteredCommunities = communities.filter(community =>
    community.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedCommunities = filteredCommunities.filter(c => c.isPinned);
  const unpinnedCommunities = filteredCommunities.filter(c => !c.isPinned);

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
          <Users className="w-5 h-5 text-reddit-orange mr-2" />
          Your Communities
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {pinnedCommunities.length > 0 && (
          <div className="p-4">
            <div className="flex items-center text-sm font-semibold text-gray-600 mb-3">
              <Star className="w-4 h-4 mr-1" />
              Pinned
            </div>
            <div className="space-y-2">
              {pinnedCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onTogglePin={togglePin}
                />
              ))}
            </div>
          </div>
        )}

        <div className="p-4">
          {pinnedCommunities.length > 0 && (
            <div className="text-sm font-semibold text-gray-600 mb-3">All Communities</div>
          )}
          <div className="space-y-2">
            {unpinnedCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                community={community}
                onTogglePin={togglePin}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunityCard: React.FC<{
  community: Community;
  onTogglePin: (id: string) => void;
}> = ({ community, onTogglePin }) => {
  return (
    <div className="group p-3 border border-gray-200 rounded-lg hover:border-reddit-orange hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <div className="text-2xl">{community.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 truncate">{community.displayName}</h3>
              {community.isPinned && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{community.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              {community.members.toLocaleString()} members
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(community.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-reddit-orange transition-all duration-200"
        >
          {community.isPinned ? (
            <PinOff className="w-4 h-4" />
          ) : (
            <Pin className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CommunityPanel;