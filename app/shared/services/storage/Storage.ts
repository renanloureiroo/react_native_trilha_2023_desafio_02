export interface IStorage {
  save(id: string, data: any): Promise<void>;
  get(id: string): Promise<any>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}
