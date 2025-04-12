import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import Header from '../components/Header';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = () => {
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Contact" />
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoContainer}>
          <Text variant="bodyLarge">Email: support@quickchat.com</Text>
          <Text variant="bodyLarge" style={styles.infoItem}>Phone: +123-456-789</Text>
        </View>

        <Text variant="headlineSmall" style={styles.sectionTitle}>Support Form</Text>
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          label="Subject"
          value={formData.subject}
          onChangeText={(text) => setFormData({ ...formData, subject: text })}
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Message"
          value={formData.message}
          onChangeText={(text) => setFormData({ ...formData, message: text })}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={4}
        />
        <Button 
          mode="contained" 
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          Submit
        </Button>
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
  sectionTitle: {
    marginBottom: 16,
    marginTop: 24,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
  },
}); 