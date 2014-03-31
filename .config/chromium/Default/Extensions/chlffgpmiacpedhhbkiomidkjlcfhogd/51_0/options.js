var bg = chrome.extension.getBackgroundPage();

function onload() {
    bg.track({
        'name': 'chrome_goto',
        'url': '/options'
    });

    setupSnoozeButton();
    setupTabs();
    setupOptions();
}

function setupSnoozeButton() {
    var snoozeButton = document.getElementById('snooze_button');
    var unsnoozeButton = document.getElementById('unsnooze_button');
    var snoozedInfo = document.getElementById('snoozed_info');

    var updateButton = function() {
        var snoozedUntil = bg.getUserData('snoozed_until');
        if (snoozedUntil > Date.now()) {
            var snoozedUntil = new Date(parseInt(snoozedUntil));
            snoozeButton.style.display = 'none';
            unsnoozeButton.style.display = 'inline';
            snoozedInfo.innerHTML = 'Snoozed until ' + snoozedUntil.toLocaleTimeString().replace(/:\d+ /, ' ') + '. ';
            bg.snooze();
        } else {
            snoozeButton.style.display = 'inline';
            unsnoozeButton.style.display = 'none';
            snoozedInfo.innerHTML = '';
            bg.unsnooze();
        }
    }

    snoozeButton.onclick = function() {
        bg.setUserData('snoozed_until', Date.now() + (60 * 60 * 1000));
        updateButton();
    }

    unsnoozeButton.onclick = function() {
        bg.setUserData('snoozed_until', null);
        updateButton();
    }

    updateButton();
}

function setupTabs() {
    var generalTab = document.getElementById('tab-general');
    var advancedTab = document.getElementById('tab-advanced');
    var notificationsTab = document.getElementById('tab-notifications');

    var generalContent = document.getElementById('tab-general-content');
    var advancedContent = document.getElementById('tab-advanced-content');
    var notificationsContent = document.getElementById('tab-notifications-content');

    generalTab.onclick = function() {
        resetTabs();
        generalTab.className = "tab selected";
        generalContent.style.display = "block";
    }

    advancedTab.onclick = function() {
        resetTabs();
        advancedTab.className = "tab selected";
        advancedContent.style.display = "block";
    }

    notificationsTab.onclick = function() {
        resetTabs();
        notificationsTab.className = "tab selected";
        notificationsContent.style.display = "block";
    }

    function resetTabs() {
        generalTab.className = "tab";
        advancedTab.className = "tab";
        notificationsTab.className = "tab";
        generalContent.style.display = "none";
        advancedContent.style.display = "none";
        notificationsContent.style.display = "none";
    }
}

function setupOptions() {
    var forceCompatNotifications = document.getElementById('force_compat_notifications');

    if (localStorage.force_compat_notifications && JSON.parse(localStorage.force_compat_notifications)) {
        forceCompatNotifications.checked = true;
    }

    forceCompatNotifications.onclick = function() {
        localStorage.force_compat_notifications = forceCompatNotifications.checked;
    }

    var hideDisableButton = document.getElementById('hide_disable_button');

    if (localStorage.hide_disable_button && JSON.parse(localStorage.hide_disable_button)) {
        hideDisableButton.checked = true;
    }

    hideDisableButton.onclick = function() {
        localStorage.hide_disable_button = hideDisableButton.checked;
    }

    var onlyTitleButton = document.getElementById('only_show_title');

    if (localStorage.only_show_title && JSON.parse(localStorage.only_show_title)) {
        onlyTitleButton.checked = true;
    }

    onlyTitleButton.onclick = function() {
        localStorage.only_show_title = onlyTitleButton.checked;
    }

    var automaticallyClearMirrors = document.getElementById('automatically_clear_mirrors');

    if (localStorage.automatically_clear_mirrors && JSON.parse(localStorage.automatically_clear_mirrors)) {
        automaticallyClearMirrors.checked = true;
    } else if (!localStorage.automatically_clear_mirrors && bg.isLinux()) {
        automaticallyClearMirrors.checked = true;
    }

    automaticallyClearMirrors.onclick = function() {
        localStorage.automatically_clear_mirrors = automaticallyClearMirrors.checked;
    }

    var mirrorNotificationDuration = document.getElementById('mirror_notification_duration');

    if (!localStorage.mirror_notification_duration || localStorage.mirror_notification_duration == '8') {
        mirrorNotificationDuration.selectedIndex = 1;
    } else {
        mirrorNotificationDuration.selectedIndex = 0;
    }

    mirrorNotificationDuration.onchange = function() {
        localStorage.mirror_notification_duration = mirrorNotificationDuration.options[mirrorNotificationDuration.selectedIndex].value;
    }

    var useDarkIcon = document.getElementById('use_dark_icon');

    if (localStorage.use_dark_icon && JSON.parse(localStorage.use_dark_icon)) {
        useDarkIcon.checked = true;
    }

    useDarkIcon.onclick = function() {
        localStorage.use_dark_icon = useDarkIcon.checked;
        bg.updateIcon();
    }

    var perferLinksOverImages = document.getElementById('prefer_links_over_images');

    if (localStorage.prefer_links_over_images && JSON.parse(localStorage.prefer_links_over_images)) {
        perferLinksOverImages.checked = true;
    }

    perferLinksOverImages.onclick = function() {
        localStorage.prefer_links_over_images = perferLinksOverImages.checked;
        bg.requestTargets(function() { });
    }

    var noContextMenu = document.getElementById('no_context_menu');

    if (localStorage.no_context_menu && JSON.parse(localStorage.no_context_menu)) {
        noContextMenu.checked = true;
    }

    noContextMenu.onclick = function() {
        localStorage.no_context_menu = noContextMenu.checked;
        bg.requestTargets(function() { });
    }

    var playNotificationSound = document.getElementById('play_notification_sound');

    if (localStorage.play_notification_sound && JSON.parse(localStorage.play_notification_sound)) {
        playNotificationSound.checked = true;
    }

    playNotificationSound.onclick = function() {
        localStorage.play_notification_sound = playNotificationSound.checked;
    }

    var disableMirroredNotifications = document.getElementById('dont_show_mirrors');

    if (localStorage.dont_show_mirrors && JSON.parse(localStorage.dont_show_mirrors)) {
        disableMirroredNotifications.checked = true;
    }

    disableMirroredNotifications.onclick = function() {
        localStorage.dont_show_mirrors = disableMirroredNotifications.checked;
    }

    var backgroundPermission = document.getElementById('background_permission');

    var hasPermission;
    chrome.permissions.contains({
        'permissions': ['background']
    }, function(granted) {
        hasPermission = granted;
        if (granted) {
            backgroundPermission.checked = true;
        } else {
            backgroundPermission.checked = false;
        }
    });

    backgroundPermission.addEventListener('click', function(event) {
        if (!hasPermission) {
            chrome.permissions.request({
                'permissions': ['background']
            }, function(granted) {
                hasPermission = granted;
                if (granted) {
                    backgroundPermission.checked = true;
                } else {
                    backgroundPermission.checked = false;
                }
            });
        } else {
            chrome.permissions.remove({
                'permissions': ['background']
            }, function(removed) {
                hasPermission = !removed;
                if (removed) {
                    backgroundPermission.checked = false;
                } else {
                    backgroundPermission.checked = true;
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', onload);