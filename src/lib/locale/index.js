
 


export let getMixins = function({lang}){
    let year2CC = function (year) {
        //debugger;
        var ccyears = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        var _result = "";
        for (const char of year+"") {
            _result += ccyears[char];
        }
        return _result;
    }
    return {
        methods: {
            $$getLang() {
                return this["lang"]||lang;
            },
            $$setLang(l){
                debugger;
                if (Object.prototype.toString.call(l) ==="[object Object]"){
                    lang = Object.assign(this.$$getLang(),l);
                }
            },
            $$getMonthText(mnh) {
                var monthall;
                if ((monthall = this.$$getLang().el.datepicker.months["all"]) && typeof monthall === 'string') {
                    var execExp = new Function(`with(this){return ${monthall};}`);
                    return execExp.call({ $$month: mnh });
                } else {
                    var mnts = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]
                    return this.$$getLang().el.datepicker.months[mnts[mnh - 1]];
                }
            },
            $$getYearText(year, panel) {
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

                var execExpYear = new Function(`with(this){return ${year_exp};}`);
                var result = execExpYear.call({ $$year: year, $$year2CC: year2CC });
                return result;
            }
        }
    }
}