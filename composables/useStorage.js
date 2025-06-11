// composables/useStorage.js
export const useStorage = () => {
    const isClient = typeof window !== "undefined";

    const setItem = (key, value) => {
        if (isClient) {
            localStorage.setItem(key, value);
        }
    };

    const getItem = (key) => {
        if (isClient) {
            return localStorage.getItem(key);
        }
        return null;
    };

    const removeItem = (key) => {
        if (isClient) {
            localStorage.removeItem(key);
        }
    };

    return { setItem, getItem, removeItem };
};