import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { loadPageFont, getPageFontFamily } from '@/services/qpcFontLoader';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

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

// Font sizes that scale well with the Mushaf layout (rem units)
const FONT_SIZES = [1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8];
const DEFAULT_FONT_INDEX = 3;

const MushafPageView: React.FC<MushafPageViewProps> = ({
  pageNumber,
  fontSizeIndex = DEFAULT_FONT_INDEX,
  onVerseClick,
  highlightedVerse,
}) => {
  const [words, setWords] = useState<MushafWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load font for this page
  useEffect(() => {
    setFontLoaded(false);
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

  // Get all line numbers sorted
  const lineNumbers = useMemo(() => {
    return Array.from(lineGroups.keys()).sort((a, b) => a - b);
  }, [lineGroups]);

  const fontSize = FONT_SIZES[fontSizeIndex] || FONT_SIZES[DEFAULT_FONT_INDEX];
  const fontFamily = getPageFontFamily(pageNumber);
  const lineHeight = 2.4; // Consistent line height for Mushaf

  if (loading || !fontLoaded) {
    return (
      <div className="mushaf-page-container mx-auto max-w-3xl px-2">
        <div className="mushaf-page bg-card rounded-xl border border-border/40 shadow-md overflow-hidden">
          <div className="text-center py-3 border-b border-border/20 text-sm text-muted-foreground font-medium">
            {pageNumber}
          </div>
          <div className="p-6 space-y-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="mushaf-page-container mx-auto max-w-3xl px-2">
        <div className="mushaf-page bg-card rounded-xl border border-border/40 shadow-md p-8 text-center text-muted-foreground">
          No word data available for page {pageNumber}. 
          <br />
          Please import mushaf words first.
        </div>
      </div>
    );
  }

  return (
    <div className="mushaf-page-container mx-auto max-w-3xl px-2">
      <div 
        className="mushaf-page bg-card rounded-xl border border-border/40 shadow-md overflow-hidden"
        style={{ 
          fontFamily: `'${fontFamily}', 'KFGQPC Uthmanic Script HAFS', 'Scheherazade New', serif`,
        }}
      >
        {/* Page number header */}
        <div className="mushaf-page-header text-center py-3 border-b border-border/20">
          <span className="text-sm text-muted-foreground font-medium tracking-wide">
            {pageNumber}
          </span>
        </div>
        
        {/* Lines container - the actual Mushaf content */}
        <div 
          className="mushaf-lines-container px-4 sm:px-6 md:px-8 py-4 sm:py-6"
          dir="rtl"
        >
          {lineNumbers.map((lineNum) => {
            const lineWords = lineGroups.get(lineNum) || [];
            const isLastLine = lineNum === lineNumbers[lineNumbers.length - 1];
            const wordCount = lineWords.length;
            
            // Determine if this line should be centered (surah name, bismillah, or single word lines)
            const hasOnlyOneWord = wordCount === 1;
            const isCenteredLine = hasOnlyOneWord && lineNum <= 2 && pageNumber <= 2;
            
            return (
              <div
                key={lineNum}
                className={cn(
                  "mushaf-line",
                  // Use flexbox with space-between for justified text
                  // Last line or centered lines should be centered instead
                  isLastLine || isCenteredLine 
                    ? "flex justify-center" 
                    : "flex justify-between"
                )}
                style={{
                  fontSize: `${fontSize}rem`,
                  lineHeight: lineHeight,
                  minHeight: `${fontSize * lineHeight}rem`,
                  letterSpacing: '0.01em',
                }}
              >
                {lineWords.map((word, wordIndex) => {
                  const isHighlighted = 
                    highlightedVerse?.surah === word.surah_number && 
                    highlightedVerse?.verse === word.verse_number;
                  
                  // Add word spacing for non-justified lines
                  const needsSpacing = (isLastLine || isCenteredLine) && wordIndex < wordCount - 1;
                  
                  return (
                    <span
                      key={`${word.verse_key}-${word.word_position}-${word.id}`}
                      className={cn(
                        "mushaf-word inline-block cursor-pointer transition-all duration-200",
                        "hover:text-primary hover:scale-105",
                        isHighlighted && "text-primary bg-primary/10 rounded-md px-1 -mx-1"
                      )}
                      style={{
                        // Add margin for centered/last lines
                        marginLeft: needsSpacing ? '0.5em' : undefined,
                      }}
                      onClick={() => onVerseClick?.(word.surah_number, word.verse_number)}
                      title={`${word.verse_key} - Word ${word.word_position}`}
                    >
                      {word.text_v1}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
        
        {/* Page footer with subtle styling */}
        <div className="mushaf-page-footer text-center py-2 border-t border-border/10">
          <span className="text-xs text-muted-foreground/60">
            ─ ❧ ─
          </span>
        </div>
      </div>
    </div>
  );
};

export default MushafPageView;
