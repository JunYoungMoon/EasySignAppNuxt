// middleware/theme.js

export default function (app) {
  console.log(app);
  // 사용자의 환경에 따라 테마 설정을 동적으로 변경합니다.
  const userTheme = app.$cookies.get('theme'); // 쿠키에서 사용자 설정을 가져옴

  // 사용자 설정이 있으면 테마를 변경합니다.
  if (userTheme === 'light') {
    app.$vuetify.theme.isDark = false;
  } else if (userTheme === 'dark') {
    app.$vuetify.theme.isDark = true;
  } else {
    // 사용자 설정이 없으면 초기 설정 값 유지
    app.$vuetify.theme.isDark = true; // 예: 초기 설정이 어두운 테마인 경우
  }
}
