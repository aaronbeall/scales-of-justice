import { Home } from './pages/Home';
import { Timeline } from './pages/Timeline';
import { Charts } from './pages/Charts';
import { Calendar } from './pages/Calendar';
import { Data } from './pages/Data';
import { Typography } from '@mui/material';
import { PageLayout } from './components/PageLayout';

export const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/timeline',
    element: <Timeline />,
  },
  {
    path: '/charts',
    element: <Charts />,
  },
  {
    path: '/calendar',
    element: <Calendar />,
  },
  {
    path: '/data',
    element: <Data />,
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