(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c49d1664"],{"0a49":function(e,t,s){var r=s("9b43"),n=s("626a"),a=s("4bf8"),o=s("9def"),i=s("cd1c");e.exports=function(e,t){var s=1==e,d=2==e,c=3==e,l=4==e,u=6==e,f=5==e||u,p=t||i;return function(t,i,h){for(var b,m,v=a(t),w=n(v),g=r(i,h,3),y=o(w.length),k=0,A=s?p(t,y):d?p(t,0):void 0;y>k;k++)if((f||k in w)&&(b=w[k],m=g(b,k,v),e))if(s)A[k]=m;else if(m)switch(e){case 3:return!0;case 5:return b;case 6:return k;case 2:A.push(b)}else if(l)return!1;return u?-1:c||l?l:A}}},"188a":function(e,t,s){},"20d6":function(e,t,s){"use strict";var r=s("5ca1"),n=s("0a49")(6),a="findIndex",o=!0;a in[]&&Array(1)[a]((function(){o=!1})),r(r.P+r.F*o,"Array",{findIndex:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}}),s("9c6c")(a)},"231d":function(e,t,s){"use strict";s("c310")},7672:function(e,t,s){"use strict";s("188a")},9419:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:e.userLoading,expression:"userLoading"}],staticClass:"bg-gray cb user-list"},[s("div",{staticClass:"pc w1200"},[s("h3",{staticClass:"title tc"},[e._v("账户管理")]),s("div",{staticClass:"w1400"},[s("div",{staticClass:"top_ico"},[s("i",{staticClass:"el-icon-plus click",on:{click:function(t){return e.toUrl("newAddress")}}})]),s("el-table",{attrs:{data:e.addressList,stripe:"",border:""}},[s("el-table-column",{attrs:{prop:"address",label:"地址",align:"center","min-width":"360"}}),s("el-table-column",{attrs:{label:e.$t("public.alias"),align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("span",[e._v(e._s(t.row.alias))])]}}])}),s("el-table-column",{attrs:{label:"备注",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.note?s("span",{staticClass:"click",on:{click:function(s){return e.setNote(t.row)}}},[e._v(e._s(t.row.note))]):s("i",{staticClass:"el-icon-edit click",on:{click:function(s){return e.setNote(t.row)}}})]}}])}),s("el-table-column",{attrs:{prop:"totalLock",label:"锁定",align:"center",width:"150"}}),s("el-table-column",{attrs:{prop:"balance",label:"可用余额",align:"center",width:"150"}}),s("el-table-column",{attrs:{label:"操作",align:"center",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[s("label",{staticClass:"click tab_bn",on:{click:function(s){return e.backAddress(t.row)}}},[e._v("备份")]),s("span",{staticClass:"tab_line"},[e._v("|")]),s("label",{staticClass:"click tab_bn",on:{click:function(s){return e.deleteAddress(t.row)}}},[e._v("移除")]),s("span",{staticClass:"tab_line"},[e._v("|")]),t.row.isCurrent?s("label",{attrs:{disabled:""}},[e._v("进入")]):s("label",{staticClass:"click tab_bn",on:{click:function(s){return e.selectionAddress(t.row)}}},[e._v("进入")])]}}])})],1),s("div",{staticClass:"pages"},[s("div",{staticClass:"page-total"},[e._v("共 "+e._s(e.addressList.length))])])],1)]),s("div",{staticClass:"mobile bg"},[s("div",{staticClass:"bg3"},[s("BackBar",{attrs:{isBackIcon:e.isBackIcon,rightTitle:e.rightTitle}}),s("div",{staticClass:"addrss-list"},[s("SelectAddress",{ref:"selectAccount",attrs:{shortAddress:e.isShort}})],1),s("ul",{staticClass:"lis"},[s("li",{on:{click:function(t){return e.toUrl("newAddress","")}}},[e._v(e._s(e.$t("newAddress.newAddress2"))+" "),s("i",{staticClass:"el-icon-arrow-right"})]),s("li",{on:{click:function(t){return e.toUrl("newAddress","")}}},[e._v(e._s(e.$t("address.address14"))+" "),s("i",{staticClass:"el-icon-arrow-right"})]),s("li",{on:{click:function(t){return e.toUrl("backupsAddress","")}}},[e._v(e._s(e.$t("address.address15"))+" "),s("i",{staticClass:"el-icon-arrow-right"})]),s("li",{staticClass:"last",on:{click:function(t){return e.toUrl("backupsAddress","")}}},[e._v(e._s(e.$t("address.address16"))+" "),s("i",{staticClass:"el-icon-arrow-right"})]),s("li",{staticClass:"remove",on:{click:e.deleteAddress}},[e._v(e._s(e.$t("address.address17"))+" "),s("i",{staticClass:"el-icon-arrow-right"})]),s("li",{staticClass:"remove",on:{click:e.cleanAll}},[e._v(e._s(e.$t("address.address18"))+" "),s("i",{staticClass:"el-icon-arrow-right"})])])],1)]),s("el-dialog",{attrs:{title:"设置备注",visible:e.noteDialog,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.noteDialog=t}}},[s("el-form",{ref:"noteForm",attrs:{model:e.noteForm,rules:e.rulesForm}},[s("el-form-item",{attrs:{label:"地址"}},[s("el-input",{attrs:{autocomplete:"off",disabled:""},model:{value:e.noteForm.address,callback:function(t){e.$set(e.noteForm,"address",t)},expression:"noteForm.address"}})],1),s("el-form-item",{attrs:{label:"备注",prop:"note"}},[s("el-input",{attrs:{autocomplete:"off"},model:{value:e.noteForm.note,callback:function(t){e.$set(e.noteForm,"note",t)},expression:"noteForm.note"}})],1)],1),s("div",{staticClass:"dialog-footer tc",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){return e.resetForm("noteForm")}}},[e._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("noteForm")}}},[e._v("确 定")])],1)],1),s("Password",{ref:"password",on:{passwordSubmit:e.passSubmit}})],1)},n=[],a=(s("ac4d"),s("8a81"),s("5df3"),s("1c4c"),s("7f7f"),s("20d6"),s("6b54"),s("96cf"),s("1da1")),o=s("d1f0"),i=s("6ace"),d=s("1959");function c(e,t){var s="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!s){if(Array.isArray(e)||(s=l(e))||t&&e&&"number"===typeof e.length){s&&(e=s);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,i=!1;return{s:function(){s=s.call(e)},n:function(){var e=s.next();return o=e.done,e},e:function(e){i=!0,a=e},f:function(){try{o||null==s.return||s.return()}finally{if(i)throw a}}}}function l(e,t){if(e){if("string"===typeof e)return u(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,r=new Array(t);s<t;s++)r[s]=e[s];return r}var f={data:function(){return{isBackIcon:!0,rightTitle:this.$t("address.address13"),addressList:[],selectAddressInfo:"",remarkDialog:!1,remarkInfo:"",prefix:"TNVT",isShort:!1,userLoading:!0,noteDialog:!1,noteForm:{address:"",note:""},rulesForm:{note:[{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}]}}},components:{Password:o["a"]},created:function(){},mounted:function(){this.getAddressList()},methods:{changeAccountInfo:function(){this.$refs.selectAccount.accountInfo&&(this.selectAddressInfo=this.$refs.selectAccount.accountInfo)},getAddressList:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(){var t,s,r,n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t=Object(i["f"])(0),this.selectAddressInfo=Object(i["f"])(1),s=c(t),e.prev=3,s.s();case 5:if((r=s.n()).done){e.next=14;break}return n=r.value,n.note&&"undefined"!==n.note.toString()||(n.note=""),e.next=10,this.getAddressInfoByNode(n);case 10:a=e.sent,a.success&&(n.alias=a.data.alias,n.balance=Object(i["j"])(a.data.balance),n.consensusLock=Object(i["j"])(a.data.consensusLock),n.timeLock=Object(i["j"])(a.data.timeLock),n.totalLock=Object(i["d"])(n.consensusLock,n.timeLock).toString(),n.totalBalance=Object(i["j"])(a.data.totalBalance));case 12:e.next=5;break;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e["catch"](3),s.e(e.t0);case 19:return e.prev=19,s.f(),e.finish(19);case 22:this.addressList=t,this.userLoading=!1,0===t.length&&this.$router.push({name:"newAddress",query:{address:""}});case 25:case"end":return e.stop()}}),e,this,[[3,16,19,22]])})));function t(){return e.apply(this,arguments)}return t}(),getAddressInfoByNode:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$post("/","getAccount",[t.address]).then((function(e){return e.hasOwnProperty("result")?{success:!0,data:e.result}:{success:!1,data:e}})).catch((function(e){return{success:!1,data:e}}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),setNote:function(e){e.note||(e.note=""),this.selectAddressInfo=e,this.noteForm.address=this.selectAddressInfo.address,this.noteForm.note=this.selectAddressInfo.note,this.noteDialog=!0},submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;console.log(t.noteForm),console.log(t.addressList);var s,r=c(t.addressList);try{for(r.s();!(s=r.n()).done;){var n=s.value;n.address===t.selectAddressInfo.address&&(n.note=t.noteForm.note)}}catch(f){r.e(f)}finally{r.f()}var a,o=Object(i["f"])(0),d=c(o);try{for(d.s();!(a=d.n()).done;){var l=a.value;l.address===t.selectAddressInfo.address&&(l.note=t.noteForm.note)}}catch(f){d.e(f)}finally{d.f()}localStorage.setItem("addressData",JSON.stringify(o));var u=Object(i["f"])(1);u.address===t.selectAddressInfo.address&&(u.note=t.noteForm.note,localStorage.setItem("accountInfo",JSON.stringify(u))),t.noteDialog=!1}))},resetForm:function(e){this.$refs[e].resetFields(),this.noteDialog=!1},editPassword:function(e){this.toUrl("editPassword",e.address)},backAddress:function(e){this.selectAddressInfo=e,this.$router.push({name:"backupsAddress",query:{address:e.address}})},deleteAddress:function(e){var t=this;this.$confirm(this.$t("tab.tab29"),this.$t("tab.tab32"),{confirmButtonText:this.$t("tab.tab30"),cancelButtonText:this.$t("address.address3"),type:"warning",showClose:!1,closeOnClickModal:!1,closeOnPressEscape:!1,center:!0}).then((function(){t.backAddress(e)})).catch((function(){t.selectAddressInfo=e,t.$refs.password.showPassword(!0)}))},selectionAddress:function(e){var t,s=Object(i["f"])(0),r=c(s);try{for(r.s();!(t=r.n()).done;){var n=t.value;if(n.isCurrent=!1,n.address===e.address){n.isCurrent=!0;var a,o=c(this.addressList);try{for(o.s();!(a=o.n()).done;){var d=a.value;d.address===e.address?d.isCurrent=!0:d.isCurrent=!1}}catch(l){o.e(l)}finally{o.f()}localStorage.setItem("accountInfo",JSON.stringify(n))}}}catch(l){r.e(l)}finally{r.f()}localStorage.setItem("addressData",JSON.stringify(s))},passSubmit:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){var s,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=this.selectAddressInfo,e.next=3,Object(d["e"])(s,t);case 3:if(r=e.sent,r.success){e.next=7;break}return this.$message({message:this.$t("tips.tips18"),type:"error",duration:3e3}),e.abrupt("return");case 7:s.address===r.address?(this.addressList.splice(this.addressList.findIndex((function(e){return e.address===s.address})),1),0===this.addressList.length?(this.toUrl("newAddress",""),localStorage.removeItem("accountInfo")):(this.addressList[0].isCurrent=!0,localStorage.setItem("accountInfo",JSON.stringify(this.addressList[0]))),this.selectAddressInfo=this.addressList[0],localStorage.setItem("addressData",JSON.stringify(this.addressList))):this.$message({message:this.$t("address.address13"),type:"error",duration:1e3});case 8:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),toUrl:function(e){this.$router.push({name:e,query:{}})},cleanAll:function(){localStorage.clear(),sessionStorage.clear(),this.$router.push({name:"home"}),window.location.reload()}}},p=f,h=(s("231d"),s("2877")),b=Object(h["a"])(p,r,n,!1,null,null,null);t["default"]=b.exports},c310:function(e,t,s){},cd1c:function(e,t,s){var r=s("e853");e.exports=function(e,t){return new(r(e))(t)}},d1f0:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-dialog",{staticClass:"password-dialog",attrs:{title:e.$t("tips.password0"),visible:e.passwordVisible,top:"30vh",width:e.width,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(t){e.passwordVisible=t},open:e.passwordShow,close:e.passwordClose}},[s("el-form",{ref:"passwordForm",attrs:{model:e.passwordForm,rules:e.passwordRules},nativeOn:{submit:function(e){e.preventDefault()}}},[s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{ref:"inpus",attrs:{type:"password",maxlength:22},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.enterSubmit("passwordForm")}},model:{value:e.passwordForm.password,callback:function(t){e.$set(e.passwordForm,"password",t)},expression:"passwordForm.password"}})],1)],1),e.isShowKeep?s("el-checkbox",{model:{value:e.keepRadio,callback:function(t){e.keepRadio=t},expression:"keepRadio"}},[s("span",[e._v("记住密码")])]):e._e(),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:e.passwordClose}},[e._v(e._s(e.$t("public.cancel")))]),s("el-button",{attrs:{type:e.isDisabled?"info":"success",disabled:e.isDisabled,id:"passwordInfo"},on:{click:function(t){return e.dialogSubmit("passwordForm")}}},[s("span",[e._v(" "+e._s(e.disabledInfo))])])],1)],1)},n=[],a=(s("ac4d"),s("8a81"),s("5df3"),s("1c4c"),s("7f7f"),s("6b54"),s("6ace"));function o(e,t){var s="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!s){if(Array.isArray(e)||(s=i(e))||t&&e&&"number"===typeof e.length){s&&(e=s);var r=0,n=function(){};return{s:n,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,o=!0,d=!1;return{s:function(){s=s.call(e)},n:function(){var e=s.next();return o=e.done,e},e:function(e){d=!0,a=e},f:function(){try{o||null==s.return||s.return()}finally{if(d)throw a}}}}function i(e,t){if(e){if("string"===typeof e)return d(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,r=new Array(t);s<t;s++)r[s]=e[s];return r}var c={props:{isTime:{type:Boolean,default:!1}},data:function(){var e=this,t=function(t,s,r){""===s?r(new Error(e.$t("tips.password0"))):r()};return{addressList:[],addressInfo:{},passwordVisible:!1,passwordForm:{password:""},passwordRules:{password:[{validator:t,trigger:["blur","change"]}]},isShowKeep:!1,keepRadio:!1,timeLag:3e5,width:Object(a["b"])()?"35%":"95%",isDisabled:!1,disabledValue:0,disabledInfo:""}},created:function(){0},mounted:function(){},watch:{passwordVisible:function(e){var t=this;e&&setTimeout((function(){t.$refs["inpus"].focus()}),200)}},methods:{enterSubmit:function(e){this.passwordForm.password&&this.dialogSubmit(e)},passwordClose:function(){this.$refs["passwordForm"].resetFields(),this.passwordVisible=!1,this.timeLag=3e5,this.keepRadio=!1},showPassword:function(e,t){var s=this;if(this.addressList=Object(a["f"])(0),t)if(this.isShowKeep=!0,this.addressInfo=this.addressList.filter((function(e){return e.address===t}))[0],this.addressInfo.password){this.passwordForm.password=this.addressInfo.password,this.keepRadio=!0,this.disabledValue=3,this.isDisabled=!0,this.disabledInfo="合约参数验证中:"+this.disabledValue;var r=setInterval((function(){s.disabledValue=s.disabledValue-1,s.disabledInfo="合约参数验证中:"+s.disabledValue,0===s.disabledValue&&(clearInterval(r),s.isDisabled=!1,s.disabledInfo=s.$t("public.confirm"))}),1e3)}else this.isShowKeep=!0,this.isDisabled=!1,this.disabledInfo=this.$t("public.confirm");else this.isShowKeep=!1,this.isDisabled=!1,this.disabledInfo=this.$t("public.confirm");this.passwordVisible=e},dialogSubmit:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return!1;if(t.keepRadio){var s,r=o(t.addressList);try{for(r.s();!(s=r.n()).done;){var n=s.value;n.address===t.addressInfo.address&&(n.password=t.passwordForm.password)}}catch(c){r.e(c)}finally{r.f()}}else{var a,i=o(t.addressList);try{for(i.s();!(a=i.n()).done;){var d=a.value;d.address===t.addressInfo.address&&(d.password="")}}catch(c){i.e(c)}finally{i.f()}}localStorage.setItem("addressData",JSON.stringify(t.addressList)),t.$emit("passwordSubmit",t.passwordForm.password),t.passwordVisible=!1}))}}},l=c,u=(s("7672"),s("2877")),f=Object(u["a"])(l,r,n,!1,null,null,null);t["a"]=f.exports},e853:function(e,t,s){var r=s("d3f4"),n=s("1169"),a=s("2b4c")("species");e.exports=function(e){var t;return n(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!n(t.prototype)||(t=void 0),r(t)&&(t=t[a],null===t&&(t=void 0))),void 0===t?Array:t}}}]);
//# sourceMappingURL=chunk-c49d1664.4b0a7524.js.map