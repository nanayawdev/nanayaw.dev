import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <Router>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
        {!isLoading && (
          <MainLayout />
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
