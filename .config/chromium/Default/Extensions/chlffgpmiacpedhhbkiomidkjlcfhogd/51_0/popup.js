var bg = chrome.extension.getBackgroundPage();
var activeType, pushedList, pushedNote;
var info = { };

window.onerror = function(message, file, line, column, error) {
    bg.log(error);
    bg.track({
        'name': 'chrome_error',
        'stack': error.stack,
        'message': message
    });
}

function onload() {
    var loading = document.getElementById('loading');
    var spinner = new Spinner({ 'lines': 10, 'length': 6, 'width': 3, 'radius': 7, 'color': '#bdc3c7' }).spin(loading);

    wireUpUi();

    bg.getTargets(function(targets) {
        spinner.stop();
        loading.style.display = 'none';

        if (targets) {
            showUi(targets);
        } else {
            updateCssClass('.not-signed-in', 'display', 'block');
        }
    });
}

function wireUpUi() {
    var version = document.getElementById('version');
    version.innerHTML = 'v' + bg.version;
    version.onclick = function() {
        bg.openTab('changelog.html');
    };

    var logoLink = document.getElementById('logo-link');
    logoLink.onclick = function() {
        bg.openTab(bg.www);
    };

    var signInLink = document.getElementById('sign-in-link');
    signInLink.onclick = function() {
        bg.openTab(bg.www + '/signin');
    };

    var signUpLink = document.getElementById('sign-up-link');
    signUpLink.onclick = function() {
        bg.openTab(bg.www + '/signin');
    };

    var signOutLink = document.getElementById('sign-out-link');
    signOutLink.onclick = function() {
        bg.signOut();
    };

    var viewInboxLink = document.getElementById('view-inbox-link');
    viewInboxLink.onclick = function() {
        bg.openTab(bg.www + '/');
    };

    var optionsLink = document.getElementById('options-link');
    optionsLink.onclick = function() {
        bg.openTab('options.html');
    };

    var playStoreLink = document.getElementById('play-store-link');
    playStoreLink.onclick = function() {
        bg.openTab('https://play.google.com/store/apps/details?id=com.pushbullet.android');
    };

    var appStoreLink = document.getElementById('app-store-link');
    appStoreLink.onclick = function() {
        bg.openTab('https://itunes.apple.com/us/app/pushbullet/id810352052');
    }

    var pushFormLink = document.getElementById('push-file-link');
    pushFormLink.onclick = function() {
        bg.openTab(bg.www + '/push/file');
    }

    var standardForm = document.getElementById('standard-form');
    var fileForm = document.getElementById('file-form');
    var listForm = document.getElementById('list-form');

    var title = document.getElementById('title');
    var body = document.getElementById('body');

    var listTitle = document.getElementById('list-title');
    var itemsHolder = document.getElementById('list-items');
    var listItems = document.getElementsByName('items[]');

    var savedNote = bg.getUserData('saved_note');
    if (savedNote) {
        info.title = savedNote.note_title || '';
        info.body = savedNote.note_body || '';
    }

    var savedList = bg.getUserData('saved_list');
    if (savedList) {
        listTitle.value = savedList.list_title;

        var items = savedList.list_items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (listItems.length > i) {
                listItems[i].value = item;
            } else {
                var input = getListItemInput();
                input.value = item;
                itemsHolder.appendChild(input)
            }
        }

        if (items.length >= 2) {
            itemsHolder.appendChild(getListItemInput());
        }
    }

    function getListItemInput() {
        var input = document.createElement('input')
        input.type = 'text';
        input.setAttribute('class', 'standard-text-input');
        input.placeholder = 'List item';
        input.name = 'items[]';
        return input;
    }

    updateListItemOnFocusListener();

    function updateListItemOnFocusListener() {
        var length = listItems.length;
        for (var i = 0; i < length; i++) {
            var listItem = listItems[i];
            listItem.onfocus = null;
            if (i == length - 1) {
                listItem.onfocus = function() {
                    itemsHolder.appendChild(getListItemInput());
                    updateListItemOnFocusListener();
                }
            }
        }
    }

    var pushNote = document.getElementById('push-note');
    var pushLink = document.getElementById('push-link');
    var pushFile = document.getElementById('push-file');
    var pushList = document.getElementById('push-list');
    var pushAddress = document.getElementById('push-address');

    pushNote.onselected = function() {
        standardForm.style.display = 'block';
        title.placeholder = 'Title';
        body.placeholder = 'Message';

        if (info.selection) {
            title.value = 'Selection';
            body.value = info.selection;
            delete info.selection;
        } else {
            title.value = info.title || '';
            body.value = info.body || '';
        }
    }

    pushNote.onunselected = function() {
        info.title = title.value;
        info.body = body.value;
    }

    pushLink.onselected = function() {
        standardForm.style.display = 'block';
        title.placeholder = 'Link title';
        body.placeholder = 'http://www.example.com';

        if (info.tabUrl) {
            title.value = info.tabTitle;
            body.value = info.tabUrl;
        }
    }

    pushFile.onselected = function() {
        fileForm.style.display = 'block';
    }

    pushList.onselected = function() {
        listForm.style.display = 'block';
    }

    pushAddress.onselected = function() {
        standardForm.style.display = 'block';
        title.placeholder = 'Title';
        body.placeholder = 'Street address, place, or name of location';

        title.value = info.name || '';
        body.value = info.address || '';
    }

    pushAddress.onunselected = function() {
        info.name = title.value;
        info.address = body.value;
    }

    var typeButtons = [pushNote, pushLink, pushFile, pushList, pushAddress];

    typeButtons.map(function(type) {
        type.onclick = typeClicked;
    });

    function typeClicked() {
        if (activeType && activeType.onunselected) {
            activeType.onunselected();
        }

        activeType = this;

        standardForm.style.display = 'none';
        fileForm.style.display = 'none';
        listForm.style.display = 'none';

        typeButtons.map(function(type) {
            if (!type.classList.contains('blank')) {
                type.classList.add('blank');
            }
        });

        this.classList.remove('blank');
        this.onselected();
    }

    var pushIt = document.getElementById('push-it');
    pushIt.onclick = function() {
        var to = document.getElementById('to');
        var target = to.target;

        var push = { }

        if (target) {
            if (target.email) {
                push.target_email = target.email;
            } else {
                push.device_iden = target.iden;
            }
        } else {
            push.target_email = to.value;
        }

        var typeId = activeType.id;
        if (typeId == 'push-note') {
            push.type = 'note';
            push.title = title.value;
            push.body = body.value;
            pushedNote = true;
        } else if (typeId == 'push-link') {
            push.type = 'link';
            push.title = title.value;
            push.url = body.value;
        } else if (typeId == 'push-file') {
            push.type = 'file';
            return;
        } else if (typeId == 'push-list') {
            push.type = 'list';
            push.title = listTitle.value;
            push.items = getListItems();
            pushedList = true;
        } else if (typeId == 'push-address') {
            push.type = 'address';
            push.name = title.value;
            push.address = body.value;
        }

        pushIt.classList.add('disabled');
        pushIt.onclick = null;
        var spinner = new Spinner({ 'lines': 8, 'length': 6, 'width': 3, 'radius': 5, 'color': 'white' }).spin(pushIt);        

        bg.sendPush(push, function(result) {
            if (result) {
                bg.log('Pushed ' + push.type + ' successfully');
            }
        });

        setTimeout(function() {
            window.close();
        }, 300);
    }
}

function showUi(targets) {
    setupPicker(targets);

    updateCssClass('.signed-in', 'display', 'block');

    if (targets.devices.length == 0 && targets.contacts.length == 0) {
        updateCssClass('.no-devices', 'display', 'block');
    } else {
        updateCssClass('.with-devices', 'display', 'block');
        bg.getAndProcessUpdatedPushes();

        var title = document.getElementById('title');
        var body = document.getElementById('body');

        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            var tab = tabs[0];

            title.value = tab.title;
            body.value = tab.url;

            info.tabTitle = tab.title;
            info.tabUrl = tab.url

            bg.requestPageInfo(function(pageInfo) {
                if (!pageInfo) {
                    return;
                }

                title.value = pageInfo.title;
                body.value = pageInfo.url;

                info.tabTitle = pageInfo.title;
                info.tabUrl = pageInfo.url;

                if (pageInfo.selection.length > 0) {
                    info.selection = pageInfo.selection;
                }
            });
        });

        var pushLink = document.getElementById('push-link');
        pushLink.onclick();
    }

    setTimeout(function() {
        document.getElementById('push-it').focus();
    }, 200);
}

function updateCssClass(cssClass, property, value) {
    var sheets = document.styleSheets;
    for (var i = 0; i < sheets.length; i++) {
        var rules = sheets[i]['rules'];
        for (var j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (rule.selectorText == cssClass) {
                rule.style[property] = value;
            }
        }
    }
}

function getListItems() {
    var entries = [];
    var listItems = document.getElementsByName('items[]');
    for (var i = 0; i < listItems.length; i++) {
        var item = listItems[i];
        if (item.value.length > 0) {
            entries.push(item.value);
        }
    }
    return entries;
}

document.addEventListener('DOMContentLoaded', onload);

window.onunload = function() {
    if (bg.localStorage.api_key) {
        if (pushedList) {
            bg.setUserData('saved_list', null);
        } else if (pushedNote) {
            bg.setUserData('saved_note', null);
        } else {
            if (activeType != null && activeType.id == 'push-note') {
                var title = document.getElementById('title');
                var body = document.getElementById('body');

                var savedNote = {
                    'note_title': title.value,
                    'note_body': body.value
                }

                bg.setUserData('saved_note', savedNote);
            }

            var listTitle = document.getElementById('list-title');

            var savedList = {
                'list_title': listTitle.value,
                'list_items': getListItems()
            }

            bg.setUserData('saved_list', savedList);
        }
    }
}

bg.addEventListener('signed_out', onSignedOut, false);

function onSignedOut() {
    bg.removeEventListener("signed_out", this);
    if (window) {
        window.close();
    }
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-35571910-3']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
