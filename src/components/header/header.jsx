import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import Styles from '../../styles/header.module.scss';
import Logo from '../../assets/Logo/logo-no-background.png';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

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
                            Accueil
                        </li>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('onDisplay')}
                        >
                            Film à l'affiche
                        </li>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('movies')}
                        >
                            Réservations en ligne
                        </li>
                        <li
                            className={Styles.navLink}
                            onClick={() => handleNavigation('footer')}
                        >
                            Contact
                        </li>
                    </ul>
                    <ul className={Styles.navBtn}>
                        <li className={Styles.navLink}>
                            <button id={Styles.join}>Rejoindre</button>
                        </li>
                        <li className={Styles.navLink}>
                            <button id={Styles.connect}>Se connecter</button>
                        </li>
                        <li className={Styles.navLink}>
                            <button>lang</button>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
