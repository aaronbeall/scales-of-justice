import { Chip, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Button } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import { useTimeFrame, TimeFrame } from '../context/TimeFrameContext';
import { format } from 'date-fns';

const timeFrameOptions: { label: string; value: TimeFrame['type'] }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Last Week', value: 'week' },
  { label: 'Last Month', value: 'month' },
  { label: 'Last Year', value: 'year' },
  { label: 'Year to Date', value: 'ytd' },
  { label: 'Custom', value: 'custom' },
];

export function TimeFramePicker() {
  const { timeFrame, setTimeFrame } = useTimeFrame();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd] = useState<Date | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type: TimeFrame['type']) => {
    if (type === 'custom') {
      setCustomDialogOpen(true);
    } else {
      setTimeFrame({ type });
    }
    handleClose();
  };

  const handleCustomSave = () => {
    if (customStart && customEnd) {
      setTimeFrame({ type: 'custom', start: customStart, end: customEnd });
    }
    setCustomDialogOpen(false);
  };

  const getTimeFrameLabel = () => {
    if (timeFrame.type === 'custom' && timeFrame.start && timeFrame.end) {
      return `${format(timeFrame.start, 'MMM d')} - ${format(timeFrame.end, 'MMM d, yyyy')}`;
    }
    const option = timeFrameOptions.find(o => o.value === timeFrame.type);
    return option?.label || 'Select Time Frame';
  };

  return (
    <>
      <Chip
        icon={<CalendarTodayIcon />}
        label={getTimeFrameLabel()}
        onClick={handleClick}
        color="primary"
        variant="filled"
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {timeFrameOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      <Dialog open={customDialogOpen} onClose={() => setCustomDialogOpen(false)}>
        <DialogTitle>Custom Time Frame</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <DatePicker
                label="Start Date"
                value={customStart}
                onChange={(date) => setCustomStart(date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
              <DatePicker
                label="End Date"
                value={customEnd}
                onChange={(date) => setCustomEnd(date)}
                slotProps={{ textField: { fullWidth: true } }}
                minDate={customStart || undefined}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCustomSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
