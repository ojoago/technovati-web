"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[1327],{1187:function(e,l,t){t.d(l,{Z:function(){return s}});var a=t(3396);const n=["disabled","innerHTML"];var i={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(e){return(l,t)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("li",{class:"page-item",onClick:t[0]||(t[0]=t=>l.$emit("next",e.link))},[(0,a._)("span",{class:"page-link pointer",href:"#",disabled:!e.link.url,innerHTML:e.link.label},null,8,n)])]))}};const o=i;var s=o},1327:function(e,l,t){t.r(l),t.d(l,{default:function(){return I}});var a=t(3396),n=t(7139),i=t(9242),o=t(2191),s=t(4870),u=t(1187),d=t(6091);const c={class:"container mt-2"},r={class:"card"},v={class:"card-header"},m={class:"row"},_=(0,a._)("div",{class:"col-md-6"}," Company Items ",-1),p={class:"col-md-6"},w=(0,a._)("option",{disabled:"",selected:""},"Make Selection",-1),y=["value"],g=["value"],b={class:"card-body"},h={class:"table-responsive"},f={class:"table-hover table-stripped table-bordered table"},k=(0,a._)("thead",null,[(0,a._)("tr",null,[(0,a._)("th",null,"SN"),(0,a._)("th",null,"Store"),(0,a._)("th",null,"Name"),(0,a._)("th",null,"Quantity"),(0,a._)("th",null,"Description"),(0,a._)("th",null,[(0,a._)("i",{class:"bi bi-gear-fill"})])])],-1),D=["onClick"],q=(0,a._)("i",{class:"bi bi-eject"},null,-1),x=[q],H={class:"flex justify-center mt-4"},z={class:"relative justify-center rounded-md shadow pagination"},C={id:"anForm"},M={class:"row"},Z={class:"col-md-12"},j=(0,a._)("label",{class:"form-label"},"Quantity",-1),N={key:0,class:"text-danger"},S={class:"col-md-12"},Q=(0,a._)("label",{class:"form-label"},"Date",-1),T={key:0,class:"text-danger"},V={class:"col-md-12"},Y={class:"form-group"},K=(0,a._)("label",{class:"form-label"},"Note",-1),L={key:0,class:"text-danger"};var O={__name:"StoreItemView",setup(e){const l=(0,s.iH)(!1),t=(0,s.iH)({}),q=(0,s.iH)(null);function O(e){q.value=e,U("/load-store-items/"+e)}function U(e="load-all-store-items"){o.Z.dispatch("getMethod",{url:e}).then((e=>{t.value=200==e?.status?e.data:[]})).catch((e=>{console.log(e)}))}U();const I=()=>{l.value=!1,E()},E=()=>{F.value={quantity:"",inventroy_pid:"",note:"",date:""}},F=(0,s.iH)({quantity:"",inventroy_pid:"",note:"",date:""});function P(e){l.value=!0,F.value={quantity:e.quantity,inventroy_pid:e.pid}}const R=(0,s.iH)({}),W=()=>{R.value=[],o.Z.dispatch("postMethod",{url:"/remove-damage-item",param:F.value}).then((e=>{422==e?.status?R.value=e.data:201==e?.status&&(E(),O(q.value),l.value=!1)}))},$=(0,s.iH)({});function A(){o.Z.dispatch("loadDropdown","stores").then((({data:e})=>{1==e.length&&O(e[0].id),$.value=e})).catch((e=>{console.log(e)}))}function B(e){e.url&&!e.active&&U(e.url)}return A(),(e,o)=>((0,a.wg)(),(0,a.iD)("div",null,[(0,a._)("div",c,[(0,a._)("div",r,[(0,a._)("div",v,[(0,a._)("div",m,[_,(0,a._)("div",p,[(0,a._)("select",{class:"form-control",onChange:o[0]||(o[0]=e=>O(e.target.value))},[w,((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)($.value,(e=>((0,a.wg)(),(0,a.iD)(a.HY,{key:e.id},[1==$.value.length?((0,a.wg)(),(0,a.iD)("option",{key:0,selected:"",value:e.id},(0,n.zw)(e.text),9,y)):((0,a.wg)(),(0,a.iD)("option",{key:1,value:e.id},(0,n.zw)(e.text),9,g))],64)))),128))],32)])])]),(0,a._)("div",b,[(0,a._)("div",h,[(0,a._)("table",f,[k,(0,a._)("tbody",null,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.value?.data,((e,l)=>((0,a.wg)(),(0,a.iD)("tr",{key:l},[(0,a._)("td",null,(0,n.zw)(l+1),1),(0,a._)("td",null,(0,n.zw)(e?.store?.name),1),(0,a._)("td",null,(0,n.zw)(e?.item?.name),1),(0,a._)("td",null,(0,n.zw)(e?.quantity)+" "+(0,n.zw)(e?.item?.unit),1),(0,a._)("td",null,(0,n.zw)(e?.item?.description),1),(0,a._)("td",null,[(0,a._)("button",{onClick:l=>P(e),class:"btn btn-sm btn-danger"},x,8,D)])])))),128))])]),(0,a._)("div",H,[(0,a._)("nav",z,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.value.links,((e,l)=>((0,a.wg)(),(0,a.j4)(u.Z,{link:e,key:l,onNext:l=>B(e)},null,8,["link","onNext"])))),128))])])])])])]),(0,a.Wm)(d.Z,{isOpen:l.value,"modal-class":"modal-md",title:"Remove damaged Quantity",onSubmit:W,onModalClose:I},{content:(0,a.w5)((()=>[(0,a._)("form",C,[(0,a._)("div",M,[(0,a._)("div",Z,[j,(0,a.wy)((0,a._)("input",{type:"number",step:"0.1",class:"form-control form-control-sm",placeholder:"Enter Quantity Damaged","onUpdate:modelValue":o[1]||(o[1]=e=>F.value.quantity=e)},null,512),[[i.nr,F.value.quantity]]),R.value?.quantity?((0,a.wg)(),(0,a.iD)("p",N,(0,n.zw)(R.value?.quantity[0]),1)):(0,a.kq)("",!0)]),(0,a._)("div",S,[Q,(0,a.wy)((0,a._)("input",{type:"date",class:"form-control form-control-sm","onUpdate:modelValue":o[2]||(o[2]=e=>F.value.date=e)},null,512),[[i.nr,F.value.date]]),R.value?.date?((0,a.wg)(),(0,a.iD)("p",T,(0,n.zw)(R.value?.date[0]),1)):(0,a.kq)("",!0)]),(0,a._)("div",V,[(0,a._)("div",Y,[K,(0,a.wy)((0,a._)("textarea",{type:"text","onUpdate:modelValue":o[3]||(o[3]=e=>F.value.note=e),class:"form-control",placeholder:"e.g "},null,512),[[i.nr,F.value.note]]),R.value?.note?((0,a.wg)(),(0,a.iD)("p",L,(0,n.zw)(R.value?.note[0]),1)):(0,a.kq)("",!0)])])])])])),_:1},8,["isOpen"])]))}};const U=O;var I=U}}]);
//# sourceMappingURL=1327.92a18c0b.js.map