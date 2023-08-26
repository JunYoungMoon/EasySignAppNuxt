<template>
  <div class="align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <v-form fast-fail @submit.prevent="login">
        <v-text-field variant="outlined" v-model="loginData.id" label="User Name"></v-text-field>

        <v-text-field variant="outlined" v-model="loginData.password" label="password"></v-text-field>
        <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

        <v-btn type="submit" color="primary" block class="mt-2">Sign in</v-btn>

      </v-form>
      <div class="mt-2">
        <p class="text-body-2">Don't have an account? <a href="#">Sign Up</a></p>
      </div>

      <v-row class="mt-2 justify-center"> <!-- justify-center 클래스 추가 -->
        <v-col cols="12">
          <v-img
            contain
            max-width="200"
            src="social/google.png"
            @click="googleLogin"
            class="hover-pointer mx-auto"
          ></v-img>
        </v-col>
        <v-col cols="12">
          <v-img
            contain
            max-width="200"
            src="social/kakao.png"
            @click="kakaoLogin"
            class="hover-pointer mx-auto"
          ></v-img>
        </v-col>
        <v-col cols="12">
          <v-img
            contain
            max-width="200"
            src="social/naver.png"
            @click="naverLogin"
            class="hover-pointer mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginData: {
        id: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await this.$axios.post('/login', {
          id: this.loginData.id,
          password: this.loginData.password
        })
        // 서버로부터의 응답 처리
        console.log('Login response:', response.data)

        // 로그인 성공 후 Vuex Store의 Mutation 호출
        if (response.data.accessToken) {
          this.$store.commit('setAccessToken', response.data.accessToken);
        }

        if (response.data.refreshToken) {
          this.$store.commit('setRefreshToken', response.data.refreshToken);
        }

        //
        console.log('accessToken : ', this.$store.state.accessToken);

        // 로그인 성공 후의 처리
      } catch (error) {
        console.error('Login failed', error)
        // 로그인 실패 시의 처리
      }
    },
    async googleLogin () {
      // 구글 로그인 로직 작성
    },
    async kakaoLogin () {
      // 카카오 로그인 로직 작성
    },
    async naverLogin () {
      // 네이버 로그인 로직 작성
    }
  }
}
</script>
