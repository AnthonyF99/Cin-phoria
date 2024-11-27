import Styles from '../../styles/onDisplay.module.scss';
import { useState, useEffect } from 'react';
import defaultPoster from '../../assets/onDisplay/affiche.gif';
import defaultBg from '../../assets/onDisplay/fond.gif';

export default function OnDisplay() {
    const [movies, setMovies] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
        fetch('/data/onDisplay.json')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) =>
                console.error('Erreur lors du chargement des films :', error)
            );
    }, []);

    return (
        <div className={Styles.onDisplay}>
            <p className={Styles.onDisplayTitle}>À l'affiche</p>
            {movies.map((movie, index) => (
                <div
                    className={Styles.onDisplayContainer}
                    style={{
                        backgroundImage: `url(${
                            movie.background || defaultBg
                        })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    key={index}
                >
                    <div className={Styles.onDisplayImage}>
                        <img
                            src={movie.poster || defaultPoster}
                            alt={`Affiche de ${movie.title || 'film'}`}
                        />
                    </div>
                    <div className={Styles.onDisplayInfoContainer}>
                        <div className={Styles.onDisplayInfo}>
                            <div className={Styles.category}>
                                <p>{movie.tag || 'Tag'}</p>
                            </div>
                            <p>{movie.title || 'Titre du film'}</p>
                            <p className={Styles.onDisplayGenre}>
                                {movie.genre || 'Genre inconnu'} (
                                {movie.duration || 'Durée inconnue'})
                            </p>
                        </div>
                        <div className={Styles.onDisplaySeance}>
                            {(movie.showtimes || []).map((time) => (
                                <button
                                    key={time}
                                    className={`${Styles.onDisplayBtn} ${
                                        selectedTime === time
                                            ? Styles.selected
                                            : ''
                                    }`}
                                    onClick={() => setSelectedTime(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
