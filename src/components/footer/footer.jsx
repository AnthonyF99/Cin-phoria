import Styles from '../../styles/footer.module.scss';
import Logo from '../../assets/Logo/logo-no-background.png';
import '../../index.css';

export default function Footer() {
    return (
        <footer className={Styles.footerContainer} id="footer">
            <div className={Styles.footerWrapper}>
                <ul className={Styles.navLogo}>
                    <li className={Styles.logo}>
                        <img src={Logo} alt="Logo" />
                    </li>
                </ul>
                <ul className={Styles.navLinks}>
                    <li className={Styles.navLink}>Acceuil</li>
                    <li className={Styles.navLink}>Films</li>
                    <li className={Styles.navLink}>News</li>
                    <li className={Styles.navLink}>Contact</li>
                </ul>
                <ul className={Styles.navSocials}>
                    <li className={Styles.navLink}>
                        <button>Facebook</button>
                    </li>
                    <li className={Styles.navLink}>
                        <button>Twitter</button>
                    </li>
                    <li className={Styles.navLink}>
                        <button>Instagram</button>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
