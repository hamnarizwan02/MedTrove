import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Medibot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    const newMessage = { 
      id: Date.now().toString(), 
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. How can I assist you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages((prevMessages) => [botResponse, ...prevMessages]);
      setIsTyping(false);
    }, 1500);

    Alert.alert(
      "Message Sent",
      `Your message has been received.`,
      [{ text: "OK", onPress: () => console.log("Alert closed") }]
    );
    
    setInputText('');
  };

  const clearChat = () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear all messages?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: () => setMessages([]) }
      ]
    );
  };

  const MenuModal = () => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Medibot Settings</Text>
      
      <TouchableOpacity style={styles.menuItem} onPress={clearChat}>
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
        <Text style={styles.menuItemText}>Clear Chat</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Help", "Medibot is here to assist with your medical queries. Please note that this is not a substitute for professional medical advice.")}>
        <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
        <Text style={styles.menuItemText}>Help</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("About", "Medibot Version 1.0\nDeveloped with care for your health needs.")}>
        <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
        <Text style={styles.menuItemText}>About</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
        <Text style={styles.modalCloseText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => Alert.alert("Exit", "Are you sure you want to leave?", [
            { text: "Stay" },
            { text: "Leave", style: "destructive" }
          ])}
          style={styles.headerButton}
        > 
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Medibot</Text>
          <Text style={styles.headerSubtitle}>Healthcare Assistant</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.messageContainer}>
        {isTyping && (
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Medibot is typing...</Text>
          </View>
        )}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          inverted
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.isUser ? styles.userMessage : styles.botMessage
            ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestampText}>{item.timestamp}</Text>
            </View>
          )}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#666"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          multiline
        />
        <TouchableOpacity 
          onPress={handleSend} 
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          disabled={!inputText.trim()}
        >
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <MenuModal />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  messageContainer: {
    flex: 1,
    padding: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#064D65',
    borderTopRightRadius: 4,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2596be',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  timestampText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  typingIndicator: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    marginBottom: 10,
  },
  typingText: {
    color: '#666',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    padding: 10,
    backgroundColor: '#F6F8FA',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    fontSize: 16,
    color: '#1C1C1E',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#064D64',
    padding: 10,
    borderRadius: 20,
    opacity: 1,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1C1C1E',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#1C1C1E',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Medibot;