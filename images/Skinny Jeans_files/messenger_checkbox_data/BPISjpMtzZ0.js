;/*FB_PKG_DELIM*/

__d("PluginLoggedOutUserTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(a){b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig",this.$1,b("Banzai").BASIC,a)};c.logVital=function(a){b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig",this.$1,b("Banzai").VITAL,a)};c.logImmediately=function(a){b("GeneratedLoggerUtils").log("logger:PluginLoggedOutUserLoggerConfig",this.$1,{signal:!0},a)};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setHref=function(a){this.$1.href=a;return this};c.setIsSDK=function(a){this.$1.is_sdk=a;return this};c.setPluginAppID=function(a){this.$1.plugin_app_id=a;return this};c.setPluginName=function(a){this.$1.plugin_name=a;return this};c.setRefererURL=function(a){this.$1.referer_url=a;return this};c.updateExtraData=function(a){a=b("nullthrows")(b("GeneratedLoggerUtils").serializeMap(a));b("GeneratedLoggerUtils").checkExtraDataFieldNames(a,g);this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.addToExtraData=function(a,b){var c={};c[a]=b;return this.updateExtraData(c)};return a}();var g={href:!0,is_sdk:!0,plugin_app_id:!0,plugin_name:!0,referer_url:!0};f["default"]=a}),66);
__d("MNCommerceLogger",["BanzaiLogger","ODS"],(function(a,b,c,d,e,f,g){"use strict";var h=c("BanzaiLogger").create({signal:!0});function i(a){switch(a){case"devx_upsell_learn_more_clicked":return"devx.upsell.learn_more.clicked";default:return a}}function a(a,b,c){d("ODS").bumpEntityKey(2966,"messenger_commerce",i(a)),h.log("MessengerCommerceLoggerConfig",{brand_app_id:b,user_fbid:c,event:a})}function b(a,b,c,e){h.log("MessengerCommerceLoggerConfig",{brand_app_id:a,page_id:b,user_fbid:c,event:e}),d("ODS").bumpEntityKey(2966,"messenger_commerce","auth."+e+".all")}g.logClick=a;g.logAuthEvent=b}),98);
__d("ArbiterFrame",[],(function(a,b,c,d,e,f){a={inform:function(a,b,c){var d=parent.frames,e=d.length,f;b.crossFrame=!0;for(var g=0;g<e;g++){f=d[g];try{if(!f||f==window)continue;f.require?f.require("Arbiter").inform(a,b,c):f.ServerJSAsyncLoader&&f.ServerJSAsyncLoader.wakeUp(a,b,c)}catch(a){}}}};e.exports=a}),null);
__d("resolveWindow",[],(function(a,b,c,d,e,f){function a(a){if(a==null)return null;var b=window;a=a.split(".");try{for(var c=0;c<a.length;c++){var d=a[c],e=/^frames\[[\'\"]?([a-zA-Z0-9\-_]+)[\'\"]?\]$/.exec(d);if(e)b=b.frames[e[1]];else if(d==="opener"||d==="parent"||d==="top")b=b[d];else return null}}catch(a){return null}return b}f["default"]=a}),66);
__d("XD",["Arbiter","DOM","DOMDimensions","Log","PHPQuerySerializer","Queue","URI","isFacebookURI","isInIframe","resolveWindow","sdk.Scribe"],(function(a,b,c,d,e,f,g){var h={_callbacks:[],_opts:{autoResize:!1,allowShrink:!0,channelUrl:null,hideOverflow:!1,resizeTimeout:1e3,resizeWidth:!1},_lastResizeAckId:0,_resizeCount:0,_resizeTimestamp:0,_shrinker:null,_forcedMinWidth:100,init:function(a){var b=this;this._opts=babelHelpers["extends"]({},this._opts,a);this._opts.autoResize&&this._startResizeMonitor();c("Arbiter").subscribe("Connect.Unsafe.resize.ack",function(a,c){c.id||(c.id=b._resizeCount),c.id>b._lastResizeAckId&&(b._lastResizeAckId=c.id)})},getQueue:function(){this._queue||(this._queue=new(c("Queue"))());return this._queue},setChannelUrl:function(a){var b=this;this.getQueue().start(function(c){return b.send(c,a)})},send:function(a,b){a===void 0&&(a=null);b===void 0&&(b=null);b=b||this._opts.channelUrl;if(!b){this.getQueue().enqueue(a);return}var e={};b=new(c("URI"))(b);Object.assign(e,a,d("PHPQuerySerializer").deserialize(b.getFragment()));b=new(c("URI"))(e.origin);if(b.getDomain()===""){d("Log").error("No valid domain for XD message target.");return}var f=b.getOrigin();if(typeof e.relation!=="string"){d("Log").error("No relation specified to resolve XD target window.");return}var g=c("resolveWindow")(e.relation.replace(/^parent\./,"")),h=1;b=function b(){try{g.postMessage(d("PHPQuerySerializer").serialize(e),f)}catch(c){--h?window.setTimeout(b,200):d("sdk.Scribe").log("jssdk_error",{error:"POST_MESSAGE",extra:{message:c.message+", html/js/modules/XD.js:139",ancestor_origins:JSON.stringify(location.ancestorOrigins),referrer:document.referrer,data:a}})}};b()},_computeSize:function(){var a=d("DOMDimensions").getDocumentDimensions(),b=0;if(this._opts.resizeWidth){var e=document.body;if(e!=null){if(e.clientWidth<e.scrollWidth)b=a.width;else{e=e.lastElementChild;if(e!=null&&e instanceof HTMLElement){e=e;e=e.offsetLeft+e.offsetWidth;e>b&&(b=e)}}b=Math.max(b,h._forcedMinWidth)}else b=h._forcedMinWidth}a.width=b;this._opts.allowShrink&&(this._shrinker||(this._shrinker=c("DOM").create("div")),c("DOM").appendContent(document.body,this._shrinker),a.height=Math.max(this._shrinker.offsetTop,0));return a},_startResizeMonitor:function(){var a,b=this,d;a=(a=document.documentElement)!=null?a:{};if(this._opts.hideOverflow){a.style.overflow="hidden";((a=document.body)!=null?a:{}).style.overflow="hidden"}a=function(){var a=b._computeSize(),e=Date.now();if(!d||b._opts.allowShrink&&d.width!=a.width||!b._opts.allowShrink&&d.width<a.width||b._opts.allowShrink&&d.height!=a.height||!b._opts.allowShrink&&d.height<a.height){d=a;b._resizeCount++;b._resizeTimestamp=e;e={type:"resize",height:a.height,ackData:{id:b._resizeCount},width:0};a.width&&a.width!=0&&(e.width=a.width);try{if(c("isFacebookURI")(new(c("URI"))(document.referrer))&&c("isInIframe")()&&window.name&&window.parent.location&&window.parent.location.toString&&c("isFacebookURI")(new(c("URI"))(window.parent.location))){a=window.parent.document.getElementsByTagName("iframe");for(var f=0;f<a.length;f++)a[f].name==window.name&&(b._opts.resizeWidth&&(a[f].style.width=e.width+"px"),a[f].style.height=e.height+"px")}b.send(e)}catch(a){b.send(e)}}};a();window.setInterval(a,this._opts.resizeTimeout)}};b=babelHelpers["extends"]({},h);a.UnverifiedXD=b;a.XD=h;g.XD=h;g.UnverifiedXD=b}),98);
__d("Plugin",["Arbiter","ArbiterFrame"],(function(a,b,c,d,e,f){var g={CONNECT:"platform/plugins/connect",DISCONNECT:"platform/plugins/disconnect",ERROR:"platform/plugins/error",RELOAD:"platform/plugins/reload",DIALOG:"platform/plugins/dialog",connect:function(a,c){a={identifier:a,href:a,story_fbid:c};b("Arbiter").inform(g.CONNECT,a);b("ArbiterFrame").inform(g.CONNECT,a)},disconnect:function(a,c){a={identifier:a,href:a,story_fbid:c};b("Arbiter").inform(g.DISCONNECT,a);b("ArbiterFrame").inform(g.DISCONNECT,a)},error:function(a,c){b("Arbiter").inform(g.ERROR,{action:a,content:c})},reload:function(a){b("Arbiter").inform(g.RELOAD,{reloadUrl:a||""}),b("ArbiterFrame").inform(g.RELOAD,{reloadUrl:a||""})},reloadOtherPlugins:function(a,c){b("ArbiterFrame").inform(g.RELOAD,{reloadUrl:"",reload:a||"",identifier:c||""})}};e.exports=g}),null);
__d("MessengerWebPluginAnonymousTypedLogger",["Banzai","GeneratedLoggerUtils"],(function(a,b,c,d,e,f){"use strict";a=function(){function a(){this.$1={}}var c=a.prototype;c.log=function(a){b("GeneratedLoggerUtils").log("logger:MessengerWebPluginAnonymousLoggerConfig",this.$1,b("Banzai").BASIC,a)};c.logVital=function(a){b("GeneratedLoggerUtils").log("logger:MessengerWebPluginAnonymousLoggerConfig",this.$1,b("Banzai").VITAL,a)};c.logImmediately=function(a){b("GeneratedLoggerUtils").log("logger:MessengerWebPluginAnonymousLoggerConfig",this.$1,{signal:!0},a)};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setAppID=function(a){this.$1.app_id=a;return this};c.setCallsite=function(a){this.$1.callsite=a;return this};c.setClientFbid=function(a){this.$1.client_fbid=a;return this};c.setDebugData=function(a){this.$1.debug_data=a;return this};c.setDeltaType=function(a){this.$1.delta_type=a;return this};c.setDeviceParam=function(a){this.$1.device_param=a;return this};c.setDomainSource=function(a){this.$1.domain_source=a;return this};c.setDuration=function(a){this.$1.duration=a;return this};c.setEvent=function(a){this.$1.event=a;return this};c.setEventTimestamp=function(a){this.$1.event_timestamp=a;return this};c.setExceptionMessage=function(a){this.$1.exception_message=a;return this};c.setExceptionStacktrace=function(a){this.$1.exception_stacktrace=a;return this};c.setExceptionType=function(a){this.$1.exception_type=a;return this};c.setGateway=function(a){this.$1.gateway=a;return this};c.setIsUserLoggedIn=function(a){this.$1.is_user_logged_in=a;return this};c.setNewEventName=function(a){this.$1.new_event_name=a;return this};c.setOtherFields=function(a){this.$1.other_fields=b("GeneratedLoggerUtils").serializeMap(a);return this};c.setPageID=function(a){this.$1.page_id=a;return this};c.setPluginExtra=function(a){this.$1.plugin_extra=b("GeneratedLoggerUtils").serializeMap(a);return this};c.setPluginInterface=function(a){this.$1.plugin_interface=a;return this};c.setPluginName=function(a){this.$1.plugin_name=a;return this};c.setRefererURI=function(a){this.$1.referer_uri=a;return this};c.setRequestHeaders=function(a){this.$1.request_headers=a;return this};c.setRequestID=function(a){this.$1.request_id=a;return this};c.setRequestParam=function(a){this.$1.request_param=a;return this};c.setTabName=function(a){this.$1.tab_name=a;return this};c.setUpgradeLoggedInUserID=function(a){this.$1.upgrade_logged_in_user_id=a;return this};c.setUpstreamEvent=function(a){this.$1.upstream_event=a;return this};c.setWhitelistedDomains=function(a){this.$1.whitelisted_domains=a;return this};return a}();c={app_id:!0,callsite:!0,client_fbid:!0,debug_data:!0,delta_type:!0,device_param:!0,domain_source:!0,duration:!0,event:!0,event_timestamp:!0,exception_message:!0,exception_stacktrace:!0,exception_type:!0,gateway:!0,is_user_logged_in:!0,new_event_name:!0,other_fields:!0,page_id:!0,plugin_extra:!0,plugin_interface:!0,plugin_name:!0,referer_uri:!0,request_headers:!0,request_id:!0,request_param:!0,tab_name:!0,upgrade_logged_in_user_id:!0,upstream_event:!0,whitelisted_domains:!0};f["default"]=a}),66);
__d("sdk.UA",[],(function(a,b,c,d,e,f){a=navigator.userAgent;var g={iphone:/\b(iPhone|iP[ao]d)/.test(a),ipad:/\b(iP[ao]d)/.test(a),android:/Android/i.test(a),nativeApp:/FBAN\/\w+;/i.test(a)&&!/FBAN\/mLite;/.test(a),nativeAndroidApp:/FB_IAB\/\w+;/i.test(a),nativeInstagramApp:/Instagram/i.test(a),nativeMessengeriOSApp:/MessengerForiOS/i.test(a),nativeMessengerAndroidApp:/Orca\-Android/i.test(a),ucBrowser:/UCBrowser/i.test(a)},h=/Mobile/i.test(a),i={ie:NaN,firefox:NaN,chrome:NaN,webkit:NaN,osx:NaN,edge:NaN,operaMini:NaN,ucWeb:NaN};b=/(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(a);if(b){i.ie=b[1]?parseFloat(b[1]):b[4]?parseFloat(b[4]):NaN;i.firefox=b[2]||"";i.webkit=b[3]||"";if(b[3]){c=/(?:Chrome\/(\d+\.\d+))/.exec(a);i.chrome=c?c[1]:"";d=/(?:Edge\/(\d+\.\d+))/.exec(a);i.edge=d?d[1]:""}}e=/(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(a);e&&(i.osx=e[1]);b=/(?:Opera Mini\/(\d+(?:\.\d+)?))/.exec(a);b&&(i.operaMini=b[1]);c=/(?:UCWEB\/(\d+(?:\.\d+))?)/.exec(a);c&&(i.ucWeb=c[1]||"2.0");function j(a){return String(a).split(".").map(function(a){return parseFloat(a)})}var k={};Object.keys(i).map(function(a){var b=function(){return parseFloat(i[a])};b.getVersionParts=function(){return j(i[a])};k[a]=b});Object.keys(g).map(function(a){k[a]=function(){return g[a]}});k.mobile=function(){return g.iphone||g.ipad||g.android||h};k.mTouch=function(){return g.android||g.iphone||g.ipad};k.facebookInAppBrowser=function(){return g.nativeApp||g.nativeAndroidApp};k.inAppBrowser=function(){return g.nativeApp||g.nativeAndroidApp||g.nativeInstagramApp};k.mBasic=function(){return!!(i.ucWeb||i.operaMini)};k.instagram=function(){return g.nativeInstagramApp};k.messenger=function(){return g.nativeMessengeriOSApp||g.nativeMessengerAndroidApp};k.isSupportedIABVersion=function(a){if(!k.facebookInAppBrowser())return!1;var b=/(?:FBAV\/(\d+(\.\d+)+))/.exec(navigator.userAgent);if(b){b=parseFloat(b[1]);if(b>=a)return!0}return!1};d=k;f["default"]=d}),66);
__d("PluginCookieHelper",["MessengerWebPluginAnonymousTypedLogger","sdk.UA"],(function(a,b,c,d,e,f,g){"use strict";function h(){var a=!1;try{var b=window.localStorage;if(b){var c="__test__"+Date.now(),d="__"+Date.now();b.setItem(c,d);var e=b.getItem(c);e==d&&(a=!0);b.removeItem(c)}}catch(a){}return!a}function a(a,b,d){if(c("sdk.UA").chrome()){var e;h()?e=a==="send_to_messenger_plugin"?"send_to_messenger_chrome_incognito_popup_rendered":"checkbox_chrome_incognito_popup_rendered":e=a==="send_to_messenger_plugin"?"send_to_messenger_chrome_non_incognito_popup_rendered":"checkbox_chrome_non_incognito_popup_rendered";new(c("MessengerWebPluginAnonymousTypedLogger"))().setPluginName(a).setPageID(b).setEvent(e).setEventTimestamp(Date.now()).setOtherFields(d).logVital()}}g.isThirdPartyCookieDisabled=h;g.logIncognitoPopupRendered=a}),98);
__d("UnverifiedXD",["XD"],(function(a,b,c,d,e,f,g){g["default"]=d("XD").UnverifiedXD}),98);
__d("PluginMessage",["Arbiter","CSS","DOM","DOMEventListener","MNCommerceLogger","UnverifiedXD"],(function(a,b,c,d,e,f,g){var h="platform/plugins/checkbox_connect/access_token";function a(){d("DOMEventListener").add(window,"message",function(a){if(/\.facebook\.com$/.test(a.origin)&&i().test(a.data)){a=JSON.parse(a.data.substring(24));"type"in a&&(a.type==="send_to_messenger"?j(a):a.type==="messenger_checkbox"?k(a):a.type==="customer_chat"&&m(a))}})}function i(){return new RegExp("^SOCIALPLUGIN_AUTH_POPUP:")}function j(a){var b=document.getElementById("send-to-messenger-connect-button"),e=document.getElementById("send-to-messenger-disconnect-button"),f=document.getElementById("send-to-messenger-identity"),g=document.getElementById("send-to-messenger-profile-photo"),h=document.getElementById("send-to-messenger-profile-name");b!=null&&e!=null&&f!=null&&g!=null&&h!=null&&(a.can_personalize===!0&&a.connected===!0?(d("CSS").show(b),d("CSS").hide(e),l(g,a.profile_photo),l(h,a.profile_name),d("CSS").show(f),d("MNCommerceLogger").logAuthEvent(String(a.app_id),String(a.page_id),String(a.user_id),"send_to_messenger_opt_in_client_event"),c("UnverifiedXD").send({type:"sdk_event",event:"send_to_messenger",data:JSON.stringify({event:"opt_in",ref:String(a.ref)})})):(d("CSS").hide(b),d("CSS").show(e),d("CSS").hide(f)))}function k(a){var b=document.getElementById("plugin-MN-commerce-identity"),e=document.getElementById("plugin-MN-commerce-identity-profile-picture"),f=document.getElementById("plugin-MN-commerce-identity-profile-name"),g=document.getElementById("web-plugin-checkbox-form");b!=null&&e!=null&&f!=null&&g!=null&&(a.can_personalize===!0?(l(e,a.profile_photo),l(f,a.profile_name),d("CSS").show(b),l(g,a.checkbox),a.access_token!=null&&c("Arbiter").inform(h,a.access_token)):d("CSS").hide(b))}function l(a,b){var d=document.createElement("div");c("DOM").setContent(d,b);b=d.firstChild;b!=null&&a.replaceWith(b)}function m(a){var b=window.require("Arbiter");"ArbiterData"in a?b.inform(a.ArbiterEvent,a.ArbiterData):b.inform(a.ArbiterEvent)}g.MESSENGER_CHECKBOX_ACCESS_TOKEN_LOGIN_ARBITER=h;g.listen=a}),98);
__d("CheckboxPluginClickedFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("2259");c=b("FalcoLoggerInternal").create("checkbox_plugin_clicked",a);e.exports=c}),null);
__d("CheckboxPluginNotYouClickedFalcoEvent",["FalcoLoggerInternal","getFalcoLogPolicy_DO_NOT_USE"],(function(a,b,c,d,e,f){"use strict";a=b("getFalcoLogPolicy_DO_NOT_USE")("2262");c=b("FalcoLoggerInternal").create("checkbox_plugin_not_you_clicked",a);e.exports=c}),null);
__d("PlatformWidgetEndpoint",["PlatformVersioning"],(function(a,b,c,d,e,f){function a(a,c){return b("PlatformVersioning").versionAwarePath("/dialog/"+a+(c?"/"+c:""))}function c(a,c){return b("PlatformVersioning").versionAwarePath("/plugins/"+a+(c?"/"+c:""))}function d(a){return/^\/plugins\//.test(b("PlatformVersioning").getUnversionedPath(a))}function f(a){return/^\/dialog\//.test(b("PlatformVersioning").getUnversionedPath(a))}a={dialog:a,plugins:c,isPluginEndpoint:d,isDialogEndpoint:f};e.exports=a}),null);
__d("PluginOptin",["DOMEvent","DOMEventListener","MessengerWebPluginAnonymousTypedLogger","PlatformWidgetEndpoint","PluginLoggedOutUserTypedLogger","PluginMessage","PopupWindow","URI","UserAgent_DEPRECATED"],(function(a,b,c,d,e,f,g){var h={"default":{width:450,height:410},large:{width:475,height:605}},i=function(){function a(a,b){this.return_params=c("URI").getRequestURI().getQueryData(),this.login_params={},this.optin_params={},this.plugin=a,this.api_key=b,this.size="default",this.addReturnParams({ret:"optin"}),delete this.return_params.hash}var b=a.prototype;b.addReturnParams=function(a){Object.assign(this.return_params,a);return this};b.addLoginParams=function(a){Object.assign(this.login_params,a);return this};b.addOptinParams=function(a){Object.assign(this.optin_params,a);return this};b.setSize=function(a){this.size=a?a:"default";return this};b.start=function(){var a=this.api_key||127760087237610;c("URI").getRequestURI().getQueryData().kid_directed_site&&(this.login_params.kid_directed_site=!0);this.login_params.referrer=document.referrer;var b=new(c("URI"))(c("PlatformWidgetEndpoint").dialog("plugin.optin")).addQueryData(this.optin_params).addQueryData({app_id:a,secure:c("URI").getRequestURI().isSecure(),social_plugin:this.plugin,return_params:JSON.stringify(this.return_params),login_params:JSON.stringify(this.login_params)}),e=d("UserAgent_DEPRECATED").mobile()!==null;e?b.setSubdomain("m"):b.addQueryData({display:"popup"});this.return_params.act!==null&&this.return_params.act==="send"&&new(c("PluginLoggedOutUserTypedLogger"))().setPluginAppID(a).setPluginName(this.return_params.act).setHref(this.return_params.href).logVital();a=h[this.size];b=this.transformSocialPluginToFacebookDomainPopupURI(b,c("URI").getRequestURI().getDomain(),e);this.popup=d("PopupWindow").open(b.toString(),a.height,a.width,"fbPluginAuthenticationPopupWindow");this.plugin==="customer_chat"&&this.login_params.chat_plugin_upgrade!=null&&this.login_params.chat_plugin_upgrade===!0&&new(c("MessengerWebPluginAnonymousTypedLogger"))().setPageID(this.login_params.page_id).setClientFbid(this.login_params.guest_id).setRequestID(this.login_params.request_id).setNewEventName("upgrade_plugin_optin_popup_opened").log();d("PluginMessage").listen();return this};b.transformSocialPluginToFacebookDomainPopupURI=function(a,b,c){b=b.split(".");if(b[0]!=="socialplugin")return a;b[b.length-1]="com";b[0]=c?"m":"www";return a.setDomain(b.join(".")).setProtocol("https")};return a}();i.starter=function(a,b,c,d){a=new i(a);a.addReturnParams(b||{});a.addLoginParams(c||{});a.addOptinParams(d||{});return a.start.bind(a)};i.listen=function(a,b,d,e,f){c("DOMEventListener").add(a,"click",function(a){new(c("DOMEvent"))(a).kill(),i.starter(b,d,e,f)()})};g["default"]=i}),98);
__d("XChatPluginIncognitoLoginPopupController",["XController"],(function(a,b,c,d,e,f){e.exports=b("XController").create("/plugins/chat/incognito_login/",{is_from_re_engagement:{type:"Bool",defaultValue:!1}})}),null);
__d("PluginMessengerCheckbox",["Arbiter","CSS","CheckboxPluginClickedFalcoEvent","CheckboxPluginNotYouClickedFalcoEvent","DOMEvent","DOMEventListener","FormSubmit","IntersectionObserver","PluginCookieHelper","PluginMessage","PluginOptin","PopupWindow","UnverifiedXD","XChatPluginIncognitoLoginPopupController","intersectionObserverEntryIsIntersecting","promiseDone"],(function(a,b,c,d,e,f,g){"use strict";a=function(){function a(a){var b=this,e=a.appID,f=a.checkbox,g=a.confirmationForm,h=a.dataRef,i=a.form,j=a.identity,k=a.notYouLink,l=a.pageID,m=a.requestID;a.pluginCheckOutOfView;var n=a.pluginStateInput,o=a.shouldPersonalize,p=a.optInTypes,q=a.promotionalFrequency,r=a.promotionalTopic,s=a.userID,t=a.userRef,u=a.isChecked,v=a.isSocialPluginDomain;this.accessToken=null;var w=/iPhone|iPod|iPad|Android|Mobile/i.test(navigator.userAgent);o||d("CSS").hide(j);v&&d("CSS").hide(k);a=function(a,b){return d("DOMEventListener").add(a,"click",b)};var x=function(a,b){return d("DOMEventListener").add(a,"change",b)},y,z=function(a,e){new(c("DOMEvent"))(a).kill();if(((a=y)==null?void 0:a.popup)&&!y.popup.closed){y.popup.focus();return}v?A(e):b.performUIAction(function(){A(e)},function(){A(e)},function(){var a=c("XChatPluginIncognitoLoginPopupController").getURIBuilder().setBool("is_from_re_engagement",!1).getURI();d("PopupWindow").open(a.toString(),420,450,"fbPluginIncognitoScreenPopup")})},A=function(a){y=new(c("PluginOptin"))("messenger_checkbox").addLoginParams({logged_in:!0,switch_user:a,page_id:l,app_id:e,connected:!1,is_inapp_browser:!1,show_subtitle:!1,promotional_frequency:q,promotional_topic:r,has_user_ref:t!=null&&!p.includes("marketing")}).addReturnParams({source:"messenger_checkbox"}).setSize(r?"large":null).start(),d("PluginMessage").listen(),v&&(d("PluginCookieHelper").logIncognitoPopupRendered("checkbox_plugin",l,{opt_in_type:p.join(",")}),c("Arbiter").subscribe(d("PluginMessage").MESSENGER_CHECKBOX_ACCESS_TOKEN_LOGIN_ARBITER,function(a,c){c!==b.accessToken&&(b.accessToken=c,d("DOMEventListener").remove(f,"change",C),x(f,D),D({target:{checked:!0}}))}))},B=function(a){return c("UnverifiedXD").send({type:"sdk_event",event:"messenger_checkbox",data:JSON.stringify(a)})},C=function(d){d.target.checked=!1;B({event:"login",user_ref:t,ref:h});z(d,!1);d=b.isLoggedInUncached()?"continueAs":"login";var a={client_id:s,page_id:l,app_id:e,request_id:m,is_user_logged_in:b.isLoggedInUncached(),plugin_interface:w?"mobile":"desktop",initial_check_state:"unchecked",next_tab:d,opt_in_type:p?p.join(","):null};c("CheckboxPluginClickedFalcoEvent").log(function(){return a})};j=function(b){B({event:"not_you",user_ref:t,ref:h});z(b,!0);var a={client_id:s,page_id:l,app_id:e,request_id:m,plugin_interface:w?"mobile":"desktop",opt_in_type:p?p.join(","):null};c("CheckboxPluginNotYouClickedFalcoEvent").log(function(){return a})};k!=null&&a(k,j);a=new(c("IntersectionObserver"))(function(a,b){a.forEach(function(a){var b=c("intersectionObserverEntryIsIntersecting")(a);b&&a.intersectionRatio===1||(b||a.intersectionRatio===0)})},{threshold:[0,1]});a.observe(i);var D=function(d){var a={client_id:s,page_id:l,app_id:e,is_user_logged_in:!0,request_id:m,plugin_interface:w?"mobile":"desktop",initial_check_state:d.target.checked?"checked":"unchecked",next_tab:"checkbox",opt_in_type:p?p.join(","):null};c("CheckboxPluginClickedFalcoEvent").log(function(){return a});d.target.checked?n.value="checked":n.value="unchecked";if(b.accessToken!==null){d="web-plugin-checkbox-form-access-token-input";var f=document.getElementById(d);if(f!==null){var g;f.setAttribute("value",(g=b.accessToken)==null?void 0:g.toString())}else{f=document.createElement("input");f.setAttribute("id",d);f.setAttribute("type","hidden");f.setAttribute("name","access_token");f.setAttribute("value",(g=b.accessToken)==null?void 0:g.toString());i.appendChild(f)}}c("FormSubmit").send(i);B({event:"checkbox",user_ref:t,ref:h,state:n.value})};if(u){var E={client_id:s,page_id:l,app_id:e,is_user_logged_in:!0,request_id:m,plugin_interface:w?"mobile":"desktop",initial_check_state:"checked",next_tab:"checkbox",opt_in_type:p?p.join(","):null};c("CheckboxPluginClickedFalcoEvent").log(function(){return E});B({event:"checkbox",user_ref:t,ref:h,state:"checked"})}v?this.accessToken===null?x(f,C):x(f,D):!o?x(f,C):x(f,D);k=function(){c("FormSubmit").send(g),d("CSS").removeClass(g,"async_saving")};this.initMessageListener(e,l,t,k)}var b=a.prototype;b.cookieUserUncached=function(){var a="c_user=",b="i_user=",c=decodeURIComponent(document.cookie);c=c.split(";");var d="0",e="";c.forEach(function(c,f){f=c;while(f.charAt(0)==" ")f=f.substring(1);f.indexOf(a)==0&&(d=f.substring(a.length,f.length));f.indexOf(b)==0&&(e=f.substring(b.length,f.length))});if(e!="")return"0";else return d};b.isLoggedInUncached=function(){return this.cookieUserUncached()!=="0"};b.initMessageListener=function(a,b,c,d){window.addEventListener("message",function(e){var f;f=(e==null?void 0:(f=e.data)==null?void 0:(f=f.message)==null?void 0:f.params)||{};var g=f.app_id,h=f.page_id;f=f.user_ref;e=(e==null?void 0:(e=e.data)==null?void 0:e.message)||{};e=e.method;if(e!=="confirmCheckboxSubmission")return;if(g!==a||h!==b||f!==c)return;d()})};b.isITPUserAgent=function(){return typeof document.hasStorageAccess==="function"};b.performUIAction=function(a,b,e){if(!this.isITPUserAgent()){d("PluginCookieHelper").isThirdPartyCookieDisabled()?e():a();return}c("promiseDone")(document.requestStorageAccess(),function(a){b()},function(a){e()})};return a}();g["default"]=a}),98);
__d("PluginMessengerMessageUs",["Event","MNCommerceLogger"],(function(a,b,c,d,e,f,g){"use strict";function a(a,b,e,f){c("Event").listen(a,"click",function(){d("MNCommerceLogger").logAuthEvent(b,e,f,"message_us_clicked")})}g.setupMessageUsLogging=a}),98);
__d("PluginReturn",["invariant","Arbiter","Log","PlatformDialog","PlatformWidgetEndpoint","Plugin","URI"],(function(a,b,c,d,e,f,g){var h;b("Arbiter").subscribe(b("PlatformDialog").RESPONSE,function(a,c){if(c.error_code){b("Log").debug("Plugin Return Error (%s): %s",c.error_code,c.error_message||c.error_description);return}b("Plugin").reload(c.plugin_reload)});var i={auto:function(){b("Arbiter").subscribe(b("Plugin").RELOAD,function(a,b){a=typeof b==="object"?b.reloadUrl:b;i.reload(a)})},syncPlugins:function(){b("Arbiter").subscribe(b("Plugin").RELOAD,function(a,b){b.crossFrame&&i.reload(b.reloadUrl,b.reload,b.identifier)})},reload:function(a,c,d){d=(h||(h=b("URI"))).getRequestURI().removeQueryData("ret").removeQueryData("act").removeQueryData("hash").addQueryData("reload",c).addQueryData("id",d);if(a){var c=new(h||(h=b("URI")))(a);b("PlatformWidgetEndpoint").isPluginEndpoint(c.getPath())||g(0,1120);d.setPath(c.getPath()).addQueryData(c.getQueryData())}window.location.replace(d.toString())}};e.exports=i}),null);
__d("PluginXDReady",["Arbiter","Log","SecurePostMessage","UnverifiedXD"],(function(a,b,c,d,e,f,g){b={handleMessage:function(a){d("Log").debug("PluginXDReady at "+window.name+" handleMessage "+JSON.stringify(a));if(!a.method)return;try{c("Arbiter").inform("Connect.Unsafe."+a.method,JSON.parse(a.params),"persistent")}catch(a){}}};window.addEventListener("message",function(a){d("Log").debug("PluginXDReady at "+window.name+" received message "+JSON.stringify(a.data.message));if(a.data.xdArbiterSyn)d("SecurePostMessage").sendMessageAllowAnyOrigin_UNSAFE(a.source,{xdArbiterAck:!0});else if(a.data.xdArbiterHandleMessage){if(!a.data.message.method)return;try{c("Arbiter").inform("Connect.Unsafe."+a.data.message.method,JSON.parse(a.data.message.params),"persistent")}catch(a){}}},!1);a.XdArbiter=b;c("UnverifiedXD").send({xd_action:"plugin_ready",name:window.name});e=null;g["default"]=e}),98);