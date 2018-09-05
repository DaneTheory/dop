const dop = require('../../dist/dop.nodejs')
const servers = {}
const interval_connections = 100
let client_id = 1
setTimeout(() => {
    servers[++client_id] = dop.connect({})
}, interval_connections)
