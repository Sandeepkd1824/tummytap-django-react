import React, { createContext, useContext } from 'react';
import { colors } from '../theme';

const ThemeContext = createContext(colors);

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={colors}>
    {children}
  </ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
