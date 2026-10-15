// ----------------------------------------------------------------------
// DEMO store — browser-only persistence (localStorage). No network calls.
// ----------------------------------------------------------------------

import { useCallback, useEffect, useState } from 'react';
import { DEMO_STORAGE_KEY } from './config';
import { createSeed, DemoDB } from './fixtures';

const SESSION_KEY = 'mpw-demo-admin-session';

export function loadDemoDB(): DemoDB {
  if (typeof window === 'undefined') return createSeed();
  try {
    const raw = window.localStorage.getItem(DEMO_STORAGE_KEY);
    if (raw) return JSON.parse(raw) as DemoDB;
  } catch {
    // ignore: fall back to the seed
  }
  return createSeed();
}

function saveDemoDB(db: DemoDB) {
  try {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(db));
  } catch {
    // storage unavailable: changes stay in memory only
  }
}

export function resetDemoDB() {
  try {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** React hook: the whole demo DB plus an updater that persists to localStorage. */
export function useDemoDB() {
  const [db, setDb] = useState<DemoDB>(() => createSeed());
  useEffect(() => setDb(loadDemoDB()), []);
  const update = useCallback((fn: (draft: DemoDB) => DemoDB) => {
    setDb((prev) => {
      const next = fn(prev);
      saveDemoDB(next);
      return next;
    });
  }, []);
  return { db, update };
}

export const demoSession = {
  isLoggedIn(): boolean {
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  },
  login() {
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // ignore
    }
  },
  logout() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  },
};

export const fcfa = (n: number) => `${new Intl.NumberFormat('fr-FR').format(n).replace(/ | /g, ' ')} FCFA`;
