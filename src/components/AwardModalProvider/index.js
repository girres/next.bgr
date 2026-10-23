'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import AwardCelebrationModal from '@/components/AwardCelebrationModal';

const defaultAward = {
  title: 'Best Onboard Entertainment',
  projectHref: '/saudia-airlines',
  awardHref:
    'https://awards.onboardhospitality.com/award_cat/best-onboard-entertainment/',
};

const AwardModalContext = createContext(null);

export function AwardModalProvider({ children }) {
  const [state, setState] = useState({
    isOpen: false,
    ...defaultAward,
  });

  const openAward = useCallback((options = {}) => {
    setState({
      isOpen: true,
      title: options.title ?? defaultAward.title,
      projectHref: options.projectHref ?? defaultAward.projectHref,
      awardHref: options.awardHref ?? defaultAward.awardHref,
    });
  }, []);

  const closeAward = useCallback(() => {
    setState((current) => ({ ...current, isOpen: false }));
  }, []);

  const value = useMemo(() => ({ openAward }), [openAward]);

  return (
    <AwardModalContext.Provider value={value}>
      {children}
      <AwardCelebrationModal
        isOpen={state.isOpen}
        onClose={closeAward}
        title={state.title}
        projectHref={state.projectHref}
        awardHref={state.awardHref}
      />
    </AwardModalContext.Provider>
  );
}

export function useAwardModal() {
  const context = useContext(AwardModalContext);
  if (!context) {
    throw new Error('useAwardModal must be used within AwardModalProvider');
  }
  return context;
}
