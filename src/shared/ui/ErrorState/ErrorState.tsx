'use client';
import { useRouter } from '@/i18n/navigation';
import sadBee from '@/shared/assets/img/error/sadBee.png';
import { errorsHandler } from '@/shared/errors/errorsHandler';
import { isErrorTranslationKey } from '@/shared/errors/isErrorTranslationKey';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '../Button';

import styles from './ErrorState.module.scss';

type Props = {
  error?: Error | null;
  errorCode?: string;
  onRetry?: () => void;
  variant?: 'default' | 'compact';
  showAction?: boolean;
};

export const ErrorState = ({
  error,
  errorCode,
  onRetry,
  variant,
  showAction,
}: Props) => {
  const t = useTranslations('ErrorDetails');

  const message =
    errorCode && isErrorTranslationKey(errorCode)
      ? t(errorCode)
      : errorsHandler(error);

  const router = useRouter();

  const handleClick = () => {
    if (onRetry) {
      onRetry();
    } else {
      router.push('/products');
    }
  };

  return (
    <div
      className={`${styles.errorContent} ${variant === 'compact' ? styles.compact : ''}`}>
      <div className={styles.title}>{t('title')}</div>

      <Image
        src={sadBee}
        alt="error"
        width={200}
        height={200}
        priority={false}
      />

      <div className={styles.message}>{message ?? t('title')}</div>
      {showAction && (
        <Button
          props={{
            type: 'primary',
            style: { display: 'block', margin: '10px auto' },
            onClick: handleClick,
          }}>
          {onRetry ? `${t('btnDescTry')}` : `${t('btnDescBack')}`}
        </Button>
      )}
    </div>
  );
};

/* Я использовал message: customMessage для того, чтобы иметь возможность передавать от Server Component в product/[id].page в Client Component ErrorState ошибку */
