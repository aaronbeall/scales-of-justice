import { useState, useMemo } from 'react';
import { Box, CssBaseline, IconButton, AppBar, Toolbar, Typography, useMediaQuery, createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { SideMenu } from './components/SideMenu';
import { routes } from './routes';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') as 'light' | 'dark' || (prefersDarkMode ? 'dark' : 'light')
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <DataProvider>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={() => setDrawerOpen(!drawerOpen)}
                  sx={{ mr: 2, display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                <Box component="img" src="/logo.svg" sx={{ height: 32, width: 32, mr: 2 }} />
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  Data Tracker
                </Typography>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={() => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))}
                  color="inherit"
                >
                  {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Toolbar>
            </AppBar>

            <SideMenu
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            />

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 2, md: 3 },
                width: '100%',
                mt: 8,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Routes>
                {routes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Box>
          </Box>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
