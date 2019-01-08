(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("ja", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.ja = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.default = {
        el: {
            datepicker: {
                panel_date_btn_year: "$$year+' 年,'",
                panel_year_btn_year: "$$year",
                years: "$$year",
                today: "今日",
                yesterday: "昨日",
                tomorrow: "明日",
                months: {
                    all: "$$month+' 月'"
                },
                weeks: {
                    sun: '日',
                    mon: '月',
                    tue: '火',
                    wed: '水',
                    thu: '木',
                    fri: '金',
                    sat: '土'
                }
            }
        }
    };
    module.exports = exports.default;
});