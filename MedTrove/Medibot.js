// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, KeyboardAvoidingView, Platform, StyleSheet, Modal, SafeAreaView, StatusBar } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import CONFIG from './config';

// const Medibot = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: '0',
//       text: "Welcome to Medibot! I'm here to provide general health information. Please note that my responses are not a substitute for professional medical advice. Always consult with a qualified healthcare provider for medical concerns.",
//       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       isUser: false
//     }
//   ]);
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

//   // Combine actual messages with typing indicator if active
//   const getDisplayMessages = () => {
//     let displayMessages = [...messages];
    
//     // Add typing indicator as if it were a message (only when typing)
//     if (isTyping) {
//       displayMessages = [
//         {
//           id: 'typing-indicator',
//           isTypingIndicator: true, // Special flag to identify the typing indicator
//           timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//           isUser: false
//         },
//         ...displayMessages
//       ];
//     }
    
//     return displayMessages;
//   };

//   const renderItem = ({ item }) => {
//     // Render typing indicator
//     if (item.isTypingIndicator) {
//       return (
//         <View style={[styles.messageBubble, styles.botMessage, styles.typingBubble]}>
//           <View style={styles.typingIndicator}>
//             <Text style={styles.typingText}>Medibot is thinking</Text>
//             <View style={styles.dotContainer}>
//               <View style={[styles.typingDot, styles.typingDot1]} />
//               <View style={[styles.typingDot, styles.typingDot2]} />
//               <View style={[styles.typingDot, styles.typingDot3]} />
//             </View>
//           </View>
//         </View>
//       );
//     }
    
//     // Render normal message
//     return (
//       <View style={[styles.messageBubble, item.isUser ? styles.userMessage : styles.botMessage]}>
//         <Text style={[styles.messageText, item.isUser ? styles.userMessageText : styles.botMessageText]}>
//           {item.text}
//         </Text>
//         <Text style={[styles.timestampText, item.isUser ? styles.userTimestamp : styles.botTimestamp]}>
//           {item.timestamp}
//         </Text>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#064D65" barStyle="light-content" />
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Ionicons name="medkit" size={24} color="#064D65" style={styles.headerIcon} />
//           <Text style={styles.headerTitle}>Medibot</Text>
//           <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.infoButton}>
//             <Ionicons name="information-circle-outline" size={24} color="#064D65" />
//           </TouchableOpacity>
//         </View>
        
//         <View style={styles.messageContainer}>
//           <FlatList
//             data={getDisplayMessages()}
//             keyExtractor={(item) => item.id}
//             inverted
//             renderItem={renderItem}
//           />
//         </View>
        
//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Type your message..."
//             placeholderTextColor="#8E8E93"
//             value={inputText}
//             onChangeText={setInputText}
//             onSubmitEditing={handleSend}
//           />
//           <TouchableOpacity 
//             onPress={handleSend} 
//             style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
//             disabled={!inputText.trim()}
//           >
//             <Ionicons name="send" size={20} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Medical Disclaimer</Text>
//             <Text style={styles.modalText}>
//               Medibot provides general health information for educational purposes only. The information provided is not a substitute for professional medical advice, diagnosis, or treatment.
//             </Text>
//             <Text style={styles.modalText}>
//               Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
//             </Text>
//             <TouchableOpacity 
//               style={styles.modalButton} 
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.modalButtonText}>I Understand</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#064D65'
//   },
//   container: { 
//     flex: 1, 
//     backgroundColor: '#F6F8FA' 
//   },
//   header: { 
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5EA',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   headerIcon: {
//     marginRight: 8,
//   },
//   headerTitle: { 
//     fontSize: 20, 
//     fontWeight: 'bold',
//     color: '#064D65'
//   },
//   infoButton: {
//     position: 'absolute',
//     right: 16,
//   },
//   messageContainer: { 
//     flex: 1, 
//     padding: 15,
//     backgroundColor: '#F5F7FA'
//   },
//   messageBubble: { 
//     padding: 12, 
//     borderRadius: 18,
//     marginVertical: 5,
//     maxWidth: '80%',
//     minWidth: 80,
//     elevation: 1,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 1,
//   },
//   userMessage: { 
//     alignSelf: 'flex-end', 
//     backgroundColor: '#064D65',
//     borderBottomRightRadius: 4,
//   },
//   botMessage: { 
//     alignSelf: 'flex-start', 
//     backgroundColor: 'white',
//     borderBottomLeftRadius: 4,
//   },
//   typingBubble: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 8,
//     minWidth: 100,
//   },
//   messageText: { 
//     fontSize: 16,
//     lineHeight: 22,
//   },
//   userMessageText: {
//     color: 'white'
//   },
//   botMessageText: {
//     color: '#333'
//   },
//   timestampText: {
//     fontSize: 10,
//     marginTop: 4,
//     alignSelf: 'flex-end'
//   },
//   userTimestamp: {
//     color: 'rgba(255, 255, 255, 0.7)'
//   },
//   botTimestamp: {
//     color: '#8E8E93'
//   },
//   typingIndicator: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 0,
//   },
//   typingText: { 
//     color: '#2596be', 
//     fontStyle: 'italic',
//     marginRight: 5,
//     fontSize: 14,
//   },
//   dotContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   typingDot: {
//     height: 6,
//     width: 6,
//     borderRadius: 3,
//     backgroundColor: '#2596be',
//     marginHorizontal: 1,
//   },
//   typingDot1: {
//     opacity: 0.4,
//   },
//   typingDot2: {
//     opacity: 0.7,
//   },
//   typingDot3: {
//     opacity: 1,
//   },
//   inputContainer: { 
//     flexDirection: 'row', 
//     padding: 12,
//     backgroundColor: 'white',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E5EA',
//     alignItems: 'center',
//   },
//   input: { 
//     flex: 1, 
//     padding: 12,
//     paddingLeft: 16,
//     backgroundColor: '#F0F2F5',
//     borderRadius: 24,
//     fontSize: 16,
//     color: '#1A1A1A',
//   },
//   sendButton: { 
//     marginLeft: 10, 
//     backgroundColor: '#064D65', 
//     padding: 12,
//     borderRadius: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   sendButtonDisabled: {
//     backgroundColor: '#BDBDBD',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 20,
//     width: '90%',
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#064D65',
//     textAlign: 'center',
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 12,
//     color: '#333',
//     lineHeight: 22,
//   },
//   modalButton: {
//     backgroundColor: '#064D65',
//     borderRadius: 8,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   modalButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Medibot;



// clean responses 
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

  // Function to extract just the answer part from the response
  const extractAnswer = (response, question) => {
    // If there's no response, return a default message
    if (!response) return "I'm not sure how to respond to that.";
    
    // Try to find where the original question ends in the response
    const cleanQuestion = question.trim().toLowerCase();
    const cleanResponse = response.trim();
    
    // Different patterns to check for:
    // 1. Response directly repeats the question
    if (cleanResponse.toLowerCase().startsWith(cleanQuestion)) {
      // Find the end of the question in the response
      const questionEndIndex = cleanQuestion.length;
      // Check if there's a separator after the question (period, colon, etc.)
      const separatorIndex = cleanResponse.slice(questionEndIndex).search(/[.:?!]/);
      
      if (separatorIndex !== -1) {
        // Return everything after the separator
        return cleanResponse.slice(questionEndIndex + separatorIndex + 1).trim();
      }
    }
    
    // 2. Check for Q: or Question: pattern
    const qPattern = /^Q\s*:|^Question\s*:/i;
    const qMatch = cleanResponse.match(qPattern);
    
    if (qMatch) {
      // Look for A: or Answer: pattern
      const aPattern = /A\s*:|Answer\s*:/i;
      const aMatch = cleanResponse.match(aPattern);
      
      if (aMatch) {
        // Extract just the answer part
        return cleanResponse.substring(aMatch.index + aMatch[0].length).trim();
      }
    }
    
    // // 3. If we couldn't identify a clear pattern, make a best effort to remove the question
    // // Split by common separators
    // const parts = cleanResponse.split(/\.\s|\?\s|\!\s|:\s/);
    
    // // If the first part closely resembles the question, return the rest
    // if (parts.length > 1 && 
    //     (parts[0].toLowerCase().includes(cleanQuestion) || 
    //      cleanQuestion.includes(parts[0].toLowerCase()))) {
    //   return parts.slice(1).join('. ').trim();
    // }
    
    // If all else fails, return the original response
    return cleanResponse;
  };

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
      
      // Process the response to remove the question part
      const rawResponse = data[0]?.generated_text?.trim() || "I'm not sure how to respond to that.";
      const processedResponse = extractAnswer(rawResponse, inputText);
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: processedResponse,
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