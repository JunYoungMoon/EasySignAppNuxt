<template>
  <v-card width="400" class="pa-3 mx-auto">
    <v-form fast-fail @submit.prevent="login">
      <v-text-field v-model="loginData.id" variant="outlined" label="ID"></v-text-field>
      <v-text-field v-model="loginData.password" variant="outlined" label="Password"></v-text-field>
      <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

      <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

    </v-form>
    <div class="mt-2">
      <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
    </div>

    <v-row>
      <v-col class="pa-0">
        <v-img
          contain
          src="social/google.png"
          style="cursor: pointer;"
          @click="googleLogin"
        ></v-img>
      </v-col>
      <v-col class="pa-1">
        <v-img
          contain
          src="social/kakao.png"
          style="cursor: pointer;"
          @click="kakaoLogin"
        ></v-img>
      </v-col>
      <v-col class="pa-1">
        <v-img
          contain
          src="social/naver.png"
          style="cursor: pointer;"
          @click="naverLogin"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginData: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('/login', {
          id: this.loginData.id,
          password: this.loginData.password
        })

        // 로그인 성공 후 Vuex Store의 Mutation 호출
        // if (response.data.accessToken) {
        //   this.$store.commit('setAccessToken', response.data.accessToken);
        // }
        //
        // if (response.data.refreshToken) {
        //   this.$store.commit('setRefreshToken', response.data.refreshToken);
        // }

        // 로그인 성공 후
        if (response.data.accessToken) {
          sessionStorage.setItem('accessToken', response.data.accessToken);
        }

        if (response.data.refreshToken) {
          sessionStorage.setItem('refreshToken', response.data.refreshToken);
        }

        // 로그인 성공 후의 처리
        // 유저 정보 가져오기
        await this.fetchUserInfo();
      } catch (error) {
        console.error('Login failed', error)
        // 로그인 실패 시의 처리
      }
    },
    async googleLogin() {
      // 구글 로그인 로직 작성
    },
    async kakaoLogin() {
      // 카카오 로그인 로직 작성
    },
    async naverLogin() {
      // 네이버 로그인 로직 작성
    },
    async fetchUserInfo() {
      try {
        const accessToken = sessionStorage.getItem('accessToken');

        if (!accessToken) {
          // Access Token이 없는 경우 로그인되지 않은 상태
          return;
        }

        const response = await this.$axios.get('/getUserInfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        // 유저 정보를 가져온 경우
        const userInfo = response.data;

        // 이제 userInfo에 있는 email 정보를 어떻게 활용할지 정리합니다.
        // 예를 들어, app-bar에 표시하거나 상태 관리에 저장할 수 있습니다.
        // 이 부분은 프로젝트의 UI 및 상태 관리 방식에 따라 다를 수 있습니다.
        this.email = userInfo.email; // 예시: 상태 관리 변수에 email 저장

      } catch (error) {
        console.error('Error fetching user info', error);
        // 유저 정보 가져오기 실패 시의 처리
      }
    },

  }
}
</script>
