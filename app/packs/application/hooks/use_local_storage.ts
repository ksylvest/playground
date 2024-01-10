import { useStorage } from "./use_storage";

export const useLocalStorage = (key: string) => useStorage(localStorage, key);
