(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('index', ['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.index = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    exports.__esModule = true;
    var getMixins = exports.getMixins = function getMixins(_ref) {
        var lang = _ref.lang;

        var year2CC = function year2CC(year) {
            //debugger;
            var ccyears = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
            var _result = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (year + "")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var char = _step.value;

                    _result += ccyears[char];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return _result;
        };
        return {
            methods: {
                $$getLang: function $$getLang() {
                    return this["lang"] || lang;
                },
                $$setLang: function $$setLang(l) {
                    debugger;
                    if (Object.prototype.toString.call(l) === "[object Object]") {
                        lang = Object.assign(this.$$getLang(), l);
                    }
                },
                $$getMonthText: function $$getMonthText(mnh) {
                    var monthall;
                    if ((monthall = this.$$getLang().el.datepicker.months["all"]) && typeof monthall === 'string') {
                        var execExp = new Function('with(this){return ' + monthall + ';}');
                        return execExp.call({ $$month: mnh });
                    } else {
                        var mnts = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
                        return this.$$getLang().el.datepicker.months[mnts[mnh - 1]];
                    }
                },
                $$getYearText: function $$getYearText(year, panel) {
                    var year_exp;
                    switch (panel) {
                        case "year":
                            year_exp = this.$$getLang().el.datepicker.panel_year_btn_year;
                            break;
                        case "date":
                            year_exp = this.$$getLang().el.datepicker.panel_date_btn_year;
                            break;
                        case "panel":
                            year_exp = this.$$getLang().el.datepicker.years;
                            break;
                        default:
                            year_exp = year;
                            break;
                    }

                    var execExpYear = new Function('with(this){return ' + year_exp + ';}');
                    var result = execExpYear.call({ $$year: year, $$year2CC: year2CC });
                    return result;
                }
            }
        };
    };
});