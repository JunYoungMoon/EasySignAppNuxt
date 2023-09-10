// middleware/auth.js

export default async function (context) {
    // 페이지 로딩 시 실행
    await fetchCsrfToken(context);
    await checkAuth(context, 'accessToken');
}

function ajaxRequest(context, url, method, data) {
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

    context.$axios(axiosConfig)
        .then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                switch (response.status) {
                    case 400:
                        console.error('Bad Request:', response.data);
                        // 400 Bad Request에 대한 처리 코드 추가
                        break;
                    case 401:
                        console.error('Unauthorized:', response.data);
                        // 401 Unauthorized에 대한 처리 코드 추가
                        break;
                    case 403:
                        console.error('Forbidden:', response.data);
                        // 403 Forbidden에 대한 처리 코드 추가
                        break;
                    default:
                        console.error('Request failed with status:', response.status);
                    // 다른 상태 코드에 대한 처리 코드 추가
                }
            }
        })
        .catch((error) => {
            console.error('Request error:', error);
        });
}


async function fetchCsrfToken(context) {
    try {
        // 미들웨어 시작 시 로딩 표시
        console.log('Loading...');

        // CSRF 토큰 요청
        const response = await context.$axios.$get('/getcsrf');
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

async function checkAuth(context, tokenType) {
    let token;
    if (tokenType === 'accessToken') {
        token = getCookie('accessToken');
    } else if (tokenType === 'refreshToken') {
        token = getCookie('refreshToken');
    } else {
        console.error('Invalid tokenType:', tokenType);
        return;
    }

    const csrfToken = getCookie('XSRF-TOKEN');

    try {
        const res = await ajaxRequest(context, '/check-auth', 'POST', {
            token,
            csrfToken,
        });

        if (tokenType === 'accessToken' && res === 'Refresh token required') {
            await checkAuth(context, 'refreshToken');
            return false;
        }

        const headerElement = document.getElementById('header');

        if (tokenType === 'refreshToken') {
            const token = JSON.parse(res);

            setSessionCookie("accessToken", token.accessToken);
            setSessionCookie("refreshToken", token.refreshToken);

            headerElement.innerHTML = '<div>로그인 상태 입니다.</div>';
        } else {
            headerElement.innerHTML = res;
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
    }
}

function setSessionCookie(name, value) {
    document.cookie = name + "=" + value + ";path=/";
}

// Function to retrieve a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}
