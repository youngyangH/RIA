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

import {DAO, db} from './../dao/dao.js';
import {BComponent} from './bComponent.js';
import {RichTextExample} from './richTextExample.js';

export class Books extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
          data: [],
    };
  }

  static navigationOptions = {
    title: 'Books',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  onPress() {
      this.props.navigation.navigate('ReadReports');  
  }

  navigateToDetailsPage(data) {
      this.props.navigation.navigate('ReadReports', {
        bookId: data.item.book_id,
      });
  }

  render() {
    return (
      <RkTabSet style={styles.container}>
       <RkTab title='Awesome'>
          <View style={{flex: 1, flexDirection: 'column', padding: 5}}>
             <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
               <View style = {{flex: 4}}></View>
               <RkButton rkType='saveIcon' onPress={ ()  => this.onPress()}>add</RkButton>
             </View>
             <BComponent ref="son" navigateToDetailsPage={this.navigateToDetailsPage.bind(this)} />
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