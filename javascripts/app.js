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
require.register("scripts/initialize", function(exports, require, module) {
var validateEmail, validatePages;

validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

validatePages = /\W*(All|all)\W*|^(\s*\d+\s*\-\s*\d+\s*,?|\s*\d+\s*,?)+$/;

$(document).ready(function() {
  $('.dropify').dropify({
    allowedFileExtensions: ['pdf', 'jpg', 'png']
  });
  $('.dropify').change(function() {
    if ($(this).val() !== '') {
      return $('.stepOneButton').removeClass('button-disabled');
    }
  });
  $('.firstScreen-input').on('input', function() {
    if ($(this).val() === '') {
      $('#btn-start-next').addClass('button-disabled');
    }
    if ($(this).val().match(validateEmail)) {
      return $('#btn-start-next').removeClass('button-disabled');
    }
  });
  $('.secondScreen-printerInputValue').on('input', function() {
    $('.secondScreen-next').addClass('button-disabled');
    if ($(this).val() !== '') {
      return $('.secondScreen-next').removeClass('button-disabled');
    }
  });
  $('.secondScreen-form [type="text"]').on('input', function() {
    $('.secondScreen-print').addClass('button-disabled');
    if ($(this).val() !== '') {
      return $('.secondScreen-print').removeClass('button-disabled');
    }
  });
  $('.secondScreen-pagesToPrint').on('input', function() {
    $('.secondScreen-print').addClass('button-disabled');
    if ($(this).val().match(validatePages)) {
      return $('.secondScreen-print').removeClass('button-disabled');
    }
  });
  $('.stepOneButton').click(function() {
    $('.firstScreen-stepOne').hide();
    return $('.firstScreen-stepTwo').show();
  });
  $('.firstScreen-back').click(function() {
    $('.firstScreen-stepTwo').hide();
    return $('.firstScreen-stepOne').show();
  });
  $('.secondScreen-back').click(function() {
    $('#release').hide();
    return $('#start').show();
  });
  $('.secondScreen-printerChange').click(function() {
    $('.secondScreen-printerStepTwo').hide();
    $('.secondScreen-printerStepOne').show();
    $('.secondScreen-print').removeClass('secondScreen-printActive');
    return $('.secondScreen-next').show();
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