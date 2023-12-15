<template>
    <div>
    <aside id="sidebar" class="sidebar">
    
        <ul class="sidebar-nav" id="sidebar-nav">
            <li class="nav-item" title="Dashboard">
                 <router-link to="/dashboard" class="nav-link"><i class="bi bi-building"></i> <span class="nav-name">Dashboard <i class="arrow bi bi-chevron-compact-down"></i></span>  </router-link>
            </li>
            <li class="nav-item" title="staff">
                 <router-link to="/staff" class="nav-link"><i class="bi bi-people-fill"></i> <span class="nav-name">Staff <i class="arrow bi bi-chevron-compact-down"></i></span>  </router-link>
            </li>
            <li class="nav-item" title="users">
                 <router-link to="/department" class="nav-link"><i class="bi bi-person-check-fill"></i>
                    <span class="nav-name">Department <i class="arrow bi bi-chevron-compact-down"></i></span>  </router-link>
            </li>
            <li class="nav-item" title="Item Request">
                 <router-link to="/task" class="nav-link"><i class="bi bi-stack"></i>
                        <span class="nav-name">Task <i class="arrow bi bi-chevron-compact-down"></i></span></router-link>
            </li>

            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/appraisal" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">Appraisal <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/memo" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">Memo <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/leave" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">Leave <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/request" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">Request <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/attendance" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">attendance <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/payroll" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">payroll <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
           
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/schedule" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">schedule <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/log" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">log <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/anouncement" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">anouncement <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/workers" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">workers <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>

            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/tools" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">tools <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>
            <li class="nav-item" title="Approve Request" data-bs-toggle="tooltip">
                 <router-link to="/assembling" class="nav-link"><i class="bi bi-bricks"></i>
                        <span class="nav-name">assembling <i class="arrow bi bi-chevron-compact-down"></i></span>
                </router-link>
            </li>

            <li class="nav-item" title="Item in stock" data-bs-toggle="tooltip">
                 <router-link to="/stock" class="nav-link"><i class="bi bi-tools"></i></router-link>
            </li>
            <li class="nav-item" title="item purchase">
                 <router-link to="/way-bills" class="nav-link"><i class="bi bi-arrow-down-left-square-fill"></i></router-link>
            </li>
            <li class="nav-item" title="item Name">
                 <router-link to="/items" class="nav-link"><i class="bi bi-stickies-fill"></i></router-link>
            </li>
            

            <!-- End Dashboard Nav -->
        </ul>
        
        <div class="side-footer">
            Optimal <span class="nav-name"> Soft </span>
        </div>
    
    </aside><!-- End Sidebar-->
        
    </div>
</template>

<script setup>


</script>

<style scoped>
/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
.sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    width: 90px;
    z-index: 96;
    transition: all 0.3s;
    padding: 20px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #aab7cf transparent;
    box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
    background-color: #fff;
    /* display: flex; */
}
.sidebar:hover {
    width: 250px;
    /* display: flex; */
}
 
.sidebar:hover  .side-footer {
    width: 250px;
    /* display: flex; */
}
 
.nav-name{
    display: none !important;
}
#sidebar:hover  .nav-name{
    display: block !important;
    /* display: flex; */
}


/* @media (max-width: 1199px) {
  .sidebar {
    left: -300px;
  }
} */
.sidebar::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
    background-color: #aab7cf;
}

/* @media (min-width: 1200px) {
  #main, #footer {
    margin-left: 300px;
  }
} */
/* @media (max-width: 1199px) {
  .toggle-sidebar .sidebar {
    left: 0;
  }
}
@media (min-width: 1200px) {
  .toggle-sidebar #main, .toggle-sidebar #footer {
    margin-left: 0;
  }
  .toggle-sidebar .sidebar {
    left: -300px;
  }
} */

.sidebar-nav {
    padding: 0;
    margin: 0;
    list-style: none;
}

.sidebar-nav li {
    padding: 0;
    margin: 0;
    list-style: none;
}

.sidebar-nav .nav-item {
    margin-bottom: 5px;
}

.sidebar-nav .nav-heading {
    font-size: 11px;
    text-transform: uppercase;
    color: #899bbd;
    font-weight: 600;
    margin: 10px 0 5px 15px;
}

.sidebar-nav .nav-link {
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 600;
    color: #4154f1;
    transition: 0.3;
    background: #f6f9ff;
    padding: 10px 15px;
    border-radius: 4px;
}

.sidebar-nav .nav-link i {
    font-size: 16px;
    margin-right: 10px;
    color: #4154f1;
}

.sidebar-nav .nav-link.collapsed {
    color: #012970;
    background: #fff;
}

.sidebar-nav .nav-link.collapsed i {
    color: #899bbd;
}

.sidebar-nav .nav-link:hover {
    color: #4154f1;
    background: #f6f9ff;
}

.sidebar-nav .nav-link:hover i {
    color: #4154f1;
}

.sidebar-nav .nav-link .bi-chevron-down {
    margin-right: 0;
    transition: transform 0.2s ease-in-out;
}

.sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
    transform: rotate(180deg);
}

.sidebar-nav .nav-content {
    padding: 5px 0 0 0;
    margin: 0;
    list-style: none;
}

.sidebar-nav .nav-content a {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #012970;
    transition: 0.3;
    padding: 10px 0 10px 40px;
    transition: 0.3s;
}

.sidebar-nav .nav-content a i {
    font-size: 6px;
    margin-right: 8px;
    line-height: 0;
    border-radius: 50%;
}

.sidebar-nav .nav-content a:hover,
.sidebar-nav .nav-content a.active {
    color: #4154f1;
}

.sidebar-nav .nav-content a.active i {
    background-color: #4154f1;
}

.side-footer{
    display: inline-block;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 90px;
    background-color: #f1f1f2;
    font-weight: 600;
    border-top: 1px solid #000;
    color: rgb(11, 76, 129);
    text-align: center;
    transition: all 0.3s;

}

</style>