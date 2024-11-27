import Styles from '../../styles/movies.module.scss';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState(8);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    // Function to show more movies
    const handleShowMore = useCallback(
        () => setVisibleMovies((prev) => prev + 8),
        []
    );

    // Function to fitler movie
    const filteredMovies = useMemo(() => {
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [movies, query]);

    //Function to serch movie
    const handleSearch = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    useEffect(() => {
        fetch('/data/movies.json')
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((error) => console.error('Error fetching movies:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className={Styles.loading}>Chargement des films...</div>;
    }
    if (!movies.length) {
        return <h2 className={Styles.noMovies}>Aucun film à afficher...</h2>;
    }

    return (
        <div className={Styles.moviesContainer}>
            <div className={Styles.moviesNav}>
                <ul>
                    <li>Tout les films</li>
                    <li>Par date</li>
                    <li>Par catégorie</li>
                    <li>A venir</li>
                    <li>
                        <input
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Rechercher un film"
                        />
                    </li>
                </ul>
            </div>
            <hr></hr>
            <div className={Styles.moviesListContainer}>
                {filteredMovies.slice(0, visibleMovies).map((movie) => (
                    <div key={movie.id} className={Styles.movie}>
                        <Link to={`/movie/${movie.id}`}>
                            <div className={Styles.movieImage}>
                                <img
                                    src={`${movie.poster}`}
                                    alt={movie.title}
                                />
                            </div>
                            <h2>{movie.title}</h2>
                        </Link>
                        <div className={Styles.movieHours}>
                            <button>15:00</button>
                            <button>17:00</button>
                            <button>19:00</button>
                            <button>21:00</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className={Styles.separator}>
                <span>
                    <button onClick={handleShowMore}>Show more</button>
                </span>
            </div>
        </div>
    );
}
