import { fetchWrapper } from '@/https/fetchWrapper';

export const getFilters = async (): Promise<any> => {
    return fetchWrapper.get(`/filters`);
}

export const updateFilters = async (id: string, data: any): Promise<any> => {
    return fetchWrapper.patch(`/filters/${id}`, data);
}

export const createNewFilter = async (data: any): Promise<any> => {
    return fetchWrapper.post(`/filters`, data);
}

export const getFilter = async (id: string): Promise<any> => {
    return fetchWrapper.get(`/filters/${id}`);
}