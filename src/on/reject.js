

syncio.on.reject = function( user, response ) {

    var request_id = response[0]*-1;
    
    if (this.requests[ request_id ].users === 1 )
        this.requests[ request_id ].promise.reject.apply( this, response[2] );
    else
        this.requests[ request_id ].promise.multireject.apply( this, response[2] );


};