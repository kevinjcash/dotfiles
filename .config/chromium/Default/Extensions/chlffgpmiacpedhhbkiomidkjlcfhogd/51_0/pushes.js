window.addEventListener('connected', function(e) {
    getAndProcessUpdatedPushes();
}, false);

window.addEventListener('message', function(e) {
    var message = JSON.parse(e.detail);

    if (message.type == 'tickle' && message.subtype == 'push') {
        getAndProcessUpdatedPushes();
    } else if (message.type == 'push') {
        if (message.push.type == 'dismissal') {
            dismiss(message.push);
        } else {
            if (!message.push.target_device_iden || message.push.target_device_iden == getUserData('device_iden')) {
                notify(message.push);
            }
        }
    }
}, false);

function getAndProcessUpdatedPushes() {
    if (getUserData('snoozed_until') > Date.now()) {
        log('Snoozed, ignoring request for updated pushes');
        return;
    }

    requestPushes(function(response, modifiedAfter) {
        if (response == null) {
            log("Failed to load pushes");
            return;
        }

        log(response);

        var pushes = response.pushes;
        for (var i = 0; i < pushes.length; i++) {
            var push = pushes[i];
            if (push.modified > modifiedAfter) {
                modifiedAfter = push.modified;
                setUserData('modified_after', push.modified);
            }

            process(push);
        }

        function process(push) {
            if (push.dismissed) {
                dismiss(push);
            } else if (!push.active) {
                dismiss(push);
            } else {
                if (!push.target_device_iden || push.target_device_iden == getUserData('device_iden')) {
                    notify(push);
                }
            }
        }
    });
}

function requestPushes(done) {
    var modifiedAfter = getUserData('modified_after');
    if (!modifiedAfter || modifiedAfter > 1380000000000 || isNaN(parseFloat(modifiedAfter))) {
        modifiedAfter = Date.now() / 1000;
        setUserData('modified_after', modifiedAfter);
    }

    get(api + '/v2/pushes?modified_after=' + modifiedAfter, function(status, responseText) {
        if (status === 200) {
            var response = JSON.parse(responseText);
            done(response, modifiedAfter);
        } else {
            done(null);
        }
    });
}

function sendPush(push, done) {
    post(api + '/api/pushes', push, function(status, responseText) {
        if (status === 200) {
            var push = JSON.parse(responseText);
            done(push);
        } else {
            done(null);
        }
    });
}
