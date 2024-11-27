import Styles from '../../styles/hero.module.scss';
import { useState } from 'react';
import bgImage from '../../assets/Hero/herobg.gif';

export default function Hero() {
    const [bg, setBg] = useState(bgImage);
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
                <h1>Titre du Film</h1>
                <button className={Styles.ctaBtn}>Reserver maintenant</button>
            </div>
        </div>
    );
}
