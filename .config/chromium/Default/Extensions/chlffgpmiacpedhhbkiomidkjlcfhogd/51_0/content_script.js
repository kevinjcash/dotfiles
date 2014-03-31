var savedWindowOnKeyUp, contextInfo;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.code == 'get_page_info') {
        var pageInfo = {
            'url': document.location.href,
            'title': document.title,
            'selection': window.getSelection().toString()
        };

        if (pageInfo.url.match(/^http[s]?:\/\/maps\.google\./) || pageInfo.url.match(/^http[s]?:\/\/www\.google\.[a-z]{2,3}(\.[a-z]{2})?\/maps/)) {
            var link = document.getElementById('link');
            if (link && link.href) {
                pageInfo.url = link.href;
            }
        }

        sendResponse(pageInfo);
    } else if (message.code == 'show_push_prompt') {
        contextInfo = message.info;
        showPushPrompt(contextInfo);
    } else if (message.code == 'hide_push_prompt') {
        hidePushPrompt();
    } else if (message.code == 'get_context_info') {
        chrome.runtime.sendMessage({ 'code': 'context_info', 'contextInfo': contextInfo }, function(response) {
        });
    }
});

function showPushPrompt(contextInfo) {
    log('Showing push to prompt');
    track('chrome_context_menu_prompt');

    hidePushPrompt();

    var style = document.createElement('style');
    style.setAttribute('id', 'pushbullet-push-prompt-style');
    style.appendChild(document.createTextNode('body { height: 100%; overflow: hidden; };'));

    document.head.appendChild(style);

    var height = Math.max(document.body.scrollHeight,
                          document.body.offsetHeight,
                          document.documentElement.clientHeight,
                          document.documentElement.scrollHeight,
                          document.documentElement.offsetHeight);

    var div = document.createElement('div');
    div.setAttribute('id', 'pushbullet-push-prmopt-div');
    div.setAttribute('style', 'position:absolute;top:0px;left:0px;width:100%;height:' + height + 'px;z-index: 16777270;background-color:#000;opacity: 0.35;');

    div.onclick = function() {
        hidePushPrompt();
    }

    document.body.insertBefore(div, document.body.firstChild);

    var overlayWidth = 424;
    var overlayHeight;
    if (contextInfo.dataUrl) {
        overlayHeight = 520;
    } else {
        overlayHeight = 370;
    }

    var left = Math.floor((window.innerWidth - overlayWidth) / 2);
    var top = Math.floor((window.innerHeight - overlayHeight) / 3) + scrollY;

    var iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'pushbullet-push-prompt-iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('src', chrome.extension.getURL('push_prompt.html'));
    iframe.setAttribute('style', 'border:none;width:' + overlayWidth + 'px;height:' + overlayHeight + 'px;position:absolute;top:' + top + 'px;left:' + left + 'px;z-index:16777271;background-color:transparent;');

    document.body.insertBefore(iframe, document.body.firstChild);

    savedWindowOnKeyUp = window.onkeyup;
    window.onkeyup = function(e) {
        if (e.keyCode == 27) {
            window.onkeyup = null;
            hidePushPrompt();
        }
    }
}

function hidePushPrompt() {
    var style = document.getElementById('pushbullet-push-prompt-style');
    var div = document.getElementById('pushbullet-push-prmopt-div');
    var iframe = document.getElementById('pushbullet-push-prompt-iframe');
    if (style) {
        log('Hiding push to prompt');
        style.parentNode.removeChild(style);
        div.parentNode.removeChild(div);
        iframe.parentNode.removeChild(iframe);
    }

    if (savedWindowOnKeyUp) {
        window.onkeyup = savedWindowOnKeyUp;
    }
}

function log(message) {
    chrome.runtime.sendMessage({ 'code': 'log', 'data': message }, function(response) {
    });
}

function track(name) {
    chrome.runtime.sendMessage({ 'code': 'track', 'data': name }, function(response) {
    });
}
