const dop = require('../../dist/dop.nodejs')

const server = dop.listen()

let open = 0
let connect = 0
let disconnect = 0
let close = 0

function print() {
    console.log('----------')
    console.log('nodes:', Object.keys(dop.data.node).length)
    console.log('open:', open)
    console.log('connect:', connect)
    console.log('disconnect:', disconnect)
    console.log('close:', close)
    console.log('----------')
}

server.on('open', socket => {
    open += 1
    print()
})

server.on('connect', socket => {
    connect += 1
    print()
})

server.on('disconnect', socket => {
    disconnect += 1
    print()
})

server.on('close', socket => {
    close += 1
    print()
})

// server.on('message', function(node, message){
//     t.equal(message==='[-1,0]'||message==='Before', true, '❌ message `'+message+'`');
// });
