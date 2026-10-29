import { Link } from '@/i18n/navigation';
import { sadBee } from '@/shared/assets/img';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function NotFound() {
  const t = await getTranslations('NotFound');

  return (
    <div className="notfound">
      <Image
        src={sadBee}
        alt="error"
        width={200}
        height={200}
        priority={false}
      />
      <h2 className="title">{t('title')}</h2>
      <p className="reason">{t('reason')}</p>
      <Link
        href="/"
        className="btn">
        {t('btn')}
      </Link>
    </div>
  );
}
