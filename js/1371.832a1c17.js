"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[1371],{1187:function(l,t,n){n.d(t,{Z:function(){return o}});var a=n(3396);const e=["disabled","innerHTML"];var s={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(l){return(t,n)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("li",{class:"page-item",onClick:n[0]||(n[0]=n=>t.$emit("next",l.link))},[(0,a._)("span",{class:"page-link pointer",href:"#",disabled:!l.link.url,innerHTML:l.link.label},null,8,e)])]))}};const i=s;var o=i},1371:function(l,t,n){n.r(t),n.d(t,{default:function(){return L}});n(560);var a=n(3396),e=n(7139),s=n(2191),i=n(4870),o=n(1187),u=n(2483);const c={class:"container mt-2"},d={class:"card"},r=(0,a._)("div",{class:"card-header"},[(0,a._)("h3",null,"Sales List")],-1),_={class:"card-body"},p={class:"table-responsive"},w={class:"table-hover table-stripped table-bordered table"},b=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"SN"),(0,a._)("th",null,"Date"),(0,a._)("th",null,"Ref"),(0,a._)("th",null,"Account"),(0,a._)("th",null,"customer"),(0,a._)("th",null,"Status"),(0,a._)("th",null,"Grand Total"),(0,a._)("th",null,"Balance"),(0,a._)("th",null,"Store"),(0,a._)("th",null,[(0,a._)("i",{class:"bi bi-gear-fill"})])])],-1),h={key:0,class:"mb-2"},v={class:"dropdown"},g=(0,a._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,a._)("i",{class:"bi bi-tools"})],-1),k={class:"dropdown-menu"},m=["onClick"],f=["onClick"],y={key:1,class:"text-center",style:{width:"100%"},width:"100%"},D=(0,a._)("tr",null,[(0,a._)("td",{colspan:"50"},[(0,a._)("small",{class:"small"},"No Record Yet")])],-1),S=[D],z={class:"flex justify-center mt-4"},T={class:"relative justify-center rounded-md shadow pagination"};var C={__name:"SalesList",setup(l){const t=(0,u.tv)(),n=(0,i.iH)({});function D(l="/load-sales"){s.Z.dispatch("getMethod",{url:l}).then((l=>{n.value=200==l?.status?l.data:{}})).catch((l=>{console.log(l)}))}D();const C=l=>{localStorage.setItem("TVATI_EDIT_SLS",JSON.stringify(l,null,2)),t.push({path:"add-sales",query:{id:l.pid,action:"edit"}})};function x(l){l.url&&!l.active&&D(l.url)}return(l,t)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",c,[(0,a._)("div",d,[r,(0,a._)("div",_,[(0,a._)("div",p,[(0,a._)("table",w,[b,n.value.data?((0,a.wg)(),(0,a.iD)("tbody",h,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.value.data,((t,n)=>((0,a.wg)(),(0,a.iD)("tr",{key:n},[(0,a._)("td",null,(0,e.zw)(n+1),1),(0,a._)("td",null,(0,e.zw)(t.date),1),(0,a._)("td",null,(0,e.zw)(t.sales_no),1),(0,a._)("td",null,(0,e.zw)(t?.account?.name),1),(0,a._)("td",null,(0,e.zw)(t?.customer?.name),1),(0,a._)("td",null,(0,e.zw)(t?.c_status),1),(0,a._)("td",null,(0,e.zw)(t?.total),1),(0,a._)("td",null,(0,e.zw)(t?.payment?.balance),1),(0,a._)("td",null,(0,e.zw)(t?.store?.name),1),(0,a._)("td",null,[(0,a._)("div",v,[g,(0,a._)("ul",k,[(0,a._)("li",null,[t.status?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("a",{key:0,class:"dropdown-item pointer bg-warning",onClick:l=>C(t)},"Edit",8,m))]),(0,a._)("li",null,[(0,a._)("a",{class:"dropdown-item pointer bg-success",onClick:n=>l.reActivateStaff(t)},"Details",8,f)])])])])])))),128))])):((0,a.wg)(),(0,a.iD)("tfoot",y,S))]),(0,a._)("div",z,[(0,a._)("nav",T,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.value.links,((l,t)=>((0,a.wg)(),(0,a.j4)(o.Z,{link:l,key:t,onNext:t=>x(l)},null,8,["link","onNext"])))),128))])])])])])])]))}};const x=C;var L=x}}]);
//# sourceMappingURL=1371.832a1c17.js.map