(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d0a1e9a8"],{"0a49":function(t,e,s){var a=s("9b43"),r=s("626a"),n=s("4bf8"),i=s("9def"),u=s("cd1c");t.exports=function(t,e){var s=1==t,o=2==t,l=3==t,c=4==t,d=6==t,p=5==t||d,m=e||u;return function(e,u,f){for(var g,h,b=n(e),v=r(b),w=a(u,f,3),y=i(v.length),_=0,N=s?m(e,y):o?m(e,0):void 0;y>_;_++)if((p||_ in v)&&(g=v[_],h=w(g,_,b),t))if(s)N[_]=h;else if(h)switch(t){case 3:return!0;case 5:return g;case 6:return _;case 2:N.push(g)}else if(c)return!1;return d?-1:l||c?c:N}}},"188a":function(t,e,s){},"4baa":function(t,e,s){"use strict";s("a469")},"4ec8":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"guess_number w1200"},[s("div",{staticClass:"top"},[s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"fl guess",attrs:{"element-loading-text":t.loadingText,"element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[s("h2",[t._v("NULS "+t._s(t.$t("guessNum.guessNum0"))+t._s(t.gameCurrentInfo.id)+t._s(t.$t("guessNum.guessNum1")))]),s("div",{staticClass:"explain"},[s("p",[t._v("1、"+t._s(t.$t("guessNum.guessNum2"))+"\n          "),s("el-tooltip",{staticStyle:{padding:"0"},attrs:{placement:"bottom"}},[s("div",{staticClass:"portion",attrs:{slot:"content"},slot:"content"},[s("ul",[s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" < 10 "+t._s(t.$t("guessNum.guessNum4"))+" 20%")]),s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" < 50 "+t._s(t.$t("guessNum.guessNum4"))+" 25%")]),s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" < 100 "+t._s(t.$t("guessNum.guessNum4"))+" 30%")]),s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" < 200 "+t._s(t.$t("guessNum.guessNum4"))+" 35%")]),s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" < 500 "+t._s(t.$t("guessNum.guessNum4"))+" 40%")]),s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" < 1000 "+t._s(t.$t("guessNum.guessNum4"))+" 45%")]),s("li",[t._v(t._s(t.$t("guessNum.guessNum3"))+" > 1000 "+t._s(t.$t("guessNum.guessNum4"))+" 50%")])])]),s("el-button",{attrs:{type:"text"}},[t._v(t._s(t.$t("guessNum.guessNum5")))])],1),t._v("\n          "+t._s(t.$t("guessNum.guessNum6"))+"\n        ")],1),s("p",[t._v("2、"+t._s(t.$t("guessNum.guessNum7"))+" "),s("span",{staticClass:"fred fW600"},[t._v("2.1 ")]),t._v("NULS + "+t._s(t.$t("locking.locking91"))+" ")]),s("p",[t._v("\n          3、"+t._s(t.$t("guessNum.guessNum8"))+"\n          "),s("span",{staticClass:"fyellow fW600"},[t._v(" 60 ")]),t._v("\n          "+t._s(t.$t("guessNum.guessNum9"))+"\n          "),s("span",{staticClass:"fyellow fW600"},[t._v(" 10 ")]),t._v("\n          "+t._s(t.$t("guessNum.guessNum10"))+"\n        ")]),s("p",[t._v("\n          4、"+t._s(t.$t("guessNum.guessNum11"))+"\n          "),s("span",{staticClass:"click",on:{click:function(e){return t.toUrl("","https://www.8btc.com/article/374354",1)}}},[t._v(t._s(t.$t("guessNum.guessNum12")))]),t._v("\n          "+t._s(t.$t("guessNum.guessNum13"))+"\n        ")])]),s("div",{staticClass:"number"},t._l(t.valueList,(function(e){return s("el-button",{key:e.value,class:e.value.toString()===t.numberValue.toString()?"is_number":"",attrs:{circle:""},on:{click:function(s){return t.clickNumber(e.value)}}},[t._v("\n          "+t._s(e.label)+"\n        ")])})),1),s("div",{staticClass:"submit tc"},[s("el-button",{attrs:{type:"success"},on:{click:t.guessStart}},[t._v("\n          "+t._s(""===this.numberValue?t.$t("guessNum.guessNum14"):t.$t("guessNum.guessNum15"))+"\n          "+t._s(this.numberValue)+"\n        ")])],1),s("div",{staticClass:"jackpot font14"},[t._v("\n        "+t._s(t.$t("guessNum.guessNum3"))+"\n        "),s("span",{staticClass:"font12"},[t._v("("+t._s(t.jackpotInfo.address)+")")]),t._v(":\n        "),s("font",{staticClass:"fCN fW600"},[t._v(t._s(t.jackpotInfo.balance))]),t._v(" NULS\n      ")],1),t.gameCurrentInfo.endHeight?s("div",{staticClass:"font14"},[s("div",{staticClass:"fl"},[t._v("\n          "+t._s(t.$t("guessNum.guessNum16"))+":\n          "),s("span",{staticClass:"fred fW600"},[t._v(t._s(t.gameCurrentInfo.endHeight))])]),s("div",{staticClass:"fl"},[t._v(" \n          "+t._s(t.$t("guessNum.guessNum17"))+":\n          "),s("span",{staticClass:"fred fW600"},[t._v(t._s(t.gameCurrentInfo.endHeight+t.gameCurrentInfo.gameLotteryDelay))])])]):s("div",{staticClass:"font14 fyellow"},[t._v(t._s(t.$t("guessNum.guessNum18")))])]),s("div",{staticClass:"fr party"},[s("h3",[t._v(t._s(t.$t("guessNum.guessNum19")))]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.gameDetailInfo.participants}},[s("el-table-column",{attrs:{label:t.$t("public.address"),align:"center",width:"108"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("address",e.row.address,1)}}},[t._v(t._s(e.row.addresss))])]}}])}),s("el-table-column",{attrs:{label:"txHash",align:"center","min-width":"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("hash",e.row.txHash,1)}}},[t._v(t._s(e.row.txHashs))])]}}])}),s("el-table-column",{attrs:{prop:"txTime",label:t.$t("public.time"),align:"center",width:"90"}}),s("el-table-column",{attrs:{prop:"number",label:t.$t("guessNum.guessNum20"),align:"center",width:"90"}}),s("el-table-column",{attrs:{label:t.$t("public.status"),align:"center",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{class:0===e.row.status?"fCN":""},[t._v(t._s(t.$t("status.status"+e.row.status)))])]}}])})],1)],1)]),s("div",{staticClass:"footer cb"},[s("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeHistory,callback:function(e){t.activeHistory=e},expression:"activeHistory"}},[s("el-tab-pane",{attrs:{label:t.$t("guessNum.guessNum21"),name:"first"}},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.participantData,stripe:"",border:""}},[s("el-table-column",{attrs:{prop:"gameId",label:t.$t("guessNum.guessNum22"),width:"120",align:"center"}}),s("el-table-column",{attrs:{label:t.$t("guessNum.guessNum23"),width:"380",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("address",e.row.winner,1)}}},[t._v(t._s(e.row.winner))])]}}])}),s("el-table-column",{attrs:{prop:"perPrize",label:t.$t("guessNum.guessNum24"),width:"120",align:"center"}}),s("el-table-column",{attrs:{prop:"number",label:t.$t("guessNum.guessNum25"),width:"130",align:"center"}}),s("el-table-column",{attrs:{prop:"txTime",label:t.$t("guessNum.guessNum26"),width:"160",align:"center"}}),s("el-table-column",{attrs:{label:"txHash","min-width":"160",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("hash",e.row.txHash,1)}}},[t._v(t._s(e.row.txHashs))])]}}])})],1)],1),s("el-tab-pane",{attrs:{label:t.$t("guessNum.guessNum27"),name:"second"}},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.participantHistoryData,stripe:"",border:""}},[s("el-table-column",{attrs:{prop:"gameId",label:t.$t("guessNum.guessNum22"),width:"120",align:"center"}}),s("el-table-column",{attrs:{label:t.$t("guessNum.guessNum23"),width:"380",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("address",e.row.address,1)}}},[t._v(t._s(e.row.address))])]}}])}),s("el-table-column",{attrs:{prop:"number",label:t.$t("guessNum.guessNum25"),width:"160",align:"center"}}),s("el-table-column",{attrs:{prop:"txTime",label:t.$t("guessNum.guessNum26"),width:"160",align:"center"}}),s("el-table-column",{attrs:{label:"txHash","min-width":"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("hash",e.row.txHash,1)}}},[t._v(t._s(e.row.txHashs))])]}}])})],1)],1),s("el-tab-pane",{attrs:{label:t.$t("guessNum.guessNum28"),name:"third"}},[s("el-collapse",{attrs:{accordion:""},on:{change:function(e){return t.changeColapse()}},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},t._l(t.historyData,(function(e,a){return s("el-collapse-item",{key:a,attrs:{title:t.$t("guessNum.guessNum0")+e.gameId+t.$t("guessNum.guessNum29")+t.$t("guessNum.guessNum30")+":"+e.number+t.$t("guessNum.guessNum31")+": "+e.perPrize,name:e.gameId}},[s("div",{staticClass:"footer_table"},[s("div",[t._v(t._s(t.$t("guessNum.guessNum32")))]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.historyDataIn}},[s("el-table-column",{attrs:{label:t.$t("public.address"),align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("address",e.row.address,1)}}},[t._v(t._s(e.row.addresss))])]}}],null,!0)}),s("el-table-column",{attrs:{label:"txHash",align:"center","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("hash",e.row.txHash,1)}}},[t._v(t._s(e.row.txHashs))])]}}],null,!0)}),s("el-table-column",{attrs:{prop:"txTime",label:t.$t("public.time"),align:"center",width:"180"}}),s("el-table-column",{attrs:{prop:"number",label:t.$t("guessNum.guessNum20"),align:"center",width:"150"}})],1),s("div",[t._v(t._s(t.$t("guessNum.guessNum33")))]),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.historyDataOut}},[s("el-table-column",{attrs:{label:t.$t("public.address"),align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("address",e.row.address,1)}}},[t._v(t._s(e.row.addresss))])]}}],null,!0)}),s("el-table-column",{attrs:{label:"txHash",align:"center","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"click",on:{click:function(s){return t.toUrl("hash",e.row.txHash,1)}}},[t._v(t._s(e.row.txHashs))])]}}],null,!0)}),s("el-table-column",{attrs:{prop:"txTime",label:t.$t("public.time"),align:"center",width:"180"}}),s("el-table-column",{attrs:{prop:"number",label:t.$t("guessNum.guessNum20"),align:"center",width:"150"}}),s("el-table-column",{attrs:{prop:"perPrize",label:t.$t("guessNum.guessNum31"),align:"center",width:"150"}})],1)],1)])})),1)],1)],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.pageTotal>t.pageSize,expression:"pageTotal > pageSize"}],staticClass:"page"},[s("el-pagination",{attrs:{layout:"total, prev, pager, next, jumper","current-page":t.pageIndex,"page-size":t.pageSize,total:t.pageTotal},on:{"current-change":t.pageChange}})],1)],1),s("Password",{ref:"password",on:{passwordSubmit:t.guessPassSubmit}})],1)},r=[],n=(s("ac4d"),s("8a81"),s("5df3"),s("1c4c"),s("7f7f"),s("c5f6"),s("7514"),s("2909")),i=(s("6b54"),s("96cf"),s("1da1")),u=s("c32d"),o=s.n(u),l=s("bc3a"),c=s.n(l),d=s("0ad0"),p=s.n(d),m=s("b8d7"),f=s.n(m),g=s("e065"),h=s.n(g),b=s("db49"),v=s("6ace"),w=s("1959"),y=s("d1f0");function _(t,e){var s="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!s){if(Array.isArray(t)||(s=N(t))||e&&t&&"number"===typeof t.length){s&&(t=s);var a=0,r=function(){};return{s:r,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,u=!1;return{s:function(){s=s.call(t)},n:function(){var t=s.next();return i=t.done,t},e:function(t){u=!0,n=t},f:function(){try{i||null==s.return||s.return()}finally{if(u)throw n}}}}function N(t,e){if(t){if("string"===typeof t)return x(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?x(t,e):void 0}}function x(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,a=new Array(e);s<e;s++)a[s]=t[s];return a}var k={data:function(){return{accontInfo:{},config:{url:"http://111.229.189.176/"},jackpotInfo:{address:"",balance:0},gameCurrentInfo:{},loading:!0,loadingText:"",gameDetailInfo:{},statusList:[],valueList:[{value:0,label:0},{value:1,label:1},{value:2,label:2},{value:3,label:3},{value:4,label:4},{value:5,label:5},{value:6,label:6},{value:7,label:7},{value:8,label:8},{value:9,label:9}],numberValue:"",partyData:[],activeHistory:"first",activeName:"1",participantData:[],participantHistoryData:[],historyData:[],historyDataIn:[],historyDataOut:[],pageSize:10,pageIndex:1,pageTotal:0,guessNumberInterval:null,guessNumberInterval2:null}},created:function(){var t=this;this.getGameContract(),this.accontInfo=Object(v["f"])(1),setTimeout((function(){t.jackpotInfo.address&&(t.gameCurrent(),t.getPrizePool())}),800)},mounted:function(){var t=this;"first"===this.activeHistory?this.userLotteryHistory(this.accontInfo.address):"second"===this.activeHistory?this.gameParticipantHistory(this.accontInfo.address):this.gameHistory(),this.guessNumberInterval=setInterval((function(){t.getPrizePool(),t.gameCurrent()}),5e3),this.guessNumberInterval2=setInterval((function(){t.accontInfo=Object(v["f"])(1)}),1e3)},destroyed:function(){clearInterval(this.guessNumberInterval),clearInterval(this.guessNumberInterval2)},watch:{},components:{Password:y["a"]},methods:{getGameContract:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.config.url+"game/contract",t.prev=1,c.a.defaults.baseURL="",t.next=5,c.a.get(e);case 5:s=t.sent,s.data.success&&(this.jackpotInfo.address=s.data.data),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),console.log(t.t0);case 12:case"end":return t.stop()}}),t,this,[[1,9]])})));function e(){return t.apply(this,arguments)}return e}(),gameCurrent:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.config.url+"game/current",t.prev=1,c.a.defaults.baseURL="",t.next=5,c.a.get(e);case 5:s=t.sent,s.data.success&&(s.data.data?(this.gameCurrentInfo=s.data.data,this.gameDetail(this.gameCurrentInfo.id),this.gameCurrentInfo.endHeight&&this.gameCurrentInfo.endHeight<=this.$store.getters.getHeight?(this.loadingText=this.$t("tips.tips17"),this.loading=!0,sessionStorage.removeItem(this.gameCurrentInfo.id.toString())):this.loading=!1):(this.gameCurrentInfo={id:0,startHeight:0,endHeight:0,gameLotteryDelay:0,txHash:"0",txTime:0},this.loading=!0,this.loadingText=this.$t("tips.tips18"),this.userLotteryHistory(this.accontInfo.address))),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),console.log(t.t0);case 12:case"end":return t.stop()}}),t,this,[[1,9]])})));function e(){return t.apply(this,arguments)}return e}(),gameDetail:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var s,a,r,i,u,l,d,p,m,f,g=arguments;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=g.length>1&&void 0!==g[1]?g[1]:0,a=this.config.url+"game/detail/"+e,t.prev=2,c.a.defaults.baseURL="",t.next=6,c.a.get(a);case 6:if(r=t.sent,r.data.success){i=this.statusList.filter((function(t){return t.id===r.data.data.id})),u=_(r.data.data.participants);try{for(d=function(){var t=l.value;i&&i.splice(i.indexOf(i.find((function(e){return e.txHash===t.txHash}))),1),t.addresss=Object(v["o"])(t.address,4),t.txHashs=Object(v["o"])(t.txHash,Object(v["b"])()?6:3),t.txTime=o()(Object(v["l"])(1e3*t.txTime)).format("HH:mm:ss"),t.status=1},u.s();!(l=u.n()).done;)d()}catch(h){u.e(h)}finally{u.f()}if(0===s)r.data.data.participants=[].concat(Object(n["a"])(r.data.data.participants),Object(n["a"])(i)),this.gameDetailInfo=r.data.data;else{this.historyDataIn=r.data.data.participants,p=_(r.data.data.lottery.winners);try{for(p.s();!(m=p.n()).done;)f=m.value,f.perPrize=Object(v["j"])(r.data.data.lottery.perPrize,8),f.address=f.winner,f.addresss=Object(v["o"])(f.address,4),f.number=r.data.data.lottery.number,f.txHash=r.data.data.lottery.txHash,f.txHashs=Object(v["o"])(f.txHash,6),f.txTime=o()(Object(v["l"])(1e3*r.data.data.lottery.txTime)).format("YYYY-MM-DD HH:mm:ss")}catch(h){p.e(h)}finally{p.f()}this.historyDataOut=r.data.data.lottery.winners}}t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](2),console.log(t.t0);case 13:case"end":return t.stop()}}),t,this,[[2,10]])})));function e(e){return t.apply(this,arguments)}return e}(),clickNumber:function(t){this.numberValue=t.toString()},guessStart:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(localStorage.hasOwnProperty("accountInfo")){t.next=5;break}return this.$message({message:this.$t("tips.tips21"),type:"error"}),t.abrupt("return");case 5:if(this.numberValue){t.next=8;break}return this.$message({message:this.$t("tips.tips19"),type:"error"}),t.abrupt("return");case 8:return e={value:21e7,address:this.jackpotInfo.address,methodName:"join",methodDesc:"(Long gameId, Integer number) return void",args:[this.gameCurrentInfo.id,Number(this.numberValue)]},t.next=11,this.validateContractCall(this.accontInfo.address,e.value,f.a.CONTRACT_MAX_GASLIMIT,f.a.CONTRACT_MINIMUM_PRICE,e.address,e.methodName,e.methodDesc,e.args);case 11:s=t.sent,s.success&&this.$refs.password.showPassword(!0,this.accontInfo.address);case 13:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),validateContractCall:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,s,a,r,n,i,u,o){var l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.$post("/","validateContractCall",[e,s,a,r,n,i,u,o]);case 3:if(l=t.sent,!l.hasOwnProperty("result")){t.next=8;break}return t.abrupt("return",{success:!0,data:l.result});case 8:return t.abrupt("return",{success:!1,data:l.result});case 9:t.next=14;break;case 11:return t.prev=11,t.t0=t["catch"](0),t.abrupt("return",{success:!1,data:t.t0});case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));function e(e,s,a,r,n,i,u,o){return t.apply(this,arguments)}return e}(),guessPassSubmit:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var s,a,r,n,i,u,l,c,d,m,f,g,h;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=JSON.parse(localStorage.getItem("accountInfo")),t.next=3,Object(w["e"])(s,e);case 3:if(a=t.sent,a.success){t.next=7;break}return this.$message({message:this.$t("tips.tips4"),type:"error",duration:3e3}),t.abrupt("return");case 7:return r={value:21e7,address:this.jackpotInfo.address,methodName:"join",methodDesc:"(Long gameId, Integer number) return void",args:[this.gameCurrentInfo.id,Number(this.numberValue)]},t.next=10,this.imputedContractCallGas(s.address,r.value,r.address,r.methodName,r.methodDesc,r.args);case 10:return n=t.sent,i=Number(Object(v["e"])(n.data.gasLimit,n.data.price)),u={fromAddress:s.address,toAddress:r.address,assetsChainId:b["e"].chainId,assetsId:b["e"].assetsId,amount:r.value,fee:Number(Object(v["d"])(1e5,i)),value:r.value},l="",t.next=16,Object(w["c"])(s.address,b["e"].chainId,b["e"].assetsId);case 16:if(c=t.sent,!(c.success&&c.data.balance<1e4)){t.next=20;break}return this.$message({message:this.$t("tips.tips20"),type:"error"}),t.abrupt("return",{success:!1});case 20:return t.next=22,Object(w["d"])(u,c,16);case 22:return d=t.sent,t.next=25,p.a.transactionAssemble(d.data.inputs,d.data.outputs,l,16,n.data);case 25:return m=t.sent,t.next=28,p.a.transactionSerialize(a.pri,a.pub,m);case 28:return f=t.sent,t.next=31,Object(w["f"])(f);case 31:g=t.sent,g.success?(h={id:this.gameCurrentInfo.id,address:s.address,addresss:Object(v["o"])(s.address,4),txHash:g.hash,txHashs:Object(v["o"])(g.hash,Object(v["b"])()?6:3),txTime:o()(Object(v["l"])(Math.round((new Date).getTime()))).format("HH:mm:ss"),status:0,number:this.numberValue},this.statusList.push(h),this.gameDetailInfo.participants.push(h),this.$message({message:this.$t("tips.tips15"),type:"success"})):this.$message({message:this.$t("tips.tips14")+JSON.stringify(g.data),type:"error"});case 33:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getPrizePool:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.methodCall(this.jackpotInfo.address,"getPrizePool","() return String",[]);case 2:e=t.sent,e.success||console.log("获取奖池金额失败！"),e.data.balance=Object(v["j"])(e.data.result,8),this.jackpotInfo.balance=e.data.balance;case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),methodCall:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,s,a,r){var n,i,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=b["b"],i={jsonrpc:"2.0",method:"invokeView",params:[b["e"].chainId,e,s,a,r],id:Math.floor(1e3*Math.random())},t.prev=2,t.next=5,c.a.post(n,i);case 5:if(u=t.sent,!u.data.hasOwnProperty("result")){t.next=10;break}return t.abrupt("return",{success:!0,data:u.data.result});case 10:return t.abrupt("return",{success:!1,data:u.data});case 11:t.next=16;break;case 13:return t.prev=13,t.t0=t["catch"](2),t.abrupt("return",{success:!0,data:t.t0});case 16:case"end":return t.stop()}}),t,null,[[2,13]])})));function e(e,s,a,r){return t.apply(this,arguments)}return e}(),imputedContractCallGas:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,s,a,r,n,i){var u,o,l,c;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$post("/","imputedContractCallGas",[e,s,a,r,n,i]);case 2:if(u=t.sent,u.hasOwnProperty("result")){t.next=6;break}return console.log("预估调用合约交易的gas错误"),t.abrupt("return",{success:!1,data:u});case 6:return t.next=8,this.getContractMethodArgsTypes(a,r,n);case 8:if(o=t.sent,o.success){t.next=12;break}return console.log("获取合约指定函数的参数类型错误"),t.abrupt("return",{success:!1,data:o});case 12:return l=h.a.twoDimensionalArray(i,o.data),c={chainId:b["e"].chainId,sender:e,contractAddress:a,value:s,gasLimit:u.result.gasLimit,price:f.a.CONTRACT_MINIMUM_PRICE,methodName:r,methodDesc:n,args:l},t.abrupt("return",{success:!0,data:c});case 15:case"end":return t.stop()}}),t,this)})));function e(e,s,a,r,n,i){return t.apply(this,arguments)}return e}(),getContractMethodArgsTypes:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,s,a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$post("/","getContractMethodArgsTypes",[e,s,a]).then((function(t){return t.hasOwnProperty("result")?{success:!0,data:t.result}:{success:!1,data:t.error}})).catch((function(t){return{success:!1,data:t}}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));function e(e,s,a){return t.apply(this,arguments)}return e}(),handleClick:function(t){this.activeHistory=t.name,this.pageIndex=1,this.pageTotal=0,this.pageSize=10,"first"===this.activeHistory?this.userLotteryHistory(this.accontInfo.address):"second"===this.activeHistory?this.gameParticipantHistory(this.accontInfo.address):this.gameHistory()},userLotteryHistory:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var s,a,r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=this.config.url+"game/user/lottery/"+e+"/"+this.pageIndex,c.a.defaults.baseURL="",t.next=4,c.a.get(s);case 4:if(a=t.sent,a.data.success){this.pageTotal=a.data.data.total,r=_(a.data.data.list);try{for(r.s();!(n=r.n()).done;)i=n.value,i.perPrize=Object(v["j"])(i.perPrize,8),i.txHashs=Object(v["o"])(i.txHash,15),i.txTime=o()(Object(v["l"])(1e3*i.txTime)).format("YYYY-MM-DD HH:mm:ss")}catch(u){r.e(u)}finally{r.f()}this.participantData=a.data.data.list}case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),gameParticipantHistory:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var s,a,r,n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=this.config.url+"game/user/participation/"+e+"/"+this.pageIndex,c.a.defaults.baseURL="",t.next=4,c.a.get(s);case 4:if(a=t.sent,a.data.success){this.pageTotal=a.data.data.total,r=_(a.data.data.list);try{for(r.s();!(n=r.n()).done;)i=n.value,i.txHashs=Object(v["o"])(i.txHash,15),i.txTime=o()(Object(v["l"])(1e3*i.txTime)).format("YYYY-MM-DD HH:mm:ss")}catch(u){r.e(u)}finally{r.f()}this.participantHistoryData=a.data.data.list}case 6:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),gameHistory:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){var e,s,a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this.config.url+"game/history/"+this.pageIndex,c.a.defaults.baseURL="",t.next=4,c.a.get(e);case 4:if(s=t.sent,s.data.success){this.pageTotal=s.data.data.total,a=_(s.data.data.list);try{for(a.s();!(r=a.n()).done;)n=r.value,n.number||0===n.number?n.perPrize=n.perPrize?Object(v["j"])(n.perPrize,8):this.$t("public.flow"):(n.number=this.$t("public.flow"),n.perPrize=this.$t("public.flow")),n.txTime=o()(Object(v["l"])(1e3*n.txTime)).format("YYYY-MM-DD HH:mm:ss")}catch(i){a.e(i)}finally{a.f()}this.historyData=s.data.data.list}case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),changeColapse:function(){this.gameDetail(this.activeName,1)},pageChange:function(t){this.pageIndex=t,"first"===this.activeHistory?this.userLotteryHistory(this.accontInfo.address):"second"===this.activeHistory?this.gameParticipantHistory(this.accontInfo.address):this.gameHistory()},toUrl:function(t,e,s){if(0===s)this.$router.push({name:t});else{var a="";a=t?Object(v["h"])(t,e):e,Object(v["n"])(a)}}}},I=k,$=(s("4baa"),s("2877")),C=Object($["a"])(I,a,r,!1,null,null,null);e["default"]=C.exports},7514:function(t,e,s){"use strict";var a=s("5ca1"),r=s("0a49")(5),n="find",i=!0;n in[]&&Array(1)[n]((function(){i=!1})),a(a.P+a.F*i,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")(n)},7672:function(t,e,s){"use strict";s("188a")},a469:function(t,e,s){},cd1c:function(t,e,s){var a=s("e853");t.exports=function(t,e){return new(a(t))(e)}},d1f0:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-dialog",{staticClass:"password-dialog",attrs:{title:t.$t("tips.password0"),visible:t.passwordVisible,top:"30vh",width:t.width,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.passwordVisible=e},open:t.passwordShow,close:t.passwordClose}},[s("el-form",{ref:"passwordForm",attrs:{model:t.passwordForm,rules:t.passwordRules},nativeOn:{submit:function(t){t.preventDefault()}}},[s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{ref:"inpus",attrs:{type:"password",maxlength:22},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.enterSubmit("passwordForm")}},model:{value:t.passwordForm.password,callback:function(e){t.$set(t.passwordForm,"password",e)},expression:"passwordForm.password"}})],1)],1),t.isShowKeep?s("el-checkbox",{model:{value:t.keepRadio,callback:function(e){t.keepRadio=e},expression:"keepRadio"}},[s("span",[t._v("记住密码")])]):t._e(),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:t.passwordClose}},[t._v(t._s(t.$t("public.cancel")))]),s("el-button",{attrs:{type:t.isDisabled?"info":"success",disabled:t.isDisabled,id:"passwordInfo"},on:{click:function(e){return t.dialogSubmit("passwordForm")}}},[s("span",[t._v(" "+t._s(t.disabledInfo))])])],1)],1)},r=[],n=(s("ac4d"),s("8a81"),s("5df3"),s("1c4c"),s("7f7f"),s("6b54"),s("6ace"));function i(t,e){var s="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!s){if(Array.isArray(t)||(s=u(t))||e&&t&&"number"===typeof t.length){s&&(t=s);var a=0,r=function(){};return{s:r,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,i=!0,o=!1;return{s:function(){s=s.call(t)},n:function(){var t=s.next();return i=t.done,t},e:function(t){o=!0,n=t},f:function(){try{i||null==s.return||s.return()}finally{if(o)throw n}}}}function u(t,e){if(t){if("string"===typeof t)return o(t,e);var s=Object.prototype.toString.call(t).slice(8,-1);return"Object"===s&&t.constructor&&(s=t.constructor.name),"Map"===s||"Set"===s?Array.from(t):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var s=0,a=new Array(e);s<e;s++)a[s]=t[s];return a}var l={props:{isTime:{type:Boolean,default:!1}},data:function(){var t=this,e=function(e,s,a){""===s?a(new Error(t.$t("tips.password0"))):a()};return{addressList:[],addressInfo:{},passwordVisible:!1,passwordForm:{password:""},passwordRules:{password:[{validator:e,trigger:["blur","change"]}]},isShowKeep:!1,keepRadio:!1,timeLag:3e5,width:Object(n["b"])()?"35%":"95%",isDisabled:!1,disabledValue:0,disabledInfo:""}},created:function(){0},mounted:function(){},watch:{passwordVisible:function(t){var e=this;t&&setTimeout((function(){e.$refs["inpus"].focus()}),200)}},methods:{enterSubmit:function(t){this.passwordForm.password&&this.dialogSubmit(t)},passwordClose:function(){this.$refs["passwordForm"].resetFields(),this.passwordVisible=!1,this.timeLag=3e5,this.keepRadio=!1},showPassword:function(t,e){var s=this;if(this.addressList=Object(n["f"])(0),e)if(this.isShowKeep=!0,this.addressInfo=this.addressList.filter((function(t){return t.address===e}))[0],this.addressInfo.password){this.passwordForm.password=this.addressInfo.password,this.keepRadio=!0,this.disabledValue=3,this.isDisabled=!0,this.disabledInfo="合约参数验证中:"+this.disabledValue;var a=setInterval((function(){s.disabledValue=s.disabledValue-1,s.disabledInfo="合约参数验证中:"+s.disabledValue,0===s.disabledValue&&(clearInterval(a),s.isDisabled=!1,s.disabledInfo=s.$t("public.confirm"))}),1e3)}else this.isShowKeep=!0,this.isDisabled=!1,this.disabledInfo=this.$t("public.confirm");else this.isShowKeep=!1,this.isDisabled=!1,this.disabledInfo=this.$t("public.confirm");this.passwordVisible=t},dialogSubmit:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return!1;if(e.keepRadio){var s,a=i(e.addressList);try{for(a.s();!(s=a.n()).done;){var r=s.value;r.address===e.addressInfo.address&&(r.password=e.passwordForm.password)}}catch(l){a.e(l)}finally{a.f()}}else{var n,u=i(e.addressList);try{for(u.s();!(n=u.n()).done;){var o=n.value;o.address===e.addressInfo.address&&(o.password="")}}catch(l){u.e(l)}finally{u.f()}}localStorage.setItem("addressData",JSON.stringify(e.addressList)),e.$emit("passwordSubmit",e.passwordForm.password),e.passwordVisible=!1}))}}},c=l,d=(s("7672"),s("2877")),p=Object(d["a"])(c,a,r,!1,null,null,null);e["a"]=p.exports},e065:function(module,exports,__webpack_require__){"use strict";function valueOfstring(t){return null===t?null:t.toString()}function isBlank(t){return null===t||0===t.trim().length}module.exports={stringToByte:function(t){var e=[],s=void 0,a=void 0;s=t.length;for(var r=0;r<s;r++)a=t.charCodeAt(r),a>=65536&&a<=1114111?(e.push(a>>18&7|240),e.push(a>>12&63|128),e.push(a>>6&63|128),e.push(63&a|128)):a>=2048&&a<=65535?(e.push(a>>12&15|224),e.push(a>>6&63|128),e.push(63&a|128)):a>=128&&a<=2047?(e.push(a>>6&31|192),e.push(63&a|128)):e.push(255&a);return e},twoDimensionalArray:function twoDimensionalArray(args,types){if(0===args.length)return null;if(args.length!==types.length)throw"args number error";for(var length=args.length,two=new Array(length),arg=void 0,i=0;i<length;i++)if(arg=args[i],null!=arg)if("string"===typeof arg){var argStr=arg;if(null!=types&&isBlank(argStr)&&"String"!==types[i])two[i]=[];else if(null!=types&&!isBlank(argStr)&&types[i].indexOf("[]")>=0){var arrayArg=eval(argStr);if(!Array.isArray(arrayArg))throw"array arg error";for(var len=arrayArg.length,result=new Array(len),k=0;k<len;k++)result[k]=valueOfstring(arrayArg[k]);two[i]=result}else two[i]=[argStr]}else if(Array.isArray(arg)){for(var _len=arg.length,_result=new Array(_len),_k=0;_k<_len;_k++)_result[_k]=valueOfstring(arg[_k]);two[i]=_result}else two[i]=[valueOfstring(arg)];else two[i]=[];return two}}},e853:function(t,e,s){var a=s("d3f4"),r=s("1169"),n=s("2b4c")("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),a(e)&&(e=e[n],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=chunk-d0a1e9a8.19d96ba0.js.map