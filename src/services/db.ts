import type { Entry } from '../types';

const DB_NAME = 'dataTracker';
const DB_VERSION = 1;
const STORE_NAME = 'entries';

export class DataStore {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      };
    });
  }

  async addEntry(entry: Entry): Promise<void> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(entry);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllEntries(): Promise<Entry[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getEntriesByTag(tag: string): Promise<Entry[]> {
    const entries = await this.getAllEntries();
    return entries.filter(entry => entry.tags.includes(tag));
  }

  async getEntriesByDateRange(start: Date, end: Date): Promise<Entry[]> {
    const entries = await this.getAllEntries();
    return entries.filter(entry => 
      entry.timestamp >= start && entry.timestamp <= end
    );
  }
}