"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[5883],{1187:function(t,l,e){e.d(l,{Z:function(){return o}});var n=e(3396);const a=["disabled","innerHTML"];var s={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(t){return(l,e)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("li",{class:"page-item",onClick:e[0]||(e[0]=e=>l.$emit("next",t.link))},[(0,n._)("span",{class:"page-link pointer",href:"#",disabled:!t.link.url,innerHTML:t.link.label},null,8,a)])]))}};const i=s;var o=i},9166:function(t,l,e){e.d(l,{Z:function(){return q}});e(560);var n=e(3396),a=e(7139),s=e(2191),i=e(4870),o=e(2483);const r={class:"container mt-2"},u={class:"border rounded-3 p-2 m-1"},d=(0,n._)("legend",{class:"float-none w-auto px-2 h5"},null,-1),c=(0,n._)("input",{type:"text",class:"form-control form-control-sm",placeholder:"search Item"},null,-1),_={class:"table-responsive"},p={class:"table-hover table-stripped table-bordered table"},b=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"SN"),(0,n._)("th",null,"Request Note"),(0,n._)("th",null,"Requested By"),(0,n._)("th",null,"Items"),(0,n._)("th",null,"Receiver"),(0,n._)("th",null,"Receiver"),(0,n._)("th",null,"time"),(0,n._)("th",{align:"center"},[(0,n._)("i",{class:"bi bi-gear-fill"})])])],-1),m={class:"dropdown"},v=(0,n._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,n._)("i",{class:"bi bi-tools"})],-1),w={class:"dropdown-menu"},h=["onClick"],g=["onClick"],y=["onClick"];var f={__name:"InventoryItemListComponent",setup(t){const l=(0,o.tv)(),e=(0,i.iH)({});function f(t){localStorage.setItem("TVATI_MY_RQ_DETAIL",JSON.stringify(t,null,2)),l.push({path:"my-request-details",query:{request:t.pid}})}function k(){s.Z.dispatch("getMethod",{url:"/load-item-request"}).then((t=>{200==t?.status&&(console.log(t.data),e.value=t.data)}))}return k(),(t,l)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",r,[(0,n._)("fieldset",u,[d,c,(0,n._)("div",_,[(0,n._)("table",p,[b,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.value?.data,((t,l)=>((0,n.wg)(),(0,n.iD)("tr",{key:l},[(0,n._)("td",null,(0,a.zw)(l+1),1),(0,n._)("td",null,(0,a.zw)(t.comment),1),(0,n._)("td",null,(0,a.zw)(t.request?.username),1),(0,n._)("td",null,(0,a.zw)(t.items_count),1),(0,n._)("td",null,(0,a.zw)(t.receiver?.username??t.request?.username),1),(0,n._)("td",null,(0,a.zw)(t.way_status),1),(0,n._)("td",null,(0,a.zw)(t.request_time),1),(0,n._)("td",null,[(0,n._)("div",m,[v,(0,n._)("ul",w,[(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer bg-info",onClick:l=>f(t)},"Detail",8,h)]),(0,n._)("li",null,[0==t?.status?((0,n.wg)(),(0,n.iD)("a",{key:0,class:"dropdown-item pointer bg-warning",onClick:l=>f(t)},"Edit",8,g)):(0,n.kq)("",!0)]),(0,n._)("li",null,[1==t?.status?((0,n.wg)(),(0,n.iD)("a",{key:0,class:"dropdown-item pointer bg-secondary",onClick:l=>f(t)},"Return",8,y)):(0,n.kq)("",!0)])])])])])))),128))])])])])])]))}};const k=f;var q=k},5883:function(t,l,e){e.r(l),e.d(l,{default:function(){return E}});var n=e(3396),a=(e(560),e(7139)),s=e(9242),i=e(2191),o=e(4870),r=e(6091),u=e(1187),d=e(2483);const c={class:"container mt-2"},_={class:"border rounded-3 p-2 m-1"},p=(0,n._)("legend",{class:"float-none w-auto px-2 h5"},null,-1),b=(0,n._)("input",{type:"text",class:"form-control form-control-sm",placeholder:"search Item"},null,-1),m={class:"table-responsive"},v={class:"table-hover table-stripped table-bordered table"},w=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"SN"),(0,n._)("th",null,"Request Note"),(0,n._)("th",null,"Items"),(0,n._)("th",null,"Receiver"),(0,n._)("th",null,"time"),(0,n._)("th",null,"status"),(0,n._)("th",{align:"center"},[(0,n._)("i",{class:"bi bi-gear-fill"})])])],-1),h={class:"dropdown"},g=(0,n._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,n._)("i",{class:"bi bi-tools"})],-1),y={class:"dropdown-menu"},f=["onClick"],k=["onClick"],q=["onClick"],C={class:"flex justify-center mt-4"},D={class:"relative justify-center rounded-md shadow pagination"},R={id:"rForm"},z={class:"table-hover table-stripped table-bordered table"},I=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"SN"),(0,n._)("th",null,"Item Name"),(0,n._)("th",null,"Model"),(0,n._)("th",null,"Requested"),(0,n._)("th",null,"Supplied"),(0,n._)("th",null,"Return")])],-1),x=["onUpdate:modelValue"];var M={__name:"RawListComponent",setup(t){const l=(0,d.tv)(),e=(0,o.iH)(!1),M=(0,o.iH)({}),T=(0,o.iH)({}),H=t=>{e.value=!0,T.value=t?.item},N=()=>{e.value=!1};function S(t){localStorage.setItem("TVATI_RAW_MAT_RQ_DETAIL",JSON.stringify(t,null,2)),l.push({path:"raw-material-request-details",query:{request:t.pid}})}function Z(t="/load-my-raw-material-requests"){i.Z.dispatch("getMethod",{url:t}).then((t=>{200==t?.status&&(M.value=t.data)})).catch((t=>{console.log(t)}))}Z();const L=()=>{i.Z.dispatch("postMethod",{url:"/return-requested-raw-materials",param:T.value}).then((t=>{201==t?.status&&(e.value=!1)})).catch((t=>{console.log(t)}))},j=t=>{i.Z.dispatch("postMethod",{url:"/cancel-raw-material-request/"+t,param:T.value}).then((t=>{201==t?.status&&(e.value=!1)})).catch((t=>{console.log(t)}))};function A(t){t.url&&!t.active&&Z(t.url)}return(t,l)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",c,[(0,n._)("fieldset",_,[p,b,(0,n._)("div",m,[(0,n._)("table",v,[w,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(M.value?.data,((t,l)=>((0,n.wg)(),(0,n.iD)("tr",{key:l},[(0,n._)("td",null,(0,a.zw)(l+1),1),(0,n._)("td",null,(0,a.zw)(t?.note),1),(0,n._)("td",null,(0,a.zw)(t?.item_count),1),(0,n._)("td",null,(0,a.zw)(t?.receiver?.username??t.user?.username),1),(0,n._)("td",null,(0,a.zw)(t?.request_time),1),(0,n._)("td",null,(0,a.zw)(t?.request_status),1),(0,n._)("td",null,[(0,n._)("div",h,[g,(0,n._)("ul",y,[(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer",onClick:l=>S(t)},"Detail",8,f)]),(0,n._)("li",null,[0==t?.status?((0,n.wg)(),(0,n.iD)("a",{key:0,class:"dropdown-item pointer bg-warning",onClick:l=>j(t.request_pid)},"Cancel",8,k)):(0,n.kq)("",!0)]),(0,n._)("li",null,[t?.status>0&&t?.status<4?((0,n.wg)(),(0,n.iD)("a",{key:0,class:"dropdown-item pointer bg-info",onClick:l=>H(t)},"Return",8,q)):(0,n.kq)("",!0)])])])])])))),128))])]),(0,n._)("div",C,[(0,n._)("nav",D,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(M.value.links,((t,l)=>((0,n.wg)(),(0,n.j4)(u.Z,{link:t,key:l,onNext:l=>A(t)},null,8,["link","onNext"])))),128))])])])])]),(0,n.Wm)(r.Z,{isOpen:e.value,"modal-class":"modal-lg",onSubmit:L,title:"Returning Item to store",onModalClose:N},{content:(0,n.w5)((()=>[(0,n._)("div",null,[(0,n._)("form",R,[(0,n._)("table",z,[I,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(T.value,((t,l)=>((0,n.wg)(),(0,n.iD)("tr",{key:l},[(0,n._)("td",null,(0,a.zw)(l+1),1),(0,n._)("td",null,(0,a.zw)(t.name),1),(0,n._)("td",null,(0,a.zw)(t.model),1),(0,n._)("td",null,(0,a.zw)(t.quantity_requested),1),(0,n._)("td",null,(0,a.zw)(t.quantity_supplied),1),(0,n._)("td",null,[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":l=>t.quantity_returned=l,type:"text",class:"form-control form-control-sm",placeholder:""},null,8,x),[[s.nr,t.quantity_returned]])])])))),128))])])])])])),_:1},8,["isOpen"])]))}};const T=M;var H=T,N=e(9166);const S={class:"container mt-2"},Z={class:"card"},L={class:"card-body"},j=(0,n._)("h5",{class:"card-title"}," Request List ",-1),A=(0,n._)("ul",{class:"nav nav-tabs d-flex",id:"myTabjustified",role:"tablist"},[(0,n._)("li",{class:"nav-item flex-fill",role:"presentation"},[(0,n._)("button",{class:"nav-link w-100 active",id:"raw-tab","data-bs-toggle":"tab","data-bs-target":"#raw",type:"button",role:"tab","aria-controls":"raw","aria-selected":"true"},"Raw Materials")]),(0,n._)("li",{class:"nav-item flex-fill",role:"presentation"},[(0,n._)("button",{class:"nav-link w-100",id:"inventory-tab","data-bs-toggle":"tab","data-bs-target":"#inventory",type:"button",role:"tab","aria-controls":"inventory","aria-selected":"false"},"Inventory Item")])],-1),O={class:"tab-content pt-2",id:"myTabjustifiedContent"},V={class:"tab-pane fade show active",id:"raw",role:"tabpanel","aria-labelledby":"raw-tab"},Y={class:"tab-pane fade",id:"inventory",role:"tabpanel","aria-labelledby":"inventory-tab"};var K={__name:"MyRawMaterialRequestView",setup(t){return(t,l)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",S,[(0,n._)("div",Z,[(0,n._)("div",L,[j,A,(0,n._)("div",O,[(0,n._)("div",V,[(0,n.Wm)(H)]),(0,n._)("div",Y,[(0,n.Wm)(N.Z)])])])])])]))}};const W=K;var E=W}}]);
//# sourceMappingURL=5883.3a2f02d0.js.map