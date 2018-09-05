var test = require('tape')
var transportName = process.argv[2] || 'local'
var transportListen = require('dop-transports').listen[transportName]
var transportConnect = require('dop-transports').connect[transportName]
var dopServer = require('../.proxy').create()
var dopClient = require('../.proxy').create()
dopServer.env = 'SERVER'
dopClient.env = 'CLIENT'

test('PATCH', function(t) {
    // listening
    var nodeServer = dopServer.listen({
        transport: transportListen,
        timeout: 2
    })
    // connecting
    var nodeClient = dopClient.connect({
        transport: transportConnect,
        listener: nodeServer
    })

    // register and onsubscribe
    var objectServer = dopServer.register({ hello: 'world' })
    dopServer.onSubscribe(function(req) {
        return objectServer
    })

    // subscribe
    var objectClient
    nodeClient.subscribe().then(function(o) {
        objectClient = o
        t.deepEqual(objectServer, objectClient)

        // closing connection to force timeout
        nodeClient.socket.close()

        // mutating server object
        dopServer.set(objectServer, 'hola', 'mundo')

        // observing mutation on client
        var observer = dopClient.createObserver(function(mutation) {
            t.equal(true, false, 'If this happen timeout didnt work')
        })
        observer.observe(objectClient)

        t.end()
    })
})

// var nodeServer, socketServer, socketClient
// var tokenServer, tokenClient
// var order = 0

// var msg = 0
// function send() {
//     nodeClient.send(String(msg))
//     if (nodeServer) nodeServer.send(String(msg))
//     if (msg++ < 15) setTimeout(send, 300)
// }
// send()

// var incS = 0,
//     incC = 1

// nodeServer.on('connect', function(node) {
//     nodeServer = node
// })
// nodeServer.on('message', function(node, message) {
//     if (message[0] !== '[') {
//         t.equal(message, String(incS++), '❌ message `' + message + '`')
//         if (incS === 16 && incC === 16) {
//             nodeServer.listener.close()
//             t.end()
//         }
//     }
// })

// nodeClient.on('message', function(message) {
//     if (message[0] !== '[') {
//         t.equal(message, String(incC++), '✅ message `' + message + '`')
//         if (incS === 16 && incC === 16) {
//             t.end()
//             try {
//                 nodeServer.listener.close()
//                 nodeClient.socket.close()
//             } catch (e) {
//                 // process.exit();
//             }
//         }
//     }
// })

// setTimeout(function() {
//     // console.log( 'closing...' );
//     nodeClient.socket.close()
//     setTimeout(function() {
//         // console.log( 'reconnecting...' );
//         nodeClient.reconnect()
//     }, 500)
// }, 1000)

// setTimeout(function() {
//     // console.log( 'closing2...' );
//     nodeClient.socket.close()
//     setTimeout(function() {
//         // console.log( 'reconnecting2...' );
//         nodeClient.reconnect()
//     }, 500)
// }, 2000)
