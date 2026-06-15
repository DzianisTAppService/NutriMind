import { memo, useCallback } from 'react';
import { BridgeCard } from '../../components/BridgeCard';
import { BRIDGES } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import styles from './styles.module.scss';

export const BridgesPage = memo(function BridgesPage() {
  const { setActiveFlow } = useApp();

  const handleAction = useCallback(() => {
    setActiveFlow('thoughts');
  }, [setActiveFlow]);

  const unresolved = BRIDGES.filter((b) => !b.resolved);
  const resolved = BRIDGES.filter((b) => b.resolved);

  return (
    <div className={styles.page}>
      <h1 className="pageTitle">Мосты</h1>
      <p className="pageSubtitle">Связи, которые заметило приложение</p>

      {unresolved.length === 0 && resolved.length === 0 && (
        <p className={styles.empty}>
          Пока связей нет. Продолжайте записывать — мы заметим паттерны.
        </p>
      )}

      {unresolved.map((bridge) => (
        <BridgeCard key={bridge.id} bridge={bridge} onAction={handleAction} />
      ))}

      {resolved.length > 0 && (
        <section className={styles.resolvedSection}>
          <h2 className={styles.resolvedTitle}>Разобрано</h2>
          {resolved.map((bridge) => (
            <BridgeCard key={bridge.id} bridge={bridge} />
          ))}
        </section>
      )}
    </div>
  );
});
