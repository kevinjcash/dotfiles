var do_bgiconinput=!0;
function popupfill_create_iframe(a,b,c,d,f,e,g){if(do_experimental_popupfill){b=parseInt(b)+"px";c=parseInt(c)+"px";var h=a.body;a=a.createElement("iframe");a.id=LPMAGICIFRAME+d;a.name=LPMAGICIFRAME+d;a.src=g_isie?"https://0.lastpass.com/#framesrc=LPMAGIC":urlprefix+"popupfilltab.html";0>parseInt(b)&&(b="0px");0>parseInt(c)&&(c="0px");dotrans?(g_frame_css_str="display:block; position:absolute !important; visibility:visible !important; z-index:"+CLICKABLE_ICON_ZINDEX+" !important; border-style:none !important;","undefined"!=
typeof g_isie&&g_isie&&(g_frame_css_str+="background-color:transparent !important;background-image:none !important;")):g_frame_css_str="display:block; position:absolute !important; visibility:visible !important; z-index:"+CLICKABLE_ICON_ZINDEX+" !important; border-style:solid !important; border-color: #4c4c4c !important; border-width:1px !important; border-radius: 4px 4px; -moz-border-radius: 4px; -webkit-border-radius: 4px; box-shadow: 1px rgba(200, 200, 200, 0.5); -webkit-box-shadow: 1px 1px rgba(200, 200, 200, 0.5); -moz-box-shadow: 1px 1px rgba(200, 200, 200, 0.5);";
a.style.cssText=g_frame_css_str;h.appendChild(a);a.width=parseInt(e)+"px";a.height="26px";"undefined"!=typeof f&&0<f&&(a.height=24*f+23+"px");a.height=0<parseInt(g)?parseInt(g)+"px":parseInt(a.height)+"px";d=parseInt(a.width)+"px";f=parseInt(a.height)+"px";a.style.cssText=g_frame_css_str+("width: "+d+" !important; height: "+f+" !important; top:"+c+" !important; left:"+b+" !important; ")}}
function weasel(a){g_ctr_weasel++;if(do_experimental_popupfill){if("undefined"==typeof a||!1==a||!0==a||5>a)a=200;g_weaseled=!0;popupfill_resize();g_weasel_id=setTimeout(function(){weasel(a)},a)}}function end_weasel(){do_experimental_popupfill&&null!=g_weasel_id&&(clearTimeout(g_weasel_id),g_weasel_id=null,verbose_log("clearTimeout weasel"),g_weaseled=!1)}
function handle_form_text_change(a,b,c,d){if(do_experimental_popupfill&&(a||(a=g_isfirefox&&LP?LP.getBrowser().contentDocument:document),a&&!(null==c||null==b||null==d||null==d.keyCode)&&"lpwebsiteeventform"!=c.name&&"lpmanualform"!=c.name&&popupfill_shoulddofield(a,b,SHOULD_DO_ALWAYS))){d=b.value;var f=LP_pickFieldName(a,b);if(g_clickable_input_on_password){var e=g_popup_active_username,g=g_popup_active_password;null==e&&(e="undefined"==typeof b.form||null==b.form?doc_get_orphan_username(a):form_get_username(a,
b.form));null==g&&(g="undefined"==typeof b.form||null==b.form?doc_get_orphan_password(a):form_get_password(a,b.form));var h=checkDocumentForLoginOrphans(a),h=chk_form_has_password(a,c)||h,l=chk_form_is_nonlogin_form(a,c),m=chk_form_ask_generate(a,c);if(e&&g&&(h||m)&&!l){if(b!=e){b==g?(g_isie||(d=e.value,sendBG({cmd:"popupfillinputsave",inputstr:d,inputid:f,inputtype:"password"})),verbose_log("KEYPASS4 username="+d)):(g_isie||sendBG({cmd:"popupfillinputsave",inputstr:"",inputid:f}),verbose_log('KEYPASS5 username=""'));
return}}else{g_isie||(sendBG({cmd:"popupfillinputsave",inputstr:"",inputid:f}),verbose_log('KEYPASS6 formfill? username=""'));return}}if(null==d||0==d.length)g_isie||sendBG({cmd:"popupfillinputsave",inputstr:"",inputid:f}),verbose_log("KEYPASS7 empty username");else{var e=0,k;for(k in g_autofillsites)e++;if(!(0>=e)||g_change_icon_on_input){k=0;var e=null,j;for(j in g_autofillsites)0==g_autofillsites[j].useusername.indexOf(d)&&(k++,e=g_autofillsites[j]);if(1==k)do_autofill_if_matched?g_isie||sendBG({cmd:"autofillaid",
aid:e.aid}):(g_isie||sendBG({cmd:"popupfillinputsave",inputstr:d,inputid:f,inputtype:b.type,issaveall:issaveall(c)}),verbose_log("KEYPASS8 match>0 username="+d));else if(g_isie||sendBG({cmd:"popupfillinputsave",inputstr:d,inputid:f,inputtype:b.type,issaveall:issaveall(c)}),verbose_log("KEYPASS9 match>1 username="+d),chk_form_has_password(a,c),g_change_icon_on_input&&(b=c.elements,"undefined"!=typeof Math&&(c=Math.floor(1E4*Math.random()),null!=b)))for(j=0;j<b.length&&!(d=b[j],checkIsDisplayed(a,d,
0,null,c)&&isInputFieldPassword(a,d)&&null!=d.value&&0<d.value.length);j++);}}}}function issaveall(a){a=a.elements;for(var b=0,c=0,d=0,f=0;f<a.length;f++){var e=a[f].type;"password"==e?c++:"text"==e||"tel"==e||"email"==e?b++:"textarea"==e&&d++}return 1==b&&1==c&&0==d?!1:!0}
function relocate_popupfill_iframes(a,b){if(do_experimental_popupfill){if(!a)return null;var c,d=null,f=a.getElementsByTagName("iframe");for(c=0;c<f.length;c++){var e=f[c],d=null;if("undefined"!=typeof e.id&&null!=e.id){var g=LPMAGICIFRAME;if(0==e.id.indexOf(g)){var g=e.id.substr(g.length),g=LP_getElementByIdOrName(a,g),h=!b;if(null!=g&&lpIsVisible(g,h)){if(h=calculate_iframe_pos(a,g,0<g_minwidth_override?g_minwidth_override:0),null!=h){var g=h.posx,l=h.posy,h=parseInt(g)+"px",m=parseInt(l)+"px",
k=0;if(0<parseInt(g_minwidth_override)){var k=Math.max(parseInt(g_popupfill_iframe_width_save),parseInt(g_minwidth_override))+"px",j=LP_getWindowWidth(window);if(!j)continue;parseInt(k)+parseInt(h)>j&&(h=j-parseInt(k)-20+"px")}else 0<parseInt(g_popupfill_iframe_width_save)?k=parseInt(g_popupfill_iframe_width_save)+"px":(null==d&&(d="undefined"!=typeof window.getComputedStyle?window.getComputedStyle(e):e.currentStyle),k=d.width);0>parseInt(h)&&(h="0px");j=0;0<parseInt(g_minheight_override)?j=Math.max(parseInt(g_popupfill_iframe_height_save),
parseInt(g_minheight_override))+"px":""!=g_popupfill_iframe_height_save&&0<parseInt(g_popupfill_iframe_height_save)?j=parseInt(g_popupfill_iframe_height_save)+"px":(null==d&&(d="undefined"!=typeof window.getComputedStyle?window.getComputedStyle(e):e.currentStyle),j=d.height);if(g_iframe_scroll_hack&&!g_frame_scrollable_set){var d=parseInt(j),p=parseInt(k),n;n="undefined"!=typeof window.getComputedStyle?window.getComputedStyle(a.body):"undefined"!=typeof a.documentElement?a.documentElement.currentStyle:
a.body.currentStyle;parseInt(n.height);parseInt(n.width);n=window.innerHeight;var q=window.innerWidth;if(null!=d&&0<d&&null!=n&&0<n||null!=p&&0<p&&null!=q&&0<q)if(parseInt(l)+d>n||parseInt(g)+p>q){g=!1;try{window.self!=window.top&&(g=!0)}catch(r){g=!0}g&&(g_isie||(verbose_log("ensuring this frame/iframe has scrolling enabled"),sendBG({cmd:"iframescrollenable",href:a.location.href})),g_frame_scrollable_set=!0)}}if("NaNpx"==m||""===m||"NaNpx"==h||""===h||"Nanpx"==k||""===k||"Nanpx"==j||""===j)verbose_log("invalid iframe pos"),
closepopupfills(a);e.style.cssText=g_frame_css_str+("width: "+k+" !important; height: "+j+" !important; top:"+m+" !important; left:"+h+" !important; position: absolute;")}}else closepopupfills(a)}}}}}
function relocate_popupfill_clickables(a){a||(a=g_isfirefox&&LP?LP.getBrowser().contentDocument:document);if(!a)return null;var b=LP_get_icon_divs(a);if(isEmptyObject(b))return null;try{var c,d=0;for(c in b)if(b.hasOwnProperty(c)){var f=b[c].substr(LPMAGIC.length);if(null!=f&&0<f.length){var e=f,g=LP_getElementByIdOrName(a,e);if(null==g&&!g_double_password_hack&&!g_double_secret_password_hack)LP_delete_floating_icon(a,b[c])&&(verbose_log("relocate: deleting orphaned icon container for "+f),d++),g_do_icon_number_hint&&
LP_delete_floating_icon_hint(a,b[c])&&(verbose_log("relocate: deleting orphaned icon number for "+f),d++),delete b[c];else if(g_do_icon_number_hint){if(null!=a.getElementById(b[c])){var h="",l=getIconState(a,e);l&&(h=l.fillhint);null!=h&&("sites"!=h&&"formfills"!=h)&&(h=null);e={};e.sites=0<g_icon_number_overrides.sites?g_icon_number_overrides.sites:g_icon_numbers.sites;e.formfills=0<g_icon_number_overrides.formfills?g_icon_number_overrides.formfills:g_icon_numbers.formfills;move_floating_icon(a,
g,h,e)}}else move_floating_icon(a,g)}}0<d&&setTimeout(function(){checkShouldRecheck()},500)}catch(m){verbose_log("relocate_popupfill_clickables caught error:"+m.message)}}var POPUP_FIELD_OFFSET=-4;
function calculate_iframe_pos(a,b,c){if(!do_experimental_popupfill||!a||null==b)return null;var d=b.style.left,f=b.style.top;if(g_double_password_hack||g_double_secret_password_hack||0>parseInt(d)||0>parseInt(f)){var e=a.getElementById(LPMAGICIFRAME+LP_pickFieldName(a,b));if(null!=e)return c=LP_getAbsolutePos(a,e),f=parseInt(c.top)+"px",d=parseInt(c.left)+"px",{posx:d,posy:f}}LP_pickFieldName(a,b);if(null!=b){e=LP_getAbsolutePos(a,b);null!=e&&(d=parseInt(e.left)+POPUP_FIELD_OFFSET+"px",f=parseInt(e.top)+
parseInt(e.height)+"px",g_do_icon_number_hint&&(f=parseInt(e.top)+parseInt(e.height)+4+"px"));if(null==c||0==c||""==c)e=LP_getElementByIdOrName(a,LPMAGICIFRAME+LP_pickFieldName(a,b)),c=null!=e?LP_getAbsolutePos(a,e)?LP_getAbsolutePos(a,e).width:0:0;a=LP_getWindowWidth(window);if(!a)return{posx:0,posy:0};parseInt(c)+parseInt(d)>a&&(d=a-parseInt(c)-20+"px")}if(""==d||"auto"==d||""==f||"auto"==f)return null;c=parseInt(d);f=parseInt(f);return"NaN"==c||"NaN"==f?null:{posx:c+"px",posy:f+"px"}}
function verbose_log(a){verbose&&console_log(a)}function is_watermark(){return!1}function checkAskGenerate(){}function sendKey(a,b){try{return keyName="DOM_VK_"+a.toUpperCase(),send_simulated_key(b,0,KeyEvent[keyName],!1)}catch(c){lpdbg("error",c)}return null}
function send_simulated_key(a,b,c,d){if(void 0===a||void 0===a.ownerDocument)return lpdbg("error","No key target!"),!1;b=a.ownerDocument.createEvent("KeyboardEvent");b.initKeyboardEvent("keydown",!0,!0,document.defaultView,!1,!1,d,!1,c,c);var f=a.dispatchEvent(b);b=a.ownerDocument.createEvent("KeyboardEvent");b.initKeyboardEvent("keyup",!0,!0,null,!1,!1,d,!1,c,c);a.dispatchEvent(b);return f}
if("undefined"==typeof KeyEvent)var KeyEvent={DOM_VK_CANCEL:3,DOM_VK_HELP:6,DOM_VK_BACK_SPACE:8,DOM_VK_TAB:9,DOM_VK_CLEAR:12,DOM_VK_RETURN:13,DOM_VK_ENTER:14,DOM_VK_SHIFT:16,DOM_VK_CONTROL:17,DOM_VK_ALT:18,DOM_VK_PAUSE:19,DOM_VK_CAPS_LOCK:20,DOM_VK_ESCAPE:27,DOM_VK_SPACE:32,DOM_VK_PAGE_UP:33,DOM_VK_PAGE_DOWN:34,DOM_VK_END:35,DOM_VK_HOME:36,DOM_VK_LEFT:37,DOM_VK_UP:38,DOM_VK_RIGHT:39,DOM_VK_DOWN:40,DOM_VK_PRINTSCREEN:44,DOM_VK_INSERT:45,DOM_VK_DELETE:46,DOM_VK_0:48,DOM_VK_1:49,DOM_VK_2:50,DOM_VK_3:51,
DOM_VK_4:52,DOM_VK_5:53,DOM_VK_6:54,DOM_VK_7:55,DOM_VK_8:56,DOM_VK_9:57,DOM_VK_SEMICOLON:59,DOM_VK_EQUALS:61,DOM_VK_A:65,DOM_VK_B:66,DOM_VK_C:67,DOM_VK_D:68,DOM_VK_E:69,DOM_VK_F:70,DOM_VK_G:71,DOM_VK_H:72,DOM_VK_I:73,DOM_VK_J:74,DOM_VK_K:75,DOM_VK_L:76,DOM_VK_M:77,DOM_VK_N:78,DOM_VK_O:79,DOM_VK_P:80,DOM_VK_Q:81,DOM_VK_R:82,DOM_VK_S:83,DOM_VK_T:84,DOM_VK_U:85,DOM_VK_V:86,DOM_VK_W:87,DOM_VK_X:88,DOM_VK_Y:89,DOM_VK_Z:90,DOM_VK_WIN:91,DOM_VK_CONTEXT_MENU:93,DOM_VK_NUMPAD0:96,DOM_VK_NUMPAD1:97,DOM_VK_NUMPAD2:98,
DOM_VK_NUMPAD3:99,DOM_VK_NUMPAD4:100,DOM_VK_NUMPAD5:101,DOM_VK_NUMPAD6:102,DOM_VK_NUMPAD7:103,DOM_VK_NUMPAD8:104,DOM_VK_NUMPAD9:105,DOM_VK_MULTIPLY:106,DOM_VK_ADD:107,DOM_VK_SEPARATOR:108,DOM_VK_SUBTRACT:109,DOM_VK_DECIMAL:110,DOM_VK_DIVIDE:111,DOM_VK_F1:112,DOM_VK_F2:113,DOM_VK_F3:114,DOM_VK_F4:115,DOM_VK_F5:116,DOM_VK_F6:117,DOM_VK_F7:118,DOM_VK_F8:119,DOM_VK_F9:120,DOM_VK_F10:121,DOM_VK_F11:122,DOM_VK_F12:123,DOM_VK_F13:124,DOM_VK_F14:125,DOM_VK_F15:126,DOM_VK_F16:127,DOM_VK_F17:128,DOM_VK_F18:129,
DOM_VK_F19:130,DOM_VK_F20:131,DOM_VK_F21:132,DOM_VK_F22:133,DOM_VK_F23:134,DOM_VK_F24:135,DOM_VK_NUM_LOCK:144,DOM_VK_SCROLL_LOCK:145,DOM_VK_COMMA:188,DOM_VK_PERIOD:190,DOM_VK_SLASH:191,DOM_VK_BACK_QUOTE:192,DOM_VK_OPEN_BRACKET:219,DOM_VK_BACK_SLASH:220,DOM_VK_CLOSE_BRACKET:221,DOM_VK_QUOTE:222,DOM_VK_META:224};
function checkShouldRecheck(){if(do_experimental_popupfill&&(verbose_log("entered checkShouldRecheck()"),0<=g_input_cnt)){var a=countInputs(document);g_input_cnt!=a&&(formcachereset(document),g_isie?(setTimeout(function(){ie_recheck_page(document,g_is_specialsite)},200),setTimeout(function(){ie_recheck_page(document,g_is_specialsite)},1E3)):setTimeout(function(){sendBG({cmd:"recheckpage"})},200),g_input_cnt=a)}}function is_watermark_password(){return!1}
function LP_addEventHandler(a,b,c){try{return null==a||null==b||null==c||0>=b.length?null:"undefined"!=typeof a.addEventListener?a.addEventListener(b,c,!1):"undefined"!=typeof a.attachEvent?a.attachEvent("on"+b,c):null}catch(d){return verbose_log("LP_addEventHandler failed, "+d.message),null}}
function LP_stopEventPropagation(a){try{"undefined"!=typeof a.preventDefault?a.preventDefault():typeof window.event&&(window.event.returnValue=!1),"undefined"!=typeof a.stopPropagation?a.stopPropagation():typeof window.event&&(window.event.cancelBubble=!0)}catch(b){verbose_log("LP_stopEventPropagation failed, "+b.message)}}
function LP_getEventTarget(a){a=a?a:window.event;if((a="undefined"!=typeof a.target?a.target:a.srcElement)&&"undefined"!=typeof a.nodeType&&3==a.nodeType)a=a.parentNode;return a};
