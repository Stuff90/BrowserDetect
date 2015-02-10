// =====================
// Browser Detect Class
// Created by Ileotech 
// =====================



var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
    dataBrowser: [
        {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
        },
        {   string: navigator.userAgent,
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
        },
        {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
        },
        {
            string: navigator.vendor,
            subString: "iCab",
            identity: "iCab"
        },
        {
            string: navigator.vendor,
            subString: "KDE",
            identity: "Konqueror"
        },
        {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
        },
        {
            string: navigator.vendor,
            subString: "Camino",
            identity: "Camino"
        },
        {       // for newer Netscapes (6+)
            string: navigator.userAgent,
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
        },
        {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {   // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ],
    dataOS : [
        {
            string: navigator.platform,
            subString: "Win",
            identity: "Windows"
        },
        {
            string: navigator.platform,
            subString: "Mac",
            identity: "Mac"
        },
        {
            string: navigator.platform,
            subString: "Linux",
            identity: "Linux"
        },
        {
            string: navigator.userAgent,
            subString: "iPhone",
            identity: "iPhone"
        },
        {
            string: navigator.userAgent,
            subString: "iPad",
            identity: "iPad"
        },
        {
            string: navigator.userAgent,
            subString: "Android",
            identity: "Android"
        }
    ]

};

var browserDetect = BrowserDetect;
browserDetect.init();


 var mobileDetect = {
    Android: function() { return navigator.userAgent.match(/Android/i) !== null ? true : false ;},
    AndroidPhone: function() { return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i) !== null ? true : false ; },
    AndroidTablet: function() { return navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i) !== null ? true : false ; },
    BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i)!== null ? true : false ; },
    iOS: function() { return navigator.userAgent.match(/iPhone|iPod|iPad/i) !== null ? true : false ; },
    iOSPhone: function() { return navigator.userAgent.match(/iPhone|iPod/i)!== null ? true : false ; },
    iOSTablet: function() { return navigator.userAgent.match(/iPad/i)!== null ? true : false ; },
    Opera: function() { return navigator.userAgent.match(/Opera Mini/i)!== null ? true : false ; },
    Windows: function() { return navigator.userAgent.match(/IEMobile/i)!== null ? true : false ; },
    isTablet: function() {return (this.AndroidTablet() || this.BlackBerry() || this.iOSTablet() || this.Opera() || this.Windows()) !== false ? true : false;},
    isPhone: function() {return (this.AndroidPhone() || this.BlackBerry() || this.iOSPhone() || this.Opera() || this.Windows()) !== false ? true : false;},
    deviceOrientation: function() { return (this.any()!== false ? (window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'): null );},
    any: function() { return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows()) !== false ? true : false; }

};
browserDetect.mobileDetect = mobileDetect;

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('browserDetect', [], function() {
      return browserDetect;
    });
}
