import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { auth } from './services/api';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await auth.getCurrentUser();
      if (!currentUser) {
        router.replace('/login');
      } else {
        setUser(currentUser);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await auth.logout();
    router.replace('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}!</Text>
      <Text style={styles.subtitle}>Username: {user.username}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
}); 