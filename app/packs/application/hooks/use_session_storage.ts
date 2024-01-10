import { useStorage } from "./use_storage";

export const useSessionStorage = (key: string) => useStorage(sessionStorage, key);
