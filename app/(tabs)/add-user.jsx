import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar, Card, Text, Button } from 'react-native-paper';
import { useState } from 'react';
import Header from '../components/Header';

export default function AddUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);

  // Mock data for users
  const mockUsers = [
    { id: '1', username: 'johndoe', name: 'John Doe' },
    { id: '2', username: 'janesmith', name: 'Jane Smith' },
    { id: '3', username: 'mikejohnson', name: 'Mike Johnson' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filteredUsers = mockUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers([]);
    }
  };

  const renderUser = ({ item }) => (
    <Card style={styles.userCard}>
      <Card.Content style={styles.userContent}>
        <View style={styles.userInfo}>
          <Text variant="titleMedium">{item.name}</Text>
          <Text variant="bodyMedium" style={styles.username}>@{item.username}</Text>
        </View>
        <Button mode="contained" onPress={() => console.log('Connect with', item.id)}>
          Connect
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Header title="Add User" />
      <Searchbar
        placeholder="Search by username or name"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.userList}
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
  userList: {
    padding: 16,
  },
  userCard: {
    marginBottom: 12,
  },
  userContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    color: '#666',
    marginTop: 4,
  },
}); 