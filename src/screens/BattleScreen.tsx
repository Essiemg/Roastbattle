import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import type { Battle } from '../types';

const { width } = Dimensions.get('window');

const BattleScreen: React.FC<{ navigation: any; route: any }> = ({ navigation, route }) => {
  const { battle } = route.params;
  const { user } = useAuth();
  const [roastText, setRoastText] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isMyTurn, setIsMyTurn] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsMyTurn(!isMyTurn);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMyTurn]);

  const handleSubmitRoast = () => {
    if (roastText.trim()) {
      setRoastText('');
      setIsMyTurn(false);
      setTimeLeft(60);
    }
  };

  const wordCount = roastText.trim().split(/\s+/).filter(word => word.length > 0).length;
  const opponent = battle.participants.find((p: any) => p.id !== user?.id);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{
        backgroundColor: '#FF4500',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Ionicons name="arrow-back" size={24} color="white" style={{ marginRight: 8 }} />
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Back to Battles
          </Text>
        </TouchableOpacity>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="eye" size={16} color="white" style={{ marginRight: 4 }} />
          <Text style={{ color: 'white', fontSize: 14, marginRight: 16 }}>
            {battle.spectators} watching
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
              Round {battle.currentRound}/{battle.maxRounds}
            </Text>
            {battle.theme && (
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                {battle.theme}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        {/* Chat Area */}
        <View style={{ flex: 1 }}>
          {/* Messages */}
          <ScrollView style={{ flex: 1, padding: 16 }}>
            {battle.roasts.map((roast: any, index: number) => {
              const isCurrentUser = roast.userId === user?.id;
              const roastUser = battle.participants.find((p: any) => p.id === roast.userId);
              
              return (
                <View
                  key={roast.id}
                  style={{
                    alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
                    marginBottom: 16
                  }}
                >
                  <View style={{
                    maxWidth: '80%',
                    backgroundColor: isCurrentUser ? '#FF4500' : '#F5F5F5',
                    borderRadius: 16,
                    borderBottomRightRadius: isCurrentUser ? 4 : 16,
                    borderBottomLeftRadius: isCurrentUser ? 16 : 4,
                    padding: 12
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                      <Image
                        source={{ uri: roastUser?.avatar }}
                        style={{ width: 20, height: 20, borderRadius: 10, marginRight: 8 }}
                      />
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: isCurrentUser ? 'rgba(255,255,255,0.8)' : '#666'
                      }}>
                        u/{roastUser?.username} • Round {roast.round}
                      </Text>
                    </View>
                    <Text style={{
                      fontSize: 14,
                      lineHeight: 20,
                      color: isCurrentUser ? 'white' : '#333'
                    }}>
                      {roast.text}
                    </Text>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 8
                    }}>
                      <Text style={{
                        fontSize: 12,
                        color: isCurrentUser ? 'rgba(255,255,255,0.7)' : '#666'
                      }}>
                        {roast.votes} votes
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: isCurrentUser ? 'rgba(255,255,255,0.7)' : '#666'
                      }}>
                        {new Date(roast.timestamp).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          {/* Input Area */}
          <View style={{
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: '#E5E5E5',
            backgroundColor: 'white'
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginRight: 16
                }}>
                  <Ionicons
                    name="time"
                    size={16}
                    color={isMyTurn ? '#10B981' : '#666'}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: isMyTurn ? '#10B981' : '#666'
                  }}>
                    {timeLeft}s
                  </Text>
                </View>
                <Text style={{
                  fontSize: 14,
                  color: wordCount > 100 ? '#EF4444' : wordCount > 80 ? '#F59E0B' : '#666'
                }}>
                  {wordCount}/100 words
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: '#666' }}>
                {isMyTurn ? 'Your turn' : `${opponent?.username}'s turn`}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <TextInput
                value={roastText}
                onChangeText={setRoastText}
                placeholder={isMyTurn ? "Craft your devastating roast..." : "Waiting for opponent..."}
                editable={isMyTurn}
                multiline
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E5E5E5',
                  borderRadius: 8,
                  padding: 12,
                  maxHeight: 100,
                  backgroundColor: isMyTurn ? 'white' : '#F5F5F5',
                  color: isMyTurn ? '#333' : '#999',
                  marginRight: 12
                }}
              />
              <TouchableOpacity
                onPress={handleSubmitRoast}
                disabled={!isMyTurn || !roastText.trim() || wordCount > 100}
                style={{
                  backgroundColor: '#FF4500',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 8,
                  opacity: (!isMyTurn || !roastText.trim() || wordCount > 100) ? 0.5 : 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Ionicons name="send" size={16} color="white" style={{ marginRight: 4 }} />
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                  Roast!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sidebar - Only show on larger screens */}
        {width > 600 && (
          <View style={{ width: 300, borderLeftWidth: 1, borderLeftColor: '#E5E5E5' }}>
            {/* Participants */}
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5E5' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="people" size={16} color="#FF4500" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                  Fighters
                </Text>
              </View>
              {battle.participants.map((participant: any) => {
                const isCurrentUser = participant.id === user?.id;
                return (
                  <View
                    key={participant.id}
                    style={{
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: isCurrentUser ? '#FF4500' : '#E5E5E5',
                      backgroundColor: isCurrentUser ? 'rgba(255,69,0,0.05)' : 'white',
                      marginBottom: 8
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{ uri: participant.avatar }}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          borderWidth: 2,
                          borderColor: '#FF4500',
                          marginRight: 12
                        }}
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#333' }}>
                          u/{participant.username}
                          {isCurrentUser && (
                            <Text style={{ color: '#FF4500' }}> (You)</Text>
                          )}
                        </Text>
                        <Text style={{ fontSize: 12, color: '#666' }}>
                          {participant.wins}W • {participant.losses}L
                        </Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
                      {participant.karma.toLocaleString()} karma • {participant.karmaLevel}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Battle Stats */}
            <View style={{ padding: 16 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 12 }}>
                Battle Info
              </Text>
              <View style={{ gap: 8 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>Community:</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>r/{battle.community}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>Started:</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>2 hours ago</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>Total Roasts:</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>{battle.roasts.length}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>Spectators:</Text>
                  <Text style={{ fontWeight: '600', fontSize: 14 }}>{battle.spectators}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BattleScreen;