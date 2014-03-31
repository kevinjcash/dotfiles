/*  ClearlyComponent__next
 *  ======================
 *  Evernote Clearly's next-page algorithm/functionality, as an embeddable component.
 *  Copyright 2013, Evernote Corporation. Written by Gabriel Coarna.
 *
 *  Usage:
 *  (The Next-Pages Clearly-Component works hand-in-hand with the Detect Clearly-Component.
 *  As such, its init/usage pattern needs to come after the normal init/usage pattern for the Detect Component.)
 *
 *  First "Detect":
 *  ===============
 *
 *      // define
 *      var _detect = {
 *          'callbacks': {
 *              'finished': someFunction(_result),
 *          },
 *          'window': window,
 *          'jQuery': window.jQuery
 *      };
 *
 *      // init -- will return false, if something goes wrong
 *      _detect = initClearlyComponent__detect(_detect);
 *
 *      // call -- returns nothing; callbacks will be used
 *      _detect.start();
 *
 *  Then "Next":
 *  ============
 *
 *      // define
 *      var _next = {
 *          'callbacks': {
 *              'newPageFound': someFunction(_page)
 *          },
 *          'detectComponentInstance': _detect
 *      };
 *
 *      // init -- will return false, if something goes wrong
 *      _next = initClearlyComponent__next(_next);
 *
 *      // call -- returns nothing; callbacks will be used
 *      _next.createNextPagesContainer()
 *      _next.start();
 */

/*  to do:
 *  ======
 *  add error handling --i.e. try again-- by modifying nextPage__ajaxError
 */

function initClearlyComponent__next(_paramInstance) {


//  global instance reference {
//  ===========================

    //  null; return
    if (_paramInstance) {}else { return false; }
    
    //  shorthand
    var $N = _paramInstance;

//  global instance reference }


//  required vars {
//  ===============

    //  the component instance object must already be created,
    //  when the init function is called. it must have these vars set:

    switch (true)
    {
        case (!($N.detectComponentInstance)):
        
        case (!($N.callbacks)):
        case (!($N.callbacks.newPageFound)):
            
            //  something's wrong
            return false;
    }
    
//  required vars }


//  missing settings {
//  ==================

    //  settings object
    if ($N.settings) {}else { $N.settings = {}; }

    //  set default
    var _default = function (_setting, _default_value) { if ($N.settings[_setting]) {}else { $N.settings[_setting] = _default_value; } };

    //  defaults
    //  ========
    
        _default('onCreateNextPageFramesUseThisIdPrefix',       'clearly_next_page_frame__');
    
        _default('onCreateNextPagesContainerUseThisId',         'clearly_next_pages_container');
        _default('onCreateNextPagesContainerDoNotInsertCSS',    false);
    
        _default('onLoadingNextPageFramesUseThisAttribute',     'clearly_next_page_loaded');
        _default('onLoadingNextPageFramesUseThisAttributeValue','yes');
    
//  missing settings }


//  global vars {
//  =============

    var $D = $N.detectComponentInstance;
    var $ = $D.jQuery;

    $N.window = $D.window;
    $N.$window = $D.$window;
    $N.document = $D.document;
    $N.$document = $D.$document;

    $N.debug = $D.debug;
    $N.log = $D.log;
    $N.debugRemember = $D.debugRemember;
    $N.debugOutline = $D.debugOutline;
    $N.debugTimerStart = $D.debugTimerStart;
    $N.debugTimerEnd = $D.debugTimerEnd;

    $N.escape_html = $D.escape_html;

    $N.pages = [];
    $N.originalDocumentDomain = (($N.window.location.hostname != $N.document.domain) ? $N.document.domain : false);

//  global vars }


//  encode / decode / escape {
//  ==========================

    $N.escape_html = function (_string)
    {
        var _replace = { "&": "amp", '"': "quot", "<": "lt", ">": "gt" };
        return _string.replace(/[&"<>]/g, function (_match) { return ("&" + _replace[_match] + ";"); });
    };

    $N.encode = function (_string)
    {
        if (_string == '') { return 'none'; }
        var _replace = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "*": "%2A" };
        return _string.replace(/[!'()*]/g, function (_match) { return _replace[_match]; });
    };

    $N.decode = function (_string)
    {
        if (_string == 'none') { return ''; }
        return decodeURIComponent(_string);
    };

//  encode / decode / escape }


//  parse options {
//  =============   

    $N.parseOptions =
    {
        '_next_page_keywords': [
            /* english */   'next page', 'next',
            /* german */    'vorw&#228;rts', 'weiter',
            /* japanese */  '&#27425;&#12408;'
        ],
        
        '_next_page_keywords_not': [
            /* english */   'article', 'story', 'post', 'comment', 'section', 'chapter'
        ]
    };

//  parse options }
    

//  create next pages container {
//  =============================

    $N.createNextPagesContainer = function ()
    {
        //  default id
        //  ==========
            _container_id = $N.settings.onCreateNextPagesContainerUseThisId;

        //  container
        //  =========
            var _containerElement = $N.document.createElement('div');
                _containerElement.setAttribute('id', _container_id);

        //  css
        //  ===
            if ($N.settings.onCreateNextPagesContainerDoNotInsertCSS) {}else
            {
                var _cssElement = $N.document.createElement('style'),
                    _cssText = ''                                       +
                        '#'+_container_id+' { '                         +
                            'margin: 0; padding: 0; border: none; '     +
                            'position: absolute; '                      +
                            'width: 10px; height: 10px; '               +
                            'top: -100px; left: -100px; '               +
                        '} '                                            +
                        '#'+_container_id+' iframe { '                  +
                            'margin: 0; padding: 0; border: none; '     +
                            'position: absolute; '                      +
                            'width: 10px; height: 10px; '               +
                            'top: -100px; left: -100px; '               +
                        '} '                                            +
                    '';
                _cssElement.setAttribute('id', _container_id + '__css');
                _cssElement.setAttribute('type', 'text/css');
                if (_cssElement.styleSheet) { _cssElement.styleSheet.cssText = _cssText; }
                    else { _cssElement.appendChild($N.document.createTextNode(_cssText)); }
            }
    
        //  write
        //  =====
            var _body = $N.document.getElementsByTagName('body')[0];
                /* css */       if (_cssElement) { _body.appendChild(_cssElement); }
                /* container */ _body.appendChild(_containerElement);
                
        //  set
        //  ===
            $N.nextPages = _containerElement;
            $N.$nextPages = $($N.nextPages);
    };

//  create next pages container }
        

//  helpers {
//  =========

    //  substr starting with the first slash after //
    $N.getURLPath = function (_url) { return _url.substr(_url.indexOf('/', (_url.indexOf('/'+'/') + 2))); };

    //  substr until the first slash after //
    $N.getURLDomain = function (_url) { return _url.substr(0, _url.indexOf('/', (_url.indexOf('/'+'/') + 2))); };

//  helpers }
        

//  load page {
//  ===========

    $N.nextPage__loadToFrame = function (_pageNr, _nextPageURL)
    {
        var _charset = ('' + (($N.document.characterSet || $N.document.charset) || ''));
        $.ajax({
            'url': _nextPageURL,

            'type':       'GET',
            'dataType':   'html',
            'async':      true,
            'timeout':    (10 * 1000),
            
            'beforeSend': function (_xhr)                         { _xhr.overrideMimeType('text/html; charset='+$N.escape_html(_charset)); },
            'success':    function (_response, _textStatus, _xhr) { $N.nextPage__ajaxComplete(_pageNr, _response, _textStatus, _xhr, _nextPageURL); },
            'error':      function (_xhr, _textStatus, _error)    { $N.nextPage__ajaxError(_pageNr, _xhr, _textStatus, _error); }
        });
    };

    $N.nextPage__ajaxError = function (_pageNr, _xhr, _textStatus, _error) { };

    $N.nextPage__ajaxComplete = function (_pageNr, _response, _textStatus, _xhr, _url)
    {
        //  valid?
        //  ======
            if (_response > '') {}else { return; }

        //  get html
        //  ========
            var _html = _response;
            
            //  normalize
            //  =========
                _html = _html.replace(/<\s+/gi, '<');
                _html = _html.replace(/\s+>/gi, '>');
                _html = _html.replace(/\s+\/>/gi, '/>');

            //  remove
            //  ======
                _html = _html.replace(/<script[^>]*?>([\s\S]*?)<\/script>/gi, '');
                _html = _html.replace(/<script[^>]*?\/>/gi, '');
                _html = _html.replace(/<noscript[^>]*?>([\s\S]*?)<\/noscript>/gi, '');
            
        //  append frame
        //  ============
            $N.$nextPages.append(''                 +
                '<iframe'                           +
                ' id="' + $N.escape_html($N.settings.onCreateNextPageFramesUseThisIdPrefix) + $N.escape_html(''+_pageNr) + '"' +
                ' scrolling="no" frameborder="0"'   +
                '></iframe>'                        +
            '');        
        
        //  write to frame -- once loaded
        //  ==============
            var _check_interval = false;
            var _check = function ()
            {
                //  iframe
                var _iframe = $N.document.getElementById($N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr);
                if (_iframe) {}else { return; }

                //  doc                
                var _doc = (_iframe.contentDocument || _iframe.contentWindow.document);
                if (_doc) {}else { return; }
                
                //  document.domain -- wait for scripts to set this, if this to be set
                if (_doc.domain == $N.document.domain)  {}else { return; }
                
                //  clear interval
                $N.window.clearInterval(_check_interval);
                
                //  add load handler
                $N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).bind('load', function ()
                {
                    //  done?
                    if ($N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).attr($N.settings.onLoadingNextPageFramesUseThisAttribute) == $N.settings.onLoadingNextPageFramesUseThisAttributeValue) { return; }
            
                    //  can do?
                    var _doc = $N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).contents().get(0);
                    if (_doc) {}else { return; }
                    if ((_doc.readyState == 'interactive') || (_doc.readyState == 'complete')) {}else { return; }
            
                    //  mark
                    $N.$nextPages.find('#'+$N.settings.onCreateNextPageFramesUseThisIdPrefix+_pageNr).attr($N.settings.onLoadingNextPageFramesUseThisAttribute, $N.settings.onLoadingNextPageFramesUseThisAttributeValue);

                    // do
                    $N.nextPage__loadedInFrame(_pageNr, _doc.defaultView);                  
                });

                //  write html
                _doc.open();
                _doc.write(_html);
                _doc.close();
            };
            _check_interval = $N.window.setInterval(_check, 50);
    };

    $N.nextPage__loadedInFrame = function (_pageNr, _pageWindow)
    {
        //  find
        //  ====
            var _found = $D.getContent__findInPage(_pageWindow),
                _foundHTML = _found._html,
                _removeTitleRegex = new RegExp($D.articleTitleMarker__start + '(.*?)' + $D.articleTitleMarker__end, 'i');

        //  get first fragment
        //  ==================
            var _firstFragment = $D.nextPage__getFirstFragment(_foundHTML);
        
            //  gets first 2000 characters
            //  diff set at 100 -- 0.05
            switch (true)
            {
                case ($D.levenshteinDistance(_firstFragment, $N.nextPage__firstFragment__firstPage) < 100):
                case ($D.levenshteinDistance(_firstFragment, $N.nextPage__firstFragment__lastPage) < 100):
                    //  break
                    return false;
                
                default:
                    //  add to first fragemnts
                    $N.nextPage__firstFragment__lastPage = _firstFragment;
                    break;
            }

        //  remove title -- do it twice
        //  ============

            //  once with document title
            _foundHTML = $D.getContent__find__isolateTitleInHTML(_foundHTML, ($N.document.title > '' ? $N.document.title : ''));
            _foundHTML = _foundHTML.replace(_removeTitleRegex, '');

            //  once with article title
            _foundHTML = $D.getContent__find__isolateTitleInHTML(_foundHTML, $D.articleTitle);
            _foundHTML = _foundHTML.replace(_removeTitleRegex, '');

        //  return
        //  ======
            var _page = {
                '_url':         _pageWindow.location.href,
                '_html':        _foundHTML,
                '_elements':    [_found._targetCandidate.__node]
            };
            
            $N.pages.push(_page);
            if ($N.callbacks.newPageFound) { $N.callbacks.newPageFound(_page); }

        //  next
        //  ====
            $N.nextPage__find(_pageWindow, _found._links);
        
        //  return
        //  ======
            return false;
    };

//  load }


//  find {
//  ======

    $N.nextPage__find = function (_currentPageWindow, _linksInCurrentPage)
    {
        //  page id
            var _pageNr = ($N.pages.length + 1);
    
        //  get
        //  ===
            var _possible = [];
            if (_possible.length > 0) {}else { _possible = $N.nextPage__find__possible(_currentPageWindow, _linksInCurrentPage, 0.5); }
            //if (_possible.length > 0) {}else { _possible = $N.nextPage__find__possible(_currentPageWindow, _linksInCurrentPage, 0.50); }

            //  none
            if (_possible.length > 0) {}else
                { if ($N.debug) { $N.log('no next link found'); } return; }
            
            //  log
            if ($N.debug) { $N.log('possible next', _possible); }
            
            
        //  the one
        //  =======
            var _nextLink = false;

        //  next keyword?
        //  =============
            (function ()
            {
                if (_nextLink) { return; }

                for (var i=0, _i=_possible.length; i<_i; i++)
                {
                    for (var j=0, _j=$N.parseOptions._next_page_keywords.length; j<_j; j++)
                    {
                        if (_possible[i]._caption.indexOf($N.parseOptions._next_page_keywords[j]) > -1)
                        {
                            //  length
                            //  ======
                                if (_possible[i]._caption.length > $N.parseOptions._next_page_keywords[j].length * 2)
                                    { continue; }

                            //  not keywords
                            //  ============
                                for (var z=0, _z=$N.parseOptions._next_page_keywords_not.length; z<_z; z++)
                                {
                                    if (_possible[i]._caption.indexOf($N.parseOptions._next_page_keywords_not[z]) > -1)
                                        { _nextLink = false; return; }
                                }
                        
                            //  got it
                            //  ======
                                _nextLink = _possible[i];
                                return;
                        }
                    }
                }
            })();    

        //  caption matched page number
        //  ===========================
            (function ()
            {
                if (_nextLink) { return; }

                for (var i=0, _i=_possible.length; i<_i; i++)
                {
                    if (_possible[i]._caption == (''+_pageNr))
                        { _nextLink = _possible[i]; return; }
                }
            })();

        //  next keyword in title
        //  =====================
            (function ()
            {
                if (_nextLink) { return; }

                for (var i=0, _i=_possible.length; i<_i; i++)
                {
                    //  sanity
                    if (_possible[i]._title > '') {}else { continue; }
                    if ($D.measureText__getTextLength(_possible[i]._caption) <= 2) {}else { continue; }
                    
                    for (var j=0, _j=$N.parseOptions._next_page_keywords.length; j<_j; j++)
                    {
                        if (_possible[i]._title.indexOf($N.parseOptions._next_page_keywords[j]) > -1)
                        {
                            //  length
                            //  ======
                                if (_possible[i]._title.length > $N.parseOptions._next_page_keywords[j].length * 2)
                                    { continue; }

                            //  not keywords
                            //  ============
                                for (var z=0, _z=$N.parseOptions._next_page_keywords_not.length; z<_z; z++)
                                {
                                    if (_possible[i]._title.indexOf($N.parseOptions._next_page_keywords_not[z]) > -1)
                                        { _nextLink = false; return; }
                                }
                        
                            //  got it
                            //  ======
                                _nextLink = _possible[i];
                                return;
                        }
                    }
                }
            })();

        //  return?
        //  =======
            if (_nextLink) {}else { return; }
        
        //  mark
        //  ====
            if ($N.debug)
            {
                $N.debugOutline(_nextLink._node, 'target', 'next-page');
                $N.log('NextPage Link', _nextLink, _nextLink._node);
            }
        
        //  process page
        //  ============
            $N.nextPage__loadToFrame(_pageNr, _nextLink._href);
    };
    
    $N.nextPage__find__possible = function (_currentPageWindow, _linksInCurrentPage, _distanceFactor)
    {
        var _mainPageHref = $N.window.location.href,
            _mainPageDomain = $N.getURLDomain(_mainPageHref),
            _mainPagePath = $N.getURLPath(_mainPageHref);
        
        var _links = $.map(_linksInCurrentPage, function (_element, _index)
        {
            var _href = _element.__node.href,
                _path = $N.getURLPath(_href),
                _title = (_element.__node.title > '' ? _element.__node.title.toLowerCase() : ''),
                _caption = _element.__node.innerHTML.replace(/<[^>]+?>/gi, '').replace(/\&[^\&\s;]{1,10};/gi, '').replace(/\s+/gi, ' ').replace(/^ /, '').replace(/ $/, '').toLowerCase(),
                _distance = $D.levenshteinDistance(_mainPagePath, _path);
            
            var _caption2 = '';
            for (var i=0, _i=_caption.length, _code=0; i<_i; i++)
            {
                _code = _caption.charCodeAt(i);
                _caption2 += (_code > 127 ? ('&#'+_code+';') : _caption.charAt(i));
            }
            _caption = _caption2;
            
            switch (true)
            {
                case (!(_href > '')):
                case (_mainPageHref.length > _href.length):
                case (_mainPageDomain != $N.getURLDomain(_href)):
                case (_href.substr(_mainPageHref.length).substr(0, 1) == '#'):
                case (_distance > Math.ceil(_distanceFactor * _path.length)):
                    return null;
                    
                default:
                    //  skip if already loaded as next page
                    for (var i=0, _i=$N.pages.length; i<_i; i++)
                        { if ($N.pages[i]._url == _href) { return null; } }

                    //  return
                    return {
                        '_node': _element.__node,
                        '_href': _href,
                        '_title': _title,
                        '_caption': _caption,
                        '_distance': _distance
                    };
            }
        });
        
        //  sort -- the less points, the closer to position 0
        //  ====
            _links.sort(function (a, b)
            {
                switch (true)
                {
                    case (a._distance < b._distance): return -1;
                    case (a._distance > b._distance): return 1;
                    default: return 0;
                }
            });
        
        
        //  return
            return _links;
    };

//  find }


//  start {
//  =======

    $N.start = function ()
    {
        //  first fragments
        $N.nextPage__firstFragment__firstPage = $D.nextPage__firstFragment__firstPage;
        $N.nextPage__firstFragment__lastPage = $D.nextPage__firstFragment__lastPage;
            
        //  first page
        $N.pages = [{ '_url': $N.window.location.href }];
            
        //  start
        $N.nextPage__find($N.window, $D.nextPage__firstLinks);
    };

//  start }


return $N; }