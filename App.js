/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Login from './components/User/Login.js';
import MainMenu from './components/User/MainMenu.js';
import NewAccount from './components/User/NewAccount.js';
import PlayerStatistics from './components/User/PlayerStatistics.js';
import UserProfile from './components/User/UserProfile.js';
import Welcome from './components/User/Welcome.js';

import QuestionIndex from './components/questions/QuestionIndex.js';
import QuestionShow from './components/questions/QuestionShow.js';
import QuestionNew from './components/questions/QuestionNew.js';
import QuestionEdit from './components/questions/QuestionEdit.js';

export default class QuestionAmbleFE extends Component {
  static navigationOptions = {
    title: "QuestionAmbleFE",
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Directory </Text>

        <Text style={styles.welcome}> Users </Text>
        <Button onPress={() => this.props.navigation.navigate("Login")} title="Login"/>
        <Button onPress={() => this.props.navigation.navigate("MainMenu")} title="MainMenu"/>
        <Button onPress={() => this.props.navigation.navigate("NewAccount")} title="NewAccount"/>
        <Button onPress={() => this.props.navigation.navigate("PlayerStatistics")} title="PlayerStatistics"/>
        <Button onPress={() => this.props.navigation.navigate("UserProfile")} title="UserProfile"/>
        <Button onPress={() => this.props.navigation.navigate("Welcome")} title="Welcome"/>


        <Text style={styles.welcome}> Questions </Text>
        <Button onPress={() => this.props.navigation.navigate("QuestionIndex")} title="Question Index"/>
        <Button onPress={() => this.props.navigation.navigate("QuestionShow")} title="Question Show"/>
        <Button onPress={() => this.props.navigation.navigate("QuestionNew")} title="Question New"/>
        <Button onPress={() => this.props.navigation.navigate("QuestionEdit")} title="Question Edit"/>
      </View>
    );
  }
}

const AppDirectory = StackNavigator({
  Directory: {
    screen: QuestionAmbleFE,
  },
  Welcome: {
    screen: Welcome,
  },
  Login: {
    screen: Login,
  },
  NewAccount: {
    screen: NewAccount,
  },
  PlayerStatistics: {
    screen: PlayerStatistics,
  },
  UserProfile: {
    screen: UserProfile,
  },
  MainMenu: {
    screen: MainMenu,
  },
  // QuestAction: {
  //   path:,
  //   screen: QuestAction,
  // },
  // QuestShow: {
  //   path:,
  //   screen: QuestShow,
  // },
  // QuestCreation: {
  //   path:,
  //   screen: QuestCreation,
  // },
  // QuestIndex: {
  //   path:,
  //   screen: QuestIndex,
  // },
  QuestionIndex: {
    screen: QuestionIndex
  },
  QuestionShow: {
    screen: QuestionShow,
  },
  QuestionNew: {
    screen: QuestionNew,
  },
  QuestionEdit: {
    screen: QuestionEdit,
  },
  // ClueShow: {
  //   path:,
  //   screen: ClueShow,
  // },
  // PlayWindow: {
  //   path:,
  //   screen: PlayWindow,
  // },
  // ResultNew: {
  //   path:,
  //   screen: ResultNew,
  // },
  // ResultWin: {
  //   path:,
  //   screen: ResultWin,
  // },
  // ResultLose: {
  //   path:,
  //   screen: ResultLose,
  // },
  // RoundShow: {
  //   path:,
  //   screen: RoundShow,
  // },
  // GameNew: {
  //   path:,
  //   screen: GameNew,
  // },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('QuestionAmbleFE', () => AppDirectory);
// AppRegistry.registerComponent('QuestionAmbleFE', () => QuestionAmbleFE);