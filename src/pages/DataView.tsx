import { PageLayout } from '../components/PageLayout';
import { Grid, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useData } from '../context/DataContext';
import { FilterList } from '../components/FilterList';
import { Entry } from '../types';
import { useState } from 'react';
import { useTimeFrame } from '../context/TimeFrameContext';
import { isWithinInterval } from 'date-fns';

export function DataView() {
  const { entries } = useData();
  const { dateRange } = useTimeFrame();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  const filteredEntries = entries.filter(entry => {
    const matchesTimeFrame = isWithinInterval(entry.timestamp, dateRange);
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => entry.tags.includes(tag));
    const matchesMetrics = selectedMetrics.length === 0 ||
      selectedMetrics.every(unit => entry.metrics.some(m => m.unit === unit));
    return matchesTimeFrame && matchesTags && matchesMetrics;
  });

  const columns: GridColDef<Entry>[] = [
    { 
      field: 'timestamp', 
      headerName: 'Date', 
      width: 180,
      valueFormatter: (value: Entry["timestamp"]) => value.toLocaleString()
    },
    { 
      field: 'text', 
      headerName: 'Content',
      flex: 1,
      minWidth: 300
    },
    { 
      field: 'tags', 
      headerName: 'Tags', 
      width: 200,
      valueFormatter: (value: Entry["tags"]) => value.map(tag => `#${tag}`).join(', ')
    },
    { 
      field: 'metrics', 
      headerName: 'Metrics', 
      width: 200,
      valueFormatter: (value: Entry["metrics"]) => value
        .map(m => `${m.value} ${m.unit}`)
        .join(', ')
    }
  ];

  const tagItems = Array.from(new Set(entries.flatMap(entry => entry.tags)))
    .map(tag => ({
      id: tag,
      label: tag,
      count: entries.filter(entry => entry.tags.includes(tag)).length
    }));

  const metricItems = Object.entries(entries.reduce((acc, entry) => {
    entry.metrics.forEach(m => {
      if (!acc[m.unit]) acc[m.unit] = new Set();
      acc[m.unit].add(entry.id);
    });
    return acc;
  }, {} as Record<string, Set<string>>))
    .map(([unit, entryIds]) => ({
      id: unit,
      label: unit,
      count: entryIds.size
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <PageLayout>
      <Grid container spacing={3} sx={{ height: 'calc(100vh - 80px)', p: 2 }} columns={12}>
        <Grid size={{ xs: 12, lg: 9 }} sx={{ height: '100%' }}>
          <Paper sx={{ height: '100%', overflow: 'hidden' }}>
            <DataGrid
              rows={filteredEntries}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 25 } },
                sorting: {
                  sortModel: [{ field: 'timestamp', sort: 'desc' }],
                },
              }}
              pageSizeOptions={[10, 25, 50, 100]}
              disableRowSelectionOnClick
              getRowHeight={() => 'auto'}
              sx={{ width: '100%', height: '100%' }}
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }} sx={{ height: '100%' }}>
          <Grid container direction="column" spacing={3} sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <Paper sx={{ height: '100%', overflow: 'auto' }}>
                <FilterList
                  title="Tags"
                  items={tagItems}
                  selectedItems={selectedTags}
                  onSelectionChange={setSelectedTags}
                  formatLabel={tag => `#${tag}`}
                />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <Paper sx={{ height: '100%', overflow: 'auto' }}>
                <FilterList
                  title="Metrics"
                  items={metricItems}
                  selectedItems={selectedMetrics}
                  onSelectionChange={setSelectedMetrics}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  );
}