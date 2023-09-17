<template>
  <v-container>
    <!-- 상단에 프로필 이미지 표시 -->
    <v-row justify="center">
      <v-avatar size="150">
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
  </v-container>
</template>

<script>
export default {
  asyncData({store, redirect}){
    // store에서 authResult 값을 가져옴
    const authResult = store.state.authResult;

    // authResult가 false이면 /login으로 리디렉션
    if (!authResult) {
      redirect('/login');
    }
  },
  data() {
    return {
      authResult: this.$store.state.authResult,
      userInfo: this.$store.state.userInfo,
      isUploading: false,
      profileImage: require('@/assets/images/empty_avatar.png'), // 상대 경로 사용
    };
  },
  methods: {
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
        // 파일 업로드 로직을 구현하세요.
        // 업로드 후 this.profileImage에 새로운 이미지 URL을 할당하세요.
        // this.profileImage = 'NEW_IMAGE_URL';
        this.isUploading = true;
        setTimeout(() => {
          // 업로드 시뮬레이션
          this.profileImage = 'NEW_IMAGE_URL';
          this.isUploading = false;
        }, 2000);
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
</style>
