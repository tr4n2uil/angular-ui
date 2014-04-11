/**
 *	Angular DB Implementation
 *
 *	Vibhaj Rajan <vibhaj8@gmail.com>
 *
 *	Licensed under MIT License 
 *	http://www.opensource.org/licenses/mit-license.php
 *
**/

angular.module( 'DB', [ 'Storage' ] )
	.factory( 'DB', [ 'Storage', function( Storage ) {
		var db = {};

		db.get = function( key, def ){
			return Storage.query( key ) || def;
		}

		db.query = function( name ){
			list = db.get( name, { objects: [] } ).objects;
			return list ? Storage.query( list ) : list;
		}

		db.save = function( name, object, key ){
			var old = object['id'] || false;
			Storage.save( key, object );

			// create
			if( !old ){
				var collection = db.get( name, { objects: [] } );
				collection.objects.push( object.id );
				Storage.save( name, collection );
			}

			// update 
			return object;
		}

		db.remove = function( name, object ){
			var collection = db.get( name, { objects: [] } );
			collection.objects.splice(collection.objects.indexOf( object.id ), 1);
			Storage.save( name, collection );

			Storage.remove( object.id );
			return true;
		}

		db.drop = function( name ){
			var collection = db.get( name, { objects: [] } );
			Storage.remove( collection.objects )
			Storage.remove( name );
		}

		db.clear = function(){
			return Storage.clear();
		}

		window.DB = db;
		return db;
	}]);

