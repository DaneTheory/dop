

synko.on.call = function( user, request ) {
    
    var response = [ request[0] * -1 ];

    if (synko.util.typeof( request[2] ) == 'array' ) {
        
        var path = request[2],
            object_id = path.shift();

        if ( typeof this.objects[ object_id ] == 'object' ) {
            
            var fn = synko.util.get( this.objects[ object_id ].object, path );
            if ( typeof fn == 'function' ) {

                response.push( synko.protocol.fulfilled );

                var params = request[3],
                
                promise = { request: request, response: response, user: user };
                promise.resolve = synko.response.resolve.bind( promise );
                promise.reject = synko.response.reject.bind( promise );

                params.push( promise );

                return fn.apply( this.objects[ object_id ].object, params );

            }

        }
    
    }

    response.push( synko.error.REJECT_CALL_NOT_EXISTS );

    user.send( JSON.stringify( response ) );

};