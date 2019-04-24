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

export class RichTextExample extends Component {

  constructor(props) {
    super(props);
    this.state = {title: "", content:""};
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
  }

  onPress(){
    this.getHTML().then(() => {
        //TODO save to DB
        console.log(this.state.title + ' ' + this.state.content);
    });
  }

  render() {
    return (
        <View style = {styles.container}>
         <View style = {{flex: 0.1, flexDirection: 'row', alignItems: 'flex-start'}}>
           <RkButton rkType='backIcon'>back</RkButton>
           <View style = {{flex: 4}}></View>
           <RkButton rkType='saveIcon' onPress={ ()  => this.onPress()}>save</RkButton>
         </View>
          <RichTextEditor
              ref={(r)=>this.richtext = r}
              style = {styles.richtext}
              initialTitleHTML={'Title!!'}
              initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
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
