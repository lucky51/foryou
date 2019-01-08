(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("en", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.en = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.default = {
        el: {
            datepicker: {
                panel_date_btn_year: "'Year.' +$$year",
                panel_year_btn_year: "$$year",
                today: "tday",
                yesterday: "yday",
                tomorrow: "twm",
                years: "$$year",
                months: {
                    jan: 'Jan',
                    feb: 'Feb',
                    mar: 'Mar',
                    apr: 'Apr',
                    may: 'May',
                    jun: 'Jun',
                    jul: 'Jul',
                    aug: 'Aug',
                    sep: 'Sep',
                    oct: 'Oct',
                    nov: 'Nov',
                    dec: 'Dec'
                },
                weeks: {
                    sun: 'Su',
                    mon: 'Mo',
                    tue: 'Tu',
                    wed: 'We',
                    thu: 'Th',
                    fri: 'Fr',
                    sat: 'Sa'
                }
            }
        }
    };
    module.exports = exports.default;
});