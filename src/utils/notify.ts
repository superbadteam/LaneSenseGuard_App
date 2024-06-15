import { toast, type ToastOptions } from 'vue3-toastify';

type IOptions = ToastOptions;
export const notify = (message: string, data: IOptions) => {
    toast(message, data as ToastOptions);
};
