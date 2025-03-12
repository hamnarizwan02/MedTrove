// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, Modal, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const Medibot = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = () => {
//     if (inputText.trim() === '') return;
    
//     const newMessage = { 
//       id: Date.now().toString(), 
//       text: inputText,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       isUser: true
//     };
    
//     setMessages((prevMessages) => [newMessage, ...prevMessages]);
//     setIsTyping(true);
    
//     // Simulate bot response
//     setTimeout(() => {
//       const botResponse = {
//         id: (Date.now() + 1).toString(),
//         text: "Thank you for your message. How can I assist you today?",
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isUser: false
//       };
//       setMessages((prevMessages) => [botResponse, ...prevMessages]);
//       setIsTyping(false);
//     }, 1500);

//     Alert.alert(
//       "Message Sent",
//       `Your message has been received.`,
//       [{ text: "OK", onPress: () => console.log("Alert closed") }]
//     );
    
//     setInputText('');
//   };

//   const clearChat = () => {
//     Alert.alert(
//       "Clear Chat",
//       "Are you sure you want to clear all messages?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Clear", style: "destructive", onPress: () => setMessages([]) }
//       ]
//     );
//   };

//   const MenuModal = () => (
//     <View style={styles.modalContent}>
//       <Text style={styles.modalTitle}>Medibot Settings</Text>
      
//       <TouchableOpacity style={styles.menuItem} onPress={clearChat}>
//         <Ionicons name="trash-outline" size={24} color="#FF3B30" />
//         <Text style={styles.menuItemText}>Clear Chat</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Help", "Medibot is here to assist with your medical queries. Please note that this is not a substitute for professional medical advice.")}>
//         <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
//         <Text style={styles.menuItemText}>Help</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("About", "Medibot Version 1.0\nDeveloped with care for your health needs.")}>
//         <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
//         <Text style={styles.menuItemText}>About</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
//         <Text style={styles.modalCloseText}>Close</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}>
      
//       <View style={styles.header}>
//         <TouchableOpacity 
//           onPress={() => Alert.alert("Exit", "Are you sure you want to leave?", [
//             { text: "Stay" },
//             { text: "Leave", style: "destructive" }
//           ])}
//           style={styles.headerButton}
//         > 
//           <Ionicons name="arrow-back" size={24} color="#007AFF" />
//         </TouchableOpacity>
//         <View style={styles.headerTitleContainer}>
//           <Text style={styles.headerTitle}>Medibot</Text>
//           <Text style={styles.headerSubtitle}>Healthcare Assistant</Text>
//         </View>
//         <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.headerButton}>
//           <Ionicons name="ellipsis-vertical" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
      
//       <View style={styles.messageContainer}>
//         {isTyping && (
//           <View style={styles.typingIndicator}>
//             <Text style={styles.typingText}>Medibot is typing...</Text>
//           </View>
//         )}
//         <FlatList
//           data={messages}
//           keyExtractor={(item) => item.id}
//           inverted
//           renderItem={({ item }) => (
//             <View style={[
//               styles.messageBubble,
//               item.isUser ? styles.userMessage : styles.botMessage
//             ]}>
//               <Text style={styles.messageText}>{item.text}</Text>
//               <Text style={styles.timestampText}>{item.timestamp}</Text>
//             </View>
//           )}
//         />
//       </View>
      
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           placeholderTextColor="#666"
//           value={inputText}
//           onChangeText={setInputText}
//           onSubmitEditing={handleSend}
//           multiline
//         />
//         <TouchableOpacity 
//           onPress={handleSend} 
//           style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
//           disabled={!inputText.trim()}
//         >
//           <Ionicons name="send" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
      
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <MenuModal />
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6F8FA',
//   },
//   header: {
//     paddingTop: Platform.OS === 'ios' ? 50 : 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderColor: '#E5E5EA',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   headerButton: {
//     padding: 8,
//     borderRadius: 20,
//   },
//   headerTitleContainer: {
//     alignItems: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1C1C1E',
//   },
//   headerSubtitle: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 2,
//   },
//   messageContainer: {
//     flex: 1,
//     padding: 15,
//   },
//   messageBubble: {
//     maxWidth: '80%',
//     padding: 12,
//     borderRadius: 20,
//     marginVertical: 5,
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#064D65',
//     borderTopRightRadius: 4,
//   },
//   botMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#2596be',
//     borderTopLeftRadius: 4,
//   },
//   messageText: {
//     fontSize: 16,
//     color: 'white',
//   },
//   timestampText: {
//     fontSize: 11,
//     color: 'rgba(255, 255, 255, 0.7)',
//     marginTop: 4,
//     alignSelf: 'flex-end',
//   },
//   typingIndicator: {
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     borderRadius: 20,
//     marginBottom: 10,
//   },
//   typingText: {
//     color: '#666',
//     fontSize: 14,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderColor: '#E5E5EA',
//   },
//   input: {
//     flex: 1,
//     minHeight: 40,
//     maxHeight: 100,
//     padding: 10,
//     backgroundColor: '#F6F8FA',
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#E5E5EA',
//     fontSize: 16,
//     color: '#1C1C1E',
//   },
//   sendButton: {
//     marginLeft: 10,
//     backgroundColor: '#064D64',
//     padding: 10,
//     borderRadius: 20,
//     opacity: 1,
//   },
//   sendButtonDisabled: {
//     opacity: 0.5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 15,
//     width: '80%',
//     alignItems: 'stretch',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#1C1C1E',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5EA',
//   },
//   menuItemText: {
//     marginLeft: 15,
//     fontSize: 16,
//     color: '#1C1C1E',
//   },
//   modalCloseButton: {
//     marginTop: 20,
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalCloseText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Medibot;














// >>>>>>>>>>>>>>>>>>>>>>>>>>. the working code that 

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import CONFIG from './config';

// //const API_URL = "http://192.168.18.14:8000/chat"; // Adjust based on deployment

// const Medibot = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSend = async () => {
//     if (inputText.trim() === '') return;
    
//     const newMessage = { 
//       id: (Date.now()+1).toString(), 
//       text: inputText,
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       isUser: true
//     };
    
//     setMessages((prevMessages) => [newMessage, ...prevMessages]);
//     setIsTyping(true);
//     setInputText('');
    
//     try {
//       const response = await fetch(CONFIG.API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: inputText })
//       });
//       const data = await response.json();
//       console.log("API Response:", data);
      
//       const botResponse = {
//         id: (Date.now() + 1).toString(),
//         //text: data.response || "I'm not sure how to respond to that.",
//         text: data[0]?.generated_text?.trim() || "I'm not sure how to respond to that.",
//         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         isUser: false
//       };
//       setMessages((prevMessages) => [botResponse, ...prevMessages]);
//     } catch (error) {
//       Alert.alert("Error", "Failed to connect to Medibot. Please try again.");
//     }
    
//     setIsTyping(false);
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Medibot</Text>
//       </View>
      
//       <View style={styles.messageContainer}>
//         {isTyping && <Text style={styles.typingText}>Medibot is typing...</Text>}
//         <FlatList
//           data={messages}
//           keyExtractor={(item) => item.id}
//           inverted
//           renderItem={({ item }) => (
//             <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.botMessage]}>
//               <Text style={styles.messageText}>{item.text}</Text>
//             </View>
//           )}
//         />
//       </View>
      
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type your message..."
//           value={inputText}
//           onChangeText={setInputText}
//           onSubmitEditing={handleSend}
//         />
//         <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
//           <Ionicons name="send" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F6F8FA' },
//   header: { padding: 20, backgroundColor: 'white', alignItems: 'center' },
//   headerTitle: { fontSize: 20, fontWeight: 'bold' },
//   messageContainer: { flex: 1, padding: 15 },
//   messageBubble: { padding: 12, borderRadius: 10, marginVertical: 5 },
//   userMessage: { alignSelf: 'flex-end', backgroundColor: '#064D65' },
//   botMessage: { alignSelf: 'flex-start', backgroundColor: '#2596be' },
//   messageText: { color: 'white' },
//   typingText: { color: '#666', fontStyle: 'italic', paddingBottom: 5 },
//   inputContainer: { flexDirection: 'row', padding: 10, backgroundColor: 'white' },
//   input: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#E5E5EA', borderRadius: 20 },
//   sendButton: { marginLeft: 10, backgroundColor: '#064D64', padding: 10, borderRadius: 20 },
// });

// export default Medibot;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, Modal, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CONFIG from './config';

const Medibot = () => {
  const [messages, setMessages] = useState([
    {
      id: '0',
      text: "Welcome to Medibot! I'm here to provide general health information. Please note that my responses are not a substitute for professional medical advice. Always consult with a qualified healthcare provider for medical concerns.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: false
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() === '') return;
    
    const newMessage = { 
      id: (Date.now()+1).toString(), 
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };
    
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setIsTyping(true);
    setInputText('');
    
    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();
      console.log("API Response:", data);
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: data[0]?.generated_text?.trim() || "I'm not sure how to respond to that.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
      };
      setMessages((prevMessages) => [botResponse, ...prevMessages]);
    } catch (error) {
      Alert.alert("Error", "Failed to connect to Medibot. Please try again.");
    }
    
    setIsTyping(false);
  };

  // Combine actual messages with typing indicator if active
  const getDisplayMessages = () => {
    let displayMessages = [...messages];
    
    // Add typing indicator as if it were a message (only when typing)
    if (isTyping) {
      displayMessages = [
        {
          id: 'typing-indicator',
          isTypingIndicator: true, // Special flag to identify the typing indicator
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false
        },
        ...displayMessages
      ];
    }
    
    return displayMessages;
  };

  const renderItem = ({ item }) => {
    // Render typing indicator
    if (item.isTypingIndicator) {
      return (
        <View style={[styles.messageBubble, styles.botMessage, styles.typingBubble]}>
          <View style={styles.typingIndicator}>
            <Text style={styles.typingText}>Medibot is thinking</Text>
            <View style={styles.dotContainer}>
              <View style={[styles.typingDot, styles.typingDot1]} />
              <View style={[styles.typingDot, styles.typingDot2]} />
              <View style={[styles.typingDot, styles.typingDot3]} />
            </View>
          </View>
        </View>
      );
    }
    
    // Render normal message
    return (
      <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.botMessage]}>
        <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.botMessageText]}>
          {item.text}
        </Text>
        <Text style={[styles.timestampText, item.isUser ? styles.userTimestamp : styles.botTimestamp]}>
          {item.timestamp}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#064D65" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons name="medkit" size={24} color="#064D65" style={styles.headerIcon} />
          <Text style={styles.headerTitle}>Medibot</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={24} color="#064D65" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.messageContainer}>
          <FlatList
            data={getDisplayMessages()}
            keyExtractor={(item) => item.id}
            inverted
            renderItem={renderItem}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor="#8E8E93"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity 
            onPress={handleSend} 
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Medical Disclaimer</Text>
            <Text style={styles.modalText}>
              Medibot provides general health information for educational purposes only. The information provided is not a substitute for professional medical advice, diagnosis, or treatment.
            </Text>
            <Text style={styles.modalText}>
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </Text>
            <TouchableOpacity 
              style={styles.modalButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>I Understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#064D65'
  },
  container: { 
    flex: 1, 
    backgroundColor: '#F6F8FA' 
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#064D65'
  },
  infoButton: {
    position: 'absolute',
    right: 16,
  },
  messageContainer: { 
    flex: 1, 
    padding: 15,
    backgroundColor: '#F5F7FA'
  },
  messageBubble: { 
    padding: 12, 
    borderRadius: 18,
    marginVertical: 5,
    maxWidth: '80%',
    minWidth: 80,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  userMessage: { 
    alignSelf: 'flex-end', 
    backgroundColor: '#064D65',
    borderBottomRightRadius: 4,
  },
  botMessage: { 
    alignSelf: 'flex-start', 
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
  },
  typingBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    minWidth: 100,
  },
  messageText: { 
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: 'white'
  },
  botMessageText: {
    color: '#333'
  },
  timestampText: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end'
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  botTimestamp: {
    color: '#8E8E93'
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
  },
  typingText: { 
    color: '#2596be', 
    fontStyle: 'italic',
    marginRight: 5,
    fontSize: 14,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: '#2596be',
    marginHorizontal: 1,
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 1,
  },
  inputContainer: { 
    flexDirection: 'row', 
    padding: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    alignItems: 'center',
  },
  input: { 
    flex: 1, 
    padding: 12,
    paddingLeft: 16,
    backgroundColor: '#F0F2F5',
    borderRadius: 24,
    fontSize: 16,
    color: '#1A1A1A',
  },
  sendButton: { 
    marginLeft: 10, 
    backgroundColor: '#064D65', 
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#064D65',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#064D65',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Medibot;