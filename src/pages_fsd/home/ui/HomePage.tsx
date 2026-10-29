import { About } from '@/widgets/About/ui';
import { Carousel } from '@/widgets/Carousel/ui';
import { Hero } from '@/widgets/Hero/ui';

import styles from './Home.module.scss';

export const HomePage = () => {
  return (
    <>
      <section
        className={styles.about}
        aria-labelledby="home-page">
        <div className="container">
          <Hero />
          <About />
        </div>
      </section>
      <Carousel />
    </>
  );
};
