import React, { Component } from 'react';
import { AppRegistry,
  Text,
  View
} from 'react-native';
import PlayerStatistics from './PlayerStatistics.js';

export default class UserProfile extends Component {
  // componentDidMount(){
  //   this.props.screenProps.handleUserProfile();
  // }
  debugger
  render(){
    // let { playerStatistics } = this.props.screenProps
    return(
      <View>
        <PlayerStatistics/>
      </View>
    );
  }
}
