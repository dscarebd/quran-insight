import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { loadPageFont, getPageFontFamily } from '@/services/qpcFontLoader';
import { Skeleton } from '@/components/ui/skeleton';

interface MushafWord {
  id: number;
  page_number: number;
  line_number: number;
  surah_number: number;
  verse_number: number;
  word_position: number;
  text_v1: string;
  verse_key: string;
  char_type: string;
}

interface MushafPageViewProps {
  pageNumber: number;
  fontSizeIndex: number;
  onVerseClick?: (surahNumber: number, verseNumber: number) => void;
  highlightedVerse?: { surah: number; verse: number } | null;
}

// Font sizes that scale well with the Mushaf layout
const FONT_SIZES = [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4];

const MushafPageView: React.FC<MushafPageViewProps> = ({
  pageNumber,
  fontSizeIndex,
  onVerseClick,
  highlightedVerse,
}) => {
  const [words, setWords] = useState<MushafWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load font for this page
  useEffect(() => {
    const loadFont = async () => {
      try {
        await loadPageFont(pageNumber);
        setFontLoaded(true);
      } catch (error) {
        console.error(`Failed to load font for page ${pageNumber}:`, error);
        setFontLoaded(true); // Continue anyway
      }
    };
    loadFont();
  }, [pageNumber]);

  // Fetch words for this page
  useEffect(() => {
    const fetchWords = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('mushaf_words')
          .select('*')
          .eq('page_number', pageNumber)
          .order('line_number', { ascending: true })
          .order('word_position', { ascending: true });

        if (error) throw error;
        setWords((data as MushafWord[]) || []);
      } catch (error) {
        console.error('Error fetching mushaf words:', error);
        setWords([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWords();
  }, [pageNumber]);

  // Group words by line number
  const lineGroups = useMemo(() => {
    const groups: Map<number, MushafWord[]> = new Map();
    
    for (const word of words) {
      if (!groups.has(word.line_number)) {
        groups.set(word.line_number, []);
      }
      groups.get(word.line_number)!.push(word);
    }
    
    return groups;
  }, [words]);

  // Get all line numbers (1-15 typically)
  const lineNumbers = useMemo(() => {
    const nums = Array.from(lineGroups.keys()).sort((a, b) => a - b);
    return nums;
  }, [lineGroups]);

  const fontSize = FONT_SIZES[fontSizeIndex] || FONT_SIZES[3];
  const fontFamily = getPageFontFamily(pageNumber);

  if (loading || !fontLoaded) {
    return (
      <div className="mushaf-page p-4 space-y-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="mushaf-page p-4 text-center text-muted-foreground">
        No word data available for page {pageNumber}. 
        Please import mushaf words first.
      </div>
    );
  }

  return (
    <div 
      className="mushaf-page bg-card rounded-lg shadow-sm border border-border/50 mx-auto max-w-3xl"
      style={{ 
        fontFamily,
        direction: 'rtl',
      }}
    >
      {/* Page number header */}
      <div className="text-center py-2 border-b border-border/30 text-sm text-muted-foreground">
        {pageNumber}
      </div>
      
      {/* Lines container */}
      <div className="mushaf-lines px-4 py-3">
        {lineNumbers.map((lineNum) => {
          const lineWords = lineGroups.get(lineNum) || [];
          
          return (
            <div
              key={lineNum}
              className="mushaf-line flex justify-between items-center"
              style={{
                fontSize: `${fontSize}rem`,
                lineHeight: 2.2,
                minHeight: `${fontSize * 2.2}rem`,
              }}
            >
              {lineWords.map((word) => {
                const isHighlighted = 
                  highlightedVerse?.surah === word.surah_number && 
                  highlightedVerse?.verse === word.verse_number;
                
                return (
                  <span
                    key={`${word.verse_key}-${word.word_position}`}
                    className={`mushaf-word cursor-pointer transition-colors hover:text-primary ${
                      isHighlighted ? 'text-primary bg-primary/10 rounded px-1' : ''
                    }`}
                    onClick={() => onVerseClick?.(word.surah_number, word.verse_number)}
                    title={`${word.verse_key}`}
                  >
                    {word.text_v1}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MushafPageView;
