import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { BottomTabBar } from '../components/BottomTabBar';
import { ActiveFlows } from '../components/ActiveFlows';

export const AppLayout = memo(function AppLayout() {
  return (
    <div className="appShell">
      <main className="pageContent">
        <Outlet />
      </main>
      <BottomTabBar />
      <ActiveFlows />
    </div>
  );
});
