import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

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
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#000000']}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 48 }}>
          <View style={{
            backgroundColor: '#FF4500',
            padding: 16,
            borderRadius: 50,
            marginBottom: 24
          }}>
            <Ionicons name="flash" size={48} color="white" />
          </View>
          
          <Text style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 16
          }}>
            Roast Battle{'\n'}
            <Text style={{ color: '#FF4500' }}>Arena</Text>
          </Text>
          
          <Text style={{
            fontSize: 16,
            color: '#B0B0B0',
            textAlign: 'center',
            lineHeight: 24,
            marginBottom: 32
          }}>
            Challenge Redditors to epic text battles. Earn Roast Cred. Climb the leaderboards.
            Show the world your wit is sharper than your code.
          </Text>
        </View>

        <View style={{ marginBottom: 48 }}>
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="trophy" size={24} color="#FF4500" style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                Battle Features
              </Text>
            </View>
            
            <FeatureItem
              icon="shield-checkmark"
              title="Karma-Based Matching"
              description="Fight opponents in your skill tier for fair battles"
            />
            <FeatureItem
              icon="people"
              title="Community Battles"
              description="Compete within your favorite Reddit communities"
            />
            <FeatureItem
              icon="star"
              title="Roast Cred System"
              description="Earn points, unlock cosmetics, and level up"
            />
          </View>

          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 16,
            padding: 24,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
              How It Works
            </Text>
            
            <StepItem number="1" text="Connect your Reddit account securely" />
            <StepItem number="2" text="Get matched with opponents of similar skill" />
            <StepItem number="3" text="Battle in 3 rounds with 60-second turns" />
            <StepItem number="4" text="Community votes decide the winner" />
          </View>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoggingIn || loading}
            style={{
              backgroundColor: '#FF4500',
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 25,
              flexDirection: 'row',
              alignItems: 'center',
              opacity: (isLoggingIn || loading) ? 0.5 : 1
            }}
          >
            {isLoggingIn || loading ? (
              <>
                <View style={{
                  width: 24,
                  height: 24,
                  borderWidth: 2,
                  borderColor: 'white',
                  borderTopColor: 'transparent',
                  borderRadius: 12,
                  marginRight: 12
                }} />
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Connecting to Reddit...
                </Text>
              </>
            ) : (
              <>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 8 }}>
                  Login with Reddit
                </Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
          
          <Text style={{ color: '#888', fontSize: 12, marginTop: 16, textAlign: 'center' }}>
            We only access your public Reddit data and communities
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const FeatureItem: React.FC<{ icon: string; title: string; description: string }> = ({
  icon, title, description
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
    <View style={{
      backgroundColor: 'rgba(255, 69, 0, 0.2)',
      padding: 8,
      borderRadius: 8,
      marginRight: 12,
      marginTop: 4
    }}>
      <Ionicons name={icon as any} size={16} color="#FF4500" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'white', fontWeight: '600', marginBottom: 4 }}>{title}</Text>
      <Text style={{ color: '#B0B0B0', fontSize: 14 }}>{description}</Text>
    </View>
  </View>
);

const StepItem: React.FC<{ number: string; text: string }> = ({ number, text }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
    <View style={{
      backgroundColor: '#FF4500',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12
    }}>
      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{number}</Text>
    </View>
    <Text style={{ color: '#B0B0B0', flex: 1 }}>{text}</Text>
  </View>
);

export default LoginScreen;