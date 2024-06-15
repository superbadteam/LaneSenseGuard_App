import { fetchWrapper } from '@/https/fetchWrapper';

export const buyPack = async (data: any): Promise<any> => {
    return fetchWrapper.post(`/payment`, data);
}
