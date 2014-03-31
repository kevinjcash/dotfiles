function transition() {
    var apiKey = localStorage.api_key;
    if (apiKey && localStorage.last_version < 44) {
        log('Transitioning');

        localStorage[apiKey] = JSON.stringify({});

        delete localStorage.devices;
        delete localStorage.contacts;
        delete localStorage.user_iden;
        delete localStorage.device_iden;

        if (localStorage.modified_after) {
            setUserData('modified_after', localStorage.modified_after);
        }
    }
}

function getUserData(key) {
    if (localStorage.api_key && localStorage[localStorage.api_key]) {
        if (key == 'devices' || key == 'contacts') {
            var targets = localStorage[localStorage.api_key + key];
            if (targets) {
                return JSON.parse(targets);
            } else {
                return null;
            }
        }
        return JSON.parse(localStorage[localStorage.api_key])[key];
    } else {
        return null;
    }
}

function setUserData(key, value) {
    if (!localStorage.api_key) {
        return;
    }

    if (!localStorage[localStorage.api_key]) {
        localStorage[localStorage.api_key] = JSON.stringify({});
    }

    if (key == 'devices' || key == 'contacts') {
        localStorage[localStorage.api_key + key] = JSON.stringify(value);
        return;
    }

    var userData = JSON.parse(localStorage[localStorage.api_key]);

    if (value) {
        userData[key] = value;
    } else {
        delete userData[key];
    }

    localStorage[localStorage.api_key] = JSON.stringify(userData);
}

function signOut() {
    var apiKey = localStorage.api_key;
    delete localStorage.api_key;
    delete localStorage[apiKey];
    delete localStorage[apiKey + 'devices'];
    delete localStorage[apiKey + 'contacts'];

    chrome.cookies.remove({'url': www, 'name':'api_key'});

    chrome.contextMenus.removeAll();

    var event = new CustomEvent('signed_out', { });
    dispatchEvent(event);
}
