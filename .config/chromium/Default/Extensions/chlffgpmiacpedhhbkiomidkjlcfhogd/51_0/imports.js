var www = 'https://www.pushbullet.com';
var api = 'https://api.pushbullet.com';
var ws = 'wss://stream.pushbullet.com/websocket';
var stream = 'https://stream.pushbullet.com/streaming';
var andrelytics = 'https://andrelytics.appspot.com/track/event';

var version = chrome.runtime.getManifest().version;
var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
var userAgent = 'PushBullet Chrome Extension '  + version + ' / (Chrome ' + chromeVersion + ')';

var DEFAULT_CONNECTIVITY_DELAY = 5 * 1000;
var DEFAULT_NOP_WAIT = 40 * 1000;

function get(url, done) {
    log('GET ' + url);

    var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('X-User-Agent', userAgent);
        // xhr.setRequestHeader('API-Version', '2013-12-09');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.api_key + ':'));
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 401) {
                    signOut();
                }
                done(xhr.status, xhr.responseText);
            }
        };
        xhr.send();
}

function post(url, object, done) {
    log('POST ' + url);

    var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('X-User-Agent', userAgent);
        // xhr.setRequestHeader('API-Version', '2013-12-09');
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.api_key + ':'));
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status == 401) {
                    signOut();
                }
                done(xhr.status, xhr.responseText);
            }
        };
        xhr.send(JSON.stringify(object));
}

function openTab(url) {
    chrome.windows.getCurrent({'populate': false}, function(window) {
        if (window != null) {
            chrome.tabs.create({ 'url': url, 'active': true }, function(tab) {
                chrome.windows.update(window.id, { 'focused': true }, function() {
                });
            });
        } else {
            chrome.windows.create({'url': url, 'type': 'normal'}, function(window) {
                chrome.windows.update(window.id, { 'focused': true }, function() {
                });
            });
        }
    });
}

function track(body) {
    if (!chrome.runtime.getManifest().key) {
        log('Not reporting event from dev installation');
        return;
    }

    if (body == null) {
        body = { };
    }
    if (!localStorage.client_id) {
        localStorage.client_id = Math.random().toString(32).slice(2) + Math.random().toString(32).slice(2);
    }

    body.client_id = localStorage.client_id;
    body.client_type = 'chrome';
    body.client_version = version;
    body.language = navigator.language;
    body.browser_version = window.navigator.appVersion.match(/Chrome\/([\d.]+)/)[1];
    body.platform = navigator.platform;
    body.user_iden = getUserData('user_iden');

    var xhr = new XMLHttpRequest();
        xhr.open('POST', andrelytics, true);
        xhr.setRequestHeader('X-User-Agent', userAgent);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                try {
                    if (xhr.status == 200) {
                        log('Reported event');
                    } else {
                        log('Failed to report event');
                    }
                } catch (e) {
                }
            }
        };
        xhr.send(JSON.stringify(body));
}

function call(callback) {
    try {
        callback();
    } catch(e) {
        track({
            'name': 'chrome_error',
            'stack': e.stack,
            'message': e.message
        });
        throw e;
    }
}

function updateIcon() {
    if (localStorage.use_dark_icon && JSON.parse(localStorage.use_dark_icon)
        || getUserData('snoozed_until') > Date.now()) {
        chrome.browserAction.setIcon({
            'path': {
                '19': 'images/icon_19_gray.png',
                '38': 'images/icon_38_gray.png'
            }
        });
    } else {
        chrome.browserAction.setIcon({
            'path': {
                '19': 'images/icon_19.png',
                '38': 'images/icon_38.png'
            }
        });
    }
}
