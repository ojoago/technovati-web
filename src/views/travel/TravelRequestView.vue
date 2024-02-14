<template>
    <div>
        <div class="container my-2">
            
            <div class="card">
                <div class="card-body">
                    <button class="btn btn-sm btn-primary m-2" @click="openModal">Request</button>

                 <div class="table-responsive">
                    <table class="table-hover table-stripped table-bordered table">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>title</th>
                                <th>Department</th>
                                <th>destination</th>
                                <th>from</th>
                                <th>to</th>
                                <th>crew</th>
                                <th>itinerary</th>
                                <th>mode</th>
                                <th> <i class="bi bi-gear-fill"></i> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, loop) in requests?.data" :key="loop">
                            <td>{{ loop + 1 }}</td>
                            <td>{{ data.title }}</td>
                            <td>{{ data.department.department }}</td>
                            <td>{{ data.destination }}</td>
                            <td>{{ data.begin }}</td>
                            <td>{{ data.end }}</td>
                            <td>
                                <span v-for="em in data.crew" :key="em.pid" class="badge bg-dark p-1 m-1">
                                    {{ em.text }}
                                </span>
                            </td>
                            <td>{{ data.itinerary }}</td>
                            <td>{{ data.mode }}</td>
                            <td>
                                <div class="dropdown">
                                    <button type="button" class="btn btn-primary btn-sm dropdown-toggle"
                                        data-bs-toggle="dropdown">
                                        <i class="bi bi-tools"></i>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li ><a class="dropdown-item pointer bg-warning" @click="requestDetail(data)">Details</a> </li>
                                        <li ><a class="dropdown-item pointer bg-warning" @click="editRequest(data)">Edit</a> </li>
                                        <li ><a class="dropdown-item pointer bg-primary" @click="addBudget(data.pid)">Add Budget</a> </li>
                                        <li ><a class="dropdown-item pointer bg-info" @click="addExpense(data.pid)">Add Expense</a> </li>
                                        <li ><a class="dropdown-item pointer bg-danger" @click="deleteShift(data.pid)">Delete</a> </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                     <div class="flex justify-center mt-4">
                        <nav class="relative justify-center rounded-md shadow pagination">
                            <pagination-links v-for="(link, i) of requests.links" :link="link" :key="i" @next="nextPage(link)"></pagination-links>
                        </nav>
                    </div>
                </div>
                </div>
            </div>
            
        </div>

        <o-modal :isOpen="toggleModal" :modal-class="lg" title="Create Shift" @submit="makeRequest" @modal-close="closeModal" >
                <template #content>
                    <form id="requestForm">
                          <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Tittle <span class="text-danger">*</span></label>
                                    <input type="text" v-model="travel.title" class="form-control form-control-sm" placeholder="e.g work shop">
                                    <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }}</p>
                                </div>
                            </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label class="form-label">Destination <span class="text-danger">*</span></label>
                                        <input type="text" v-model="travel.destination" class="form-control form-control-sm">
                                        <p class="text-danger " v-if="errors?.destination">{{ errors?.destination[0] }}
                                        </p>
                                    </div>
                                </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Begin Date</label>
                                    <input type="date" v-model="travel.begin" class="form-control form-control-sm">
                                    <p class="text-danger " v-if="errors?.begin">{{ errors?.begin[0] }}</p>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">End Date<span class="text-danger">*</span></label>
                                    <input type="date" v-model="travel.end" class="form-control form-control-sm">
                                    <p class="text-danger " v-if="errors?.end">{{ errors?.end[0] }}</p>
                                </div>
                            </div>

                             <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="form-label">Items</label>
                                        <textarea  v-model="travel.itinerary" class="form-control form-control-sm"></textarea>
                                        <p class="text-danger " v-if="errors?.itinerary">{{ errors?.itinerary[0] }}</p>
                                    </div>
                                </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Crew Members </label>
                                    <div>
                                        <Multiselect v-model="travel.crew" :options="userDrop" :multiple="true"
                                            :close-on-select="true" placeholder="Pick Crew" label="text"
                                            track-by="id" />
                                    </div>
                                    <p class="text-danger " v-if="errors?.crew">{{ errors?.crew[0] }}</p>
                                </div>
                            </div>
                                                  
                            
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label">Mode of Transpotation<span class="text-danger">*</span></label>
                                    <input type="text" v-model="travel.mode" class="form-control">
                                    <p class="text-danger " v-if="errors?.mode">{{ errors?.mode[0] }}</p>
                                </div>
                            </div>
                           
                     
                        </div>
                    </form>
                </template>
        
        </o-modal>

        <o-modal :isOpen="budgetModal" :modal-class="sm" title="Add Request Budget " @submit="addRequestBudget" @modal-close="closeModal" >
                <template #content>
                    <form id="requestForm">
                        <template v-for="(item, loop) in budget.items" :key="loop">
                                        
                                <fieldset class="border rounded-3 p-2 m-1">
                                    <div class="row">
                                          <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Budget Item <span class="text-danger">*</span></label>
                                                <input type="text" v-model="item.budget" class="form-control form-control-sm" placeholder="e.g feeding">
                                                <!-- <p class="text-danger " v-if="errors?.title">{{ errors?.title[0] }}</p> -->
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Amount <span class="text-danger">*</span></label>
                                                <div class="input-group">
                                                    <input type="number" step="0.1" v-model="item.amount" class="form-control form-control-sm">
                                                    <button type="button" class="btn btn-danger btn-sm" @click="removeQualification(loop)"> <i class="bi bi-patch-minus"></i> </button>
                                                </div>
                                                <!-- <p class="text-danger " v-if="errors?.destination">{{ errors?.destination[0] }}   </p> -->
                                            </div>
                                        </div>
                                    </div>
                                    
                                </fieldset>
                            </template>
                            <div class="float-end p-2">
                                <button type="button" class="btn btn-success btn-sm mt-2" @click="addQualification"> <i class="bi bi-plus"></i> </button>
                            </div>
                           
                    </form>
                </template>
        
        </o-modal>

        <o-modal :isOpen="expenseModal" :modal-class="sm" title="Add Request Expense " @submit="addRequestExpense" @modal-close="closeModal" >
                <template #content>
                    <form id="expenseForm">
                        <!-- <template v-for="(item, loop) in budget.items" :key="loop"> -->
                                        
                                <!-- <fieldset class="border rounded-3 p-2 m-1"> -->
                                    <div class="row">
                                          <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Expense <span class="text-danger">*</span></label>
                                                <input type="text" v-model="expense.expense" class="form-control form-control-sm" placeholder="e.g feeding">
                                                <p class="text-danger " v-if="ex_errors?.expense">{{ ex_errors?.expense[0] }}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Amount <span class="text-danger">*</span></label>
                                                <!-- <div class="input-group"> -->
                                                    <input type="number" step="0.1" v-model="expense.amount" class="form-control form-control-sm">
                                                    <!-- <button type="button" class="btn btn-danger btn-sm" @click="removeExpenseItem(loop)"> <i class="bi bi-patch-minus"></i> </button> -->
                                                <!-- </div> -->
                                                <p class="text-danger " v-if="ex_errors?.amount">{{ ex_errors?.amount[0] }}   </p>
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="form-group">
                                                <label class="form-label">Receipt <span class="text-danger">*</span></label>
                                                <input type="file" class="form-control form-control-sm" id="image" @change="handleImageChange" accept="image/*" required />
                                                <p class="text-danger " v-if="ex_errors?.image">{{ ex_errors?.image[0] }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                <!-- </fieldset> -->
                            <!-- </template> -->

                            <!-- <div class="float-end p-2">
                                <button type="button" class="btn btn-success btn-sm mt-2" @click="addExpenseItem"> <i class="bi bi-plus"></i> </button>
                            </div> -->
                           
                    </form>
                </template>
        
        </o-modal>

    </div>
</template>

<script setup>
import { ref } from "vue";
import OModal from "@/components/OModal.vue";
import store from "@/store";
import { Multiselect } from 'vue-multiselect';
import PaginationLinks from "@/components/PaginationLinks.vue";
import { useRouter } from 'vue-router';

const router = useRouter()
let query = {}
router.push({ query: query })
     
     
const lg = 'modal-lg';
const toggleModal = ref(false)
const openModal = () => {
    toggleModal.value = true;
};


const closeModal = () => {
    toggleModal.value = false;
    budgetModal.value = false;
    expenseModal.value = false;
};

const travel = ref({
    title : '' ,
    dept_pid: '' ,
    destination : '' ,
    begin : '' ,
    end : '' ,
    crew: '' ,
    itinerary : '' ,
    mode : ''
})

function editRequest(data){
    travel.value = {
         title: data.title,
        dept_pid: data.dept_pid,
        destination: data.destination,
        begin: data.begin,
        end: data.end,
        crew: data.crew,
        itinerary: data.itinerary,
        pid: data.pid,
        mode: data.mode
    }
    toggleModal.value = true;

}
const errors = ref({})

function makeRequest(){
    errors.value = []
    store.dispatch('postMethod', { url: '/travel-request', param: travel.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#requestForm');
            form.reset()
            loadRequest()
        }
        store.commit('setSpinner', false)
    })
}
const requests = ref({})
function loadRequest() {
    store.commit('setSpinner', true)
    store.dispatch('getMethod', { url: '/load-request' }).then((data) => {
        if (data.status == 200) {
            requests.value = data.data
        }
        store.commit('setSpinner', false)
    }).catch(e => {
        store.commit('setSpinner', false)
        console.log(e);
    })
}
loadRequest()

function requestDetail(request) {
    localStorage.setItem('TVATI_TRV_RQS_DETAIL', JSON.stringify(request, null, 2))
    router.push({ path: 'travel-request-detail', query: { request: request.pid } })
}

// request budget 
const budget = ref({
    travel_pid : '',
    items : [{
        budget: '',
        amount: '',
    }]
});
const sm = 'modal-sm';
const budgetModal = ref(false)
const addBudget = (pid) =>{
    budget.value.travel_pid = pid;
    budgetModal.value = true ;
}
const addQualification = () => {
    budget.value.items.push({
        budget: '',
        amount: '',
    })
}
const removeQualification = (i) => {
    let len = budget.value.items.length;
    if (len === 1) {
        store.commit('notify', { message: 'One Item is required to proceed ', type: 'warning' })
        return;
    }
    budget.value.items.splice(i, 1);
}

function addRequestBudget(){
     store.dispatch('postMethod', { url: '/add-travel-request-budget', param: budget.value }).then((data) => {
        if (data.status == 422) {
            errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#requestForm');
            form.reset()
            loadRequest()
        }
        store.commit('setSpinner', false)
    })
}


// travel expense 
const expense = ref({
    travel_pid : '',
    expense : '' ,
    amount : '' ,
    image : ''
    // items : [{
    //     item: '',
    //     amount: '',
    // }]
});
// const sm = 'modal-sm';
const expenseModal = ref(false)
const addExpense = (pid) =>{
    expense.value.travel_pid = pid;
    expenseModal.value = true ;
}

// const addExpenseItem = () => {
//     budget.value.items.push({
//         budget: '',
//         amount: '',
//     })
// }
// const removeExpenseItem = (i) => {
//     let len = expense.value.items.length;
//     if (len === 1) {
//         store.commit('notify', { message: 'One Item is required to proceed ', type: 'warning' })
//         return;
//     }
//     expense.value.items.splice(i, 1);
// }
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        var ext = file['name'].substring(file['name'].lastIndexOf('.') + 1);
        if (!['png', 'jpeg', 'jpg'].includes(ext)) {
            event.target.value = null;
            store.commit('notify', { message: 'Only Image is allowed', type: 'warning' })
            return;
        }
        if (file.size > 1024 * 1024) {
            event.target.value = null;
            store.commit('notify', { message: 'Image cannot be more 1MB', type: 'warning' })
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            expense.value.image = reader.result;
        };
        reader.readAsDataURL(file);
    }
}
const ex_errors = ref([]);
function addRequestExpense(){
    ex_errors.value = []
     store.dispatch('postMethod', { url: '/add-travel-request-expense', param: expense.value }).then((data) => {
        if (data.status == 422) {
            ex_errors.value = data.data
        } else if (data.status == 201) {
            let form = document.querySelector('#expenseForm');
            form.reset()
            loadRequest()
        }
        store.commit('setSpinner', false)
    })
}

const userDrop = ref([]);
function dropdownUser() {
    store.dispatch('loadDropdown', 'users').then(({ data }) => {
        userDrop.value = data;
    }).catch(e => {
        console.log(e);
        alert('Something Went Wrong')
    })
}
dropdownUser()

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