"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[7382],{1187:function(e,t,l){l.d(t,{Z:function(){return o}});var n=l(3396);const a=["disabled","innerHTML"];var i={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(e){return(t,l)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("li",{class:"page-item",onClick:l[0]||(l[0]=l=>t.$emit("next",e.link))},[(0,n._)("span",{class:"page-link pointer",href:"#",disabled:!e.link.url,innerHTML:e.link.label},null,8,a)])]))}};const s=i;var o=s},7382:function(e,t,l){l.r(t),l.d(t,{default:function(){return x}});var n=l(3396),a=l(7139),i=l(2191),s=l(4870),o=l(1187);const c={class:"container mt-2"},d={class:"card"},u={class:"card-header"},r={class:"row"},v=(0,n._)("div",{class:"col-md-6"}," Damaged Items Record ",-1),_={class:"col-md-6"},h=(0,n._)("option",{disabled:"",selected:""},"Make Selection",-1),g=["value"],p=["value"],w={class:"card-body"},k={class:"table-responsive"},m={class:"table-hover table-stripped table-bordered table"},b=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"SN"),(0,n._)("th",null,"Name"),(0,n._)("th",null,"Quantity"),(0,n._)("th",null,"Description")])],-1),f={class:"flex justify-center mt-4"},D={class:"relative justify-center rounded-md shadow pagination"};var y={__name:"DamagedItemView",setup(e){const t=(0,s.iH)({});function l(e){i.Z.dispatch("getMethod",{url:"/load-store-damage-items/"+e}).then((e=>{t.value=200==e?.status?e.data:[]})).catch((e=>{console.log(e)}))}const y=(0,s.iH)({});function H(){i.Z.dispatch("loadDropdown","stores").then((({data:e})=>{1==e.length&&l(e[0].id),y.value=e})).catch((e=>{console.log(e)}))}function x(e){e.url&&!e.active&&i.Z.dispatch("getMethod",{url:e.url}).then((e=>{t.value=200==e?.status?e.data:[]})).catch((e=>{console.log(e)}))}return H(),(e,i)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",c,[(0,n._)("div",d,[(0,n._)("div",u,[(0,n._)("div",r,[v,(0,n._)("div",_,[(0,n._)("select",{class:"form-control",onChange:i[0]||(i[0]=e=>l(e.target.value))},[h,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(y.value,(e=>((0,n.wg)(),(0,n.iD)(n.HY,{key:e.id},[1==y.value.length?((0,n.wg)(),(0,n.iD)("option",{key:0,selected:"",value:e.id},(0,a.zw)(e.text),9,g)):((0,n.wg)(),(0,n.iD)("option",{key:1,value:e.id},(0,a.zw)(e.text),9,p))],64)))),128))],32)])])]),(0,n._)("div",w,[(0,n._)("div",k,[(0,n._)("table",m,[b,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.value?.data,((e,t)=>((0,n.wg)(),(0,n.iD)("tr",{key:t},[(0,n._)("td",null,(0,a.zw)(t+1),1),(0,n._)("td",null,(0,a.zw)(e?.name),1),(0,n._)("td",null,(0,a.zw)(e?.quantity)+" "+(0,a.zw)(e?.unit),1),(0,n._)("td",null,(0,a.zw)(e?.description),1)])))),128))])]),(0,n._)("div",f,[(0,n._)("nav",D,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.value.links,((e,t)=>((0,n.wg)(),(0,n.j4)(o.Z,{link:e,key:t,onNext:t=>x(e)},null,8,["link","onNext"])))),128))])])])])])])]))}};const H=y;var x=H}}]);
//# sourceMappingURL=7382.b3e098f9.js.map