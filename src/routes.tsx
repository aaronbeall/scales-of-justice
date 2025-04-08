import { HomeView } from './pages/HomeView';
import { TimelineView } from './pages/TimelineView';
import { ChartsView } from './pages/ChartsView';
import { CalendarView } from './pages/CalendarView';
import { DataView } from './pages/DataView';
import { Typography } from '@mui/material';
import { PageLayout } from './components/PageLayout';

export const routes = [
  {
    path: '/',
    element: <HomeView />,
  },
  {
    path: '/timeline',
    element: <TimelineView />,
  },
  {
    path: '/charts',
    element: <ChartsView />,
  },
  {
    path: '/calendar',
    element: <CalendarView />,
  },
  {
    path: '/data',
    element: <DataView />,
  },
  {
    path: '/settings',
    element: <PageLayout>
      <Typography>Settings content coming soon</Typography>
    </PageLayout>,
  },
  {
    path: '/about',
    element: <PageLayout>
      <Typography>About Data Tracker</Typography>
    </PageLayout>,
  },
  {
    path: '/feedback',
    element: <PageLayout>
      <Typography>Feedback form coming soon</Typography>
    </PageLayout>,
  },
];