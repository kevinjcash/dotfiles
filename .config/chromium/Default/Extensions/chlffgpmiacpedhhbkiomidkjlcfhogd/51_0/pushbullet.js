window.addEventListener('targets_updated', function(e) {
    var targets = JSON.parse(e.detail);
    setupContextMenu(targets);
}, false);

window.addEventListener('signed_out', function(e) {
    setupContextMenu(null);
}, false);

function setupContextMenu(targets) {
    chrome.contextMenus.removeAll();

    if (localStorage.no_context_menu && JSON.parse(localStorage.no_context_menu)) {
        return;
    } else if (targets == null) {
        return;
    }

    chrome.contextMenus.create({
        'title': 'Push a screenshot of this tab',
        'contexts': ['page'],
        'onclick': function(info, tab) {
            contextMenuScreenshot(info, tab);
        }
    });

    chrome.contextMenus.create({
        'type': 'separator',
        'contexts': ['page']
    });

    for (var i = 0, n = targets.devices.length; i < n; i++) {
        var device = targets.devices[i];
        device.manufacturer = device.manufacturer.charAt(0).toUpperCase() + device.manufacturer.slice(1);
        if (device.kind == 'chrome' || device.kind == 'firefox') {
            continue;
        }

        (function(device) {
            var deviceName = device.nickname || device.manufacturer + ' ' + device.model;

            chrome.contextMenus.create({
                'title': 'Push this to my ' + deviceName,
                'contexts': ['page', 'link', 'selection', 'image'],
                'onclick': function(info, tab) {
                    contextMenuDevicePush(device, info, tab);
                }
            });
        })(device);
    }

    chrome.contextMenus.create({
        'title': 'Push this to...',
        'contexts': ['page', 'link', 'selection', 'image'],
        'onclick': function(info, tab) {
            contextMenuPushTo(info, tab);
        }
    });
}

function contextMenuScreenshot(info, tab) {
    chrome.tabs.captureVisibleTab(tab.windowId, { 'format': 'jpeg', 'quality': 90 }, function(dataUrl) {
        if (!dataUrl) {
            return;
        }

        var info = {
            'fileName': getImageName(dataUrl),
            'fileType': 'image/jpeg',
            'dataUrl': dataUrl
        }

        chrome.tabs.sendMessage(tab.id, { 'code': 'show_push_prompt', 'info': info }, function(response) {
        });
    });
}

function contextMenuPushTo(info, tab) {
    info.tabTitle = tab.title;

    chrome.tabs.sendMessage(tab.id, { 'code': 'show_push_prompt', 'info': info }, function(response) {
    });
}

function contextMenuDevicePush(device, info, tab) {
    var push = {
        'device_iden': device.iden
    }

    if (info.srcUrl) {
        var prefersLinks =  localStorage.prefer_links_over_images && JSON.parse(localStorage.prefer_links_over_images);
        if (prefersLinks) {
            push.type = 'link';
            push.title = info.srcUrl.split("/").pop().split('?')[0];
            push.url = info.srcUrl;  
        } else {
            pushImage(push, info);
            return;
        }
    } else if (info.linkUrl) {
        push.type = 'link';
        push.title = info.selectionText;
        push.url = info.linkUrl;
    } else if (info.selectionText) {
        push.type = 'note';
        push.title = 'Selection';
        push.body = info.selectionText;
    } else {
        push.type = 'link';
        push.title = tab.title;
        push.url = info.pageUrl;
    }

    sendPush(push, function(result) {
        if (result) {
            log('Pushed ' + push.type + ' successfully');
        }
    });
}

function pushFile(push, blob) {
    get(api + '/v2/upload-request?file_name=' + push.file_name +'&file_type=' + push.file_type,
        function(status, responseText) {
            if (status == 200) {
                var response = JSON.parse(responseText);
                
                var formData = new FormData();
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        formData.append(key, response.data[key]);
                    }
                }
                formData.append('file', blob);

                var xhr = new XMLHttpRequest();
                    xhr.open("POST", response.upload_url, true);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            if (xhr.status == 204) {
                                push.type = 'file';
                                push.file_name = response.file_name;
                                push.file_type = response.file_type;
                                push.file_url = response.file_url;

                                sendPush(push, function(result) {
                                    if (result) {
                                        log('Pushed image successfully');
                                    }
                                });
                            }
                        }
                    };
                    xhr.send(formData);
            }
        }
    );
}

function pushImage(push, info) {
    fetchImage(info.srcUrl, function(blob) {
        var imageName = getImageName(info.srcUrl);
        var imageType = getImageType(info.srcUrl);
        push.file_name = imageName;
        push.file_type = imageType;
        pushFile(push, blob);
    });
}

function fetchImage(url, done) {
    if (url.substring(0, 4) == 'data') {
        done(base64toBlob(url.split(',')[1], url.split(';')[0].split(':')[1]));
    } else {
        var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        done(xhr.response);
                    }
                }
            };
            xhr.send();
    }
}

function getImageName(url) {
    if (url.substring(0, 4) == 'data') {
        var type = url.split(';')[0].split(':')[1];
        var now = new Date();
        return 'Image_' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
               + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds() + '.' + type.split('/')[1];
    } else {
        return url.split("/").pop().split('?')[0].split(':')[0];
    }
}

function getImageType(url) {
    return 'image%2F' + url.split('.').pop().split('?')[0].split(':')[0]
}

function base64toBlob(base64Data, type) {
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }

    return new Blob(byteArrays, { type: type });
}

function checkForApiKeyCookie(done) {
    chrome.cookies.get({'url': www, 'name':'api_key'}, function (cookie) {
        if (cookie != null) {
            var apiKey = cookie.value;
            localStorage.api_key = apiKey;
            done(apiKey);
        } else {
            done(null);
        }
    });
}

function confirmNoNativeClientShowingNotifications(callback) {
    get('http://localhost:20807/check', function(status, responseText) {
        if (status === 200) {
            try {
                call(function() {
                    var response = JSON.parse(responseText);
                    if (response.running && response.showing_notifications) {
                        log('Not showing notification, native client confirmed');
                    } else {
                        callback();
                    }
                });
            } catch (e) {
                callback();
                throw(e);
            }
        } else {
            callback();
        }
    });
}

var snoozeTimeout;
if (localStorage.api_key && localStorage[localStorage.api_key] && getUserData('snoozed_until') > Date.now()) {
    snooze();
}

function snooze() {
    updateIcon();
    snoozeTimeout = setTimeout(function() {
        log('Snooze time period has completed');
        unsnooze();
        getAndProcessUpdatedPushes();
    }, parseInt(getUserData('snoozed_until')) - Date.now());
}

function unsnooze() {
    setUserData('snoozed_until', null);
    updateIcon();
    clearTimeout(snoozeTimeout);
}

chrome.commands.onCommand.addListener(function(command) {
    call(function() {
        if (command == 'dismiss-most-recent-notification') {
            if (Object.keys(notifications).length == 0) {
                return;
            }

            var sortedKeys = [];
            for (var key in notifications) {
                sortedKeys.push(key);
            }

            sortedKeys.sort(function(a, b) { return notifications[b].created - notifications[a].created; });

            var key = sortedKeys[0];
            var notification = notifications[key];
            notification.dismissed = true;

            if (useCompat()) {
                log('Dismissing notification by keyboard shortcut');
                try {
                    notification.close();
                } catch(e) {
                    notification.cancel();
                }
            } else {
                chrome.notifications.clear(key, function(wasCleared){
                    if (wasCleared) {
                        log('Dismissing notification by keyboard shortcut');
                    }
                });
            }
        }
    });
});
