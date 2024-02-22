<template>
    <div>
        <div class="container-fluid mt-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Item Request </h5>
                    <!-- Default Tabs -->
                    <ul class="nav nav-tabs d-flex" id="myTabjustified" role="tablist">
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100 active" id="raw-tab" data-bs-toggle="tab" data-bs-target="#raw" type="button" role="tab" aria-controls="raw" aria-selected="true">Raw Materials</button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="inventory-tab" data-bs-toggle="tab" data-bs-target="#inventory" type="button" role="tab" aria-controls="inventory" aria-selected="false">Inventory Item</button>
                        </li>

                    </ul>
                    <div class="tab-content pt-2" id="myTabjustifiedContent">
                        <div class="tab-pane fade show active" id="raw" role="tabpanel" aria-labelledby="raw-tab">
                            <RawMaterialRequestView/>

                        </div>
                        <div class="tab-pane fade" id="inventory" role="tabpanel" aria-labelledby="inventory-tab">
                           <InventoryItemRequestView/>
                        </div>
                    </div>
                    <!-- End  Tabs -->

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import RawMaterialRequestView from '@/components/request/RawMaterialRequestView.vue';
    import InventoryItemRequestView from '@/components/request/InventoryItemView.vue';

</script>

<style scoped></style>