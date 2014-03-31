
//  init.js gets inserted/executed, by launch.js, if window.$evernote_clearly doesn't already exist
//  by this point
//      window.$evernote_clearly has already been defined -- by launch.js
//      evernote_clearly__container has already been created -- by _inject_launcher

//  isolate
//  =======
    (function ($R)
    {
    
        var _log = function (_message) { if (console && console.log) { console.log('evernote_clearly / init / ' + _message); } };
    
        var _launch = function ()
        {
            //  no $R
            if ($R) {}else { _log('$evernote_clearly is not defined'); return; }

            //  set vars -- important!
            //  ======================

                $R.window = window;
                $R.document = window.document;

                $R.version = '1392383928';

                $R.paths = {
                    'main':     'chrome-extension://iooicodkiihhpojmmeghjclgihfjdjhj/',
                    'evernote': 'https://www.evernote.com/'
                };
                
                $R.cssIDs = {};
                $R.cssIDs.prefix = 'evernote_clearly__';
                $R.cssIDs.container = $R.cssIDs.prefix + 'container';
                $R.cssIDs.controller = $R.cssIDs.prefix + 'controller';

            
            //  controller already present
            if (document.getElementById($R.cssIDs.controller)) { _log('page already has controller frame'); return; }
            
            //  get container; if no container, stop
            var _container = document.getElementById($R.cssIDs.container);
            if (_container) {}else { _log('page is missing container'); return; }
            
            //  controller frame
            var _iframeElement = document.createElement('iframe'),
                _iframeHTML = ''                        +
                    '<!DOCTYPE html>'                   +
                    '<html id="html"><body id="body">'  +
                        '<script type="text/javascript" src="'+$R.paths.main+'third_party/jquery/jquery.js">' +                 '</script>' +
                        '<script type="text/javascript" src="'+$R.paths.main+'third_party/jquery/jquery.custom_easings.js">' +  '</script>' +
                        ''                              +
                        '<script type="text/javascript" src="'+$R.paths.main+'the_components/detect/detect.js">' +              '</script>' +
                        '<script type="text/javascript" src="'+$R.paths.main+'the_components/highlight/highlight.js">' +        '</script>' +
                        '<script type="text/javascript" src="'+$R.paths.main+'the_components/next/next.js">' +                  '</script>' +
                        '<script type="text/javascript" src="'+$R.paths.main+'the_components/reformat/reformat.js">' +          '</script>' +
                         '<script type="text/javascript" src="'+$R.paths.main+'the_components/speech/speech.js">' +          '</script>' +
                    
                        ''                              +
                        '<script type="text/javascript" src="'+$R.paths.main+'js_in_page/controller.js">' +                     '</script>' +
                    '</body></html>'                    +
                '';
                _iframeElement.setAttribute('id', $R.cssIDs.controller);
                _iframeElement.setAttribute('frameBorder', '0');
                _iframeElement.setAttribute('allowTransparency', 'true');
                _iframeElement.setAttribute('scrolling', 'auto');

            //  append frame
            _container.appendChild(_iframeElement);

            //  write to frame -- when loaded        
            var _check_interval = false;
            var _check = function ()
            {
                //  iframe
                var _iframe = document.getElementById($R.cssIDs.controller);
                if (_iframe) {}else { return; }

                //  doc                
                var _doc = (_iframe.contentDocument || _iframe.contentWindow.document);
                if (_doc) {}else { return; }
                
                //  clear interval
                window.clearInterval(_check_interval);

                //  write in frame                
                _doc.open();
                _doc.write(_iframeHTML);
                _doc.close();
            };
            _check_interval = window.setInterval(_check, 50);
        };

        var _try = function (delayedNrTimes)
        {
            //  not ready try in 100ms
            if (document.readyState != 'complete' && delayedNrTimes < 30) { window.setTimeout(function () { _launch(delayedNrTimes + 1); }, 100); return; }
        
            //  do -- finally
            _launch(window.$evernote_clearly);
        };

        if (document.readyState) { _try(0); }
        else                     { _launch(); }
        
    })(window.$evernote_clearly);
