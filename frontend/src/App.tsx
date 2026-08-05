import { BrowserRouter } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Router from './router';

export default function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Router />
      </AnimatePresence>
    </BrowserRouter>
  );
}
