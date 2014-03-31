var inProgress;
var retryDelay = DEFAULT_CONNECTIVITY_DELAY;

window.addEventListener('targets_updated', function(e) {
    var targets = JSON.parse(e.detail);

    if (!inProgress) {
        inProgress = true;
        createOrPairDevice(targets, function() {
            inProgress = false;
        });
    }
}, false);

function createOrPairDevice(targets, done) {
    var devices = targets.devices;
    for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        if (device.kind == 'chrome') {
            log('Pairing to existing device:');
            log(device);

            setUserData('device_iden', device.iden);

            if (device.app_version < version) {
                updateDevice(function(device) {
                });
            }

            done();
            return;
        }
    }

    // var existingDeviceIden = getUserData('device_iden');
    // if (existingDeviceIden) {
    //     signOut();
    //     done();
    //     return;
    // }

    createDevice(function(device) {
        setUserData('device_iden', device.iden);

        var options = {
            'type': 'basic',
            'key': 'registered_successfully',
            'title': 'Welcome to Pushbullet!',
            'message': 'Congratulations, this device is now registered. Push on!',
            'iconUrl': 'images/type_note.png',
            'onclick': function() {
               openTab(www);
            }
        }
        showNotification(options);

        done();
    });
}

function getDeviceBody() {
    return { 'kind': 'chrome',
             'manufacturer': 'Google',
             'model': 'Chrome',
             'app_version': version };
}

function createDevice(done) {
    log("Creating device")

    var body = getDeviceBody();
    body.nickname = 'Chrome';

    post(api + '/v2/devices', body, function(status, responseText) {
        if (status === 200) {
            var device = JSON.parse(responseText);
            done(device);
        } else {
            done(null);
        }
    });
}

function updateDevice(done) {
    log("Updating device")

    var body = getDeviceBody();

    post(api + '/v2/devices/' + getUserData('device_iden'), body, function(status, responseText) {
        if (status === 200) {
            var device = JSON.parse(responseText);
            done(device);
        } else {
            done(null);
        }
    });
}
