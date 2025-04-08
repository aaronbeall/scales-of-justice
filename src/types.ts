export interface Entry {
  id: string;
  text: string;
  timestamp: Date;
  tags: string[];
  metrics: Array<Metric>;
  categories: string[];
}

export interface Metric {
  value: number;
  unit: string;
}