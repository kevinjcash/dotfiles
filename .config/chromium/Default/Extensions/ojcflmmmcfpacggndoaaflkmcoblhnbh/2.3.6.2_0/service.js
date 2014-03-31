(function () {

  'use strict';

  var runtime = chrome.app.runtime;

  var isMacOs = (navigator.platform === 'MacIntel');

  function loadScript (doc, path, callback) {
    var script = doc.createElement('script');
    script.type = 'application/javascript';
    script.onload = callback;
    script.src = path;
    doc.head.appendChild(script);
  }

  function fetchUserData (callback) {

    var storeName = 'user';
    var keyPath = '_key';

    var indexedDB = window.indexedDB || window.webkitIndexedDB;
    var versionlessDbOpenReq = indexedDB.open('wunderlist');
    versionlessDbOpenReq.onsuccess = function (e) {

      var _db = e.target.result.db || e.target.result;
      // on first launch there will be no stores
      try {
        var readTransaction = _db.transaction([storeName], 'readonly');
        var store = readTransaction.objectStore(storeName);
        var getRequest = store.get('wunderlist_user_1');

        getRequest.onerror = function (e) {
          console.log(e);
          callback && callback({});
        };
        getRequest.onsuccess = function (e) {

          var json = e.target.result;
          if (!json) {
            console.log('no user data');
            json = {};
          }
          callback && callback(json);
        };
      }
      catch (e) {
        callback && callback({});
      }
    };
  }

  function launch (path) {

    chrome.app.window.create('blank.html', {

      'id': 'wunderlist',
      'bounds': {
        'width': 1200,
        'height': 800
      },
      'resizable': true,
      'minWidth': 320,
      'minHeight': 540,
      'singleton': true,
      'frame': isMacOs ? 'none' : 'chrome',
      'transparentBackground': true,
      'hidden': true
    }, function (win) {

      var window = win.contentWindow;
      var document = window.document;

      function ready () {

        window.require(['application/runtime'], function (runtime) {

          runtime.once('interface:ready', function () {
            
            console.log('interface:ready');
            win.show();
          });
          // on a reload request,
          runtime.once('reload', function (reloadPath) {
            // close the existing window
            win.close();
            // open again in 50ms
            setTimeout(launch.bind(null, reloadPath), 50);
          });
        });
      }

      window.onload = function () {
        loadScript(document, 'js/libs.js', function () {
          loadScript(document, 'config.js', function () {

            fetchUserData(function (userData) {

              var loggedIn = !!userData.token || userData.id === 'unregistered';

              // set the route, if has been reloaded
              window.location.hash = typeof path === 'string' ? path : '/';

              if ((typeof path === 'string' && path.indexOf('/login') !== -1) || !loggedIn) {
                console.log('loading login');
                loadScript(document, 'js/login.js', ready);
              }
              else {
                console.log('loading main app');
                loadScript(document, 'js/main.js', ready);
              }
            });
          });
        });
      };
    });
  }

  runtime.onLaunched.addListener(launch);

}).call(this);