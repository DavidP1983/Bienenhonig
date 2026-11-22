import { Modal } from 'antd';
import type { ReactNode } from 'react';

import styles from './ResultModal.module.scss';

type ResultModalProps = {
  open: boolean;
  onClose?: () => void;
  title: ReactNode;
  closable: boolean;
  children: ReactNode;
};

export const ResultModal = ({
  title,
  open,
  onClose,
  closable,
  children,
}: ResultModalProps) => {
  return (
    <Modal
      className={styles.modal}
      title={title}
      centered
      open={open}
      closable={closable}
      footer={null}
      onCancel={onClose}>
      {children}
    </Modal>
  );
};
