dop.protocol.ontimeoutsubscribe = dop.protocol.ontimeoutunsubscribe = dop.protocol.ontimeoutcall = dop.protocol.ontimeoutbroadcast = function(
    node,
    request
) {
    request.promise.reject(dop.core.error.reject_local.TIMEOUT_REQUEST)
}

dop.protocol.ontimeoutpatch = function(node, request) {
    // this will resend the patch to the client, not sure about this
    dop.protocol.patchSend(node, request[2], request[3], request[4])
}
