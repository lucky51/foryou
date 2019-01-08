
# Vue foryou

Some Plugin for Vue

## Usage

### foryou pagination  

install by npm

```md
npm install foryou@latest
```

```html
<div id="app">
      <for-you-pagination
        prev-text="&laquo;"  
        next-text="&raquo;"
        first-text="&laquo;&laquo;"
        last-text="&raquo;&raquo;"
        :rotate="rotate"
        :item-totals="totals"
        :force-ellipses="true"  
        :page.sync ="current"
        :max-size="5"
        :hide-if-empty="false"
        active-class="active-green"
        @page-change="pageChange"
        :page-size="psize">
        <!--define  template ,you can delete it-->
        <!--begin-->
        <a slot-scope="{index}" >
          {{index+1+'~'}}
        </a>
        <a slot="boundary-last-numbers" slot-scope="{index}">
          {{index+1+'~'}}
        </a>
        <a href="#" slot="boundary-first-numbers" slot-scope="{index}">
          {{index + 1 + ' fixed'}}
        </a>
        <!--end-->
      </for-you-pagination>
      <hr />
    <button @click="moveTo">move to {{current}}</button>
  
    <button @click="chsize">pageSize : {{psize}}</button>
    <button @click="chtotal">item totals : {{totals}}</button>
    <button @click="switchrotate">switch rotate : {{rotate}}</button>
   <span>{{'page totals:' + pagetotal }}</span>
  </div>  
```

```js
import forYou from 'foryou'

Vue.use(forYou);


 methods: {
    pageChange(from,to){
        console.log(from +":" + to);
    }
},
data () {
    return {
      current:2,
      msg: 'Welcome to vue-am-pagination',
      psize:2
    }
  }
```

![avatar](https://github.com/lucky51/vue-am-pagination/blob/master/images/am-pagination1.png?raw=true)

## Properties

| Property | Type | Default |
| :------:|:------:|:------:|
|prev-text|String| &laquo;|
|next-text|String| &raquo;|
|first-text|String|&laquo;&laquo;|
|last-text|String|&raquo;&raquo;|
|rotate |Boolean|true|
|item-totals|Number|1|
|force-ellipses|Boolean|true|
|page.sync|Number|1|
|max-size|Number|5|
|hide-if-empty|Boolean|true|
|page-change|Function&Event| \ |
|page-size|Number|10|
|boundary-links|Boolean|true|
|direction-links|Boolean|true|
|boundary-pages|Number( condition< max-size)|0|
|container-class|String|am-p|
|disabled-class|String|disabled|
|active-class|String|active|
|next-class|String|next|
|last-class|String|last|
|first-class|String|first|

![avatar](https://github.com/lucky51/vue-am-pagination/blob/master/images/am-pagination.jpg?raw=true)

### foryou datepicker

Adding multilingual support.

```js
import forYou from 'foryou'
import en from 'foryou/lib/umd/locale/en'
import zh from 'foryou/lib/umd/locale/zh'
import zh1 from 'foryou/lib/umd/locale/zh1'
import fr from 'foryou/lib/umd/locale/fr'
import ja from 'foryou/lib/umd/locale/ja'

//You can define a global language environment for plug-ins.
Vue.use(forYou,{lang:en});
//Or rewrite the language environment of a component
```

```html
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
      <li>
          <for-you-date-picker  format="yyyy/mm/dd" :date.sync="dd" :lang="langself" :has-aside="aside" />
      </li>
</ul>
```

```js
 data () {
    return {
      dd:new Date(),
      //Custom  Configuration
      langself:{
        el: {
            datepicker: {
                //support $$year
                panel_date_btn_year: "'custom.' +$$year",
                panel_year_btn_year: "$$year",
                today: "tday",
                yesterday: "yday",
                tomorrow: "twm",
                years: "$$year",
                //support
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
      }
      langzh:zh,
      langja:ja,
      langeng:eng,
      langfr:fr,
      langzh1:zh1,
      //Whether to display the label page or not ，default:false
      aside:true
    }
  }
```

![avatar](https://github.com/lucky51/foryou/blob/master/images/picker3.gif?raw=true)
![avatar](https://github.com/lucky51/foryou/blob/master/images/picker4.gif?raw=true)
![avatar](https://github.com/lucky51/foryou/blob/master/images/picker5.gif?raw=true)
![avatar](https://github.com/lucky51/foryou/blob/master/images/picker6.gif?raw=true)