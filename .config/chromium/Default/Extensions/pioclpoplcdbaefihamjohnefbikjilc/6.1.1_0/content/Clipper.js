function Clipper(){function r(a,f,g){k(document.body,null,a,function(a){a=l(document.body,a);f(a)},null,g)}function s(a){a('<embed src="'+pageInfo.getPdfUrl()+'" type="application/pdf"></embed>')}function t(a,f,g,d){function b(a){a=l(c.commonAncestorContainer,a);g(a)}if(f&&document.querySelector("embed[type='application/pdf']"))g(f);else{var e,c;try{if(e=contentPreview.ensureSelectionIsShown())if(c=e.getRangeAt(0))if(c.commonAncestorContainer.nodeType==Node.TEXT_NODE){var h=c.commonAncestorContainer.textContent.substring(c.startOffset,
c.endOffset);g(y(h))}else k(c.commonAncestorContainer,c,a,b,null,d)}catch(z){g("")}}}function u(a,f){f(l(document.body,'<img src="'+a+'" />',!0))}function v(a){var f=contentPreview.getUrlElement(function(f){a(f)});f&&a(f)}function k(a,f,g,d,b,e){function c(a,b){b?e(b):w(a)}n=a;p=f;q=g;w=d;if(b)x.serialize(n,p,q,c,null,b);else{a=function(a){x.serialize(n,p,q,c,a)};try{serializeFrames(a)}catch(h){e(h)}}}function l(a,f,g){a=a.querySelectorAll("img");for(var d=0;d<a.length;d++){var b=a.item(d);if(b.getAttribute("src")&&
""!=b.getAttribute("src").trim()&&/^https?:\/\//.test(b.src)){var e=/^(https?:\/\/.[^\/]+)\/?/.exec(b.src)[1],c=/^(https?:\/\/.[^\/]+)\/?/.exec(document.location.href)[1];if(e==c&&(e=document.createElement("canvas"),g?(e.width=b.naturalWidth||1,e.height=b.naturalHeight||1):(e.width=b.width||1,e.height=b.height||1),c=e.getContext("2d"),b.naturalWidth||b.naturalHeight)){g?c.drawImage(b,0,0,b.naturalWidth,b.naturalHeight):c.drawImage(b,0,0,b.width,b.height);try{f=/\.jpe?g$/.test(b.src)?f.replace(b.src,
e.toDataURL("image/jpeg")):f.replace(b.src,e.toDataURL("image/png"))}catch(h){if(18!=h.code)throw h;}}}}return f}function y(a){a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;");return a=a.replace(/>/g,"&gt;")}var x=new HtmlSerializer,n,p,q,w;Browser.addMessageHandlers({clipFullPage:function(a,f,g){document.querySelector("#evernoteGlobalTools.evernoteClipperVisible")&&coordinator.msgHandlerToggleCoordinator();var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",
noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});r(!0,function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"fullPage",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType});contentPreview.reset()},function(a){Browser.sendToExtension({name:"receiveNoteContent",pendingNoteKey:d,error:a.stack})})})},
clipSelection:function(a,f,g){document.querySelector("#evernoteGlobalTools.evernoteClipperVisible")&&coordinator.msgHandlerToggleCoordinator();var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});t(!0,a.selectionText,function(b,e){Browser.sendToExtension({name:"receiveNoteContent",
clipType:"selection",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType,width:e});contentPreview.reset()},function(a){Browser.sendToExtension({name:"receiveNoteContent",pendingNoteKey:d,error:a.stack})})})},clipImage:function(a,f,g){document.querySelector("#evernoteGlobalTools.evernoteClipperVisible")&&coordinator.msgHandlerToggleCoordinator();var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",
noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});u(a.imageUrl,function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"image",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType});contentPreview.reset()})})},clipPdf:function(a,f,g){document.querySelector("#evernoteGlobalTools.evernoteClipperVisible")&&
coordinator.msgHandlerToggleCoordinator();var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});s(function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"pdf",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),
userId:a.userId,userType:a.userType});contentPreview.reset()})})},clipUrl:function(a,f,g){document.querySelector("#evernoteGlobalTools.evernoteClipperVisible")&&coordinator.msgHandlerToggleCoordinator();var d=UUID.generateGuid();clipResultCoordinator.showClipResult(d,function(){Browser.sendToExtension({name:"receiveNoteFilingInfo",noteFilingInfo:{title:document.title||Browser.i18n.getMessage("quickNote_untitledNote"),type:"pers",url:document.location.href},pendingNoteKey:d,userId:a.userId,userType:a.userType});
v(function(b){Browser.sendToExtension({name:"receiveNoteContent",clipType:"url",html:b,pendingNoteKey:d,recommendationText:pageInfo.getRecommendationText(!1),userId:a.userId,userType:a.userType});contentPreview.reset()})})}});this.clipArticle=function(a,f,g){function d(m){h+=m;c<e.length?k(e[c++],null,a,d,null,g):(m=h,m=l(b,m),f(m,window.getComputedStyle(b).width))}var b,e=pageInfo.getAdditionalPages(),c=0,h="";try{if(b=contentPreview.getArticleElement()){k(b,null,a,d,null,g);return}}catch(n){log.warn("Couldn't get preview from contentPreview. Trying pageInfo.")}try{pageInfo.getDefaultArticle(function(c){b=
c;k(b,null,a,d,null,g)});return}catch(p){log.warn("Couldn't get article from pageInfo. Trying default.")}b=document.body;k(b,null,a,d,null,g)};this.clipEmail=function(a,f){var g=contentPreview.getEmailElement();k(g,null,!0,function(d){d=l(g,d);a(d)},null,f)};this.clipImage=u;this.clipFullPage=r;this.clipPdf=s;this.clipSelection=t;this.clipUrl=v;this.clipClearly=function(a,f,g,d){for(var b=a.cloneNode(!0),e=b.querySelectorAll("sup"),c=0;c<e.length;c++)e.item(c).parentNode.removeChild(e.item(c));e=
b.querySelectorAll("span");for(c=0;c<e.length;c++)e.item(c).parentNode.removeChild(e.item(c));e=b.querySelectorAll("a."+f.ClearlyComponent__highlight.settings.highlightElementDeleteCSSClass);for(c=0;c<e.length;c++)e.item(c).parentNode.removeChild(e.item(c));e=b.querySelectorAll("em."+f.ClearlyComponent__highlight.settings.highlightElementCSSClass);for(c=0;c<e.length;c++)e.item(c).outerHTML="<highlight>"+e.item(c).innerHTML+"</highlight>";k(b,null,!1,function(b){b=l(a,b);g(b)},f,d)};Object.preventExtensions(this)}
Object.preventExtensions(Clipper);
