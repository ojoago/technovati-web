"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[9389],{1187:function(e,l,a){a.d(l,{Z:function(){return i}});var n=a(3396);const t=["disabled","innerHTML"];var o={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(e){return(l,a)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("li",{class:"page-item",onClick:a[0]||(a[0]=a=>l.$emit("next",e.link))},[(0,n._)("span",{class:"page-link pointer",href:"#",disabled:!e.link.url,innerHTML:e.link.label},null,8,t)])]))}};const r=o;var i=r},9389:function(e,l,a){a.r(l),a.d(l,{default:function(){return le}});a(560);var n=a(3396),t=a(7139),o=a(9242),r=a(4870),i=a(2191),u=a(1187),s=a(6204),c=a(6091),d=a(2483);const m={class:"container mt-2"},p={class:"card"},_={class:"card-body"},v=(0,n._)("input",{type:"text",class:"form-control form-control-sm",placeholder:"search Item"},null,-1),b={class:"table-responsive"},g={class:"table-hover table-stripped table-bordered table"},f=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"SN"),(0,n._)("th",null,"Vehicle "),(0,n._)("th",null,"Brand"),(0,n._)("th",null,"Plate Number"),(0,n._)("th",null,"Engine Number"),(0,n._)("th",null,"Color"),(0,n._)("th",null,"Driver"),(0,n._)("th",{align:"center"},[(0,n._)("i",{class:"bi bi-gear-fill"})])])],-1),h={class:"dropdown"},w=(0,n._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,n._)("i",{class:"bi bi-tools"})],-1),y={class:"dropdown-menu"},k=["onClick"],x=["onClick"],D=["onClick"],V={class:"flex justify-center mt-4"},C={class:"relative justify-center rounded-md shadow pagination"},z={id:"toolForm"},q={class:"row"},H={class:"col-md-6"},N=(0,n._)("label",{class:"form-label"},"Model *",-1),U={key:0,class:"text-danger"},Z={class:"col-md-6"},M=(0,n._)("label",{class:"form-label"},"Brand *",-1),S={key:0,class:"text-danger"},T={class:"col-md-6"},E=(0,n._)("label",{class:"form-label"},"Engine Number *",-1),I={key:0,class:"text-danger"},L={class:"col-md-6"},j=(0,n._)("label",{class:"form-label"},"Plate Number *",-1),A={key:0,class:"text-danger"},O={class:"col-md-6"},B=(0,n._)("label",{class:"form-label"},"Color *",-1),F={key:0,class:"text-danger"},P={class:"col-md-6"},K=(0,n._)("label",{class:"form-label"},"Fuel Capacity *",-1),W={key:0,class:"text-danger"},Y={class:"col-md-6"},J=(0,n._)("label",{class:"form-label"},"Mileage *",-1),$={key:0,class:"text-danger"},G={class:"col-md-6"},Q=(0,n._)("label",{class:"form-label"},"Driver",-1),R={key:0,class:"text-danger"};var X={__name:"VehicleView",setup(e){const l=(0,d.tv)();let a={};l.push({query:a});const X=(0,r.iH)(!1),ee=(0,r.iH)(!1),le=()=>{X.value=!0},ae=()=>{X.value=!1,ee.value=!1,te()},ne=(0,r.iH)({name:"",brand:"",plate_number:"",engine_number:"",color:"",driver:"",mileage:"",fuel_capacity:""}),te=()=>{ne.value={name:"",brand:"",plate_number:"",engine_number:"",color:"",driver:"",mileage:"",fuel_capacity:""}},oe=(0,r.iH)({});function re(){oe.value=[];let e=document.querySelector("#toolForm");i.Z.dispatch("postMethod",{url:"/add-vehicle",param:ne.value,form:e}).then((e=>{422==e?.status?oe.value=e.data:201==e?.status&&(ae(),de())}))}const ie=e=>{localStorage.setItem("TVATI_VEHICLE_DETAIL",JSON.stringify(e,null,2)),l.push({path:"vehicle-detail",query:{vehicle:e.pid}})},ue=e=>{ne.value={name:e.name,brand:e.brand,plate_number:e.plate_number,engine_number:e.engine_number,color:e.color,driver:e?.driver?.pid,mileage:e.mileage,fuel_capacity:e.fuel_capacity,pid:e.pid},X.value=!0};function se(e){i.Z.dispatch("deleteMethod",{url:"/delete-vehicle/"+e}).then((e=>{201==e?.status&&de()})).catch((e=>{console.log(e)}))}const ce=(0,r.iH)({});function de(){i.Z.dispatch("getMethod",{url:"/load-vehicles"}).then((e=>{i.Z.commit("setSpinner",!1),200==e?.status&&(ce.value=e.data)}))}de();const me=(0,r.iH)({});function pe(){i.Z.dispatch("loadDropdown","drivers").then((({data:e})=>{me.value=e}))}function _e(e){e.url&&!e.active&&alert(e.url)}return pe(),(e,l)=>((0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",m,[(0,n._)("div",p,[(0,n._)("div",_,[(0,n._)("div",{class:"card-header"},[(0,n.Uk)(" Vehicles "),(0,n._)("button",{class:"btn btn-sm btn-primary",onClick:le},"Add Vehicle")]),v,(0,n._)("div",b,[(0,n._)("table",g,[f,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(ce.value?.data,((e,l)=>((0,n.wg)(),(0,n.iD)("tr",{key:l},[(0,n._)("td",null,(0,t.zw)(l+1),1),(0,n._)("td",null,(0,t.zw)(e.name),1),(0,n._)("td",null,(0,t.zw)(e.brand),1),(0,n._)("td",null,(0,t.zw)(e.plate_number),1),(0,n._)("td",null,(0,t.zw)(e.engine_number),1),(0,n._)("td",null,(0,t.zw)(e.color),1),(0,n._)("td",null,(0,t.zw)(e?.driver?.username),1),(0,n._)("td",null,[(0,n._)("div",h,[w,(0,n._)("ul",y,[(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer",onClick:l=>ie(e)},"Detail",8,k)]),(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer text-warning",onClick:l=>ue(e)},"Edit",8,x)]),(0,n._)("li",null,[(0,n._)("a",{class:"dropdown-item pointer text-danger",onClick:l=>se(e.pid)},"Delete",8,D)])])])])])))),128))])]),(0,n._)("div",V,[(0,n._)("nav",C,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(ce.value.links,((e,l)=>((0,n.wg)(),(0,n.j4)(u.Z,{link:e,key:l,onNext:l=>_e(e)},null,8,["link","onNext"])))),128))])])])])])]),(0,n.Wm)(c.Z,{isOpen:X.value,"modal-class":"modal-lg",title:"Add New Vehicle",onSubmit:re,onModalClose:ae},{content:(0,n.w5)((()=>[(0,n._)("form",z,[(0,n._)("div",q,[(0,n._)("div",H,[N,(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":l[0]||(l[0]=e=>ne.value.name=e),placeholder:"e.g Corola S",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.name]]),oe.value?.name?((0,n.wg)(),(0,n.iD)("p",U,(0,t.zw)(oe.value?.name[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",Z,[M,(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":l[1]||(l[1]=e=>ne.value.brand=e),placeholder:"e.g Toyota",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.brand]]),oe.value?.brand?((0,n.wg)(),(0,n.iD)("p",S,(0,t.zw)(oe.value?.brand[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",T,[E,(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":l[2]||(l[2]=e=>ne.value.engine_number=e),placeholder:"e.g xkev1",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.engine_number]]),oe.value?.engine_number?((0,n.wg)(),(0,n.iD)("p",I,(0,t.zw)(oe.value?.engine_number[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",L,[j,(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":l[3]||(l[3]=e=>ne.value.plate_number=e),placeholder:"e.g kd12sk",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.plate_number]]),oe.value?.plate_number?((0,n.wg)(),(0,n.iD)("p",A,(0,t.zw)(oe.value?.plate_number[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",O,[B,(0,n.wy)((0,n._)("input",{type:"text","onUpdate:modelValue":l[4]||(l[4]=e=>ne.value.color=e),placeholder:"e.g Navy Blue",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.color]]),oe.value?.color?((0,n.wg)(),(0,n.iD)("p",F,(0,t.zw)(oe.value?.color[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",P,[K,(0,n.wy)((0,n._)("input",{type:"number","onUpdate:modelValue":l[5]||(l[5]=e=>ne.value.fuel_capacity=e),placeholder:"e.g 50",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.fuel_capacity]]),oe.value?.fuel_capacity?((0,n.wg)(),(0,n.iD)("p",W,(0,t.zw)(oe.value?.fuel_capacity[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",Y,[J,(0,n.wy)((0,n._)("input",{type:"number","onUpdate:modelValue":l[6]||(l[6]=e=>ne.value.mileage=e),placeholder:"e.g 600",class:"form-control form-control-sm"},null,512),[[o.nr,ne.value.mileage]]),oe.value?.mileage?((0,n.wg)(),(0,n.iD)("p",$,(0,t.zw)(oe.value?.mileage[0]),1)):(0,n.kq)("",!0)]),(0,n._)("div",G,[Q,(0,n.Wm)((0,r.SU)(s.Z),{modelValue:ne.value.driver,"onUpdate:modelValue":l[7]||(l[7]=e=>ne.value.driver=e),options:me.value},null,8,["modelValue","options"]),oe.value?.driver?((0,n.wg)(),(0,n.iD)("p",R,(0,t.zw)(oe.value?.driver[0]),1)):(0,n.kq)("",!0)])])])])),_:1},8,["isOpen"])]))}};const ee=X;var le=ee}}]);
//# sourceMappingURL=9389.e4780afe.js.map