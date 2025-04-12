import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, Searchbar } from 'react-native-paper';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { auth } from '../services/api';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser);
    };
    loadUser();
  }, []);

  // Mock data for rooms
  const rooms = [
    { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?', time: '10:30 AM' },
    { id: '2', name: 'Jane Smith', lastMessage: 'See you tomorrow!', time: 'Yesterday' },
    { id: '3', name: 'Mike Johnson', lastMessage: 'Thanks for the help!', time: '2 days ago' },
  ];

  const renderRoom = ({ item }) => (
    <Card style={styles.roomCard} onPress={() => console.log('Navigate to chat', item.id)}>
      <Card.Content style={styles.roomContent}>
        <View style={styles.roomInfo}>
          <Text variant="titleMedium">{item.name}</Text>
          <Text variant="bodyMedium" style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        <Text variant="bodySmall" style={styles.time}>{item.time}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Searchbar
        placeholder="Search chats"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.roomList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
    marginTop: 8,
  },
  roomList: {
    padding: 16,
  },
  roomCard: {
    marginBottom: 12,
  },
  roomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomInfo: {
    flex: 1,
  },
  lastMessage: {
    color: '#666',
    marginTop: 4,
  },
  time: {
    color: '#666',
    marginLeft: 16,
  },
}); 