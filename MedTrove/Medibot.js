import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Medibot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = { id: Date.now().toString(), text: inputText };
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    Alert.alert("Message Sent", inputText);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      
      <View style={styles.messageContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => (
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  messageContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default Medibot;
