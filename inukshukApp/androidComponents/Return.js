import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, ToolbarAndroid, StyleSheet, TouchableWithoutFeedback, DatePickerAndroid, TimePickerAndroid, TouchableOpacity } from 'react-native';
import {
  storageGet,
  storageMultiGet,
  storageRemove,
  storageMultiRemove,
  storageSet,
} from '../scripts/localStorage.js';
import { toMonth, toWeekday, padTime } from '../scripts/datesAndTimes.js'

var nativeImageSource = require('nativeImageSource');

export default class Return extends Component {
  constructor(props) {
    super(props);
    if (this.props.return != null) {
      this.state = JSON.parse(this.props.return);
    } else {
      let now = new Date();
      this.state = {
        hour: now.getHours(),
        minute: now.getMinutes(),
        year: now.getFullYear(),
        month: now.getMonth(),
        day: now.getDate(),
        dayOfWeek: now.getDay(),
      }
    }
    this.set = this.set.bind(this);
    this.remove = this.remove.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
  }
  set() {
    let currentReturn = JSON.stringify(this.state);
    storageSet('return', currentReturn)
    .then(this.props.callback(currentReturn))
    .then(_navigator.pop());
  }
  remove() {
    storageRemove('return')
    .then(this.props.callback(null))
    .then(_navigator.pop());
  }

  async showDatePicker() {
    try {
      var date = new Date(this.state.year, this.state.month, this.state.day);
      const {action, year, month, day} = await DatePickerAndroid.open({date: date});
      if (action !== DatePickerAndroid.dismissedAction) {
        var date = new Date(year, month, day);
        this.setState({
          year: year,
          month: month,
          day: day,
          dayOfWeek: date.getDay(),
        });
      }
    } catch ({code, message}) {
      console.warn('Error setting date: ', message);
    }
  }

  async showTimePicker() {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open({hour: this.state.hour, minute: this.state.minute});
      if (action === TimePickerAndroid.timeSetAction) {
        this.setState({
          hour: hour,
          minute: minute,
        });
      }
    } catch ({code, message}) {
      console.warn('Error setting time: ', message);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        navIcon={nativeImageSource({
                          android: 'ic_arrow_back_white_24dp',
                          width: 64,
                          height: 64
                        })}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#FFFFFF'}/>

        <View style={styles.timeContainer}>
          <TouchableHighlight
            style={styles.timeButton}
            underlayColor='#e6e6e6'
            onPress={this.showDatePicker.bind(this)}>
            <View>
              <Text style={[styles.buttonText, styles.timeText]}>
                {toWeekday(this.state.dayOfWeek, false)} {toMonth(this.state.month, false)} {this.state.day}, {this.state.year}
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.timeButton}
            underlayColor='#e6e6e6'
            onPress={this.showTimePicker.bind(this)}>
            <View>
              <Text style={[styles.buttonText, styles.timeText]}>
                {padTime(this.state.hour)}:{padTime(this.state.minute)}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => this.set()}
            activeOpacity={.8}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.remove}
            onPress={() => this.remove()}
            activeOpacity={.8}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

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
   buttonContainer: {
     marginTop: 10,
     flexDirection: 'row',
     justifyContent: 'center',
   },
   submit: {
     backgroundColor: 'green',
     padding: 18,
   },
   remove: {
     backgroundColor: 'red',
     padding: 18,
   },
   buttonText: {
     fontSize: 16,
     fontWeight: 'bold',
     color: 'white',
     textAlign: 'center'
   },
   timeButton: {
     backgroundColor: 'lightgrey',
     padding: 18,
     borderTopColor: 'white',
     borderTopWidth: 2,
   },
   timeText: {
     color: 'black',
     fontWeight: 'normal',
   },
});
