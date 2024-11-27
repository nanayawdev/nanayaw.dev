import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from '@/pages/AdminPage';
import SignInPage from '@/pages/SignInPage';
import AllBlogPostsPage from './pages/AllBlogPostsPage';
import PortfolioView from './pages/PortfolioView';
import PortfolioAdminPage from '@/pages/PortfolioAdminPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/allposts" element={<AllBlogPostsPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioView />} />
          <Route path="/portfolio-admin" element={<PortfolioAdminPage />} />
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
