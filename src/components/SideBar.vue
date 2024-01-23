<template>
    <div class="sidebar " id="sidebar">

        <div >
                <div class="brand-details">
                    <i class="bi bi-list pointer" id="sideToggle"></i>
                    <span class="brand-name">Technovati</span>
                </div>
                <ul class="nav-links">
                    <li>
                        <a >
                            <i class="bi bi-grid"></i>
                            <span class="link-name">Dashboard</span>
                        </a>
                        <ul class="sub-menu blank">
                            <li> <a class="link-name" >Category</a> </li>
                        </ul>
                    </li>
                     

                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Staff</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/staff" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Department</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/department" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Manage  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                        <a >
                            <i class="bi bi-list-task"></i>
                            <span class="link-name">
                                <router-link to="/suppliers" class="nav-link"><span class="nav-name">Suppliers  </span>  </router-link>
                            </span>
                        </a>
                        <ul class="sub-menu blank">
                            <li class="nav-item" title="staff">
                                <router-link to="/suppliers" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Suppliers  </span>  </router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="bi bi-list-task"></i>
                            <span class="link-name">
                                <router-link to="/customers" class="nav-link"><span class="nav-name">Customers  </span>  </router-link>
                            </span>
                        </a>
                        <ul class="sub-menu blank">
                            <li class="nav-item" title="staff">
                                <router-link to="/customers" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Customers  </span>  </router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a >
                            <i class="bi bi-list-task"></i>
                            <span class="link-name">
                                <router-link to="/task" class="nav-link"><span class="nav-name">Project/Task  </span>  </router-link>
                            </span>
                        </a>
                        <ul class="sub-menu blank">
                            <li class="nav-item" title="staff">
                                <router-link to="/task" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Project/Task  </span>  </router-link>
                            </li>
                        </ul>
                    </li>
                    
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Task/Project</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/department" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Project  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
    
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Appraisal</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/appraisal-title" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">appraisal title </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/appraisal-section" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">appraisal Section</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/appraisal-section-kpi" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">appraisal Kpi</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/appraisal-cycle" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">appraisal Cycle</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Memo</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/memo" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                            <div class="icon-link">
                                <a >
                                    <i class="bi bi-bootstrap-reboot"></i>
                                    <span class="link-name">
                                        <router-link to="/leave" class="nav-link"><span class="nav-name">Leave</span></router-link>
                                    </span>
                                </a>
                                <i class="bi bi-chevron-right arrow"></i>
                            </div>
                            <ul class="sub-menu blank">
                                <li class="nav-item" title="leave">
                                    <router-link to="/leave" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Leave</span>  </router-link>
                                </li>
                            </ul>
                        </li>
                   
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Request</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/request" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
                   
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Attendance</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/shift-config" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Shifts</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/attendance" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Attendance</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
                   
                    <li>
                       <div class="icon-link">
                        <a >
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
                                <router-link to="/salary-grade" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Salary Grade</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/salary-structure" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Salary Structure</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Allowance</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/allowance-name" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Allowance Name</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/unit-allowance" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Unit Allowance</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/allowance-exclusion" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Allowance Exclusion</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/nontaxable-allowance" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Nontaxable Allowance</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name"> Deduction </span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/deduction-name" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">deduction Name</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/deduction-account" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Deduction Account</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/unit-deduction" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Unit Deduction</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/over-payment" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Over Payment</span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/deduction-exclusion" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Deduction Exclusions</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
                   

                     <li>
                            <div class="icon-link">
                                <a >
                                    <i class="bi bi-stack"></i>
                                    <span class="link-name">
                                        <router-link to="/schedule" class="nav-link"><span class="nav-name">Schedule</span></router-link>
                                    </span>
                                </a>
                                <i class="bi bi-chevron-right arrow"></i>
                            </div>
                            <ul class="sub-menu blank">
                                <li class="nav-item" title="schedule">
                                    <router-link to="/schedule" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">schedule</span>  </router-link>
                                </li>
                            </ul>
                        </li>
                   
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Log</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/log" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/visitor-out-time" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
                   
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Announcement</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/announcement" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Workers</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="workers">
                                <router-link to="/workers" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="team">
                                <router-link to="/team" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Team</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">tools</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/tools" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Tools  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>
                    <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">Assembling</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/staff" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li>

                    <!-- <li>
                       <div class="icon-link">
                        <a >
                            <i class="bi bi-book"></i>
                            <span class="link-name">INV</span>
                        </a>
                        <i class="bi bi-chevron-down arrow"></i>
                       </div>
                        <ul class="sub-menu">
                            <li class="nav-item" title="staff">
                                <router-link to="/staff" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
                            </li>
                            <li class="nav-item" title="staff">
                                <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                            </li>
                        
                        </ul>
                    </li> -->

                     <li>
                           <div class="icon-link">
                            <a >
                                <i class="bi bi-book"></i>
                                <span class="link-name">Inventory</span>
                            </a>
                            <i class="bi bi-chevron-down arrow"></i>
                           </div>
                            <ul class="sub-menu">
                                <li class="nav-item" title="staff">
                                    <router-link to="/items" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Items  </span>  </router-link>
                                </li>
                                <li class="nav-item" title="staff">
                                    <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                                </li>
                        
                            </ul>
                        </li>

                        <li>
                            <div class="icon-link">
                                <a >
                                    <i class="bi bi-book"></i>
                                    <span class="link-name">Way Bill</span>
                                </a>
                                <i class="bi bi-chevron-down arrow"></i>
                            </div>
                                <ul class="sub-menu">
                                    <li class="nav-item" title="staff">
                                        <router-link to="/cr-in" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Items  </span>  </router-link>
                                    </li>
                                    <li class="nav-item" title="staff">
                                        <router-link to="/cr-out" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">New Request</span>  </router-link>
                                    </li>
                                    <li class="nav-item" title="staff">
                                        <router-link to="/cr-out-request" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Request List</span>  </router-link>
                                    </li>
                            
                                </ul>
                            </li>

                        <li>
                            <div class="icon-link">
                                <a >
                                    <i class="bi bi-book"></i>
                                    <span class="link-name">Item Request</span>
                                </a>
                                <i class="bi bi-chevron-down arrow"></i>
                            </div>
                                <ul class="sub-menu">
                                    <li class="nav-item" title="staff">
                                        <router-link to="/item-request" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name"> New Request  </span>  </router-link>
                                    </li>
                                    <li class="nav-item" title="staff">
                                        <router-link to="/staff-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Staff List</span>  </router-link>
                                    </li>
                            
                                </ul>
                            </li>

                        <li>
                           <div class="icon-link">
                            <a >
                                <i class="bi bi-book"></i>
                                <span class="link-name">Raw Materials</span>
                            </a>
                            <i class="bi bi-chevron-down arrow"></i>
                           </div>
                            <ul class="sub-menu">
                                <li class="nav-item" title="raw materials">
                                    <router-link to="/raw-material" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Add New  </span>  </router-link>
                                </li>
                                <li class="nav-item" title="staff">
                                    <router-link to="/raw-material-list" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">List</span>  </router-link>
                                </li>
                                <li class="nav-item" title="staff">
                                    <router-link to="/consignments" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Consignments</span>  </router-link>
                                </li>
                        
                            </ul>
                        </li>

                     
                         <li>
                               <div class="icon-link">
                                <a >
                                    <i class="bi bi-book"></i>
                                    <span class="link-name">Material Request</span>
                                </a>
                                <i class="bi bi-chevron-down arrow"></i>
                               </div>
                                <ul class="sub-menu">
                                    <li class="nav-item" title="raw materials">
                                        <router-link to="/material-request" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">New Request</span>  </router-link>
                                    </li>
                                    <li class="nav-item" title="staff">
                                        <router-link to="/my-request" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">My Request</span>  </router-link>
                                    </li>
                                    <li class="nav-item" title="staff">
                                        <router-link to="/process-raw-material-request" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Request</span>  </router-link>
                                    </li>
                        
                                </ul>
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
                    <i class="bi bi-log-out"></i> -->
                        </div>
                    </li>
                </ul>
            </div>
        
    </div>
</template>

<script setup>


</script>

<style scoped>
 
</style>