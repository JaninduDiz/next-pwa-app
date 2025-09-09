"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

type PwaContextType = {
  isOffline: boolean;
  installPromptEvent: BeforeInstallPromptEvent | null;
  setInstallPromptEvent: Dispatch<SetStateAction<BeforeInstallPromptEvent | null>>;
};

export const PwaContext = createContext<PwaContextType | null>(null);

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
}
