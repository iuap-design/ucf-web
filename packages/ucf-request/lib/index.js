"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var x_xsrf_token = '',
    random_num = Math.random();

var noop = function noop() {};

var _default = function _default(url, options) {
  var startFunc = options['start'] || noop;
  var endFunc = options['end'] || noop;
  startFunc();
  var params = Object.assign({}, options.params, options.method.toLowerCase() == 'get' ? {
    r: Math.random()
  } : {});
  var defaultOptions = {
    timeout: 8000,
    method: options.method,
    url: url,
    data: options.data,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'random-num': random_num,
      'x-xsrf-token': x_xsrf_token
    },
    params: params
  };
  return (0, _axios["default"])(Object.assign(defaultOptions, options)).then(function (res) {
    endFunc();
    var inner_x_xsrf_token = res.headers['x-xsrf-token'];

    if (inner_x_xsrf_token) {
      x_xsrf_token = inner_x_xsrf_token;
    }

    return new Promise(function (resolve, reject) {
      resolve(res.data);
    });
  })["catch"](function (err) {
    endFunc();
    console.log(err);
    return new Promise(function (resolve, reject) {
      var errMsg = "request Error! http ".concat(status);
      reject(err);
    });
  });
};

exports["default"] = _default;