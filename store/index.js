// store/index.js

export const state = () => ({
  authResult: false, // 인증 결과를 저장하는 상태
  userInfo: null, // 유저 정보를 저장하는 상태
});

export const mutations = {
  setAuthResult(state, result) {
    state.authResult = result;
  },
  setUserInfo(state, result) {
    state.userInfo = result;
  }
};

export const actions = {
  // 필요한 액션들을 정의할 수 있음
  nuxtServerInit({commit}, {req}) {
    // console.log(commit);
    // console.log(req);
    const cookies = req.headers.cookie;
    console.log(cookies);
  }
};
