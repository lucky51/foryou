<template>
    <div class="datepicker-top-container">
        <div class="datepicker-input">
            <input  v-model="showSelected" ref="input"  @click.stop="showContainer=!showContainer"/>
        </div>
        <div class="datepicker-container" v-show="showContainer" :style="containerPosition">      
            <div class="datepicker-date" v-show="showDates">
                <datepicker-header :prev-action="prevMonth" :next-action="nextMonth">
                    <button @click.stop="yearAction" class="datepicker-btn-year">{{showSelectedMonth.year}} </button> 年,
                    <button @click.stop="monthAction" class="datepicker-btn-month">{{showSelectedMonth.month+1}}</button> 月
                </datepicker-header>
                <div class="datepicker-date-body">
                    <table>
                        <thead class="datepicker-date-days">
                        <tr>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th class="sunday">日</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,index,key) of bodySpans" :key="key">
                            <td  @click="selectDay(col)" v-for="col in item" :key="col.d" :class="{'selected':col['s'],'today':col['now'],'prev-month':col['p'] , 'next-month':col['n']}">
                                <span>{{col.d}}</span>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="datepicker-date-footer">
                    <button>Today .</button>
                </div>
            </div>
            <div class="datepicker-years" v-show="showYears">
                <datepicker-header
                :disabled-pv-action="disabledPrevAction" 
                :disabled-nx-action="disabledNextAction"
                :prev-action="prevYears" 
                :next-action="nextYears">
                    <button class="datepicker-btn-year">{{getSelected.year}} </button> 年
                </datepicker-header>
                <ul>
                    <li @click.stop="selectYear(y)" :class="{'datepicker-years-current':y['current'], 'datepicker-years-selected':y['s']}" v-for="y in panelYears" :key="y.year">{{y.year}}</li>              
                </ul>
            </div>
            <div class="datepicker-months" v-show="showMonths">
                <datepicker-header
                    :disabled-pv-action="disabledPrevAction" 
                    :disabled-nx-action="disabledNextAction"
                    :actions-visibility="false"
                    :prev-action="prevYears" 
                    :next-action="nextYears">
                        <button class="datepicker-btn-year">{{getSelected.month+1}} </button> 月
                </datepicker-header>
                <ul>
                    <li @click.stop="selectMonthFn(m)" v-for="m in panelMonths" :key="m.month" :class="{'datepicker-months-selected':m['s'],'datepicker-months-current':m['current']}">{{m.month}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
let partmixin = {
    filters: {
        date(value){
            if(value instanceof Date){
                var fullyear = value.getFullYear();
                var month = value.getMonth();
                var date = value.getDate();
                return `${fullyear}-${month}-${date}`;
            }
        }
    },
    directives: {
        visibility:{
            bind(el,binding){
                    el.style.visibility = binding.value ? "visible" : "hidden";               
            },
            update (el,binding,vnode,oldvnode) {
                if(binding.value !==binding.oldValue){
                    el.style.visibility = binding.value ? "visible" : "hidden";
                }
            }
        }
    }
};
let datepickerHeader ={
    name:'datepickerHeader',
    props:{
        prevAction:{
            type:Function,
            default:function(){
                return function(){ }
            }
        },
        nextAction:{
            type:Function ,
            default:function(){
                return function(){
                }
            }
        },
        disabledPvAction:{
            type:Boolean,
            default:false
        },
        disabledNxAction:{
            type:Boolean,
            default:false
        },
        actionsVisibility:{
            type:Boolean,
            default:true
        }
    },
    template:`
        <div>
            <table class="datepicker-date-header">
                <tr >
                    <td class="prev" @click.stop="doPrevAction"  v-visibility="actionsVisibility"></td>
                    <td class="current">
                       <slot></slot>
                    </td>
                    <td class="next" @click.stop="doNextAction" v-visibility="actionsVisibility"></td>
                </tr>
            </table>
        </div>        
    `,
    mixins:[partmixin],
    methods: {
        doPrevAction(){
            if(this.disabledPvAction === true)return ;
            this.prevAction();
        },
        doNextAction(){
            if(this.disabledNxAction === true) return ;
            this.nextAction();
        }
    }
};
export default {
    name:'forYouDatePicker',
    data () {
        return {
            showContainer:false,
            disabledPrevAction:false,
            disabledNextAction:false,
            selectedMonth:new Date(),
            rectArr :[[],[],[],[],[],[]],
            selected:new Date(),
            prevSelected:null,
            startWeek:1,
            endWeek:0,
            showDates:true,
            showYears:false,
            showMonths:false,
            startDate:new Date(-2209017600000),
            endDate:new Date(4102329600000),
            containerPosition:{
                top:'0px',
                left:'0px'
            }
        }
    },
    components: {
        datepickerHeader
    },
    mixins:[partmixin],
    watch: {
        showContainer:{
            immediate:true,
            handler(val,from){
                if (!val) return;
                this.$nextTick(_ => {
                const inputElm = this.$refs.input;
                 if (inputElm) {
                     console.log(inputElm.offsetHeight,  inputElm.clientHeight);
                     this.containerPosition=  {
                         top:inputElm.offsetHeight + inputElm.offsetTop  +'px',
                         left: inputElm.offsetLeft + 'px'
                     };
                 }
                });
            }
        }
    },
    props:{
        format:{
            type:String,
            default:'yyyy-MM-dd'
        }
    },
    methods: {
        formatDate(dt){
            var ftstr = this.format ;
            var newstr  = '';
            if(dt instanceof Date) {
                var fullyear = dt.getFullYear();
                var month = dt.getMonth();
                var date = dt.getDate();
                if(/[yY]{4}/g.test(ftstr)){
                   newstr = String.prototype.replace.call(ftstr,/[yY]{4}/g,fullyear);       
                }else{
                   newstr =  String.prototype.replace.call(ftstr,/[yY]{2}/g,fullyear.toString().substring(2));
                }
                if(/[Mm]{2}/g.test(newstr)){
                    newstr = String.prototype.replace.call(newstr,/[Mm]{2}/g,this.prefixInteger(month+1,2));
                }
                if(/[dD]{2}/g.test(newstr)){
                    newstr = String.prototype.replace.call(newstr,/[dD]{2}/g,this.prefixInteger(date,2));
                }
                return  newstr;
            }
            return '';
        },
        yearAction(){
            this.showDates = false;
            this.showYears = true;
        },
        monthAction(){
            this.showDates = false;
            this.showMonths = true;
        },
        selectYear(data){
            if(this.selectedMonth.getFullYear()!==data.year){
                this.selectedMonth = new Date(data.year,this.selected.getMonth(),this.selected.getDate(),0,0,0);
            }
            this.showYears = false;
            this.showMonths = true;
        },
        selectMonthFn(data){
            if(data.month !==  this.selectedMonth.getMonth()){
                this.selectedMonth =  new Date(this.selectedMonth.getFullYear(),data.month-1,this.selected.getDate(),0,0,0);
            }
            this.showMonths = false;
            this.showDates = true;
        },
        prefixInteger(num,len){          
            if( typeof num ==="string"){
                num = parseInt(num);
            }
            return (Array(len).join('0') + num).slice(-len);
        },
        nextYears(){
            this.selectedMonth = new Date(this.selectedMonth.getFullYear()+40,this.selectedMonth.getMonth(),this.selectedMonth.getDate());
        },
        prevYears(){
            this.selectedMonth = new Date(this.selectedMonth.getFullYear()-40,this.selectedMonth.getMonth(),this.selectedMonth.getDate());
        },
        toyyyyMMdd(date){
            var year = date.getFullYear();
            var mth = this.prefixInteger(date.getMonth()+1,2);           
            var d = this.prefixInteger( date.getDate(),2);
            return `${year}-${mth}-${d}`;
        },
        selectDay(sel){
            this.selected = new Date(sel.v);
            var selmonth = this.selected.getMonth();
            if(selmonth !== this.toDay.getMonth()){
                this.selectedMonth = this.selected;
            }else{
                this.prevSelected.s = false;
                sel.s = true;
            }
        },
        getNow:function(){
            return new Date();
        },
         getDate:function(val){
             return new Date(val);
         },
         getData(val){
             var tmpdate = new Date(val);
             return {
                 year:tmpdate.getFullYear(),
                 month:tmpdate.getMonth(),
                 date:tmpdate.getDate()
             }
         },
         getDateByValue:function(val){
            var tmp =this.getDate(val);
            return tmp.getDate();
         },
         isEmpty:function(val){
             return val ===null||val ===undefined;
         },
         rmvHms(date){
              var year = date.getFullYear();
              var month = date.getMonth();
              var dt = date.getDate();       
              return new Date(year,month,dt,0,0,0);
         },
         nextMonth(){
             var selyear = this.selectedMonth.getFullYear();
             var selmonth = this.selectedMonth.getMonth();
             if(selmonth +1 >11){
                selmonth =0 ;
                selyear = selyear+1;
             }else{
                 selmonth = selmonth+1;
             }            
             var seldate = this.selectedMonth.getDate();
             var nmonth = new Date(selyear,selmonth,seldate);
             this.selectedMonth = nmonth;
         },
         prevMonth(){
             var selyear = this.selectedMonth.getFullYear();
             var selmonth = this.selectedMonth.getMonth();
             var seldate = this.selectedMonth.getDate();
             selmonth = selmonth -1;
             if(selmonth<0){
                 selmonth=11;
                 selyear = selyear -1;
             }
             var pmonth = new Date(selyear,selmonth,seldate);
             this.selectedMonth = pmonth;
         }
    },
    computed: {
        panelMonths(){
            var monthForSelected = this.selected.getMonth();
            var currentMonth = this.toDay.getMonth();
            var monthformonths = this.selectedMonth.getMonth();            
            return [...Array(12).keys()].map((item,idx,arr)=>({
                month:item+1,
                current:item===currentMonth,
                s:monthForSelected ===item
            }));
        },
        panelYears(){
            let yearArr = [];
            var yearforSelected = this.selected.getFullYear();
            var currentYear = this.toDay.getFullYear();
            var yearforMonths = this.selectedMonth.getFullYear();
            var firstYear = this.startDate.getFullYear();
            var lastYear = this.endDate.getFullYear();
            
            var beginYear = yearforMonths-7< firstYear?  
            (function(self){
                self.disabledPrevAction = true;
                return firstYear;
            }(this)) 
            :(function(self){
                if(self.disabledPrevAction===true) self.disabledPrevAction = false;
                return yearforMonths -9;
            }(this));
            var endYear = yearforMonths + 15  > lastYear ? 
            (function(self){
                self.disabledNextAction = true;
                return lastYear;
            }(this)) :(function(self){
                if(self.disabledNextAction === true) self.disabledNextAction = false;
                return yearforMonths + 15;
            }(this));
            for (let index = beginYear; index < endYear; index++) {
                yearArr.push({
                    year:index,
                    current:index===currentYear,
                    s:index===yearforSelected
                });
            }
            return yearArr;
        },
        toDay(){
            var day = new Date();
            return  new Date(day.getFullYear(),day.getMonth(),day.getDate());
        },
        getSelected(){
            return {
                year:this.selected.getFullYear(),
                month:this.selected.getMonth(),
                date:this.selected.getDate()
            }
        },
        showSelected(){
            return this.formatDate(this.selected);
            
        },
        showSelectedMonth(){
            //return `Year ${this.selectedMonth.getFullYear()}, ${this.selectedMonth.getMonth()+1} M.`
            return {
                year:this.selectedMonth.getFullYear(),
                month:this.selectedMonth.getMonth(),
                date:this.selectedMonth.getDate()
            }
        },
        bodySpans(){
            this.rectArr = [[],[],[],[],[],[]];
            //初始化条件 :得知当前日期和外层数组
            //根据当前日期求得当前月份的一号
            var crrfullyear = this.selectedMonth.getFullYear();
            var crrmonth  = this.selectedMonth.getMonth();
            var crrfir  = new Date(crrfullyear,crrmonth,1);
            //根据当前月份的一号 求得 矩阵 的开始日期
            var crrday = crrfir.getDay();
            var crrbegin =crrfir.valueOf() - ((crrday - this.startWeek +7)%7) * 24*60*60*1000;
            var crrend = crrbegin.valueOf()+(6*7-1)*24*60*60*1000;
            let crrow =0;
            let dateidx = 1;
            while (crrbegin<=crrend ){  
                var crrcol = {
                    d:this.prefixInteger(this.getDateByValue(crrbegin),2),
                    now:crrbegin === this.toDay.valueOf(),
                    p:this.getData(crrbegin).month <crrmonth,
                    n:this.getData(crrbegin).month >crrmonth,
                    v:crrbegin,
                    s:this.rmvHms(this.selected).valueOf() === crrbegin 
                };
                if(crrcol.s === true){
                    this.prevSelected = crrcol;
                }             
                this.rectArr[crrow].push(crrcol); 
                crrbegin += 24*60*60*1000;               
                if(dateidx %7 ===0){
                    crrow ++;
                }
                dateidx ++;
            }
            return this.rectArr;
        }
    },
    mounted () {
        this.$nextTick(()=>{
            document.addEventListener('click',()=>{
                this.showContainer = false;
                this.showMonths = false;
                this.showDates = true;
                this.showYears = false;
            });
            window.onresize =()=>{
                if(this.showContainer===true){
                    this.showContainer = ! this.showContainer ;
                }
                
            };
        });
    }
}
</script>
<style lang="scss" scoped>  

    /* initialize */
    div,ul,li,input,button,table,tr,td,th{padding:0px ;margin: 0px;box-sizing: border-box;}
    /* declare */
    $width:31.5;
    $height-days:25;
    $height-header:35;
    /*css*/

    .datepicker-input{
        input{
            border-top: 0px;
            border-left: 0px;
            border-right: 0px;
            display: inline-block;
            width: 200px;
            outline:none;
            height:30px;
            line-height: 30px;
            padding: 0px;
            margin-bottom: 4px;
            font-size: large;
            color: #6666FF;
            border-bottom:2px solid #6666FF ;     
        }
        button{
                display: inline-block;
                width: 95px;
                height: 30px;
                line-height: 30px;
                color: #6666FF;
                font-weight: bold;
                outline:none;
                font-size: large;
                background-color: #fff;
                border: 1px solid #6666ff;
                border-bottom: 2px solid #6666ff;
                border-top: 2px solid #6666ff;
                margin-bottom: 0px;
                padding: 0px;
        }
        margin-bottom: 0px;
    }
    .datepicker-container{
        width:$width*7+px;
        font-family:Microsoft YaHei;
        border: 0.5px solid #e4e7ed;
        position: absolute;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        
        &  /deep/ .datepicker-date-header {        
                    margin:0px;
                    padding:0px;        
                    background-color:#6666FF;
                    height:$height-header+px;
                    
                   .current {
                        width:$width*7-70+px;
                        text-align: center;
                        color:white;
                        font-weight: bold;
                        font-size:small;
                        .datepicker-btn-year,.datepicker-btn-month{
                            border:0px;
                            outline: none;
                            background-color: #6666ff;
                            color:white;
                            font-weight: bold;
                            cursor: pointer;
                            &:hover{
                                border-bottom: 1px solid #fff;
                            }
                        }
                    }
                    .next  {
                        background-image: url('../assets/next.png') ;
                        background-position-y: 4px;
                        background-position-x: 8px;
                        width:40px;
                        background-repeat: no-repeat;
                        background-size: 30px 25px;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                    .prev {
                        background-image: url('../assets/previous.png') ;
                        width:40px;
                        background-repeat: no-repeat;
                        background-size: 30px 25px;
                        background-position-y: 4px;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
        .datepicker-months{
            background-color: white;
            height: $height-days + $height-header + $width *7 +px;
            ul{
                list-style: none;
                .datepicker-months-current{
                    background-color: #66CCFF;
                }
                .datepicker-months-selected{
                    color:red;
                }
                li{
                    width: ($width *7-2) /2+px;
                    display: inline-block;
                    height: ($width*7 + $height-days) /6 +px;
                    line-height: ($width*7 + $height-days) /6 +px;
                    
                    text-align: center;
                    &:hover{
                        background-color: #C0C0FF;
                        cursor: pointer;    
                    }
                }
            }
        }
        .datepicker-years{
            background-color: white;
            height: $height-days + $height-header + $width *7 +px;
            ul{
                margin: 0px auto;
                list-style: none;
                .datepicker-years-current{
                    color:red;
                }
                .datepicker-years-selected{
                    background-color: #66CCFF;
                }
                li{
                    display: inline-block;
                    width:$width*7 / 4-1 +px;
                    text-align: center;
                    height:($width*7 + $height-days) /6 +px;
                    line-height: ($width*7 + $height-days) /6 +px;
                    cursor: pointer;
                    &:hover{
                        background-color: #C0CCFF;                  
                    }
                }
            }
        }   
        .datepicker-date{        
              .sunday{
                    background-image: url('../assets/sun.png');
                    background-repeat: no-repeat;
                    background-size: 35px 35px;
                    background-position: 18px -10px;         
                }                
                .datepicker-date-days{
                    tr{          
                        height:$height-days+px;
                    }
                    th{               
                        color:#6666FF;
                        background-color:#C0CCFF;
                        text-align:center;
                        font-size: 15px;
                        line-height: 25px;
                    }
                }
                .datepicker-date-footer{
                    display: none;
                    button{
                        display: block;
                        width: 50px;
                        height: 30px;
                        line-height: 30px;
                        color: #6666FF;
                        font-weight: bold;
                        background-color: #fff;               
                    }
                }
                .datepicker-date-body{
                    td{
                        border: 0.2px solid #eeeeee;
                    }
                    td:nth-child(odd){
                        background-color:#CCCCFF;
                    }
                    td:nth-child(even){
                    
                        background-color:#C0C0FF;
                    }
                    .prev-month,.next-month{
                        background-color: rgb(222, 212, 255) !important;
                        border: 0.2px solid rgb(237, 232, 247);
                        color:#999999 !important;
                    }
                    .today{              
                        background-image: url('../assets/date-empty.png');
                        background-repeat: no-repeat;
                        background-size: 32px 42px;
                        background-position-y: -8px;
                        background-position-x: -1px;
                        color:#6666ff !important;
                        font-weight: bold;
                        background-color:6666ff !important;
                        span{
                            border-bottom: 0px solid #FFF ;   
                            padding: 0px;
                        }                       
                    }
                    .selected{
                        background-image: url('../assets/selected_purple.png');
                        background-repeat: no-repeat;
                        background-size: 25.6px 25.6px;
                        background-position: 8px 6px;
                    }
                    table{
                        border-collapse: collapse;
                    }
                    table>tbody>tr>td{ 
                    &:hover{
                        &>span{
                            border-bottom: 2px solid #0094ff;
                        }
                    }
                    width:$width+px;
                    height:$width+px;                     
                    margin:0px auto;
                    text-align: center;
                    cursor: pointer;
                    color:#6666FF;
                    font-size: medium;
                }
            }
        }
      
    }
</style>
