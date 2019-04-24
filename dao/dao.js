import SQLite from 'react-native-sqlite-2';

export const db = SQLite.openDatabase('ria.db', '1.0', '', 1);

export const DAO = {
	init : function(){
		console.log("init db!");
	},

	insert: function() {
		
	},

	update : function() {

	},

	delete : function() {

	},

	get : function() {

	},
} 