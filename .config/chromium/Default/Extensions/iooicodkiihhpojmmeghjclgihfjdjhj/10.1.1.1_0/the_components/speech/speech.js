/*  ClearlyComponent__speech
 *  ========================
 *  Evernote Clearly's text-to-speech functionality, as an embeddable component.
 *  Copyright 2013, Evernote Corporation. Written by Gabriel Coarna.
 *
 *  Usage:
 *  (The Speech Clearly-component works hand-in-hand with the Clearly Highlighting component.
 *  As such, its init/usage pattern needs to come after the normal init/usage pattern for the Highlighting component.)
 *
 *  First "Highlighting":
 *  =====================
 *      
 *      // define
 *      var _highlight = {
 *          'settings': {
 *              'imgPath': '[none]'
 *          },
 *          'window': window,
 *          'jQuery': window.jQuery
 *      };
 *
 *      // init -- will return false, if something goes wrong
 *      _highlight = initClearlyComponent__highlight(_highlight);
 *
 *  Then "Speech":
 *  ==============
 *
 *      // define
 *      var _speech = {
 *          'callbacks': {
 *              'stateChanged': function () { },
 *              'languageNotDetected': function () { }
 *          },
 *          'settings': { 
 *              'key__iSpeech': 'string',
 *              'key__googleTranslate': 'string',
 *              'originalPageCSSClass': 'string'
 *          },
 *          'highlightComponentInstance': _highlight
 *      };
 *
 *      // init -- will return false, if something goes wrong
 *      _speech = initClearlyComponent__speech(_speech);
 *
 *      // add page
 *      _speech.addPage(_element);
 *
 *      // actions
 *      _speech.speech__doPlay();
 *      _speech.speech__doPause();
 *      _speech.speech__doForward();
 *      _speech.speech__doRewind();
 */

/*  to do:
 *  ======   
 *  add auto scroll control
 */

function initClearlyComponent__speech(_paramInstance) {


//  global instance reference {
//  ===========================

    //  null; return
    if (_paramInstance) {}else { return false; }
    
    //  shorthand
    var $S = _paramInstance;

//  global instance reference }


//  required vars {
//  ===============

    //  the component instance object must already be created,
    //  when the init function is called. it must have these vars set:

    switch (true)
    {
        case (!($S.settings)):
        case (!($S.settings.key__iSpeech)):
        case (!($S.settings.key__googleTranslate)):
        case (!($S.settings.originalPageCSSClass)):

        case (!($S.callbacks)):
        case (!($S.callbacks.stateChanged)):
        
        case (!($S.highlightComponentInstance)):

            if ($S.debug)
            {
                console.log(!($S.settings));
                console.log(!($S.settings.key__iSpeech));
                console.log(!($S.settings.key__googleTranslate));
                console.log(!($S.settings.originalPageCSSClass));
                
                console.log(!($S.highlightComponentInstance));
            }
            
            //  something's wrong
            return false;
    }
    
//  required vars }


//  missing settings {
//  ==================

    //  set default
    var _default = function (_setting, _default_value) { if ($S.settings[_setting]) {}else { $S.settings[_setting] = _default_value; } };

    //  defaults
    //  ========

        _default('textLanguage',                    'general');

        _default('audioEngine',                     'jPlayer');
        _default('instancesNr',                     5);

        _default('baseForRequestURL',               'http://api.ispeech.org/api/rest');
        _default('audioJS__pathToFlash',            'http://www.ispeech.org/Flash/taudiojs.swf');
        _default('audioJS__useFlash',               true);

        _default('gender',                          '[none]');
        _default('speed',                           'normal');

        _default('onInsertCSSUseThisId',                    'clearly_speech_css');
        _default('onInsertAudioElementsContainerUseThisId', 'clearly_speech_audio_elements');
        
        _default('nowSpeakingId',                   'clearly_speech_now_speaking');
        _default('nowSpeakingLeftBehindCSSClass',   'clearly_speech_former_now_speaking');
        _default('nowSpeakingBackgroundColor',      '#065588');
        _default('nowSpeakingBackgroundOpacity',    '0.25');
        _default('nowSpeakingForegroundColor',      '[none]');

        _default('fragmentSeparatorTag',            'b');
        _default('fragmentSeparatorCSSClass',       'clearly_speech_fragment_separator');
        _default('fragmentSeparatorIdPrefix',       'clearly_speech_fragment_separator__');

        _default('duplicateContentCSSClass',            'clearly_speech_duplicate_content');
        _default('duplicateContentFragmentCSSClass',    'clearly_speech_fragment');
        _default('duplicateContentFragmentIdAttribtue', 'clearly_speech_fragment_id');
        
//  missing settings }


//  global vars {
//  =============

    var $H = $S.highlightComponentInstance;
    var $A = false; /* audioEngine; set later */
    var $ = $H.jQuery; /* wil also have $.jPLayer attached */

    $S.state = 'none';

    $S.window = $H.window;
    $S.$window = $H.$window;
    $S.document = $H.document;
    $S.$document = $H.$document;
    $S.$html = $S.$document.find('html');

    $S.debug = $H.debug;
    $S.log = $H.log;
    $S.debugRemember = $H.debugRemember;
    $S.debugOutline = $H.debugOutline;
    $S.debugTimerStart = $H.debugTimerStart;
    $S.debugTimerEnd = $H.debugTimerEnd;

    $S.speech__pages = [];
    $S.speech__instances = {};
    $S.speech__fragmentsPerPage = {};
    $S.speech__doAutoScrollTimer = false;
    $S.speech__lastMouseAction = false;
    
    $S.speech__language = 'en';
    $S.speech__voice = 'usenglishfemale';
    $S.speech__speed = 'normal';

    $S.speech__getInstanceIndex__next = function (_relativeTo) { return ((_relativeTo == $S.settings.instancesNr) ? 1 : (_relativeTo+1)); };
    $S.speech__getInstanceIndex__previous = function (_relativeTo) { return ((_relativeTo == 1) ? $S.settings.instancesNr : (_relativeTo-1)); };

    $S.speech__errorsMax__tryToPlay = 3;
    $S.speech__errorsMax__loadAudio = 3;
    $S.speech__errorsMax__loadMarkers = 3;
    
//  global vars }


//  engines {
//  =========

    $S.audioEngines = {
        
        'audioJS':
        {
            'create': function (_instanceIndex)
            {
                //  create
                $S.speech__instances['instance_'+_instanceIndex] = {};
                var _instance = $S.speech__instances['instance_'+_instanceIndex];
            
                //  audio element
                var _audio = $S.document.createElement('audio');
                    _audio.setAttribute('id', 'audioElement_' + _instanceIndex);
                $S.$audioElementsContainer.append(_audio);    
            
                //  audio.js
                _instance['audioJS'] = $S.audioJS.create(_audio,
                {
                    'loadProgress':     function (_ratioLoaded) { $S.speech__instanceEvent__loadProgress(_instanceIndex, (_ratioLoaded * 100)); },
                    'updatePlayhead':   function (_ratioPlayed) { $S.speech__instanceEvent__playProgress(_instanceIndex, (_ratioPlayed * this.duration * 1000)); },
                    'trackEnded':       function ()             { $S.speech__instanceEvent__playEnd(_instanceIndex); },
                    'loadError':        function ()             { $S.speech__loadError__audio(_instanceIndex); }
                });
            },
            
            'load': function (_instanceIndex)   { var _s = $S.speech__instances['instance_'+_instanceIndex]; _s.audioJS.load(_s['url__audio']); },
            'play': function (_instanceIndex)   { var _s = $S.speech__instances['instance_'+_instanceIndex]; _s.audioJS.play(); },
            'pause': function (_instanceIndex)  { var _s = $S.speech__instances['instance_'+_instanceIndex]; _s.audioJS.pause(); },
            
            'initEngine': function ()
            {
                var _$A = $S.audioJS;
                
                //  configure
                _$A.settings.autoplay = false;
                _$A.settings.loop = false;
                _$A.settings.preload = true;
        
                //  don't use
                _$A.settings.css = '';
                _$A.settings.imageLocation = '';
                
                if ($S.settings.audioJS__useFlash)
                {
                    _$A.settings.swfLocation = $S.settings.audioJS__pathToFlash;
                    _$A.settings.useFlash = true;
                    _$A.settings.hasFlash = true;
                }
                else
                {
                    _$A.settings.swfLocation = '';
                    _$A.settings.useFlash = false;
                    _$A.settings.hasFlash = false;
                }
            }
            
        },
        
        'jPlayer':
        {
            'create': function (_instanceIndex)
            {
                //  create
                $S.speech__instances['instance_'+_instanceIndex] = {};
                var _instance = $S.speech__instances['instance_'+_instanceIndex];
            
                //  audio element
                var _e = $S.document.createElement('div');
                    _e.setAttribute('id', 'jPlayerDivElement_'+_instanceIndex);
                $S.$audioElementsContainer.append(_e);    
                
                //  reference to interface
                _instance['$j'] = $S.$document.find('#'+'jPlayerDivElement_'+_instanceIndex);
            
                //  init
                _instance.$j.jPlayer({
                    'solution': 'html',
                    'supplied': 'mp3',

                    'preload': 'auto',
                    'swfPath': '[none]',
                    'loop': false,
                
                    'progress':     function (_event) { $S.speech__instanceEvent__loadProgress(_instanceIndex, (_event.jPlayer.status.seekPercent)); },
                    'timeupdate':   function (_event) { $S.speech__instanceEvent__playProgress(_instanceIndex, (_event.jPlayer.status.currentTime * 1000)); },
                    'ended':        function (_event) { $S.speech__instanceEvent__playEnd(_instanceIndex); },
                    'error':        function (_event) { $S.speech__loadError__audio(_instanceIndex); }
                });            
            },
            
            'load': function (_instanceIndex)   { var _s = $S.speech__instances['instance_'+_instanceIndex]; _s.$j.jPlayer('setMedia', { 'mp3': _s['url__audio'] }).jPlayer('load'); },
            'play': function (_instanceIndex)   { var _s = $S.speech__instances['instance_'+_instanceIndex]; _s.$j.jPlayer('play'); },
            'pause': function (_instanceIndex)  { var _s = $S.speech__instances['instance_'+_instanceIndex]; _s.$j.jPlayer('pause'); },
            
            'initEngine': function () { }
        }
        
    };

    $A = $S.audioEngines[$S.settings.audioEngine];
    $A.initEngine();
    
//  engines }


//  create request {
//  ================

    $S.createRequestURL = function (_action, _text)
    {
        return ''                                           +
            $S.settings.baseForRequestURL                   +
            '?apikey=' + encodeURIComponent($S.settings.key__iSpeech) +
            '&action=' + encodeURIComponent(_action)        +
            '&voice=' + encodeURIComponent($S.speech__voice) +
            '&speed=' + encodeURIComponent($S.speeds[$S.speech__speed]) +
            '&format=mp3'                                   +
            '&e=.mp3'                                       +
            '&text=' + encodeURIComponent(_text)            +
        '';
    };

//  create request }


//  speeds {
//  ========

    (function ()
    {
        //  font sizes already set
        if ($S.speeds) { return true; } 
        
        //  set font sizes
        $S.speeds = {
            'fastest':   4,
            'fast':      2,
            'faster':    1,
            'normal':    0,
            'slower':   -1,
            'slow':     -2,
            'slowest':  -4
        };
        
        return true;
    })();

//  speeds }


//  voices {
//  ========

    (function ()
    {
        //  font sizes already set
        if ($S.voices) { return true; } 
        
        //  set font sizes
        $S.voices = {
        
            /* supported */
            'en':       { 'f': 'usenglishfemale',       'm': 'usenglishmale',       'd': 'f',   'n': 'English'              },
            'ja':       { 'f': 'jpjapanesefemale',      'm': 'jpjapanesemale',      'd': 'f',   'n': 'Japanese'             },
            'es':       { 'f': 'eurspanishfemale',      'm': 'eurspanishmale',      'd': 'f',   'n': 'Spanish'              },
            'fr':       { 'f': 'eurfrenchfemale',       'm': 'eurfrenchmale',       'd': 'f',   'n': 'French'               },
            'de':       { 'f': 'eurgermanfemale',       'm': 'eurgermanmale',       'd': 'f',   'n': 'German'               },
            'zh-cn':    { 'f': 'chchinesefemale',       'm': 'chchinesemale',       'd': 'f',   'n': 'Chinese'              },
            'ko':       { 'f': 'krkoreanfemale',        'm': 'krkoreanmale',        'd': 'f',   'n': 'Korean'               },
            'ar':       { 'm': 'arabicmale',                                        'd': 'm',   'n': 'Arabic'               },
            'cs':       { 'f': 'eurczechfemale',                                    'd': 'f',   'n': 'Czech'                },
            'da':       { 'f': 'eurdanishfemale',                                   'd': 'f',   'n': 'Danish'               },
            'nl':       { 'f': 'eurdutchfemale',                                    'd': 'f',   'n': 'Dutch'                },
            'fi':       { 'f': 'eurfinnishfemale',                                  'd': 'f',   'n': 'Finnish'              },
            'el':       { 'f': 'eurgreekfemale',                                    'd': 'f',   'n': 'Greek'                },
            'hu':       { 'f': 'huhungarianfemale',                                 'd': 'f',   'n': 'Hungarian'            },
            'it':       { 'f': 'euritalianfemale',      'm': 'euritalianmale',      'd': 'f',   'n': 'Italian'              },
            'no':       { 'f': 'eurnorwegianfemale',                                'd': 'f',   'n': 'Norwegian'            },
            'pl':       { 'f': 'eurpolishfemale',                                   'd': 'f',   'n': 'Polish'               },
            'pt':       { 'f': 'eurportuguesefemale',   'm': 'eurportuguesemale',   'd': 'f',   'n': 'Portugese'            },
            'ru':       { 'f': 'rurussianfemale',       'm': 'rurussianmale',       'd': 'f',   'n': 'Russian'              },
            'sv':       { 'f': 'swswedishfemale',                                   'd': 'f',   'n': 'Sweedish'             },
            'tr':       { 'f': 'eurturkishfemale',      'm': 'eurturkishmale',      'd': 'f',   'n': 'Turkish'              },
    
            /* plus */
            'ca':       { 'f': 'eurcatalanfemale',                                  'd': 'f',   'n': 'Catalan',                 'u': true   },
            'zh-tw':    { 'f': 'twchinesefemale',                                   'd': 'f',   'n': 'Chinese (Traditional)',   'u': true   },
    
            /* variants we don't currently use */
            'zh-hk':    { 'f': 'hkchinesefemale',                                   'd': 'f',   'n': 'Hong Kong',               'u': true   },

            'en-uk':    { 'f': 'ukenglishfemale',       'm': 'ukenglishmale',       'd': 'f',   'n': 'English (Britain)',       'u': true   },
            'en-au':    { 'f': 'auenglishfemale',                                   'd': 'f',   'n': 'English (Australia)',     'u': true   },
            'en-ca':    { 'f': 'caenglishfemale',                                   'd': 'f',   'n': 'English (Canada)',        'u': true   },
    
            'fr-ca':    { 'f': 'cafrenchfemale',        'm': 'cafrenchmale',        'd': 'f',   'n': 'French (Canada)',         'u': true   },

            'pt-br':    { 'f': 'brportuguesefemale',                                'd': 'f',   'n': 'Portugese (Brazil)',      'u': true   }
        
        };
        
        return true;
    })();

//  voices }


//  state {
//  =======
    
    $S.changeStateTo = function (_state)
    {
        //  no change
        if ($S.state == _state) { return; }
        
        //  change
        var _old_state = $S.state;
        $S.state = _state;
        
        //  callback
        if ($S.callbacks && $S.callbacks.stateChanged) { $S.callbacks.stateChanged(_state, _old_state); }
    };
    
//  state }


//  helpers {
//  =========

    $S.speech__highlightFirstWordInFragment = function (_page_nr, _fragment_nr)
    {
        var _$partials = $($S.speech__pages[_page_nr-1]).find('em.'+$S.settings.duplicateContentFragmentCSSClass+'['+$S.settings.duplicateContentFragmentIdAttribtue+'="page_'+_page_nr+'__fragment_'+_fragment_nr+'"]'),
            _first = false,
            _first_html = '';
        
        //  get first
        _$partials.each(function (_i, _e)
        {
            //  get
            _first_html = _e.innerHTML;
            _first_html = _first_html.replace(($S.settings.textLanguage == 'cjk' ? (/(\S)/i) : (/(\S+)(\s)/i)), '<em id="'+$S.settings.nowSpeakingId+'"><span>$1</span></em> ');
            
            //  replaced anything? if no, continue
            if (_first_html.indexOf('<em id="'+$S.settings.nowSpeakingId+'">') > -1) {}else { return true; }
                
            //  set; end
            _first = _e;
            return false;
        });
        
        //  valid first?
        if (_first) {}else { return; }
        
        //  write
        _first.innerHTML = _first_html;
    };

    $S.speech__clearCurrentNowSpeaking = function ()
    {
        //  get; check
        var _prevNowSpeaking = $S.document.getElementById($S.settings.nowSpeakingId);
        if (_prevNowSpeaking) {}else { return; }

        //  delete
        _prevNowSpeaking.parentNode.replaceChild(_prevNowSpeaking.firstChild.firstChild, _prevNowSpeaking);
    };

//  helpers }


//  insert {
//  ========

    $S.insertAudioElementsContainer = function ()
    {
        //  create
        var _element = $S.document.createElement('div');
        _element.setAttribute('id', $S.settings.onInsertAudioElementsContainerUseThisId);

        //  insert        
        $S.document.getElementsByTagName('body')[0].appendChild(_element);
        
        //  reference
        $S.$audioElementsContainer = $S.$document.find('#'+$S.settings.onInsertAudioElementsContainerUseThisId);
    };

    $S.insertCSS = function ()
    {
        var _cssText = ''                                       +
            '/'+'* original page *'+'/ '                        +
            'div.'+$S.settings.originalPageCSSClass+' { '       +
            '   position: relative !important; '                +
            '} '                                                +

            '/'+'* duplicate content *'+'/ '                    +
            'div.'+$S.settings.duplicateContentCSSClass+' { '   +
            '   position: absolute !important; top: 0 !important; left: 0 !important; ' +
            '   width: 100% !important; height: 100% !important; ' +
            '   visibility: hidden !important; '                +
          //'   visibility: visible !important; left: 600px !important; background-color: rgba(0, 0, 0, 0.1) !important; ' +
            '} '                                                +

            '/'+'* now speaking *'+'/ '                         +
            '#'+$S.settings.nowSpeakingId+' { '                 +
            '   font-style: inherit !important; font-weight: inherit !important; ' +
            '   visibility: visible !important; '               +
            '   position: relative !important; '                +
            '} '                                                +

            '/'+'* now speaking text *'+'/ '                    +
            '#'+$S.settings.nowSpeakingId+' span { '            +
            '   position: relative !important; '                +
            '   z-index: 100; '                                 +
            '   color: '+($S.settings.nowSpeakingForegroundColor == '[none]' ? 'inherit' : $S.settings.nowSpeakingForegroundColor)+'; ' +
            '} '                                                +

            '/'+'* now speaking background *'+'/ '              +
            '#'+$S.settings.nowSpeakingId+':before { '          +
            '   content: " "; display: block; '                 +
            '   position: absolute; left: -0.2em; top: -0.1em; '+
            '   width: 100%; height: 100%; '                    +
            '   visibility: visible !important; z-index: 10; '  +
            '   padding: 0.1em 0.25em 0.1em 0.2em; '            +
            '   border-radius: 0.25em; '                        +
            '   width: 100%; height: 100%; '                    +
            '   background-color: '+($S.settings.nowSpeakingBackgroundColor == '[none]' ? 'inherit' : $S.settings.nowSpeakingBackgroundColor)+'; ' +
            '   opacity: '+($S.settings.nowSpeakingBackgroundOpacity == '[none]' ? 'inherit' : $S.settings.nowSpeakingBackgroundOpacity)+'; ' +
            '} '                                                +

            '/'+'* speech fragments *'+'/ '                          +
            'em.'+$S.settings.duplicateContentFragmentCSSClass+' { ' +
            '   font-style: inherit !important; font-weight: inherit !important; ' +
            '} '                                                     +

            '/'+'* former now-speaking *'+'/ '                      +
            'em.'+$S.settings.nowSpeakingLeftBehindCSSClass+' { '   +
            '   font-style: inherit !important; font-weight: inherit !important; ' +
            '} '                                                    +
            
            '/'+'* highlighted in original content *'+'/ '      +
            'em.'+$H.settings.highlightElementCSSClass+' { '    +
            '   font-style: inherit !important; font-weight: inherit !important; ' +
            '} '                                                +

            '/'+'* audio elements container *'+'/ '                  +
            '#'+$S.settings.onInsertAudioElementsContainerUseThisId+' { ' +
            '   position: absolute !important; '                     +
            '   top: -1000px !important; left: -1000px !important; ' +
            '   width: 5px !important; height: 5px !important; '     +
            '} '                                                     +
        '';

        //  create
        var _cssElement = $S.document.createElement('style');
        _cssElement.setAttribute('id', $S.settings.onInsertCSSUseThisId);
        _cssElement.setAttribute('type', 'text/css');
        if (_cssElement.styleSheet) { _cssElement.styleSheet.cssText = _cssText; }
            else { _cssElement.appendChild($S.document.createTextNode(_cssText)); }
        
        //  append
        $S.$document.find('head').append(_cssElement);
    };
        
//  insert }


//  create/reset audio.js {
//  =======================

    $S.speech__createAudioElements = function ()
    {
        //  create elements; use new scope to preserve index
        for (var _i=1; _i<=$S.settings.instancesNr; _i++) { (function (_ii) { $A.create(_ii); })(_i); }
        
        //  also reset
        $S.speech__resetAudioElements();
        $S.speech__resetAudioPosition();
    };

    $S.speech__resetAudioElements = function ()
    {
        //  create elements; use new scope to preserve index
        for (var _i=1; _i<=$S.settings.instancesNr; _i++) { (function (_ii) { $S.speech__resetAudioElements__setInstanceToNull(_ii); })(_i); }
    };

    $S.speech__resetAudioElements__setInstanceToNull = function (_instanceIndex)
    {
        //  instance
        var _instance = $S.speech__instances['instance_'+_instanceIndex];
        
        //  reset
        _instance['url__markers'] = false;
        _instance['url__audio'] = false;
        _instance['loaded__markers'] = false;
        _instance['loaded__audio'] = false;
        _instance['played'] = false;
        _instance['playing'] = false;
        _instance['markers'] = false;
        _instance['fragmentPartials__elements'] = [];
        _instance['fragmentPartials__text'] = [];
        _instance['pos__page'] = false;
        _instance['pos__fragmentInPage'] = false;
        _instance['errorCount__audio'] = 0;
        _instance['errorCount__markers'] = 0;
        _instance['errorCount__play'] = 0;
        _instance['skip'] = false;
    };

    $S.speech__resetAudioPosition = function ()
    {
        $S.speech__posSpeaking__instance = 1;
        $S.speech__posSpeaking__page = 1;
        $S.speech__posSpeaking__fragmentInPage = 1;

        $S.speech__posSpeaking__marker = 1;
        $S.speech__posSpeaking__partialElement = 1;
        $S.speech__posSpeaking__partialElement__index = 1;
    
        $S.speech__posLoading__page = 1;
        $S.speech__posLoading__fragmentInPage = 1;
    };

//  create/reset audio.js }


//  load {
//  ======

    $S.speech__loadAllInstances = function (_callback)
    {
        $S.speech__loadOneInstanceAndThenSomeMore(1, ($S.settings.instancesNr-1), _callback);
    };

    $S.speech__loadOneInstanceAndThenSomeMore = function (_instanceIndex, _how_many_more, _final_callback)
    {
        //  do final callback; end
        if (_how_many_more < 0) { _final_callback(); return; }

        //  check function
        var _check = function ()
        {
            //  the instance
            var _i = $S.speech__instances['instance_'+_instanceIndex];
        
            //  do next instance
            if (_i['loaded__markers'] && _i['loaded__audio'])
            {
                $S.speech__loadOneInstanceAndThenSomeMore($S.speech__getInstanceIndex__next(_instanceIndex), (_how_many_more - 1), _final_callback);
                return;
            }
            
            //  check again
            $S.window.setTimeout(_check, 250);
        };
    
        //  load
        $S.speech__loadInstanceWithFragmentAndThen(
            _instanceIndex,
            $S.speech__posLoading__page,
            $S.speech__posLoading__fragmentInPage,
            function () {
                $S.speech__posLoadingIncrement();
                $S.window.setTimeout(_check, 250);
            });
    };

    $S.speech__posLoadingIncrement = function ()
    {
        //  increment fragments
        $S.speech__posLoading__fragmentInPage++;
    
        //  end of page?
        if ($S.speech__posLoading__fragmentInPage > $S.speech__fragmentsPerPage['page_' + $S.speech__posLoading__page])
        {
            //  last page?
            if ($S.speech__posLoading__page < $S.speech__pages.length) {
                $S.speech__posLoading__page++;
                $S.speech__posLoading__fragmentInPage = 1;
            }
            else {
                $S.speech__posLoading__page = $S.speech__pages.length;
                $S.speech__posLoading__fragmentInPage = $S.speech__fragmentsPerPage['page_' + $S.speech__posLoading__page];
            }
        }
    };

    $S.speech__posLoadingDecrement = function ()
    {
        //  decrement loaded fragments
        $S.speech__posLoading__fragmentInPage--;
    
        //  start of page?
        if ($S.speech__posLoading__fragmentInPage > 1) {}else
        {
            //  first page?
            if ($S.speech__posLoading__page > 1) {
                $S.speech__posLoading__page--;
                $S.speech__posLoading__fragmentInPage = $S.speech__fragmentsPerPage['page_' + $S.speech__posLoading__page];
            }
            else {
                $S.speech__posLoading__fragmentInPage = 1;
                $S.speech__posLoading__page = 1;
            }
        }
    };

    $S.speech__loadInstanceWithFragmentAndThen = function (_instanceIndex, _page_nr, _fragment_nr, _and_then) { $S.window.setTimeout(function ()
    {
        //  the instance we're using
        var _instance = $S.speech__instances['instance_' + _instanceIndex];

        //  nullify instance
        $S.speech__resetAudioElements__setInstanceToNull(_instanceIndex);                    
        _instance['markers'] = [false];
        _instance['fragmentPartials__elements'] = [false];
        _instance['fragmentPartials__text'] = [false];
    
        //  the fragment    
        _instance['pos__page'] = _page_nr;
        _instance['pos__fragmentInPage'] = _fragment_nr; 
    
        //  partials for this fragment
        var _$partials = $($S.speech__pages[_page_nr-1].childNodes[1]).find('em.'+$S.settings.duplicateContentFragmentCSSClass+'['+$S.settings.duplicateContentFragmentIdAttribtue+'="page_'+_page_nr+'__fragment_'+_fragment_nr+'"]');
    
        //  loop through partials to get text
        var _text_to_speak = '';
        _$partials.each(function (_i, _e)
        {
            //  get text
            var _e_text = _e.innerHTML.replace('&nbsp;', ' ');
        
            //  blank
            switch (true) {
                case (_e_text == ''):                             _text_to_speak += '';  return; break;
                case (_e_text.match(/^\s+$/gi) != null):          _text_to_speak += ' '; return; break;
                case (_e_text.match(/^\[[0-9]+?\]$/gi) != null):  _text_to_speak += ' '; return; break;     //  link footnotes
            }
        
            //  add element
            _instance['fragmentPartials__elements'].push(_e);
            
            //  add element text
            _instance['fragmentPartials__text'].push(_e_text);
            
            //  full text
            _text_to_speak += _e_text + ' ';
        });

        //  format text
        _text_to_speak = _text_to_speak.replace(/^\s+/gi, '');
        _text_to_speak = _text_to_speak.replace(/\s+$/gi, '');
        _text_to_speak = _text_to_speak.replace(/[\n\r\t]+/gi, ' ');
        //_text_to_speak = _text_to_speak.replace(/ ([.?!])/gi, '$1');
        //_text_to_speak = _text_to_speak.replace(/ 's /gi, '\'s ');

        //  urls
        _instance['url__markers'] = $S.createRequestURL('markers', _text_to_speak);
        _instance['url__audio'] = $S.createRequestURL('convert', _text_to_speak);

        //  skip?
        if (_text_to_speak.match(/^\s*$/gi) != null)
        {
            _instance['loaded__markers'] = true;
            _instance['loaded__audio'] = true;
            _instance['skip'] = true;
        }
        else
        {
            //  load audio
            $A.load(_instanceIndex);
            
            //  load markers
            $S.speech__loadInstanceWithMarkers(_instanceIndex);
        }
    
        //  and then
        _and_then();
    }, 1); };

    $S.speech__loadInstanceWithMarkers = function (_instanceIndex)
    {
        //  ths instance we're using
        var _instance = $S.speech__instances['instance_' + _instanceIndex];

        //  ajax do
        $.ajax(_instance['url__markers'], {
            'cache': false,
            'error': function (_xhr, _status, _error) { $S.speech__loadError__markers(_instanceIndex); },
            'success': function(_data, _status, _xhr) { $S.speech__loadInstanceWithMarkers__loaded(_data, _status, _xhr, _instanceIndex, _instance); }
        });
    };

    $S.speech__loadInstanceWithMarkers__loaded = function (_data, _status, _xhr, _instanceIndex, _instance)
    {
        //  invalid?
        switch (true)
        {
            case (!(_data)):
            case (!(_data.childNodes)):
            case (!(_data.childNodes[0])):
            case (!(_data.childNodes[0].childNodes)):
                $S.speech__loadError__markers(_instanceIndex);
                return;
        }
        
        //  parse markers
        for (var _d=_data.childNodes[0], _i=0, _ii=_d.childNodes.length; _i<_ii; _i++)
        {
            //  this node
            var _n = _d.childNodes[_i];
        
            //  skip not-words
            if (_n.nodeName == 'word') {}else { continue; }
            
            //  a word
            _instance['markers'].push({
                'start':    parseInt(_n.childNodes[0].textContent, 10),
                'end':      parseInt(_n.childNodes[1].textContent, 10),
                'length':   parseInt(_n.childNodes[3].textContent, 10),
                'text':     _n.childNodes[4].textContent
            });
        }
            
        //  set loaded
        _instance['loaded__markers'] = true;
    };

//  load }


//  events {
//  ========

    $S.speech__instanceEvent__loadProgress = function (_instanceIndex, _percentLoaded)
    {
        //  loading
        if (_percentLoaded < 90) { return; }
        
        //  instance
        var _instance = $S.speech__instances['instance_' + _instanceIndex];
    
        //  already loaded
        if (_instance['loaded__audio']) { return; }
    
        //  loaded
        _instance['loaded__audio'] = true;
    };

    $S.speech__instanceEvent__playProgress = function (_instanceIndex, _playedToThisTime)
    {
        //  played > 0
        if (_playedToThisTime > 0) {}else { return; }

        //  vars
        var _playedToThisTimeDelayed = _playedToThisTime,
            _instance = $S.speech__instances['instance_' + _instanceIndex],
            _playingNewInstance = false;
        
        //  not loaded    
        if (_instance['loaded__audio']) {}else { return; }
        if (_instance['playing']) {}else { return; }
        
        //  playing new instance
        if ((_instanceIndex != $S.speech__posSpeaking__instance) && !(_instance['played']))
        {
            _playingNewInstance = true;
            _instance['played'] = true;
            
            //  _instanceIndex is the instance now playing
            //  $S.speech__posSpeaking__instance is the instance that was playing
        
            //  load new stuff into old instance
            $S.speech__loadInstanceWithFragmentAndThen(
                $S.speech__posSpeaking__instance,
                $S.speech__posLoading__page,
                $S.speech__posLoading__fragmentInPage,
                function () { $S.speech__posLoadingIncrement(); });
                    
            //  update playing
            $S.speech__posSpeaking__instance = _instanceIndex;
            $S.speech__posSpeaking__page = _instance['pos__page'];
            $S.speech__posSpeaking__fragmentInPage = _instance['pos__fragmentInPage'];
            $S.speech__posSpeaking__marker = 1;
            $S.speech__posSpeaking__partialElement = 1;
            $S.speech__posSpeaking__partialElement__index = 1;
        }
        
        //  very first play of very first fragment/instance
        if (_playingNewInstance) {}else {
            if ((_instance['pos__page'] == 1) && (_instance['pos__fragmentInPage'] == 1)) {
                _playingNewInstance = true;
            }
        }
        
        //  highlight spoken word
        var _marker_word = false;
        for (var _marker_i=$S.speech__posSpeaking__marker; _marker_i<_instance['markers'].length; _marker_i++)
        {
            if ((_instance['markers'][_marker_i].end >= _playedToThisTimeDelayed) && (_instance['markers'][_marker_i].start <= _playedToThisTimeDelayed))
            {
                //  same word
                if ((!_playingNewInstance) && (_marker_i == $S.speech__posSpeaking__marker)) { break; }
        
                //  different word
                _marker_word = _instance['markers'][_marker_i].text;
                $S.speech__posSpeaking__marker = _marker_i;
                break;
            }
        }
        
        //  leave currently marked word alone
        if (_marker_word == false) { return; }
        
        //  mark another word
        for (var _element_i=$S.speech__posSpeaking__partialElement; _element_i<_instance['fragmentPartials__elements'].length; _element_i++)
        {
            //  find word
            var _pos_index = _instance['fragmentPartials__text'][_element_i].indexOf(_marker_word, ((_element_i == $S.speech__posSpeaking__partialElement) ? ($S.speech__posSpeaking__partialElement__index-1) : 0));
            if (_pos_index > -1)
            {
                $S.speech__posSpeaking__partialElement = _element_i;
                $S.speech__posSpeaking__partialElement__index = (_pos_index + _marker_word.length);
                break;
            }
        
            //  redraw element -- only after we've passed it
            _instance['fragmentPartials__elements'][_element_i].innerHTML = _instance['fragmentPartials__text'][_element_i];
        }
            
        //  make sure it's gone
        $S.$document.find($S.settings.nowSpeakingId).addClass($S.settings.nowSpeakingLeftBehindCSSClass).attr('id', '');
            
        //  redraw this element
        _instance['fragmentPartials__elements'][$S.speech__posSpeaking__partialElement].innerHTML = ''  +
            _instance['fragmentPartials__text'][$S.speech__posSpeaking__partialElement].substr(0, ($S.speech__posSpeaking__partialElement__index - _marker_word.length)) +
            '<em id="'+$S.settings.nowSpeakingId+'">'                                                              +
                '<span>' + _marker_word + '</span>'                                                     +
            '</em>'                                                                                     +
            _instance['fragmentPartials__text'][$S.speech__posSpeaking__partialElement].substr(($S.speech__posSpeaking__partialElement__index - 0)) +
        '';
    };

    $S.speech__instanceEvent__playEnd = function (_instanceIndex)
    {
        //  this instance
        var _instance = $S.speech__instances['instance_' + _instanceIndex];

        //  redraw last element
        if (_instance['fragmentPartials__elements'][$S.speech__posSpeaking__partialElement])
            { _instance['fragmentPartials__elements'][$S.speech__posSpeaking__partialElement].innerHTML = _instance['fragmentPartials__text'][$S.speech__posSpeaking__partialElement]; }

        //  stop this instance
        _instance['playing'] = false;
        
        //  last instance
        if ((_instance['pos__page'] == $S.speech__pages.length) && (_instance['pos__fragmentInPage'] == $S.speech__fragmentsPerPage['page_' + _instance['pos__page']]))
        {
            $S.changeStateTo('paused');
            $S.speech__onEndPlaying();
            return;
        }
        
        //  next instance
        var _next_instance_index = $S.speech__getInstanceIndex__next(_instanceIndex),
            _next_instance = $S.speech__instances['instance_' + _next_instance_index];
        
        //  already started
        if (_next_instance['playing']) { return; }
            
        //  play next -- everything else gets handled at the begining of updatePlayhead, in the next instance
        $S.speech__tryToPlayInstance(_next_instance_index);
    };

//  events }


//  errors {
//  ========

    $S.speech__loadError__audio = function (_instanceIndex)
    {
        $S.log('error: audio', _instanceIndex, $S.speech__instances['instance_'+_instanceIndex]);
    
        //  the instance we're using
        var _instance = $S.speech__instances['instance_' + _instanceIndex];

        //  increment count
        _instance['errorCount__audio']++;
        
        //  stop?
        if (_instance['errorCount__audio'] > $S.speech__errorsMax__loadAudio) { return; }
        
        //  try again
        $A.load(_instanceIndex);
    };

    $S.speech__loadError__markers = function (_instanceIndex)
    {
        $S.log('error: markers', _instanceIndex, $S.speech__instances['instance_'+_instanceIndex]);
    
        //  the instance we're using
        var _instance = $S.speech__instances['instance_' + _instanceIndex];

        //  increment count
        _instance['errorCount__markers']++;
        
        //  stop?
        if (_instance['errorCount__markers'] > $S.speech__errorsMax__loadMarkers) { return; }
        
        //  try again
        $S.speech__loadInstanceWithMarkers(_instanceIndex);
    };

//  errors }


//  try play {
//  ==========

    $S.speech__tryToPlayInstance = function (_instanceIndex)
    {
        //  the instance we're using
        var _instance = $S.speech__instances['instance_' + _instanceIndex];

        //  skip
        if (_instance['skip']) { $S.speech__instanceEvent__playEnd(_instanceIndex); return; }
        
        //  is ready; start playing
        if (_instance['loaded__audio'] && _instance['loaded__markers'])
        {
            _instance['playing'] = true;
            $A.play(_instanceIndex);
            return;
        }

        //  not ready
        //  =========
    
            $S.log('error: play', _instanceIndex, $S.speech__instances['instance_'+_instanceIndex]);

            //  increment count
            _instance['errorCount__play']++;
                
            //  stop? skip to next
            if (_instance['errorCount__play'] > $S.speech__errorsMax__tryToPlay) { $S.speech__instanceEvent__playEnd(_instanceIndex); return; }
        
            //  try again, in a little bit
            $S.window.setTimeout(function () { $S.speech__tryToPlayInstance(_instanceIndex); }, 250);
    };

//  try play }


//  actions {
//  =========

    $S.speech__detectLanguageAndCallback = function (_callback)
    {
        //  loading
        $S.changeStateTo('loading');

        //  text for language detection
        var _text = '', _p_text = '';
        
        //  from all pages
        for (var _ii=$S.speech__pages.length, _i=0; _i<_ii; _i++)
        {
            //  get
            _p_text = $S.speech__pages[_i].innerHTML;

            //  remove html
            _p_text = _p_text.replace(/<([^>]+?)>/gi, '');
            _p_text = _p_text.replace(/([ \n\r\t]+)/gi, ' ');
            
            //  add
            _text += ' ' + _p_text;
        }
            
        //  shorten
        _text = _text.substr(0, ($S.settings.textLanguage == 'cjk' ? 150 : 300));
            
        //  url
        var _url = 'https://www.googleapis.com/language/translate/v2/detect?key=[=key]&q=[=text]';
            _url = _url.replace('[=key]', encodeURIComponent($S.settings.key__googleTranslate));
            _url = _url.replace('[=text]', encodeURIComponent(_text));
            
        //  submit
        $.ajax({
            'url' : _url,

            'dataType' : 'jsonp',
            'async' : true,
            'timeout': (3 * 1000),
            
            'success' : function (_response, _textStatus, _xhr) { $S.speech__detectLanguageAndCallback__withLanguage(_response, _callback); },
            'error' :   function (_xhr, _textStatus, _error)    { $S.speech__detectLanguageAndCallback__withoutLanguage(_callback); }
        });
    };

    $S.speech__detectLanguageAndCallback__withoutLanguage = function ()
    {
        $S.changeStateTo('none');
        if ($S.settings.callbacks && $S.settings.callbacks.languageNotDetected) { $S.settings.callbacks.languageNotDetected(); }
    };
    
    $S.speech__detectLanguageAndCallback__withLanguage = function (_detected_language_result, _callback)
    {
        //  result
        var _r = _detected_language_result;
    
        //  language invalid? if so, return
        if (_r && _r.data && _r.data.detections && _r.data.detections[0] && _r.data.detections[0][0] && _r.data.detections[0][0].language) {}else { $S.speech__detectLanguageAndCallback__withoutLanguage(); return; }
        
        //  got it
        $S.speech__language = _r.data.detections[0][0].language;
            
        //  voice invalid? if so, return
        if ($S.voices[$S.speech__language]) {}else { $S.speech__detectLanguageAndCallback__withoutLanguage(); return; }

        //  select gender
        var _v = $S.voices[$S.speech__language];
        switch (true)
        {
            case (($S.settings.gender == 'male') && ('m' in _v)):    $S.speech__voice = _v.m; break;
            case (($S.settings.gender == 'female') && ('f' in _v)):  $S.speech__voice = _v.f; break;
            default:                                                 $S.speech__voice = _v[_v.d]; break;
        }
            
        //  callback
        if (_callback) { _callback(); }
    };
    
    $S.speech__doPlay = function ()
    {
        //  loading
        $S.changeStateTo('loading');

        //  clear previous nowSpeaking
        $S.speech__clearCurrentNowSpeaking();
            
        //  reset all instances
        $S.speech__resetAudioElements();
            
        //  load up all instances
        $S.speech__loadAllInstances(function ()
        {
            //  playing
            $S.changeStateTo('playing');
            
            //  reset position
            $S.speech__posSpeaking__instance = 1;
            $S.speech__posSpeaking__marker = 1;
            $S.speech__posSpeaking__partialElement = 1;
            $S.speech__posSpeaking__partialElement__index = 1;

            //  start playing
            $S.speech__tryToPlayInstance(1);
            $S.speech__onStartPlaying();
        });
    };
    
    $S.speech__doPause = function ()
    {
        //  already paused
        if ($S.state == 'playing') {}else { return false; }
            
        //  actually pause
        $A.pause($S.speech__posSpeaking__instance);
        
        //  switch buttons
        $S.changeStateTo('paused');
            
        //  update for next play
        $S.speech__posLoading__page = $S.speech__posSpeaking__page;
        $S.speech__posLoading__fragmentInPage = $S.speech__posSpeaking__fragmentInPage;
            
        //  end
        $S.speech__onEndPlaying();
        
        return true;
    };
    
    $S.speech__doForward = function ()
    {
        //  doing something; return
        if ($S.state == 'loading') { return; }
    
        //  do pause
        var _didPause = $S.speech__doPause();
        var _time = (_didPause ? 500 : 50);
        
        //  do
        $S.window.setTimeout(function ()
        {
            //  clear
            $S.speech__clearCurrentNowSpeaking();
        
            //  get next fragment
            $S.speech__posLoadingIncrement();
        
            //  highlight first word in next fragment
            $S.speech__highlightFirstWordInFragment($S.speech__posLoading__page, $S.speech__posLoading__fragmentInPage);
            
            //  auto scroll
            $S.speech__doAutoScroll(true);
        }, _time);
    };
    
    $S.speech__doRewind = function ()
    {
        //  doing something; return
        if ($S.state == 'loading') { return; }
            
        //  do pause
        var _didPause = $S.speech__doPause();
        var _time = (_didPause ? 500 : 50);
        
        //  do
        $S.window.setTimeout(function ()
        {
            //  clear
            $S.speech__clearCurrentNowSpeaking();

            //  get previous fragment
            $S.speech__posLoadingDecrement();
            
            //  highlight first word in previous fragment
            $S.speech__highlightFirstWordInFragment($S.speech__posLoading__page, $S.speech__posLoading__fragmentInPage);

            //  auto scroll
            $S.speech__doAutoScroll(true);
        }, _time);
    };

    $S.speech__recordMouseAction = function ()
    {
        $S.speech__lastMouseAction = (new Date()).getTime();
    };
    
    $S.speech__doAutoScroll = function (_skip_mouse_check)
    {
        //  mouse moved in last 10s
        if (_skip_mouse_check) {}else { if ($S.speech__lastMouseAction && (((new Date()).getTime() - $S.speech__lastMouseAction) < 3000)) { return; } }
            
        //  data
        var _offset = $S.$document.find('#'+$S.settings.nowSpeakingId).offset(),
            _posTop = ((_offset && _offset.top && _offset.left) ? _offset.top : -1),
            _scroll = $S.$window.scrollTop(),
            _height = $S.$window.height();
        
        //  invalid
        if (_posTop < 0) { return; }
        
        //  no need for scrolling
        if ((_posTop - _scroll) > (_height * 0.20) && (_posTop - _scroll) < (_height * 0.80)) { return; }

        //  scroll
        $S.$document.find('html, body').animate({ 'scrollTop': Math.floor(_posTop - (_height * 0.20))+'px' }, 500);
    };

    $S.speech__onStartPlaying = function ()
    {
        $S.speech__doAutoScrollTimer = $S.window.setInterval(function () { $S.speech__doAutoScroll(); }, 5000);
        $S.$document.bind('mousemove', $S.speech__recordMouseAction);
    };
    
    $S.speech__onEndPlaying = function ()
    {
        $S.window.clearInterval($S.speech__doAutoScrollTimer);
        $S.$document.unbind('mousemove', $S.speech__recordMouseAction);
    };        

//  actions }


//  add page {
//  ==========
    
    $S.addPage = function (_page)
    {
        //  not valid
        //  =========
            switch (true)
            {
                case (!(_page.tagName)):
                case (!(_page.tagName.toLowerCase() == 'div')):
                case (!(_page.className)):
                case (!(_page.className == $S.settings.originalPageCSSClass)):
                case (!(_page.firstChild)):
                case (!(_page.firstChild.tagName)):
                case (!(_page.firstChild.tagName.toLowerCase() == 'div')):
                    return false;
            }

        //  vars
        //  ====
            var _page_nr = ($S.speech__pages.length+1),
                _duplicate_html = _page.firstChild.innerHTML;

        //  add
        //  ===
            $S.speech__pages[_page_nr-1] = _page;

        //  protect stuff
        //  =============
        
            var _protect_stuff = [],
                _protect_stuff__fn = function (_m) {
                    _protect_stuff.push(_m);
                    return '[[='+(_protect_stuff.length-1)+']]'; 
                };

            //  protect tags
            _duplicate_html = _duplicate_html.replace(/<[^>]+>/gi, _protect_stuff__fn);
            
            //  abreviations
            _duplicate_html = _duplicate_html.replace(/(Mr|Ms|Mrs|Sr|Jr)[.]/gi, _protect_stuff__fn);

            //  acronyms & initials
            _duplicate_html = _duplicate_html.replace(/[ ]([a-z][.]){1,5}/gi, _protect_stuff__fn);
                
            //  extensions
            _duplicate_html = _duplicate_html.replace(/[.](com|net|org|[a-z]{3})/gi, _protect_stuff__fn);
            
            //  ellipsis -- protect two out of the three dots
            _duplicate_html = _duplicate_html.replace(/[.][.]/gi, _protect_stuff__fn);

        //  add absolute start
        //  ==================
            _duplicate_html = _duplicate_html.replace(/([^0-9\s\[\=\]])/i, '<separator>$1</separator>');
            
        //  add separators
        //  ==============
        
            //  per sentence
            _duplicate_html = _duplicate_html.replace(/([.?!])/gi, '<separator>$1</separator>');
            _duplicate_html = _duplicate_html.replace(/([\u3000\u3001\u3002])/gi, '<separator>$1</separator>');
            
            //  remove short sentences -- run twice
            for (var _i_ss=0; _i_ss<2; _i_ss++) {
                _duplicate_html = _duplicate_html.replace(/(<separator>.<\/separator>)([\s\S]+?)<separator>(.)<\/separator>/gi, function (_whole, _first_separator, _string_between_separators, _second_separator_character) { return ((_string_between_separators.length > 50) ? _whole : (_first_separator + _string_between_separators + _second_separator_character)); });
            }

        //  add absolute end
        //  ================
            _duplicate_html += '<separator>&nbsp;</separator>';

        //  add proper separator tag
        //  ========================
            _duplicate_html = _duplicate_html.replace(/<separator>([\S])<\/separator>/gi, '<'+$S.settings.fragmentSeparatorTag+' class="'+$S.settings.fragmentSeparatorCSSClass+'">$1</'+$S.settings.fragmentSeparatorTag+'>');
            _duplicate_html = _duplicate_html.replace(/<separator>[\s]*<\/separator>/gi, '');

        //  put protected stuff back
        //  ========================
            _duplicate_html = _duplicate_html.replace(/\[\[=([0-9]+)\]\]/gi, function (_m, _i) { return _protect_stuff[Math.floor(_i)]; });
            
        //  add separators before <br><br>
        //  ==============================
            _duplicate_html = _duplicate_html.replace(/([a-z0-9])([\s\n\r\t]*?)<br(\s*)([\/]?)><br(\s*)([\/]?)>/gi, '$1$2<'+$S.settings.fragmentSeparatorTag+' class="'+$S.settings.fragmentSeparatorCSSClass+'">&nbsp;</'+$S.settings.fragmentSeparatorTag+'><br /><br />');
            
        //  add duplicate element
        //  =====================
            var _duplicate_element = $S.document.createElement('div');
                _duplicate_element.className = $S.settings.duplicateContentCSSClass;
                _duplicate_element.innerHTML = _duplicate_html;
            _page.appendChild(_duplicate_element);
            
        //  jquery-fy
        //  =========
            var _$duplicate_element = $(_duplicate_element);
            
        //  add separators to end of headers
        //  ================================
            _$duplicate_element.find('h6, h5, h4, h3, h2, h1').each(function (_i, _e)
            {
                //  vars
                var _h_html = $(_e).html(),
                    _h_protected_stuff = [],
                    _h_text = _h_html.replace(/(<[^>]+>)/gi, '');
                
                //  ends in punctuation already
                if (_h_text.match(/([.?!])\s*$/gi) != null) { return; }

                //  protect tags -- use |
                _h_html = _h_html.replace(/(<[^>]+>)/gi, function (_m)
                {
                    _h_protected_stuff.push(_m);
                    
                    var _h_protected_stuff_key = '';
                    for (var _i=0, _ii=_h_protected_stuff.length; _i<_ii; _i++) { _h_protected_stuff_key += '|'; }
                    
                    return '[[=' + _h_protected_stuff_key + ']]'; 
                });

                //  add separator
                _h_html = _h_html.replace(/([a-z0-9])([^a-z0-9]*)$/gi, '$1<'+$S.settings.fragmentSeparatorTag+' class="'+$S.settings.fragmentSeparatorCSSClass+'">&nbsp;</'+$S.settings.fragmentSeparatorTag+'>$2');

                //  un-protect tags
                _h_html = _h_html.replace(/\[\[=([|]+)\]\]/gi, function (_m, _s) { return _h_protected_stuff[(_s.split('|').length-2)]; });
                    
                //  set new html
                $(_e).html(_h_html);
            });
        
        //  add IDs to fragment separators
        //  ==============================
            _$duplicate_element.find($S.settings.fragmentSeparatorTag+'.'+$S.settings.fragmentSeparatorCSSClass).each(function (_i, _e)
            {
                $(_e).attr('id', $S.settings.fragmentSeparatorIdPrefix + _page_nr + '_' + _i);
            });

        //  add sentence highlights
        //  =======================
            _$duplicate_element.find($S.settings.fragmentSeparatorTag+'.'+$S.settings.fragmentSeparatorCSSClass).each(function (_ii, _ee)
            {
                //  skip first
                if (_ii > 0) {}else { return; }
            
                //  valid?
                var _s = $S.document.getElementById($S.settings.fragmentSeparatorIdPrefix+_page_nr+'_'+(_ii-1)),
                    _e = $S.document.getElementById($S.settings.fragmentSeparatorIdPrefix+_page_nr+'_'+_ii);
                if (_s && _e) {}else { return; }
                if (_s.firstChild && _e.firstChild) {}else { return; }
            
                //  create range
                var _range = {
                    'startContainer': $H.highlight__getDeepestTextNode(_s.firstChild),
                    'endContainer': $H.highlight__getDeepestTextNode(_e.firstChild),
                    'startOffset': (_ii == 1 ? 0 : 1),
                    'endOffset': 1 };
                _range['commonAncestorContainer'] = $H.highlight__getCommonAncestorContainerForNodes(_range.startContainer, _range.endContainer, _$duplicate_element.get(0));
                    
                //  highlight
                $H.highlight__doRange(_range);
            });
        
        //  remove blanks
        //  =============
        /*    _$duplicate_element.find('em.'+$H.settings.highlightElementCSSClass).each(function (_ii, _ee)
            {
                var _h = _ee.innerHTML.replace('&nbsp;', ' ');
                if (_h.match(/^[\s\n\r\t]*$/gi)) {}else { return; }

                var _s = $S.document.createElement('span');
                    _s.innerHTML = _h;
                _ee.parentNode.replaceChild(_s, _ee);
            }); */
        
        //  remove first separator
        //  ======================
            var _firstSeparator = $S.document.getElementById($S.settings.fragmentSeparatorIdPrefix+_page_nr+'_0'),
                _firstFragmentInFirstSentence = _$duplicate_element.find('em.'+$H.settings.highlightElementCSSClass+'['+$H.settings.highlightElementIdAttribute+'="'+$(_firstSeparator.firstChild).attr($H.settings.highlightElementIdAttribute)+'"]').get(1);

            if (_firstSeparator && _firstFragmentInFirstSentence)
            {
                _firstSeparator = _firstSeparator.parentNode.removeChild(_firstSeparator);
                $(_firstFragmentInFirstSentence).html($(_firstSeparator.firstChild).html() + $(_firstFragmentInFirstSentence).html());
            }
            
        //  transform highlights
        //  ====================
            var _fragment_count = 0;
            _$duplicate_element.find($S.settings.fragmentSeparatorTag+'.'+$S.settings.fragmentSeparatorCSSClass+' em.'+$H.settings.highlightElementCSSClass).each(function (_ii, _ee)
            {
                //  increment
                _fragment_count++;

                //  current highlight id
                var _current_highlight_id = $(_ee).attr($H.settings.highlightElementIdAttribute);
        
                //  remove fragment separators
                _ee.parentNode.parentNode.replaceChild(_ee, _ee.parentNode);
                
                //  add fragment stuff; remove highlight stuff
                _$duplicate_element.find('em.'+$H.settings.highlightElementCSSClass+'['+$H.settings.highlightElementIdAttribute+'="'+_current_highlight_id+'"]').
                    removeClass($H.settings.highlightElementCSSClass).
                    addClass($S.settings.duplicateContentFragmentCSSClass).
                    removeAttr($H.settings.highlightElementIdAttribute).
                    attr($S.settings.duplicateContentFragmentIdAttribtue, 'page_' + _page_nr + '__fragment_' + _fragment_count);
            });
        
        //  set count -- minus the last one
        //  =========
            $S.speech__fragmentsPerPage['page_'+_page_nr] = _fragment_count;
            
        //  end
        //  ===
            return true;
    };
    
//  add page }


return $S; }