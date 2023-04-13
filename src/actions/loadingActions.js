export const LOADING = 'loading:true';
export const NOT_LOADING = 'loading:false';

export function loading(){
    return {
        type: LOADING
    }
};

export function notLoading(){
    return {
        type: NOT_LOADING
    }
};
