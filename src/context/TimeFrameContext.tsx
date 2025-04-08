import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TimeFrame = {
  type: 'today' | 'week' | 'month' | 'year' | 'ytd' | 'custom';
  start?: Date;
  end?: Date;
};

type TimeFrameContextType = {
  timeFrame: TimeFrame;
  setTimeFrame: (frame: TimeFrame) => void;
};

const TimeFrameContext = createContext<TimeFrameContextType | undefined>(undefined);

const getStartDate = (type: TimeFrame['type']): Date => {
  const now = new Date();
  switch (type) {
    case 'today':
      return new Date(now.setHours(0, 0, 0, 0));
    case 'week':
      return new Date(now.setDate(now.getDate() - 7));
    case 'month':
      return new Date(now.setMonth(now.getMonth() - 1));
    case 'year':
      return new Date(now.setFullYear(now.getFullYear() - 1));
    case 'ytd':
      return new Date(now.getFullYear(), 0, 1);
    default:
      return now;
  }
};

export function TimeFrameProvider({ children }: { children: ReactNode }) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(() => {
    const saved = localStorage.getItem('timeFrame');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        start: parsed.start ? new Date(parsed.start) : undefined,
        end: parsed.end ? new Date(parsed.end) : undefined,
      };
    }
    return { type: 'month' };
  });

  useEffect(() => {
    localStorage.setItem('timeFrame', JSON.stringify(timeFrame));
  }, [timeFrame]);

  return (
    <TimeFrameContext.Provider value={{ timeFrame, setTimeFrame }}>
      {children}
    </TimeFrameContext.Provider>
  );
}

export const useTimeFrame = () => {
  const context = useContext(TimeFrameContext);
  if (!context) throw new Error('useTimeFrame must be used within TimeFrameProvider');
  return context;
};
