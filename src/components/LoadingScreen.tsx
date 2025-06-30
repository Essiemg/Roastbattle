import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoadingScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#000000']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={{ alignItems: 'center' }}>
        <View style={{
          backgroundColor: '#FF4500',
          padding: 16,
          borderRadius: 50,
          marginBottom: 24
        }}>
          <Ionicons name="flash" size={48} color="white" />
        </View>
        <ActivityIndicator size="large" color="#FF4500" style={{ marginBottom: 16 }} />
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
          Loading Roast Battle Arena...
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingScreen;