import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route
            path="/*"
            element={
              <>
                {isLoading && (
                  <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
                )}
                {!isLoading && <MainLayout />}
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
