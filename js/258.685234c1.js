"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[258],{1187:function(l,t,n){n.d(t,{Z:function(){return r}});var a=n(3396);const e=["disabled","innerHTML"];var s={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(l){return(t,n)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("li",{class:"page-item",onClick:n[0]||(n[0]=n=>t.$emit("next",l.link))},[(0,a._)("span",{class:"page-link pointer",href:"#",disabled:!l.link.url,innerHTML:l.link.label},null,8,e)])]))}};const i=s;var r=i},258:function(l,t,n){n.r(t),n.d(t,{default:function(){return H}});n(560);var a=n(3396),e=n(7139),s=n(2191),i=n(4870),r=n(1187),o=n(2483);const u={class:"container mt-2 mb-2"},d={class:"card"},c=(0,a._)("div",{class:"card-header"},[(0,a._)("h3",{class:"mx-4"},"Appraisal List")],-1),_={class:"card-body"},p={class:"table-responsive"},h={class:"table-hover table-stripped table-bordered table"},w=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"SN"),(0,a._)("th",null,"username"),(0,a._)("th",null,"Title"),(0,a._)("th",null,"Month"),(0,a._)("th",null,"Year"),(0,a._)("th",null,"Status"),(0,a._)("th",null,"Start"),(0,a._)("th",null,"End"),(0,a._)("th",null,[(0,a._)("i",{class:"bi bi-gear-fill"})])])],-1),b={key:0},v={class:"dropdown"},m=(0,a._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,a._)("i",{class:"bi bi-tools"})],-1),g={class:"dropdown-menu"},k={key:0,class:"bg-warning"},f=["onClick"],y={class:"bg-success"},z=["onClick"],C={key:1,class:"text-center",style:{width:"100%"},width:"100%"},D=(0,a._)("tr",null,[(0,a._)("td",{colspan:"50"},[(0,a._)("small",{class:"small"},"No Record Yet")])],-1),x=[D],S={class:"flex justify-center mt-4"},T={class:"relative justify-center rounded-md shadow pagination"};var A={__name:"StaffAppraisalListView",setup(l){const t=(0,o.tv)(),n=(0,i.iH)({}),D=l=>{localStorage.setItem("TVATI_APPRAISAL",JSON.stringify(l,null,2)),t.push({path:"self-appraisal-hr-comment",query:{param:l.pid}})};function A(l="/load-staff-appraisal"){s.Z.dispatch("getMethod",{url:l}).then((l=>{n.value=200==l?.status?l.data:{}})).catch((l=>{console.log(l)}))}function L(l){l.url&&!l.active&&A(l.url)}return A(),(l,t)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",u,[(0,a._)("div",d,[c,(0,a._)("div",_,[(0,a._)("div",p,[(0,a._)("table",h,[w,n.value?.data?((0,a.wg)(),(0,a.iD)("tbody",b,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.value?.data,((l,t)=>((0,a.wg)(),(0,a.iD)("tr",{key:t},[(0,a._)("td",null,(0,e.zw)(t+1),1),(0,a._)("td",null,(0,e.zw)(l?.username),1),(0,a._)("td",null,(0,e.zw)(l?.title),1),(0,a._)("td",null,(0,e.zw)(l?.month),1),(0,a._)("td",null,(0,e.zw)(l?.year),1),(0,a._)("td",null,(0,e.zw)(l?._status),1),(0,a._)("td",null,(0,e.zw)(l?.start),1),(0,a._)("td",null,(0,e.zw)(l?.end),1),(0,a._)("td",null,[(0,a._)("div",v,[m,(0,a._)("ul",g,[2==l?.status?((0,a.wg)(),(0,a.iD)("li",k,[(0,a._)("a",{class:"dropdown-item pointer",onClick:t=>D(l)},"Comment",8,f)])):(0,a.kq)("",!0),(0,a._)("li",y,[(0,a._)("a",{class:"dropdown-item pointer",onClick:t=>D(l)},"Preview",8,z)])])])])])))),128))])):((0,a.wg)(),(0,a.iD)("tfoot",C,x))]),(0,a._)("div",S,[(0,a._)("nav",T,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(n.value?.links,((l,t)=>((0,a.wg)(),(0,a.j4)(r.Z,{link:l,key:t,onNext:t=>L(l)},null,8,["link","onNext"])))),128))])])])])])])]))}};const L=A;var H=L}}]);
//# sourceMappingURL=258.685234c1.js.map