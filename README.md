
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
      <for-you-date-picker 
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
      </for-you-date-picker>
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

```html
<for-you-date-picker  format="yyyy/mm/dd" />
```

The plugin  is developing ...