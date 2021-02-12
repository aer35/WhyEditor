import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import CheckBox from "react-native-check-box";
import Button from "react-native-button";
import { ScrollView } from "react-native-gesture-handler";
import { BoxItem } from "../models";
import Toast from "react-native-root-toast";

export class ChecklistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.entry.checked
    };
  }

  render() {
    return (
      <View>
        <CheckBox
          style={styles.checkbox}
          checkBoxColor="#fff"
          checkedCheckBoxColor="#1bbd06"
          onClick={this.setChecked.bind(this)}
          isChecked={this.state.checked}
          rightText={this.props.entry.text}
          rightTextStyle={styles.checkboxtext}
        />
      </View>
    );
  }

  async setChecked() {
    try {
      // let model = await BoxItem.findBy(this.props.entry.id);
      let model = this.props.entry
      model.checked = !this.state.checked;
      // await model.save();
      this.setState({
        checked: model.checked
      });
    } catch (error) {
      Toast.show(`error setting checked: ${JSON.stringify(error)}`);
    }
  }
}

export default class ChecklistsScreen extends React.Component {
  state = {
    items: [],
    text: ""
  };

  async componentDidMount() {
    await this.loadAll().catch(console.log);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.header}>Things to do</Text>
        </View>
        <View style={styles.box}>
          <TextInput
            style={styles.inputBox}
            multiline={true}
            placeholder={"Task"}
            value={this.state.text}
            onChangeText={text => this.setState({ text })}
          ></TextInput>
          <Button
            disabled={!this.state.text.trim()}
            styleDisabled={styles.disabledButton}
            style={styles.addButton}
            onPress={this.addItem.bind(this)}
          >
            Add item
          </Button>
        </View>
        <ScrollView>
          <Text style={[styles.header, { marginTop: 10 }]}>Your checklist</Text>
          {/* <Button style={styles.addButton} onPress={this.manualSave.bind(this)}>
            Manual save
          </Button> */}
          {this.state.items.map((item, i) => (
            <ChecklistItem entry={item} key={i} />
          ))}
        </ScrollView>
      </ScrollView>
    );
  }

  addItem() {
    try {
      this._addItem();
    } catch (error) {
      Toast.show(`error adding item: ${JSON.stringify(error)}`);
    }
  }

  async _addItem() {
    let model = new BoxItem({
      text: this.state.text
    });

    await model.save();

    this.setState({
      text: ""
    }); // resets the state to default

    await this.loadAll();
  }

  async loadAll() {
    let entries = await BoxItem.query();
    this.setState({
      items: entries
    });
  }

  // manualSave() {
  //   Promise.all(this.state.items.map(async item => (await BoxItem.findBy(item.id)).save())).catch(err => {
  //     Toast.show(`error manually saving: ${error}`)
  //   }).then(() => {
  //     Toast.show("done")
  //     this.loadAll()
  //   })
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2a36"
  },

  box: {
    backgroundColor: "#2c2a36"
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

  header: {
    textAlign: "center",
    color: "#fff",
    fontSize: 24,
    marginTop: 60
  },

  addButton: {
    alignSelf: "center",
    width: "50%",
    padding: 7,
    marginTop: 5,
    backgroundColor: "#2f61d6",
    color: "#fff"
  },

  disabledButton: {
    color: "#404040",
    backgroundColor: "#d6d6d6"
  },

  checkbox: {
    flex: 0,
    padding: 10
  },

  checkboxtext: {
    color: "#fff"
  }
});

ChecklistsScreen.navigationOptions = {
  header: null
};
