(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-87d1d572"],{"188a":function(e,s,t){},6585:function(e,s,t){},6916:function(e,s,t){"use strict";t.r(s);var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"import-address bg-gray"},[t("div",{staticClass:"bg-white"}),t("div",{},[t("el-tabs",{staticClass:"new_import w1200",on:{"tab-click":e.handleClick},model:{value:e.activeName,callback:function(s){e.activeName=s},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:e.$t("newAddress.newAddress0"),name:"keystoreImport"}},[t("div",{staticClass:"tc upload_keystore"},[e.isfileReader?t("div",[e._v(e._s(e.$t("newAddress.newAddress5")))]):t("el-upload",{staticClass:"upload",attrs:{drag:"",action:"localhost",accept:".keystore","before-upload":e.handleUpload,multiple:!1,limit:1}},[t("i",{staticClass:"el-icon-upload"}),t("div",{staticClass:"el-upload__text"},[e._v(e._s(e.$t("newAddress.newAddress3"))),t("em",[e._v(e._s(e.$t("newAddress.newAddress4")))])])])],1)]),t("el-tab-pane",{attrs:{label:e.$t("newAddress.newAddress1"),name:"keyImport"}},[t("div",{staticClass:"bg-white w1200 mt_100"},[t("el-form",{ref:"importForm",staticClass:"import-form w630",attrs:{model:e.importForm,rules:e.importRules,"status-icon":""}},[t("el-form-item",{attrs:{label:e.$t("newAddress.newAddress6"),prop:"keys"}},[t("el-input",{attrs:{type:"textarea",autocomplete:"off"},model:{value:e.importForm.keys,callback:function(s){e.$set(e.importForm,"keys","string"===typeof s?s.trim():s)},expression:"importForm.keys"}})],1),t("el-form-item",{attrs:{label:e.$t("newAddress.newAddress7"),prop:"pass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.importForm.pass,callback:function(s){e.$set(e.importForm,"pass",s)},expression:"importForm.pass"}})],1),t("el-form-item",{attrs:{label:e.$t("newAddress.newAddress8"),prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.importForm.checkPass,callback:function(s){e.$set(e.importForm,"checkPass",s)},expression:"importForm.checkPass"}})],1),t("el-form-item",{staticClass:"form-bnt mb_100 tc"},[t("el-button",{attrs:{type:"success"},on:{click:function(s){return e.keyImport("importForm")}}},[e._v(e._s(e.$t("newAddress.newAddress9")))])],1)],1)],1)]),t("el-tab-pane",{attrs:{label:e.$t("newAddress.newAddress2"),name:"newAddress"}},[t("el-form",{ref:"newAddressForm",staticClass:"new_address w630",attrs:{model:e.newAddressForm,"status-icon":"",rules:e.newAddressRules}},[t("el-form-item",{attrs:{label:e.$t("newAddress.newAddress7"),prop:"pass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.newAddressForm.pass,callback:function(s){e.$set(e.newAddressForm,"pass",s)},expression:"newAddressForm.pass"}})],1),t("el-form-item",{attrs:{label:e.$t("newAddress.newAddress8"),prop:"checkPass"}},[t("el-input",{attrs:{type:"password",autocomplete:"off"},model:{value:e.newAddressForm.checkPass,callback:function(s){e.$set(e.newAddressForm,"checkPass",s)},expression:"newAddressForm.checkPass"}})],1),t("el-form-item",{staticClass:"agreement",attrs:{label:"",prop:"agreement"}},[t("el-checkbox-group",{model:{value:e.newAddressForm.agreement,callback:function(s){e.$set(e.newAddressForm,"agreement",s)},expression:"newAddressForm.agreement"}},[t("el-checkbox",{attrs:{label:e.$t("tips.tips10"),name:"agreement"}})],1)],1),t("el-form-item",{staticClass:"form-bnt tc",staticStyle:{"margin-top":"20px"}},[t("el-button",{attrs:{type:"success"},on:{click:function(s){return e.newAddressSubmitForm("newAddressForm")}}},[e._v("\n              "+e._s(e.$t("newAddress.newAddress2"))+"\n            ")])],1)],1)],1)],1)],1),t("Password",{ref:"password",on:{passwordSubmit:e.keystoreImportPassSubmit}})],1)},a=[],o=(t("ac6a"),t("96cf"),t("1da1")),n=(t("7f7f"),t("0ad0")),i=t.n(n),d=t("db49"),l=t("6ace"),c=t("1959"),p=t("d1f0"),u={data:function(){var e=this,s=function(s,t,r){""===t?r(new Error(e.$t("tips.tips0"))):t.length<60||t.length>66?r(new Error(e.$t("tips.tips32"))):r()},t=function(s,t,r){""===t?r(new Error(e.$t("tips.password0"))):(""!==e.importForm.checkPass&&e.$refs.importForm.validateField("checkPass"),r())},r=function(s,t,r){""===t?r(new Error(e.$t("tips.tips1"))):t!==e.importForm.pass?r(new Error(e.$t("tips.tips2"))):r()},a=function(s,t,r){var a=/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/;""===t?r(new Error(e.$t("tips.password0"))):a.exec(t)?r():r(new Error(e.$t("tips.password1")))},o=function(s,t,r){""===t?r(new Error(e.$t("tips.tips1"))):t!==e.newAddressForm.pass?r(new Error(e.$t("tips.tips2"))):r()},n=function(s,t,r){t?r():r(new Error(e.$t("tips.tips9")))};return{activeName:"keystoreImport",isfileReader:"undefined"===typeof FileReader,keystoreInfo:{},importForm:{keys:"",pass:"",checkPass:""},importRules:{keys:[{validator:s,trigger:"blur"}],pass:[{validator:t,trigger:"blur"}],checkPass:[{validator:r,trigger:"blur"}]},importAddressInfo:{},newAddressForm:{pass:"",checkPass:"",agreement:!1},newAddressRules:{pass:[{validator:a,trigger:"blur"}],checkPass:[{validator:o,trigger:"blur"}],agreement:[{validator:n,trigger:"blur"}]}}},components:{Password:p["a"]},created:function(){},methods:{handleClick:function(e){"keystoreImport"===e.name?(this.importAddressInfo={},this.$refs["importForm"].resetFields(),this.$refs["newAddressForm"].resetFields()):"keyImport"===e.name?(this.keystoreInfo={},this.$refs["newAddressForm"].resetFields()):(this.keystoreInfo={},this.importAddressInfo={},this.$refs["importForm"].resetFields())},handleUpload:function(e){var s=this,t=new FileReader;t.addEventListener("load",(function(){s.keystoreInfo=JSON.parse(t.result),s.$refs.password.showPassword(!0)})),t.readAsText(e,"utf-8")},keystoreImportPassSubmit:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(s){var t,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(this.keystoreInfo.aesPri=this.keystoreInfo.encryptedPrivateKey,this.keystoreInfo.pub=this.keystoreInfo.pubKey,t=Object(c["e"])(this.keystoreInfo,s),!t.success){e.next=11;break}return this.keystoreInfo.address=t.address,e.next=7,Object(l["g"])(this.keystoreInfo);case 7:r=e.sent,r.success&&this.toUrl("user"),e.next=12;break;case 11:this.$message({message:this.$t("tips.tips4"),type:"error",duration:2e3});case 12:case"end":return e.stop()}}),e,this)})));function s(s){return e.apply(this,arguments)}return s}(),keyImport:function(e){var s=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=11;break}if(r=i.a.importByKey(d["e"].chainId,s.importForm.keys,s.importForm.pass,d["e"].prefix),!r.hasOwnProperty("success")||r.success){e.next=5;break}return s.$message({message:r.data,type:"error",duration:3e3}),e.abrupt("return");case 5:return e.next=7,Object(l["g"])(r);case 7:a=e.sent,a.success&&s.toUrl("user"),e.next=12;break;case 11:return e.abrupt("return",!1);case 12:case"end":return e.stop()}}),e)})));return function(s){return e.apply(this,arguments)}}())},newAddressSubmitForm:function(e){var s=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=8;break}return r=i.a.newAddress(d["e"].chainId,s.newAddressForm.pass,d["e"].prefix),e.next=4,Object(l["g"])(r);case 4:a=e.sent,a.success&&s.toUrl("backupsAddress"),e.next=9;break;case 8:return e.abrupt("return",!1);case 9:case"end":return e.stop()}}),e)})));return function(s){return e.apply(this,arguments)}}())},toUrl:function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;0===t?this.$router.push({name:e}):console.log(name,s)}}},m=u,f=(t("e969"),t("2877")),w=Object(f["a"])(m,r,a,!1,null,null,null);s["default"]=w.exports},7672:function(e,s,t){"use strict";t("188a")},d1f0:function(e,s,t){"use strict";var r=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("el-dialog",{staticClass:"password-dialog",attrs:{title:e.$t("tips.password0"),visible:e.passwordVisible,top:"30vh",width:e.width,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(s){e.passwordVisible=s},open:e.passwordShow,close:e.passwordClose}},[t("el-form",{ref:"passwordForm",attrs:{model:e.passwordForm,rules:e.passwordRules},nativeOn:{submit:function(e){e.preventDefault()}}},[t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{ref:"inpus",attrs:{type:"password",maxlength:22},nativeOn:{keyup:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.enterSubmit("passwordForm")}},model:{value:e.passwordForm.password,callback:function(s){e.$set(e.passwordForm,"password",s)},expression:"passwordForm.password"}})],1)],1),e.isShowKeep?t("el-checkbox",{model:{value:e.keepRadio,callback:function(s){e.keepRadio=s},expression:"keepRadio"}},[t("span",[e._v("记住密码")])]):e._e(),t("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.passwordClose}},[e._v(e._s(e.$t("public.cancel")))]),t("el-button",{attrs:{type:e.isDisabled?"info":"success",disabled:e.isDisabled,id:"passwordInfo"},on:{click:function(s){return e.dialogSubmit("passwordForm")}}},[t("span",[e._v(" "+e._s(e.disabledInfo))])])],1)],1)},a=[],o=(t("ac4d"),t("8a81"),t("5df3"),t("1c4c"),t("7f7f"),t("6b54"),t("6ace"));function n(e,s){var t="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=i(e))||s&&e&&"number"===typeof e.length){t&&(e=t);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,n=!0,d=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return n=e.done,e},e:function(e){d=!0,o=e},f:function(){try{n||null==t.return||t.return()}finally{if(d)throw o}}}}function i(e,s){if(e){if("string"===typeof e)return d(e,s);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?d(e,s):void 0}}function d(e,s){(null==s||s>e.length)&&(s=e.length);for(var t=0,r=new Array(s);t<s;t++)r[t]=e[t];return r}var l={props:{isTime:{type:Boolean,default:!1}},data:function(){var e=this,s=function(s,t,r){""===t?r(new Error(e.$t("tips.password0"))):r()};return{addressList:[],addressInfo:{},passwordVisible:!1,passwordForm:{password:""},passwordRules:{password:[{validator:s,trigger:["blur","change"]}]},isShowKeep:!1,keepRadio:!1,timeLag:3e5,width:Object(o["b"])()?"35%":"95%",isDisabled:!1,disabledValue:0,disabledInfo:""}},created:function(){0},mounted:function(){},watch:{passwordVisible:function(e){var s=this;e&&setTimeout((function(){s.$refs["inpus"].focus()}),200)}},methods:{enterSubmit:function(e){this.passwordForm.password&&this.dialogSubmit(e)},passwordClose:function(){this.$refs["passwordForm"].resetFields(),this.passwordVisible=!1,this.timeLag=3e5,this.keepRadio=!1},showPassword:function(e,s){var t=this;if(this.addressList=Object(o["f"])(0),s)if(this.isShowKeep=!0,this.addressInfo=this.addressList.filter((function(e){return e.address===s}))[0],this.addressInfo.password){this.passwordForm.password=this.addressInfo.password,this.keepRadio=!0,this.disabledValue=3,this.isDisabled=!0,this.disabledInfo="合约参数验证中:"+this.disabledValue;var r=setInterval((function(){t.disabledValue=t.disabledValue-1,t.disabledInfo="合约参数验证中:"+t.disabledValue,0===t.disabledValue&&(clearInterval(r),t.isDisabled=!1,t.disabledInfo=t.$t("public.confirm"))}),1e3)}else this.isShowKeep=!0,this.isDisabled=!1,this.disabledInfo=this.$t("public.confirm");else this.isShowKeep=!1,this.isDisabled=!1,this.disabledInfo=this.$t("public.confirm");this.passwordVisible=e},dialogSubmit:function(e){var s=this;this.$refs[e].validate((function(e){if(!e)return!1;if(s.keepRadio){var t,r=n(s.addressList);try{for(r.s();!(t=r.n()).done;){var a=t.value;a.address===s.addressInfo.address&&(a.password=s.passwordForm.password)}}catch(l){r.e(l)}finally{r.f()}}else{var o,i=n(s.addressList);try{for(i.s();!(o=i.n()).done;){var d=o.value;d.address===s.addressInfo.address&&(d.password="")}}catch(l){i.e(l)}finally{i.f()}}localStorage.setItem("addressData",JSON.stringify(s.addressList)),s.$emit("passwordSubmit",s.passwordForm.password),s.passwordVisible=!1}))}}},c=l,p=(t("7672"),t("2877")),u=Object(p["a"])(c,r,a,!1,null,null,null);s["a"]=u.exports},e969:function(e,s,t){"use strict";t("6585")}}]);
//# sourceMappingURL=chunk-87d1d572.d8246438.js.map