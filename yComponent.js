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

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const db = SQLite.openDatabase('ria.db', '1.0', '', 1);

type Props = {};
export class YComponent extends Component<Props> {
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

  rkCard = ({item}) => (
    <RkCard rkType="story">
      <View rkCardContent>
        <RkTextInput rkType='rounded' placeholder='Please balaba' multiline={true} numberOfLines = {10}/>
      </View>
      <View rkCardFooter>
        <RkButton onPress={this._onPress}>Click me</RkButton>
      </View>
    </RkCard>
  );

  render() {
    return (
      <FlatList
        data={[{key: 'a'}, {key: 'b'}]}
        renderItem = {this.rkCard}
      />

     
    );
  }
}

class IScrolledDownAndWhatHappenedNextShockedMe extends Component {

  render() {
      return (
        <ScrollView>
          <Text style={{fontSize:96}}>Scroll me plz</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}>If you like</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}> Framework around?</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    );
  }
}

RkTheme.setType('RkCard', 'story', {
  img: {
    height: 100,
    opacity: 0.7
  },
  content:{
    justifyContent: 'center',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
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
