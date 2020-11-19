<template>
  <header class="header">
    <div class="logo">
      <nuxt-link to="/">
      </nuxt-link>
    </div>
    <nav class="nav">
      <div class="nav__link">
        <nuxt-link to="/">Home</nuxt-link>
      </div>
      <div class="nav__link">
        <nuxt-link to="/match">Match</nuxt-link>
      </div>
    </nav>
  </header>
</template>
<script>
import Logo from "@/components/Logo";
export default {
  name: "nav-bar",
  components: {
  },
};
</script>
<style>
header {
  background-color: green;
}
</style>