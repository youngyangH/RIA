/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {RkButton, RkTextInput, RkCard, RkTheme, RkBadge} from 'react-native-ui-kitten';
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

export class YComponent extends Component<Props> {

  componentDidMount() {
    this.setState({ loading: true });
    db.transaction((tx) => { 
      tx.executeSql("select * from BOOKS", [],(tx,results)=> {
        this.setState({data: this.state.data.concat(results.rows._array)});
      }); 
    }, (error)=>{ 
      console.log(error); 
    });
    
  }

  constructor(props) {
    super(props);
    this.props.navigation = props.navigation;
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }

  rkCard = ({item}) => (
    <View style={{padding: 10}} >
      <RkCard rkType="shadowed">
        <View rkCardHeader>
          <Text>{item.book_name}</Text>
        </View>
        <View rkCardContent>
          <Text>{item.book_description}</Text>
        </View>
        <View rkCardFooter>
          <RkBadge title={item.book_reading_date} />
        </View>
        <RkButton onPress={() => this.props.navigateToDetailsPage({item})} />
      </RkCard>
    </View>
  );

  render() {
    return (
      <FlatList
        data= {this.state.data}
        renderItem = {({item}) => this.rkCard({item})}
        extraData={this.state}
        keyExtractor={item => item.id}
      />
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
