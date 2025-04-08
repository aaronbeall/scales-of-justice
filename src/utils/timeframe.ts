import { startOfDay, subDays, startOfYear, endOfDay } from 'date-fns';
import { TimeFrame } from '../context/TimeFrameContext';

export const getDateRange = (timeFrame: TimeFrame): { start: Date; end: Date } => {
  const now = new Date();
  const end = endOfDay(now);

  if (timeFrame.type === 'custom' && timeFrame.start && timeFrame.end) {
    return {
      start: startOfDay(timeFrame.start),
      end: endOfDay(timeFrame.end)
    };
  }

  switch (timeFrame.type) {
    case 'today':
      return { start: startOfDay(now), end };
    case 'week':
      return { start: startOfDay(subDays(now, 7)), end };
    case 'month':
      return { start: startOfDay(subDays(now, 30)), end };
    case 'year':
      return { start: startOfDay(subDays(now, 365)), end };
    case 'ytd':
      return { start: startOfYear(now), end };
    case 'all':
      return { start: new Date(0), end };
    default:
      return { start: startOfDay(subDays(now, 30)), end };
  }
};
