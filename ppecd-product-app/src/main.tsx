import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

createRoot(document.getElementById('root')!).render(
   <ThemeProvider theme={theme}>
  <StrictMode>
    <AuthProvider>
     <BrowserRouter>
      <App />
     </BrowserRouter>
   </AuthProvider>
  </StrictMode>
  </ThemeProvider>
)
