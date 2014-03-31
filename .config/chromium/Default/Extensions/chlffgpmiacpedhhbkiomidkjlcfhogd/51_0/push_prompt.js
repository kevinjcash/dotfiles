var loading, spinner, targets, contextInfo;

window.onkeyup = function(e) {
    if (e.keyCode == 27) {
        window.onkeyup = null;
        hidePushPrompt();
    }
}

function onload() {
    loading = document.getElementById('loading');
    spinner = new Spinner({ 'lines': 10, 'length': 6, 'width': 3, 'radius': 7, 'color': '#bdc3c7' }).spin(loading);

    chrome.runtime.sendMessage({ 'code': 'get_targets' }, function(response) {
    });
}

document.addEventListener('DOMContentLoaded', onload);

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.code == 'targets') {
        targets = message.targets;
        if (targets) {
            log('Received targets, requesting context info');
            chrome.runtime.sendMessage({ 'code': 'get_context_info' }, function(response) {
            });
        } else {
            log('Unable to load targets');
            hidePushPrompt();
        }
    } else if (message.code == 'context_info') {
        contextInfo = message.contextInfo;
        if (contextInfo) {
            log('Received context info, presenting contextual push prompt');
            spinner.stop();
            loading.parentNode.removeChild(loading);
            presentUi();
        } else {
            log('No context info returned');
            hidePushPrompt();
        }
    }
});

function presentUi() {
    var content = document.getElementById('content');
    content.style.display = 'block';

    var title = document.getElementById('title');
    var body = document.getElementById('body');

    setupPicker(targets);

    var push = { };

    if (contextInfo.dataUrl != null) {
        push.type = 'file';
        push.file_type = contextInfo.fileType;
        push.dataUrl = contextInfo.dataUrl;

        var previewContainer = document.getElementById('preview_container');
        var preview = document.getElementById('preview');
        previewContainer.style.display = 'block';
        preview.src = contextInfo.dataUrl;
        title.placeholder = 'File name';
        title.value = contextInfo.fileName;
        body.style.display = 'none';
    } else if (contextInfo.linkUrl) {
        push.type = 'link';

        title.placeholder = 'Title';
        title.value = contextInfo.selectionText || 'Link';
        body.placeholder = 'Text';
        body.value = contextInfo.linkUrl;
    } else if (contextInfo.srcUrl) {
        push.type = 'link';

        var name = contextInfo.srcUrl.split("/").pop().split('?')[0];
        title.placeholder = 'Title';
        title.value = name || 'Image';
        body.placeholder = 'URL';
        body.value = contextInfo.srcUrl;
    } else if (contextInfo.selectionText) {
        push.type = 'note';

        title.placeholder = 'Title';
        title.value = 'Selection';
        body.placeholder = 'Text';
        body.value = contextInfo.selectionText;
    } else {
        push.type = 'link';

        title.placeholder = 'Title';
        title.value = contextInfo.tabTitle;
        body.placeholder = 'URL';
        body.value = contextInfo.pageUrl;
    }

    var pushIt = document.getElementById('push-it');
    pushIt.onclick = function() {
        var target = to.target;
        if (target) {
            if (target.email) {
                push.target_email = target.email;
            } else {
                push.device_iden = target.iden;
            }
        } else {
            push.target_email = to.value;
        }

        pushIt.className += ' disabled';
        var spinner = new Spinner({ 'lines': 8, 'length': 4, 'width': 3, 'radius': 5, 'color': 'white' }).spin(pushIt);

        if (push.type == 'file') {
            push.file_name = title.value;
        } else if (push.type == 'link') {
            push.title = title.value;
            push.url = body.value;
        } else {
            push.title = title.value;
            push.body = body.value;
        }

        sendPush(push);

        setTimeout(function() {
            hidePushPrompt();
        }, 300);
    }
}

function hidePushPrompt() {
    chrome.runtime.sendMessage({ 'code': 'hide_push_prompt' }, function(response) {
    });
}

function sendPush(push) {
    chrome.runtime.sendMessage({ 'code': 'send_push', 'push': push }, function(response) {
    });
}

function log(message) {
    chrome.runtime.sendMessage({ 'code': 'log', 'data': message }, function(response) {
    });
}
