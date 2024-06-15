import { fetchWrapper } from '@/https/fetchWrapper';

import type { IUser } from '@/types/user';

export const getInforApi = async (): Promise<IUser> => {
    return fetchWrapper.get(`/users/profile`)
}

export const getUsers = async (): Promise<IUser[]> => {
    return fetchWrapper.get(`/users`)
}

// activeUser: async (id) => {
//     return await axios1.patch(`/users/active/${id}`)
//   },
//   deactiveUser: async (id) => {
//     return await axios1.patch(`/users/deactive/${id}`)
//   },

export const activeUser = async (id: string): Promise<IUser> => {
    return fetchWrapper.patch(`/users/active/${id}`)
}

export const deactiveUser = async (id: string): Promise<IUser> => {
    return fetchWrapper.patch(`/users/deactive/${id}`)
}

export const getUser = async (id: string): Promise<IUser> => {
    return fetchWrapper.get(`/users/${id}`)
}

export const updateUser = async (data: any): Promise<IUser> => {
    return fetchWrapper.patch(`/users/update`, data)
}