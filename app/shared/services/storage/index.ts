import { IStorage } from "./Storage";
import { StorageAsyncStorage } from "./asyncStorage";

export const storage: IStorage = new StorageAsyncStorage();
