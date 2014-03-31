window.onerror = function(message, file, line, column, error) {
    if (message.indexOf('webkitNotifications is not defined') == -1
        && message.indexOf('Notification permission has not been granted') == -1) {
        track({
            'name': 'chrome_error',
            'stack': error.stack,
            'message': message
        });
    }
}

var bootstrapped, chromeIsLocked;
var bootstrapDelay = DEFAULT_CONNECTIVITY_DELAY;

transition();

main();

function main() {
    updateIcon();

    if (localStorage.api_key) {
        log('Signed in with API key ' + localStorage.api_key);
        bootstrap();
    } else {
        checkForApiKeyCookie(function(apiKey) {
            if (apiKey) {
                main();
            } else {
                setTimeout(function() {
                    main();
                }, DEFAULT_CONNECTIVITY_DELAY);
            }
        });
    }
}

function bootstrap() {
    if (navigator.onLine) {
        log('Bootstrapping');
        get(api + '/v2/users/me', function(status, responseText) {
            if (status == 200) {
                bootstrapDelay = DEFAULT_CONNECTIVITY_DELAY;

                var user = JSON.parse(responseText);
                setUserData('user_iden', user.iden);
                setUserData('devices', null);
                setUserData('contacts', null);

                bootstrapped = true;
                var event = new CustomEvent('bootstrapped', { });
                window.dispatchEvent(event);
            } else if (status != 401) {
                log('Unable to load push targets but has an API key');
                setTimeout(function() {
                    bootstrapDelay = Math.min(600000, bootstrapDelay * 2); // Up to 10 minutes
                    bootstrap();
                }, bootstrapDelay);
            }
        });
    } else {
        var interval = setInterval(function() {
            if (navigator.onLine) {
                bootstrapDelay = DEFAULT_CONNECTIVITY_DELAY;
                bootstrap();
                clearInterval(interval);
            } else {
                log("Waiting for connectivity to bootstrap");
            }
        }, DEFAULT_CONNECTIVITY_DELAY);
    }
}

window.addEventListener('bootstrapped', function(e) {
    getTargets(function(targets) {
        if (!localStorage.has_launched) {
            localStorage.has_launched = true;

            if (!localStorage.api_key) {
                var options = {
                    'type': 'basic',
                    'key': 'installed',
                    'title': 'Thanks for installing Pushbullet',
                    'message': 'Click here to get signed in!',
                    'iconUrl': 'images/icon_48.png',
                    'onclick': function() {
                        openTab(www + '/signin');
                    }
                }
                showNotification(options);
            }
        } else if (!localStorage.last_version || localStorage.last_version < 49) {
            var options = {
                'type': 'basic',
                'key': 'updated',
                'title': 'Pushbullet has been updated!',
                'message': 'Click here to see what\'s new.',
                'iconUrl': 'images/icon_48.png',
                'onclick': function() {
                    openTab('changelog.html');
                }
            }
            showNotification(options);
        }

        localStorage.last_version = version;
    });
}, false);

window.addEventListener('signed_out', function(e) {
    bootstrapped = false;
    main();
}, false);

chrome.idle.onStateChanged.addListener(function(newState) {
    log('Chrome state changed to ' + newState);
    if (newState == 'locked') {
        chromeIsLocked = true;
    } else {
        chromeIsLocked = false;
    }
});
