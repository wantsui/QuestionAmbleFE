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
  ActivityIndicator,
  AsyncStorage,
  ScrollView
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import Login from './components/User/Login.js';
import MainMenu from './components/User/MainMenu.js';
import NewAccount from './components/User/NewAccount.js';
import PlayerStatistics from './components/User/PlayerStatistics.js';
import UserProfile from './components/User/UserProfile.js';
import Welcome from './components/User/Welcome.js';

import QuestionIndex from './components/Questions/QuestionIndex.js';
import QuestionShow from './components/Questions/QuestionShow.js';
import QuestionNew from './components/Questions/QuestionNew.js';
import QuestionEdit from './components/Questions/QuestionEdit.js';

import ClueShow from './components/Clues/ClueShow.js';

import QuestAction from './components/Quests/QuestAction.js';
import QuestCreation from './components/Quests/QuestCreation.js';
import QuestIndex from './components/Quests/QuestIndex.js';
import QuestShow from './components/Quests/QuestShow.js';

import PlayWindow from './components/Game/PlayWindow.js';
import ResultNew from './components/Game/ResultNew.js';
import ResultWin from './components/Game/ResultWin.js';
import ResultLose from './components/Game/ResultLose.js';
import RoundShow from './components/Game/RoundShow.js';
import GameNew from './components/Game/GameNew.js';
import Directory from './components/Directory.js';

const AppDirectory = StackNavigator({
  Directory: {
    screen: Directory,
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
  QuestAction: {
    screen: QuestAction,
  },
  QuestShow: {
    screen: QuestShow,
  },
  QuestCreation: {
    screen: QuestCreation,
  },
  QuestIndex: {
    screen: QuestIndex,
  },
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
  ClueShow: {
    screen: ClueShow,
  },
  PlayWindow: {
    screen: PlayWindow,
  },
  ResultNew: {
    screen: ResultNew,
  },
  ResultWin: {
    screen: ResultWin,
  },
  ResultLose: {
    screen: ResultLose,
  },
  RoundShow: {
    screen: RoundShow,
  },
  GameNew: {
    screen: GameNew,
  },
});

export default class QuestionAmbleFE extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasToken: false,
      isLoaded: false,

      playerStatistics: {id: "",
                          title: "",
                          key: "",
                          description: "",
                          questCreator: ""},  //Data about the user's game statistics
      currentUser: {
                    userID: "",
                    userEmail: ""
                    },  //Data about the current user
      roundStatistics: [], //Data about information related to the current round
      questData: [], //Data regarding all the quests that the user ever created along with question and stat info
      nextQuestion: {}, // Data about the next question except for coordinates
      loginForm: {}, //Data entered from the login form
      signupForm: {}, //Data entered from the signup form

      editQuestionForm: {
                        questTitle: "",
      }, //Data entered from the edit question form
      newQuestionFormText: "",
      newQuestionFormAnswer: "",
      newQuestionFormHint: "",
      newQuestionFormClueText: "",
      newQuestionFormLat: "",
      newQuestionFormLng: "",

      newQuestFormQuestTitle: "",
      newQuestFormQuestDescription: "",
      newQuestFormQuestTitleGameKey: "",
      newQuestFormErrors: "",
       //Data entered from the new quest form
      editQuestForm: {}, //Data entered from the edit quest form
      playerQuestionInput: {}, //What the user types in when trying to answer a question
      currentGameResult: {}, //Data on whether the user got the answer correct for the guess
    }
    this.handleQuestTitleInputForNewQuest = this.handleQuestTitleInputForNewQuest.bind(this)
    this.handleQuestDescriptionInputForNewQuest = this.handleQuestDescriptionInputForNewQuest.bind(this)
    this.handleNewQuestForm = this.handleNewQuestForm.bind(this)
    this.handleQuestData = this.handleQuestData.bind(this)
    this.handleQuestionNew = this.handleQuestionNew.bind(this)
    this.handleQuestionTextInputForNewQuestion = this.handleQuestionTextInputForNewQuestion.bind(this)
    this.handleQuestionAnswerputForNewQuestion = this.handleQuestionAnswerputForNewQuestion.bind(this)
    this.handleQuestionHintInputForNewQuestion = this.handleQuestionHintInputForNewQuestion.bind(this)
    this.handleQuestionClueTextInputForNewQuestion = this.handleQuestionClueTextInputForNewQuestion.bind(this)
    this.getCurrentLocation = this.getCurrentLocation.bind(this)
  }

  componentDidMount(){
    AsyncStorage.getItem('id_token').then((token) => {
     if (token !== null){
       this.setState({
         hasToken: true,
         isLoaded: true
       });
     } else{
       this.setState({
         hasToken: false,
         isLoaded: true
       });
      }
    });
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({newQuestionFormLat: position.coords.latitude})
      this.setState({newQuestionFormLng: position.coords.longitude})
                                            })
  }
  //Quest
  handleQuestTitleInputForNewQuest(textValue){
    this.setState({newQuestFormQuestTitle: textValue})
  }

  handleQuestDescriptionInputForNewQuest(textValue){
    this.setState({newQuestFormQuestDescription: textValue})
  }

  handleNewQuestForm(event){
    event.preventDefault();
    currentContext = this;
    fetch("http://localhost:8000/quests",{ //Replace link with "/quests/"
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({quest: {title: this.state.newQuestFormQuestTitle,
                            description: this.state.newQuestFormQuestDescription,
                            creator_id: "1"}
                          })
    }).then(
      response => {
        return response.json()})
    .then(body => {
      if (body.hasOwnProperty("error")){
        this.setState({newQuestFormErrors: body.error})
      }else {
        //Ask for guidance on line below
        currentContext.navigator._navigation.navigate("QuestIndex")
      }
    })
    .catch( err => {
      console.log(err)
    })
  }

  handleQuestData(){
    currentContext = this;
    fetch("http://localhost:8000/users/1/my_quests")
    .then(
      response => {
        return response.json()})
    .then(body => {
      this.setState({questData: body})
    })
    .catch( err => {
      console.log(err)
    })
  }
  //Questions
  handleQuestionNew(){
    currentContext = this;
    debugger
    fetch("http://localhost:8000/questions",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({question: { quest_id: "1",
        question_text: this.state.newQuestionFormText,
        answer: this.state.newQuestionFormAnswer,
        clue_type: "text",
        clue_text: this.state.newQuestionFormClueText,
        hint: this.state.newQuestionFormHint,
        lat: this.state.newQuestionFormLat,
        lng: this.state.newQuestionFormLng,
      }})
    }).then((response => {
      return response.json()})
    ).then(body => {
      debugger
      if (body.hasOwnProperty("error") === false){
        //Ask for guidance on line below
        currentContext.navigator._navigation.navigate("QuestIndex")
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleQuestionTextInputForNewQuestion(textValue){
    this.setState({newQuestionFormText: textValue})
  }

  handleQuestionAnswerputForNewQuestion(textValue){
    this.setState({newQuestionFormAnswer: textValue})
  }

  handleQuestionHintInputForNewQuestion(textValue){
    this.setState({newQuestionFormHint: textValue})
  }

  handleQuestionClueTextInputForNewQuestion(textValue){
    this.setState({newQuestionFormClue: textValue})
  }

  getCurrentLocation(){

  }

  render() {
    let methods = {
                  handleQuestData: this.handleQuestData,
                  getQuestData: this.getQuestData,
                  handleQuestTitleInputForNewQuest: this.handleQuestTitleInputForNewQuest,
                  handleQuestDescriptionInputForNewQuest: this.handleQuestDescriptionInputForNewQuest,
                  handleNewQuestForm: this.handleNewQuestForm,
                  questData: this.state.questData,
                  handleQuestionNew: this.handleQuestionNew,
                  handleQuestionTextInputForNewQuestion: this.handleQuestionTextInputForNewQuestion,
                  handleQuestionAnswerputForNewQuestion: this.handleQuestionAnswerputForNewQuestion,
                  handleQuestionHintInputForNewQuestion: this.handleQuestionHintInputForNewQuestion,
                  handleQuestionClueTextInputForNewQuestion: this.handleQuestionClueTextInputForNewQuestion,

                  }
    return (
      <AppDirectory screenProps={methods} ref={ nav => {this.navigator = nav;}} />
    );
  }
}

AppRegistry.registerComponent('QuestionAmbleFE', () => QuestionAmbleFE);

//Note:
//Read github and docs for guidance:
// https://reactnavigation.org/docs/navigators/
// https://reactnavigation.org/docs/navigators/navigation-options
// https://github.com/react-community/react-navigation
// https://github.com/react-community/react-navigation/issues/876
