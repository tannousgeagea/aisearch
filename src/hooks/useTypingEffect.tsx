import { useEffect, useState, useRef } from 'react';

export function useTypingEffect(fullText: string, speed = 15): string {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let i = 0;
    setTypedText('');

    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [fullText]);

  return typedText;
}

export const useStreamingTypingEffect = (
  streamingText: string,
  isStreaming: boolean,
  typingSpeed: number = 30
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastStreamingTextRef = useRef('');

  useEffect(() => {
    // Clear everything when streaming starts fresh
    if (isStreaming && streamingText !== lastStreamingTextRef.current) {
      // Only reset if we have new content
      if (streamingText.length < lastStreamingTextRef.current.length) {
        setDisplayedText('');
        setCurrentIndex(0);
      }
    }
    
    lastStreamingTextRef.current = streamingText;

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Start typing effect if there's text to display
    if (streamingText.length > 0 && currentIndex < streamingText.length) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          
          // Update displayed text
          setDisplayedText(streamingText.slice(0, newIndex));
          
          // If we've caught up to the current streaming text
          if (newIndex >= streamingText.length) {
            // If streaming is complete, clear the interval
            if (!isStreaming) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
            }
            return newIndex;
          }
          
          return newIndex;
        });
      }, typingSpeed);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [streamingText, isStreaming, currentIndex, typingSpeed]);

  // Reset when streaming stops and we want to clear
  useEffect(() => {
    if (!isStreaming && streamingText === '') {
      setDisplayedText('');
      setCurrentIndex(0);
    }
  }, [isStreaming, streamingText]);

  return displayedText;
};

// Alternative implementation that handles chunks more smoothly
export const useStreamingTypingEffectV2 = (
  streamingText: string,
  isStreaming: boolean,
  typingSpeed: number = 30
) => {
  const [displayedText, setDisplayedText] = useState('');
  const displayedLengthRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Reset if starting fresh
    if (isStreaming && streamingText.length === 0) {
      setDisplayedText('');
      displayedLengthRef.current = 0;
      return;
    }

    // Start typing if we have more text to display
    if (streamingText.length > displayedLengthRef.current) {
      intervalRef.current = setInterval(() => {
        setDisplayedText(current => {
          const nextLength = Math.min(current.length + 1, streamingText.length);
          displayedLengthRef.current = nextLength;
          
          const newText = streamingText.slice(0, nextLength);
          
          // Stop interval if we've caught up and streaming is done
          if (nextLength >= streamingText.length && !isStreaming) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
          }
          
          return newText;
        });
      }, typingSpeed);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [streamingText, isStreaming, typingSpeed]);

  // Reset when streaming stops completely
  useEffect(() => {
    if (!isStreaming && streamingText === '') {
      setDisplayedText('');
      displayedLengthRef.current = 0;
    }
  }, [isStreaming, streamingText]);

  return displayedText;
};