import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute, PublicRoute } from './auth/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { SentimentPage } from './pages/SentimentPage';
import { AudiencePage } from './pages/AudiencePage';
import { TrendsPage } from './pages/TrendsPage';
import { NetworkPage } from './pages/NetworkPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { DataSourcesPage } from './pages/DataSourcesPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/sentiment" element={<SentimentPage />} />
          <Route path="/audience" element={<AudiencePage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/data-sources" element={<DataSourcesPage />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
