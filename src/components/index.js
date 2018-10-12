import forYouPagination from './forYouPagination'
import forYouDatePicker from './forYouDatePicker'
const Amplugin ={
    install :function (Vue) {
        Vue.component(forYouPagination.name, forYouPagination);
        Vue.component(forYouDatePicker.name, forYouDatePicker);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Amplugin)
}

export default Amplugin