import { useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import { TagSuggestions } from '../components/TagSuggestions';
import { useData } from '../context/DataContext';

export function HomeView() {
  const [inputText, setInputText] = useState('');
  const { entries, addEntry } = useData();

  const insertTag = (tag: string) => {
    const textArea = document.querySelector('textarea');
    if (textArea) {
      const newText = `${inputText} #${tag} `;
      setInputText(newText);
      textArea.focus();
    }
  };

  return (
    <PageLayout>
      <div className="input-section">
        <textarea
          value={inputText}
          placeholder="Enter your data... Use #tags for categories"
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              addEntry(inputText);
              setInputText('');
            }
          }}
        />
        <TagSuggestions
          text={inputText}
          existingTags={[...new Set(entries.flatMap(e => e.tags))]}
          onSelect={insertTag}
        />
      </div>
    </PageLayout>
  );
}