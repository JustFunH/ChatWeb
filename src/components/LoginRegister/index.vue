<script setup lang="ts">
import { useAuthDialogStore } from '@/stores/authDialog'

const authStore = useAuthDialogStore()
</script>

<template>
    <el-dialog v-model="authStore.authVisible" width="420px" align-center :append-to-body="true" :close-on-click-modal="false" 
        @close="authStore.closeDialog">
        <template v-if="authStore.loginVisible">
            <LoginBox />
        </template>
        <template v-else-if="authStore.registerVisible">
            <RegisterBox />
        </template>
    </el-dialog>

</template>

<style scoped>
.el-dialog {
  display: flex !important;
  flex-direction: column !important;
  margin: 0 !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  overflow-y: scroll !important;
  max-height: 100vh !important;
}


</style>