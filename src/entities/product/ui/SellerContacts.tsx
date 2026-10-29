import {
  FaFacebookF,
  FaTelegramPlane,
  FaWhatsapp,
  TfiEmail,
} from '@/shared/assets/icons';
import { useTranslations } from 'next-intl';
import type { SellerContact } from '../model/types';

import styles from './SellerContacts.module.scss';

type SellerContactProps = {
  contacts: SellerContact[];
};

const contactIcons = {
  facebook: {
    icon: FaFacebookF,
    style: styles.facebook,
  },
  whatsapp: {
    icon: FaWhatsapp,
    style: styles.whatsapp,
  },
  telegram: {
    icon: FaTelegramPlane,
    style: styles.telegram,
  },
  email: {
    icon: TfiEmail,
    style: styles.email,
  },
};

export const SellerContacts = ({ contacts }: SellerContactProps) => {
  const t = useTranslations('SellerContacts');

  if (contacts.length === 0) return null;

  return (
    <div className={styles.contacts}>
      <h2 className={`title ${styles.contactsTitle}`}>
        {t('questions')}
        <br />
        {t('contactUs')}
      </h2>

      <ul className={styles.media}>
        {contacts.map((contact) => {
          const { icon: Icon, style } = contactIcons[contact.type];

          const href =
            contact.type === 'email'
              ? `mailto:${contact.value}`
              : contact.value;

          return (
            <li key={contact.type}>
              <a
                href={href}
                className={style}
                target={contact.type === 'email' ? undefined : '_blank'}
                rel={
                  contact.type === 'email' ? undefined : 'noopener noreferrer'
                }
                aria-label={contact.type}>
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
