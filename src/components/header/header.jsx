import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import Styles from '../../styles/header.module.scss';
import Logo from '../../assets/Logo/logo-no-background.png';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t, i18n } = useTranslation('header');
    const navigate = useNavigate();
    const location = useLocation();

    const toggleLanguage = () => {
        const nextLanguage = i18n.language === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(nextLanguage);
    };

    // Fonction pour naviguer ou scroller
    const handleNavigation = (section) => {
        if (location.pathname !== '/') {
            // Si tu n'es pas sur la page d'accueil, redirige d'abord
            navigate('/');
            // Utilise un délai pour permettre à la page de se charger avant de scroller
            setTimeout(() => {
                scrollToSection(section);
            }, 1200);
        } else {
            // Si tu es sur la page d'accueil, scrolle directement
            scrollToSection(section);
        }
    };

    const scrollToSection = (section) => {
        scroller.scrollTo(section, {
            smooth: true,
            duration: 100,
        });
    };

    return (
        <header className={Styles.nav}>
            <div className={Styles.container}>
                <ul className={Styles.navLogo}>
                    <li
                        className={Styles.logo}
                        onClick={() => handleNavigation('home')}
                    >
                        <img src={Logo} alt="Logo" />
                    </li>
                </ul>
                <div className={Styles.linksWrapper}>
                    <ul className={Styles.navLinks}>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('home')}
                        >
                            {t('home')}
                        </li>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('onDisplay')}
                        >
                            {t('onDisplay')}
                        </li>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('movies')}
                        >
                            {t('reservation')}
                        </li>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('footer')}
                        >
                            {t('contact')}
                        </li>
                    </ul>
                    <ul className={Styles.navBtn}>
                        <li className={Styles.navLink}>
                            <button id={Styles.join}> {t('join')}</button>
                        </li>
                        <li className={Styles.navLink}>
                            <button id={Styles.connect}> {t('connect')}</button>
                        </li>
                        <li className={Styles.navLink}>
                            <button id={Styles.lang} onClick={toggleLanguage}>
                                <i className="fa-solid fa-globe"></i>
                                {i18n.language === 'fr' ? (
                                    <span>FR</span>
                                ) : (
                                    <span>EN</span>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
