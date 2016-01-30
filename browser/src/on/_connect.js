

synko._on.connect = function( user, request ) {

    this.token = request[2];

    if ( typeof request[3] == 'object' ) {

        if ( typeof request[3][synko.stringify_function] == 'string' )
            this.options.stringify_function = request[3][synko.stringify_function];

        if ( typeof request[3][synko.stringify_undefined] == 'string' )
            this.options.stringify_undefined = request[3][synko.stringify_undefined];

        if ( typeof request[3][synko.stringify_regexp] == 'string' )
            this.options.stringify_regexp = request[3][synko.stringify_regexp];

    }

    this.connected.resolve( this.token );

};