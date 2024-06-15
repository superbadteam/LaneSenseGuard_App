import { fetchWrapper } from '@/https/fetchWrapper';
import type { ICategory } from '@/types/category';

export const getCategories = async (): Promise<ICategory[]> => {
    return fetchWrapper.get(`/categories`);
}

export const getCategory = async (id: string): Promise<ICategory> => {
    return fetchWrapper.get(`/categories/${id}`);
}

export const createCategory = async (category: any): Promise<ICategory> => {
    return fetchWrapper.post(`/categories`, category);
}

export const updateCategory = async (category: any): Promise<ICategory> => {
    return fetchWrapper.put(`/categories/${category.id}`, category);
}

export const deleteCategory = async (id: string): Promise<any> => {
    return fetchWrapper.delete(`/categories/${id}`);
}