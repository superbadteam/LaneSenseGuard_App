import { fetchWrapper } from '@/https/fetchWrapper';

export const getDailyActivities = async (): Promise<any> => {
    return fetchWrapper.get(`/activities/daily`);
}

export const getActivities = async (): Promise<any> => {
    return fetchWrapper.get(`/activities`);
}

export const getActivitiesByUser = async (userId: string): Promise<any> => {
    return fetchWrapper.get(`/activities/${userId}`);
}