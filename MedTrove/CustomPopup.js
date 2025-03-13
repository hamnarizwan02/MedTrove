import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default class CustomPopup extends React.Component {
  render() {
    const { visible, title, message, onClose } = this.props;
    
    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center'
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    width: '100%',
    paddingTop: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10
  },
  buttonText: {
    color: '#074d66',
    fontWeight: 'bold',
    fontSize: 16
  }
});