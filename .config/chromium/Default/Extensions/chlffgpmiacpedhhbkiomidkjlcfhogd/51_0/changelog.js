var bg = chrome.extension.getBackgroundPage();

function onload() {
    bg.track({
        'name': 'chrome_goto',
        'url': '/changelog'
    });
}

document.addEventListener('DOMContentLoaded', onload);
