import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend'; // Plugin pour charger les fichiers JSON

i18n.use(HttpBackend) // Charge les traductions depuis les fichiers
    .use(LanguageDetector) // Détecte la langue du navigateur
    .use(initReactI18next) // Intègre avec React
    .init({
        backend: {
            loadPath: '/translations/{{lng}}/{{ns}}.json', // Chemin vers les fichiers de traduction
        },
        fallbackLng: 'fr', // Langue par défaut si aucune langue n'est détectée
        ns: ['common', 'header', 'footer'], // Liste des namespaces
        defaultNS: 'common', // Namespace par défaut
        interpolation: {
            escapeValue: false, // Pas besoin d'échapper pour React
        },
    });

export default i18n;
