function log(b){postMessage({type:"log",message:b})}function info(b){verbosity>=INFOS&&(postMessage({type:"info",message:"Info: "+b}),PDFJS.LogManager.notify("info",b))}function warn(b){verbosity>=WARNINGS&&(postMessage({type:"warning",message:"Warning: "+b}),PDFJS.LogManager.notify("warn",b))}
function error(b){if(1<arguments.length){var a=["Error:"];a.push.apply(a,arguments);postMessage({type:"error",message:a});b=[].join.call(arguments," ")}else postMessage({type:"error",message:"Error: "+b});postMessage({type:"error",message:backtrace()});PDFJS.LogManager.notify("error",b);throw Error(b);}function TODO(b){warn("TODO: "+b)}function backtrace(){try{throw Error();}catch(b){return b.stack?b.stack.split("\n").slice(2).join("\n"):""}}function assert(b,a){b||error(a)}
function combineUrl(b,a){if(!a)return b;if(0<=a.indexOf(":"))return a;if("/"==a.charAt(0)){var c=b.indexOf("://"),c=b.indexOf("/",c+3);return b.substring(0,c)+a}var e=b.length,c=b.lastIndexOf("#"),e=0<=c?c:e,c=b.lastIndexOf("?",e),c=b.lastIndexOf("/",0<=c?c:e);return b.substring(0,c+1)+a}function assertWellFormed(b,a){b||error(a)}var LogManager=PDFJS.LogManager=function(){var b=[];return{addLogger:function(a){b.push(a)},notify:function(a,c){for(var e=0,d=b.length;e<d;e++){var f=b[e];if(f[a])f[a](c)}}}}();
function shadow(b,a,c){Object.defineProperty(b,a,{value:c,enumerable:!0,configurable:!0,writable:!1});return c}
var PasswordException=function(){function b(a,c){this.name="PasswordException";this.message=a;this.code=c}b.prototype=Error();return b.constructor=b}(),UnknownErrorException=function(){function b(a,c){this.name="UnknownErrorException";this.message=a;this.details=c}b.prototype=Error();return b.constructor=b}(),InvalidPDFException=function(){function b(a){this.name="InvalidPDFException";this.message=a}b.prototype=Error();return b.constructor=b}();
function bytesToString(b){for(var a="",c=b.length,e=0;e<c;++e)a+=String.fromCharCode(b[e]);return a}function stringToBytes(b){for(var a=b.length,c=new Uint8Array(a),e=0;e<a;++e)c[e]=b.charCodeAt(e)&255;return c}
var IDENTITY_MATRIX=[1,0,0,1,0,0],Util=PDFJS.Util=function(){function b(){}b.makeCssRgb=function(a){return"rgb("+a[0]+","+a[1]+","+a[2]+")"};b.makeCssCmyk=function(a){var c=new DeviceCmykCS;b.makeCssCmyk=function(a){a=c.getRgb(a,0);return b.makeCssRgb(a)};return b.makeCssCmyk(a)};b.applyTransform=function(a,c){return[a[0]*c[0]+a[1]*c[2]+c[4],a[0]*c[1]+a[1]*c[3]+c[5]]};b.applyInverseTransform=function(a,c){var b=c[0]*c[3]-c[1]*c[2];return[(a[0]*c[3]-a[1]*c[2]+c[2]*c[5]-c[4]*c[3])/b,(-a[0]*c[1]+a[1]*
c[0]+c[4]*c[1]-c[5]*c[0])/b]};b.inverseTransform=function(a){var c=a[0]*a[3]-a[1]*a[2];return[a[3]/c,-a[1]/c,-a[2]/c,a[0]/c,(a[2]*a[5]-a[4]*a[3])/c,(a[4]*a[1]-a[5]*a[0])/c]};b.apply3dTransform=function(a,c){return[a[0]*c[0]+a[1]*c[1]+a[2]*c[2],a[3]*c[0]+a[4]*c[1]+a[5]*c[2],a[6]*c[0]+a[7]*c[1]+a[8]*c[2]]};b.normalizeRect=function(a){var c=a.slice(0);a[0]>a[2]&&(c[0]=a[2],c[2]=a[0]);a[1]>a[3]&&(c[1]=a[3],c[3]=a[1]);return c};b.intersect=function(a,c){function e(a,c){return a-c}var d=[a[0],a[2],c[0],
c[2]].sort(e),f=[a[1],a[3],c[1],c[3]].sort(e),g=[];a=b.normalizeRect(a);c=b.normalizeRect(c);if(d[0]===a[0]&&d[1]===c[0]||d[0]===c[0]&&d[1]===a[0])g[0]=d[1],g[2]=d[2];else return!1;if(f[0]===a[1]&&f[1]===c[1]||f[0]===c[1]&&f[1]===a[1])g[1]=f[1],g[3]=f[2];else return!1;return g};b.sign=function(a){return 0>a?-1:1};return b}(),PageViewport=PDFJS.PageViewport=function(){function b(a,c,b,d,f){var g=(a[2]+a[0])/2,h=(a[3]+a[1])/2,k,l,m;switch(b%360){case -180:case 180:b=-1;l=k=0;m=1;break;case -270:case 90:b=
0;l=k=1;m=0;break;case -90:case 270:b=0;l=k=-1;m=0;break;default:b=1,l=k=0,m=-1}var n,p,q;0==b?(n=Math.abs(h-a[1])*c+d,p=Math.abs(g-a[0])*c+f,q=Math.abs(a[3]-a[1])*c,a=Math.abs(a[2]-a[0])*c):(n=Math.abs(g-a[0])*c+d,p=Math.abs(h-a[1])*c+f,q=Math.abs(a[2]-a[0])*c,a=Math.abs(a[3]-a[1])*c);this.transform=[b*c,k*c,l*c,m*c,n-b*c*g-l*c*h,p-k*c*g-m*c*h];this.offsetX=d;this.offsetY=f;this.width=q;this.height=a;this.fontScale=c}b.prototype={convertToViewportPoint:function(a,c){return Util.applyTransform([a,
c],this.transform)},convertToViewportRectangle:function(a){var c=Util.applyTransform([a[0],a[1]],this.transform);a=Util.applyTransform([a[2],a[3]],this.transform);return[c[0],c[1],a[0],a[1]]},convertToPdfPoint:function(a,c){return Util.applyInverseTransform([a,c],this.transform)}};return b}(),PDFStringTranslateTable=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364];
function stringToPDFString(b){var a,c=b.length,e="";if("\u00fe"===b[0]&&"\u00ff"===b[1])for(a=2;a<c;a+=2)e+=String.fromCharCode(b.charCodeAt(a)<<8|b.charCodeAt(a+1));else for(a=0;a<c;++a)var d=PDFStringTranslateTable[b.charCodeAt(a)],e=e+(d?String.fromCharCode(d):b.charAt(a));return e}function stringToUTF8String(b){return decodeURIComponent(escape(b))}function isBool(b){return"boolean"==typeof b}function isInt(b){return"number"==typeof b&&(b|0)==b}function isNum(b){return"number"==typeof b}
function isString(b){return"string"==typeof b}function isNull(b){return null===b}function isName(b){return b instanceof Name}function isCmd(b,a){return b instanceof Cmd&&(!a||b.cmd==a)}function isDict(b,a){return b instanceof Dict&&(!a||b.get("Type").name==a)}function isArray(b){return b instanceof Array}function isStream(b){return"object"==typeof b&&null!=b&&"getChar"in b}function isArrayBuffer(b){return"object"==typeof b&&null!=b&&"byteLength"in b}function isRef(b){return b instanceof Ref}
function isPDFFunction(b){if("object"!=typeof b)return!1;if(!isDict(b))if(isStream(b))b=b.dict;else return!1;return b.has("FunctionType")}
var Promise=PDFJS.Promise=function(){function b(c,b){this.name=c;this.isRejected=!1;this.error=null;null!=b?(this.isResolved=!0,this._data=b,this.hasData=!0):(this.isResolved=!1,this._data=a);this.callbacks=[];this.errbacks=[];this.progressbacks=[]}var a={};b.all=function(a){var e=new b,d=a.length,f=[];if(0===d)return e.resolve(f),e;for(var g=0,h=a.length;g<h;++g)a[g].then(function(a){return function(b){f[a]=b;d--;0===d&&e.resolve(f)}}(g));return e};b.prototype={hasData:!1,set data(b){if(void 0!==
b&&(this._data!==a&&error("Promise "+this.name+": Cannot set the data of a promise twice"),this._data=b,this.hasData=!0,this.onDataCallback))this.onDataCallback(b)},get data(){this._data===a&&error("Promise "+this.name+": Cannot get data that isn't set");return this._data},onData:function(b){this._data!==a?b(this._data):this.onDataCallback=b},resolve:function(a){this.isResolved&&error("A Promise can be resolved only once "+this.name);this.isRejected&&error("The Promise was already rejected "+this.name);
this.isResolved=!0;this.data="undefined"!==typeof a?a:null;for(var b=this.callbacks,d=0,f=b.length;d<f;d++)b[d].call(null,a)},progress:function(a){for(var b=this.progressbacks,d=0,f=b.length;d<f;d++)b[d].call(null,a)},reject:function(a,b){this.isRejected&&error("A Promise can be rejected only once "+this.name);this.isResolved&&error("The Promise was already resolved "+this.name);this.isRejected=!0;this.error=a||null;for(var d=this.errbacks,f=0,g=d.length;f<g;f++)d[f].call(null,a,b)},then:function(a,
b,d){a||f("Requiring callback"+this.name);if(this.isResolved)a.call(null,this.data);else if(this.isRejected&&b){var f=this.error;b.call(null,f)}else this.callbacks.push(a),b&&this.errbacks.push(b);d&&this.progressbacks.push(d)}};return b}(),StatTimer=function(){function b(){this.started={};this.times=[];this.enabled=!0}b.prototype={time:function(a){if(this.enabled){if(a in this.started)throw"Timer is already running for "+a;this.started[a]=Date.now()}},timeEnd:function(a){if(this.enabled){if(!(a in
this.started))throw"Timer has not been started for "+a;this.times.push({name:a,start:this.started[a],end:Date.now()});delete this.started[a]}},toString:function(){for(var a=this.times,b="",e=0,d=0,f=a.length;d<f;++d){var g=a[d].name;g.length>e&&(e=g.length)}d=0;for(f=a.length;d<f;++d){for(var h=a[d],g=h.end-h.start,h=h.name;h.length<e;)h+=" ";b+=h+" "+g+"ms\n"}return b}};return b}();
PDFJS.createBlob=function(b,a){if("function"===typeof Blob)return new Blob([b],{type:a});var c=new MozBlobBuilder;c.append(b);return c.getBlob(a)};
