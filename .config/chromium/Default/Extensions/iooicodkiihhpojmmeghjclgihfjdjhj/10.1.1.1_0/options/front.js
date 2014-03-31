
//  import _js_anywhere/
//  ====================
    (function ($O) {
    
        (function () {
            
            //  escape html
            //  ===========
                var _escape_html = function (_string)
                {
                    var _replace = { "&": "amp", '"': "quot", "<": "lt", ">": "gt" };
                    return _string.replace(/[&"<>]/g, function (_match) { var _r = _replace[_match]; return (_r ? ("&" + _r + ";") : _match); });
                };
                
            
            //  escape html
            //  ===========
                var _unescape_html = function (_string)
                {
                    var _replace = { "amp": "&", "quot": '"', "lt": "<", "gt": ">" };
                    return _string.replace(/[&](amp|quot|lt|gt)[;]/g, function (_match, _match_key) { var _r = _replace[_match_key]; return (_r ? _r : _match); });
                };
            
            
            //  encode
            //  ======
                var _encode = function (_string)
                {
                    if (_string == '') { return 'none'; }
                    var _replace = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "*": "%2A" };
                    return _string.replace(/[!'()*]/g, function (_match) { return _replace[_match]; });
                };
            
                
            //  decode
            //  ======
                var _decode = function (_string)
                {
                    if (_string == 'none') { return ''; }
                    return decodeURIComponent(_string);
                };
            
            /* =============== */
            $O.escape_html =    _escape_html;
            $O.unescape_html =  _unescape_html;
            $O.encode =         _encode;
            $O.decode =         _decode;
        })();

        (function () {
            
            //  options
            //  =======
                var _default_options = {
                    'text_font':            '"PT Serif"',
                    'text_font_header':     '"PT Serif"',
                    'text_font_monospace':  'Inconsolata',
                    'text_size':            '16px',
                    'text_line_height':     '1.5em',
                    'box_width':            '36em',
                    'color_background':     '#f3f2ee',
                    'color_text':           '#1f0909',
                    'color_links':          '#065588',
                    'text_align':           'normal',
                    'base':                 'theme-1',
                    'footnote_links':       'on_print',
                    'large_graphics':       'do_nothing',
                    'custom_css':           ''
                };
            
            
            //  vars
            //  ====
                var _default_vars = {
                    'theme':                        'theme-1',                          /* theme-1, theme-2, theme-3, custom */
                
                    'keys_activation':              'Control + Alt + Right Arrow',
                    'keys_clip':                    'Control + Alt + Up Arrow',
                    'keys_highlight':               'Control + Alt + H',
                    'keys_speech':                  'Control + Alt + S',
            
                    'clip_tag':                     '',
                    'clip_notebook':                '',
                    'clip_notebook_guid':           '',
                
                    'related_notes':                'enabled',                          /* enabled, just_at_bottom, disabled */
                    'smart_filing':                 'enabled',                          /* enabled, just_notebooks, just_tags, disabled */
                    'smart_filing_for_business':    'disabled',                         /* enabled, disabled */
            
                    'speech_speed':                 'normal',                           /* slowest, slow, slower, normal, faster, fast, fastest */
                    'speech_gender':                'default',                          /* default, female, male */
                
                    'open_notes_in':                'web',                              /* web, desktop */
                
                    'custom_theme_options':         ''                                  /* the custom theme options get serialized into this */
                };
            
                //  mac-specific keyboard shortcuts
                if ((window) && (window.navigator) && (window.navigator.userAgent) && (window.navigator.userAgent.indexOf) && (window.navigator.userAgent.indexOf('Mac OS') > -1))
                {
                    _default_vars['keys_activation'] = 'Control + Command + Right Arrow';
                    _default_vars['keys_clip'] =       'Control + Command + Up Arrow';
                    _default_vars['keys_highlight'] =  'Control + Command + H';
                    _default_vars['keys_speech'] =     'Control + Command + S';
                }
            
            
            //  sizes
            //  =====
                var _the_sizes = {
                    'small':    { 'theme-1': '12px',    'theme-2': '12px',  'theme-3': '12px',  'custom':  '12px' },
                    'medium':   { 'theme-1': '16px',    'theme-2': '16px',  'theme-3': '16px',  'custom':  '16px' },
                    'large':    { 'theme-1': '20px',    'theme-2': '20px',  'theme-3': '20px',  'custom':  '20px' }
                };
            
            
            //  themes
            //  ======
                var _the_themes = {
                    'theme-1': {
                        'text_font':              '"PT Serif"',
                        'text_font_header':       '"PT Serif"',
                        'text_font_monospace':    'Inconsolata',
                        'text_size':              '16px',
                        'text_line_height':       '1.5em',
                        'box_width':              '36em',
                        'color_background':       '#f3f2ee',
                        'color_text':             '#1f0909',
                        'color_links':            '#065588',
                        'text_align':             'normal',
                        'base':                   'theme-1',
                        'footnote_links':         'on_print',
                        'large_graphics':         'do_nothing',
                        'custom_css':             ''
                    },
                    
                    'theme-2': {
                        'text_font':              'Helvetica, Arial',
                        'text_font_header':       'Helvetica, Arial',
                        'text_font_monospace':    '"Droid Sans Mono"',
                        'text_size':              '14px',
                        'text_line_height':       '1.5em',
                        'box_width':              '42em',
                        'color_background':       '#fff',
                        'color_text':             '#333',
                        'color_links':            '#090',
                        'text_align':             'normal',
                        'base':                   'theme-2',
                        'footnote_links':         'on_print',
                        'large_graphics':         'do_nothing',
                        'custom_css':             ''
                    },
                    
                    'theme-3': {
                        'text_font':              '"PT Serif"',
                        'text_font_header':       '"PT Serif"',
                        'text_font_monospace':    'Inconsolata',
                        'text_size':              '16px',
                        'text_line_height':       '1.5em',
                        'box_width':              '36em',
                        'color_background':       '#2d2d2d',
                        'color_text':             '#e3e3e3',
                        'color_links':            '#e3e3e3',
                        'text_align':             'normal',
                        'base':                   'theme-3',
                        'footnote_links':         'on_print',
                        'large_graphics':         'do_nothing',
                        'custom_css':             ''
                    }
                };
            
            /* =============== */
            $O.default_options =        _default_options;
            $O.default_vars =           _default_vars;
            $O.the_sizes =              _the_sizes;
            $O.the_themes =             _the_themes;
        })();

        (function () {
            
            //  get key combo
            //  =============    
                var _get_key_combo_from_event = function (_event)
                {
                    //  _event can be a browser event or a jQuery event
                    
                    var _key_code = 'NONE';
                    switch (true)
                    {
                        case (_event.keyCode && (_event.keyCode >= 65 && _event.keyCode <= 90)):
                            _key_code = String.fromCharCode(_event.keyCode).toUpperCase();
                            break;
                        
                        case (_event.keyCode == 27):    _key_code = 'Escape';        break;
                        case (_event.keyCode == 37):    _key_code = 'Left Arrow';    break;
                        case (_event.keyCode == 39):    _key_code = 'Right Arrow';   break;
                        case (_event.keyCode == 38):    _key_code = 'Up Arrow';      break;
                        case (_event.keyCode == 40):    _key_code = 'Down Arrow';    break;
                    }
            
                    var _modifierKeys = (_event.originalEvent ? _event.originalEvent : _event);
                    //  jQuery screws up -- fucks up the metaKey property badly
                    
                    var _key_combo = ''                                 +
                        (_modifierKeys.ctrlKey ?    'Control + ' : '')  +
                        (_modifierKeys.shiftKey ?   'Shift + ' : '')    +
                        (_modifierKeys.altKey ?     'Alt + ' : '')      +
                        (_modifierKeys.metaKey ?    'Command + ' : '')  +
                        _key_code                                       +
                    '';
            
                    if ((_key_code != 'Escape') && (_key_code == _key_combo))
                    {
                        _key_code = 'NONE';
                        _key_combo = 'NONE';
                    }
                    
                    //  return
                    return {
                        '_key_code': _key_code,
                        '_key_combo': _key_combo
                    };
                };
                
            /* =============== */
            $O.get_key_combo_from_event = _get_key_combo_from_event;
        })();

        (function () {
            
            //  translations
            //  ============
                var _translations_in_options = {
                    'title__page':                                  'Clearly / Options',
                    'title__general':                               'Options',
                    'title__custom':                                'Custom Theme',
                    'title__speech':                                'Text To Speech',
                    'title__features':                              'Clearly Features',
                    
                    /* === */
                    
                    'title__sub__keyboard':                         'Keyboard shortcuts',
                    'message__keys':                                'To change, place cursor in field and strike key combination on your keyboard.',
                    'message__keys_firefox':                        'Restart your browser, afer saving.',
                    'keys_activation__label':                       'View page in Clearly',
                    'keys_clip__label':                             'Clip to Evernote',
                    'keys_highlight__label':                        'Highlight',
                    'keys_speech__label':                           'Text To Speech',
            
                    /* === */
            
                    'title__sub__tags':                             'Tags',
                    'message__tags':                                'Tags to apply, when you Clip to Evernote.',
                    'clip_tag__no__label':                          'Don\'t tag',
                    'clip_tag__yes__label':                         'Tag with',
            
                    /* === */
            
                    'title__sub__notebook':                         'Notebook',
                    'message__notebook':                            'Notebook to clip to, when you Clip to Evernote.',
                    'clip_notebook__no__label':                     'Use Default Notebook',
                    'clip_notebook__yes__label':                    'Use this Notebook',
                    'clip_notebook__your':                          'Your Notebooks',
                    'clip_notebook__shared':                        'Shared Notebooks',
                    'clip_notebook__business':                      'Business Notebooks',
                    
                    /* === */
            
                    'title__sub__smart_filing':                     'Smart Filing',
                    'message__smart_filing':                        'Let Evernote determine what Notebook clips should go into, and what Tags they should get.',
                    'smart_filing__enabled__label':                 'Enable Smart Filing',
                    'smart_filing__just_notebooks__label':          'Enable Smart Filing, but just for Notebooks',
                    'smart_filing__just_tags__label':               'Enable Smart Filing, but just for Tags',
                    'smart_filing__disabled__label':                'Disable Smart Filing',
                    'smart_filing_for_business__label':             'Allow Smart Filing into Business Notebooks',
            
                    /* === */
            
                    'title__sub__related_notes':                    'Related Notes',
                    'message__related_notes':                       'Let Evernote fetch clips from your account that might be relevant to what you are reading now.',
                    'related_notes__enabled__label':                'Enable Related Notes',
                    'related_notes__just_at_bottom__label':         'Only show Related Notes at the bottom',
                    'related_notes__disabled__label':               'Disable Related Notes',
            
                    /* === */
            
                    'title__sub__open_notes_in':                    'Open notes in',
                    'message__open_notes_in':                       'When openinig notes from Clearly, use a specific Evernote client.',
                    'open_notes_in__web__label':                    'Web client',
                    'open_notes_in__desktop__label':                'Desktop client',
                    
                    /* === */
            
                    'title__sub__account':                          'Account',
                    'account__sign_out':                            'Permanently signed in as [[=username]].',
                    'account__sign_out_link':                       'Sign out.',
                    'account__signed_out':                          'You are not permanently signed in. Click on the Evernote icon, in the Clearly sidebar, to sign in.',
            
                    /* === */
                    
                    'text_font__label':                             'Body Font',
                    'text_font_header__label':                      'Header Font',
                    'text_font_monospace__label':                   'Monospace Font',
                    'text_size__label':                             'Base Font Size',
                    'text_line_height__label':                      'Line Height',
                    'box_width__label':                             'Line Width',
                    'color_background__label':                      'Background Color',
                    'color_text__label':                            'Foreground Color',
                    'color_links__label':                           'Links Color',
                    'text_align__label':                            'Text Align',
                    'base__label':                                  'Base CSS',
                    'custom_css__label':                            'Custom CSS',
                    'footnote_links__label':                        'Links as Footnotes',
                    'large_graphics__label':                        'Large Graphics',
                    
                    /* === */
                    
                    'speech_speed__label':                          'Reading Speed',
                    'speech_gender__label':                         'Reading Voice',
                    'speech_demo__label':                           'Demo',
            
                    /* === */
                    
                    'values__text_align__Normal':                   'Normal',
                    'values__text_align__Justified':                'Justified',
            
                    'values__base__Blueprint__not_translated':      'Blueprint',
                    'values__base__Theme_1__not_translated':        'Newsprint',
                    'values__base__Theme_2__not_translated':        'Notable',
                    'values__base__Theme_3__not_translated':        'Night Owl',
                    
                    'values__base__Blueprint':                      'Blueprint',
                    'values__base__Theme_1':                        'Newsprint',
                    'values__base__Theme_2':                        'Notable',
                    'values__base__Theme_3':                        'Night Owl',
                    'values__base__None':                           'None',
                    
                    'values__footnote_links__On_Print':             'On Print',
                    'values__footnote_links__Always':               'Always',
                    'values__footnote_links__Never':                'Never',
                    
                    'values__large_graphics__Do_Nothing':           'Show Always',
                    'values__large_graphics__Hide_on_Print':        'Hide on Print',
                    'values__large_graphics__Hide_Always':          'Hide Always',
                    
                    'values__menu_placement__Top_Right':            'Top Right',
                    'values__menu_placement__Bottom_Right':         'Bottom Right',
            
                    'values__speech_speed__fastest':                'Fastest',
                    'values__speech_speed__fast':                   'Fast',
                    'values__speech_speed__faster':                 'Faster',
                    'values__speech_speed__normal':                 'Normal',
                    'values__speech_speed__slower':                 'Slower',
                    'values__speech_speed__slow':                   'Slow',
                    'values__speech_speed__slowest':                'Slowest',
            
                    'values__speech_gender__default':               'Default',
                    'values__speech_gender__female':                'Female (if available)',
                    'values__speech_gender__male':                  'Male (if available)',
            
                    /* === */
            
                    'menu__speak__tooltip':                         'Text To Speech',
                    'menu__speak__play__tooltip':                   'Play',
                    'menu__speak__pause__tooltip':                  'Pause',
                    'menu__speak__forward__tooltip':                'Go Forwards',
                    'menu__speak__rewind__tooltip':                 'Go Backwards',
            
                    /* === */
                    
                    'button__save_general':                         'Save Options',
                    'button__save_custom':                          'Save Theme',
                    'button__more_options':                         'More Options',
                    'button__reset_custom':                         'Reset',
            
                    /* === */
            
                    'features__speech__title':                      'Text To Speech',
                    'features__speech__text':                       'Sit back and let Clearly read blog posts, articles, and web pages to you thanks to the new Text To Speech feature, available exclusively for Evernote Premium subscribers.',
                    'features__speech__text__powered':              'Evernote Clearly is powered by [=service].',
                    'features__speech__text__requires':             'Requires [=product].',
                    'features__speech__text__available':            'Text To Speech in 21 languages:',
                    'features__speech__text__available_languages':  'English, Japanese, Spanish, French, German, Chinese, Korean, Arabic, Czech, Danish, Dutch, Finnish, Greek, Hungarian, Italian, Norwegian, Polish, Portuguese, Russian, Swedish and Turkish.',
                    'features__speech__text__try':                  'Try Text To Speech',
                    'features__speech__text__upgrade':              'Upgrade to Evernote Premium',
                    'features__speech__text__language':             'Language not supported',
                    'features__speech__text__play':                 'Play using this language',
                    'features__speech__text__cancel':               'Cancel',
                    'features__speech__no_language_title':          'Language not supported',
                    'features__speech__no_language_explanation':    'Evernote Clearly was not able to determine the language of this article. If you recognize the language, select it below and we\'ll play it.',
            
                    /* === */
                    
                    'features__clipping__title':                    'Clip to Evernote',
                    'features__clipping__text':                     'Save what you\'re reading to your Evernote account with one click. Access clips from any device, anytime in Evernote.',
            
                    /* === */
            
                    'features__highlighting__title':                'Highlighting',
                    'features__highlighting__text':                 'Highlight text you want to remember & quickly find it in your Evernote account. Highlighting changes you make in Clearly will be updated in your Evernote account automatically.',
            
                    /* === */
            
                    'features__related_notes__title':               'Related Notes',
                    'features__related_notes__text':                'Magically rediscover notes from your Evernote account that are related to the page you are viewing. Related Notes are displayed at the bottom of the article or on the right side if space permits.',
            
                    /* === */
            
                    'features__smart_filing__title':                'Smart Filing',
                    'features__smart_filing__text':                 'Automatically assign tags to your Web clips and saves them to the appropriate notebook, so you don\'t have to.',
                    
                    /* === */
            
                    'features__eula_notice':                        'By using Clearly, you agree to our [=eula].',
                    'features__close2':                             'Close',
                    
                    /* === */
            
                    'message__saved':                               'Settings will be in effect on any new tabs you use Clearly on.'
                };    
            
            /* =============== */
            //  translated strings may have &stuff; in them
            $O.translation__items = _translations_in_options;
            $O.translate = function (_key) { var _r = $O.translation__items[_key]; return $O.escape_html($O.unescape_html(_r ? _r : _key)); };
        })();

    })(window.__readable_by_evernote__options__front);
    
    
//  ==========================================================================================================================
    

//  import this
//  ===========
    (function ($O, $B) {

        
        //  get background
        //  ==============
            $O.get_background_object = function ()
            {
                var _w = chrome.extension.getBackgroundPage();
                return _w.__readable_by_evernote;
            };
        
        
        //  translation
        //  ===========
            $O.translation__get_item = function (_key)
            {
                //  default
                var _t = chrome.i18n.getMessage('options__'+_key);
                
                //  custom
                switch (true)
                {
                    case (_key.match(/^features__/) != null):
                    case (_key.match(/^menu__speak__/) != null):
                        _t = chrome.i18n.getMessage('inside__'+_key);
                        break;
                }
                
                return (_t > '' ? _t : '');
            };
        


        
        //  get strings
        //  ===========
            $O.translation__get_items = function ()
            {
                for (var x in $O.translation__items)
                {
                    var _t = $O.translation__get_item(x);
                    if (_t > '') {}else { continue; }
                
                    $O.translation__items[x] = _t;
                }
            
        
            };
            
        
        //  do translate
        //  ============
            $O.translation__apply = function ()
            {
                //  translate everything
                //  ====================
                    $('[translate]').each(function()
                    {
                        var _$t = $(this),
                            _tk = _$t.attr('translate'),
                            _tt = $O.translate(_tk),
                            _tt = (_tt > '' ? _tt : '[' + _tk + ']');
                
                        //  X parameter
                        if (_tt.indexOf('[=x]') > -1)
                        {
                            var _x = _$t.attr('translate_x');
                                _t = _tt.replace('[=x]', _x);
                        }
                
                        //  type of element
                        switch (true)
                        {
                            case (_$t.attr('type') == 'button' && this.tagName.toLowerCase() == 'input'):
                                _$t.attr('value', _tt);
                                break;
                
                            default:
                                _$t.html(_tt);
                                break;
                        }
                    });
                
        
                //  misc other stuff
                //  ================
                
                    $('#features__eula_notice span').html($('#features__eula_notice span').html().replace('[=eula]', '<a href="#">End User License Agreement</a>'));
                    $('#features__eula_notice span a').click(function () { $('body').addClass('showEula'); return false; });
        
                    (function () {
                        var _p = $('#features__speech__text__powered'), _h = _p.html(); 
                        _h = ((_h && _h.replace) ? _h.replace('[=service]', 'iSpeech - <a href="http://www.ispeech.org/text.to.speech" target="_blank">Text To Speech</a>') : false);
                        if (_h) { _p.html(_h); }
                    })();
                
                    $('#speech__controls__init').attr('title',      $O.translate('menu__speak__play__tooltip'));
                    $('#speech__controls__play').attr('title',      $O.translate('menu__speak__play__tooltip'));
                    $('#speech__controls__pause').attr('title',     $O.translate('menu__speak__pause__tooltip'));
                    $('#speech__controls__loading').attr('title',   $O.translate('menu__speak__tooltip'));
                    $('#speech__controls__forward').attr('title',   $O.translate('menu__speak__forward__tooltip'));
                    $('#speech__controls__rewind').attr('title',    $O.translate('menu__speak__rewind__tooltip'));
            };
        

        
        //  general
        //  =======
            $O.values_put__general = function ()
            {
                //  vars
                var _vars = $B.saved__get_vars(),
                    _varsDecoded = {};
        
                //  decode
                for (var _x in _vars) { _varsDecoded[_x] = $O.decode(_vars[_x]); }
                    
                //  keys
                $('#keys_activation__control').val(_varsDecoded['keys_activation']);
                $('#keys_clip__control').val(_varsDecoded['keys_clip']);
                $('#keys_highlight__control').val(_varsDecoded['keys_highlight']);
                $('#keys_speech__control').val(_varsDecoded['keys_speech']);
        
                //  tag
                var _clip_tag = _varsDecoded['clip_tag'];
                $('#clip_tag__control').val(_clip_tag);
                $('#clip_tag__radio__no').attr('checked', (!(_clip_tag > '')));
                $('#clip_tag__radio__yes').attr('checked', (_clip_tag > ''));
        
                //  notebook
                var _clip_notebook_guid = _varsDecoded['clip_notebook_guid'];
                $('#clip_notebook_guid__control').attr('_selected', _clip_notebook_guid);
                $('#clip_notebook__radio__no').attr('checked', true);
                $('#clip_notebook__radio__yes').attr('checked', false);
        
                //  smart filing
                var _smart_filing = _varsDecoded['smart_filing'];
                switch (true)
                {
                    case (_smart_filing == 'enabled'):          $('#smart_filing__radio__enabled').attr('checked', true); break;
                    case (_smart_filing == 'just_notebooks'):   $('#smart_filing__radio__just_notebooks').attr('checked', true); break;
                    case (_smart_filing == 'just_tags'):        $('#smart_filing__radio__just_tags').attr('checked', true); break;
                    case (_smart_filing == 'disabled'):         $('#smart_filing__radio__disabled').attr('checked', true); break;
                }
        
                var _smart_filing_for_business = _varsDecoded['smart_filing_for_business'];
                if (_smart_filing_for_business == 'enabled') { $('#smart_filing_for_business__control').attr('checked', true); }
        
                //  related notes                
                var _related_notes = _varsDecoded['related_notes'];
                switch (true)
                {
                    case (_related_notes == 'enabled'):         $('#related_notes__radio__enabled').attr('checked', true); break;
                    case (_related_notes == 'just_at_bottom'):  $('#related_notes__radio__just_at_bottom').attr('checked', true); break;
                    case (_related_notes == 'disabled'):        $('#related_notes__radio__disabled').attr('checked', true); break;
                }
        
                //  open notes in
                var _open_notes_in = _varsDecoded['open_notes_in'];
                switch (true)
                {
                    case (_open_notes_in == 'web'):     $('#open_notes_in__radio__web').attr('checked', true); break;
                    case (_open_notes_in == 'desktop'): $('#open_notes_in__radio__desktop').attr('checked', true); break;
                }
            };
                
                
        //  speech
        //  ======
            $O.values_put__speech = function ()
            {
                //  vars
                var _vars = $B.saved__get_vars(),
                    _varsDecoded = {};
        
                //  decode
                for (var _x in _vars) { _varsDecoded[_x] = $O.decode(_vars[_x]); }
                    
                //  set
                $('#speech_speed__control').val(_varsDecoded['speech_speed']);
                $('#speech_gender__control').val(_varsDecoded['speech_gender']);
            };
        
                
        //  custom
        //  ======
            $O.values_put__custom = function ()
            {
                //  hold custom reset options
                $O.values_put__reset_custom_theme = $B.saved__get_options();
        
                //  get custom theme options -- serialize as [[=option_name][=option_value]]
                var _vars = $B.saved__get_vars(),
                    _customThemeOptionsAggregate = $O.decode(_vars['custom_theme_options']),
                    _customThemeOptions = {},
                    _customThemeOptionsUse = true;
                
                //  get _customThemeOptions    
                _customThemeOptionsAggregate.replace(/\[\[=(.*?)\]\[=(.*?)\]\]/gi, function (_match, _name, _value) { _customThemeOptions[_name] = _value; });
                        
                //  if customThemeOptions has all the options filled-in, then use the customThemeOptions var as the values_put__reset_custom_theme var
                for (var _option in $O.default_options) { if (_option in _customThemeOptions) {}else { _customThemeOptionsUse = false; break; } }
                $O.values_put__reset_custom_theme = (_customThemeOptionsUse ? _customThemeOptions : $O.values_put__reset_custom_theme);
                        
                //  put in ui
                $O.values_put__custom__reset();
            };
        
            $O.values_put__custom__reset = function ()
            {
                //  decode
                var _varsDecoded = {};
                for (var _x in $O.values_put__reset_custom_theme) { _varsDecoded[_x] = $O.decode($O.values_put__reset_custom_theme[_x]); }
                
                //  list
                var _normalOptionsList = [
                    'color_background', 'color_text', 'color_links',
                    'text_size', 'box_width', 'text_line_height',
                    'base', 'text_align', 'footnote_links', 'large_graphics'
                ];
                    
                //  normal options
                for (var i=0, _i=_normalOptionsList.length; i<_i; i++) { $('#'+_normalOptionsList[i]+'__control').val(_varsDecoded[_normalOptionsList[i]]); }
                            
                //  fonts
                var _u = $O.values_put__custom_form_reset__unquote_fonts;
                $('#text_font__control').val(           _u(_varsDecoded['text_font']));
                $('#text_font_header__control').val(    _u(_varsDecoded['text_font_header']));
                $('#text_font_monospace__control').val( _u(_varsDecoded['text_font_monospace']));
                        
                //  custom -- add new line, after every }
                $('#custom_css__control').val(_varsDecoded['custom_css'].replace(/\}/gi, '}\n'));
            };
                
            $O.values_put__custom_form_reset__unquote_fonts = function (_s)
            {
                return _s.replace(/"([^"]+)"/gi, '$1');
            };
            
            
        //  notebooks
        //  =========
            $O.values_put__notebooks = function ()
            {
                //  not logged in
                if ($O.storedLogin == false) { return; }
        
                //  control; selected
                var $select = $('#clip_notebook_guid__control'), _selected = $select.attr('_selected');
                
                //  add notebooks group
                var _add_notebooks_group = function (_values, _header)
                {
                    //  blank
                    if (_values.length > 0) {}else { return; }
                    
                    //  html
                    var _html = '<optgroup label="'+$O.escape_html(_header)+'">';
                    for (var _i=0, _ii=_values.length, _n=false; _i<_ii; _i++)
                    {
                        //  restricted? continue
                        if (_values[_i].restrictions && _values[_i].restrictions.noCreateNotes) { continue; }
                        
                        //  write
                        _html += ''                                     +
                            '<option value="'+$O.escape_html(_values[_i].guid)+'">' +
                              $O.escape_html(_values[_i].name)          +
                            '</option>'                                 +
                        '';
                    }
                    _html += '</optgroup>';
                    
                    //  add _html
                    $select.append(_html);
                };
        
                //  sort function
                var _sortByName = function (a, b) { 
                    switch (true) { 
                        case (a.name < b.name): return -1; 
                        case (a.name > b.name): return 1; 
                        default: return 0; 
                    } 
                };
                    
                //  show notebooks
                var _show_notebooks = function (_personal_notebooks, _business_notebooks)
                {
                    //  personal notebooks
                    _personal_notebooks.sort(_sortByName);
                    _add_notebooks_group(_personal_notebooks, $O.translate('clip_notebook__your'));
                        
                    //  business notebooks
                    _business_notebooks.sort(_sortByName);
                    _add_notebooks_group(_business_notebooks, $O.translate('clip_notebook__business'));
        
                    //  currently selected
                    $select.val(_selected);
                    if ($select.val())
                    {
                        $('#clip_notebook__radio__no').attr('checked', false);
                        $('#clip_notebook__radio__yes').attr('checked', true);
                    }
                };
        
                //  cascade
                $B.$bootstrap.bootstrap(
                
                    //  success bootstrap
                    function ()
                    {
                        $B.$remote.connect(
                        
                            //  success connect
                            function ()
                            {
                                $B.$remote.loginWithAuthToken(
                                
                                    $O.storedLogin.xAuthToken,
        
                                    //  success | login
                                    function ()
                                    {
                                        $B.$remote.get_notebooks(
                                        
                                            //  success | get notebooks
                                            function (_personal_notebooks)
                                            {
                                                $B.$remote.get_business_notebooks(
                                                
                                                    //  success | get business notebooks
                                                    function (_business_notebooks) { _show_notebooks(_personal_notebooks, _business_notebooks); },
                                                    
                                                    //  failure | get business notebooks
                                                    function (_failReason) { _show_notebooks(_personal_notebooks, []); });
                                            },
        
                                            //  failure | get notebooks
                                            function (_failReason) { });
                                    },
        
                                    //    failure | login
                                    function (_failReason) { });
                                
                            },
                            
                            //  failed connect
                            function (_failReason) { });
                    },
                    
                    //  failed bootstrap
                    function (_failReason) { });
            };    
        
        
        //  general
        //  =======
            $O.values_get__general = function()
            {
                //  vars
                var _varsDecoded = {},
                    _vars = {};
        
                //  keys
                _varsDecoded['keys_activation'] =   $('#keys_activation__control').val();
                _varsDecoded['keys_clip'] =         $('#keys_clip__control').val();
                _varsDecoded['keys_highlight'] =    $('#keys_highlight__control').val();
                _varsDecoded['keys_speech'] =       $('#keys_speech__control').val();
        
                //  tag        
                _varsDecoded['clip_tag'] = $('#clip_tag__control').val();
                _varsDecoded['clip_tag'] = (($('#clip_tag__radio__no').attr('checked') == 'checked') ? '' : _varsDecoded['clip_tag']);
        
                //  notebook
                _varsDecoded['clip_notebook_guid'] = $('#clip_notebook_guid__control').val();
                _varsDecoded['clip_notebook_guid'] = (($('#clip_notebook__radio__no').attr('checked') == 'checked') ? '' : _varsDecoded['clip_notebook_guid']);
                _varsDecoded['clip_notebook_guid'] = (_varsDecoded['clip_notebook_guid'] > '' ? _varsDecoded['clip_notebook_guid'] : '');
                _varsDecoded['clip_notebook'] =      '';
                        
                //  smart filing
                _varsDecoded['smart_filing_for_business'] = (($('#smart_filing_for_business__control').attr('checked') == 'checked') ? 'enabled' : 'disabled');
                switch (true)
                {
                    case ($('#smart_filing__radio__enabled').attr('checked') == 'checked'):         _varsDecoded['smart_filing'] = 'enabled';        break;
                    case ($('#smart_filing__radio__just_notebooks').attr('checked') == 'checked'):  _varsDecoded['smart_filing'] = 'just_notebooks'; break;
                    case ($('#smart_filing__radio__just_tags').attr('checked') == 'checked'):       _varsDecoded['smart_filing'] = 'just_tags';      break;
                    case ($('#smart_filing__radio__disabled').attr('checked') == 'checked'):        _varsDecoded['smart_filing'] = 'disabled';       break;
                }
                        
                //  related notes
                switch (true)
                {
                    case ($('#related_notes__radio__enabled').attr('checked') == 'checked'):        _varsDecoded['related_notes'] = 'enabled';        break;
                    case ($('#related_notes__radio__just_at_bottom').attr('checked') == 'checked'): _varsDecoded['related_notes'] = 'just_at_bottom'; break;
                    case ($('#related_notes__radio__disabled').attr('checked') == 'checked'):       _varsDecoded['related_notes'] = 'disabled';       break;
                }
        
                //  open notes in
                switch (true)
                {
                    case ($('#open_notes_in__radio__web').attr('checked') == 'checked'):            _varsDecoded['open_notes_in'] = 'web';      break;
                    case ($('#open_notes_in__radio__desktop').attr('checked') == 'checked'):        _varsDecoded['open_notes_in'] = 'desktop';  break;
                }
                        
                //  encode
                for (var _x in _varsDecoded) { _vars[_x] = $O.encode(_varsDecoded[_x]); }
                    
                return _vars;
            };
        
        
        //  speech
        //  ======
            $O.values_get__speech = function()
            {
                //  vars
                var _varsDecoded = {},
                    _vars = {};
        
                //  get
                _varsDecoded['speech_speed'] =  $('#speech_speed__control').val();
                _varsDecoded['speech_gender'] = $('#speech_gender__control').val();
                        
                //  encode
                for (var _x in _varsDecoded) { _vars[_x] = $O.encode(_varsDecoded[_x]); }
                    
                return _vars;
            };
                
        
        //  custom
        //  ======
            $O.values_get__custom = function()
            {
                //  vars
                var _optionsDecoded = {},
                    _options = {},
                    _optionsList = [
                        'color_background', 'color_text', 'color_links',
                        'text_size', 'box_width', 'text_line_height',
                        'base', 'text_align', 'footnote_links', 'large_graphics'
                    ];
                    
                //  normal options
                for (var _i=0, _ii=_optionsList.length; _i<_ii; _i++) { _optionsDecoded[_optionsList[_i]] = $('#'+_optionsList[_i]+'__control').val(); }
                        
                //  fonts
                _optionsDecoded['text_font'] =           $O.values_get__custom__quoteFonts($('#text_font__control').val());
                _optionsDecoded['text_font_header'] =    $O.values_get__custom__quoteFonts($('#text_font_header__control').val());
                _optionsDecoded['text_font_monospace'] = $O.values_get__custom__quoteFonts($('#text_font_monospace__control').val());
                    
                //  custom
                _optionsDecoded['custom_css'] =          $('#custom_css__control').val().replace(/[\r\n]/gi, '');
                
                //  encode
                for (var _x in _optionsDecoded) { _options[_x] = $O.encode(_optionsDecoded[_x]); }
                    
                return _options;
            };
                
            $O.values_get__custom__quoteFonts = function (_val)
            {
                var _r='', _v='', _m = _val.split(',');
                for (var i=0, _i=_m.length; i<_i; i++)
                {
                    _v = _m[i].replace(/\s+/gi, ' ').replace(/^\s/, '').replace('\s$/', '');
                    _r += ', '+(_v.indexOf(' ') > -1 ? '"'+_v+'"' : _v);
                }
                
                return _r.substr(2);
            };
        
        
        //  validate
        //  ========
            $O.values_get__validate_custom_theme = function ()
            {
                //  list    
                var _requiredList = [
                    'text_font', 'text_font_header', 'text_font_monospace',
                    'color_background', 'color_text', 'color_links',
                    'text_size', 'box_width', 'text_line_height'
                ];
                    
                //  remove errors    
                $('#view__custom table.controlTable').removeClass('error');    
                    
                //  vars
                var _hasError = false,
                    _options = $O.values_get__custom();
                    
                //  required vars
                for (var i=0, _i=_requiredList.length; i<_i; i++) { if (_options[_requiredList[i]] == 'none') { _hasError = true; $('#'+_requiredList[i]+'__controlTable').addClass('error'); } }
                
                //  has errors
                if (_hasError) { return false; }
        
                //  no errors
                $O.values_get__valid_custom_theme = _options;
                return true;
            };
        

        
        //  qa stuff
        //  ========
        
            $O.qa__set_servers_to_stage = function ()
            {
                var _r = $O.get_background_object();
                    _r.$bootstrap.set_servers_to_stage();
                    _r.$bootstrap.disconnect();
                    _r.$remote.disconnect();
            };
            
            $O.qa__set_servers_to_live = function ()
            {
                var _r = $O.get_background_object();
                    _r.$bootstrap.set_servers_to_live();
                    _r.$bootstrap.disconnect();
                    _r.$remote.disconnect();
            };
            
            $O.qa__set_simulate_chinese_locale = function ()
            {
                var _r = $O.get_background_object();
                    _r.$bootstrap.set_simulate_chinese_locale();
                    _r.$bootstrap.disconnect();
                    _r.$remote.disconnect();
            };
            
            $O.qa__set_do_not_simulate_chinese_locale = function ()
            {
                var _r = $O.get_background_object();
                    _r.$bootstrap.set_do_not_simulate_chinese_locale();
                    _r.$bootstrap.disconnect();
                    _r.$remote.disconnect();
            };
            

        
        //  determine state
        //  ===============
            $O.speech__determine_state = function ()
            {
                //  false, initially
                $O.speech__enabled = false;
                $O.speech__demo_enabled = false;
        
                 try {
                    var _audio = document.createElement('audio'), _can = (_audio.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, '') > '');
                    if (_can) { $O.speech__enabled = true; $O.speech__demo_enabled = true; }
                } catch (e) {}
            
                
        
            };
        
        
        //  hide demo
        //  =========
            $O.speech__hide_demo = function ()
            {
                //  preview frame
                $('#preview__speech_demo').hide();
                
                //  move these elements up, in [speech] view
                var _list = ['view__speech__buttons__container', 'view__speech__message__saved', 'view__speech__ending'];
                for (var _i=0, _ii=_list.length, _$e=false, _t=false; _i<_ii; _i++)
                {
                    _$e = $('#'+_list[_i]);
                    _t = _$e.css('top');
                    _t = ((_t && _t.replace) ? parseInt(_t.replace(/px$/gi, ''), 10) : false);
                    if (_t) { _$e.css({ 'top': (_t - 363)+'px' }); }
                }
            };
            
        //  hide everything
        //  ===============
            $O.speech__hide_everything = function ()
            {
                //  hide tab
                $('#sidebar__menu__speech').hide();
                
                //  hide shortcut-key, in [general] view
                $('#keys_speech__controlTable').hide();
                
                //  move these elements up, in [general] view
                var _list = [
                     'view__general__separator__2', 'view__general__subtitle__tags', 'view__general__message__tags',
                     'clip_tag__yes__controlTable', 'clip_tag__no__controlTable',
                     'view__general__separator__3', 'view__general__subtitle__notebook', 'view__general__message__notebook',
                     'clip_notebook__yes__controlTable', 'clip_notebook__no__controlTable',
                     'view__general__separator__4', 'view__general__subtitle__smart_filing', 'view__general__message__smart_filing',
                     'smart_filing__enabled__controlTable', 'smart_filing__just_notebooks__controlTable', 'smart_filing__just_tags__controlTable', 'smart_filing__disabled__controlTable', 'smart_filing_for_business__controlTable',
                     'view__general__separator__5', 'view__general__subtitle__related_notes', 'view__general__message__related_notes',
                     'related_notes__enabled__controlTable', 'related_notes__just_at_bottom__controlTable', 'related_notes__disabled__controlTable',
                     'view__general__separator__6', 'view__general__subtitle__open_notes_in', 'view__general__message__open_notes_in',
                     'open_notes_in__web__controlTable', 'open_notes_in__desktop__controlTable', 
                     'view__general__separator__7', 'view__general__subtitle__account',
                     'account__container',
                     'view__general__separator__8', 'view__general__message__saved', 'view__general__buttons__container', 'view__general__ending',
                     'view__konami'
                ];
                for (var _i=0, _ii=_list.length, _$e=false; _i<_ii; _i++) { _$e = $('#'+_list[_i]); _t = _$e.css({ 'top': (parseInt(_$e.css('top').replace(/px$/gi, ''), 10) - 36) + 'px' }); }
            };
            
        
        //  reformat/custom_theme init
        //  ==========================
            $O.cc__custom_theme__reformat__init = function()
            {
                $O.cc__custom_theme__reformat = {
                    'callbacks': {
                        'frameCreated': function () {
                            /* this */        var _this = $O.cc__custom_theme__reformat;
                            /* apply theme */ _this.applyEncodedOptions($O.values_put__reset_custom_theme);
                            /* load fonts */  _this.loadGoogleFontsRequiredByAppliedOptions();
                            /* add page */    _this.addNewPage($('#preview__custom_theme__contents').html(), 'http://www.example.com/');
                        }
                    },
                    'settings': {
                        'cssPath': $O.paths.main+'the_components/reformat/css/',
                        
                        'onCreateFrameDoNotInsertCSS':          true,
                        'createFrameInsideElementWithThisId':   'preview__custom_theme',
                        'onCreateFrameUseThisId':               'preview__custom_theme__iframe'
                    },
                    'debug': false,
                    'window': window,
                    'jQuery': window.jQuery
                };
                $O.cc__custom_theme__reformat = window.initClearlyComponent__reformat($O.cc__custom_theme__reformat);
                $O.cc__custom_theme__reformat.createFrame();
            };
        
        
        //  reformat/custom_theme update
        //  ============================
            $O.cc__custom_theme__reformat__update = function()
            {
                //  valid?
                if ($O.values_get__validate_custom_theme()) {}else { return; }
                
                // this
                var _this = $O.cc__custom_theme__reformat;
                
                // apply theme
                _this.applyEncodedOptions($O.values_get__valid_custom_theme);
            };
        
        
        //  reformat/speech_demo init -- will trigger speech component init
        //  =========================
            $O.cc__speech_demo__reformat__init = function()
            {    
                $O.cc__speech_demo__reformat = {
                    'callbacks': {
                        'frameCreated': function () {
                            /* this */         var _this = $O.cc__speech_demo__reformat;
                            /* apply theme */  _this.applyUnencodedOptions(_this.defaultThemes['newsprint']);
                            /* load fonts */   _this.loadGoogleFontsRequiredByAppliedOptions();
                            /* speech */       $O.cc__speech_demo__speech__init();
                        }
                    },
                    'settings': {
                        'cssPath': $O.paths.main+'the_components/reformat/css/',
                    
                        'onCreateFrameDoNotInsertCSS':          true,
                        'createFrameInsideElementWithThisId':   'preview__speech_demo',
                        'onCreateFrameUseThisId':               'preview__speech_demo__iframe',
                        
                        'onCreateFrameWaitForTheseWindowVars':  ['jQuery', 'jQuery.jPlayer'],
                        'onCreateFrameInjectThisHTMLAfter':     '<div>' +
                            '<style type="text/css"> #text h3:first-child { margin-top: 0 !important; } </style>' +
                            '<script type="text/javascript" src="'+$O.paths.main+'third_party/jquery/jquery.js"></script>' +
                             '<script type="text/javascript" src="'+$O.paths.main+'third_party/jplayer/jquery.jplayer.js"></script>' +
                        
                        '</div>'
                    },
                    'debug': false,
                    'window': window,
                    'jQuery': window.jQuery
                };
                $O.cc__speech_demo__reformat = window.initClearlyComponent__reformat($O.cc__speech_demo__reformat);
                $O.cc__speech_demo__reformat.createFrame();
            };
        
        
        //  speech/speech_demo init
        //  =======================
            $O.cc__speech_demo__speech__init = function ()
            {
                //  speech demo
                var _r = $O.cc__speech_demo__reformat;
                
                //  highlight
                $O.cc__speech_demo__highlight = {
                    'settings': { 'imgPath': '[none]' },
                    'debug': false,
                    'window': _r.iframeWindow,
                    'jQuery': _r.iframeWindow.jQuery
                };
                $O.cc__speech_demo__highlight = window.initClearlyComponent__highlight($O.cc__speech_demo__highlight);
                    
                //  speech
                $O.cc__speech_demo__speech = {
                  'settings': { 
                      'key__iSpeech':           '3978df11a257506e97a0ac37b10f955f',
                      'key__googleTranslate':   'AIzaSyAWTU5wG9dASurJBsgZVCRROM2-v_xLDgk',
                      'originalPageCSSClass':   'page'
                  },
                  'callbacks': {
                      'stateChanged': function (_state) { document.getElementById('speech__controls').className = _state; }
                  },
                  'debug': false,
                  'highlightComponentInstance': $O.cc__speech_demo__highlight
                };
                $O.cc__speech_demo__speech = window.initClearlyComponent__speech($O.cc__speech_demo__speech);
            
                //  reference 
                var _s = $O.cc__speech_demo__speech;
                
                //  prepare
                _s.insertCSS();
                _s.insertAudioElementsContainer();
        
                //  init audio
                _s.speech__createAudioElements();
        
                //  remove unused languages
                for (var _l in _s.voices) { if (_s.voices[_l].u) { delete _s.voices[_l]; } }
        
                //  add languages to speech combo
                var _vs = []; for (var _l in _s.voices) { _vs.push({ 'code': _l, 'name': _s.voices[_l].n }); }
                _vs.sort(function (a, b) { return ((a.name < b.name) ? -1 : ((a.name > b.name) ? 1 : 0)); });
                for (var _i=0, _ii=_vs.length; _i<_ii; _i++) { $('#speech_demo__control').append('<option value="'+$O.escape_html(_vs[_i].code)+'">'+$O.escape_html(_vs[_i].name)+'</option>'); }
                
                //  select english
                $('#speech_demo__control').val('en');
        
                //  update frame
                window.setTimeout(function () { $O.cc__speech_demo__reformat__update_demo_text(); }, 250);
            };
            
            
        //  reformat/speech_demo update demo text
        //  =====================================
            $O.cc__speech_demo__reformat__update_demo_text = function()
            {
                //  code
                var _language_code = $('#speech_demo__control').val();
                
                //  load in frame
                $('#preview__speech_demo__contents').attr('src', $O.paths.main + 'options/speech_demo_languages/'+_language_code+'.html');
                
                //  timeout
                window.setTimeout(function ()
                {
                    //  the demo language
                    var _html = $('#preview__speech_demo__contents').contents().find('body').html();
                        _html = _html.replace(/<h6>/gi,   '<h3>');
                        _html = _html.replace(/<\/h6>/gi, '</h3>');
                        
                    //  pause, if playing
                    if ($O.cc__speech_demo__speech.state == 'playing') { $O.cc__speech_demo__speech__doPause(); }
                    
                    //  clear all pages
                    $O.cc__speech_demo__reformat.clearAllPages();
                    
                    //  the demo frame
                    $O.cc__speech_demo__reformat.addNewPage(_html);
                },
                500);
            };
            
            
        //  speech/speech_demo play
        //  =======================
            $O.cc__speech_demo__speech__doPlay = function ()
            {
                //  ref
                var _s = $O.cc__speech_demo__speech;
                
                //  working
                if (_s.state == 'playing') { return; }
                if (_s.state == 'loading') { return; }
                
                //  set speed
                _s.settings.speed = $('#speech_speed__control').val();
                _s.settings.speed = (_s.settings.speed in _s.speeds ? _s.settings.speed : 'normal');
                
                //  set gender
                _s.settings.gender = $('#speech_gender__control').val();
                        
                //  set language
                _s.speech__language = $('#speech_demo__control').val();
                _s.speech__language = (_s.speech__language in _s.voices ? _s.speech__language : 'en');
                
                //  use gender to choose voice
                var _v = _s.voices[_s.speech__language];
                switch (true) {
                    case ((_s.settings.gender == 'male') && ('m' in _v)):   _s.speech__voice = _v.m; break;
                    case ((_s.settings.gender == 'female') && ('f' in _v)): _s.speech__voice = _v.f; break;
                    default:                                                _s.speech__voice = _v[_v.d]; break;
                }
                
                //  reset
                _s.speech__resetAudioElements();
                _s.speech__resetAudioPosition();
        
                //  clear pages
                _s.speech__pages = [];
                
                //  add page
                _s.addPage(_s.document.getElementById('page1'));
        
                //  play
                _s.speech__doPlay();        
            };
        
        
        //  speech/speech_demo pause
        //  ========================
            $O.cc__speech_demo__speech__doPause = function ()
            {
                var _s = $O.cc__speech_demo__speech;
                    _s.speech__doPause();        
            };
            

    })(window.__readable_by_evernote__options__front, window.__readable_by_evernote__options__back);


//  ==========================================================================================================================


//  run
//  ===
    (function ($O, $B) {

        //  vars
        $O.storedLogin = $B.credentials__get();
        $O.paths = { 'main': 'chrome-extension://iooicodkiihhpojmmeghjclgihfjdjhj/', 'evernote': 'https://www.evernote.com/' };

        //  speech
        $O.speech__determine_state();

        //  ui/init
        
        //  flex select
        //  ===========
            $('#text_font__select, #text_font_header__select, #text_font_monospace__select').flexselect({ 'allowMismatch': true, 'inputIdTransform': function (id) { return id.replace('__select', '__control'); } });
        
                    
        //  load values
        //  ===========
            $O.values_put__general();
            $O.values_put__custom();
            $O.values_put__speech();
            $O.values_put__notebooks();
        
        
        //  mini colors
        //  ===========
            $('#color_background__control, #color_text__control, #color_links__control').minicolors({'change': function () { $O.cc__custom_theme__reformat__update(); }});
        
                        
        //  update custom_theme preview
        //  ===========================
            $('#view__custom table.controlTable select').change(function() {    $O.cc__custom_theme__reformat__update(); });
            $('#text_size__control').keyup(function() {                         $O.cc__custom_theme__reformat__update(); });
            $('#box_width__control').keyup(function() {                         $O.cc__custom_theme__reformat__update(); });
            $('#text_line_height__control').keyup(function() {                  $O.cc__custom_theme__reformat__update(); });
            $('#text_font__control').keyup(function() {                         $O.cc__custom_theme__reformat__update(); });
            $('#text_font_header__control').keyup(function() {                  $O.cc__custom_theme__reformat__update(); });
            $('#text_font_monospace__control').keyup(function() {               $O.cc__custom_theme__reformat__update(); });
            $('#custom_css__control').keyup(function() {                        $O.cc__custom_theme__reformat__update(); });
        
        
        //  tabs
        //  ====
            (function ()
            {
                var _all_classes = 'showGeneral showCustom showSpeech showFeatures';
                $('#sidebar__menu__general').click(function() {  $('body').removeClass(_all_classes).addClass('showGeneral');   return false; });
                $('#sidebar__menu__custom').click(function() {   $('body').removeClass(_all_classes).addClass('showCustom');    return false; });    
                $('#sidebar__menu__speech').click(function() {   $('body').removeClass(_all_classes).addClass('showSpeech');    return false; });    
                $('#sidebar__menu__features').click(function() { $('body').removeClass(_all_classes).addClass('showFeatures');  return false; });    
            })();
        
        
        //  dialogs
        //  =======
            $('#sidebar__licenses a').click(function() {  $('body').addClass('showLicenses'); return false; });
            $('#licenses div.overlay').click(function() { $('body').removeClass('showLicenses'); return false; });
            $('#eula div.overlay').click(function() {     $('body').removeClass('showEula'); return false; });
        
        
        //  keyboard shortcuts
        //  ==================
            $('#keys_activation__control, #keys_clip__control, #keys_highlight__control, #keys_speech__control').keydown(function (_event)
            {
                var _key_combo_from_event = $O.get_key_combo_from_event(_event),
                    _key_combo =            _key_combo_from_event._key_combo,
                    _key_code =             _key_combo_from_event._key_code;
        
                switch (true)
                {
                    case (_event.keyCode == 46): $(this).val('');         break; // delete
                    case (_event.keyCode == 8):  $(this).val('');         break; // backspace
                    case (_key_code != 'NONE'):  $(this).val(_key_combo); break;
                }
        
                _event.preventDefault();
                _event.stopPropagation();
            });
        
        
        //  speech demo
        //  ===========
            $('#speech_demo__control').change(function () { $O.cc__speech_demo__reformat__update_demo_text(); });
            $('#speech__controls__play').click(function () { $O.cc__speech_demo__speech__doPlay(); return false; });
            $('#speech__controls__pause').click(function () { $O.cc__speech_demo__speech__doPause(); return false; });
            $('#speech__controls__loading').click(function () { return false; });
        
                        
        //  buttons / save
        //  ==============
            (function ()
            {
                var _spin = function (_spinner)
                {
                    $('#'+_spinner).show();
                    window.setTimeout(function() { $('#'+_spinner).hide(); }, 500);
                };
        
                $('#button__save_general').click(function()
                {
                    /* get */   var _to_save = $O.values_get__general();
                    /* spin */  _spin('button__save_general__spinner');
                    /* save */  $B.storage__set_more(_to_save);
                });
        
                $('#button__save_speech').click(function()
                {
                    /* get */   var _to_save = $O.values_get__speech();
                    /* spin */  _spin('button__save_speech__spinner');
                    /* save */  $B.storage__set_more(_to_save);
                });
                
                $('#button__save_custom').click(function()
                {
                    //  validate
                    if ($O.values_get__validate_custom_theme()) {}else { return; }
        
                    //  spinner    
                    _spin('button__save_custom__spinner');
                
                    //  get
                    var _to_save = {},
                        _custom_values = $O.values_get__custom(),
                        _custom_options_aggregate = '';
                    
                    //  aggregate    
                    for (var _option in _custom_values)
                    {
                        //  apply
                        _to_save[_option] = _custom_values[_option];
                    
                        //  and save
                        _custom_options_aggregate += '' +
                            '['                         +
                               '[='+_option+']'         +
                               '[='+$O.encode(_custom_values[_option])+']' +
                            ']'                         +
                        '';
                    }
                    
                    //  add
                    _to_save['theme'] = 'custom';
                    _to_save['custom_theme_options'] = _custom_options_aggregate;
                
                    //  save
                    $B.storage__set_more(_to_save);
                });
            })();
            
                
                
        //  buttons / misc
        //  ==============
        
            $('#button__reset_custom').click(function()
            {
                //  reset form
                $O.values_put__custom__reset();
                
                //  reset preview
                $O.cc__custom_theme__reformat.applyEncodedOptions($O.values_put__reset_custom_theme);
            });
                
            $('#button__more_options').click(function()
            {
                $('#view__custom__frameAndButtons__container').animate(
                    {'top': '335px' },
                    500,
                    'evernote_clearly__background_show',
                    function ()
                    {
                        $('#view__custom__miscSettings__container').fadeIn(500);
                        $('#button__more_options').hide();
                    });
            });
        
                    
        //  account
        //  =======
            
            $O.account__sign_out = function()
            {
                //  forget
                $B.credentials__forget();
                $B.credentials__deleteUserInfoCache();
        
                //  wait
                $('#account__spinner').show();
                window.setTimeout(function()
                {
                    //  refresh
                    $O.storedLogin = $B.credentials__get();
                    
                    //  reshow
                    $O.account__show_state();
                    
                    //  spinner
                    $('#account__spinner').hide();
                }, 500);
            };
            
            $O.account__show_state = function()
            {
                var _result = '';
                
                //  which
                if ($O.storedLogin)
                {
                    _result = '' +
                        $O.translate('account__sign_out').replace('[=username]', $O.escape_html($O.storedLogin.username)) +
                        '<a href="#" id="account__sign_out">' + $O.translate('account__sign_out_link') + '</a>' +
                        '<div class="saveSpinner" id="account__spinner"></div>' +
                    '';
                    $('#body').attr('logged_into', $O.escape_html($O.storedLogin.server));
                }
                else
                {
                    _result = '<div id="account__signed_out">' + $O.translate('account__signed_out') + '</div>';
                    $('#body').attr('logged_into', 'none');
                }
                
                //  set
                $('#account__container').html(_result);
                
                //  set sign-out link
                $('#account__container #account__sign_out').click(function () { $O.account__sign_out(); return false; });
            };
            
                
        //  qa events
        //  =========
            (function ()
            {
                var _spin__servers = function () {          $('#button__servers__spinner').show();          window.setTimeout(function() { $('#button__servers__spinner').hide(); },          500); };
                var _spin__simulate_chinese = function () { $('#button__simulate_chinese__spinner').show(); window.setTimeout(function() { $('#button__simulate_chinese__spinner').hide(); }, 500); };
            
                $('#button__set__servers_to_stage').click(function () { $O.qa__set_servers_to_stage();   _spin__servers(); });
                $('#button__set__servers_to_live').click(function () {  $O.qa__set_servers_to_live();    _spin__servers(); });
            
                $('#button__set__simulate_chinese_locale').click(function () {          $O.qa__set_simulate_chinese_locale();        _spin__simulate_chinese(); });
                $('#button__set__do_not_simulate_chinese_locale').click(function () {   $O.qa__set_do_not_simulate_chinese_locale(); _spin__simulate_chinese(); });
            })();
        
        
        //  konami
        //  ======
            (function ()
            {
                var konami = new Konami();
                    konami.pattern = '38384040373937396665'; /* no Enter at the end */
                    konami.code = function() { $('body').addClass('showKonami'); };
                    konami.load();
            })();
        
        
        //  translations
        //  ============
            $O.translation__get_items();
            $O.translation__apply();
        
        //  hide speech
        //  ===========
            if ($O.speech__enabled) {}else { $O.speech__hide_everything(); }
            if ($O.speech__demo_enabled) {}else { $O.speech__hide_demo(); }
        
        //  show specific tab
        //  =================
            $('body').removeClass('showCover');
            switch (window.location.hash)
            {
                case '#showCustom': $('body').addClass('showCustom');  break;
                case '#showSpeech': $('body').addClass('showSpeech');  break;
                default:            $('body').addClass('showGeneral'); break;
            }
        
        //  components
        //  ==========
            $O.cc__custom_theme__reformat__init();
            if ($O.speech__demo_enabled) { $O.cc__speech_demo__reformat__init(); }
        
        //  account state
        //  =============
            $O.account__show_state();
        
        
        //  track
chrome.extension.sendMessage({_type: 'to-chrome--track--settings'}); 

    })(window.__readable_by_evernote__options__front, window.__readable_by_evernote__options__back);
