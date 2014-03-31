(function()
{
    //  IDs
    var _id__container =    'evernote_clearly__container',
        _id__init =         'evernote_clearly__init';

    //  if container is missing, stop
    var _container = document.getElementById(_id__container);
    if (_container) {}else { return; }

    //  if button was clicked but Readable hasn't returned yet, stop
    if (window.$evernote_clearly) { if (window.$evernote_clearly.buttonTimer) { return; } }

    //  if Readable doesn't yet exist, create it
    else { window.$evernote_clearly = {}; }



    window.$evernote_clearly.speechOnFirstLaunch = true;

    
    //  the button was clicked
    window.$evernote_clearly.buttonTimer = true;

    //  if allready loaded, call; return
    if (window.$evernote_clearly.buttonClicked) { window.$evernote_clearly.buttonClicked(); return; }

    //  else, insert init script
    var _init = document.createElement('script');
        _init.setAttribute('src', 'chrome-extension://iooicodkiihhpojmmeghjclgihfjdjhj/js_in_page/init.js');
        _init.setAttribute('id', _id__init);
        
    //  do insert
    _container.appendChild(_init);
})();

