import { memo, type ReactNode } from 'react';
import { X } from 'lucide-react';
import styles from './styles.module.scss';

interface FlowShellProps {
  onClose: () => void;
  children: ReactNode;
}

export const FlowShell = memo(function FlowShell({ onClose, children }: FlowShellProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
});
