dop.core.sendMessages = function(node) {
    var total = node.message_queue.length
    if (total > 0 && node.connected) {
        var index = 0,
            messages_wrapped = [],
            message_string,
            message,
            request_id

        for (; index < total; ++index) {
            message = node.message_queue[index][0]
            messages_wrapped.push(node.message_queue[index][1](message))
            request_id = message[0]

            // If is a request we set a timeout
            // to remove the request if not response is received
            if (request_id > 0) {
                var nameinstruction = dop.protocol.instructions[message[1]]
                message.timeout = setTimeout(function() {
                    dop.protocol['ontimeout' + nameinstruction](
                        node,
                        message
                    )
                    dop.core.deleteRequest(node, request_id)
                }, dop.protocol.timeouts[nameinstruction])
            }
        }

        message_string =
            index > 1
                ? '[' + messages_wrapped.join(',') + ']'
                : messages_wrapped[0]

        node.message_queue = []
        node.send(message_string)
    }
}
