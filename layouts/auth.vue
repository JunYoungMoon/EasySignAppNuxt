<template>
  <v-app>
    <v-container>
      <Nuxt/>
    </v-container>
    <FooterComponent></FooterComponent>
  </v-app>
</template>

<script>
import FooterComponent from '~/fragments/footer.vue';

export default {
  name: 'AuthLayout',
  components: {
    FooterComponent,
  },
  layout: 'auth',
  data() {
    return {
      fixed: false,
    }
  }
}
</script>
