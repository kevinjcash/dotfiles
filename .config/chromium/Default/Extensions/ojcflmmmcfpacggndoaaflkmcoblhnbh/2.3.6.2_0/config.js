this.gitHash = '2.3.6.2 [ea7cbcf1ecd0888eb33eea83bc983218e434d2b8] Wed Mar 26 2014 @ 18:26:44 GMT+0100 (CET)';

require.config({
  'baseUrl': '/',
  'paths': {
    'template': 'vendor/require-templates',
    'partial': 'vendor/require-partials',
    'style': 'vendor/require-styles'
  }
});

define('urls', function() {
  return {
    'baseUrl': './'
  };
});

define('config', function() {
  return {
    'name': 'package',
    'airbrake': {"key":"ba637b7ba3174a7f6d6337dfdda50e56"},
    'release': '2.3.6.2',
    'api': {"host":"https://api.wunderlist.com"},
    'analytics': {"ga":"UA-3239969-30"},
    'comments': {"host":"https://comments.wunderlist.com"},
    'files': {"host":"https://files.wunderlist.com"},
    'google': {
      'chromeAppID': '773050426390-8aff4g1mfag0qpnnonpkt7fdv3pl9u9g.apps.googleusercontent.com'
    },
    'invitations': {"host":"https://invitations.wunderlist.com"},
    'facebook': {"appID":"208559595824260"},
    'payment': {"host":"https://payment.wunderlist.com"},
    'realtime': {"pusher_key":"5f8fa4c88bbd0e57fee1"},
    'tracking': {"host":"https://t.wunderlist.com"},
    'urlshortener': {"host":"https://www.wunderli.st"},
    'features': {},
    'business': {"host":"https://business.wunderlist.com"}
  };
});

