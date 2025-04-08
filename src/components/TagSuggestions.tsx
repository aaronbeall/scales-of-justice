import { useState, useEffect } from 'react';
import { Typography, Chip, Stack } from '@mui/material';

interface TagSuggestionsProps {
  text: string;
  existingTags: string[];
  onSelect: (tag: string) => void;
}

export function TagSuggestions({ text, existingTags, onSelect }: TagSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const commonCategories = [
      'weight', 'exercise', 'food', 'sleep', 'mood', 'health',
      'work', 'study', 'finance', 'habits'
    ];

    const words = text.toLowerCase().split(/\s+/);
    const matchedCategories = commonCategories.filter(category =>
      words.some(word => word.includes(category))
    );

    const textTags = Array.from(text.matchAll(/#(\w+)/g)).map(match => match[1]);

    const uniqueSuggestions = [...new Set([
      ...matchedCategories,
      ...existingTags.filter(tag => 
        !textTags.includes(tag) && 
        text.toLowerCase().includes(tag.toLowerCase())
      )
    ])];

    setSuggestions(uniqueSuggestions.slice(0, 5));
  }, [text, existingTags]);

  if (suggestions.length === 0) return null;

  return (
    <Stack spacing={1} sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary">
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
            sx={{ cursor: 'pointer' }}
          />
        ))}
      </Stack>
    </Stack>
  );
}