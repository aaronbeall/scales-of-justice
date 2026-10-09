import { useState, useEffect } from 'react';
import { Typography, Chip, Stack, Popover, Paper } from '@mui/material';

interface TagSuggestionsProps {
  text: string;
  existingTags: string[];
  onSelect: (tag: string) => void;
  cursorPosition: { x: number; y: number } | null;
}

const commonCategories = {
  general: [
    'weight', 'exercise', 'food', 'sleep', 'mood', 'health',
    'work', 'study', 'finance', 'habits'
  ],
  metrics: {
    'weight': ['lbs', 'kg'],
    'distance': ['mi', 'km', 'meters'],
    'steps': ['steps'],
    'duration': ['min', 'hours'],
    'reps': ['reps', 'sets'],
    'calories': ['cal', 'kcal'],
    'money': ['usd', 'dollars', 'cents'],
    'sleep': ['hours'],
  }
};

export function TagSuggestions({ text, existingTags, onSelect, cursorPosition }: TagSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const words = text.toLowerCase().split(/\s+/);
    const textTags = Array.from(text.matchAll(/#(\w+)/g)).map(match => match[1]);

    const matchedCategories = commonCategories.general.filter(category =>
      words.some(word => word.includes(category))
    );

    const matchedMetrics = Object.entries(commonCategories.metrics)
      .filter(([category]) => words.some(word => word.includes(category)))
      .flatMap(([_, units]) => units);

    const uniqueSuggestions = [...new Set([
      ...matchedCategories,
      ...matchedMetrics,
      ...existingTags.filter(tag => 
        !textTags.includes(tag) && 
        text.toLowerCase().includes(tag.toLowerCase())
      )
    ])];

    setSuggestions(uniqueSuggestions.slice(0, 5));
  }, [text, existingTags]);

  if (suggestions.length === 0 || !cursorPosition) return null;

  return (
    <Popover
      open={suggestions.length > 0}
      anchorReference="anchorPosition"
      anchorPosition={{ top: cursorPosition.y + 24, left: cursorPosition.x }}
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      sx={{ pointerEvents: 'none' }}
    >
      <Paper sx={{ p: 1, pointerEvents: 'none' }}>
        <Stack spacing={1}>
          <Typography variant="caption" color="text.secondary">
            Suggested tags:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {suggestions.map(tag => (
              <Chip
                key={tag}
                label={`#${tag}`}
                onClick={() => onSelect(tag)}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ cursor: 'pointer', pointerEvents: 'auto' }}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Popover>
  );
}