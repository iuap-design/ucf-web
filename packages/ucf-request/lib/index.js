"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var x_xsrf_token = '',
    random_num = Math.random();

var _default = function _default(url, options) {
  options['start'] && options['start']();
  var params = Object.assign({}, options.params, options.method.toLowerCase() == 'get' ? {
    r: Math.random()
  } : {});
  return (0, _axios.default)({
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
  }).then(function (res) {
    options['end'] && options['end']();
    var inner_x_xsrf_token = res.headers['x-xsrf-token'];

    if (inner_x_xsrf_token) {
      x_xsrf_token = inner_x_xsrf_token;
    }

    return new Promise(function (resolve, reject) {
      resolve(res.data);
    });
  }).catch(function (err) {
    options['end'] && options['end']();
    console.log(err);
    var res = err.response;

    if (res) {
      var _status = res.status,
          msg = res.data.msg;

      switch (_status) {
        case 401:
          console.log("RBAC鉴权失败!" + msg);
          return Promise.resolve(res);

        case 306:
          window.top.location.href = '/wbalone/pages/login/login.html';
          break;

        default:
      }
    }

    return new Promise(function (resolve, reject) {
      var errMsg = "request\u53D1\u751F\u670D\u52A1\u5668 http ".concat(status, " \u8BF7\u6C42\u9519\u8BEF!");
      reject({
        code: -1,
        data: [],
        message: errMsg
      });
    });
  });
};

exports.default = _default;