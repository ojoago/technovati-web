<template>
    <div>
        <div class="container-fluid mt-2">
           <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Staff Onboarding    <router-link to="/staff-list" class="nav-link"><i class="bi bi-arrow-down-left-square-fill"></i></router-link></h5>

                  <!-- Default Tabs -->
                  <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100 active" id="personal-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="true">Personal</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="next-tab" data-bs-toggle="tab" data-bs-target="#next" type="button" role="tab" aria-controls="next" aria-selected="false">Next of Kin</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualification</button>
                    </li>
                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="bank-tab" data-bs-toggle="tab" data-bs-target="#bank" type="button" role="tab" aria-controls="bank" aria-selected="false">Bank Details</button>
                    </li>


                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="work-tab" data-bs-toggle="tab" data-bs-target="#work" type="button" role="tab" aria-controls="work" aria-selected="false">Experience</button>
                    </li>

                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="skill-tab" data-bs-toggle="tab" data-bs-target="#skill" type="button" role="tab" aria-controls="skill" aria-selected="false">Skills</button>
                    </li>

                    <li class="nav-item flex-fill" role="presentation">
                      <button class="nav-link w-100" id="hobby-tab" data-bs-toggle="tab" data-bs-target="#hobby" type="button" role="tab" aria-controls="hobby" aria-selected="false">Hobbies</button>
                    </li>

                  </ul>
                  <div class="tab-content pt-2" id="myTabjustifiedContent">
                    <div class="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                         
                        <bio-data @current-tab="currentTab" :user_pid="user_pid"></bio-data>
                      
                    </div>
                    <div class="tab-pane fade" id="next" role="tabpanel" aria-labelledby="next-tab">
                        <next-kin @current-tab="currentTab" :user_pid="user_pid"></next-kin>
                         
                    </div>

                    <div class="tab-pane fade" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
                        <Qualification @current-tab="currentTab" :user_pid="user_pid" />
                    </div>

                    <div class="tab-pane fade" id="bank" role="tabpanel" aria-labelledby="bank-tab">
                       <BankDetails @current-tab="currentTab" :user_pid="user_pid"/>
                    </div>

                    <div class="tab-pane fade" id="work" role="tabpanel" aria-labelledby="work-tab">
                        <ExperienceForm  @current-tab="currentTab"  />
                    </div>

                    <div class="tab-pane fade" id="skill" role="tabpanel" aria-labelledby="skill-tab">
                        <SkillForm  @current-tab="currentTab"  />
                    </div>

                    <div class="tab-pane fade" id="hobby" role="tabpanel" aria-labelledby="hobby-tab">
                        <HobbieForm  @current-tab="currentTab"  />
                    </div>
                    
                  
                </div>
                  <!-- End  Tabs -->

                </div>
              </div>

        </div>
    </div>
</template>

<script setup>
    
    // import store from "@/store";
    import BioData from "@/components/onboarding/BioData.vue"
    // import PortFolio from "@/components/onboarding/PortFolio.vue"
    import SkillForm from "@/components/onboarding/SkillForm.vue"
    import ExperienceForm from "@/components/onboarding/ExperienceForm.vue"
    import HobbieForm from "@/components/onboarding/HobbieForm.vue"
    import NextKin from "@/components/onboarding/NextKin.vue"
    import Qualification from "@/components/onboarding/QualificationView.vue"
    import BankDetails from "@/components/onboarding/BankDetails.vue"
    import { onMounted, ref } from "vue";
    import { useRouter } from 'vue-router';
    
    // import Select2 from 'vue3-select2-component';

    const router = useRouter()
    let query = {}
    router.push({ query: query })
    // const errors = ref({});
    const user_pid = ref(null);

    const currentTab = ()=>{
      let q = localStorage.getItem('TVATI_ONBOARD_TAB') ? JSON.parse(localStorage.getItem('TVATI_ONBOARD_TAB')) : 'null'
        if(q != 'null'){
            //    var someTabTriggerEl = document.querySelector('#'+q.tab);
            // var tab = new bootstrap.Tab(someTabTriggerEl);
            // tab.show();
            router.push({ query: q })
            let resultsTab = document.getElementById(q.tab);
            user_pid.value = q.id
            //show the results tab:
            resultsTab.click();
        }
       
    }   
    onMounted(() => {
        currentTab()
    })

</script>

<style scoped>

</style>