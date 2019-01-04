import forYouPagination from './forYouPagination'
import forYouDatePicker from './forYouDatePicker'
import defaultLang  from '../lib/locale/zh'
const Amplugin ={
    install: function (Vue, options) {
        debugger;
        let lang = Object.assign(defaultLang, options || {});
        Vue.mixin({
            methods: { 
                $$getLang(){
                    return lang;
                },
                $$getMonthText(mnh){
                    var monthall;
                    if ((monthall = lang.el.datepicker.months["all"]) && typeof monthall === 'string') {
                        var execExp = new Function(`with(this){return ${monthall};}`);
                        return execExp.call({$$month:mnh});    
                    }else{
                        var mnts =["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
                        return lang.el.datepicker.months[mnts[mnh-1]];
                    }
                },
                $$getYearText(year){
                    var year_exp =lang.el.datepicker.btn_year;
                    var execExpYear = new Function(`with(this){return ${year_exp};}`);
                    var result = execExpYear.call({$$year:year});
                    return result;
                }
        }});
        Vue.component(forYouPagination.name, forYouPagination);
        Vue.component(forYouDatePicker.name, forYouDatePicker);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Amplugin)
}

export default Amplugin