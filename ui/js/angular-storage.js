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

		storage.save = function( object, key ){
			store[key || object.id] = JSON.stringify( object );
		}

		storage.remove = function( object ){
			delete store[object.id];
		}

		storage.find = function( id ){
			return JSON.parse( store[id] || "false" );
		}

		window.Storage = storage;
		window.Store = store;
		return storage;
		
	}]);

/*

		var store = {};

		store.save = function( object ) {
			for( var key in object ){
				switch( typeof( object[key] ) ){
					case 'object':
						if( Array.isArray( object[key] ) ){
							for( var o in object[key] ){
								if( typeof( object[key][o] ) == 'object' && object[key][o].id != object.id ){
									store.save(object[key][o]);
								}
							}	
						}
						else {
							if( object[key].id != object.id ){
								store.save(object[key]);
							}
						}
						break;

					default:
						break;
				}
			}

			console.log( object );
			storage[object.id] = JSON.stringify( object.serialize() );
		};

		store.container = function( key ){
			if( storage[key] || false ){
				return storage[key];
			}
			else {
				var obj = new Model();
				obj.objects = [];
				store.save( obj );
				storage[key] = obj.id;
				return storage[key];
			}
		}

		store.find = function( id ){
			if( storage[id] || false ){
				return Model.fromObject(JSON.parse( storage[id] ));	
			}
			return false;
		}

		store.gather = function( list ){
			var r = [];
			for( var i in list ){
				r.push( store.find( list[i] ) );
			}
			return r;
		}

		return store;
	}]);
*/
