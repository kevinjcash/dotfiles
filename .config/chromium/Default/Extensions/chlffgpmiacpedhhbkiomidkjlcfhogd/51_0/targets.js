function getTargets(done) {
    if (localStorage.api_key) {
        var cachedDevices = getUserData('devices');
        var cachedContacts = getUserData('contacts');
        if (cachedDevices && cachedContacts) {
            done({
                'devices': cachedDevices,
                'contacts': cachedContacts
            });
        } else {
            requestTargets(done);
        }
    } else {
        checkForApiKeyCookie(function(apiKey) {
            if (apiKey) {
                requestTargets(done);
            } else {
                done(null);
            }
        });
    }
}

function requestTargets(done) {
    var targets = {};

    requestDevices(callback);
    requestContacts(callback);

    function callback(response) {
        // Something failed, bail out
        if (response == null) {
            done(null);
        } else if (response.devices != null) {
            targets.devices = response.devices;
            setUserData('devices', response.devices);   
        } else if (response.contacts != null) {
            targets.contacts = response.contacts;
            setUserData('contacts', response.contacts);
        }

        if (Object.keys(targets).length == 2) {
            done(targets);

            var event = new CustomEvent('targets_updated', { 'detail': JSON.stringify(targets) });
            window.dispatchEvent(event);
        }
    }
}

function requestDevices(done) {
    get(api + '/v2/devices', function(status, responseText) {
        if (status === 200) {
            var response = JSON.parse(responseText);
            done(response);
        } else {
            done(null);
        }
    });
}

function requestContacts(done) {
    get(api + '/v2/contacts', function(status, responseText) {
        if (status === 200) {
            var response = JSON.parse(responseText);
            done(response);
        } else {
            done(null);
        }
    });
}

window.addEventListener('message', function(e) {
    var message = JSON.parse(e.detail);

    if (message.type == 'tickle' && (message.subtype == 'device' || message.subtype == 'contact')) {
        if (localStorage.api_key) {
            setUserData('devices', null);
            setUserData('targets', null);
            getTargets(function() { });
        }
    }
}, false);
