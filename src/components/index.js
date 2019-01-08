import forYouPagination from './forYouPagination'
import forYouDatePicker from './forYouDatePicker'
import {  getMixins } from '../lib/locale'
import defaultLang  from '../lib/locale/zh'
const Amplugin ={
    install: function (Vue, options) {
        let lang = Object.assign(defaultLang, (options&&options["lang"]) || {});
        Vue.mixin(getMixins({ lang}));
        Vue.component(forYouPagination.name, forYouPagination);
        Vue.component(forYouDatePicker.name, forYouDatePicker);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Amplugin)
}

export default Amplugin