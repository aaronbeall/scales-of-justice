import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { TagSuggestions } from '../components/TagSuggestions';
import { useData } from '../context/DataContext';
import { TextField, Container, Box } from '@mui/material';

export function HomeView() {
  const [inputText, setInputText] = useState('');
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  const { entries, addEntry } = useData();

  const insertTag = (tag: string) => {
    const textField = document.querySelector('[name="entry-input"]');
    if (textField) {
      const newText = `${inputText} #${tag} `;
      setInputText(newText);
      textField.focus();
    }
  };

  const updateCaretPosition = () => {
    const textField = document.querySelector('[name="entry-input"]') as HTMLTextAreaElement;
    if (!textField) return;

    const { selectionStart } = textField;
    const rect = textField.getBoundingClientRect();
    
    // Create a hidden div to measure text
    const mirror = document.createElement('div');
    mirror.style.cssText = window.getComputedStyle(textField).cssText;
    mirror.style.height = 'auto';
    mirror.style.position = 'absolute';
    mirror.style.visibility = 'hidden';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.textContent = inputText.substring(0, selectionStart);
    
    document.body.appendChild(mirror);
    const pos = mirror.getBoundingClientRect();
    document.body.removeChild(mirror);

    setCursorPosition({
      x: rect.left + (pos.width % rect.width),
      y: rect.top + Math.floor(pos.height / rect.height) * parseInt(window.getComputedStyle(textField).lineHeight),
    });
  };

  return (
    <PageLayout>
      <Container maxWidth="md">
        <Box sx={{ 
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <TextField
            name="entry-input"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              updateCaretPosition();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addEntry(inputText);
                setInputText('');
              }
            }}
            placeholder="What's on your mind?"
            fullWidth
            variant="outlined"
            onSelect={updateCaretPosition}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'background.paper',
                fontSize: '1.5rem',
                height: '4rem',
              },
              '& .MuiOutlinedInput-input': {
                padding: '0.5rem 1rem',
              },
            }}
          />
          <TagSuggestions
            text={inputText}
            existingTags={[...new Set(entries.flatMap(e => e.tags))]}
            onSelect={insertTag}
            cursorPosition={cursorPosition}
          />
        </Box>
      </Container>
    </PageLayout>
  );
}