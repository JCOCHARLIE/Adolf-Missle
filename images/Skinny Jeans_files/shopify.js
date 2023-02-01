// Shopify assume-nothing initializer
// https://gist.github.com/carolineschnapp/5397337
(function(){
  var semver_compare = function(a, b) {
    var pa = a.split('.');
    var pb = b.split('.');
    for (var i = 0; i < 3; i++) {
      var na = Number(pa[i]);
      var nb = Number(pb[i]);
      if (na > nb) return 1;
      if (nb > na) return -1;
      if (!isNaN(na) && isNaN(nb)) return 1;
      if (isNaN(na) && !isNaN(nb)) return -1;
    }
    return 0;
  };
  
  var loadScript = function(url, callback){
    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){ // Internet Explorer
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" || script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else { // Any other browser
      script.onload = function(){
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  var myAppJavaScript = function($){
    'use strict';

    // Cookies.js - 0.4.0
    // https://github.com/ScottHamper/Cookies/blob/master/src/cookies.js
    var Cookies = function (key, value, options) {
      return arguments.length === 1 ?
        Cookies.get(key) : Cookies.set(key, value, options);
    };

    // Allows for setter injection in unit tests
    Cookies._document = document;
    Cookies._navigator = navigator;
    
    Cookies.defaults = {
      path: '/'
    };

    Cookies.get = function (key) {
      if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
        Cookies._renewCache();
      }
      return Cookies._cache[key];
    };
    
    Cookies.set = function (key, value, options) {
      options = Cookies._getExtendedOptions(options);
      options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);
      Cookies._document.cookie = Cookies._generateCookieString(key, value, options);
      return Cookies;
    };

    Cookies.expire = function (key, options) {
      return Cookies.set(key, undefined, options);
    };
    
    Cookies._getExtendedOptions = function (options) {
      return {
        path: options && options.path || Cookies.defaults.path,
        domain: options && options.domain || Cookies.defaults.domain,
        expires: options && options.expires || Cookies.defaults.expires,
        secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
      };
    };

    Cookies._isValidDate = function (date) {
      return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
    };

    Cookies._getExpiresDate = function (expires, now) {
      now = now || new Date();
      switch (typeof expires) {
        case 'number': expires = new Date(now.getTime() + expires * 1000); break;
        case 'string': expires = new Date(expires); break;
      }

      if (expires && !Cookies._isValidDate(expires)) {
        throw new Error('`expires` parameter cannot be converted to a valid Date instance');
      }
      return expires;
    };
    
    Cookies._generateCookieString = function (key, value, options) {
      key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
      key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
      value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
      options = options || {};

      var cookieString = key + '=' + value;
      cookieString += options.path ? ';path=' + options.path : '';
      cookieString += options.domain ? ';domain=' + options.domain : '';
      cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
      cookieString += options.secure ? ';secure' : '';

      return cookieString;
    };

    Cookies._getCookieObjectFromString = function (documentCookie) {
      var cookieObject = {};
      var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

      for (var i = 0; i < cookiesArray.length; i++) {
        var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

        if (cookieObject[cookieKvp.key] === undefined) {
          cookieObject[cookieKvp.key] = cookieKvp.value;
        }
      }

      return cookieObject;
    };

    Cookies._getKeyValuePairFromCookieString = function (cookieString) {
      // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
      var separatorIndex = cookieString.indexOf('=');

      // IE omits the "=" when the cookie value is an empty string
      separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

      return {
        key: decodeURIComponent(cookieString.substr(0, separatorIndex)),
        value: decodeURIComponent(cookieString.substr(separatorIndex + 1))
      };
    };
    
    Cookies._renewCache = function () {
      Cookies._cache = Cookies._getCookieObjectFromString(Cookies._document.cookie);
      Cookies._cachedDocumentCookie = Cookies._document.cookie;
    };

    Cookies._areEnabled = function () {
      var testKey = 'cookies.js';
      var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
      Cookies.expire(testKey);
      return areEnabled;
    };

    Cookies.enabled = Cookies._areEnabled();

    if (typeof define === 'function' && define.amd) { // AMD support
      define("cookies", function () { return Cookies; });
    } else if (typeof exports !== 'undefined') { // CommonJS and Node.js module support
      // Support Node.js specific `module.exports` (which can be a function)
      if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Cookies;
      }
      // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
      exports.Cookies = Cookies;
    } else {
      window.Cookies = Cookies;
    }
    // End Cookies.js

    var getEmailFromCookie = function(){
      var old_cookie = Cookies.get('fn_customer_email');
      var email_cookie = Cookies.get('email');
      return email_cookie ? email_cookie : old_cookie;
    }

    var syncCart = function(){
      $.ajax({
        type: "POST",
        url: "https://sailshopify-webhooks-prod.herokuapp.com/carts.json",
        data: {
          shop: Shopify.shop,
          token: Cookies.get('cart'),
          email: getEmailFromCookie(),
          sailthru_bid: Cookies.get('sailthru_bid'),
          sailthru_hid: Cookies.get('sailthru_hid')
        },
      }).done(function(data) {
        console.log(data)
      });
    };

    var cookieRegistry = {};
    var listenCookieChange = function(cookieName, callback) {
      var timerId = setInterval(function(){
        if (cookieRegistry[cookieName] || Cookies.get(cookieName) != null){
          if (Cookies.get(cookieName) != cookieRegistry[cookieName]) {
            cookieRegistry[cookieName] = Cookies.get(cookieName);
            callback();
          }
        } else {
          cookieRegistry[cookieName] = Cookies.get(cookieName);
        }
      }, 2500);
    }

    var trySyncCart = function() {
      if(Cookies.get('cart') && (Cookies.get('sailthru_hid') || getEmailFromCookie())){
        syncCart();
      }
    }

    var getHidFromEmail = function(email){
      $.get(
        "https://sailshopify-webhooks-prod.herokuapp.com/users",
        {
          email: email,
          shop: Shopify.shop
        },
        function (data) {
          if(data.cookie){
            Cookies.set('sailthru_hid', data.cookie);
          }
        }
      );
    }

    if(! Cookies.get("sailthru_set")){
      Cookies.expire("sailthru_hid");
      Cookies.set("sailthru_set", new Date());
    }

    var hid = Cookies.get('sailthru_hid');
    var email = getEmailFromCookie();

    var email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!hid && email && email.match(email_regex)){
      getHidFromEmail(email);
    }

    trySyncCart();

    // Ajax can change existing cookie - need to keep listening
    listenCookieChange('cart', function() {
      trySyncCart();
    });
  };

  loadScript('//ak.sail-horizon.com/spm/spm.v1.min.js', function(){
    Sailthru.init({ customerId: '5048814b1f8cee21211901ab507144a2' });
  });
  
  // if jQuery isn't loaded or is too old (< 1.7), load 1.9.1 from google CDN, then execute our code
  if ((typeof jQuery === 'undefined') || (semver_compare(jQuery.fn.jquery, '1.7') == -1)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
      jQuery191 = jQuery.noConflict(true);
      myAppJavaScript(jQuery191);
    });
  } else {
    myAppJavaScript(jQuery);
  }
})();
