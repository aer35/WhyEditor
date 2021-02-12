import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import Entypo from "react-native-vector-icons/Entypo";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";

import LinksScreen from "../screens/LinksScreen";
import SettingsScreen from "../screens/SettingsScreen";

import JournalScreen from "../screens/JournalScreen";
import NotesScreen from "../screens/NotesScreen";
import ChecklistsScreen from "../screens/ChecklistsScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: <Entypo name="home" size={20} color="#7d7d7d" light />
};

HomeStack.path = "";

const JournalStack = createStackNavigator(
  {
    Journal: JournalScreen
  },
  config
);

JournalStack.navigationOptions = {
  tabBarLabel: "Journal",
  tabBarIcon: <Entypo name="book" size={20} color="#7d7d7d" light />
};

JournalStack.path = "";

const NotesStack = createStackNavigator(
  {
    Notes: NotesScreen
  },
  config
);

NotesStack.navigationOptions = {
  tabBarLabel: "Notes",
  tabBarIcon: <Entypo name="new-message" size={20} color="#7d7d7d" light />
};

NotesStack.path = "";

const ChecklistStack = createStackNavigator(
  {
    Checklists: ChecklistsScreen
  },
  config
);

ChecklistStack.navigationOptions = {
  tabBarLabel: "Checklists",
  tabBarIcon: <Entypo name="check" size={20} color="#7d7d7d" light />
};

ChecklistStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

LinksStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  )
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  JournalStack,
  NotesStack,
  ChecklistStack
});

tabNavigator.path = "";

export default tabNavigator;
