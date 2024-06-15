import { fetchWrapper } from '@/https/fetchWrapper';

export const upload = async (data: any): Promise<any> => {
    return fetchWrapper.postFd(`/media/upload`, data);
}