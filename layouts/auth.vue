<template>
  <v-app dark>
    <v-container>
      <Nuxt/>
    </v-container>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
  layout: 'auth',
  data() {
    return {
      fixed: false,
    }
  }
}

</script>
