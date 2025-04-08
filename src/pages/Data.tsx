import { PageLayout } from '../components/PageLayout/PageLayout';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Badge, Paper, Box, Checkbox } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useData } from '../context/DataContext';
import { Entry } from '../types';
import { useState } from 'react';

export function Data() {
  const { entries } = useData();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  // Get unique tags and unit counts
  const uniqueTags = Array.from(new Set(entries.flatMap(entry => entry.tags)));

  const metricUnitCounts = entries.reduce((acc, entry) => {
    entry.metrics.forEach(m => {
      if (!acc[m.unit]) acc[m.unit] = new Set();
      acc[m.unit].add(entry.id);
    });
    return acc;
  }, {} as Record<string, Set<string>>);

  const unitStats = Object.entries(metricUnitCounts).map(([unit, entryIds]) => ({
    unit,
    count: entryIds.size
  })).sort((a, b) => b.count - a.count);

  const filteredEntries = entries.filter(entry => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => entry.tags.includes(tag));
    const matchesMetrics = selectedMetrics.length === 0 ||
      selectedMetrics.every(unit => entry.metrics.some(m => m.unit === unit));
    return matchesTags && matchesMetrics;
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

  const getTagCount = (tag: string) => {
    return entries.filter(entry => entry.tags.includes(tag)).length;
  };

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
                <Typography variant="h6" sx={{ p: 2, pb: 1 }}>Tags</Typography>
                <List dense sx={{ py: 0 }}>
                  {uniqueTags.map(tag => (
                    <ListItemButton 
                      key={tag}
                      selected={selectedTags.includes(tag)}
                      onClick={() => {
                        setSelectedTags(prev => 
                          prev.includes(tag)
                            ? prev.filter(t => t !== tag)
                            : [...prev, tag]
                        );
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectedTags.includes(tag)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {`#${tag}`}
                            <Badge 
                              badgeContent={getTagCount(tag)} 
                              color="primary" 
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
              <Paper sx={{ height: '100%', overflow: 'auto' }}>
                <Typography variant="h6" sx={{ p: 2, pb: 1 }}>Metrics</Typography>
                <List dense sx={{ py: 0 }}>
                  {unitStats.map(({ unit, count }) => (
                    <ListItemButton
                      key={unit}
                      selected={selectedMetrics.includes(unit)}
                      onClick={() => {
                        setSelectedMetrics(prev =>
                          prev.includes(unit)
                            ? prev.filter(m => m !== unit)
                            : [...prev, unit]
                        );
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={selectedMetrics.includes(unit)}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {unit}
                            <Badge 
                              badgeContent={count} 
                              color="primary" 
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageLayout>
  );
}