<template>
  <div id="app">
    
    <div style="display:none;">
      <for-you-pagination :max-size="7"   :page.sync="page" :item-totals="200" :page-size="10"/>
    </div>
    <ul>  
      <li>
          <for-you-date-picker  format="yyyy/mm/dd" :date.sync="dd" :lang="langzh" :has-aside="aside" />
      </li>
      <li>
          <for-you-date-picker  format="yyyy/mm/dd" :date.sync="dd" :lang="langeng" :has-aside="aside" />
      </li>
       <li>
          <for-you-date-picker  format="yyyy/mm/dd" :date.sync="dd" :lang="langfr" :has-aside="aside" />
      </li>
       <li>
          <for-you-date-picker  format="yyyy/mm/dd" :date.sync="dd" :lang="langja" :has-aside="aside" />
      </li>
    </ul>

     <ul  style="margin-top:250px;">  
      <li>
          <for-you-date-picker  format="yyyy-mm-dd" :date.sync="dd" :lang="langzh" :has-aside="aside1" />
      </li>
      <li>
          <for-you-date-picker  format="yyyy-mm-dd" :date.sync="dd" :lang="langeng" :has-aside="aside1" />
      </li>
       <li>
          <for-you-date-picker  format="yyyy-mm-dd" :date.sync="dd" :lang="langfr" :has-aside="aside1" />
      </li>
       <li>
          <for-you-date-picker  format="yyyy/mm-dd" :date.sync="dd" :lang="langja" :has-aside="aside1" />
          
      </li>
      <li>
        <for-you-date-picker  format="yyyy/mm-dd" :date.sync="dd" :lang="langzh1" :has-aside="aside1" />
      </li>
       <li>
        <for-you-date-picker  format="yyyy/mm-dd" :date.sync="dd" :lang="langself" :has-aside="aside1" />
      </li>
    </ul>

     
    <button @click="changeDD">2019-06-06</button>
    <button @click="changeDD1">today</button>
    <button @click="changeDD2">2019-08-09</button>
    <button @click="aside=!aside">显隐标签页</button>
  </div>
</template>

<script>
import forYou  from './components';
import Vue from 'vue'

import eng from './lib/locale/en'
import zh from './lib/locale/zh'
import ja from './lib/locale/ja'
import fr from './lib/locale/fr'
import zh1 from './lib/locale/zh1'
//Vue.use(forYou,eng);
Vue.use(forYou);


export default {
  name: 'app',
  data () {
    return {
      dd:new Date(),
      langzh:zh,
      langja:ja,
      langeng:eng,
      langfr:fr,
      langzh1:zh1,
      langself:{
        el: {
            datepicker: {
                panel_date_btn_year: "'自定义.' +$$year",
                panel_year_btn_year: "$$year",
                today: "tday",
                yesterday: "yday",
                tomorrow: "twm",
                years: "$$year",
                // months:{
                //   all:"$$month"
                // },
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
      },
      page:2,
      msg: 'Welcome to Your Vue.js App',
      aside:true,
      aside1:false
    }
  },
  methods: {
    hideaside(){
      this.aside =false;
    },
    changeDD(){
      this.dd = "2019-06-06";
    },
    changeDD1(){
      this.dd =new Date();
    },
    changeDD2(){
      this.dd = "2019-08-09"
    }
  }
}
</script>


<style lang="scss">
  #app{
    color:read;
    text-align:center;
    &>ul{
      list-style: none;
      &>li{
        margin-left: 70px;
        display: inline-block;
      }
    }
  }
</style>
