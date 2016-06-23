var http = require('http');


module.exports = function (tape, dop, expressServer, config) {





test('typeof', function (t) {

    t.equal(typeof dop, 'object', "equal(typeof dop, 'object'");
    t.equal(typeof dop.listen, 'function', "equal(typeof dop.listen, 'function'");

    t.end();
});


// httpServers
var myListener;
var httpServer = http.createServer(function (){})
httpServer.listen(config.ports[2]);

test('.listen()', function(t){

    myListener = dop.listen();
    t.equal( myListener.adapter.WebSocket.options.port, config.ports[0], "If we dont pass any option will take the dafault port dop.port:"+dop.port);
    t.end();

});

var first_socket;
test('onopen onmessage', function(t){

    myListener.on('open', function( socket ) {
        first_socket = socket;
        socket.send('Hola Mundo');
    });
    myListener.adapter.WebSocket.on('connection', function( socket ) {
        t.equal(first_socket, socket, 'onopen');
    });


    myListener.on('message', function( socket, message ) {
        if (message.substr(0,1) != '[') {
            t.equal(message, 'Adios Mundo', 'onmessage: ' + message);
            t.end();
        }
    });

});


var token;
test('onconnect', function(t){

    myListener.on('connect', function( node, tok ) {
        token = tok;
        t.equal(typeof token, 'string', 'listener.on');
        node.on('connect', function( token2 ) {
            t.equal(token, token2, 'node.on');
            t.end();
        });
    });


});


var PUBLIC = {hola:'mundo'};
var PUBLIC_PROXY;
test('onsync', function(t){

    PUBLIC_PROXY = dop.onsync('PUBLIC',PUBLIC);
    // dop.onsync('mola');

});




test('onclose ondisconnect', function(t){

    myListener.on('close', function( socket ) {
        t.equal(first_socket, socket, 'onclose');
    });

    myListener.on('disconnect', function( node ) {
        t.equal(node.token, token, 'ondisconnect');
        t.end();
    });

});






};
