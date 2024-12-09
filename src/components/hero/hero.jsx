import Styles from '../../styles/hero.module.scss';
import { useState } from 'react';
import bgImage from '../../assets/Hero/herobg.jpg';
import { useTranslation } from 'react-i18next';

export default function Hero() {
    const [bg, setBg] = useState(bgImage);
    const { t } = useTranslation();

    return (
        <div
            className={Styles.heroContainer}
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className={Styles.heroInfo}>
                <h1>Ergo Proxy</h1>
                <button className={Styles.ctaBtn}>{t('hero.heroBtn')}</button>
            </div>
        </div>
    );
}
