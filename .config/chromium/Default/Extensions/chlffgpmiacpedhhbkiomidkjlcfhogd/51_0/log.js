var bg = chrome.extension.getBackgroundPage();

function onload() {
    bg.track({
        'name': 'chrome_goto',
        'url': '/log'
    });

    document.getElementById('chrome_version').innerHTML = bg.chromeVersion;
    document.getElementById('extension_version').innerHTML = bg.version;
    document.getElementById('device_iden').innerHTML = bg.getUserData('device_iden');

    var log = getLog();

    var container = document.getElementById('container');
    container.innerHTML = '&#8230;\n' + log;
}

function getLog() {
    var blob = '';
    for (var i = 0; i < bg.rollingLog.length; i++) {
        var line = bg.rollingLog[i];
        if (line instanceof Object || line instanceof Array) {
            line = JSON.stringify(line);
        }
        blob += line + '\n';
    }
    return blob;
}

document.addEventListener('DOMContentLoaded', onload);
