import { fetchWrapper } from '@/https/fetchWrapper';

export const loginApi = async (email: string, password: string): Promise<any> => {
    return fetchWrapper.post(`/auth/login`, {
        email,
        password,
    });
};

export const signUpApi = async (email: string, password: string, name: string, gender: any, birthday: any): Promise<any> => {
    return fetchWrapper.post(`/auth/register`, {
        email,
        password,
        name,
        gender: gender,
        date_of_birth : birthday,
    });
}
