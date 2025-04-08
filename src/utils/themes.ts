import { ThemeOptions } from '@mui/material';

export type ThemeName = 'retrowave' | 'minimalist' | 'modern' | 'cyberpunk' | 'synthwave' | 'flux' | 'natural';
export type ThemeMode = 'light' | 'dark';
export type ThemeVariant = `${ThemeName}-${ThemeMode}`;

export interface Theme {
  name: ThemeName;
  options: (mode: ThemeMode) => ThemeOptions;
}

const palettes = {
  retrowave: {
    neonPink: '#ff2b9d',
    neonBlue: '#00d8ff',
    neonPurple: '#b537f2',
    darkPurple: '#290661',
    black: '#1f1f2e',      // Desaturated purple-gray
    deepBlack: '#15151e',  // Darker desaturated purple-gray
  },
  minimalist: {
    white: '#ffffff',
    offWhite: '#f7f7f7',
    lightGrey: '#e9ecef',
    grey: '#adb5bd',
    mediumGrey: '#6c757d',
    darkGrey: '#495057',
    black: '#212529',
    accent: '#90caf9',
  },
  modern: {
    primary: '#2196f3',
    secondary: '#ff4081',
    success: '#4caf50',
    background: '#121212',
    paper: '#1e1e1e',
  },
  cyberpunk: {
    neonPink: '#ff0080',       // Hot pink
    neonBlue: '#0ff4fc',       // Electric blue
    neonYellow: '#ffef00',     // Bright yellow
    purple: '#b000ff',         // Deep purple
    darkBlue: '#0d0221',       // Deep blue-black
    black: '#06010e',          // Almost black
    grey: '#7f7f98',          // Blue-tinted grey
  },
  flux: {
    sunset: '#ff7e5f',
    sunrise: '#feb47b',
    ocean: '#00c6fb',
    sky: '#005bea',
    twilight: '#30cfd0',
    dusk: '#330867',
  },
  natural: {
    sage: '#94a187',
    moss: '#5c715e',
    clay: '#b56357',
    earth: '#754f44',
    sand: '#dcd3c9',
    stone: '#48483a',
  },
  synthwave: {
    purple: '#9d4edd',
    deepPurple: '#6c1d9c',
    teal: '#2ec4b6',
    deepTeal: '#1a8a80',
    pink: '#ff006e',
    blue: '#3a0ca3',
    night: '#1a1a24',    // Desaturated blue-gray
    space: '#12121a',    // Darker desaturated blue-gray
  },
};

export const themes: Record<ThemeName, Theme> = {
  retrowave: {
    name: 'retrowave',
    options: (mode) => ({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? palettes.retrowave.neonPurple : palettes.retrowave.neonPink,
          contrastText: '#fff',
        },
        secondary: {
          main: palettes.retrowave.neonBlue,
          contrastText: '#fff',
        },
        background: {
          default: mode === 'light' ? '#ffffff' : palettes.retrowave.deepBlack,
          paper: mode === 'light' ? '#f8f9fa' : palettes.retrowave.black,
        },
        text: {
          primary: mode === 'light' ? palettes.retrowave.black : '#fff',
          secondary: mode === 'light' ? palettes.retrowave.darkPurple : palettes.retrowave.neonPink,
        },
      },
      components: {
        MuiChip: {
          styleOverrides: {
            root: {
              background: `linear-gradient(45deg, ${palettes.retrowave.neonPurple} 30%, ${palettes.retrowave.neonPink} 90%)`,
              color: '#fff',
              textShadow: mode === 'dark' ? '0 0 5px rgba(255,43,157,0.5)' : undefined,
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? `linear-gradient(45deg, ${palettes.retrowave.neonPurple} 30%, ${palettes.retrowave.neonPink} 90%)`
                : `linear-gradient(45deg, ${palettes.retrowave.darkPurple} 0%, ${palettes.retrowave.black} 100%)`,
              boxShadow: mode === 'dark' 
                ? `0 0 20px ${palettes.retrowave.darkPurple}`
                : undefined,
              borderBottom: mode === 'dark' 
                ? `1px solid ${palettes.retrowave.neonPink}`
                : undefined,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: `linear-gradient(45deg, ${palettes.retrowave.neonPurple} 30%, ${palettes.retrowave.neonPink} 90%)`,
              boxShadow: mode === 'dark' ? `0 0 10px ${palettes.retrowave.neonPink}` : undefined,
            },
          },
        },
      },
    }),
  },

  minimalist: {
    name: 'minimalist',
    options: (mode) => ({
      palette: {
        mode,
        primary: { 
          main: mode === 'light' ? palettes.minimalist.mediumGrey : palettes.minimalist.grey,
          contrastText: mode === 'light' ? palettes.minimalist.white : palettes.minimalist.black,
        },
        secondary: { 
          main: palettes.minimalist.accent,
          contrastText: palettes.minimalist.black,
        },
        background: {
          default: mode === 'light' ? palettes.minimalist.white : palettes.minimalist.black,
          paper: mode === 'light' ? palettes.minimalist.offWhite : palettes.minimalist.darkGrey,
        },
        text: {
          primary: mode === 'light' ? palettes.minimalist.darkGrey : palettes.minimalist.lightGrey,
          secondary: mode === 'light' ? palettes.minimalist.mediumGrey : palettes.minimalist.grey,
        },
      },
      typography: { fontFamily: "'Inter', sans-serif" },
      shape: { borderRadius: 2 },
    }),
  },

  modern: {
    name: 'modern',
    options: (mode) => ({
      palette: {
        mode,
        primary: { main: palettes.modern.primary },
        secondary: { main: palettes.modern.secondary },
        success: { main: palettes.modern.success },
        background: {
          default: mode === 'light' ? '#fff' : palettes.modern.background,
          paper: mode === 'light' ? '#fff' : palettes.modern.paper,
        },
        text: {
          primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
          secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
        },
      },
      shape: { borderRadius: 4 },
    }),
  },

  cyberpunk: {
    name: 'cyberpunk',
    options: (mode) => ({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? palettes.cyberpunk.purple : palettes.cyberpunk.neonBlue,
          contrastText: '#fff',
        },
        secondary: {
          main: palettes.cyberpunk.neonPink,
          contrastText: '#fff',
        },
        background: {
          default: mode === 'light' ? '#ffffff' : palettes.cyberpunk.black,
          paper: mode === 'light' ? '#f8f9fa' : palettes.cyberpunk.darkBlue,
        },
        text: {
          primary: mode === 'light' ? '#1a1a1a' : '#ffffff',
          secondary: mode === 'light' ? '#505050' : palettes.cyberpunk.grey,
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? `linear-gradient(135deg, ${palettes.cyberpunk.purple} 0%, ${palettes.cyberpunk.neonPink} 100%)`
                : palettes.cyberpunk.darkBlue,
              borderBottom: mode === 'dark' 
                ? `1px solid ${palettes.cyberpunk.neonBlue}`
                : undefined,
              boxShadow: mode === 'dark'
                ? `0 0 20px rgba(15, 244, 252, 0.15)`
                : undefined,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: mode === 'dark' 
                ? `linear-gradient(45deg, ${palettes.cyberpunk.neonBlue} 30%, ${palettes.cyberpunk.neonPink} 90%)`
                : undefined,
              boxShadow: mode === 'dark'
                ? `0 0 10px ${palettes.cyberpunk.neonBlue}`
                : undefined,
            },
            containedSecondary: {
              background: mode === 'dark'
                ? palettes.cyberpunk.neonPink
                : undefined,
              boxShadow: mode === 'dark'
                ? `0 0 10px ${palettes.cyberpunk.neonPink}`
                : undefined,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: mode === 'dark' ? {
              background: `linear-gradient(45deg, ${palettes.cyberpunk.neonBlue} 30%, ${palettes.cyberpunk.neonPink} 90%)`,
              boxShadow: `0 0 5px ${palettes.cyberpunk.neonBlue}`,
            } : undefined,
          },
        },
      },
    }),
  },

  synthwave: {
    name: 'synthwave',
    options: (mode) => ({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? palettes.synthwave.purple : palettes.synthwave.teal,
          contrastText: '#fff',
        },
        secondary: {
          main: mode === 'light' ? palettes.synthwave.teal : palettes.synthwave.pink,
          contrastText: '#fff',
        },
        background: {
          default: mode === 'light' ? '#ffffff' : palettes.synthwave.space,
          paper: mode === 'light' ? '#f8f9fa' : palettes.synthwave.night,
        },
        text: {
          primary: mode === 'light' ? palettes.synthwave.blue : '#fff',
          secondary: mode === 'light' ? palettes.synthwave.deepPurple : palettes.synthwave.teal,
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? `linear-gradient(135deg, ${palettes.synthwave.purple} 0%, ${palettes.synthwave.deepPurple} 100%)`
                : `linear-gradient(135deg, ${palettes.synthwave.space} 0%, ${palettes.synthwave.night} 100%)`,
              borderBottom: mode === 'dark' ? `1px solid ${palettes.synthwave.teal}` : 'none',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            containedPrimary: {
              background: mode === 'light'
                ? `linear-gradient(135deg, ${palettes.synthwave.purple} 0%, ${palettes.synthwave.deepPurple} 100%)`
                : `linear-gradient(135deg, ${palettes.synthwave.teal} 0%, ${palettes.synthwave.deepTeal} 100%)`,
            },
          },
        },
      },
      shape: {
        borderRadius: 4,
      },
    }),
  },

  flux: {
    name: 'flux',
    options: (mode) => ({
      palette: {
        mode,
        primary: { main: mode === 'light' ? palettes.flux.ocean : palettes.flux.sunset },
        secondary: { main: mode === 'light' ? palettes.flux.sky : palettes.flux.sunrise },
        background: {
          default: mode === 'light' ? '#ffffff' : '#1a1a1a',
          paper: mode === 'light' ? '#f5f5f5' : '#2d2d2d',
        },
        text: {
          primary: mode === 'light' ? '#2d2d2d' : '#ffffff',
          secondary: mode === 'light' ? '#525252' : '#b3b3b3',
        },
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: mode === 'light'
                ? `linear-gradient(135deg, ${palettes.flux.ocean} 0%, ${palettes.flux.sky} 100%)`
                : `linear-gradient(135deg, ${palettes.flux.sunset} 0%, ${palettes.flux.dusk} 100%)`,
            },
          },
        },
      },
    }),
  },

  natural: {
    name: 'natural',
    options: (mode) => ({
      palette: {
        mode,
        primary: { main: mode === 'light' ? palettes.natural.moss : palettes.natural.clay },
        secondary: { main: mode === 'light' ? palettes.natural.earth : palettes.natural.sage },
        background: {
          default: mode === 'light' ? palettes.natural.sand : palettes.natural.stone,
          paper: mode === 'light' ? '#ffffff' : '#2d2d2d',
        },
        text: {
          primary: mode === 'light' ? palettes.natural.stone : palettes.natural.sand,
          secondary: mode === 'light' ? palettes.natural.moss : palettes.natural.clay,
        },
      },
      shape: { borderRadius: 6 },
    }),
  },
};

export const getThemeOptions = (name: ThemeName, mode: ThemeMode) => {
  return themes[name].options(mode);
};
