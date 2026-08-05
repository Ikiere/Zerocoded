import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Router from './router';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Router />
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}
