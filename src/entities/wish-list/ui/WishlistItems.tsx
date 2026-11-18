import { ProductImage } from '@/shared/ui/ProductImage/ProductImage';
import Link from 'next/link';
import type { Wishlist } from '../model/types';

import styles from './WishlistItems.module.scss';

export interface WishlistItemsProps {
  products: Wishlist[];
  onClose: () => void;
  renderWishlistButton: (productId: string) => React.ReactNode;
}

export const WishlistItems = ({
  products,
  renderWishlistButton,
  onClose,
}: WishlistItemsProps) => {
  return (
    <div className={styles.wishlistItems}>
      {products.map((product) => {
        const productUrl = `/products/${product._id}`;
        const firstVariant = product.variants?.[0].price;
        const productImage = product.images?.[0];

        return (
          <div
            key={product._id}
            className={styles.wishlistItem}>
            <Link
              href={productUrl}
              className={styles.productLink}
              onClick={onClose}>
              <div className={styles.productImage}>
                <ProductImage
                  image={productImage}
                  alt={product.title}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className={styles.productTitle}>{product.title}</h3>
            </Link>

            <div className={styles.productPrice}>
              <span>&#8364; </span>
              {firstVariant && <span>{firstVariant}</span>}
            </div>

            <div className={styles.wishlistAction}>
              {renderWishlistButton(product._id)}
            </div>
          </div>
        );
      })}
    </div>
  );
};
