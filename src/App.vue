<template>
  <div id="app">
    <for-you-date-picker  format="yyyy/mm/dd" />
    <div style="display:none;">
      <for-you-pagination :max-size="7"  :page.sync="page" :item-totals="200" :page-size="10"/>
    </div>
    
  </div>
</template>

<script>
import forYou  from './components';
import Vue from 'vue'
Vue.use(forYou);


export default {
  name: 'app',
  data () {
    return {
      page:2,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
  #app{
    text-align:center;
  }
</style>
