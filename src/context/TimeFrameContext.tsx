import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { getDateRange } from '../utils/timeframe';

export type TimeFrame = {
  type: 'today' | 'week' | 'month' | 'year' | 'ytd' | 'custom';
  start?: Date;
  end?: Date;
};

type TimeFrameContextType = {
  timeFrame: TimeFrame;
  setTimeFrame: (frame: TimeFrame) => void;
  dateRange: { start: Date; end: Date };
};

const TimeFrameContext = createContext<TimeFrameContextType | undefined>(undefined);

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

  const dateRange = useMemo(() => getDateRange(timeFrame), [timeFrame]);

  return (
    <TimeFrameContext.Provider value={{ timeFrame, setTimeFrame, dateRange }}>
      {children}
    </TimeFrameContext.Provider>
  );
}

export const useTimeFrame = () => {
  const context = useContext(TimeFrameContext);
  if (!context) throw new Error('useTimeFrame must be used within TimeFrameProvider');
  return context;
};
