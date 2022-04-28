import { createTheme, ThemeProvider } from '@mui/material';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import PropTypes from 'prop-types';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: ['Cairo', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#276678',
      dark: '#E5E5E5',
      contrastText: '#fff',
    },
  },
});

function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        {children}
      </CacheProvider>
    </ThemeProvider>
  );
}
Theme.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Theme;
