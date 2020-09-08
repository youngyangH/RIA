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
import {YComponent} from './yComponent.js';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {RichTextExample} from './demo/richTextExample.js';
import { ReadReport } from './demo/readReport.js';
import { Books} from './demo/books.js';
 
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const AppNavigator = createStackNavigator({
    Main: {
      screen: Books
    },
    ReadReports: {
      screen: ReadReport
    },
    Details: {
      screen: RichTextExample
    }

});

DAO.init();

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component<Props> {

  render() {
    return (
      <AppContainer />
  );}
}