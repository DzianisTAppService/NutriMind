import { memo, useCallback, useMemo } from 'react';
import { Home, BookOpen, Link2, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

const TABS = [
  { path: '/', label: 'Сегодня', icon: Home },
  { path: '/practices', label: 'Практики', icon: BookOpen },
  { path: '/bridges', label: 'Мосты', icon: Link2 },
  { path: '/profile', label: 'Профиль', icon: User },
] as const;

export const BottomTabBar = memo(function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = useMemo(() => location.pathname, [location.pathname]);

  const handleNavigate = useCallback(
    (path: string) => () => navigate(path),
    [navigate],
  );

  return (
    <nav className={styles.tabBar}>
      {TABS.map(({ path, label, icon: Icon }) => {
        const isActive = activePath === path;
        return (
          <button
            key={path}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
            onClick={handleNavigate(path)}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
});
