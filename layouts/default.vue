<template>
  <v-app dark>
    <HeaderComponent></HeaderComponent>
    <!--컨텐츠영역-->
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <FooterComponent></FooterComponent>
  </v-app>
</template>

<script>
import HeaderComponent from '~/fragments/header.vue';
import FooterComponent from '~/fragments/footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    HeaderComponent,
    FooterComponent,
  },

}
</script>
