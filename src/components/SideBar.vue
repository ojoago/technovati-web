<template>
    <div>

        <div class="sidebar" id="sidebar">
                <div class="brand-details">
                    <i class="bi bil-c-plus-plus"></i>
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
                                <router-link to="/appraisal-config" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">appraisal Kpi</span>  </router-link>
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
                                <router-link to="/attendance" class="nav-link"><i class="bi bi-record"></i> <span class="nav-name">Create Staff  </span>  </router-link>
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
                            <span class="link-name">Payroll</span>
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
                            <span class="link-name">tools</span>
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