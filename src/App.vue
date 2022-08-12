<template>
  <div class="container">
    <div class="col-lg-2"></div>
    <div class="col-lg-8">
      <app-header></app-header>
      <router-view></router-view>
    </div>
    <div class="col-lg-2"></div>
  </div>
</template>

<script>
import AppHeader from './views/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style>
</style>
