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
                const selectedMovie = data.find((m) => String(m.id) === id);
                setMovie(selectedMovie);
            })
            .catch((error) =>
                console.error('Erreur lors du chargement du film :', error)
            );
    }, [id]);

    return <MovieDetails movie={movie} />;
}

export default transition(MoviePage);
