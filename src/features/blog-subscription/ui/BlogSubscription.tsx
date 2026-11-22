import { Button } from '@/shared/ui';
import { Form, Input } from 'antd';
import { useTranslations } from 'next-intl';

import styles from './BlogSubscription.module.scss';

export const BlogSubscription = () => {
  const t = useTranslations('Footer');

  return (
    <div className={styles.footerSubscribe}>
      <div className={styles.subscribeText}>
        <h2>{t('subscribeTitle')}</h2>
        <p>{t('subscribeDescription')}</p>
      </div>

      <Form
        className={styles.subscribeForm}
        // form={form}
        layout="vertical"
        // onFinish={handleSubmit}
        requiredMark={true}>
        <Input
          className={styles.input}
          type="email"
          id="email"
          name="email"
          placeholder={t('emailPlaceholder')}
          aria-label={t('emailPlaceholder')}
          disabled
        />
        <Button
          type="primary"
          disabled={true}
          htmlType="button"
          className={styles.subscribe}>
          {t('subscribe')}
        </Button>
      </Form>
    </div>
  );
};
