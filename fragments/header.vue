<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
    >
      <v-list>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <!--상단 헤더-->
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn icon @click="toggleTheme">
        <i :class="themeIcon" style="font-size: 30px;"/>
      </v-btn>
      <v-btn icon @click.stop="navigateToLogin">
        <i :class="loginIcon" style="font-size: 30px;"/>
      </v-btn>
<!--      <v-btn icon @click.stop="navigateToLogin">-->
<!--        <v-icon>mdi-account</v-icon>-->
<!--      </v-btn>-->
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      isDark: true,
      theme: 'dark',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SignApp',
      headerText: 'Login',
    }
  }
  ,
  computed: {
    themeIcon () {
      return this.$vuetify.theme.dark ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny'
    },
    loginIcon(){
      // Vuex 스토어에서 authResult 상태를 가져와서 아이콘을 결정
      const authResult = this.$store.state.authResult;
      return authResult ? 'mdi mdi-account' : 'mdi mdi-login';
    }
  },
  created() {
    const savedTheme = this.$cookies.get('theme');
    this.$vuetify.theme.dark = savedTheme === 'dark';
  },
  methods: {
    navigateToLogin() {
      const authResult = this.$store.state.authResult;

      // authResult 값에 따라서 로그인 또는 로그아웃 요청 보내기
      if (authResult) {
        // 로그아웃 요청 처리 하던지 마이페이지로 가던지
        // this.$router.push('/logout');
      } else {
        // 로그인 요청 처리
        this.$router.push('/login');
      }
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$cookies.set('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
    },
  },
}
</script>
