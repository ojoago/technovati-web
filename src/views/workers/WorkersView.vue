<template>
    <div>
        <div class="container mt-2">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">Engineering Teams</div>
                        <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                            <li class="nav-item flex-fill" role="presentation">
                                <button class="nav-link w-100 active" id="worker-tab" data-bs-toggle="tab" data-bs-target="#worker" type="button" role="tab" aria-controls="worker" aria-selected="true">Workers</button>
                            </li>
                            <li class="nav-item flex-fill" role="presentation">
                                <button class="nav-link w-100" id="casual-tab" data-bs-toggle="tab" data-bs-target="#casual" type="button" role="tab" aria-controls="casual" aria-selected="false">Add Casual Staff</button>
                            </li>

                            <!-- <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="qualification-tab" data-bs-toggle="tab" data-bs-target="#qualification" type="button" role="tab" aria-controls="qualification" aria-selected="false">Qualification</button>
                            </li>
                            <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="bank-tab" data-bs-toggle="tab" data-bs-target="#bank" type="button" role="tab" aria-controls="bank" aria-selected="false">Bank Details</button>
                            </li> -->

                        </ul>
                       
                        <div class="card-body">
                         <div class="tab-content pt-2" id="myTabjustifiedContent">
                            <div class="tab-pane fade show active" id="worker" role="tabpanel" aria-labelledby="worker-tab">
                                 <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Lists</legend>
                                     <!-- <button type="button" class="btn btn-success btn-sm m-1">Add Casual Staff</button> -->
                                    <button type="button" class="btn btn-success btn-sm m-1">Add Full time Staff</button>
                                
                                    <form>
                                            <div class="col-md-12">
                                                <label class="form-label">Departments</label>
                                                <Select2 :options="deptDrop"  />
                                                <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }} </p>
                                            </div>

                                            <div class="col-md-12">
                                                <label class="form-label">Staff</label>
                                                <Select2 v-model="team.user_pid" :options="userDrop"  />
                                                <p class="text-danger " v-if="errors?.user_pid">{{ errors?.title[0] }} </p>
                                            </div>
                                            <div class="col-md-12">
                                                <label class="form-label">Team</label>
                                                <Select2 v-model="team.term_pid" :options="teamDrop"  />
                                                <p class="text-danger " v-if="errors?.term_pid">{{ errors?.title[0] }} </p>
                                            </div>
                                    
                                            <button type="button" class="btn btn-success btn-sm mt-2"
                                                @click="addStaff">Submit</button>
                                        </form>

                                    <div class="table-responsive">
                                        <table class="table-hover table-stripped table-bordered table">
                                            <thead>
                                                <tr>
                                                    <th>SN</th>
                                                    <th>Phone Number</th>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>Type</th>
                                                    <th>Team</th>
                                                    <th>Image</th>
                                                    <th> <i class="bi bi-pencil-fill"></i> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(data, loop) in worker.data" :key="loop">
                                                    <td>{{ loop + 1 }}</td>
                                                    <td>{{ data.type == 1 ? data.staff.gsm : data.casual.gsm }}</td>
                                                    <td>{{ data.type == 1 ? data.staff.username : data.casual.username }}</td>
                                                    <td>{{ data.type == 1 ? data.staff.email : data.casual.email }}</td>
                                                    <td>{{ data.cat }}</td>
                                                    <td>{{ data.team }}</td>
                                                    <td>{{ data.team }}</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                                                data-bs-toggle="dropdown">
                                                                <i class="bi bi-tools"></i>
                                                            </button>
                                                            <ul class="dropdown-menu">
                                                                <li class="bg-warning" v-if="data.type == 2"><a class="dropdown-item pointer" @click="editAnnounce(data)">Edit</a> </li>
                                                                <li class="bg-danger" v-if="data.type == 2"><a class="dropdown-item pointer" @click="deleteAnnounce(data.pid)">Delete</a> </li>
                                                                <li class="bg-primary"><a class="dropdown-item pointer" >Asign Team</a> </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="flex justify-center mt-4">
                                            <nav class="relative justify-center rounded-md shadow pagination">
                                                <pagination-links v-for="(link, i) of worker.links" :link="link" :key="i"
                                                    @next="nextPage(link)"></pagination-links>
                                            </nav>
                                        </div>
                                    </div>
                                </fieldset>
                      
                            </div>
                            <div class="tab-pane fade" id="casual" role="tabpanel" aria-labelledby="casual-tab">
                                 <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Add Casual Workers</legend>
                                     <form  id="casualForm">
                               <div class="row">
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Firstname <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="staff.firstname" class="form-control form-control-sm" placeholder="e.g Aminu">
                                                    <p class="text-danger " v-if="errors?.firstname">{{ errors?.firstname[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Lastname <span class="text-danger">*</span></label>
                                                    <input type="text" v-model="staff.lastname" class="form-control form-control-sm" placeholder="e.g Sanusi ">
                                                    <p class="text-danger " v-if="errors?.lastname">{{ errors?.lastname[0] }}</p>
                                                </div>
                                            </div>
                                            <div class="col-md-4">
                                                <div class="form-group">
                                                    <label class="form-label">Othername</label>
                                                    <input type="text" v-model="staff.othername" class="form-control form-control-sm" placeholder="null">
                                                    <p class="text-danger " v-if="errors?.othername">{{ errors?.othername[0] }}</p>
                                                </div>
                                            </div>
                                        </div>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Email <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="staff.email" class="form-control form-control-sm" placeholder="e.g aminu@technovati.com.ng">
                                                        <p class="text-danger " v-if="errors?.email">{{ errors?.email[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Username</label>
                                                        <input type="text" v-model="staff.username" class="form-control form-control-sm" placeholder="e.g musa.isah ">
                                                        <p class="text-danger " v-if="errors?.username">{{ errors?.username[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Phone Number <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="staff.gsm" maxlength="11" class="form-control form-control-sm" placeholder="e.g 080xxxxxxxx">
                                                        <p class="text-danger " v-if="errors?.gsm">{{ errors?.gsm[0] }}</p>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">gender <span class="text-danger">*</span></label>
                                                        <select v-model="staff.gender" class="form-control form-control-sm">
                                                            <option value="" selected>Select Gender</option>
                                                            <option>Female</option>
                                                            <option>Male</option>
                                                        </select>
                                                        <!-- <input type="text" v-model="staff.gender" class="form-control" placeholder="e.g aminu@technovati.com.ng"> -->
                                                        <p class="text-danger " v-if="errors?.gender">{{ errors?.gender[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">religion <span class="text-danger">*</span></label>
                                                        <select v-model="staff.religion" class="form-control form-control-sm">
                                                                <option value="" selected>Select Status</option>
                                                                <option>Muslim</option>
                                                                <option>Christian</option>
                                                                <option>Other</option>
                                                            </select>
                                                        <p class="text-danger " v-if="errors?.religion">{{ errors?.religion[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">marital status <span class="text-danger">*</span></label>
                                                        <select v-model="staff.marital_status" class="form-control form-control-sm">
                                                            <option value="" selected>Select Status</option>
                                                            <option>Single</option>
                                                            <option>Married</option>
                                                            <option>Separated</option>
                                                            <option>Divorce</option>
                                                        </select>
                                                        <!-- <input type="text" v-model="staff.marital_status" class="form-control" placeholder="e.g 080xxxxxxxx"> -->
                                                        <p class="text-danger " v-if="errors?.marital_status">{{ errors?.marital_status[0] }}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Date Of Birth <span class="text-danger">*</span></label>
                                                        <input type="date" v-model="staff.dob" class="form-control form-control-sm" placeholder="e.g aminu@technovati.com.ng">
                                                        <p class="text-danger " v-if="errors?.dob">{{ errors?.dob[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">Place of Birth</label>
                                                        <input type="text" v-model="staff.pob" class="form-control form-control-sm" placeholder="e.g Jos North ">
                                                        <p class="text-danger " v-if="errors?.pob">{{ errors?.pob[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">state of origin <span class="text-danger">*</span></label>
                                                        <!-- <input type="text" v-model="staff.state_of_origin" class="form-control" placeholder="e.g 080xxxxxxxx"> -->
                                                        <Select2  v-model="staff.state_of_origin"  :options="stateDrop" :settings="{ width: '100%' }"  />
                                                        <p class="text-danger " v-if="errors?.state_of_origin">{{ errors?.state_of_origin[0] }}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">lga of origin <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="staff.lga_of_origin" class="form-control form-control-sm" placeholder="e.g aminu@technovati.com.ng">
                                                        <p class="text-danger " v-if="errors?.lga_of_origin">{{ errors?.lga_of_origin[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">state of residence <span class="text-danger">*</span></label>
                                                        <Select2  v-model="staff.state_of_residence"  :options="stateDrop" :settings="{ width: '100%' }"  />
                                                            <!-- <input type="text" v-model="staff.state_of_residence" class="form-control" placeholder="e.g musa.isah "> -->
                                                        <p class="text-danger " v-if="errors?.state_of_residence">{{ errors?.state_of_residence[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="form-group">
                                                        <label class="form-label">lga of residence <span class="text-danger">*</span></label>
                                                        <input type="text" v-model="staff.lga_of_residence" class="form-control form-control-sm" placeholder="e.g zaria road">
                                                        <p class="text-danger " v-if="errors?.lga_of_residence">{{ errors?.lga_of_residence[0] }}</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-12">
                                                    <div class="form-group">
                                                        <label class="form-label">address <span class="text-danger">*</span> </label>
                                                        <textarea type="text" v-model="staff.address" class="form-control form-control-sm" placeholder="e.g Zaria road"></textarea>
                                                        <p class="text-danger " v-if="errors?.address">{{ errors?.address[0] }}</p>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label class="form-label">Image <span class="text-danger">*</span> </label>
                                                        <input type="file" class="form-control form-control-sm" @change="addImage">
                                                        <p class="text-danger " v-if="errors?.image">{{ errors?.image[0] }}</p>
                                                    </div>
                                                </div>
                                                 <div class="col-md-6">
                                                    <label class="form-label">Team</label>
                                                    <Select2 v-model="staff.term_pid" :options="teamDrop" :settings="{width:'100%'}"  />
                                                    <p class="text-danger " v-if="errors?.term_pid">{{ errors?.title[0] }} </p>
                                                </div>
                                            </div>
                                            <button type="button" class="btn btn-success btn-sm mt-2" @click="createCasualStaff">Submit</button>
                                        </form>      
                                </fieldset>
                            </div>

                            <div class="tab-pane fade" id="qualification" role="tabpanel" aria-labelledby="qualification-tab">
                               <fieldset class="border rounded-3 p-2 m-1">
                                    <legend class="float-none w-auto px-2">Qualification</legend>
                              
                                </fieldset>
                            </div>

                            <div class="tab-pane fade" id="bank" role="tabpanel" aria-labelledby="bank-tab">
                               <fieldset class="border rounded-3 p-2 m-1">
                                            <legend class="float-none w-auto px-2">Bank</legend>
                                      
                                        </fieldset>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
    import Select2 from 'vue3-select2-component';
    import store from "@/store";
    import { ref } from "vue";
    import PaginationLinks from "@/components/PaginationLinks.vue";

const errors = ref({});
const user_pid = ref(null);

const staff = ref({
    'email': '',
    'username': '',
    'gsm': '',
    'group': '',
    'firstname': '',
    'othername': '',
    'marital_status': '',
    'gender': '',
    'religion': '',
    'pob': '',
    'dob': '',
    'state_of_origin': '' ,
    'lga_of_origin': '' ,
    'state_of_residence': '' ,
    'lga_of_residence': '' ,
    'address': '' ,
    'term_pid': '' ,
    image : null ,
    'user_pid': user_pid,
});

const addImage = (file) => {
    // staff.value.image = file.target.files[0];
    if (file.target.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
            //@ts-ignore
            staff.value.image = e?.target.result;
        }
        // reader.readAsDataURL(input.files[0]);
        // setOpen(true)
    }
}

function createCasualStaff() {
    store.commit('setSpinner', true)
    errors.value = []
    // let data = new FormData;
    const  header = { "Content-Type": "multipart/form-data" };
    store.dispatch('postMethod', { url: '/create-casual-staff', param: staff.value,header:header }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#casualForm');
            form.reset();
            // staff.value = [];
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })

}

const team = ref({
    user_pid: '' , 
    team_pid : '' ,
})

function addStaff() {
    store.commit('setSpinner', true)
    errors.value = []
    // let data = new FormData;
    // const  header = { "Content-Type": "multipart/form-data" };
    store.dispatch('postMethod', { url: '/add-staff-to-team', param: team.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#casualForm');
            form.reset();
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })

}

const worker = ref({});





loadWorker()
function loadWorker() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-workers' }).then((data) => {
        store.commit('setSpinner', false)
        if (data.status == 200) {
            worker.value = data.data;
        }
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
        alert('weting be this')
    })
}

const userDrop = ref({});
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

const deptDrop = ref({});
function dropdownDept() {
    store.dispatch('loadDropdown', 'departments').then(({ data }) => {
        deptDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownDept()

const stateDrop = ref({});
function dropDOwnState() {
    store.dispatch('loadDropdown', 'state').then(({ data }) => {
        stateDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropDOwnState()

const teamDrop = ref({});
function dropDownTeam() {
    store.dispatch('loadDropdown', 'team').then(({ data }) => {
        teamDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropDownTeam()

function nextPage(link) {
    alert()
    if (!link.url || link.active) {
        return;
    }
    alert(link.url)
}

</script>

<style scoped>

</style>