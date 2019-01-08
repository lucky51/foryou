(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("zh1", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.zh1 = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.default = {
        el: {
            datepicker: {
                panel_date_btn_year: "$$year+' 年'",
                panel_year_btn_year: "$$year",
                years: "$$year",
                months: {
                    all: "$$month+' 月'"
                },
                today: "今天",
                yesterday: "昨天",
                tomorrow: "明天",
                weeks: {
                    sun: '日',
                    mon: '一',
                    tue: '二',
                    wed: '三',
                    thu: '四',
                    fri: '五',
                    sat: '六'
                }
            }
        }
    };
    module.exports = exports.default;
});