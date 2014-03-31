window.onkeydown = function(e) {
    if (e.keyCode == 27) {
        if (hidePicker()) {
            e.preventDefault();
        }
    }
}

var loaded, selectedItem;
function setupPicker(targets) {
    var to = document.getElementById('to');
    var picker = document.getElementById('picker');
    var overlay = document.getElementById('device_overlay');

    to.onfocus = function() {
        overlay.style.display = 'none';
        to.target = null;
        showPicker();
        to.select();
    }

    to.onclick = function() {
        showPicker();
    }

    to.onkeyup = function(e) {
        if (e.keyCode == 27) {
            return;
        } else if (e.keyCode == 13) {
            if (picker.style.display == 'block') {
                picker.firstChild.onclick();
            }
            return;
        }

        showPicker(e.keyCode == 40 || e.keyCode == 38);
    }

    overlay.onclick = function() {
        to.focus();
    }

    to.onkeydown = function(e) {
        if (picker.style.display != 'block') {
            return;
        }

        if (e.keyCode == 40) {
            if (!selectedItem) {
                selectedItem = picker.firstChild;
            } else {
                selectedItem.classList.remove('selected');
                if (selectedItem.nextSibling == null) {
                    // selectedItem = picker.firstChild
                } else {
                    selectedItem = selectedItem.nextSibling;
                }
            }
        } else if (e.keyCode == 38) {
            if (!selectedItem) {
                selectedItem = null;
            } else {
                selectedItem.classList.remove('selected');
                if (selectedItem.previousSibling == null) {
                    // selectedItem = picker.lastChild
                } else {
                    selectedItem = selectedItem.previousSibling;
                }
            }
        } else if (e.keyCode == 13) {
            if (selectedItem) {
                selectedItem.onclick();
                return;
            }
        }

        if (selectedItem && !selectedItem.classList.contains('selected')) {
            selectedItem.classList.add('selected');
            picker.scrollTop = selectedItem.offsetTop;
        }
    }

    to.onblur = function() {
        if (picker.style.display == 'none') {
            return;
        }

        setTimeout(function() {
            hidePicker();
        }, 200);
    }

    function showPicker(dontModify) {
        if (picker.style.display == 'block' && dontModify) {
            return;
        } else if (!dontModify && selectedItem) {
            selectedItem.classList.remove('selected');
            selectedItem = null;
        }

        picker.style.display = 'block';
        picker.innerHTML = '';

        if (!targets) {
            hidePicker();
            return;
        }

        var filter = to.value.toLowerCase();

        for (var i = 0; i < targets.devices.length; i++) {
            var device = targets.devices[i];
            var root = getDeviceElement(device);

            var text = root.firstChild.nextSibling.textContent;
            if (filter && text.toLowerCase().indexOf(filter) == -1) {
                continue
            }

            picker.appendChild(root);

            (function(device, root) {
                root.onclick = function() {
                    root.classList.remove('selected');
                    overlay.style.display = 'block';
                    overlay.innerHTML = '';
                    overlay.appendChild(root);
                    to.target = device;
                    setUserData('last_target_iden', device.iden);
                    hidePicker();
                };
            })(device, root);
        }

        targets.contacts.sort(function(a, b) {
            var an = (a.name || a.email).toLowerCase();
            var bn = (b.name || b.email).toLowerCase();
            if (an > bn)
              return 1;
            if (an < bn)
              return -1;
            return 0;
        });

        for (var i = 0; i < targets.contacts.length; i++) {
            var contact = targets.contacts[i];
            var root = getContactElement(contact);

            var text = root.firstChild.nextSibling.textContent;
            if (filter && text.toLowerCase().indexOf(filter) == -1) {
                continue
            }

            picker.appendChild(root);

            (function(contact, root) {
                root.onclick = function() {
                    root.classList.remove('selected');
                    overlay.style.display = 'block';
                    overlay.innerHTML = '';
                    overlay.appendChild(root);
                    to.target = contact;
                    setUserData('last_target_iden', contact.iden);
                    hidePicker();
                };
            })(contact, root);   
        }

        if (picker.children.length == 0) {
            picker.style.display = 'none';
        }
    }
    
    findLastTarget(targets, function(lastTarget) {
        var root;
        if (lastTarget) {
            to.target = lastTarget;
            if (lastTarget.email) {
                root = getContactElement(to.target);
            } else {
                root = getDeviceElement(to.target);
            }
        } else {
            if (targets.devices.length > 0) {
                to.target = targets.devices[0];
                root = getDeviceElement(to.target);
            } else if (targets.contacts.length > 0) {
                to.target = targets.contacts[0];
                root = getContactElement(to.target);
            }
        }
        if (root) {
            overlay.appendChild(root);
        }
    });
}

function findLastTarget(targets, done) {
    getUserData('last_target_iden', function(lastTargetIden) {
        if (!lastTargetIden) {
            return done(null);
        }

        for (var i = 0; i < targets.devices.length; i++) {
            if (lastTargetIden == targets.devices[i].iden) {
                return done(targets.devices[i]);
            }
        }

        for (var i = 0; i < targets.contacts.length; i++) {
            if (lastTargetIden == targets.contacts[i].iden) {
                return done(targets.contacts[i]);
            }
        }

        return done(null);
    });
}

function getDeviceElement(device) {
    device.manufacturer = device.manufacturer.charAt(0).toUpperCase() + device.manufacturer.slice(1);
    var deviceName = device.nickname || device.manufacturer + " " + device.model;
    var html = "<div class='picker-option'><i class='picker-target-icon " + getIcon(device) + "'></i>" + deviceName + "</div>";
    var root = parse(html);
    return root;
}

function getContactElement(contact) {
    var name = (contact.name || contact.email) + " (" + contact.email + ")";
    var html = "<div class='picker-option'><i class='picker-target-icon push-contact'></i>" + name + "</div>";
    var root = parse(html);
    return root;
}

function getIcon(device) {
    if (device.kind == 'windows') {
        return 'push-computer'
    } else if (device.kind == 'chrome' || device.kind == 'firefox') {
        return 'push-browser';
    } else {
        return 'push-phone';
    }
}

function parse(html) {
    var factory = document.createElement('div');
    factory.innerHTML = html;
    var div = factory.firstChild;
    return div;
}

function hidePicker() {
    if (picker.style.display == 'block') {
        picker.style.display = 'none';
        return true;
    }
    return false;
}

function getUserData(key, done) {
    if (chrome.extension.getBackgroundPage) {
         var bg = chrome.extension.getBackgroundPage();
         done(bg.getUserData(key));
    } else {
        chrome.runtime.sendMessage({ 'code': 'get_user_data', 'key': key }, function(response) {
            done(response);
        });
    }
}

function setUserData(key, value) {
    if (chrome.extension.getBackgroundPage) {
        var bg = chrome.extension.getBackgroundPage();
        bg.setUserData(key, value);
    } else {
        chrome.runtime.sendMessage({ 'code': 'set_user_data', 'key': key, 'value': value }, function(response) {
        });
    }
}
