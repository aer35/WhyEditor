import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import questionGif from "../assets/images/questiongif.gif";

export default function HomeScreen() {
  return (
    <View style={styles.base}>
      <View style={styles.title}>
        <Text style={[styles.text, { fontSize: 24 }]}>Welcome to</Text>
        <Text style={[styles.text, { fontSize: 30 }]}>WhyEditor {"\n"}</Text>
        <Image style={styles.image} source={questionGif} resizeMode="contain" />
      </View>
      <View>
        <Text style={[styles.text, { fontSize: 12 }]}>
          App verision 1.0.1 : React-Native version 40.0.0
        </Text>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#2c2a36",
  },

  title: {
    flex: 1,
    marginTop: 60,
  },

  text: {
    color: "#fff",
    textAlign: "center",
  },

  image: {
    alignSelf: "center",
    width: "75%",
    height: "50%",
  },
});
