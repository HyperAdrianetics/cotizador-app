import { useState, useEffect } from 'react';
import type { QuoteData } from '../types/quote';
import { getTodayDate } from '../utils/dateUtils';

export const useQuote = (brandKey: string, initialData: QuoteData) => {
  const [quote, setQuote] = useState<QuoteData>(() => {
    const today = getTodayDate();
    const saved = localStorage.getItem(`quote_${brandKey}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialData, ...parsed, date: today };
      } catch (e) {
        console.error('Error parsing saved quote', e);
      }
    }
    return { ...initialData, date: today };
  });

  useEffect(() => {
    localStorage.setItem(`quote_${brandKey}`, JSON.stringify(quote));
  }, [quote, brandKey]);

  const updateQuote = (newData: Partial<QuoteData>) => {
    setQuote((prev) => ({ ...prev, ...newData }));
  };

  const resetQuote = () => {
    setQuote(initialData);
  };

  const duplicateQuote = () => {
    setQuote((prev) => ({
      ...prev,
      folio: ((parseInt(prev.folio) || 0) + 1).toString(),
    }));
  };

  return {
    quote,
    setQuote,
    updateQuote,
    resetQuote,
    duplicateQuote,
  };
};
