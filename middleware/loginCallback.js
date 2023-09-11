// middleware/loginCallback.js

export default function ({app, route, redirect}) {
    // 미들웨어가 적용될 페이지 경로를 지정합니다.
    const pagesWithMiddleware = ['/loginCallback']; // 미들웨어를 적용할 페이지 목록

    // 현재 페이지의 경로를 가져옵니다.
    const currentPath = route.path;

    // 현재 페이지가 미들웨어를 적용해야 하는 페이지 중 하나인 경우에만 실행합니다.
    if (pagesWithMiddleware.includes(currentPath)) {
        // URL에서 'token' 파라미터를 가져옵니다.
        const accessToken = route.query.accessToken;
        const refreshToken = route.query.refreshToken;

        // 'token' 파라미터가 존재하면 쿠키에 저장합니다.
        if (accessToken && refreshToken) {
            app.$cookies.set('accessToken', accessToken);
            app.$cookies.set('refreshToken', refreshToken);

            // "/" 페이지로 이동합니다.
            return redirect('/');
        }
    }
}
