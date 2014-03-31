chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.code == 'log') {
        log(message.data);
    } else if (message.code == 'track') {
        track({
            'name': message.data
        });
    } else if (message.code == 'get_targets') {
        getTargets(function(targets) {
            chrome.tabs.sendMessage(sender.tab.id, { 'code': 'targets', 'targets': targets}, function(response) {
            });
        }, true);
    } else if (message.code == 'get_user_data') {
        var data = getUserData(message.key);
        sendResponse(data);
    } else if (message.code == 'set_user_data') {
        setUserData(message.key, message.value);
    } else if (message.code == 'send_push') {
        var push = message.push;
        if (push.type == 'file') {
            fetchImage(push.dataUrl, function(blob) {
                pushFile(push, blob);
            });
        } else {
            sendPush(push, function() {
            });
        }
    } else {
        chrome.tabs.sendMessage(sender.tab.id, message, function(response) {
        });
    }
});

function requestPageInfo(done) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { 'code': 'get_page_info' }, function(response) {
            done(response);
        });
    });
}
