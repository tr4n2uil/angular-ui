/**
 *	Angular Local Storage Implementation
 *
 *	Vibhaj Rajan <vibhaj8@gmail.com>
 *
 *	Licensed under MIT License 
 *	http://www.opensource.org/licenses/mit-license.php
 *
**/

angular.module( 'Storage', [] )
	.factory( 'Storage', [ function() {
		var store = {};
		try {
			if( 'localStorage' in window && window['localStorage'] !== null ){
				store = window.localStorage;
			}
		} 
		catch(e) {
			console.log(e);
		}

		var storage = {};

		storage.autoid = function(callback){
			var name = 'autoid';
			var r = store[ name ] || false;
			if( !r ) {
				store[ name ] = r = 1;
			}
			r++;
			store[ name ] = r;

			var data = String(r);
			if(callback) callback(data);
			return data;
		}

		storage.uuid = function(){
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}

			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}

		storage.query = function( key, callback ){
			if(Array.isArray(key)){
				var data = [];
				for( var i in key ){
					data.push(JSON.parse(store[key[i]] || "false"));
				}
			}
			else {
				var data = JSON.parse(store[key] || "false");
			}
			
			if(callback) callback(data);
			return data;
		}

		storage.save = function( key, object, callback ){
			if(!key) key = object.id || storage.autoid();
			if(!object.id) object.id = key;
			if(!object.uuid) object.uuid = storage.uuid();

			store[key] = JSON.stringify( object );
			
			if(callback) callback(object);
			return object;
		}

		storage.remove = function( key, callback ){
			if(Array.isArray(key)){
				for( var i in key ){
					delete store[key[i]];
				}
			}
			else {
				delete store[key];
			}
			
			if(callback) callback();
		}

		window.Store = store;
		return storage;

	}]);

