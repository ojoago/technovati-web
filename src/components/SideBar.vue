<template>
    <div class="sidebar " id="sidebar">

        <ul class="nav-links">

            <li>
                <a>
                    <i class="bi bi-grid"></i>
                    <span class="link-name pointer" @click="goToDashboard">
                        <!-- <router-link to="/dashboard" class="nav-link"> -->
                        <span class="nav-name">Dashboard </span>
                        <!-- </router-link> -->
                    </span>
                </a>
            </li>

            <div v-if="activeRole == 'md'">
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/view-schedule" class="nav-link"><span class="nav-name">Schedule</span>
                                </router-link>
                            </span>
                        </a>
                        <!-- <i class="bi bi-chevron-right arrow"></i> -->
                    </div>
                </li>
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/view-log" class="nav-link"><span class="nav-name">Visitors</span>
                                </router-link>
                            </span>
                        </a>
                        <!-- <i class="bi bi-chevron-right arrow"></i> -->
                    </div>
                </li>


            </div>

            <!-- end receptionist -->

            <div v-if="activeRole == 'receptionist'">
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-stack"></i>
                            <span class="link-name">
                                <router-link to="/schedule" class="nav-link"><span
                                        class="nav-name">Schedule</span></router-link>
                            </span>
                        </a>
                    </div>
                </li>
                <!-- begin log  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#log"
                        aria-expanded="true" arai-controls="log">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">Log</span>
                        </div>
                    </a>
                    <ul id="log" class="submenu sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="Log">
                            <router-link to="/log" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">New </span> </router-link>
                        </li>
                        <li class="nav-item" title="Records">
                            <router-link to="/visitor-out-time" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Records</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- end log  -->

            </div>
            <!-- end receptionist -->

            <!-- engineering team begin here  -->
            <div v-if="activeRole == 'head_engineer' || activeRole == 'engineer_supervisor'">

                <li v-if="activeRole == 'head_engineer'">
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#team"
                        aria-expanded="true" arai-controls="team">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">Teams</span>
                        </div>
                    </a>
                    <ul id="team" class="submenu sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="team">
                            <router-link to="/workers" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Workers </span> </router-link>
                        </li>

                        <li class="nav-item" title="Records">
                            <router-link to="/team" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Team</span> </router-link>
                        </li>
                        <li class="nav-item" title="Records">
                            <router-link to="/tools" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Tools</span> </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#records"
                        aria-expanded="true" arai-controls="records">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">Records</span>
                        </div>
                    </a>
                    <ul id="records" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">

                        <li class="nav-item" title="team">
                            <router-link to="/daily-record" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Daily Records </span> </router-link>
                        </li>

                        <li class="nav-item" title="Records">
                            <router-link to="/work-sheet" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Work Sheet</span> </router-link>
                        </li>

                        <li class="nav-item" title="Records">
                            <router-link to="/staff-record" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Staff Records</span> </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse"
                        data-bs-target="#en_mat_req" aria-expanded="true" arai-controls="en_mat_req">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">Material Request</span>
                        </div>
                    </a>
                    <ul id="en_mat_req" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">

                        <li class="nav-item" title="team">
                            <router-link to="/material-request" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">New Request </span> </router-link>
                        </li>

                        <li class="nav-item" title="Records">
                            <router-link to="/my-raw-material-request" class="nav-link"><i class="bi bi-record"></i>
                                <span class="nav-name">My Request</span> </router-link>
                        </li>

                    </ul>
                </li>

            </div>
            <!-- engineering team end here -->


            <!-- end receptionist -->

            <div v-if="activeRole == 'logistics'">

                <!-- begin log  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#logistics"
                        aria-expanded="true" arai-controls="logistics">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">Logistics</span>
                        </div>
                    </a>
                    <ul id="logistics" class="submenu sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar">
                        <li class="nav-item" title="Records">
                            <router-link to="/vehicle" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Vehicle</span> </router-link>
                        </li>

                        <li class="nav-item" title="Records">
                            <router-link to="/driver" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Driver</span> </router-link>
                        </li>
                        <li class="nav-item" title="Records">
                            <router-link to="/driver" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Delivery</span> </router-link>
                        </li>

                    </ul>
                </li>
                <!-- end log  -->
            </div>

            <!-- end receptionist -->
            <div v-if="activeRole == 'hr'">
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-stack"></i>
                            <span class="link-name">
                                <router-link to="/department" class="nav-link"><span
                                        class="nav-name">Department</span></router-link>
                            </span>
                        </a>
                    </div>
                </li>
                <!-- begin log  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#staff"
                        aria-expanded="true" arai-controls="staff">
                        <i class="bi bi-people"></i>
                        <div class="icon-link">
                            <span class="link-name">Staff</span>
                        </div>
                    </a>
                    <ul id="staff" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/staff" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Create Staff </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff list">
                            <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Staff List</span> </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a>
                        <i class="bi bi-house-fill"></i>
                        <span class="link-name">
                            <router-link to="/stores" class="nav-link"><span class="nav-name">Store </span>
                            </router-link>
                        </span>
                    </a>

                </li>
                <li>
                    <a>
                        <i class="bi bi-kanban-fill"></i>
                        <span class="link-name">
                            <router-link to="/task" class="nav-link"><span class="nav-name">Project/Task </span>
                            </router-link>
                        </span>
                    </a>
                </li>
                <li>
                    <a>
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/staff-travel-request" class="nav-link"><span class="nav-name">Travel
                                    Request
                                </span> </router-link>
                        </span>
                    </a>

                </li>

                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#appraisal"
                        aria-expanded="true" arai-controls="appraisal">
                        <i class="bi bi-check2-all"></i>
                        <div class="icon-link">
                            <span class="link-name">appraisal</span>
                        </div>
                    </a>
                    <ul id="appraisal" class="submenu sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/appraisal-title" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">appraisal title </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/appraisal-type" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">appraisal Type</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/appraisal-kpi" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">appraisal Kpi</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/initiate-appraisal" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Initiate Appraisal</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/staff-appraisal-list" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Appraisal List</span> </router-link>
                        </li>

                        <li class="nav-item" title="staff">
                            <router-link to="/staff-appraisal-records" class="nav-link"><i class="bi bi-record"></i>
                                <span class="nav-name">Appraisal Records</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- leave begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#leave"
                        aria-expanded="true" arai-controls="leave">
                        <i class="bi bi-bootstrap-reboot"></i>
                        <div class="icon-link">
                            <span class="link-name">leave</span>
                        </div>
                    </a>
                    <ul id="leave" class="submenu sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="leave">
                            <router-link to="/leave" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Leave</span> </router-link>
                        </li>
                        <li class="nav-item" title="leave">
                            <router-link to="/leave-request" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Request Leave</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- leave end here  -->
                <!-- attendance begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse"
                        data-bs-target="#attendance" aria-expanded="true" arai-controls="attendance">
                        <i class="bi bi-person-bounding-box"></i>
                        <div class="icon-link">
                            <span class="link-name">attendance</span>
                        </div>
                    </a>
                    <ul id="attendance" class="submenu sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/shift-config" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Shifts</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/staff-attendance" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Attendance</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- attendance end  -->
                <!-- Payroll begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#payroll"
                        aria-expanded="true" arai-controls="payroll">
                        <i class="bi bi-cash-stack"></i>
                        <div class="icon-link">
                            <span class="link-name">payroll</span>
                        </div>
                    </a>
                    <ul id="payroll" class="submenu sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/salary-structure" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Salary Structure</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/salary-grade" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Salary Grade</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/basic-salary" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Basic Salary</span> </router-link>
                        </li>



                        <li class="nav-item" title="staff">
                            <router-link to="/compute-salaries" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Salaries</span> </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#allowance"
                        aria-expanded="true" arai-controls="allowance">
                        <i class="bi bi-node-plus-fill"></i>
                        <div class="icon-link">
                            <span class="link-name">allowance</span>
                        </div>
                    </a>
                    <ul id="allowance" class="submenu sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/allowance-name" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Allowance Name</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/unit-allowance" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Unit Allowance</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/allowance-exclusion" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Allowance Exclusion</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- allowance end here  -->
                <!-- deduction begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#deduction"
                        aria-expanded="true" arai-controls="deduction">
                        <i class="bi bi-node-minus-fill"></i>
                        <div class="icon-link">
                            <span class="link-name">deduction</span>
                        </div>
                    </a>
                    <ul id="deduction" class="submenu sidebar-dropdown list-unstyled collapse"
                        data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/deduction-name" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Deduction Name</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/deduction-account" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Deduction Account</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/unit-deduction" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Unit Deduction</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/over-payment" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Over Payment</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/deduction-exclusion" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Deduction Exclusions</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- deduction end  -->
            </div>
            <!-- end receptionist -->

            <!-- end receptionist -->
            <div v-if="activeRole == 'store' || activeRole == 'account'">
                <li>
                    <a>
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/suppliers" class="nav-link"><span class="nav-name">Suppliers </span>
                            </router-link>
                        </span>
                    </a>

                </li>
                <li>
                    <a>
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/customers" class="nav-link"><span class="nav-name">Customers </span>
                            </router-link>
                        </span>
                    </a>

                </li>
                <!-- begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#inventory"
                        aria-expanded="true" arai-controls="inventory">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">inventory</span>
                        </div>
                    </a>
                    <ul id="inventory" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/items" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Items </span> </router-link>
                        </li>

                        <li class="nav-item" title="Store Item">
                            <router-link to="/store-item" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Store Item </span> </router-link>
                        </li>

                        <li class="nav-item" title="Damaged Item">
                            <router-link to="/damaged-items" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Damaged Items </span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- end   -->
                <!-- begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#waybill"
                        aria-expanded="true" arai-controls="waybill">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">way bill</span>
                        </div>
                    </a>
                    <ul id="waybill" class=" sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/cr-in" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Items </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/cr-out" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">New Request</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/cr-out-request" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Request List</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- end   -->
                <!-- begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#irequest"
                        aria-expanded="true" arai-controls="irequest">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">item request</span>
                        </div>
                    </a>
                    <ul id="irequest" class=" sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/item-request" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name"> New Request </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Staff List</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- end   -->
                <!-- begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#rmaterial"
                        aria-expanded="true" arai-controls="rmaterial">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">raw material</span>
                        </div>
                    </a>
                    <ul id="rmaterial" class=" sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">

                        <li class="nav-item" title="staff">
                            <router-link to="/raw-material-list" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">List</span> </router-link>
                        </li>

                        <li class="nav-item" title="raw materials">
                            <router-link to="/raw-material" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Add New </span> </router-link>
                        </li>

                        <li class="nav-item" title="staff">
                            <router-link to="/consignments" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Consignments</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- end   -->
                <!-- begin  -->
                <li>
                    <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#mrequest"
                        aria-expanded="true" arai-controls="mrequest">
                        <i class="bi bi-book"></i>
                        <div class="icon-link">
                            <span class="link-name">material request</span>
                        </div>
                    </a>
                    <ul id="mrequest" class="submenu sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="nav-item" title="staff">
                            <router-link to="/pending-raw-material-request" class="nav-link"><i
                                    class="bi bi-record"></i> <span class="nav-name">Pending</span> </router-link>
                        </li>

                        <li class="nav-item" title="staff">
                            <router-link to="/processed-raw-material-request" class="nav-link"><i
                                    class="bi bi-record"></i> <span class="nav-name">Processed</span> </router-link>
                        </li>
                    </ul>
                </li>
                <!-- end   -->
            </div>
            <!-- end receptionist -->

            <!-- end receptionist -->
            <div v-if="activeRole == 'staff'">

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/attendance" class="nav-link"><span class="nav-name">Attendance </span>
                                </router-link>
                            </span>
                        </a>
                    </div>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/task" class="nav-link"><span class="nav-name">Project/Task </span>
                                </router-link>
                            </span>
                        </a>
                    </div>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-bootstrap-reboot"></i>
                            <span class="link-name">
                                <router-link to="/my-leave-request" class="nav-link"><span class="nav-name">Leave
                                    </span>
                                </router-link>
                            </span>
                        </a>
                    </div>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/travel-request" class="nav-link"> <span class="nav-name">Travel
                                        Request </span> </router-link>
                            </span>
                        </a>
                    </div>
                </li>


                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/appraisal-list" class="nav-link"><span
                                        class="nav-name">Appraisal</span> </router-link>
                            </span>
                        </a>
                    </div>
                </li>
                <!-- end log  -->
            </div>
            <!-- end  -->

            <li>
                <div class="icon-link">
                    <a>
                        <i class="bi bi-newspaper"></i>
                        <span class="link-name">
                            <router-link to="/announcement" class="nav-link"><span class="nav-name">Announcements</span>
                            </router-link>
                        </span>
                    </a>
                </div>
            </li>

            <li>
                <div class="icon-link">
                    <a>
                        <i class="bi bi-rainbow"></i>
                        <span class="link-name">
                            <router-link to="/memo" class="nav-link"><span class="nav-name">Memo</span> </router-link>
                        </span>
                    </a>
                </div>
            </li>

            <!-- end receptionist -->
            <li v-if="roles.includes('hod')">
                <div class="icon-link">
                    <a>
                        <i class="bi bi-bootstrap-reboot"></i>
                        <span class="link-name">
                            <router-link to="/line-manager-view-leave-request" class="nav-link"><span
                                    class="nav-name">Leave Request</span> </router-link>
                        </span>
                    </a>
                </div>
                <div class="icon-link">
                    <a>
                        <i class="bi bi-grid"></i>
                        <span class="link-name">
                            <router-link to="/supervisor-appraisal-list" class="nav-link"><span
                                    class="nav-name">Appraisal</span> </router-link>
                        </span>
                    </a>
                </div>
                <!-- end log  -->
            </li>

            <li v-if="roles.length > 1">
                <a class="sidebar-link has-dropdown collapsed" data-bs-toggle="collapse" data-bs-target="#staff"
                    aria-expanded="true" arai-controls="staff">
                    <i class="bi bi-arrow-left-right"></i>
                    <div class="icon-link">
                        <span class="link-name">Switch Role</span>
                    </div>
                </a>
                <ul id="staff" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                    <li class="nav-item" v-for="(role,i) in roles" :key="i" :title="role">
                        <router-link to="#" @click="switchRole(role)" class="nav-link"><i class="bi bi-record"></i>
                            <span class="link-name">{{role.replace('_',' ').toUpperCase()}} </span> </router-link>
                    </li>

                </ul>
            </li>
            <!-- end receptionist -->

            <!-- side-bar footer  -->
            <li>
                <div class="sidebar-footer">
                    <div class="sidebar-footer-content">
                        <!-- <p>powered by</p> -->
                        <img src="../assets/images/optimal.png" alt="optimal">
                    </div>

                </div>
            </li>
        </ul>

    </div>
</template>

<script setup>

import store from "@/store";
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter()
const roles =  store?.state?.user?.roles;

const activeRole = ref(null)
activeRole.value = store?.state?.activeRole
const goToDashboard = () =>{
    let name = activeRole.value;
    // if(name =='staff'){
    //     name = 'Self'
    // } else if (name == 'head_engineer') {
    //     name = 'Engineer'
    // }
    name = roleName(name)
    name = name[0].toUpperCase() + name.substring(1)+'Dashboard'
    router.push({ name: name })
}

const switchRole = (role) => {
    store.commit('setActiveRole', role)
    localStorage.setItem('TVATI_ACTIVE_ROLE', role)
    activeRole.value = role
    role = roleName(role)
    role = role[0].toUpperCase() + role.substring(1) + 'Dashboard'
    router.push({ name: role })
}

const roleName = (role) => {
    if (role == 'staff') {
        role = 'Self'
    }
    else if (role == 'head_engineer') {
        role = 'Engineer'
    }
    else if (role == 'engineer_supervisor') {
        role = 'Supervisor'
    }
    return role;
}
</script>

<style scoped>
 a{
    text-decoration: none;
 }
 li{
    list-style: none;
 }

#sidebar{
    transition: all .3s ease-in-out;
}


.sidebar-nav{
    padding: 2rem 0;
    flex: 1 1 auto;
}



#sidebar .sidebar-link[data-bs-toggle="collapse"]::after{
    border: solid;
    border-width: 0 0.15rem 0.15rem 0;
    height: 12px;
    width: 12px;
    content: "";
    display: inline-block;
    padding: 2px;
    position: absolute;
    right: 1.5rem;
    top:1.4rem;
    transform: rotate(-135deg);
    transition: all .3s ease-in-out;
    color: #fff;
}

#sidebar .sidebar-link[data-bs-toggle="collapse"].collapsed::after {
    transform: rotate(45deg);
    transition: all .2s ease-out;
}

li  ul{
    margin-left: 20px ;
    padding: 6px 6px 14px 35px;
}
li ul li:hover {
    border-top: 1px solid #000;
}
li  ul li .nav-link{
    color: #fff;
}

.nav-name,.link-name{
    text-transform: capitalize;
    cursor: pointer;
}

</style>