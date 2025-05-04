<template>
    <aside class="side-toolbar">
        <Avatar :src="userStore.isSign ? avatar : ''" :size="isPc ? 50 : 40" v-login="showSettingBox" />
    </aside>
</template>

<script setup lang="ts">
    
</script>

<style lang="scss" src="./styles.scss" scoped />