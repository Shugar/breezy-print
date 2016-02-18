(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("index.static", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <title>Breezy Print</title>\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n  <link rel=\"stylesheet\" href=\"stylesheets/app.css\">\n  <link rel=\"icon\" href=\"images/favicon.png\">\n  <script src=\"javascripts/vendor.js\"></script>\n  <script src=\"javascripts/app.js\"></script>\n  <script>\n    require('scripts/initialize');\n      \n    $(document).ready(function() {\n      function move() {\n          var elem = document.getElementById('progress-line')\n          var width = 0;\n          var id = setInterval(frame, 10);\n          function frame() {\n              if (width === 100) {\n                  clearInterval(id);\n                  setTimeout(function(){\n                    $('.progress').hide();\n                    $('#btn-print-another').addClass('btn-print-anotherActive');\n                  }, 500)\n                  \n              } else {\n                  width++; \n                  $('#progress-percent').text(width + '%');\n                  elem.style.width = width + '%'; \n              }\n          }\n      }\n      \n      $('.secondScreen-print').click(function() {\n        $('.secondScreen-buttons').hide();\n        $('.progress').show();\n        move()\n      });\n    });\n    \n  </script>\n</head>\n<body>\n  <div class=\"Header\">\n    <div class=\"container\">\n      <div class=\"Header-logo\"><img src=\"images/logo-big.svg\"></div>\n    </div>\n  </div>\n  <form action=\"~/print\" method=\"POST\" enctype=\"multipart/form-data\">\n    <div id=\"start\" class=\"firstScreen\">\n      <div class=\"container\">\n        <div class=\"firstScreen-stepOne\">\n          <div class=\"title\">Step 1: Upload your Document</div>\n          <div class=\"firstScreen-dragAndDrop\">\n            <input type=\"file\" class=\"dropify\">\n          </div>\n          <div class=\"button stepOneButton\">Next</div>\n        </div>\n        <div class=\"firstScreen-stepTwo\">\n          <div class=\"title\">Step 2: Enter your Email Address</div>\n          <input type=\"text\" placeholder=\"your@yourcompany.org\" class=\"firstScreen-input\">\n          <div class=\"firstScreen-secure\">\n            <div class=\"firstScreen-secureText\">All documents are encrypted both in transit and at rest, and are deleted immediately upon printing.</div><a href=\"#\">Learn more about security.</a>\n          </div>\n          <div class=\"button firstScreen-back\">BACK</div>\n          <div id=\"btn-start-next\" class=\"button\">Next</div>\n        </div>\n      </div>\n    </div>\n    <div id=\"release\" class=\"secondScreen\">\n      <div class=\"container\">\n        <div class=\"title\">Step 3: Printing</div>\n        <div class=\"secondScreen-printing\">\n          <div class=\"secondScreen-printingDocument\">You are Printing: <span id=\"file-info\">Sometimes-I-make-fake-files.pdf</span></div>\n          <div class=\"secondScreen-info\">\n            <div class=\"secondScreen-infoOwned\">Email: <span>juser@weil.com</span></div>\n            <div class=\"secondScreen-infoModified\">Modified: <span>Jan 26, 2016</span></div>\n            <div class=\"secondScreen-infoSize\">File size: <span>2.525 kb</span></div>\n          </div>\n        </div>\n        <div class=\"secondScreen-printer\">\n          <div class=\"secondScreen-printerStepOne\">\n            <div class=\"secondScreen-printerTitle\">Enter Shortcode to Find A Printer</div>\n            <div class=\"secondScreen-printerInput\">\n              <input type=\"text\" id=\"txt-shortcode\" placeholder=\"Shortcode\">\n              <div class=\"button secondScreen-validate\">Validate</div>\n            </div>\n          </div>\n          <div class=\"secondScreen-printerStepTwo\">\n            <div class=\"secondScreen-printerTitle\"><img src=\"images/printer.svg\">767-CVS\n              <div class=\"secondScreen-printerChange\">Change printer</div>\n            </div>\n            <div class=\"secondScreen-form\">\n              <div class=\"secondScreen-formSectionOne\">\n                <label>\n                  <input type=\"radio\" name=\"radio\" checked><span class=\"lbl\">Portait</span>\n                </label>\n                <label>\n                  <input type=\"radio\" name=\"radio\"><span class=\"lbl\">Landscape</span>\n                </label>\n              </div>\n              <div class=\"secondScreen-formSectionTwo\">\n                <label>\n                  <input type=\"checkbox\" checked><span class=\"lbl\">Print in Color</span>\n                </label>\n                <label>\n                  <input type=\"checkbox\"><span class=\"lbl\">Print on Both Sides</span>\n                </label>\n              </div>\n              <div class=\"secondScreen-formSectionThree\">\n                <label>Pages to Print\n                  <input type=\"text\" pattern=\"d{1,5}\" placeholder=\"1-5\">\n                </label>\n                <label>Copies\n                  <input type=\"text\" pattern=\"d{1,5}\" placeholder=\"1-5\">\n                </label>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div style=\"display: none\" class=\"secondScreen-stepThree\">\n          <div class=\"secondScreen-progress\">\n            <div class=\"secondScreen-progressLine\"></div>\n            <div class=\"secondScreen-progressPercent\"></div>\n          </div>\n        </div>\n        <div class=\"secondScreen-buttons\">\n          <div class=\"button secondScreen-back\">BACK</div>\n          <div class=\"button secondScreen-cancel\">Cancel Job</div>\n          <div class=\"button secondScreen-next\">NEXT</div>\n          <div class=\"button secondScreen-print\">PRINT</div>\n        </div>\n        <div class=\"progress\">\n          <div id=\"progress-line\" class=\"progress-line\"></div>\n          <div id=\"progress-percent\" class=\"progress-percent\"></div>\n        </div>\n        <div id=\"btn-print-another\" class=\"button\">Print Another Document</div>\n      </div>\n    </div>\n  </form>\n</body>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("partials/firstScreen", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div id=\"start\" class=\"firstScreen\">\n  <div class=\"container\">\n    <div class=\"firstScreen-stepOne\">\n      <div class=\"title\">Step 1: Upload your Document</div>\n      <div class=\"firstScreen-dragAndDrop\">\n        <input type=\"file\" class=\"dropify\"/>\n      </div>\n      <div class=\"button stepOneButton\">Next</div>\n    </div>\n    <div class=\"firstScreen-stepTwo\">\n      <div class=\"title\">Step 2: Enter your Email Address</div>\n      <input type=\"text\" placeholder=\"your@yourcompany.org\" class=\"firstScreen-input\"/>\n      <div class=\"firstScreen-secure\">\n        <div class=\"firstScreen-secureText\">All documents are encrypted both in transit and at rest, and are deleted immediately upon printing.</div><a href=\"#\">Learn more about security.</a>\n      </div>\n      <div class=\"button firstScreen-back\">BACK</div>\n      <div id=\"btn-start-next\" class=\"button\">Next</div>\n    </div>\n  </div>\n</div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("partials/footer", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"Footer\">\n  <div class=\"container\">\n    <div class=\"Footer-logo\">Secure Printing Powered by<img src=\"images/breezy-logo.png\"/></div>\n  </div>\n</div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("partials/header", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div class=\"Header\">\n  <div class=\"container\">\n    <div class=\"Header-logo\"><img src=\"images/logo-big.svg\"/></div>\n  </div>\n</div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("partials/secondScreen", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("\n<div id=\"release\" class=\"secondScreen\">\n  <div class=\"container\">\n    <div class=\"title\">Step 3: Printing</div>\n    <div class=\"secondScreen-printing\">\n      <div class=\"secondScreen-printingDocument\">You are Printing: <span id=\"file-info\">Sometimes-I-make-fake-files.pdf</span></div>\n      <div class=\"secondScreen-info\">\n        <div class=\"secondScreen-infoOwned\">Email: <span>juser@weil.com</span></div>\n        <div class=\"secondScreen-infoModified\">Modified: <span>Jan 26, 2016</span></div>\n        <div class=\"secondScreen-infoSize\">File size: <span>2.525 kb</span></div>\n      </div>\n    </div>\n    <div class=\"secondScreen-printer\">\n      <div class=\"secondScreen-printerStepOne\">\n        <div class=\"secondScreen-printerTitle\">Enter Shortcode to Find A Printer</div>\n        <div class=\"secondScreen-printerInput\">\n          <input type=\"text\" id=\"txt-shortcode\" placeholder=\"Shortcode\"/>\n          <div class=\"button secondScreen-validate\">Validate</div>\n        </div>\n      </div>\n      <div class=\"secondScreen-printerStepTwo\">\n        <div class=\"secondScreen-printerTitle\"><img src=\"images/printer.svg\"/>767-CVS\n          <div class=\"secondScreen-printerChange\">Change printer</div>\n        </div>\n        <div class=\"secondScreen-form\">\n          <div class=\"secondScreen-formSectionOne\">\n            <label>\n              <input type=\"radio\" name=\"radio\" checked=\"checked\"/><span class=\"lbl\">Portait</span>\n            </label>\n            <label>\n              <input type=\"radio\" name=\"radio\"/><span class=\"lbl\">Landscape</span>\n            </label>\n          </div>\n          <div class=\"secondScreen-formSectionTwo\">\n            <label>\n              <input type=\"checkbox\" checked=\"checked\"/><span class=\"lbl\">Print in Color</span>\n            </label>\n            <label>\n              <input type=\"checkbox\"/><span class=\"lbl\">Print on Both Sides</span>\n            </label>\n          </div>\n          <div class=\"secondScreen-formSectionThree\">\n            <label>Pages to Print\n              <input type=\"text\" pattern=\"d{1,5}\" placeholder=\"1-5\"/>\n            </label>\n            <label>Copies\n              <input type=\"text\" pattern=\"d{1,5}\" placeholder=\"1-5\"/>\n            </label>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div style=\"display: none\" class=\"secondScreen-stepThree\">\n      <div class=\"secondScreen-progress\">\n        <div class=\"secondScreen-progressLine\"></div>\n        <div class=\"secondScreen-progressPercent\"></div>\n      </div>\n    </div>\n    <div class=\"secondScreen-buttons\">\n      <div class=\"button secondScreen-back\">BACK</div>\n      <div class=\"button secondScreen-cancel\">Cancel Job</div>\n      <div class=\"button secondScreen-next\">NEXT</div>\n      <div class=\"button secondScreen-print\">PRINT</div>\n    </div>\n    <div class=\"progress\">\n      <div id=\"progress-line\" class=\"progress-line\"></div>\n      <div id=\"progress-percent\" class=\"progress-percent\"></div>\n    </div>\n    <div id=\"btn-print-another\" class=\"button\">Print Another Document</div>\n  </div>\n</div>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("showcase.static", function(exports, require, module) {
var __templateData = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

var jade_indent = [];
buf.push("<!DOCTYPE html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n  <title>Breezy Print</title>\n  <meta name=\"viewport\" content=\"width=device-width\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\">\n  <link rel=\"stylesheet\" href=\"stylesheets/app.css\">\n  <link rel=\"icon\" href=\"images/favicon.png\">\n</head>\n<body> \n  <div class=\"container\">\n    <div class=\"case\">\n      <div class=\"title\">Title</div>\n    </div>\n    <div class=\"case\">\n      <div class=\"button\">Button</div>\n    </div>\n    <div class=\"case\">\n      <div class=\"button button-disabled\">Button</div>\n    </div>\n  </div>\n</body>");;return buf.join("");
};
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//# sourceMappingURL=templates.js.map