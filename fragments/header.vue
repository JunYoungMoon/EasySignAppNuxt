<template>
  <div>
    <!--왼쪽 메뉴-->
    <v-navigation-drawer
      v-if="drawer"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact>
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
      <v-toolbar-title v-text="title" @click="navigateToRoot" style="cursor: pointer;"/>
      <v-spacer/>
      <v-btn icon @click="toggleTheme">
        <i :class="themeIcon" style="font-size: 30px;"/>
      </v-btn>

      <!-- authResult 값이 true인 경우에만 드롭다운 버튼을 표시합니다 -->
      <v-btn v-if="authResult" id="menu-activator" icon @click="toggleDropdown">
        <i class="rounded-image" style="font-size: 30px;">
          <img v-if="userInfo && userInfo.profileImage" :src="userInfo.profileImage" alt="Profile Image"
               style="width: 40px; height: 40px;">
          <!--          <i v-else class="mdi mdi-account" style="font-size: 30px;"/>-->
          <img v-else :src="require('~/assets/images/empty_avatar.png')" alt="Profile Image"
               style="width: 40px; height: 40px;">
          <!--          :image="userInfo && userInfo.profileImage ? userInfo.profileImage : require('~/assets/images/empty_avatar.png')"-->
        </i>
      </v-btn>
      <!-- authResult 값이 false인 경우에 login 버튼을 표시합니다 -->
      <v-btn v-else icon @click="login">
        <i class="mdi mdi-login" style="font-size: 30px;"/>
      </v-btn>

      <!-- 드롭다운 메뉴 -->
      <v-menu activator="#menu-activator" offset-y>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <i class="rounded-image" style="font-size: 30px;">
                <img v-if="userInfo && userInfo.profileImage" :src="userInfo.profileImage" alt="Profile Image"
                     style="width: 40px; height: 40px;">
                <img v-else :src="require('~/assets/images/empty_avatar.png')" alt="Profile Image"
                     style="width: 40px; height: 40px;">
              </i>
              <h3 v-if="userInfo && userInfo.name">{{ userInfo.name }}</h3>
              <p v-if="userInfo && userInfo.email" class="text-caption mt-1">{{ userInfo.email }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="goToMyInfo">My Info</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout">Logout</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      authResult: this.$store.state.authResult,
      userInfo: this.$store.state.userInfo,
      clipped: false,
      drawer: false,
      fixed: false,
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
      title: 'SignApp',
    }
  }
  ,
  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark ? 'mdi mdi-weather-night' : 'mdi mdi-weather-sunny';
    },
  },
  methods: {
    goToMyInfo() {
      // My Info 페이지로 이동
      this.$router.push('/myinfo');
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    login() {
      const authResult = this.$store.state.authResult;

      if (!authResult) {
        this.$router.push('/login');
      }
    },
    logout() {
      this.$cookies.remove('accessToken');
      this.$cookies.remove('refreshToken');

      this.$router.go(0);
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.$cookies.set('theme', this.$vuetify.theme.dark ? 'dark' : 'light');
    },
    navigateToRoot() {
      this.$router.push("/");
    },
  },
}
</script>

<style scoped>
.rounded-image {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 이미지를 원 모양으로 만듭니다. */
  overflow: hidden; /* 원 밖의 부분을 숨깁니다. */
}
</style>
