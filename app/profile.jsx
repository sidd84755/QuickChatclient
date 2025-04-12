import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, Avatar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import Header from './components/Header';
import { auth } from './services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await auth.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          name: currentUser.name || '',
          username: currentUser.username || '',
          email: currentUser.email || '',
        });
      }
    };
    loadUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      // TODO: Implement profile update API call
      console.log('Updating profile:', formData);
      // After successful update, update the user in AsyncStorage
      const updatedUser = { ...user, ...formData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      // Show success message
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Header title="Profile" showBack={true} />
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar.Text 
            size={100} 
            label={user.name?.charAt(0) || 'U'} 
            style={styles.avatar}
          />
          <Text variant="headlineSmall" style={styles.name}>{user.name}</Text>
          <Text variant="bodyLarge" style={styles.username}>@{user.username}</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            label="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            mode="outlined"
            style={styles.input}
            disabled={loading}
          />
          <TextInput
            label="Username"
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
            mode="outlined"
            style={styles.input}
            disabled={loading}
          />
          <TextInput
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            disabled={loading}
          />
          <Button 
            mode="contained" 
            onPress={handleUpdate}
            style={styles.button}
            loading={loading}
            disabled={loading}
          >
            Update Profile
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 16,
  },
  name: {
    marginBottom: 4,
  },
  username: {
    color: '#666',
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
}); 