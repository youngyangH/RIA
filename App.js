/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {RkButton, RkTextInput, RkCard, RkTheme} from 'react-native-ui-kitten';
import SQLite from 'react-native-sqlite-2';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppRegistry, ScrollView, Image, Alert, FlatList} from 'react-native';
import {YComponent} from './yComponent.js';
import { MarkdownEditor } from 'react-native-markdown-editor';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const db = SQLite.openDatabase('ria.db', '1.0', '', 1);

type Props = {};
export default class App extends Component<Props> {
  _onPress() {
    db.transaction(function (txn) {

        // Drop the table if it exists
        // txn.executeSql('DROP TABLE IF EXISTS Users', []);

        // Create the table and define the properties of the columns
        // txn.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', []);

        // Insert a record
        // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora']);

        // Insert another record
        // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya']);

        // Select all inserted records, loop over them while printing them on the console.
        txn.executeSql('SELECT * FROM `users`', [], function (tx, res) {
            for (let i = 0; i < res.rows.length; ++i) {
                console.log('item:', res.rows.item(i));
            }
        });

    });
    Alert.alert('haha');
  }

  render() {
    return (
      <View>
        <YComponent>
        </YComponent>
      </View>
     
    );
  }
}


