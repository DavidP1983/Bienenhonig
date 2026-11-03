'use client';
import { Button, Flex, Progress } from 'antd';
import { memo, useEffect, useState } from 'react';

import styles from './UndoNotification.module.scss';

type UndoMessageProps = {
  text: string;
  undoBtnText: string;
  resetKey: number;
  onUndo: () => void;
  onComplete: () => void;
};

const DURATION = 10000;

const UndoMessage = ({
  text,
  undoBtnText,
  resetKey,
  onUndo,
  onComplete,
}: UndoMessageProps) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextPercent = Math.floor(Math.min((elapsed / DURATION) * 100, 100));

      setPercent(nextPercent);

      if (nextPercent >= 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, resetKey]);

  return (
    <Flex
      className={styles.undoNotification}
      align="center"
      gap="middle">
      <Progress
        className={styles.undoNotification__progress}
        type="circle"
        percent={percent}
        showInfo
        size="small"
        style={{ width: 40 }}
      />

      <span>{text}</span>

      <Button
        type="default"
        onClick={onUndo}>
        {undoBtnText}
      </Button>
    </Flex>
  );
};

export const UndoNotification = memo(UndoMessage);
