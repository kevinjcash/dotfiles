/* globals chrome, navigator */
(function () {

  'use strict';

  var runtime = chrome.app.runtime;

  var isMacOs = (navigator.platform === 'MacIntel');
  var winOptions = {
    'id': 'wunderlist',
    'bounds': {
      'width': 1200,
      'height': 820
    },
    'resizable': true,
    'minWidth': 320,
    'minHeight': 540,
    'singleton': true,
    'frame': isMacOs ? 'none' : 'chrome',
    'transparentBackground': true,
    'hidden': true
  };

  function loadScript (doc, path, callback) {
    var script = doc.createElement('script');
    script.type = 'application/javascript';
    script.onload = callback;
    script.src = path;
    doc.head.appendChild(script);
  }

  function launch (path) {
    chrome.app.window.create('blank.html', winOptions, function (win) {

      var window = win.contentWindow;
      var document = window.document;

      window.onload = function () {
        loadScript(document, 'vendor/require.js', function () {

          window.location.hash = path;
          var require = window.require.config({
            "context": "wunderlist"
          });

          require([
            'backend/database',
            'application/runtime'
          ], function (database, runtime) {

            runtime.once('interface:ready', function () {
              win.show();
            });

            runtime.once('reload', function (reloadPath) {
              win.close();
              setTimeout(launch, 50, reloadPath);
            });

            database.init().then(function () {
              database.getAll('user', function (users) {
                window.location.hash = users.length ? '#/' : '#/login';
                require(['bootstrap']);
              });
            });

          });
        });
      };
    });
  }

  runtime.onLaunched.addListener(function () { // options
    launch('/');
  });

}).call(this);
