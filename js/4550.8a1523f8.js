"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[4550],{1187:function(l,t,n){n.d(t,{Z:function(){return u}});var e=n(3396);const i=["disabled","innerHTML"];var a={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(l){return(t,n)=>((0,e.wg)(),(0,e.iD)("div",null,[(0,e._)("li",{class:"page-item",onClick:n[0]||(n[0]=n=>t.$emit("next",l.link))},[(0,e._)("span",{class:"page-link pointer",href:"#",disabled:!l.link.url,innerHTML:l.link.label},null,8,i)])]))}};const s=a;var u=s},4550:function(l,t,n){n.r(t),n.d(t,{default:function(){return y}});var e=n(3396),i=n(7139),a=n(2191),s=n(4870),u=n(1187);const r={class:"container mt-2"},o={class:"card"},c=(0,e._)("div",{class:"card-header"},"Visitor arround",-1),d={class:"card-body"},_={class:"table-responsive"},h={class:"table-hover table-stripped table-bordered table"},b=(0,e._)("thead",null,[(0,e._)("tr",null,[(0,e._)("th",null,"SN"),(0,e._)("th",null,"Names"),(0,e._)("th",null," Number"),(0,e._)("th",null," purpose"),(0,e._)("th",null," Tag"),(0,e._)("th",null,"time in"),(0,e._)("th",null,"time out"),(0,e._)("th",null,[(0,e._)("i",{class:"bi bi-pencil-fill"})])])],-1),v=["onClick"],p=(0,e._)("i",{class:"bi bi-box-arrow-right"},null,-1),g=[p],m={class:"flex justify-center mt-4"},k={class:"relative justify-center rounded-md shadow pagination"};var w={__name:"VisitorOutTime",setup(l){const t=(0,s.iH)({}),n=l=>{a.Z.dispatch("getMethod",{url:"/sign-visitor-out/"+l}).then((()=>{p()})).catch((l=>{console.log(l)}))};function p(){a.Z.dispatch("getMethod",{url:"/visitor-log"}).then((l=>{t.value=200==l?.status?l.data:{}})).catch((l=>{console.log(l)}))}function w(l){alert(),l.url&&!l.active&&alert(l.url)}return p(),(l,a)=>((0,e.wg)(),(0,e.iD)("div",null,[(0,e._)("div",r,[(0,e._)("div",o,[c,(0,e._)("div",d,[(0,e._)("div",_,[(0,e._)("table",h,[b,(0,e._)("tbody",null,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(t.value.data,((l,t)=>((0,e.wg)(),(0,e.iD)("tr",{key:t},[(0,e._)("td",null,(0,i.zw)(t+1),1),(0,e._)("td",null,(0,i.zw)(l.names),1),(0,e._)("td",null,(0,i.zw)(l.gsm),1),(0,e._)("td",null,(0,i.zw)(l.purpose),1),(0,e._)("td",null,(0,i.zw)(l.tag),1),(0,e._)("td",null,(0,i.zw)(l.time_in),1),(0,e._)("td",null,(0,i.zw)(l.time_out),1),(0,e._)("td",null,[(0,e._)("button",{onClick:t=>n(l.id),type:"button",class:"btn btn-primary btn-sm"},g,8,v)])])))),128))])]),(0,e._)("div",m,[(0,e._)("nav",k,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(t.value.links,((l,t)=>((0,e.wg)(),(0,e.j4)(u.Z,{link:l,key:t,onNext:t=>w(l)},null,8,["link","onNext"])))),128))])])])])])])]))}};const f=w;var y=f}}]);
//# sourceMappingURL=4550.8a1523f8.js.map