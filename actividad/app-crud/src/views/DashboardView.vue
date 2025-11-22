<template>
  <div>
    <NavbarMenu />
    <router-view />
  </div>
</template>

<script>
import NavbarMenu from '@/components/NavbarMenu.vue';

export default {
  name: 'DashboardView',
  components: {
    NavbarMenu
  }
};
</script>

<style scoped>
</style>