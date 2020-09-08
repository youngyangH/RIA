import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    Alert,
} from 'react-native';
import {RichTextEditor, RichTextToolbar} from 'react-native-zss-rich-text-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {RkButton, RkTheme} from 'react-native-ui-kitten';
import {DAO, db} from './../dao/dao.js';
  
export class RichTextExample extends Component {

  getItemId() {
    return this.props.navigation.getParam('readId', 'a description');
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var itemId = this.getItemId();
    db.transaction((tx) => { 
      tx.executeSql("select * from READING where reading_id = " + itemId, [],(tx,results)=> {
        if(results.rows._array.length > 0){
          this.setState({
            initialTitleHTML: results.rows._array[0].reading_title,
            initialContentHTML: results.rows._array[0].reading_content,
            readingId: results.rows._array[0].reading_id,
          });
        }
      });
    }, (error)=>{
      console.log(error); 
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      readingId: "",
      title: "", 
      content:"", 
      initialTitleHTML:'Title!!', 
      initialContentHTML:'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
    };
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  static navigationOptions = {
    title: 'Details',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  onPress(){
    this.getHTML().then(() => {
        //TODO save to DB
        console.log(this.state.title + ' ' + this.state.content);
        if(this.state.readingId === ''){
          db.transaction((tx) => { 
            tx.executeSql("INSERT into READING(reading_title, reading_content, reading_start_date, book_id) VALUES (:reading_title, :reading_content, :reading_start_date, :book_id)", 
                [this.state.title, this.state.content, new Date(), this.getItemId()],(tx,results)=> {
              Alert.alert("success.");
              this.fetchData();
            });
          }, (error)=>{
            console.log(error); 
          });
        } else {
          db.transaction((tx) => { 
            tx.executeSql("REPLACE into READING(reading_id, reading_title, reading_content, reading_start_date, book_id) VALUES (:reading_id, :reading_title, :reading_content, :reading_start_date, :book_id)", 
                [this.state.readingId, this.state.title, this.state.content, new Date(), this.getItemId()],(tx,results)=> {
              Alert.alert("success.");
              console.log(results);
            });
          }, (error)=>{
            console.log(error); 
          });
        }
    });
  }

  render() {
    return (
       <View style = {styles.container}>
        <View style = {{flex: 0.1, flexDirection: 'row', alignItems: 'flex-start'}}>
            <View style = {{flex: 4}}></View>
            <RkButton rkType='saveIcon' onPress={ ()  => this.onPress()}>save</RkButton>
          </View>
          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style = {styles.richtext}
              initialTitleHTML={this.state.initialTitleHTML}
              initialContentHTML={this.state.initialContentHTML}
              editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <RichTextToolbar  
            getEditor={() => this.richtext}
          />
          {Platform.OS === 'ios' && <KeyboardSpacer/>}
        </View>
    );
  }

  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    this.state.title = await this.richtext.getTitleHtml();
    this.state.content = await this.richtext.getContentHtml();
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
  hitSlop: {top: 5, left: 5, right: 5},
  position: 'relative',
  flex: 1,
});

RkTheme.setType('RkButton', 'saveIcon', {
  fontSize: 10,
  width: 60,
  borderRadius: 25,
  position: 'relative',
  flex: 1,
});
