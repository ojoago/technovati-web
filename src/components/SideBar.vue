<template>
    <div class="sidebar " id="sidebar">

        <!-- <div class="sidebar " id="sidebar"> -->
        <div class="brand-details">
            <i class="bi bi-list toggleMenu pointer"></i>
            <span class="brand-name">Optimal</span>
            <!-- <span class="brand-name">Technovati</span> -->
        </div>
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
                        <i class="bi bi-chevron-right arrow"></i>
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
                        <i class="bi bi-chevron-right arrow"></i>
                    </div>
                </li>


            </div>
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
                        <i class="bi bi-chevron-right arrow"></i>
                    </div>
                    <ul class="sub-menu blank">
                        <li class="nav-item" title="schedule">
                            <router-link to="/schedule" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">schedule</span> </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Log</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="Log">
                            <router-link to="/log" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Create Staff </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/visitor-out-time" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Staff List</span> </router-link>
                        </li>

                    </ul>
                </li>

            </div>


            <div v-if="activeRole == 'receptionist'">

            </div>
            <div v-if="activeRole=='engineer'">

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Engineering</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="workers">
                            <router-link to="/workers" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Workers</span> </router-link>
                        </li>
                        <li class="nav-item" title="team">
                            <router-link to="/team" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Team</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/tools" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Tools </span> </router-link>
                        </li>


                        <li class="nav-item" title="work">
                            <router-link to="/daily-record" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Daily Record </span> </router-link>
                        </li>
                        <li class="nav-item" title="work">
                            <router-link to="/work-sheet" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Work Sheet </span> </router-link>
                        </li>
                        <li class="nav-item" title="work">
                            <router-link to="/staff-record" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Staff Record </span> </router-link>
                        </li>

                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Material Request</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="raw materials">
                            <router-link to="/material-request" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">New Request</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/my-raw-material-request" class="nav-link"><i class="bi bi-record"></i>
                                <span class="nav-name">My Request</span> </router-link>
                        </li>


                    </ul>
                </li>
            </div>

            <div v-if="activeRole =='logistics'">
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Logistics</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="staff">
                            <router-link to="/vehicle" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Vehicle </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/driver" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Driver</span> </router-link>
                        </li>

                    </ul>
                </li>
            </div>



            <!----------------------- HR role  -------------------------- -->

            <div v-if="activeRole=='hr'">
                <li>
                    <a>
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/department" class="nav-link"><span class="nav-name">Department </span>
                            </router-link>
                        </span>
                    </a>
                    <ul class="sub-menu blank">
                        <li class="nav-item" title="Department">
                            <router-link to="/department" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Department </span> </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Staff</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
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
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/task" class="nav-link"><span class="nav-name">Project/Task </span>
                            </router-link>
                        </span>
                    </a>
                    <ul class="sub-menu blank">
                        <li class="nav-item" title="Project/Task">
                            <router-link to="/task" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Project/Task </span> </router-link>
                        </li>
                    </ul>
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
                    <ul class="sub-menu blank">
                        <li class="nav-item" title="Travel Request">
                            <router-link to="/staff-travel-request" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Travel Request </span> </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Appraisal</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
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
                            <router-link to="/staff-appraisal-records" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Appraisal Records</span> </router-link>
                        </li>

                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-bootstrap-reboot"></i>
                            <span class="link-name">
                                <router-link to="/leave" class="nav-link"><span
                                        class="nav-name">Leave</span></router-link>
                            </span>
                        </a>
                        <i class="bi bi-chevron-right arrow"></i>
                    </div>
                    <ul class="sub-menu">
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

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Attendance</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
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

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Payroll</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <!-- <li class="nav-item" title="staff">
                                <router-link to="/salary-steps" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Salary Steps  </span>  </router-link>
                            </li> -->
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
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Allowance</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
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
                        <li class="nav-item" title="staff">
                            <router-link to="/nontaxable-allowance" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Nontaxable Allowance</span> </router-link>
                        </li>

                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name"> Deduction </span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="staff">
                            <router-link to="/deduction-name" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">deduction Name</span> </router-link>
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



            </div>
            <!-- ---------------------- store/Account -----------------  -->
            <div v-if="activeRole=='store' || activeRole=='account'">
                <li>
                    <a>
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/suppliers" class="nav-link"><span class="nav-name">Suppliers </span>
                            </router-link>
                        </span>
                    </a>
                    <ul class="sub-menu blank">
                        <li class="nav-item" title="Suppliers">
                            <router-link to="/suppliers" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Suppliers </span> </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>
                        <i class="bi bi-list-task"></i>
                        <span class="link-name">
                            <router-link to="/customers" class="nav-link"><span class="nav-name">Customers </span>
                            </router-link>
                        </span>
                    </a>
                    <ul class="sub-menu blank">
                        <li class="nav-item" title="Customers">
                            <router-link to="/customers" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Customers </span> </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Inventory</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="staff">
                            <router-link to="/stores" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Store </span> </router-link>
                        </li>
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

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Way Bill</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
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

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Item Request</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
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

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Raw Materials</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li class="nav-item" title="raw materials">
                            <router-link to="/raw-material" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Add New </span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/raw-material-list" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">List</span> </router-link>
                        </li>
                        <li class="nav-item" title="staff">
                            <router-link to="/consignments" class="nav-link"><i class="bi bi-record"></i> <span
                                    class="nav-name">Consignments</span> </router-link>
                        </li>

                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-book"></i>
                            <span class="link-name">Materail Request</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">

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


            </div>

            <!-- ---------- self service ------------------------------------ -->
            <div v-if="activeRole=='staff'">

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/attendance" class="nav-link"><span class="nav-name">Attendance </span>
                                </router-link>
                            </span>
                        </a>
                        <i class="bi bi-chevron-right arrow"></i>
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
                        <i class="bi bi-chevron-right arrow"></i>
                    </div>
                </li>

                <li>
                    <div class="icon-link">
                        <a>
                            <i class="bi bi-grid"></i>
                            <span class="link-name">
                                <router-link to="/my-leave-request" class="nav-link"><span class="nav-name">Leave
                                    </span>
                                </router-link>
                            </span>
                        </a>
                        <i class="bi bi-chevron-right arrow"></i>
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
                        <i class="bi bi-chevron-right arrow"></i>
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
                        <i class="bi bi-chevron-right arrow"></i>
                    </div>
                </li>
            </div>
            <li>
                <div class="icon-link">
                    <a>
                        <i class="bi bi-grid"></i>
                        <span class="link-name">
                            <router-link to="/announcement" class="nav-link"><span class="nav-name">Announcements</span>
                            </router-link>
                        </span>
                    </a>
                    <i class="bi bi-chevron-right arrow"></i>
                </div>
            </li>

            <li>
                <div class="icon-link">
                    <a>
                        <i class="bi bi-grid"></i>
                        <span class="link-name">
                            <router-link to="/memo" class="nav-link"><span class="nav-name">Memo</span> </router-link>
                        </span>
                    </a>
                    <i class="bi bi-chevron-right arrow"></i>
                </div>
            </li>

            <li v-if="roles.includes('hod')">
                <div class="icon-link">
                    <a>
                        <i class="bi bi-grid"></i>
                        <span class="link-name">
                            <router-link to="/line-manager-view-leave-request" class="nav-link"><span
                                    class="nav-name">Leave Request</span> </router-link>
                        </span>
                    </a>
                    <i class="bi bi-chevron-right arrow"></i>
                </div>
                <div class="icon-link">
                    <a>
                        <i class="bi bi-grid"></i>
                        <span class="link-name">
                            <router-link to="/supervisor-appraisal-list" class="nav-link"><span
                                    class="nav-name">Appraisal</span> </router-link>
                        </span>
                    </a>
                    <i class="bi bi-chevron-right arrow"></i>
                </div>
            </li>

            <li>
                <div class="sidebar-footer">
                    <div class="sidebar-footer-content">
                        <!-- <p>powered by</p> -->
                        <img src="../assets/images/optimal.png" alt="optimal">
                    </div>
                    <!-- <div class="job-name">
                        <div class="name">Prem Shahi</div>
                        <div class="job">Web Designer</div>
                    </div>
                     -->
                </div>
            </li>
        </ul>
        <!-- </div> -->

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
// console.log(activeRole.value)
const goToDashboard = () =>{
    let name = activeRole.value;
    if(name =='staff'){
        name = 'Self'
    }
    name = name[0].toUpperCase() + name.substring(1)+'Dashboard'
    router.push({ name: name })
}

</script>

<style scoped>
 
</style>