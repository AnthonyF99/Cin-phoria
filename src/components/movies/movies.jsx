import Styles from '../../styles/movies.module.scss';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [visibleMovies, setVisibleMovies] = useState(8);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const [originalData, setOriginalData] = useState([]);

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

    // Sort Ascendant & Descendant
    const sortDate = () => {
        const sortedData = [...movies].sort((a, b) => {
            if (isAscending) {
                return new Date(a.releaseDate) - new Date(b.releaseDate);
            } else {
                return new Date(b.releaseDate) - new Date(a.releaseDate);
            }
        });
        setMovies(sortedData);
        setIsAscending(!isAscending);
    };

    // Function to reset data
    const resetData = () => {
        setMovies(originalData);
        setIsAscending(true);
        setQuery('');
    };

    //Function to get the soon movie
    const comingSoon = useCallback(() => {
        const currentDate = new Date();
        const soonMovies = movies.filter((movie) => {
            const movieDate = new Date(movie.releaseDate);
            return movieDate > currentDate; // keep movie that comme soon
        });
        setMovies(soonMovies); // update displayed movies list
    }, [movies]);

    //Function to search movie
    const handleSearch = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    useEffect(() => {
        fetch('/data/movies.json')
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.allMovies);
                setOriginalData(data.allMovies); // Keep a copy of original data
            })
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
                <div className={Styles.moviesFilters}>
                    <ul>
                        <li className={Styles.filter} onClick={resetData}>
                            Tout les films
                        </li>
                        <li className={Styles.filter} onClick={sortDate}>
                            Par date
                        </li>
                        <li className={Styles.filter}>Par catégorie</li>
                        <li className={Styles.filter} onClick={comingSoon}>
                            A venir
                        </li>
                    </ul>
                </div>
                <div className={Styles.moviesSearch}>
                    <ul>
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
            </div>
            <hr></hr>
            <div className={Styles.moviesListContainer}>
                {filteredMovies.slice(0, visibleMovies).map((movie) => (
                    <div key={movie.id} className={Styles.movie}>
                        <Link to={`/movie/${movie.id}`}>
                            <div className={Styles.movieImage}>
                                <img
                                    src={`${movie.poster}`}
                                    alt={`Affiche du film ${movie.title}`}
                                />
                            </div>
                            <h2>{movie.title}</h2>
                            <p>{movie.releaseDate}</p>
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
