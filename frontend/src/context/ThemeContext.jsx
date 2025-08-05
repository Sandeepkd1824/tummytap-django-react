import React, { createContext, useContext } from 'react';
import { colors } from '../theme';

const ThemeContext = createContext(colors);

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={colors}>
    {children}
  </ThemeContext.Provider>
);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
