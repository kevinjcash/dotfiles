var websocket, xhr, lastNop = 0, nopWait = DEFAULT_NOP_WAIT, nopInterval, failCount = 0;

function connect() {
    disconnect();

    if (failCount > 1) {
        log('Connecting to server via WebSocket');
        useWebSocket()
    } else {
        log('Connecting to server via streaming');
        useStreaming();
    }

    watchNops();
}

function useWebSocket() {
    var opened = false;
    websocket = new WebSocket(ws + '/' + localStorage.api_key);
    websocket.onopen = function(event) {
        log('WebSocket onopen');
        opened = true;
        failCount = 0;

        var event = new CustomEvent('connected', { });
        window.dispatchEvent(event);
    }
    websocket.onmessage = function(event) {
        var event = new CustomEvent('message', { 'detail': event.data });
        window.dispatchEvent(event);
    }
    websocket.onclose = function(event) {
        log('WebSocket onclose');
    }
    websocket.onerror = function(event) {
        log('WebSocket onerror');
    }
}

function useStreaming() {
    var connected = false, lastMessage = 0;
    xhr = new XMLHttpRequest();
    xhr.open('GET', stream + '/' + localStorage.api_key);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 3 && xhr.status == 200 && xhr.responseText.length > 0) {
            if (!connected) {
                log('Streaming connected');
                connected = true;

                var event = new CustomEvent('connected', { });
                window.dispatchEvent(event);

                var now = Date.now();
                var thisHour = now - (now % (60 * 60 * 1000));
                if (!localStorage.last_hour_reported_streaming || localStorage.last_hour_reported_streaming < thisHour) {
                    localStorage.last_hour_reported_streaming = thisHour;
                    track({
                        'name': 'chrome_using_streaming_fallback'
                    });
                }
            }
            
            var messages = xhr.responseText.split('\n');
            messages.pop(); // Remove empty message
            if (messages.length > 0) {
                var numNewMessages = messages.length - lastMessage;
                for (var i = 0; i < numNewMessages; i++) {
                    var message = messages[lastMessage + i];

                    var event = new CustomEvent('message', { 'detail': message });
                    window.dispatchEvent(event);
                }
                lastMessage += numNewMessages;
            }

            if (messages.length > 100) {
                log('Too many messages in buffer, refreshing');
                connect();
            }
        } else if (xhr.readyState == 4 && xhr.status == 0) {
            failCount++;
            lastNop = 0;
        }
    }
    xhr.send();
}

function disconnect() {
    if (websocket != null) {
        websocket.close();
        websocket = null;
    }
    if (xhr != null) {
        xhr.abort();
        xhr = null;
    }
    if (nopInterval != null) {
        clearInterval(nopInterval);
    }
}

function watchNops() {
    if (nopInterval != null) {
        clearInterval(nopInterval);
    }

    nopInterval = setInterval(function() {
        if (Date.now() - lastNop > nopWait) {
            if (navigator.onLine) {
                log("Haven't seen a nop lately, reconnecting");
                nopWait = Math.min(600000, nopWait * 2); // Up to 10 minutes
                connect();
            } else {
                log("Haven't seen a nop lately, waiting for connectivity");
                nopWait = DEFAULT_NOP_WAIT;
            }
        }
    }, DEFAULT_CONNECTIVITY_DELAY);   
}

window.addEventListener('bootstrapped', function(e) {
    connect();
}, false);

window.addEventListener('connected', function(e) {
    nopWait = DEFAULT_NOP_WAIT;
    lastNop = Date.now();
}, false);

window.addEventListener('message', function(e) {
    var message = JSON.parse(e.detail);
    log('Received message:');
    log(message);

    if (message.type == 'nop') {
        lastNop = Date.now();
    }
}, false);

window.addEventListener('signed_out', function(e) {
    disconnect();
}, false);

window.addEventListener('online', function(e) {
    setTimeout(function() {
        connect();
    }, 2000);
}, false);

window.addEventListener('offline', function(e) {
}, false);
