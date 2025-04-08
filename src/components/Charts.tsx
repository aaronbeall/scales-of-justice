import { useMemo } from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { useData } from '../context/DataContext';

export function Charts() {
  const { entries } = useData();

  const chartData = useMemo(() => {
    const metrics = new Map<string, Array<{ date: Date; value: number }>>();
    
    entries.forEach(entry => {
      entry.metrics.forEach(metric => {
        const key = `${metric.category}_${metric.unit}`;
        if (!metrics.has(key)) {
          metrics.set(key, []);
        }
        metrics.get(key)?.push({
          date: entry.timestamp,
          value: metric.value
        });
      });
    });

    return Array.from(metrics.entries()).map(([key, values]) => ({
      id: key,
      data: values.sort((a, b) => a.date.getTime() - b.date.getTime())
    }));
  }, [entries]);

  if (chartData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No metrics data available</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} sx={{ width: '100%' }}>
      {chartData.map(dataset => (
        <Grid item xs={12} md={6} key={dataset.id}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {dataset.id.replace('_', ' ')}
            </Typography>
            <Box sx={{ height: 200, position: 'relative' }}>
              <svg viewBox="0 0 400 200" style={{ width: '100%', height: '100%' }}>
                {dataset.data.length > 1 && (
                  <polyline
                    points={dataset.data
                      .map((point, i) => {
                        const x = (i / (dataset.data.length - 1)) * 380 + 10;
                        const min = Math.min(...dataset.data.map(d => d.value));
                        const max = Math.max(...dataset.data.map(d => d.value));
                        const y = 190 - ((point.value - min) / (max - min)) * 180;
                        return `${x},${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {dataset.data[0].date.toLocaleDateString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {dataset.data[dataset.data.length - 1].date.toLocaleDateString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}