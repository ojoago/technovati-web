"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[4397],{1187:function(t,l,e){e.d(l,{Z:function(){return u}});var n=e(3396);const a=["disabled","innerHTML"];var i={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(t){return(l,e)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("li",{class:"page-item",onClick:e[0]||(e[0]=e=>l.$emit("next",t.link))},[(0,n._)("span",{class:"page-link pointer",href:"#",disabled:!t.link.url,innerHTML:t.link.label},null,8,a)])]))}};const s=i;var u=s},4397:function(t,l,e){e.r(l),e.d(l,{default:function(){return T}});e(560);var n=e(3396),a=e(7139),i=e(4870),s=e(2191),u=e(1187),r=e(2483);const o={class:"container my-2"},d={class:"card"},c={class:"card-body"},_=(0,n._)("h3",{class:"card-title"},"Staff Travel Request ",-1),p={class:"table-responsive"},v={class:"table-hover table-stripped table-bordered table"},h=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"SN"),(0,n._)("th",null,"title"),(0,n._)("th",null,"Department"),(0,n._)("th",null,"destination"),(0,n._)("th",null,"from"),(0,n._)("th",null,"to"),(0,n._)("th",null,"crew"),(0,n._)("th",null,"itinerary"),(0,n._)("th",null,"mode"),(0,n._)("th",null,"Initiator"),(0,n._)("th",null,[(0,n._)("i",{class:"bi bi-gear-fill"})])])],-1),w={class:"dropdown"},b=(0,n._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,n._)("i",{class:"bi bi-tools"})],-1),g={class:"dropdown-menu"},k=["onClick"],m={key:0},f=["onClick"],y=["onClick"],D={class:"flex justify-center mt-4"},q={class:"relative justify-center rounded-md shadow pagination"};var z={__name:"ManageTravelRequest",setup(t){const l=(0,i.iH)(null),e=(0,i.iH)(null);l.value=s.Z?.state?.user?.data?.pid,e.value=s.Z?.state?.approvalLevel;const z=(0,i.iH)([1,5]);2==e.value?z.value=[2,6]:3==e.value?z.value=[3,7]:4==e.value&&(z.value=[4,8]);const H=(0,r.tv)();let T={};H.push({query:T});const C=(t,l)=>{s.Z.dispatch("putMethod",{url:`/update-travel-request-status/${t}/${l}`,prompt:"Are you sure, you want to update the status of this request?"}).then((t=>{201==t?.status&&x()}))},Z=(0,i.iH)({});function x(t="/load-staff-request"){s.Z.dispatch("getMethod",{url:t}).then((t=>{Z.value=200==t?.status?t.data:{}}))}function j(t){localStorage.setItem("TVATI_TRV_RQS_DETAIL",JSON.stringify(t,null,2)),H.push({path:"travel-request-detail-hr-view",query:{request:t.pid}})}x();const L=(0,i.iH)([]);function M(){s.Z.dispatch("loadDropdown","users").then((({data:t})=>{L.value=t}))}function R(t){t.url&&!t.active&&x(t.url)}return M(),(t,i)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",o,[(0,n._)("div",d,[(0,n._)("div",c,[_,(0,n._)("div",p,[(0,n._)("table",v,[h,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(Z.value?.data,((t,i)=>((0,n.wg)(),(0,n.iD)("tr",{key:i},[(0,n._)("td",null,(0,a.zw)(i+1),1),(0,n._)("td",null,(0,a.zw)(t.title),1),(0,n._)("td",null,(0,a.zw)(t.department.department),1),(0,n._)("td",null,(0,a.zw)(t.destination),1),(0,n._)("td",null,(0,a.zw)(t.start),1),(0,n._)("td",null,(0,a.zw)(t.to),1),(0,n._)("td",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(t.crew,(t=>((0,n.wg)(),(0,n.iD)("span",{key:t.pid,class:"badge bg-dark p-1 m-1"},(0,a.zw)(t.text),1)))),128))]),(0,n._)("td",null,(0,a.zw)(t.itinerary),1),(0,n._)("td",null,(0,a.zw)(t.mode),1),(0,n._)("td",null,(0,a.zw)(t.user.username),1),(0,n._)("td",null,[(0,n._)("div",w,[b,(0,n._)("ul",g,[(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer bg-info",onClick:l=>j(t)},"Details",8,k)]),t.status+1==e.value||t.line_manager==l.value&&0==t?.status?((0,n.wg)(),(0,n.iD)("div",m,[(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer bg-success",onClick:l=>C(t.pid,z.value[0])},"Approve",8,f)]),(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer bg-secondary",onClick:l=>C(t.pid,z.value[1])},"Reject",8,y)])])):(0,n.kq)("",!0)])])])])))),128))])]),(0,n._)("div",D,[(0,n._)("nav",q,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(Z.value.links,((t,l)=>((0,n.wg)(),(0,n.j4)(u.Z,{link:t,key:l,onNext:l=>R(t)},null,8,["link","onNext"])))),128))])])])])])])]))}};const H=z;var T=H}}]);
//# sourceMappingURL=4397.2b6d3b8d.js.map