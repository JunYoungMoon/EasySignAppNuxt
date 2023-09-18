<template>
  <v-container>
    <!-- 상단에 프로필 이미지 표시 -->
    <v-row justify="center">
      <v-avatar size="150" class="ma-3">
        <v-img
          v-if="userInfo && userInfo.profileImage" :src="userInfo.profileImage"
          alt="Default Profile"
        >
          <!-- 카메라 아이콘 -->
          <v-avatar
            size="40"
            class="camera-icon"
            v-if="!isUploading"
            @click="openFileUploadDialog"
          >
            <v-icon color="white">mdi-camera</v-icon>
          </v-avatar>
        </v-img>
      </v-avatar>
      <!-- 파일 업로드 input -->
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="handleFileUpload"
      />
    </v-row>

    <!-- 이름, 닉네임, 이메일 정보 표시 -->
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-card-title>내 정보</v-card-title>
          <v-card-text>
            <div>
              <strong>이름:</strong> {{ userInfo.name }}
            </div>
            <v-divider class="my-3"></v-divider>
            <div>
              <strong>닉네임:</strong> test
              <v-btn icon @click="editNickname">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </div>
            <v-divider class="my-3"></v-divider>
            <div>
              <strong>이메일:</strong> {{ userInfo.email }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn
        elevation="6"
        large
        class="ma-2"
        :loading="loading"
        :disabled="!isButtonEnabled"
        @click="handleButtonClick"
      >
        <strong>변경</strong>
        <template v-slot:loader>
          <span>변경중...</span>
        </template>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },

  asyncData({store, redirect}) {
    // store에서 authResult 값을 가져옴
    const authResult = store.state.authResult;

    // authResult가 false이면 /login으로 리디렉션
    if (!authResult) {
      redirect('/login');
    }
  },
  data() {
    return {
      isButtonEnabled: false, // 초기에 버튼을 비활성화
      loader: null,
      loading: false,
      authResult: this.$store.state.authResult,
      userInfo: this.$store.state.userInfo,
      isUploading: false,
      profileImage: require('@/assets/images/empty_avatar.png'), // 상대 경로 사용
    };
  },
  methods: {
    handleButtonClick() {
      // 버튼 클릭 이벤트 핸들러
      if (!this.loading) {
        // 변경 작업을 시작
        this.loading = true;
        // 여기에서 변경 작업을 수행하거나 비동기 작업을 시작

        // 변경 작업이 완료되면 다시 버튼을 활성화
        // 예를 들어 비동기 작업이 끝나면 다음과 같이 loading을 다시 false로 설정
        // this.loading = false;
      }
    },
    editNickname() {
      // 닉네임 편집 로직
      // 사용자의 닉네임을 편집하는 대화 상자 또는 폼을 열 수 있습니다.
      // 사용자의 입력을 받아서 this.userInfo.nickname 값을 업데이트하세요.
      // this.userInfo.nickname = 'NEW_NICKNAME';
    },
    openFileUploadDialog() {
      // 파일 업로드 input 열기
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      // 파일 업로드 처리 로직
      const file = event.target.files[0];
      if (file) {

      }
    }
  }
};
</script>

<style>
.camera-icon {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
