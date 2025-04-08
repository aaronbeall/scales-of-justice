import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import LabTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useData } from '../context/DataContext';
import { useTimeFrame } from '../context/TimeFrameContext';
import { isWithinInterval, format } from 'date-fns';

export function Timeline() {
  const { entries, filterTag, setFilterTag } = useData();
  const { dateRange } = useTimeFrame();

  const sortedEntries = [...entries].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  const filteredEntries = sortedEntries
    .filter(entry => isWithinInterval(entry.timestamp, dateRange))
    .filter(entry => !filterTag || entry.tags.includes(filterTag));

  const isFirstOfDay = (entry: typeof entries[0], index: number) => {
    if (index === 0) return true;
    const prevEntry = filteredEntries[index - 1];
    return format(entry.timestamp, 'yyyy-MM-dd') !== format(prevEntry.timestamp, 'yyyy-MM-dd');
  };

  return (
    <LabTimeline>
      {filteredEntries.map((entry, index) => (
        <TimelineItem key={entry.id}>
          <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.2 }}>
            {isFirstOfDay(entry, index) ? (
              <>
                <Typography variant="body2">
                  {format(entry.timestamp, 'MMM d, yyyy')}
                </Typography>
                <Typography variant="body2">
                  {format(entry.timestamp, 'h:mm a')}
                </Typography>
              </>
            ) : (
              <Typography variant="body2">
                {format(entry.timestamp, 'h:mm a')}
              </Typography>
            )}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {entry.text}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                  {entry.tags.map(tag => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      onClick={() => setFilterTag(tag)}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  ))}
                </Box>
                {entry.metrics.length > 0 && (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {entry.metrics.map((metric, index) => (
                      <Chip
                        key={index}
                        label={`${metric.value} ${metric.unit}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </TimelineContent>
        </TimelineItem>
      ))}
    </LabTimeline>
  );
}