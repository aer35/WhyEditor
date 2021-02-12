import React from "react";
import { Modal, View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "react-native-button";
import { Note } from "../models";

export class NoteView extends React.Component {
  state = {
    modalVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>
                {new Date(this.props.entry.timestamp).toLocaleString()}
              </Text>
              <Text>{this.props.entry.text}</Text>
              <Button
                style={styles.saveButton}
                onPress={() => {
                  this.setState({
                    modalVisible: !this.state.modalVisible
                  });
                }}
              >
                Go Back
              </Button>
            </View>
          </View>
        </Modal>

        <Button
          style={styles.entryButton}
          onPress={() => {
            this.setState({
              modalVisible: true
            });
          }}
        >
          {new Date(this.props.entry.timestamp).toLocaleString()}
        </Button>
      </View>
    );
  }
}

export default class NotesScreen extends React.Component {
  state = {
    history: [],
    text: ""
  };

  async componentDidMount() {
    await this.loadAll().catch(console.log);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <Text style={[styles.header, { marginTop: 65 }]}>Notes</Text>
          {/* Below the title should be a list of all the notes and then a button that adds a new note */}
          {/* Notes should be titled with the date and time */}

          <TextInput
            style={styles.inputBox}
            multiline={true}
            placeholder={"New note"}
            maxLength={200}
            value={this.state.text}
            onChangeText={this.noteLen.bind(this)}
          ></TextInput>
          <Text style={styles.warn}> {this.state.text.length + "/200"} </Text>
          <Button
            disabled={!this.state.text.trim()}
            styleDisabled={styles.disabledButton}
            style={styles.addButton}
            onPress={this.addNote.bind(this)}
          >
            Add new note
          </Button>
        </View>

        <ScrollView style={styles.container}>
          {/* This view is for the list of available notes */}
          <Text style={[styles.header, { marginTop: 10 }]}>Past Notes</Text>
          {this.state.history.map((hist, i) => (
            <NoteView key={i} entry={hist} />
          ))}
        </ScrollView>
      </ScrollView>
    );
  }

  noteLen(value) {
    this.setState({
      text: value
    });
  }

  addNote() {
    this._addNote().catch(console.log);
  }

  async _addNote() {
    let model = new Note({
      text: this.state.text.trim()
    });

    await model.save();

    this.setState({
      text: ""
    }); // resets the state to default

    await this.loadAll();
  }

  async loadAll() {
    let entries = await Note.query();
    this.setState({
      history: entries
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2a36"
  },

  header: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    margin: 10
  },

  warn: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center"
  },

  inputBox: {
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#000",
    fontSize: 20,
    backgroundColor: "#fff"
  },

  addButton: {
    alignSelf: "center",
    width: "50%",
    padding: 7,
    backgroundColor: "#2f61d6",
    color: "#fff"
  },

  disabledButton: {
    color: "#404040",
    backgroundColor: "#d6d6d6"
  },

  entryButton: {
    marginLeft: 10,
    marginBottom: 5,
    padding: 5,
    backgroundColor: "#61186b",
    width: "40%",
    color: "#fff"
  },

  buttonText: {
    color: "#fff"
  }
});

NotesScreen.navigationOptions = {
  header: null
};
