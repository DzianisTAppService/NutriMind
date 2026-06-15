import { memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { Onboarding } from './pages/Onboarding';
import { TodayPage } from './pages/Today';
import { PracticesPage } from './pages/Practices';
import { BridgesPage } from './pages/Bridges';
import { ProfilePage } from './pages/Profile';

const AppRoutes = memo(function AppRoutes() {
  const { onboardingComplete } = useApp();

  if (!onboardingComplete) {
    return <Onboarding />;
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<TodayPage />} />
        <Route path="practices" element={<PracticesPage />} />
        <Route path="bridges" element={<BridgesPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
});

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
