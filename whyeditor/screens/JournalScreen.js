import React from "react";
import { Modal, View, StyleSheet, Text, TextInput, Alert } from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { ScrollView } from "react-native-gesture-handler";
import { JournalEntry } from "../models";
import Button from "react-native-button";

export class JournalEntryRow extends React.Component {
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
          presentationStyle={"formSheet"}
        >
          <View
            style={{
              marginTop: 22,
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Text style={{ fontSize: 34, textAlign: "center", margin: 10 }}>
                {new Date(this.props.entry.timestamp).toLocaleDateString()}
              </Text>
              <Text style={{ fontSize: 22, textAlign: "center" }}>
                {this.props.entry.text}
              </Text>
              <AirbnbRating
                defaultRating={this.props.entry.rating}
                isDisabled={true}
              />

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
          {new Date(this.props.entry.timestamp).toLocaleDateString()}
        </Button>
      </View>
    );
  }
}

export default class JournalScreen extends React.Component {
  state = {
    history: [],
    text: "",
    rating: 3
  };

  async componentDidMount() {
    await this.loadAll().catch(console.log);
  }

  render() {
    let dateString = new Date().toLocaleDateString();
    return (
      <ScrollView style={styles.container}>
        {/* Views are basically containers for other elements */}
        <Text style={[styles.header, { marginTop: 65 }]}>
          Today's date is {dateString}
        </Text>
        <Text style={[styles.header, { marginTop: 5 }]}>
          How would you rate your day?
        </Text>
        <AirbnbRating
          defaultRating={this.state.rating}
          onFinishRating={rating => this.setState({ rating })}
        />
        <TextInput
          style={styles.inputBox}
          multiline={true}
          placeholder={"My day was..."}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        ></TextInput>
        <Button
          disabled={!this.state.text.trim()}
          styleDisabled={styles.disabledButton}
          style={styles.saveButton}
          onPress={this.save.bind(this)}
        >
          Save
        </Button>

        <ScrollView>
          <Text style={[styles.header, { marginTop: 10 }]}>
            Past journal entries
          </Text>
          {this.state.history.map((hist, i) => (
            <JournalEntryRow key={i} entry={hist} />
          ))}
        </ScrollView>
      </ScrollView>
    );
  }

  save() {
    this._save().catch(console.log);
  }

  async _save() {
    let model = new JournalEntry({
      text: this.state.text.trim(),
      rating: this.state.rating
    });

    await model.save();

    this.setState({
      text: "",
      rating: 3
    }); // resets the state to default

    await this.loadAll();
  }

  async loadAll() {
    let entries = await JournalEntry.query();
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

  inputBox: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    color: "#000",
    fontSize: 20,
    backgroundColor: "#fff"
  },

  saveButton: {
    alignSelf: "center",
    marginTop: 5,
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
    width: "25%",
    color: "#fff"
  },

  text: {
    margin: 5,
    color: "white",
    fontSize: 14
  }
});

JournalScreen.navigationOptions = {
  header: null
};
