import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

export const useTextToSpeech = (language: "bn" | "en") => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTextRef = useRef<string>("");

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      URL.revokeObjectURL(audioRef.current.src);
      audioRef.current = null;
    }
    setIsPlaying(false);
    currentTextRef.current = "";
  }, []);

  const play = useCallback(async (text: string) => {
    // If same text is playing, stop it
    if (isPlaying && currentTextRef.current === text) {
      stop();
      return;
    }

    // Stop any existing audio
    stop();

    setIsLoading(true);
    currentTextRef.current = text;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate speech");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        currentTextRef.current = "";
      };

      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        toast.error(language === "bn" ? "অডিও চালাতে ব্যর্থ" : "Failed to play audio");
      };

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("TTS error:", error);
      toast.error(
        language === "bn" 
          ? "অডিও তৈরি করতে ব্যর্থ" 
          : "Failed to generate audio"
      );
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, stop, language]);

  return {
    play,
    stop,
    isPlaying,
    isLoading,
    currentText: currentTextRef.current,
  };
};
