import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { Uniwind } from 'uniwind';
import { darkColours, lightColours, type ThemeColours } from './tokens';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  colours: ThemeColours;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'rnvi-theme-mode';

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        setModeState(stored);
        Uniwind.setTheme(stored);
      }
      setLoaded(true);
    });
  }, []);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    Uniwind.setTheme(newMode);
    AsyncStorage.setItem(STORAGE_KEY, newMode);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(mode === 'system' ? (systemScheme === 'dark' ? 'light' : 'dark') : mode === 'dark' ? 'light' : 'dark');
  }, [mode, systemScheme, setMode]);

  const resolvedTheme: 'light' | 'dark' = mode === 'system' ? (systemScheme === 'light' ? 'light' : 'dark') : mode;

  const colours = resolvedTheme === 'dark' ? darkColours : lightColours;

  const value = useMemo(
    () => ({ mode, resolvedTheme, colours, setMode, toggleTheme }),
    [mode, resolvedTheme, setMode, toggleTheme],
  );

  if (!loaded) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
