// middleware/auth.js

export default async function (app) {
    // 페이지 로딩 시 실행
    await fetchCsrfToken(app);
    await checkAuth(app, 'accessToken');
}

function ajaxRequest(app, url, method, data) {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (data) {
        if (data.token) {
            headers.Authorization = `Bearer ${data.token}`;
        }
        if (data.csrfToken) {
            headers['X-XSRF-TOKEN'] = data.csrfToken;
        }
    }

    const axiosConfig = {
        method,
        url,
        headers,
        data, // POST 요청 시 데이터를 본문에 추가
    };

    return new Promise((resolve, reject) => {
        app.$axios(axiosConfig)
            .then((response) => {
                if (response.status === 200) {
                    resolve(response.data);
                } else {
                    switch (response.status) {
                        case 400:
                            // 에러 객체를 생성하여 전달
                            reject(new Error('Bad Request: ' + response.data));
                            break;
                        case 401:
                            reject(new Error('Unauthorized: ' + response.data));
                            break;
                        case 403:
                            reject(new Error('Forbidden: ' + response.data));
                            break;
                        default:
                            reject(new Error('Request failed with status: ' + response.status));
                    }
                }
            })
            .catch((error) => {
                // Axios 오류 처리
                reject(new Error('Request error: ' + error));
            });
    });
}


async function fetchCsrfToken(app) {
    try {
        // 미들웨어 시작 시 로딩 표시
        console.log('Loading...');

        // CSRF 토큰 요청
        const response = await app.$axios.$get('/getcsrf');
        const tokenInfo = response.token;

        console.log('CSRF token stored in Cookies:', tokenInfo);

        // 여기에서 필요한 작업 수행

        // 로딩 완료
        console.log('Loading finished.');
    } catch (error) {
        console.error('Error fetching CSRF token:', error);

        // 로딩 완료
        console.log('Loading finished.');
    }
}

async function checkAuth(app, tokenType) {
    let token;
    if (tokenType === 'accessToken') {
        token = app.$cookies.get('accessToken');
    } else if (tokenType === 'refreshToken') {
        token = app.$cookies.get('refreshToken');
    } else {
        console.error('Invalid tokenType:', tokenType);
        return;
    }

    const csrfToken = app.$cookies.get('XSRF-TOKEN');

    try {
        const res = await ajaxRequest(app, '/check-auth', 'POST', {
            token,
            csrfToken,
        });

        if (tokenType === 'accessToken' && res === 'Refresh token required') {
            await checkAuth(app, 'refreshToken');
            return false;
        }

        return {res};
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
}
