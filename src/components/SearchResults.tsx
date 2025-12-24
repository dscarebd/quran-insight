import { Bot, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface SearchResultsProps {
  query: string;
  response: string;
  isLoading: boolean;
  language: "bn" | "en";
}

export const SearchResults = ({ query, response, isLoading, language }: SearchResultsProps) => {
  if (!query && !response) return null;

  return (
    <div className="mt-8 animate-fade-in">
      {/* User Query */}
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
          <span className={cn("text-sm font-medium", language === "bn" && "font-bengali")}>
            {language === "bn" ? "আপনি" : "You"}
          </span>
        </div>
        <div className="rounded-2xl bg-secondary px-4 py-3">
          <p className={cn("text-foreground", language === "bn" && "font-bengali")}>{query}</p>
        </div>
      </div>

      {/* AI Response */}
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </div>
        <div className="flex-1 overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 shadow-card">
          {isLoading && !response && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span className={cn("text-sm", language === "bn" && "font-bengali")}>
                {language === "bn" ? "উত্তর খুঁজছি..." : "Searching for answer..."}
              </span>
            </div>
          )}
          
          {response && (
            <div className={cn("prose prose-sm max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:bg-muted", language === "bn" && "font-bengali")}>
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/50 bg-accent/30 pl-4 py-2 my-3 italic font-arabic text-lg">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1">{children}</ol>,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          )}

          {isLoading && response && (
            <span className="inline-block h-4 w-1 animate-pulse bg-primary ml-1" />
          )}
        </div>
      </div>
    </div>
  );
};
