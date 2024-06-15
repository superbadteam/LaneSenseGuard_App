import { fetchWrapper } from '@/https/fetchWrapper';
import type { ISubscription } from '@/types/subscription';

// all user can get this, no need auth
export const getSubscriptions = async (): Promise<ISubscription[]> => {
    return fetchWrapper.get(`/subscriptions`);
}

export const getSubscription = async (id: string): Promise<ISubscription> => {
    return fetchWrapper.get(`/subscriptions/${id}`);
}

export const createSubscription = async (subscription: any): Promise<ISubscription> => {
    return fetchWrapper.post(`/subscriptions`, subscription);
}

export const updateSubscription = async (id: string, subscription: any): Promise<ISubscription> => {
    return fetchWrapper.put(`/subscriptions/${id}`, subscription);
}

export const deleteSubscription = async (id: string): Promise<any> => {
    return fetchWrapper.delete(`/subscriptions/${id}`);
}