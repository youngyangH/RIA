import SQLite from 'react-native-sqlite-2';

export const db = SQLite.openDatabase('ria.db', '1.0', '', 1);

export const DAO = {
	 init : async function(){
	   await db.transaction(function (txn) {
			  txn.executeSql('DROP TABLE IF EXISTS Users', []);
			  txn.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', []);
			  txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['Young']);		  
			  
			  txn.executeSql('DROP TABLE IF EXISTS BOOKS', []);
			  txn.executeSql('CREATE TABLE IF NOT EXISTS BOOKS(book_id INTEGER PRIMARY KEY NOT NULL, book_name VARCHAR(30), book_description VARCHAR(30), book_reading_date  DATE)', []);
			  txn.executeSql('INSERT INTO BOOKS (book_name, book_description, book_reading_date) VALUES (:book_name,:book_description, :book_reading_date)', ['Young', "descriptions", "2019-01-01"]);		  
			  txn.executeSql('INSERT INTO BOOKS (book_name, book_description, book_reading_date) VALUES (:book_name,:book_description, :book_reading_date)', ['Young2', "descriptions2", "2019-01-01"]);		  


			  txn.executeSql('DROP TABLE IF EXISTS READING', []);
			  txn.executeSql('CREATE TABLE IF NOT EXISTS READING(reading_id INTEGER PRIMARY KEY NOT NULL, reading_content TEXT, reading_start_date  DATE)', []);
		});
	},

	insert: function(tableName, cloumns, data) {
	
	},

	update : function() {

	},

	delete : function() {

	},

	get : function(tableName) {
		db.transaction(function (txn) {
		  txn.executeSql('SELECT * FROM ' + tableName, [], function (tx, res) {
		    for (let i = 0; i < res.rows.length; ++i) {
		      console.log('item:', res.rows.item(i));
		    }
		  });
		})
	},
} 