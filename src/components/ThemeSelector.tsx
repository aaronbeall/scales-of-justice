import { IconButton, Menu, MenuItem } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import { useState } from 'react';
import { ThemeName, themes } from '../utils/themes';

type ThemeSelectorProps = {
  currentTheme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
};

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <PaletteIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.keys(themes).map((name) => (
          <MenuItem
            key={name}
            selected={name === currentTheme}
            onClick={() => {
              onThemeChange(name as ThemeName);
              setAnchorEl(null);
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
