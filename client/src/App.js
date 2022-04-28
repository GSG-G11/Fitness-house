import React from 'react';
import './app.css';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { orange } from '@mui/material/colors';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: 'rtl',
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <div className="continer">
          <h1>Welcome To FitHouse</h1>
          <h2> Hi</h2>
          <TextField id="filled-basic" label="الاسم" variant="filled" dir="rtl" />
          <TextField id="standard-basic" label="العمر" variant="standard" />
        </div>
      </CacheProvider>
    </ThemeProvider>
  );
}

export default App;
