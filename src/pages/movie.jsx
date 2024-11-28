import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/movies/movieDetails';
import transition from '../transition';

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch('/data/movies.json')
            .then((response) => response.json())
            .then((data) => {
                let selectedMovie = data.allMovies.find(
                    (m) => String(m.id) === id
                );

                if (!selectedMovie) {
                    selectedMovie = data.onDisplay.find(
                        (m) => String(m.id) === id
                    );
                }
                console.log('Film sélectionné :', selectedMovie);

                setMovie(selectedMovie);
            })
            .catch((error) =>
                console.error('Erreur lors du chargement du film :', error)
            );
    }, [id]);

    if (!movie) {
        return <p>Chargement...</p>; // Affiche un état de chargement si nécessaire
    } else if (movie === null) {
        return <p>Film non trouvé.</p>;
    }

    return <MovieDetails movie={movie} />;
}

export default transition(MoviePage);
