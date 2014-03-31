var notifications = { };
var alert = new Audio('sounds/alert.ogg');
var listenersSetUp;

function notify(push) {
    if (!localStorage.recent_notifications) {
        localStorage.recent_notifications = JSON.stringify([]);
    }

    var recentNotifications = JSON.parse(localStorage.recent_notifications);
    if (recentNotifications.indexOf(push.iden) == -1) {
        recentNotifications.unshift(push.iden);

        if (push.type != 'mirror') {
            if (push.target_device_iden == getUserData('device_iden')) {
                createNotification(push);
            } else {
                confirmNoNativeClientShowingNotifications(function() {
                    createNotification(push);
                });
            }
        } else {
            if (!chromeIsLocked) {
                createNotification(push);
            } else {
                log('Chrome is locked, ignoring mirror');
            }
        }
    } else {
        log("Not notifying for push " + push.iden);
    }

    if (recentNotifications.length > 100) {
        recentNotifications.pop();
    }
    
    localStorage.recent_notifications = JSON.stringify(recentNotifications);
}

function createNotification(push) {
    var types = ['note', 'link', 'address', 'list', 'file', 'mirror'];
    if (types.indexOf(push.type) == -1) {
        log("Not notifying for unknown push type");
        return;
    }

    log("Creating notification for:");
    log(push);

    var options = { 'type': 'basic' };

    if (push.type == 'mirror') {
        if (localStorage.dont_show_mirrors && JSON.parse(localStorage.dont_show_mirrors)) {
            log("Not showing mirror, disabled in options")
            return;
        }

        function showMirror(sourceDevice) {
            var key = getMirrorKey(push);
            options.key = key;
            options.title = push.title;
            options.message = push.body;
            options.iconUrl = 'data:image/png;base64,' + push.icon;

            if (sourceDevice != null) {
                options.contextMessage = "From " + (sourceDevice.nickname || sourceDevice.model) 
                                       + " at " + (new Date(Date.now())).toLocaleTimeString().replace(/:\d+ /, ' ');
            }
            if (localStorage.only_show_title && JSON.parse(localStorage.only_show_title)) {
                options.message = "";
            }

            var buttons = [];

            if (!(localStorage.hide_disable_button && JSON.parse(localStorage.hide_disable_button))) {
                buttons.push({
                    'title': 'Disable mirroring of ' + push.application_name,
                    'iconUrl': 'images/ic_action_halt.png',
                    'onclick': function() {
                        var notification = notifications[key];
                        if (notification) {
                            notification.dismissed = false;
                        }

                        post(api + '/v2/pushes', {
                            'type': 'mute',
                            'device_iden': push.source_device_iden,
                            'package_name': push.package_name
                        }, function(status, responseText) {
                            if (status === 200) {
                                log("Triggered mute of app " + push.package_name);

                                var options = {
                                    'type': 'basic',
                                    'key': 'unmute',
                                    'title': 'No longer mirroring ' + push.application_name + ' notifications',
                                    'message': '',
                                    'iconUrl': 'data:image/png;base64,' + push.icon
                                };

                                options.buttons = [{
                                    'title': 'Re-enable mirroring of ' + push.application_name,
                                    'iconUrl': 'images/ic_action_undo.png',
                                    'onclick': function() {
                                        post(api + '/v2/pushes', {
                                            'type': 'unmute',
                                            'device_iden': push.source_device_iden,
                                            'package_name': push.package_name
                                        }, function(status, responseText) {
                                            if (status === 200) {
                                                log('Tiggered unmute of app ' + push.package_name);
                                            } else {
                                                log('Failed to trigger unmute of app ' + push.package_name)
                                            }
                                        });
                                }}];

                                showNotification(options)
                            } else {
                                log("Failed to trigger mute of app " + push.package_name);
                            }
                        });
                    }
                });
            }

            if (push.dismissable) {
                buttons.push({
                    'title': 'Dismiss on device',
                    'iconUrl': 'images/ic_action_cancel.png',
                    'onclick': function() {
                    }
                });
            }

            options.buttons = buttons;

            options.onclick = function() {
                optionallyOpenTab(push);
            };

            options.onclose = function() {
                if (push.dismissable) {
                    dismissRemote(push);
                }
            };

            showNotification(options);

            showedMirror();
        }

        function showedMirror() {
            var now = Date.now();
            var thisHour = now - (now % (60 * 60 * 1000));
            if (!localStorage.last_hour_reported || localStorage.last_hour_reported < thisHour) {
                localStorage.last_hour_reported = thisHour;
                track({
                    'name': 'chrome_seeing_mirrors'
                });
            }
        }

        getTargets(function(targets) {
            var sourceDevice;
            if (targets != null) {
                var devices = targets.devices;
                for (var i = 0; i < devices.length; i++) {
                    if (devices[i].iden == push.source_device_iden) {
                        sourceDevice = devices[i];
                        break;
                    }
                }
            }
            showMirror(sourceDevice);
        });
    } else {
        options.key = push.iden;
        options.onclose = function() {
            post(api + '/v2/pushes/' + push.iden, { "dismissed": true }, function(status, responseText) {
                if (status === 200) {
                    log("Marked push " + push.iden + " dismissed");
                } else {
                    log("Failed to mark push " + push.iden + "dismissed, server returned " + status);
                }
            });
        }

        if (push.type == 'note') {
            options.title = push.title || 'Note';
            options.message = push.body;
            options.iconUrl = 'images/type_note.png';
            options.onclick = function() {
                openTab(www+ '/pushes?push_iden=' + push.iden);
            };
        } else if (push.type == 'link') {
            options.title = push.title || 'Link';
            options.message = push.body || push.url;
            options.iconUrl = 'images/type_link.png';
            options.onclick = function() {
                openTab(push.url);
            };
        } else if (push.type == 'address') {
            options.title = push.title || 'Address';
            options.message = push.address;
            options.iconUrl = 'images/type_address.png';
            options.onclick = function() {
                openTab("https://maps.google.com?q=" + escape(push.address));
            };
        } else if (push.type == 'list') {
            var body = '';
            for (var i = 0; i < push.items.length; i++) {
                var item = push.items[i];
                body += item.text + "\n";
            }

            options.title = push.title || 'List';
            options.message = body;
            options.iconUrl = 'images/type_list.png';
            options.onclick = function() {
                openTab(www + '/pushes?push_iden=' + push.iden);
            };
        } else if (push.type == 'file') {
            options.title = push.file_name;
            options.message = push.body || '';
            options.iconUrl = 'images/type_file.png';

            // if (push.file_type.indexOf('image') == 0) {
            //     options.type = 'image';
            //     options.imageUrl = push.file_url;
            // }

            options.onclick = function() {
                openTab(push.file_url);
            };
        } else {
            log("Shouldn't be here, bail out");
            return;
        }

        if (push.sender) {
            options.contextMessage = "From " + push.sender;
        }

        options.buttons = [{
            'title': 'Dismiss',
            'iconUrl': 'images/ic_action_cancel.png',
            'onclick': function() {
            }
        }];

        showNotification(options);
    }
}

function showNotification(options) {
    if (getUserData('snoozed_until') > Date.now()) {
        log('Snoozed, ignoring notification');
        return;
    }

    if (useCompat()) {
        var notification =  webkitNotifications.createNotification(
                                options.iconUrl,
                                options.title,
                                options.message
                            );

        notification.created = Date.now();
        notifications[options.key] = notification;

        var close = function() {
            try {
                notification.close();
            } catch (e) {
                notification.cancel();
            }
        }

        notification.onclick = function() {
            notification.dismissed = true;
            if (options.onclick) {
                options.onclick();
            }
            close();
        };

        notification.onclose = function() {
            delete notifications[options.key];

            if (notification.dismissed && options.onclose) {
                options.onclose();
            }
        };

        notification.show();

        if ((localStorage.automatically_clear_mirrors && JSON.parse(localStorage.automatically_clear_mirrors))
            || (isLinux() && !localStorage.automatically_clear_mirrors)) {
            setTimeout(function() {
                notification.onclose = function() { };
                try {
                    notification.close();
                } catch(e) {
                    notification.cancel();
                }
            }, getAutomaticDuration());
        }
    } else {
        if (!listenersSetUp) {
            setUpNotificationListeners();
            listenersSetUp = true;
        }

        var key = options.key;
        var onclick = options.onclick;
        var onclose = options.onclose;
        var buttons = options.buttons;

        delete options.key;
        delete options.onclick;
        delete options.onclose;
        delete options.buttons;

        if (buttons) {
            options.buttons = [];
            for (var i = 0; i < buttons.length; i++) {
                var button = buttons[i];
                options.buttons.push({
                    'title': button.title,
                    'iconUrl': button.iconUrl
                })
            }
        }

        chrome.notifications.getAll(function(existingNotifications) {
            call(function() {
                var setCallbacks = function() {
                    notifications[key] = {
                        'onclick': onclick,
                        'onclose': onclose,
                        'buttons': buttons,
                        'created': Date.now()
                    };
                };

                var exists = existingNotifications && existingNotifications[key];
                var notification = notifications[key];

                if (exists && notification && (Date.now() - notification.created < 9000)) {
                    try {
                        chrome.notifications.update(key, options, function(key) {
                            setCallbacks(key, onclick, onclose);
                        });
                    } catch (e) {
                        if (e.message.indexOf('contextMessage') >= 0) {
                            delete options.contextMessage;
                            chrome.notifications.update(key, options, function(key) {
                                setCallbacks(key, onclick, onclose);
                            });
                        } else {
                            throw e;
                        }
                    }
                } else {
                    var notificationCreated = function() {
                        setCallbacks();

                        if (localStorage.play_notification_sound && JSON.parse(localStorage.play_notification_sound)) {
                            alert.play();
                        }
                    }

                    var doCreate = function() {
                        try {
                            chrome.notifications.create(key, options, function(key) {
                                notificationCreated();
                            }); 
                        } catch (e) {
                            if (e.message.indexOf('contextMessage') >= 0) {
                                delete options.contextMessage;
                                chrome.notifications.create(key, options, function(key) {
                                    notificationCreated();
                                }); 
                            } else {
                                throw e;
                            }
                        }

                        if ((localStorage.automatically_clear_mirrors && JSON.parse(localStorage.automatically_clear_mirrors))
                            || (isLinux() && !localStorage.automatically_clear_mirrors)) {
                            setTimeout(function() {
                                delete notifications[key];
                                chrome.notifications.clear(key, function(wasCleared) {
                                });
                            }, getAutomaticDuration());
                        }
                    }

                    if (exists) {
                        chrome.notifications.clear(key, function(wasCleared) {
                            doCreate();
                        });
                    } else {
                        doCreate();
                    }
                }
            });
        });
    }
}

function setUpNotificationListeners() {
    chrome.notifications.onClicked.addListener(function(key) {
        call(function() {
            var notification = notifications[key];

            chrome.notifications.clear(key, function(wasCleared){
            });

            if (notification != null) {
                notification.dismissed = true;
                if (notification.onclick) {
                    notification.onclick();
                }
            }
        });
    });

    chrome.notifications.onClosed.addListener(function(key, byUser) {
        call(function() {
            var notification = notifications[key];
            if (notification != null && notification.dismissed) {
                if (notification.onclose) {
                    notification.onclose();
                }
            }

            delete notifications[key];
        }
    )});

    chrome.notifications.onButtonClicked.addListener(function(key, index) {
        call(function() {
            var notification = notifications[key];

            chrome.notifications.clear(key, function(wasCleared){
            });

            if (notification) {
                notification.dismissed = true;
                notification.buttons[index].onclick();
            }

            if (notification && chromeVersion > 31 && (Date.now() - notification.created > 9000)) {
                chrome.windows.create({'url': '/404.html', 'type': 'popup', 'width': 0, 'height': 0, 'left': 0, 'top': 0 },
                    function(window) {
                        chrome.windows.remove(window.id);
                });
            }
        }
    )});
}

function dismiss(push) {
    var key;
    if (push.type == 'dismissal') {
        key = getMirrorKey(push);
    } else {
        key = push.iden;
    }

    if (useCompat()) {
        var notification = notifications[key];
        if (notification != null) {
            log("Sycing dismissal of push:");
            log(push)
            notification.onclose = null;
            try {
                notification.close();
            } catch(e) {
                notification.cancel();
            }
        }
    } else {
        if (push.type == 'dismissal') {
            delete notifications[key];
        }

        chrome.notifications.clear(key, function(wasCleared){
            if (wasCleared) {
                log("Synced dismissal of push:");
                log(push)
            }
        });
    }
}

function dismissRemote(push) {
    post(api + '/v2/pushes', {
        'type': 'dismissal',
        'device_iden': push.source_device_iden,
        'package_name': push.package_name,
        'notification_id': push.notification_id,
        'notification_tag': push.notification_tag
    }, function(status, responseText) {
        if (status === 200) {
            log("Triggered remote dismissal of push " + push.iden);
        } else {
            log("Failed trigger remote dismissal of push " + push.iden);
        }
    });
}

function getMirrorKey(push) {
    var key = push.source_device_iden + '_' + push.package_name + '_' + push.notification_tag + '_' + push.notification_id;
    if (push.notification_id == null) {
        key = push.iden;
    }
    return key;
}

function useCompat() {
    return chromeVersion < 28 
            || !chrome.notifications
            || (localStorage.force_compat_notifications && JSON.parse(localStorage.force_compat_notifications));
}

function isLinux() {
    return (navigator.platform.toLowerCase().indexOf('linux') >= 0 && window.navigator.userAgent.indexOf('CrOS') == -1);
}

function getAutomaticDuration() {
    if (localStorage.mirror_notification_duration) {
        return localStorage.mirror_notification_duration * 1000;
    } else {
        return 8000;
    }
}

function optionallyOpenTab(push) {
    if (push.package_name == 'com.google.android.gm') {
        var parts = push.body.split('\n');
        var email = parts[1];
        openTab('https://mail.google.com/mail/u/?authuser=' + email);
    } else if (push.package_name == 'com.twitter.android') {
        openTab('https://twitter.com');
    } else if (push.package_name == 'com.facebook.katana') {
        openTab('https://www.facebook.com');
    } else if (push.package_name == 'com.google.android.apps.plus') {
        openTab('https://plus.google.com/u/0/notifications/all');
    }
}
