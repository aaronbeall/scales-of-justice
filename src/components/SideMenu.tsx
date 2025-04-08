import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, Divider, Box, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Timeline as TimelineIcon, 
  BarChart as ChartIcon,
  CalendarMonth as CalendarIcon,
  Storage as DataIcon,
  Settings as SettingsIcon,
  Info as AboutIcon,
  Feedback as FeedbackIcon
} from '@mui/icons-material';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export function SideMenu({ open, onClose }: SideMenuProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/'} 
            onClick={() => { navigate('/'); onClose(); }}
          >
            <ListItemIcon sx={{ color: 'text.secondary' }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/timeline'} 
            onClick={() => { navigate('/timeline'); onClose(); }}
          >
            <ListItemIcon sx={{ color: 'text.secondary' }}>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Timeline" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/charts'} 
            onClick={() => { navigate('/charts'); onClose(); }}
          >
            <ListItemIcon sx={{ color: 'text.secondary' }}>
              <ChartIcon />
            </ListItemIcon>
            <ListItemText primary="Charts" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/calendar'} 
            onClick={() => { navigate('/calendar'); onClose(); }}
          >
            <ListItemIcon sx={{ color: 'text.secondary' }}>
              <CalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Calendar" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/data'} 
            onClick={() => { navigate('/data'); onClose(); }}
          >
            <ListItemIcon sx={{ color: 'text.secondary' }}>
              <DataIcon />
            </ListItemIcon>
            <ListItemText primary="Data" />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/settings'}
            onClick={() => { navigate('/settings'); onClose(); }}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Settings" 
              primaryTypographyProps={{ 
                variant: 'body2',
                color: 'inherit'
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/about'}
            onClick={() => { navigate('/about'); onClose(); }}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <AboutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="About" 
              primaryTypographyProps={{ 
                variant: 'body2',
                color: 'inherit'
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton 
            selected={location.pathname === '/feedback'}
            onClick={() => { navigate('/feedback'); onClose(); }}
            sx={{ color: 'text.secondary' }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Feedback" 
              primaryTypographyProps={{ 
                variant: 'body2',
                color: 'inherit'
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {isDesktop ? (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar /> {/* Add spacing for AppBar */}
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: 240 },
          }}
        >
          <Toolbar /> {/* Add spacing for AppBar */}
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}