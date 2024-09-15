"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[2302],{1187:function(l,e,a){a.d(e,{Z:function(){return i}});var t=a(3396);const o=["disabled","innerHTML"];var n={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(l){return(e,a)=>((0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("li",{class:"page-item",onClick:a[0]||(a[0]=a=>e.$emit("next",l.link))},[(0,t._)("span",{class:"page-link pointer",href:"#",disabled:!l.link.url,innerHTML:l.link.label},null,8,o)])]))}};const s=n;var i=s},2302:function(l,e,a){a.r(e),a.d(e,{default:function(){return Ml}});var t=a(3396),o=a(7139),n=a(9242),s=a(4870),i=a(2191),d=a(1187),r=a(6091),u=a(6368);const c={class:"container mt-2"},p={class:"row"},m={class:"col-md-12"},v={class:"card"},_={class:"card-header"},g=(0,t._)("h3",{class:"m"},"Appraisal Configurations",-1),w={class:"card-body"},h={class:"table-responsive"},y={class:"table-hover table-stripped table-bordered table"},b=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"SN"),(0,t._)("th",null,"Cycle"),(0,t._)("th",null,"Year"),(0,t._)("th",null,"Month"),(0,t._)("th",null,"Begin date"),(0,t._)("th",null,"End date"),(0,t._)("th",null,"Note"),(0,t._)("th",null,"Status"),(0,t._)("th",null,[(0,t._)("i",{class:"bi bi-gear-fill"})])])],-1),f={key:0,class:"mb-2"},k={key:0,class:"dropdown"},D=(0,t._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,t._)("i",{class:"bi bi-tools"})],-1),x={class:"dropdown-menu"},z=["onClick"],M=["onClick"],C=["onClick"],H=["onClick"],A={key:1,class:"text-center",style:{width:"100%"},width:"100%"},S=(0,t._)("tr",null,[(0,t._)("td",{colspan:"50"},[(0,t._)("small",{class:"small"},"No Record Yet")])],-1),V=[S],Z={class:"flex justify-center mt-4"},U={class:"relative justify-center rounded-md shadow pagination"},q={id:"configForm"},Y={class:"col-md-12"},T=(0,t._)("label",{class:"form-label"},"Section",-1),N=(0,t._)("option",{value:"",selected:""},"Select Section",-1),K=["value"],O={key:0,class:"text-danger"},F={class:"row"},J={class:"col-md-6"},j={class:"form-group"},L=(0,t._)("label",{class:"form-label"},"Year",-1),P={key:0,class:"text-danger"},W={class:"col-md-6"},E={class:"form-group"},I=(0,t._)("label",{class:"form-label"},"Month",-1),B=(0,t._)("option",{value:"",selected:""},"Select Month",-1),R={key:0,class:"text-danger"},$={class:"col-md-6"},G={class:"form-group"},Q=(0,t._)("label",{class:"form-label"},"From",-1),X={key:0,class:"text-danger"},ll={class:"col-md-6"},el={class:"form-group"},al=(0,t._)("label",{class:"form-label"},"To",-1),tl={key:0,class:"text-danger"},ol={class:"col-md-12"},nl={class:"form-group"},sl=(0,t._)("label",{class:"form-label"},"Note",-1),il={key:0,class:"text-danger"},dl={id:"configForm"},rl={class:"row"},ul={class:"col-md-12"},cl={class:"form-group"},pl=(0,t._)("label",{class:"form-label"},"Departments",-1),ml=(0,t._)("option",{value:"",selected:""},"Make Selection",-1),vl=["value"],_l={key:0,class:"text-danger"},gl={class:"col-md-12"},wl={class:"form-group"},hl=(0,t._)("label",{class:"form-label"},"Designation",-1),yl={key:0,class:"text-danger"},bl={class:"col-md-12"},fl={class:"form-group"},kl=(0,t._)("label",{class:"form-label"},"Appraisal Type",-1),Dl={key:0,class:"text-danger"};var xl={__name:"InitiateAppraisal",setup(l){const e=(0,s.iH)({}),a=(0,s.iH)({}),S=(0,s.iH)({}),xl=new Date;var zl=xl.getFullYear();const Ml=(0,s.iH)(!1),Cl=(0,s.iH)(!1),Hl=()=>{Ml.value=!1,Cl.value=!1,Sl(),Ul()},Al=(0,s.iH)({title_pid:"",year:zl,month:"",from:"",to:"",note:""}),Sl=()=>{Al.value={title_pid:"",year:zl,month:"",from:"",to:"",note:""}},Vl=l=>{Al.value={title_pid:l.title_pid,year:l.year,month:l.month,from:l.from,to:l.to,note:l.note,pid:l.pid},Ml.value=!0},Zl=(0,s.iH)({apparisal_pid:"",department:"",designations:"",types:""}),Ul=l=>{Zl.value={apparisal_pid:l,department:"",designations:"",types:""}},ql=l=>{Cl.value=!0,Zl.value.apparisal_pid=l},Yl=["January","February","March","April","May","June","July","August","September","October","November","December"];function Tl(){e.value=[],i.Z.dispatch("postMethod",{url:"/create-appraisal-cycle",param:Al.value}).then((l=>{422==l?.status?e.value=l.data:201==l?.status&&(Sl(),Jl())}))}const Nl=l=>{i.Z.dispatch("putMethod",{url:"/lock-appraisal-cycle/"+l,prompt:"Are you sure you want to lock this Appraisal?"}).then((l=>{201==l?.status&&Jl()}))},Kl=l=>{i.Z.dispatch("deleteMethod",{url:"/delete-appraisal-cycle/"+l,prompt:"Are you sure, you want to delete this Appraisal? "}).then((l=>{201==l?.status&&Jl()}))},Ol=(0,s.iH)({});function Fl(){Ol.value=[],i.Z.dispatch("postMethod",{url:"/initiate-appraisal",param:Zl.value}).then((l=>{422==l?.status?Ol.value=l.data:201==l?.status&&(Ul(Zl.value.apparisal_pid),Cl.value=!1)}))}function Jl(l="/load-appraisal-cycle"){i.Z.dispatch("getMethod",{url:l}).then((l=>{a.value=200==l?.status?l.data:{}})).catch((l=>{console.log(l)}))}function jl(){i.Z.dispatch("loadDropdown","appraisal-title").then((({data:l})=>{S.value=l})).catch((l=>{console.log(l)}))}Jl(),Pl();const Ll=(0,s.iH)({});function Pl(){i.Z.dispatch("loadDropdown","departments").then((({data:l})=>{Ll.value=l})).catch((l=>{console.log(l)}))}El();const Wl=(0,s.iH)({});function El(){i.Z.dispatch("loadDropdown","appraisal-types").then((({data:l})=>{Wl.value=l})).catch((l=>{console.log(l)}))}Bl();const Il=(0,s.iH)({});function Bl(){i.Z.dispatch("loadDropdown","designations").then((({data:l})=>{Il.value=l})).catch((l=>{console.log(l)}))}function Rl(l){l.url&&!l.active&&Jl(l.url)}return jl(),(l,i)=>((0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",c,[(0,t._)("div",p,[(0,t._)("div",m,[(0,t._)("div",v,[(0,t._)("div",_,[g,(0,t._)("button",{class:"btn btn-primary btn-sm",onClick:i[0]||(i[0]=l=>Ml.value=!0)},"Configure Appraisal")]),(0,t._)("div",w,[(0,t._)("div",h,[(0,t._)("table",y,[b,a.value.data?((0,t.wg)(),(0,t.iD)("tbody",f,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(a.value.data,((l,e)=>((0,t.wg)(),(0,t.iD)("tr",{key:e},[(0,t._)("td",null,(0,o.zw)(e+1),1),(0,t._)("td",null,(0,o.zw)(l.cycle.title),1),(0,t._)("td",null,(0,o.zw)(l.year),1),(0,t._)("td",null,(0,o.zw)(l.month),1),(0,t._)("td",null,(0,o.zw)(l.start),1),(0,t._)("td",null,(0,o.zw)(l.end),1),(0,t._)("td",null,(0,o.zw)(l.note),1),(0,t._)("td",null,(0,o.zw)(l?.status_name),1),(0,t._)("td",null,[1==l?.status?((0,t.wg)(),(0,t.iD)("div",k,[D,(0,t._)("ul",x,[(0,t._)("li",null,[(0,t._)("a",{class:"dropdown-item pointer bg-primary text-white",onClick:e=>ql(l.pid)},"Map To Staff",8,z)]),(0,t._)("li",null,[(0,t._)("a",{class:"dropdown-item pointer bg-warning",onClick:e=>Vl(l)},"Edit",8,M)]),(0,t._)("li",null,[(0,t._)("a",{class:"dropdown-item pointer bg-info",onClick:e=>Nl(l.pid)},"Lock Appraisal",8,C)]),(0,t._)("li",null,[(0,t._)("a",{class:"dropdown-item pointer bg-danger",onClick:e=>Kl(l.pid)},"Delete",8,H)])])])):(0,t.kq)("",!0)])])))),128))])):((0,t.wg)(),(0,t.iD)("tfoot",A,V))]),(0,t._)("div",Z,[(0,t._)("nav",U,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(a.value.links,((l,e)=>((0,t.wg)(),(0,t.j4)(d.Z,{link:l,key:e,onNext:e=>Rl(l)},null,8,["link","onNext"])))),128))])])])])])])])]),(0,t.Wm)(r.Z,{isOpen:Ml.value,"modal-class":"modal-lg",title:"Configure Appraisal Assessment",onSubmit:Tl,onModalClose:Hl},{content:(0,t.w5)((()=>[(0,t._)("form",q,[(0,t._)("div",Y,[T,(0,t.wy)((0,t._)("select",{class:"form-control form-control-sm","onUpdate:modelValue":i[1]||(i[1]=l=>Al.value.title_pid=l)},[N,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(S.value,(l=>((0,t.wg)(),(0,t.iD)("option",{key:l.pid,value:l.pid},(0,o.zw)(l.title),9,K)))),128))],512),[[n.bM,Al.value.title_pid]]),e.value?.title_pid?((0,t.wg)(),(0,t.iD)("p",O,(0,o.zw)(e.value?.title_pid[0]),1)):(0,t.kq)("",!0)]),(0,t._)("div",F,[(0,t._)("div",J,[(0,t._)("div",j,[L,(0,t.wy)((0,t._)("input",{type:"number","onUpdate:modelValue":i[2]||(i[2]=l=>Al.value.year=l),class:"form-control",placeholder:"e.g 3"},null,512),[[n.nr,Al.value.year]]),e.value?.year?((0,t.wg)(),(0,t.iD)("p",P,(0,o.zw)(e.value?.year[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",W,[(0,t._)("div",E,[I,(0,t.wy)((0,t._)("select",{class:"form-control form-control-sm","onUpdate:modelValue":i[3]||(i[3]=l=>Al.value.month=l)},[B,((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(Yl,((l,e)=>(0,t._)("option",{key:e},(0,o.zw)(l),1))),64))],512),[[n.bM,Al.value.month]]),e.value?.month?((0,t.wg)(),(0,t.iD)("p",R,(0,o.zw)(e.value?.month[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",$,[(0,t._)("div",G,[Q,(0,t.wy)((0,t._)("input",{type:"date","onUpdate:modelValue":i[4]||(i[4]=l=>Al.value.from=l),class:"form-control",placeholder:"e.g 3"},null,512),[[n.nr,Al.value.from]]),e.value?.from?((0,t.wg)(),(0,t.iD)("p",X,(0,o.zw)(e.value?.from[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",ll,[(0,t._)("div",el,[al,(0,t.wy)((0,t._)("input",{type:"date","onUpdate:modelValue":i[5]||(i[5]=l=>Al.value.to=l),class:"form-control",placeholder:"e.g 3"},null,512),[[n.nr,Al.value.to]]),e.value?.to?((0,t.wg)(),(0,t.iD)("p",tl,(0,o.zw)(e.value?.to[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",ol,[(0,t._)("div",nl,[sl,(0,t.wy)((0,t._)("textarea",{type:"text","onUpdate:modelValue":i[6]||(i[6]=l=>Al.value.note=l),class:"form-control",placeholder:"e.g 3"},null,512),[[n.nr,Al.value.note]]),e.value?.note?((0,t.wg)(),(0,t.iD)("p",il,(0,o.zw)(e.value?.note[0]),1)):(0,t.kq)("",!0)])])])])])),_:1},8,["isOpen"]),(0,t.Wm)(r.Z,{isOpen:Cl.value,"modal-class":"modal-sm",title:"KPI Mapping",onSubmit:Fl,onModalClose:Hl},{content:(0,t.w5)((()=>[(0,t._)("form",dl,[(0,t._)("div",rl,[(0,t._)("div",ul,[(0,t._)("div",cl,[pl,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":i[7]||(i[7]=l=>Zl.value.department=l),class:"form-control"},[ml,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(Ll.value,(l=>((0,t.wg)(),(0,t.iD)("option",{key:l.id,value:l.id},(0,o.zw)(l.text),9,vl)))),128))],512),[[n.bM,Zl.value.department]]),Ol.value.department?((0,t.wg)(),(0,t.iD)("p",_l,(0,o.zw)(Ol.value.department[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",gl,[(0,t._)("div",wl,[hl,(0,t._)("div",null,[(0,t.Wm)((0,s.SU)(u.J),{modelValue:Zl.value.designations,"onUpdate:modelValue":i[8]||(i[8]=l=>Zl.value.designations=l),options:Il.value,multiple:!0,"close-on-select":!0,placeholder:"Pick Designation",label:"text","track-by":"id"},null,8,["modelValue","options"])]),Ol.value.designations?((0,t.wg)(),(0,t.iD)("p",yl,(0,o.zw)(Ol.value.designations[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",bl,[(0,t._)("div",fl,[kl,(0,t._)("div",null,[(0,t.Wm)((0,s.SU)(u.J),{modelValue:Zl.value.types,"onUpdate:modelValue":i[9]||(i[9]=l=>Zl.value.types=l),options:Wl.value,multiple:!0,"close-on-select":!0,placeholder:"Pick Type",label:"text","track-by":"id"},null,8,["modelValue","options"])])]),Ol.value.types?((0,t.wg)(),(0,t.iD)("p",Dl,(0,o.zw)(Ol.value.types[0]),1)):(0,t.kq)("",!0)])])])])),_:1},8,["isOpen"])]))}};const zl=xl;var Ml=zl}}]);
//# sourceMappingURL=2302.5036e074.js.map