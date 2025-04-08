import { useState } from 'react';
import { TextField, Card, CardContent, Typography, Chip, Stack, Box } from '@mui/material';
import { useData } from '../context/DataContext';

export function Timeline() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const { entries, filterTag, setFilterTag } = useData();

  const sortedEntries = [...entries].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  const filteredEntries = filterTag
    ? sortedEntries.filter(entry => entry.tags.includes(filterTag))
    : sortedEntries;

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <TextField
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        sx={{ maxWidth: 200 }}
      />
      
      <Stack spacing={2}>
        {filteredEntries.map(entry => (
          <Card key={entry.id} variant="outlined">
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {entry.timestamp.toLocaleString()}
              </Typography>
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
        ))}
      </Stack>
    </Stack>
  );
}