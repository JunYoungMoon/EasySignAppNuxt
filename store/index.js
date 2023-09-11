// store/index.js

export const state = () => ({
    authResult: null, // 인증 결과를 저장하는 상태
    theme: 'dark', // 기본 테마를 'dark'로 설정
});

export const mutations = {
    setAuthResult(state, result) {
        state.authResult = result;
    },
    setTheme(state, theme) {
        state.theme = theme;
    },
};

export const actions = {
    // 필요한 액션들을 정의할 수 있음
};
