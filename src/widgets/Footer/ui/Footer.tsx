import { Link } from '@/i18n/navigation';
import {
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  FiPhone,
  IoLocation,
  LuMailOpen,
  MdLanguage,
} from '@/shared/assets/icons';
import logo from '@/shared/assets/img/logo/logo.png';
import { LanguageSwitcher } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import styles from './Footer.module.scss';

export const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <Link href="/">
            <Image
              width={120}
              height={120}
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div className={styles.footerLinks}>
          <h2>{t('navigation')}</h2>
          <ul>
            <li>
              <Link href="/">{t('home')}</Link>
            </li>
            <li>
              <Link href="/products">{t('products')}</Link>
            </li>
            <li>
              <Link href="/support">{t('support')}</Link>
            </li>
          </ul>
        </div>
        <div className={styles.location}>
          <h2>{t('locations')}</h2>
          <ul>
            <li>
              <IoLocation />
              <Link
                href="/location/Erkrath-Hochdahl"
                title="location address Erkrath-Hochdahl">
                Erkrath-Hochdahl, {t('country')}
              </Link>
            </li>
            <li>
              <IoLocation />
              <Link
                href="/location/Dusseldorf"
                title="location address Düsseldorf">
                Düsseldorf, {t('country')}
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerAddr}>
          <h2>{t('address')}</h2>
          <address>
            <p>
              <IoLocation />
              {t('country')}, Dusseldorf
            </p>
            <a
              href="mailto:bienenhonig.info@gmail.com"
              rel="noopener noreferrer">
              <LuMailOpen />
              bienenhonig.info@gmail.com
            </a>
            <a
              href="tel:+995543956231"
              rel="noopener noreferrer">
              <FiPhone />
              +9(95) 543-956-231
            </a>
          </address>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.socialItems}>
          <a
            href="#"
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer">
            <FaFacebookF className={styles.facebook} />
          </a>
          <a
            href="#"
            className={styles.social}
            target="_blank"
            rel="noopener noreferrer">
            <FaTelegramPlane className={styles.telegram} />
          </a>
          <a
            href="#"
            className={styles.social}
            id="whatsup"
            target="_blank"
            rel="noopener noreferrer">
            <FaWhatsapp className={styles.whatsapp} />
          </a>
        </div>

        <div className={styles.languageSwitcher}>
          <MdLanguage className={styles.iconLanguage} />
          <LanguageSwitcher />
        </div>
      </div>
      <div className={styles.rights}>
        Copyright &copy;2025- Bienenhonig. {t('rights')}
      </div>
    </footer>
  );
};
