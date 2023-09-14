<template>

</template>

<script>
export default {
  async logout() {
    // 서버에 로그아웃 요청을 보낸 후
    // 클라이언트에서 쿠키를 제거합니다.

    // 쿠키에서 accessToken 제거
    this.$cookies.remove('accessToken');

    // 쿠키에서 refreshToken 제거 (있는 경우)
    this.$cookies.remove('refreshToken');

    // 로그아웃 후 원하는 페이지로 리다이렉트 (옵션)
    await this.$router.push('/');
  },
}
</script>
