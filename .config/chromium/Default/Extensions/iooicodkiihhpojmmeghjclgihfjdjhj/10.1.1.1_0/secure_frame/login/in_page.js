
//  main
window.__readable_by_evernote__secure = {};

//  on jQuery
$(function () { (function ($R)
{
    
//  import js_anywhere
//  ==================
    (function () {
        
        (function () {
            
            //  var
            //  ===
                var _custom_events = false;
            
            //  code
            //  ====
                (function ()
                {
                
                    var _names_to_keys = {},
                        _keys_to_names = {},
                        _names_to_objects = {},
                        _custom_events_list = [
                    
                            ['to-extension--open--settings',                                  'click-111-111-111-111-1-1-1'],
                            ['to-extension--open--settings--theme',                           'click-112-112-112-112-1-1-1'],
                            ['to-extension--open--settings--speech',                          'click-113-113-113-113-1-1-1'],
                        
                            ['to-extension--open--premium',                                   'click-114-114-114-114-1-1-1'],
                            ['to-extension--open--password-reset',                            'click-115-115-115-115-1-1-1'],
                            ['to-extension--open--two-factor-help',                           'click-116-116-116-116-1-1-1'],
            
                            /* === */
            
                            ['to-extension--select--theme--theme-1',                          'click-121-121-121-121-1-1-1'],
                            ['to-extension--select--theme--theme-2',                          'click-122-122-122-122-1-1-1'],
                            ['to-extension--select--theme--theme-3',                          'click-123-123-123-123-1-1-1'],
                            ['to-extension--select--theme--custom',                           'click-124-124-124-124-1-1-1'],
            
                            ['to-extension--select--size--small',                             'click-125-125-125-125-1-1-1'],
                            ['to-extension--select--size--medium',                            'click-126-126-126-126-1-1-1'],
                            ['to-extension--select--size--large',                             'click-127-127-127-127-1-1-1'],
            
                            ['to-extension--select--related-notes--just-at-bottom',           'click-128-128-128-128-1-1-1'],
                            ['to-extension--select--related-notes--disabled',                 'click-129-129-129-129-1-1-1'],
            
                            /* === */
                        
                            ['to-extension--track--clip',                                     'click-132-132-132-132-1-1-1'],
                            ['to-extension--track--view',                                     'click-131-131-131-131-1-1-1'],
                            ['to-extension--track--theme-popup',                              'click-133-133-133-133-1-1-1'],
                            ['to-extension--track--settings',                                 'click-134-134-134-134-1-1-1'],
                            ['to-extension--track--speech-start',                             'click-135-135-135-135-1-1-1'],
            
                            ['to-extension--track--first-show--check',                        'click-136-136-136-136-1-1-1'],
                            ['to-extension--track--first-show--mark',                         'click-137-137-137-137-1-1-1'],
                        
                            /* === */
                        
                            ['to-extension--evernote--clip',                                  'click-141-141-141-141-1-1-1'],
                            ['to-extension--evernote--clip-highlights',                       'click-142-142-142-142-1-1-1'],
                            ['to-extension--evernote--speech-start',                          'click-143-143-143-143-1-1-1'],
                            ['to-extension--evernote--get-recommendation',                    'click-144-144-144-144-1-1-1'],
            
                         /* ['to-extension--evernote--get-user',                              'click-145-145-145-145-1-1-1'], */
                         /* ['to-extension--evernote--unset-tag',                             'click-146-146-146-146-1-1-1'], */
                         /* ['to-extension--evernote--unset-notebook',                        'click-147-147-147-147-1-1-1'], */
                        
                            ['to-extension--evernote--login--do',                             'click-151-151-151-151-1-1-1'],
                            ['to-extension--evernote--login--do-second-factor',               'click-152-152-152-152-1-1-1'],
                            ['to-extension--evernote--login--request-load--from-outside',     'click-153-153-153-153-1-1-1'],
                            ['to-extension--evernote--login--switch-to-cn',                   'click-154-154-154-154-1-1-1'],
                            ['to-extension--evernote--login--switch-to-in',                   'click-155-155-155-155-1-1-1'],
                        
                         /* ['to-extension--evernote--register--do',                          'click-161-161-161-161-1-1-1'], */
                         /* ['to-extension--evernote--register--request-load--from-outside',  'click-162-162-162-162-1-1-1'], */
                         /* ['to-extension--evernote--register--switch-to-cn',                'click-164-164-164-164-1-1-1'], */
                         /* ['to-extension--evernote--register--switch-to-in',                'click-165-165-165-165-1-1-1'], */
                        
                            /* ========================================================================================= */
                        
                            ['to-browser--evernote--login--show',                             'click-211-211-211-211-1-1-1'],
                            ['to-browser--evernote--login--show--in-frame',                   'click-212-212-212-212-1-1-1'],
                            ['to-browser--evernote--login--request-second-factor',            'click-213-213-213-213-1-1-1'],
                        
                            ['to-browser--evernote--login--set--in',                          'click-214-214-214-214-1-1-1'],
                            ['to-browser--evernote--login--set--in-cn',                       'click-215-215-215-215-1-1-1'],
                            ['to-browser--evernote--login--set--cn',                          'click-216-216-216-216-1-1-1'],
                            ['to-browser--evernote--login--set--cn-in',                       'click-217-217-217-217-1-1-1'],
            
                            ['to-browser--evernote--login--successful',                       'click-221-221-221-221-1-1-1'],
            
                            ['to-browser--evernote--login--failed',                           'click-222-222-222-222-1-1-1'],
                            ['to-browser--evernote--login--failed--username',                 'click-223-223-223-223-1-1-1'],
                            ['to-browser--evernote--login--failed--password',                 'click-224-224-224-224-1-1-1'],
                            ['to-browser--evernote--login--failed--password-reset',           'click-225-225-225-225-1-1-1'],
            
                            ['to-browser--evernote--login--failed--two-factor--code',         'click-226-226-226-226-1-1-1'],
                            ['to-browser--evernote--login--failed--two-factor--timeout',      'click-227-227-227-227-1-1-1'],
            
                            /* === */
                        
                         /* ['to-browser--evernote--register--show',                          'click-231-231-231-231-1-1-1'], */
                         /* ['to-browser--evernote--register--show--in-frame',                'click-232-232-232-232-1-1-1'], */
            
                         /* ['to-browser--evernote--register--set--in',                       'click-234-234-234-234-1-1-1'], */
                         /* ['to-browser--evernote--register--set--in-cn',                    'click-235-235-235-235-1-1-1'], */
                         /* ['to-browser--evernote--register--set--cn',                       'click-236-236-236-236-1-1-1'], */
                         /* ['to-browser--evernote--register--set--cn-in',                    'click-237-237-237-237-1-1-1'], */
            
                         /* ['to-browser--evernote--register--successful',                    'click-241-241-241-241-1-1-1'], */
                         /* ['to-browser--evernote--register--failed',                        'click-242-242-242-242-1-1-1'], */
                        
                            /* === */
            
                            ['to-browser--evernote--speech--go',                              'click-257-257-257-257-1-1-1'],
            
                            ['to-browser--evernote--clip--successful',                        'click-251-251-251-251-1-1-1'],
                            ['to-browser--evernote--clip--failed',                            'click-252-252-252-252-1-1-1'],
            
                            ['to-browser--evernote--clip-highlights--successful',             'click-253-253-253-253-1-1-1'],
                            ['to-browser--evernote--clip-highlights--failed',                 'click-254-254-254-254-1-1-1'],
            
                            ['to-browser--evernote--get-recommendation--successful',          'click-255-255-255-255-1-1-1'],
                            ['to-browser--evernote--get-recommendation--failed',              'click-256-256-256-256-1-1-1'],
                        
                            /* === */
                        
                            ['to-browser--show--dialog-first--all-features',                  'click-261-261-261-261-1-1-1'],
                            ['to-browser--show--dialog-first--new-features',                  'click-262-262-262-262-1-1-1'],
                        
                            ['to-browser--show--dialog-speech--need-login',                   'click-263-263-263-263-1-1-1'],
                            ['to-browser--show--dialog-speech--need-premium',                 'click-264-264-264-264-1-1-1']
                        
                        ];
                
                     /* Explanations for some of the to-extension events:
                     // =================================================
                        to-extension--evernote--login--do:
                            triggered by:   frame -- when button is pressed
                            operates in:    background, frame -- gets the username/password from the frame, and performs a background login
                            triggers:       browser...login--successful/failed/failed--username/failed--password/failed--password-reset
            
                        to-extension--evernote--login--do-second-factor:
                            triggered by:   frame -- when button is pressed, in the "enter code" view
                            operates in:    background, frame -- gets the code from the frame, and performs a background completeLogin
                            triggers:       browser...login--successful/failed--second-factor/failed--second-factor-timeout
            
                        to-extension--evernote--login--request-load--from-outside:
                            triggered by:   html -- after clearly has launched; firefox only
                            operates in:    background -- forces the loading of the url into the frame; and then loads everything else too
                        
                        to-extension--evernote--login--switch-to-cn/in:
                            triggered by:   frame -- when user clicks on china/international toggle
                            operates in:    background -- switches the background china-mode on/off
                            triggers:       browser...login--set--in/in-cn/cn/cn-in
                     */   
                
                     /* Explanations for some of the to-browser events:
                     // ===============================================
                        to-browser--evernote--login--show:
                            triggered by:   background -- when it detects that login is needed; should be triggered after login-show--in-frame
                            operates in:    html -- shows the login dialog
            
                        to-browser--evernote--login--show--in-frame:
                            triggered by:   background -- when it detects that login is needed; should be triggered before login-show
                            operates in:    frame -- does stuff inside the login frame; like, for example, clear the errors from last time
            
                        to-browser--evernote--login--request-second-factor:
                            triggered by:   background -- when it detects that second factor is needed
                            operates in:    frame -- does stuff inside the login frame: shows the second-factor view
                            
                        to-browser--evernote--login--set--in/in-cn/cn/cn-in:
                            triggered by:   background -- after a request has been sent from the frame, the background performs switch, and responds with this event
                            operates in:    frame -- switches around the on/off toggles for china/international
                            
                        to-browser--evernote--login--failed/failed--username/failed--password
                            triggered by:   background -- after the login button was pressed in the frame, it sent an event to the background, which tried to login with the supplied details; the background is now responding with this event
                            operates in:    frame -- frame will display the error
            
                        to-browser--evernote--login--failed--password-reset/two-factor
                            triggered by:   background -- after the login button was pressed in the frame, it sent an event to the background, which tried to login with the supplied details; the background is now responding with this event
                            operates in:    html -- display error dialog for password reset
                            
                        to-browser--evernote--login--successful:
                            triggered by:   background; same as above
                            operates in:    html -- will hide the login dialog, and continue performing whatever operation is was trying to do before
                     */
            
                    
                    //  fill in event objects
                    //  =====================
                        for (var i=0,_i=_custom_events_list.length,e=false,k=false; i<_i; i++)
                        {
                            e = _custom_events_list[i];
                            k = e[1].split('-');
                    
                            _names_to_keys[e[0]] = e[1];
                            _keys_to_names[e[1]] = e[0];
                            _names_to_objects[e[0]] = {
                                '_1': k[1],
                                '_2': k[2],
                                '_3': k[3],
                                '_4': k[4],
                                '_5': (k[5] == 1 ? true : false),
                                '_6': (k[6] == 1 ? true : false),
                                '_7': (k[7] == 1 ? true : false)
                            };
                        }
                    
                    
                    //  define _get_gey function
                    //  ========================
                        var _get_key = function (_event)
                        {
                            return ''                           +
                                'click'                         +
                                '-'+_event.screenX              +
                                '-'+_event.screenY              +
                                '-'+_event.clientX              +
                                '-'+_event.clientY              +
                                '-'+(_event.ctrlKey ?   1 : 0)  +
                                '-'+(_event.altKey ?    1 : 0)  +
                                '-'+(_event.shiftKey ?  1 : 0)  +
                            '';
                        };
                
                
                    //  define _dispatch function
                    //  =========================
                        var _dispatch = function (_custom_event_object, _window)
                        {
                            var _d = _window.document,
                                _e = _d.createEvent("MouseEvents");
                    
                            _e.initMouseEvent(
                                "click", true, true, _window, 0, 
                                _custom_event_object['_1'], 
                                _custom_event_object['_2'], 
                                _custom_event_object['_3'], 
                                _custom_event_object['_4'], 
                                _custom_event_object['_5'], 
                                _custom_event_object['_6'], 
                                _custom_event_object['_7'], 
                                false, 0, null);
                    
                            _d.dispatchEvent(_e);
                        };
                
                
                    //  define custom events object
                    //  ===========================
                        _custom_events = {
                            'names_to_keys':    _names_to_keys,
                            'keys_to_names':    _keys_to_names,
                            'names_to_objects': _names_to_objects,
                            
                            'get_key':          _get_key,
                            'dispatch':         _dispatch
                        };
                    
                    
                    //  return
                        return;
                        
                })();
            
            /* =============== */
            $R.custom_events = _custom_events;
            $R.custom_events__dispatchToBackground = function (_name) { $R.custom_events.dispatch($R.custom_events.names_to_objects['to-extension--'+_name], $R.window); };
        })();
        
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
            $R.escape_html = _escape_html;
            $R.unescape_html = _unescape_html;
            $R.encode =      _encode;
            $R.decode =      _decode;
        })();

        (function () {
            
            //  translations
            //  ============
                var _translations_in_page = {
                    'menu__close__tooltip':                         'Hide the overlay.',
                    'menu__clip_to_evernote__tooltip':              'Clip to Evernote.',
                    'menu__highlight_to_evernote__tooltip':         'Highlight.',
                    'menu__print__tooltip':                         'Print.',
                    'menu__settings__tooltip':                      'Show Themes.',
                    'menu__fitts__tooltip':                         'Hide the overlay.',
                    'menu__speak__tooltip':                         'Text To Speech',
                    'menu__speak__play__tooltip':                   'Play',
                    'menu__speak__pause__tooltip':                  'Pause',
                    'menu__speak__forward__tooltip':                'Go Forwards',
                    'menu__speak__rewind__tooltip':                 'Go Backwards',
                    
                    /* === */
                    
                    'rtl__main__label':                             'Text direction?',
                    'rtl__ltr__label':                              'Left-to-right',
                    'rtl__rtl__label':                              'Right-to-left',
            
                    /* === */
                    
                    'blank_error__heading':                         'Tips for using Evernote Clearly',
                    'blank_error__body':                            'Clearly is currently designed to work on article pages. An article page is any page that contains one large block of text -- like, for example, a newspaper article or blog post.',
            
                    /* === */
                    
                    'related_notes__title':                         'Related Notes',
                    'related_notes__disable_short':                 'Disable?',
                    'related_notes__disable_long':                  'Do you want to disable Related Notes?',
            
                    /* === */
            
                    'filing_info__title_normal':                    'Filed in:',
                    'filing_info__title_smart':                     'Smart Filed in:',
                    'filing_info__default_notebook':                'Default',
                    'filing_info__view':                            'View',
                    'filing_info__edit':                            'Edit',
                    'filing_info__sentence':                        'Clipped into the [=notebook] notebook, and tagged with [=tags].',
                    'filing_info__sentence_no_tags':                'Clipped into the [=notebook] notebook.',
                    'filing_info__sentence_and':                    'and',
                    'filing_info__sentence_other_tags':             'other tags',
            
                    /* === */
                    
                    'evernote_clipping':                            'Clipping...',
                    'evernote_clipping_failed':                     'Clipping failed.',
                    
                    'evernote_login__heading':                      'Sign in to Evernote',
                    'evernote_login__spinner':                      'Signing in to Evernote',
                    'evernote_login__create_account':               'Create an account',
                    'evernote_login__button_do__label':             'Sign in',
                    'evernote_login__button_cancel__label':         'Cancel',
                    
                    'evernote_login__username__label':              'Evernote Username or Email Address',
                    'evernote_login__password__label':              'Password',
                    'evernote_login__rememberMe__label':            'Remember me',
            
                    'evernote_login__username__error__required':    'Username is required.',
                    'evernote_login__username__error__length':      'Username must be between 1 and 64 characters long.',
                    'evernote_login__username__error__format':      'Username contains bad characters.',
                    'evernote_login__username__error__invalid':     'Not a valid, active user.',
                    
                    'evernote_login__password__error__required':    'Password is required.',
                    'evernote_login__password__error__length':      'Password must be between 6 and 64 characters long.',
                    'evernote_login__password__error__format':      'Password contains bad characters.',
                    'evernote_login__password__error__invalid':     'Username and password do not match existing user.',
                    'evernote_login__password__error__timeout':     'Login session timed-out. Please try again.',
            
                    'evernote_login__password__error__reset':       'Your password has expired. Please reset it now.',
                    'evernote_login__general__error':               'Authentication failed.',
            
                    'evernote_two_factor__message__sms':            'We sent a text message with a verification code to',
                    'evernote_two_factor__message__google':         'Enter the verification code displayed in your Google Authenticator app.',
            
                    'evernote_two_factor__code__label':             'Verification code',
                    'evernote_two_factor__code__error__required':   'Verification code is required.',
                    'evernote_two_factor__code__error__length':     'Verification code should be at least 6 characters long.',
                    'evernote_two_factor__code__error__format':     'Verification code should be only numbers.',
                    'evernote_two_factor__code__error__invalid':    'Verification code is incorrect.',
                    
                    'evernote_two_factor__button_do__label':        'Verify',
                    'evernote_two_factor__button_help__label':      'I need help getting a verification code',
            
                    /* === */
            
                    'settings__theme__1__not_translated':           'Newsprint',
                    'settings__theme__2__not_translated':           'Notable',
                    'settings__theme__3__not_translated':           'Night Owl',
                    
                    'settings__theme__1':                           'Newsprint',
                    'settings__theme__2':                           'Notable',
                    'settings__theme__3':                           'Night Owl',
                    'settings__theme__custom':                      'Custom',
                    
                    'settings__fontSize__small':                    'small',
                    'settings__fontSize__medium':                   'medium',
                    'settings__fontSize__large':                    'large',
                    
                    /* === */
                    
                    'features__title__new':                         'You have a new version of Evernote Clearly!',
                    'features__title__all':                         'Welcome to the new Evernote Clearly',
            
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
                    
                    'features__clipping__title':                    'Clip to Evernote',
                    'features__clipping__text':                     'Save what you\'re reading to your Evernote account with one click. Access clips from any device, anytime in Evernote.',
            
                    'features__highlighting__title':                'Highlighting',
                    'features__highlighting__text':                 'Highlight text you want to remember & quickly find it in your Evernote account. Highlighting changes you make in Clearly will be updated in your Evernote account automatically.',
            
                    'features__related_notes__title':               'Related Notes',
                    'features__related_notes__text':                'Magically rediscover notes from your Evernote account that are related to the page you are viewing. Related Notes are displayed at the bottom of the article or on the right side if space permits.',
            
                    'features__smart_filing__title':                'Smart Filing',
                    'features__smart_filing__text':                 'Automatically assign tags to your Web clips and saves them to the appropriate notebook, so you don\'t have to.',
                    
                    'features__eula_notice':                        'By using Clearly, you agree to our [=eula].',
                    'features__close2':                             'Close',
            
                    /* === */
                    
                    'misc__page':    'page'
                };    
            
            /* =============== */
            //  translated strings may have &stuff; in them
            $R.translation__items = _translations_in_page;
            $R.translate = function (_key) { var _r = $R.translation__items[_key]; return $R.escape_html($R.unescape_html(_r ? _r : _key)); };    
        })();

    })();


//  import _js_in_background/
//  =========================
    (function () {

        
        //  options
        //  =======
            $R.from_background__options = function ()
            {
                $R.options = {};
                for (var _x in $R.default_options)
                {
                    var _value = $R.decode($R.$document.find('#evernote_clearly__serialized__option__'+_x).html());
                    $R.options[_x] = (_value > '' ? _value : $R.default_options[_x]);
                }
            };
        
            
        //  vars
        //  ====
            $R.from_background__vars = function ()
            {
                $R.vars = {};
                for (var _x in $R.default_vars)
                {
                    var _value = $R.decode($R.$document.find('#evernote_clearly__serialized__var__'+_x).html());
                    $R.vars[_x] = (_value > '' ? _value : $R.default_vars[_x]);
                }
            };
            
        
        //  translation
        //  ===========
            $R.from_background__translation = function ()
            {
                //  $R.translation__items is already defined
                for (var _x in $R.translation__items)
                {
                    var _value = $R.decode($R.$document.find('#evernote_clearly__serialized__translation__'+_x).html());
                    if (_value > '') { $R.translation__items[_x] = _value; }
                }
            };
        
    
    })();


//  ==========================================================================================================================

    
//  import this
//  ===========
    (function () {

        
        //  dialog
        //  ======
            $R.create_dialog = function ()
            {
                $('#sidebar_dialogs').html('' +
                '<div class="dialog" id="dialog__clip__login"><div class="dialog_canvas">' +
                    '<div id="evernote_login__container" class="theFont">' +
                        '<div id="evernote_login__container_which">' +
        
                            '<div id="evernote_two_factor">' +
        
                                 '<div id="evernote_two_factor__message__google" class="evernote_two_factor__message">' +
                                    $R.translate('evernote_two_factor__message__google') +
                                    '<div class="evernote_two_factor__img"></div>' +
                                '</div>' +
                                 '<div id="evernote_two_factor__message__sms" class="evernote_two_factor__message">' +
                                    $R.translate('evernote_two_factor__message__sms') +
                                    ' <span id="evernote_two_factor__message__sms__number"></span>' +
                                    '<div class="evernote_two_factor__img"></div>' +
                                '</div>' +
        
                                 '<input id="evernote_two_factor__code" class="dialogInput theFont" type="text" maxlength="64" tabindex="1" value=""/>' +
                                 '<label id="evernote_two_factor__code__label" class="dialogInput">' + $R.translate('evernote_two_factor__code__label') + '</label>' +
                                 '<div id="evernote_two_factor__code__error" class="dialogInput dialogError"></div>' +
        
                                '<input id="evernote_two_factor__button_do" type="button" class="dialogButton theFont" tabindex="4" value="' + $R.translate('evernote_two_factor__button_do__label') + '"/>' +
        
                                 '<a class="theFont" id="evernote_two_factor__help" href="#">' + $R.translate('evernote_two_factor__button_help__label') + '</a>' +
        
                            '</div>' +
            
                            '<a class="loginLogo" id="evernote_login__logo__in" href="https://www.evernote.com/" target="_blank"></a>' +
                            '<a class="loginLogo" id="evernote_login__logo__cn" href="https://app.yinxiang.com/" target="_blank"></a>' +
                            '<div id="evernote_login__spinner"></div>' +
        
                             '<a class="registerLink theFont" id="evernote_login__register__in" href="https://www.evernote.com/Registration.action?code=' + 'clearly' + '" target="_blank">' + $R.translate('evernote_login__create_account') + '</a>' +
                             '<a class="registerLink theFont" id="evernote_login__register__cn" href="https://app.yinxiang.com/Registration.action?code=' + 'clearly' + '" target="_blank">' + $R.translate('evernote_login__create_account') + '</a>' +
        
                             '<input id="evernote_login__username" class="dialogInput theFont" type="text" maxlength="64" tabindex="1" value=""/>' +
                             '<label id="evernote_login__username__label" class="dialogInput">' + $R.translate('evernote_login__username__label') + '</label>' +
                             '<div id="evernote_login__username__error" class="dialogInput dialogError"></div>' +
        
                             '<input id="evernote_login__password" class="dialogInput theFont" type="password" maxlength="64" tabindex="2" value=""/>' +
                             '<label id="evernote_login__password__label" class="dialogInput">' + $R.translate('evernote_login__password__label') + '</label>' +
                             '<div id="evernote_login__password__error" class="dialogInput dialogError"></div>' +
        
                             '<a class="loginSwitcher theFont" id="evernote_login__switch_to_cn" href="#">&#20999;&#25442;&#21040; &#21360;&#35937;&#31508;&#35760;</a>' +
                             '<a class="loginSwitcher theFont" id="evernote_login__switch_to_in" href="#">&#20999;&#25442;&#21040; Evernote &#22269;&#38469;&#29256;</a>' +
        
                             '<input id="evernote_login__button_do" type="button" class="dialogButton theFont" tabindex="4" value="' + $R.translate('evernote_login__button_do__label') + '"/>' +
        
                             '<div id="evernote_login__rememberMe__container" class="theFont" style="display: none;">' +
                                 '<input id="evernote_login__rememberMe" type="checkbox" tabindex="3" value="1" checked="false"/>' +
                                '<label for="evernote_login__rememberMe">' + $R.translate('evernote_login__rememberMe__label') + '</label>' +
                            '</div>' +
            
                        '</div>' +
                    '</div>' +
                '</div>' +
                '');
            };
        
        
        //  custom events
        //  =============
            $R.bind__custom_events = function ()
            {
                $R.document.addEventListener('click', function(_event)
                {
                    //  vars
                    var _event_key = $R.custom_events.get_key(_event),
                        _event_name = $R.custom_events.keys_to_names[_event_key],
                        _stop = false;
                
                    //  invalid    
                    if (_event_name) {}else { return; }
        
                    //  other
                    if (_event_name.indexOf('to-browser--') === 0) {}else { return; }
        
                    //  vars
                    var _short_event_name = _event_name.substr('to-browser--'.length);
                
                    //  which event?
                    switch (_short_event_name)
                    {
                        case 'evernote--login--set--in':
                        case 'evernote--login--set--in-cn':
                        case 'evernote--login--set--cn':
                        case 'evernote--login--set--cn-in':
        
                            var _class = '';            
                            switch (_short_event_name)
                            {
                                case 'evernote--login--set--in':    _class = _short_event_name.substr(-2); break;
                                case 'evernote--login--set--cn':    _class = _short_event_name.substr(-2); break;
                                case 'evernote--login--set--in-cn': _class = _short_event_name.substr(-5).replace(/-/g, '_').toLowerCase(); break;
                                case 'evernote--login--set--cn-in': _class = _short_event_name.substr(-5).replace(/-/g, '_').toLowerCase(); break;
                            }
                                
                            //  set?
                            if (_class > '') { $('#evernote_login__container_which').attr('class', _class); }
        
                            //  end
                            _stop = true;
                            break;
        
        
                        case 'evernote--login--request-second-factor':
                    
                            //  clear login
                            $('#evernote_login__container').removeClass('showSpinner showUsernameError showPasswordError showCodeError').addClass('twoFactor');
        
                            //  move focus from password
                            $('#evernote_login__password').blur();
        
                            //  clear fields
                            $('#evernote_two_factor__code').val('');
                            $('#evernote_two_factor__code').blur();
                        
                            //  sms or google?
                            if ($('#evernote_two_factor__message__sms__number').html().match(/^[\s\n\r\t]*$/) != null) { $('#evernote_two_factor__message__sms').hide(); }
                        
                            //  end
                            _stop = true;
                            break;
        
                        case 'evernote--login--show--in-frame':
                    
                            //  clear login
                            $('#evernote_login__container').removeClass('twoFactor showSpinner showUsernameError showPasswordError');
        
                            //  clear fields
                            $('#evernote_login__username').val('');
                            $('#evernote_login__username').blur();
                            $('#evernote_login__password').val('');
                            $('#evernote_login__password').blur();
                        
                            //  end
                            _stop = true;
                            break;
        
                        case 'evernote--login--failed':
                            //  set error
                            $('#evernote_login__password__error').html($R.translate('evernote_login__general__error'));
                            //  show error
                            $('#evernote_login__container').removeClass('showSpinner twoFactor').addClass('showPasswordError');
                            //  end
                            _stop = true;
                            break;
                    
                        case 'evernote--login--failed--username':
                            //  set error
                            $('#evernote_login__username__error').html($R.translate('evernote_login__username__error__invalid'));
                            //  show error
                            $('#evernote_login__container').removeClass('showSpinner').addClass('showUsernameError');
                            //  end
                            _stop = true;
                            break;
                    
                        case 'evernote--login--failed--password':
                            //  set error
                            $('#evernote_login__password__error').html($R.translate('evernote_login__password__error__invalid'));
                            //  show error
                            $('#evernote_login__container').removeClass('showSpinner').addClass('showPasswordError');
                            //  end
                            _stop = true;
                            break;
        
                        case 'evernote--login--failed--two-factor--code':
                            //  set error
                            $('#evernote_two_factor__code__error').html($R.translate('evernote_two_factor__code__error__invalid'));
                            //  show error
                            $('#evernote_login__container').removeClass('showSpinner').addClass('showCodeError');
                            //  end
                            _stop = true;
                            break;
        
                        case 'evernote--login--failed--two-factor--timeout':
                            //  set error
                            $('#evernote_login__password__error').html($R.translate('evernote_login__password__error__timeout'));
                            //  show error
                            $('#evernote_login__container').removeClass('showSpinner twoFactor').addClass('showPasswordError');
                            //  end
                            _stop = true;
                            break;
                    }
            
                    //  stop
                    if (_stop) { _event.stopPropagation(); _event.preventDefault(); }
            
                }, true);
            };
        
        
        //  events
        //  ======
            $R.bind__ui_events = function ()
            {
                //  click labels => show inputs
                $('#evernote_login__username__label').click(function ()  { $('#evernote_login__username__label').hide();  $('#evernote_login__username').get(0).focus();  return false; });
                $('#evernote_login__password__label').click(function ()  { $('#evernote_login__password__label').hide();  $('#evernote_login__password').get(0).focus();  return false; });
                $('#evernote_two_factor__code__label').click(function () { $('#evernote_two_factor__code__label').hide(); $('#evernote_two_factor__code').get(0).focus(); return false; });
        
                //  leave input => show labels
                $('#evernote_login__username').blur(function ()  { if ($('#evernote_login__username').val() == '')  { $('#evernote_login__username__label').show();  } return false; });
                $('#evernote_login__password').blur(function ()  { if ($('#evernote_login__password').val() == '')  { $('#evernote_login__password__label').show();  } return false; });
                $('#evernote_two_factor__code').blur(function () { if ($('#evernote_two_factor__code').val() == '') { $('#evernote_two_factor__code__label').show(); } return false; });
        
                //  click errors => show inputs
                $('#evernote_login__username__error').click(function ()  { $('#evernote_login__container').removeClass('showUsernameError'); $('#evernote_login__username__label').hide();  $('#evernote_login__username').get(0).focus();  return false; });
                $('#evernote_login__password__error').click(function ()  { $('#evernote_login__container').removeClass('showPasswordError'); $('#evernote_login__password__label').hide();  $('#evernote_login__password').get(0).focus();  return false; });
                $('#evernote_two_factor__code__error').click(function () { $('#evernote_login__container').removeClass('showCodeError');     $('#evernote_two_factor__code__label').hide(); $('#evernote_two_factor__code').get(0).focus(); return false; });
        
                //  click button
                $('#evernote_login__button_do').click(function() { $R.evernoteLogin__submit(); return false; });
                $('#evernote_two_factor__button_do').click(function() { $R.evernoteLogin__submitSecondFactor(); return false; });
            
                //  enter to submit
                $('#evernote_login__username, #evernote_login__password').keydown(function (_event) { if (_event.keyCode == '13') { $R.evernoteLogin__submit(); return false; } });
                $('#evernote_two_factor__code').keydown(function (_event) { if (_event.keyCode == '13') { $R.evernoteLogin__submitSecondFactor(); return false; } });
            
                //  tab -- to password; to code
                $('#evernote_login__username').keydown(function (_event) { if (_event.keyCode == '9') { $('#evernote_login__container').removeClass('showPasswordError'); $('#evernote_login__password__label').hide(); $('#evernote_login__password').get(0).focus(); return false; } });
                $('#evernote_login__password').keydown(function (_event) { if (_event.keyCode == '9' && $('#evernote_container').hasClass('twoFactor')) { $('#evernote_two_factor__code').get(0).focus(); return false; } });
            
                //  switchers
                $('#evernote_login__switch_to_cn').click(function() { $R.custom_events__dispatchToBackground('evernote--login--switch-to-cn'); return false; });
                $('#evernote_login__switch_to_in').click(function() { $R.custom_events__dispatchToBackground('evernote--login--switch-to-in'); return false; });
            
                //  two factor help
                $('#evernote_two_factor__help').click(function() { $R.custom_events__dispatchToBackground('open--two-factor-help'); return false; });
        
                //  submit
                $R.evernoteLogin__submit = function ()
                {
                    var _username = $('#evernote_login__username').val(),
                        _password = $('#evernote_login__password').val();
        
                    //  remove errors
                    $('#evernote_login__container').removeClass('showUsernameError showPasswordError');
        
                    // check username
                    switch (true)
                    {
                        case (!(_username.length >= 1)):
                            $('#evernote_login__username__error').html($R.translate('evernote_login__username__error__required'));
                            $('#evernote_login__container').addClass('showUsernameError');
                            return;
                        
                        case (!(_username.length <= 64)):
                            $('#evernote_login__username__error').html($R.translate('evernote_login__username__error__length'));
                            $('#evernote_login__container').addClass('showUsernameError');
                            return;
                        
                        case (!(/^[a-z0-9]([a-z0-9_-]{0,62}[a-z0-9])?$/gi.test(_username))):
                            //    using email instead
                            if (_username.indexOf('@') > -1 && _username.indexOf(' ') == -1) { break; }
                        
                            //    do error
                            $('#evernote_login__username__error').html($R.translate('evernote_login__username__error__format'));
                            $('#evernote_login__container').addClass('showUsernameError');
                            return;
                    }
        
                    // check password
                    switch (true)
                    {        
                        case (!(_password.length >= 1)):
                            $('#evernote_login__password__error').html($R.translate('evernote_login__password__error__required'));
                            $('#evernote_login__container').addClass('showPasswordError');
                            return;
        
                        case (!(_password.length >= 6)):
                        case (!(_password.length <= 64)):
                            $('#evernote_login__password__error').html($R.translate('evernote_login__password__error__length'));
                            $('#evernote_login__container').addClass('showPasswordError');
                            return;
                        
                        case (!(/^[A-Za-z0-9!#$%&'()*+,.\/:;<=>?@^_`{|}~\[\]\\-]{6,64}$/gi.test(_password))):
                            $('#evernote_login__password__error').html($R.translate('evernote_login__password__error__format'));
                            $('#evernote_login__container').addClass('showPasswordError');
                            return;
                    }
                
                    //  spinner
                    $('#evernote_login__container').addClass('showSpinner');
            
                    //  event
                    $R.custom_events__dispatchToBackground('evernote--login--do');
                };
        
        
                $R.evernoteLogin__submitSecondFactor = function ()
                {
                    var _code = $('#evernote_two_factor__code').val();
                
                    //  remove errors
                    $('#evernote_login__container').removeClass('showCodeError');
        
                    // check username
                    switch (true)
                    {
                        case (!(_code.length >= 1)):
                            $('#evernote_two_factor__code__error').html($R.translate('evernote_two_factor__code__error__required'));
                            $('#evernote_login__container').addClass('showCodeError');
                            return;
                        
                        case (!(_code.length >= 6)):
                            $('#evernote_two_factor__code__error').html($R.translate('evernote_two_factor__code__error__length'));
                            $('#evernote_login__container').addClass('showCodeError');
                            return;
                        
                        case (!(/^([0-9-])+$/gi.test(_code))):
                            $('#evernote_two_factor__code__error').html($R.translate('evernote_two_factor__code__error__format'));
                            $('#evernote_login__container').addClass('showCodeError');
                            return;
                    }
        
                    //  spinner
                    $('#evernote_login__container').addClass('showSpinner');
            
                    //  event
                    $R.custom_events__dispatchToBackground('evernote--login--do-second-factor');
                };
            };
    
    })();


//  ==========================================================================================================================


//  run
//  ===
    (function () {
    
        //  vars
        $R.window = window;
        $R.$window = $($R.window);
        $R.document = document;
        $R.$document = $($R.document);
        
        //  get translation        
        $R.from_background__translation();

        //  get vars/options
        $R.from_background__options();
        $R.from_background__vars();

        //  do
        $R.create_dialog();
        $R.bind__custom_events();
        $R.bind__ui_events();
        
    })();

})(window.__readable_by_evernote__secure); });
