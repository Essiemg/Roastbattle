import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { mockCommunities, mockBattles } from '../data/mockData';
import type { Community, Battle } from '../types';

const { width } = Dimensions.get('window');

const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [battles] = useState<Battle[]>(mockBattles);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed'>('available');

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

  const handleJoinBattle = (battle: Battle) => {
    navigation.navigate('Battle', { battle });
  };

  if (!user) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      {/* Header */}
      <View style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              backgroundColor: '#FF4500',
              padding: 8,
              borderRadius: 8,
              marginRight: 12
            }}>
              <Ionicons name="flash" size={24} color="white" />
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#333' }}>
              Roast Battle Arena
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ alignItems: 'flex-end', marginRight: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="trophy" size={16} color="#FF4500" style={{ marginRight: 4 }} />
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>
                  {user.roastCred} Roast Cred
                </Text>
              </View>
              <Text style={{ fontSize: 12, color: '#666' }}>
                Level {user.level} • {user.karmaLevel}
              </Text>
            </View>
            
            <Image
              source={{ uri: user.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#FF4500' }}
            />
            
            <TouchableOpacity onPress={logout} style={{ marginLeft: 12 }}>
              <Ionicons name="log-out-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {/* Communities Section */}
        <View style={{ backgroundColor: 'white', margin: 16, borderRadius: 12, padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Ionicons name="people" size={20} color="#FF4500" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
              Your Communities
            </Text>
          </View>
          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
            paddingHorizontal: 12,
            marginBottom: 16
          }}>
            <Ionicons name="search" size={16} color="#666" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search communities..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={{ flex: 1, paddingVertical: 12, fontSize: 16 }}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredCommunities.slice(0, 5).map((community) => (
              <TouchableOpacity
                key={community.id}
                style={{
                  backgroundColor: '#F8F8F8',
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 12,
                  width: 140,
                  borderWidth: community.isPinned ? 2 : 1,
                  borderColor: community.isPinned ? '#FF4500' : '#E5E5E5'
                }}
                onPress={() => togglePin(community.id)}
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>{community.icon}</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 }}>
                  {community.displayName}
                </Text>
                <Text style={{ fontSize: 12, color: '#666', numberOfLines: 2 }}>
                  {community.members.toLocaleString()} members
                </Text>
                {community.isPinned && (
                  <Ionicons name="star" size={16} color="#FF4500" style={{ position: 'absolute', top: 8, right: 8 }} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Battles Section */}
        <View style={{ backgroundColor: 'white', margin: 16, marginTop: 0, borderRadius: 12, padding: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="flash" size={20} color="#FF4500" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                Roast Battles
              </Text>
            </View>
            <TouchableOpacity style={{
              backgroundColor: '#FF4500',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 6,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Ionicons name="add" size={16} color="white" style={{ marginRight: 4 }} />
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>Create</Text>
            </TouchableOpacity>
          </View>

          {/* Battle Tabs */}
          <View style={{
            flexDirection: 'row',
            backgroundColor: '#F5F5F5',
            borderRadius: 8,
            padding: 4,
            marginBottom: 16
          }}>
            {[
              { key: 'available', label: 'Available', count: availableBattles.length },
              { key: 'active', label: 'Active', count: activeBattles.length },
              { key: 'completed', label: 'Completed', count: completedBattles.length }
            ].map(({ key, label, count }) => (
              <TouchableOpacity
                key={key}
                onPress={() => setActiveTab(key as any)}
                style={{
                  flex: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 6,
                  backgroundColor: activeTab === key ? 'white' : 'transparent'
                }}
              >
                <Text style={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '600',
                  color: activeTab === key ? '#FF4500' : '#666'
                }}>
                  {label} ({count})
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Battle List */}
          {getBattlesByTab().map((battle) => (
            <BattleCard
              key={battle.id}
              battle={battle}
              onJoin={() => handleJoinBattle(battle)}
            />
          ))}
          
          {getBattlesByTab().length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: 32 }}>
              <Ionicons name="flash-outline" size={48} color="#CCC" style={{ marginBottom: 16 }} />
              <Text style={{ color: '#666', fontSize: 16, marginBottom: 8 }}>
                No {activeTab} battles found
              </Text>
              <Text style={{ color: '#999', fontSize: 14 }}>
                Check back later or create a new battle!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BattleCard: React.FC<{
  battle: Battle;
  onJoin: () => void;
}> = ({ battle, onJoin }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return '#F59E0B';
      case 'active': return '#10B981';
      case 'completed': return '#6B7280';
      default: return '#6B7280';
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
    <View style={{
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{
              backgroundColor: getStatusColor(battle.status) + '20',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              marginRight: 8
            }}>
              <Text style={{
                fontSize: 12,
                fontWeight: '600',
                color: getStatusColor(battle.status)
              }}>
                {getStatusText(battle.status)}
              </Text>
            </View>
            {battle.theme && (
              <View style={{
                backgroundColor: '#FF4500',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12
              }}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }}>
                  {battle.theme}
                </Text>
              </View>
            )}
          </View>
          
          {battle.community && (
            <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
              r/{battle.community}
            </Text>
          )}
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="eye" size={16} color="#666" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 14, color: '#666', marginRight: 12 }}>
            {battle.spectators}
          </Text>
          <Ionicons name="time" size={16} color="#666" style={{ marginRight: 4 }} />
          <Text style={{ fontSize: 14, color: '#666' }}>2h ago</Text>
        </View>
      </View>

      {/* Participants */}
      {battle.participants.map((participant, index) => (
        <View key={participant.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Image
            source={{ uri: participant.avatar }}
            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#333', marginRight: 8 }}>
                u/{participant.username}
              </Text>
              <View style={{
                backgroundColor: '#F5F5F5',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4
              }}>
                <Text style={{ fontSize: 12, color: '#666' }}>
                  {participant.karmaLevel}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 12, color: '#666' }}>
              {participant.wins}W • {participant.losses}L • {participant.karma.toLocaleString()} karma
            </Text>
          </View>
          {battle.winner === participant.id && (
            <Ionicons name="trophy" size={20} color="#F59E0B" />
          )}
        </View>
      ))}

      {battle.participants.length === 1 && battle.status === 'waiting' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, opacity: 0.5 }}>
          <View style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: '#E5E5E5',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 12
          }}>
            <Ionicons name="person-add" size={16} color="#999" />
          </View>
          <Text style={{ color: '#666', fontStyle: 'italic' }}>
            Waiting for opponent...
          </Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
        <Text style={{ fontSize: 14, color: '#666' }}>
          {battle.roasts.length} roasts • {battle.votes ? Object.keys(battle.votes).length : 0} votes
        </Text>
        <TouchableOpacity
          onPress={onJoin}
          style={{
            backgroundColor: battle.status === 'waiting' ? '#FF4500' : 
                           battle.status === 'active' ? '#10B981' : '#6B7280',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 6
          }}
        >
          <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
            {battle.status === 'waiting' ? 'Join Battle' : 
             battle.status === 'active' ? 'View Battle' : 'View Results'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;