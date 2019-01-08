(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define("fr", ["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.fr = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    exports.__esModule = true;
    exports.default = {
        el: {
            datepicker: {
                panel_date_btn_year: "'Année.' +$$year",
                panel_year_btn_year: "$$year",
                today: "Auj.",
                years: "$$year",
                yesterday: "Hie.",
                tomorrow: "Dem.",
                months: {
                    jan: 'Jan',
                    feb: 'Fév',
                    mar: 'Mar',
                    apr: 'Avr',
                    may: 'Mai',
                    jun: 'Jun',
                    jul: 'Jul',
                    aug: 'Aoû',
                    sep: 'Sep',
                    oct: 'Oct',
                    nov: 'Nov',
                    dec: 'Déc'
                },
                weeks: {
                    sun: 'Di',
                    mon: 'Lu',
                    tue: 'Ma',
                    wed: 'Me',
                    thu: 'Je',
                    fri: 'Ve',
                    sat: 'Sa'
                }
            }
        }
    };
    module.exports = exports.default;
});