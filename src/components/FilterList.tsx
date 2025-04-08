import { List, ListItemButton, ListItemIcon, ListItemText, Typography, Badge, Box, Checkbox } from '@mui/material';

type FilterItem = {
  id: string;
  label: string;
  count: number;
};

type FilterListProps = {
  title: string;
  items: FilterItem[];
  selectedItems: string[];
  onSelectionChange: (items: string[]) => void;
  formatLabel?: (label: string) => string;
};

export function FilterList({ 
  title, 
  items, 
  selectedItems, 
  onSelectionChange,
  formatLabel = (label) => label
}: FilterListProps) {
  return (
    <>
      <Typography variant="h6" sx={{ p: 2, pb: 1 }}>{title}</Typography>
      <List dense sx={{ py: 0 }}>
        {items.map(({ id, label, count }) => (
          <ListItemButton 
            key={id}
            selected={selectedItems.includes(id)}
            onClick={() => {
              onSelectionChange(
                selectedItems.includes(id)
                  ? selectedItems.filter(i => i !== id)
                  : [...selectedItems, id]
              );
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedItems.includes(id)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText 
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {formatLabel(label)}
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
    </>
  );
}
