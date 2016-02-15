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

buf.push("<!DOCTYPE html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><title>Breezy Print</title><meta name=\"viewport\" content=\"width=device-width\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no\"><link rel=\"stylesheet\" href=\"stylesheets/app.css\"><link rel=\"icon\" href=\"images/favicon.png\"><script src=\"javascripts/vendor.js\"></script><script src=\"javascripts/app.js\"></script><script>require('initialize');\n\n$(document).ready(function() {\n  function move() {\n      var elem = document.getElementById('progress-line')\n      var width = 0;\n      var id = setInterval(frame, 10);\n      function frame() {\n          if (width === 100) {\n              clearInterval(id);\n              setTimeout(function(){\n                $('.progress').hide();\n                $('#btn-print-another').addClass('btn-print-anotherActive');\n              }, 500)\n              \n          } else {\n              width++; \n              $('#progress-percent').text(width + '%');\n              elem.style.width = width + '%'; \n          }\n      }\n  }\n  \n  $('.secondScreen-print').click(function() {\n    $('.secondScreen-buttons').hide();\n    $('.progress').show();\n    move()\n  });\n});\n</script></head><body><div class=\"Header\"><div class=\"container\"><div class=\"Header-logo\"><img src=\"images/logo-big.svg\"></div></div></div><div id=\"start\" class=\"firstScreen\"><div class=\"container\"><div class=\"firstScreen-stepOne\"><div class=\"title\">Step 1: Upload your Document</div><div class=\"firstScreen-dragAndDrop\"><form action=\"~/print\" method=\"POST\" enctype=\"multipart/form-data\" class=\"firstScreen-dropzone dropzone\"><div class=\"fallback\"><input type=\"file\" id=\"docUpload\" name=\"file\" multiple class=\"dropzone\"></div></form></div><div class=\"button stepOneButton\">Next</div></div><div class=\"firstScreen-stepTwo\"><div class=\"title\">Step 2: Enter your Email Address</div><input type=\"text\" placeholder=\"your@yourcompany.org\" class=\"firstScreen-input\"><div class=\"firstScreen-secure\"><div class=\"firstScreen-secureText\">All documents are encrypted both in transit and at rest, and are deleted immediately upon printing.</div><a href=\"#\">Learn more about security.</a></div><div id=\"btn-start-next\" class=\"button\">Next</div></div></div></div><div id=\"release\" class=\"secondScreen\"><div class=\"container\"><div class=\"title\">Step 3: Printing</div><div class=\"secondScreen-printing\"><div class=\"secondScreen-printingDocument\">You are Printing: <span id=\"file-info\">Sometimes-I-make-fake-files.pdf</span></div><div class=\"secondScreen-info\"><div class=\"secondScreen-infoOwned\">Email: <span>juser@weil.com</span></div><div class=\"secondScreen-infoModified\">Modified: <span>Jan 26, 2016</span></div><div class=\"secondScreen-infoSize\">File size: <span>2.525 kb</span></div></div></div><div class=\"secondScreen-printer\"><div class=\"secondScreen-printerStepOne\"><div class=\"secondScreen-printerTitle\">Enter Shortcode to Find A Printer</div><div class=\"secondScreen-printerInput\"><input type=\"text\" id=\"txt-shortcode\" placeholder=\"Shortcode\"><div class=\"button secondScreen-validate\">Validate</div></div></div><div class=\"secondScreen-printerStepTwo\"><div class=\"secondScreen-printerTitle\"><img src=\"images/printer.svg\">767-CVS<div class=\"secondScreen-printerChange\">Change printer</div></div><form class=\"secondScreen-form\"><div class=\"secondScreen-formSectionOne\"><label><input type=\"radio\" name=\"radio\" checked><span class=\"lbl\">Portait</span></label><label><input type=\"radio\" name=\"radio\"><span class=\"lbl\">Landscape</span></label></div><div class=\"secondScreen-formSectionTwo\"><label><input type=\"checkbox\" checked><span class=\"lbl\">Print in Color</span></label><label><input type=\"checkbox\"><span class=\"lbl\">Print on Both Sides</span></label></div><div class=\"secondScreen-formSectionThree\"><label>Pages to Print<input type=\"text\" pattern=\"d{1,5}\" placeholder=\"1-5\"></label><label>Copies<input type=\"text\" pattern=\"d{1,5}\" placeholder=\"1-5\"></label></div></form></div></div><div style=\"display: none\" class=\"secondScreen-stepThree\"><div class=\"secondScreen-progress\"><div class=\"secondScreen-progressLine\"></div><div class=\"secondScreen-progressPercent\"></div></div></div><div class=\"secondScreen-buttons\"><div class=\"button secondScreen-back\">BACK</div><div class=\"button secondScreen-cancel\">Cancel Job</div><div class=\"button secondScreen-next\">NEXT</div><div class=\"button secondScreen-print\">PRINT</div></div><div class=\"progress\"><div id=\"progress-line\" class=\"progress-line\"></div><div id=\"progress-percent\" class=\"progress-percent\"></div></div><div id=\"btn-print-another\" class=\"button\">Print Another Document</div></div></div></body>");;return buf.join("");
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

;require.register("initialize", function(exports, require, module) {
$(document).ready(function() {
  $('.stepOneButton').click(function() {
    $('.firstScreen-stepOne').hide();
    return $('.firstScreen-stepTwo').show();
  });
  $('.secondScreen-back').click(function() {
    $('.firstScreen-stepTwo').hide();
    $('.firstScreen-stepOne').show();
    $('#release').hide();
    return $('#start').show();
  });
  $('.secondScreen-next').click(function() {
    $('.secondScreen-printerStepOne').hide();
    $('.secondScreen-printerStepTwo').show();
    $(this).hide();
    return $('.secondScreen-print').addClass('secondScreen-printActive');
  });
  $('.secondScreen-cancel').click(function() {
    return swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this document!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false
    }, function() {
      return swal({
        title: 'Deleted!',
        text: 'Your document has been deleted.',
        type: 'success'
      }, function() {
        return document.location = '/';
      });
    });
  });
  $('#btn-start-next').click(function() {
    $('#start').hide();
    $('#release').show();
    return $('#file-info').html($('#docUpload').val());
  });
  $('#btn-release-next').click(function() {
    return $.ajax({
      dataType: 'json',
      url: 'endpoint?shortCode=' + $('#txt-shortcode').val(),
      success: function(data) {
        $('#select-printer').hide();
        $('#set-printer-settings').show();
        $('#hid-endpointId').val(data.endpoint_id);
        $('#printer-name').html(data.display_name);
        $('#btn-release-next').hide();
        return $('#btn-print').show();
      }
    });
  });
  $('#btn-print-another').click(function() {
    document.location = '/';
    return $(this).hide();
  });
  return $('form').ajaxForm({
    success: function() {
      $('#action-panel').hide();
      return $('#print-another-panel').show();
    }
  });
});
});

;
//# sourceMappingURL=app.js.map