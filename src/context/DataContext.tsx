import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DataStore } from '../services/db';
import type { Entry } from '../types';

interface DataContextType {
  entries: Entry[];
  addEntry: (text: string) => Promise<void>;
  filterTag: string;
  setFilterTag: (tag: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);
const dataStore = new DataStore();

export function DataProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filterTag, setFilterTag] = useState('');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const loadedEntries = await dataStore.getAllEntries();
    setEntries(loadedEntries);
  };

  const parseEntry = (text: string) => {
    const tags = Array.from(text.matchAll(/#(\w+)/g)).map(match => match[1]);
    const metrics = Array.from(text.matchAll(/(\d+\.?\d*)\s*(\w+)/g))
      .map(match => ({
        value: parseFloat(match[1]),
        unit: match[2],
        category: 'uncategorized'
      }));
    
    return {
      id: crypto.randomUUID(),
      text,
      timestamp: new Date(),
      tags,
      metrics,
      categories: [...new Set(metrics.map(m => m.category))]
    };
  };

  const addEntry = async (text: string) => {
    const newEntry = parseEntry(text);
    await dataStore.addEntry(newEntry);
    setEntries(prev => [...prev, newEntry]);
  };

  return (
    <DataContext.Provider value={{ entries, addEntry, filterTag, setFilterTag }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}