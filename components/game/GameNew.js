import React, { Component } from 'react';
import { AppRegistry,
  StyleSheet,
  Text,
  View,
  SectionList,
  ScrollView
 } from 'react-native';
  import Button from 'apsl-react-native-button';
  import { Form,
          Separator,
          InputField
  } from 'react-native-form-generator';

export default class GameNew extends Component {
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10, paddingRight:10, height:200, flex: 3, backgroundColor: '#66a3ff'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter the Quest Code to Begin...</Text>
          <Form
            ref='LoginForm'
            label="Login">
              <Separator />
              <InputField
                editable={true}
                ref="questCode"
                placeholder="Quest Code"
                returnKeyType='next'
                />
            </Form>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={() => this.props.navigation.navigate("MainMenu")}>
              <Text style={styles.buttonText}>
                LET'S GO
              </Text>
            </Button>
        </View>
      </View>
    </ScrollView>
    );
    }
    }

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FB8422',
    borderRadius: 25,
    borderColor: 'azure',
    borderWidth: 2
  },
  wholeScreen: {
    backgroundColor: '#66a3ff',
    flex: 3
  },
  container: {
    marginTop: 100,
  },
  buttonContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'azure',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  },
  buttonText: {
    color: 'azure',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center'
  }
});
