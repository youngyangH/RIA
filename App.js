/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {RkButton, RkTabSet, RkTheme, RkTab, RkCalendar} from 'react-native-ui-kitten';
import SQLite from 'react-native-sqlite-2';
import React, {Component} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';

import {DAO} from './dao/dao.js';
import {YComponent} from './yComponent.js'
 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};

export default class App extends Component<Props> {

  render() {
    return (
      <RkTabSet style={styles.container}>
       <RkTab title='Awesome'>
          <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
             <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
               <View style = {{flex: 4}}></View>
               <RkButton rkType='saveIcon' onPress={ ()  => this.onPress()}>add</RkButton>
             </View>
             <YComponent />
          </View>
       </RkTab>
       <RkTab title='Pretty Cool'>
         <RkCalendar
           min={new Date(2018, 1, 1)}
           max={new Date()}
         />
       </RkTab>
      </RkTabSet>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  richText: {
    flex: 8,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

RkTheme.setType('RkButton', 'backIcon', {
  fontSize: 10,
  width: 60,
  borderRadius: 25,
  hitSlop: {top: 5, left: 5,right: 5},
  position: 'relative',
  flex: 1,
});

RkTheme.setType('RkButton', 'saveIcon', {
  fontSize: 10,
  width: 60,
  borderRadius: 25,
  hitSlop: {top: 5, left: 5,right: 5},
  position: 'relative',
  flex: 1,
});