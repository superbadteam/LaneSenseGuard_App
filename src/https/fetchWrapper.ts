/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore, useUserStore } from '@/stores';
const baseUrl = `${import.meta.env.VITE_API_URL}`;
export type BaseResponse<T> = {
    data: T;
    status: string;
};
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE'),
    patch: request('PATCH'),
    postFd: request('POST', 'multipart/form-data'),
};

function request<T>(method: string, type: 'application/json' | 'multipart/form-data' = 'application/json') {
    return (url: string, body?: T) => {
        const BASE_URL = `${import.meta.env.VITE_API_URL}` + url;
        const requestOptions: any = {
            method,
            headers: authHeader(BASE_URL, type),
        };
        if (body) {
            // requestOptions.body = JSON.stringify(body);
            requestOptions.body = type === 'multipart/form-data' ? body : JSON.stringify(body);
        }
        return fetch(BASE_URL, requestOptions).then((resp) =>
            handleResponse({ BASE_URL, requestOptions }, resp),
        );
    };
}

// helper functions

function authHeader(url: string, type?: 'application/json' | 'multipart/form-data') {
    // return auth header with jwt if user is logged in and request is to the api url
    const { token } = useUserStore();
    // const isLoggedIn = !!user?.token;
    const isLoggedIn = token.access;
    const isApiUrl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${token.access}`, 'Content-Type': type };
    } else {
        return { 'Content-Type': type };
    }
}

const whiteList = () => {
    return ['/auth/login'].map((u) => baseUrl + u);
};
function handleResponse(request: any, response: Response): any {
    return response.text().then(async (text: any) => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const userStore = useUserStore();
            const { logout } = useAuthStore();
            let responseRefreshToken: any = null;
            console.log('fetchWrapper', response);
            if ([401].includes(response.status) && !whiteList().includes(response.url)) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                const refresh_token = localStorage.getItem('refresh_token') as string;
                if (!refresh_token) {
                    console.log('LOG: Refresh token not found.');
                    logout();
                } else {
                    try {
                        responseRefreshToken = await fetch(`${baseUrl}/auth/refresh`, {
                            method: 'POST',
                            body: JSON.stringify({
                                refresh_token,
                            }),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        const data = await getRawResponse(responseRefreshToken);
                        localStorage.setItem('refresh_token', data.refreshToken);
                        userStore.setToken(data.data.access_token);
                    } catch (error) {
                        logout();
                        return Promise.reject(error);
                    }
                }
            }

            if ([401].includes(responseRefreshToken?.status)) {
                logout();
            }

            if (responseRefreshToken?.status?.toString()?.startsWith('2') && request) {
                const newOption = { ...request.requestOptions, headers: authHeader(request.url) };
                const r = await fetch(request.url, newOption);
                return handleResponse(null, r);
            }
            const error =
               data ||
                response.statusText;
            console.log(data);
            return Promise.reject(error);
        }
        return data;
    });
}

async function getRawResponse(response: any) {
    return response.text().then(async (text: any) => {
        const data = text && JSON.parse(text);
        return data;
    });
}
