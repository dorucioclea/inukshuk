/** Profile page
* Display a account info: username, name, email, phone number
* Allow user to edit their email and phone number
**/

import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ToolbarAndroid,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { updateUser } from '../scripts/apiCalls.js';
import { storageSet } from '../scripts/localStorage.js';
var nativeImageSource = require('nativeImageSource');

export default class User extends Component {

  // Set up the user component with user data
  constructor(props){
    super(props);
    let jsonUser = JSON.parse(this.props.user);
    console.log(jsonUser);
    this.state = {
      id: jsonUser._id,
      firstName: jsonUser.firstName,
      lastName: jsonUser.lastName,
      email: jsonUser.email,
      phoneNumber: jsonUser.phoneNumber,
    }
  }

  // Update the user on the Inukshuk server
  updateUser() {
    updateUser({id: this.state.id,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber})
    .then((responseJson) => {
      storageSet('user', JSON.stringify(responseJson));
      Alert.alert(
        'Success!',
        'Your account has been updated',
        [
          {text: 'OK', onPress: () => {
            this.props.callback(responseJson)
            .then(this.props.navigator.pop())
            .catch((err) => console.error(err));
          }},
        ],
        { cancelable: false }
      )
    })
    .catch((error) => {
      Alert.alert('Something went wrong', error);
    });
  }

  // Logout
  logout() {
    this.props.navigator.popToTop();
  }


  // Render the user component to the screen
  render() {
    return(
      <View style = {styles.container}>

        {/* Android toolbar */}
        <ToolbarAndroid
          style={styles.toolbar}
          title={this.props.title}
          navIcon={nativeImageSource({
            android: 'ic_arrow_back_white_24dp',
            width: 64,
            height: 64
          })}
          onIconClicked={this.props.navigator.pop}
          titleColor={'#FFFFFF'}/>

        <View style={styles.innerContainer}>

          <ScrollView style={styles.inputBoxes}>

            {/* First name */}
            <Text style={styles.fieldHeader}> First Name </Text>
            <Text style={styles.field}> {this.state.firstName}</Text>

            {/* Last name */}
            <Text style={styles.fieldHeader}> Last Name </Text>
            <Text style={styles.field}> {this.state.lastName}</Text>

            {/* Email input */}
            <Text style={styles.fieldHeader}> Email</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                defaultValue={this.state.email}
                onChangeText={(text) => this.setState({email: text})}/>
            </View>

            {/* Phone number input */}
            <Text style={styles.fieldHeader}> Contact Number</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputText}
                defaultValue={this.state.phoneNumber}
                onChangeText={(text) => this.setState({phoneNumber: text})}/>
            </View>

          </ScrollView>
        </View>

        {/* Save an log out buttons */}
        <View style={styles.buttons}>
          <View style={styles.clearContainer}>
            <TouchableOpacity
              style={styles.clear}
              onPress={() => {
                Alert.alert(
                  'Log out',
                  'Are you sure you want to do this?',
                  [
                    {text: 'Cancel'},
                    {text: 'Log out', onPress: () => this.logout()},
                  ],
                )
              }}
              activeOpacity={.8}>
              <Text style={styles.startText}>Log Out</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.startContainer}>
            <TouchableOpacity
              style={styles.start}
              onPress={() => this.updateUser()}
              activeOpacity={.8}>
              <Text style={styles.startText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  toolbar: {
    height: 60,
    backgroundColor: '#00aaf1',
  },
  innerContainer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  inputBoxes: {
    padding: 10,
  },
  fieldHeader: {
    fontSize: 14,
    marginBottom: 4,
    marginTop: 10,
  },
  field: {
    fontSize: 16,
    color: 'black',
  },
  updateContainer: {
    alignItems: 'stretch',
  },
  update: {
    backgroundColor: 'green',
    padding: 18,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  inputText: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 45,
    fontSize: 16,
  },
  inputBox: {
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 6,
    paddingBottom: 4,
  },
  buttons: {
    flexDirection: 'row',
  },
  startContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  start: {
    backgroundColor: 'green',
    padding: 18,
  },
  clearContainer: {
    flex: 2,
    alignItems: 'stretch',
  },
  clear: {
    backgroundColor: 'red',
    padding: 18,
  },
  startText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
});
