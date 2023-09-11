// middleware/tokenMiddleware.js

export default function ({app, store, route}) {
    // URL에서 'token' 파라미터를 가져옵니다.
    const token = route.query.token;

    // 'token' 파라미터가 존재하면 Vuex 스토어에 저장합니다.
    if (token) {
        store.commit('setToken', token); // Vuex 스토어에 토큰 저장
    }

    app.$cookies.set('accessToken', route.query.accessToken);
    app.$cookies.set('refreshToken', route.query.refreshToken);

    // "/"로 리다이렉트합니다.
    // return redirect('/');

}
