import Image from "next/image";
import { facebook, instagram, whatsup, location, phone } from '../assets/icons';
import styles from '@/styles/Footer.module.scss';
import Link from "next/link";



export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1668.39042580045!2d6.915595044421026!3d51.205052720172894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8cddd77250e4f%3A0xf4bea4b7613fd16d!2s6W48%2B2R4%2C%2040699%20Erkrath-Hochdahl%2C%20Germany!5e0!3m2!1sen!2sge!4v1733681228684!5m2!1sen!2sge" width="100%" height="450" style={{ "border": 0 }} allowFullScreen={true} loading="lazy" referrerPolicy={"no-referrer-when-downgrade"} title="Location description" sandbox="allow-scripts allow-same-origin allow-popups" ></iframe>
            </div>
            <div className={styles.info}>
                <div className={styles.location}>Locations</div>
                <ul className={styles.addr}>
                    <li className={styles.link}>
                        <Image
                            src={location} alt="location Erkrath-Hochdahl" />
                        <Link href="/location/Erkrath-Hochdahl" title="location address Erkrath-Hochdahl" scroll={true}><address ><strong>Erkrath-Hochdahl, Germany</strong></address></Link>
                    </li>
                    <li className={styles.link}>
                        <Image
                            src={location} alt="location Düsseldorf" />
                        <Link href="/location/Dusseldorf" title="location address Düsseldorf" scroll={true}><address ><strong>Düsseldorf, Germany</strong></address></Link>
                    </li>
                </ul>
                <div className={styles.phone}>
                    <Image
                        src={phone} alt="phone" />
                    <a className={styles.phonenumber} href="tel:44999228974">+4 (499) 922-89-74</a>
                </div>

                <div className={styles.socialItems}>
                    <a href="#" className={styles.social} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={facebook} alt="facebook" />
                    </a>
                    <a href="#" className={styles.social} target="_blank" rel="noopener noreferrer">
                        <Image
                            src={instagram} alt="instagram" />
                    </a>
                    <a href="#" className={styles.social} id='whatsup' target="_blank" rel="noopener noreferrer">
                        <Image
                            src={whatsup} alt="whatsup" width={52} height={52} />
                    </a>
                </div>
            </div>
        </footer >
    )
}
