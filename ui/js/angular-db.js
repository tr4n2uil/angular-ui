angular.module( 'DB', [ 'Storage' ] )
	.factory( 'DB', [ 'Storage', function( Storage ) {
		var uuid = function(){
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
			}

			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}

		var db = {};

		db.collection = function( name ){
			var r = Storage.find( name );
			if( !r ){
				r = {};
				r.id = uuid();
				r.objects = [];
				Storage.save( r, name );
			}
			return r;
		}

		db.query = function( name ){
			list = db.collection( name ).objects;
			var r = [];
			for( var i in list ){
				r.push( Storage.find( list[i] ) );
			}
			return r;
		}

		db.save = function( name, object ){
			// create
			if( object['id'] || false ){} else {
				object.id = uuid();

				var collection = db.collection( name );
				collection.objects.push( object.id );
				Storage.save( collection, name );
			}

			// update 
			Storage.save( object );
			return object;
		}

		db.remove = function( name, object ){
			var collection = db.collection( name );
			var i = collection.objects.indexOf( object.id );
			collection.objects.splice(i, 1);
			Storage.save( collection, name );

			Storage.remove( object.id );
		}

		window.DB = db;
		return db;

		/*model.prototype.serialize = function(){
			var r = {}
			for( var key in this ){
				switch( typeof( this[key] ) ){
					case 'function':
						break;

					case 'object':
						if( Array.isArray( this[key] ) ){
							r[key] = [];
							for( var o in this[key] ){
								r[key].push( this[key][o].id );
							}	
						}
						else {
							r[key] = this[key].id;	
						}
						break;

					default:
						r[key] = this[key];
						break;
				}
			}
			return r;
		}

		model.fromObject = function( object ){
			var r = new model();
			for( var key in object ){
				r[key] = object[key];
			}
			return r;
		}

		return model;*/
	}]);

