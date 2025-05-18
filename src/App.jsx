import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApiKeyProvider } from './context/ApiKeyContext';
import { FilterProvider } from './context/FilterContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetailsPage from './pages/ResourceDetailsPage';

function App() {
  return (
    <BrowserRouter>
      <ApiKeyProvider>
        <FilterProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:resourceId" element={<ResourceDetailsPage />} />
            </Routes>
          </MainLayout>
        </FilterProvider>
      </ApiKeyProvider>
    </BrowserRouter>
  );
}

export default App;
