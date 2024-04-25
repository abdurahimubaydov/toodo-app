export const setTodosStorage = async (key: string, value: string) => {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    };
};


export const getTodosFromStorage = (key: string) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error(error);
        return null;
    };
};