"use strict";(self["webpackChunkTechnovati"]=self["webpackChunkTechnovati"]||[]).push([[5931],{1187:function(e,l,a){a.d(l,{Z:function(){return n}});var t=a(3396);const o=["disabled","innerHTML"];var d={__name:"PaginationLinks",props:{link:Object},emits:["next"],setup(e){return(l,a)=>((0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("li",{class:"page-item",onClick:a[0]||(a[0]=a=>l.$emit("next",e.link))},[(0,t._)("span",{class:"page-link pointer",href:"#",disabled:!e.link.url,innerHTML:e.link.label},null,8,o)])]))}};const s=d;var n=s},5931:function(e,l,a){a.r(l),a.d(l,{default:function(){return nl}});var t=a(3396),o=a(7139),d=a(4870),s=a(9242),n=a(1187),u=a(2191),i=a(6204),r=a(6368),c=a(6091);const p={class:"container mt-2"},v={class:"card"},_={class:"card-header"},m=(0,t._)("h3",{class:"mx-4"},"Unit Deductions",-1),g={class:"card-body"},w={class:"table-responsive"},f={class:"table-hover table-stripped table-bordered table"},b=(0,t._)("thead",null,[(0,t._)("tr",null,[(0,t._)("th",null,"SN"),(0,t._)("th",null,"Deduction"),(0,t._)("th",null,"Amount"),(0,t._)("th",null," Level"),(0,t._)("th",null," Value Type"),(0,t._)("th",null,"Method"),(0,t._)("th",null,[(0,t._)("i",{class:"bi bi-gear-fill"})])])],-1),y={class:"dropdown"},k=(0,t._)("button",{type:"button",class:"btn btn-primary btn-sm dropdown-toggle","data-bs-toggle":"dropdown"},[(0,t._)("i",{class:"bi bi-tools"})],-1),h={class:"dropdown-menu"},D=["onClick"],x=["onClick"],V={class:"flex justify-center mt-4"},S={class:"relative justify-center rounded-md shadow pagination"},z={id:"deductionForm"},U={class:"row"},q={class:"col-md-4"},H={class:"form-group"},M=(0,t._)("label",{class:"form-label"},"Name",-1),Z={key:0,class:"text-danger"},C={class:"col-md-4"},P={class:"form-group"},E=(0,t._)("label",{class:"form-label"},"Level",-1),L=(0,t._)("option",{value:"",selected:""},"Select Level",-1),T=(0,t._)("option",{value:"1"}," Department ",-1),N=(0,t._)("option",{value:"2"}," Designation ",-1),W=(0,t._)("option",{value:"3"}," Employee ",-1),K=(0,t._)("option",{value:"4"}," Grade ",-1),Y=(0,t._)("option",{value:"5"}," Structure ",-1),j=[L,T,N,W,K,Y],A={key:0,class:"text-danger"},G={class:"col-md-4"},J={class:"form-group"},O=(0,t._)("label",{class:"form-label"},"Value Type",-1),F=(0,t._)("option",{value:"",selected:""},"Select Type",-1),I=(0,t._)("option",{value:"1"},"Fixed",-1),R=(0,t._)("option",{value:"2"},"Percentage of basic",-1),$=[F,I,R],B={key:0,class:"text-danger"},Q={class:"col-md-8"},X={class:"form-group"},ee=(0,t._)("label",{class:"form-label"},"Amount",-1),le={key:0,class:"text-danger"},ae={class:"col-md-4"},te={class:"form-group"},oe=(0,t._)("label",{class:"form-label"},"Method",-1),de=(0,t._)("option",{value:"",selected:""},"Select Method",-1),se=(0,t._)("option",{value:"1"},"PERIODIC",-1),ne=(0,t._)("option",{value:"2"},"GENERAL",-1),ue=[de,se,ne],ie={key:0,class:"text-danger"},re={key:0},ce={class:"col-md-12"},pe={class:"form-group"},ve=(0,t._)("label",{class:"form-label"},"Department",-1),_e={key:0,class:"text-danger"},me={key:1},ge={class:"col-md-12"},we={class:"form-group"},fe=(0,t._)("label",{class:"form-label"},"Designation",-1),be={key:0,class:"text-danger"},ye={key:2},ke={class:"col-md-12"},he={class:"form-group"},De=(0,t._)("label",{class:"form-label"},"Employee",-1),xe={key:0,class:"text-danger"},Ve={key:3},Se={class:"row"},ze={class:"col-md-4"},Ue={class:"form-group"},qe=(0,t._)("label",{class:"form-label"},"Salary Structure",-1),He=(0,t._)("option",{value:"",selected:""},"Select Structure",-1),Me=["value"],Ze={key:0,class:"text-danger"},Ce={class:"col-md-4"},Pe={class:"form-group"},Ee=(0,t._)("label",{class:"form-label"},"Salary Grade",-1),Le=(0,t._)("option",{value:"",selected:""},"Select Grade",-1),Te=["value"],Ne={key:0,class:"text-danger"},We={class:"col-md-4"},Ke={class:"form-group"},Ye=(0,t._)("label",{class:"form-label"},"Salary Step",-1),je=(0,t._)("option",{value:"",selected:""},"Select Step",-1),Ae={key:0,class:"text-danger"},Ge={key:4},Je={class:"col-md-12"},Oe={class:"form-group"},Fe=(0,t._)("label",{class:"form-label"},"Structure ",-1),Ie={key:0,class:"text-danger"},Re={key:5},$e={class:"row"},Be={class:"col-md-6"},Qe={class:"form-group"},Xe=(0,t._)("label",{class:"form-label"},"Start Period ",-1),el={key:0,class:"text-danger"},ll={class:"col-md-6"},al={class:"form-group"},tl=(0,t._)("label",{class:"form-label"},"End Period ",-1),ol={key:0,class:"text-danger"};var dl={__name:"UnitDeductionView",setup(e){const l=(0,d.iH)(!1),a=()=>{l.value=!1,W()},L=(0,d.iH)({}),T=(0,d.iH)({deduction_pid:"",level:"",value_type:"",amount:"",method:"",period_from:"",period_to:"",departments:[],structures:[],employees:[],designations:[],grade_grade_pid:"",grade_structure_pid:"",grade_step:""}),N=e=>{T.value={deduction_pid:e.deduction_pid,level:e.level,value_type:e.value_type,amount:e.amount,method:e.method,period_from:e.period.from,period_to:e.period.to,departments:e.departments,structures:e.structures,employees:e.employees,designations:e.designations,grade_grade_pid:e.grade_grade_pid,grade_structure_pid:e.grade_structure_pid,grade_step:e.grade_step,pid:e.pid},l.value=!0},W=()=>{T.value={deduction_pid:"",level:"",value_type:"",amount:"",method:"",period_from:"",period_to:"",departments:[],structures:[],employees:[],designations:[],grade_grade_pid:"",grade_structure_pid:"",grade_step:""}};function K(){L.value=[],u.Z.dispatch("postMethod",{url:"/create-unit-deduction",param:T.value}).then((e=>{422==e?.status?L.value=e.data:201==e?.status&&(I(),a())})).catch((e=>{console.log(e)}))}function Y(e){u.Z.dispatch("deleteMethod",{url:"/delete-unit-deduction/"+e}).then((e=>{201==e?.status&&I()})).catch((e=>{console.log(e)}))}const F=(0,d.iH)({});function I(e="/load-unit-deductions"){u.Z.dispatch("getMethod",{url:e}).then((e=>{F.value=200==e?.status?e.data:{}})).catch((e=>{console.log(e)}))}I();const R=(0,d.iH)([]);function de(){u.Z.dispatch("loadDropdown","deduction-names").then((({data:e})=>{R.value=e})).catch((e=>{console.log(e)}))}de();const se=(0,d.iH)([]);function ne(){u.Z.dispatch("loadDropdown","departments").then((({data:e})=>{se.value=e})).catch((e=>{console.log(e)}))}ne();const dl=(0,d.iH)([]);function sl(){u.Z.dispatch("loadDropdown","designations").then((({data:e})=>{dl.value=e})).catch((e=>{console.log(e)}))}sl();const nl=(0,d.iH)([]);function ul(){u.Z.dispatch("loadDropdown","users").then((({data:e})=>{nl.value=e})).catch((e=>{console.log(e)}))}ul();const il=(0,d.iH)([]);function rl(){u.Z.dispatch("loadDropdown","salary-structure").then((({data:e})=>{il.value=e})).catch((e=>{console.log(e)}))}rl();const cl=(0,d.iH)([]);function pl(e){u.Z.dispatch("loadDropdown","salary-grade/"+e.target.value).then((e=>{200==e?.status&&(cl.value=e.data)})).catch((e=>{console.log(e)}))}function vl(e){e.url&&!e.active&&I(e.url)}return(e,u)=>((0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",p,[(0,t._)("div",v,[(0,t._)("div",_,[m,(0,t._)("button",{class:"btn btn-sm btn-primary",onClick:u[0]||(u[0]=e=>l.value=!0)},"Add New")]),(0,t._)("div",g,[(0,t._)("div",w,[(0,t._)("table",f,[b,(0,t._)("tbody",null,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(F.value.data,((e,l)=>((0,t.wg)(),(0,t.iD)("tr",{key:l},[(0,t._)("td",null,(0,o.zw)(l+1),1),(0,t._)("td",null,(0,o.zw)(e.deduction.name),1),(0,t._)("td",null,(0,o.zw)(e.total),1),(0,t._)("td",null,(0,o.zw)(e.levels),1),(0,t._)("td",null,(0,o.zw)(e.type),1),(0,t._)("td",null,(0,o.zw)(e.methods),1),(0,t._)("td",null,[(0,t._)("div",y,[k,(0,t._)("ul",h,[(0,t._)("li",null,[(0,t._)("a",{class:"dropdown-item pointer bg-warning",onClick:l=>N(e)},"Edit",8,D)]),(0,t._)("li",null,[(0,t._)("a",{class:"dropdown-item pointer bg-danger",onClick:l=>Y(e.pid)},"Delete",8,x)])])])])])))),128))])]),(0,t._)("div",V,[(0,t._)("nav",S,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(F.value.links,((e,l)=>((0,t.wg)(),(0,t.j4)(n.Z,{link:e,key:l,onNext:l=>vl(e)},null,8,["link","onNext"])))),128))])])])])])]),(0,t.Wm)(c.Z,{isOpen:l.value,onSubmit:K,"modal-class":"modal-xl",title:"Unit Deduction",onModalClose:a},{content:(0,t.w5)((()=>[(0,t._)("div",null,[(0,t._)("form",z,[(0,t._)("div",U,[(0,t._)("div",q,[(0,t._)("div",H,[M,(0,t.Wm)((0,d.SU)(i.Z),{modelValue:T.value.deduction_pid,"onUpdate:modelValue":u[1]||(u[1]=e=>T.value.deduction_pid=e),options:R.value,settings:{width:"100%"}},null,8,["modelValue","options"]),L.value?.deduction_pid?((0,t.wg)(),(0,t.iD)("p",Z,(0,o.zw)(L.value?.deduction_pid[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",C,[(0,t._)("div",P,[E,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":u[2]||(u[2]=e=>T.value.level=e),class:"form-control"},j,512),[[s.bM,T.value.level]]),L.value?.level?((0,t.wg)(),(0,t.iD)("p",A,(0,o.zw)(L.value?.level[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",G,[(0,t._)("div",J,[O,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":u[3]||(u[3]=e=>T.value.value_type=e),class:"form-control"},$,512),[[s.bM,T.value.value_type]]),L.value?.value_type?((0,t.wg)(),(0,t.iD)("p",B,(0,o.zw)(L.value?.value_type[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",Q,[(0,t._)("div",X,[ee,(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":u[4]||(u[4]=e=>T.value.amount=e),type:"number",placeholder:"e.g 3000.5",class:"form-control"},null,512),[[s.nr,T.value.amount]]),L.value?.amount?((0,t.wg)(),(0,t.iD)("p",le,(0,o.zw)(L.value?.amount[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",ae,[(0,t._)("div",te,[oe,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":u[5]||(u[5]=e=>T.value.method=e),class:"form-control"},ue,512),[[s.bM,T.value.method]]),L.value?.method?((0,t.wg)(),(0,t.iD)("p",ie,(0,o.zw)(L.value?.method[0]),1)):(0,t.kq)("",!0)])]),1==T.value.level?((0,t.wg)(),(0,t.iD)("fieldset",re,[(0,t._)("div",ce,[(0,t._)("div",pe,[ve,(0,t._)("div",null,[(0,t.Wm)((0,d.SU)(r.J),{modelValue:T.value.departments,"onUpdate:modelValue":u[6]||(u[6]=e=>T.value.departments=e),options:se.value,multiple:!0,"close-on-select":!0,placeholder:"Pick department",label:"text","track-by":"id"},null,8,["modelValue","options"])]),L.value?.departments?((0,t.wg)(),(0,t.iD)("p",_e,(0,o.zw)(L.value?.departments[0]),1)):(0,t.kq)("",!0)])])])):(0,t.kq)("",!0),2==T.value.level?((0,t.wg)(),(0,t.iD)("fieldset",me,[(0,t._)("div",ge,[(0,t._)("div",we,[fe,(0,t._)("div",null,[(0,t.Wm)((0,d.SU)(r.J),{modelValue:T.value.designations,"onUpdate:modelValue":u[7]||(u[7]=e=>T.value.designations=e),options:dl.value,multiple:!0,"close-on-select":!0,placeholder:"Pick Designation",label:"text","track-by":"id"},null,8,["modelValue","options"])]),L.value?.designations?((0,t.wg)(),(0,t.iD)("p",be,(0,o.zw)(L.value?.designations[0]),1)):(0,t.kq)("",!0)])])])):(0,t.kq)("",!0),3==T.value.level?((0,t.wg)(),(0,t.iD)("fieldset",ye,[(0,t._)("div",ke,[(0,t._)("div",he,[De,(0,t._)("div",null,[(0,t.Wm)((0,d.SU)(r.J),{modelValue:T.value.employees,"onUpdate:modelValue":u[8]||(u[8]=e=>T.value.employees=e),options:nl.value,multiple:!0,"close-on-select":!0,placeholder:"Pick staff",label:"text","track-by":"id"},null,8,["modelValue","options"])]),L.value?.employees?((0,t.wg)(),(0,t.iD)("p",xe,(0,o.zw)(L.value?.employees[0]),1)):(0,t.kq)("",!0)])])])):(0,t.kq)("",!0),4==T.value.level?((0,t.wg)(),(0,t.iD)("fieldset",Ve,[(0,t._)("div",Se,[(0,t._)("div",ze,[(0,t._)("div",Ue,[qe,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":u[9]||(u[9]=e=>T.value.grade_structure_pid=e),class:"form-control",onChange:u[10]||(u[10]=e=>pl(e))},[He,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(il.value,(e=>((0,t.wg)(),(0,t.iD)("option",{key:e.id,value:e.id},(0,o.zw)(e.text),9,Me)))),128))],544),[[s.bM,T.value.grade_structure_pid]]),L.value?.grade_structure_pid?((0,t.wg)(),(0,t.iD)("p",Ze,(0,o.zw)(L.value?.grade_structure_pid[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",Ce,[(0,t._)("div",Pe,[Ee,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":u[11]||(u[11]=e=>T.value.grade_grade_pid=e),class:"form-control",onChange:u[12]||(u[12]=e=>pl(e))},[Le,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(cl.value,(e=>((0,t.wg)(),(0,t.iD)("option",{key:e.id,value:e.id},(0,o.zw)(e.text),9,Te)))),128))],544),[[s.bM,T.value.grade_grade_pid]]),L.value?.grade_grade_pid?((0,t.wg)(),(0,t.iD)("p",Ne,(0,o.zw)(L.value?.grade_grade_pid[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",We,[(0,t._)("div",Ke,[Ye,(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":u[13]||(u[13]=e=>T.value.grade_step=e),multiple:"",class:"form-control"},[je,((0,t.wg)(),(0,t.iD)(t.HY,null,(0,t.Ko)(15,((e=1)=>(0,t._)("option",{key:e,value:"{{i}}"},"Step "+(0,o.zw)(e),1))),64))],512),[[s.bM,T.value.grade_step]]),L.value?.grade_step?((0,t.wg)(),(0,t.iD)("p",Ae,(0,o.zw)(L.value?.grade_step[0]),1)):(0,t.kq)("",!0)])])])])):(0,t.kq)("",!0),5==T.value.level?((0,t.wg)(),(0,t.iD)("fieldset",Ge,[(0,t._)("div",Je,[(0,t._)("div",Oe,[Fe,(0,t._)("div",null,[(0,t.Wm)((0,d.SU)(r.J),{modelValue:T.value.structures,"onUpdate:modelValue":u[14]||(u[14]=e=>T.value.structures=e),options:il.value,multiple:!0,"close-on-select":!0,placeholder:"Pick Salary Structure",label:"text","track-by":"id"},null,8,["modelValue","options"])]),L.value?.structures?((0,t.wg)(),(0,t.iD)("p",Ie,(0,o.zw)(L.value?.structures[0]),1)):(0,t.kq)("",!0)])])])):(0,t.kq)("",!0),1==T.value.method?((0,t.wg)(),(0,t.iD)("fieldset",Re,[(0,t._)("div",$e,[(0,t._)("div",Be,[(0,t._)("div",Qe,[Xe,(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":u[15]||(u[15]=e=>T.value.period_from=e),type:"date",class:"form-control"},null,512),[[s.nr,T.value.period_from]]),L.value?.period_from?((0,t.wg)(),(0,t.iD)("p",el,(0,o.zw)(L.value?.period_from[0]),1)):(0,t.kq)("",!0)])]),(0,t._)("div",ll,[(0,t._)("div",al,[tl,(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":u[16]||(u[16]=e=>T.value.period_to=e),type:"date",class:"form-control"},null,512),[[s.nr,T.value.period_to]]),L.value?.period_to?((0,t.wg)(),(0,t.iD)("p",ol,(0,o.zw)(L.value?.period_to[0]),1)):(0,t.kq)("",!0)])])])])):(0,t.kq)("",!0)])])])])),_:1},8,["isOpen"])]))}};const sl=dl;var nl=sl}}]);
//# sourceMappingURL=5931.7a74e617.js.map