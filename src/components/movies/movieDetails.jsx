import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../styles/moviesDetails.module.scss';
import Seats from './seats';
import Payement from '../payement/payement';

export default function MovieDetails({ movie }) {
    const [isTransitionFinished, setIsTransitionFinished] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const maxStep = 3;

    useEffect(() => {
        // Délai pour que la transition se termine avant le scroll
        setTimeout(() => {
            setIsTransitionFinished(true);
            window.scrollTo(0, 0); // Effectue le scroll seulement après la fin de la transition
        }, 300);
    }, []); // Exécute une seule fois au montage du composant

    const handleSeatSelect = (seat) => {
        setSelectedSeats((prevSelected) => {
            const isSelected = prevSelected.some(
                (s) => s.seatNumber === seat.seatNumber && s.row === seat.row
            );
            if (isSelected) {
                // Si le siège est déjà sélectionné, on le retire
                return prevSelected.filter(
                    (s) =>
                        s.seatNumber !== seat.seatNumber || s.row !== seat.row
                );
            } else {
                // Sinon, on l'ajoute à la sélection
                return [...prevSelected, seat];
            }
        });
    };

    const isButtonDisabled = selectedSeats.length === 0; // Vérifie si aucun siège n'est sélectionné

    const nextStep = () => {
        if (currentStep < maxStep) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!movie) {
        return (
            <div className={Styles.loading}>
                <h2>Film introuvable</h2>
                <p>
                    Le film sélectionné n'existe pas ou les données sont
                    incorrectes.
                </p>
            </div>
        );
    }

    return (
        <div className={Styles.movieDetails}>
            <div
                className={Styles.top}
                style={{
                    backgroundImage: `url(${movie.poster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className={Styles.posterContainer}>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className={Styles.poster}
                    />
                </div>
                <div className={Styles.details}>
                    <h1 className={Styles.movieTitle}>
                        {movie.title} <span>({movie.releaseDate})</span>
                    </h1>
                    <span>Durée : {movie.duration} minutes</span>
                    <span>Genre : {movie.genre}</span>
                    <p>Sypnosis :</p>
                    <p className={Styles.movieDescription}>
                        {movie.description}
                    </p>
                </div>
            </div>
            <div className={Styles.bottom}>
                <div className={Styles.leftBottom}>
                    {selectedSeats.length > 0 && (
                        <>
                            {selectedSeats.map((seat) => (
                                <div
                                    className={Styles.checkout}
                                    key={seat.seatNumber}
                                >
                                    <p>
                                        Rangée {seat.row} - Siège{' '}
                                        {seat.seatNumber}{' '}
                                        <span>Disponible</span>
                                    </p>
                                </div>
                            ))}

                            <div className={Styles.checkoutCost}>
                                <span>Total :</span>
                                <span id={Styles.price}>Free</span>
                            </div>
                        </>
                    )}
                    <div className={Styles.checkoutConfirmation}>
                        <button
                            className={Styles.checkoutBtns}
                            id={Styles.cancel}
                            onClick={() => {
                                if (currentStep === 1) {
                                    setSelectedSeats([]); // Réinitialise les sièges uniquement si c'est l'étape 1
                                }
                                prevStep();
                            }} //Reset & prevstep
                        >
                            Cancel
                        </button>
                        <button
                            className={Styles.checkoutBtns}
                            id={Styles.next}
                            disabled={isButtonDisabled}
                            onClick={nextStep}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <div className={Styles.rightBottom}>
                    <div className={Styles.stepProgression}>
                        <p
                            className={
                                currentStep === 1
                                    ? Styles.activeStep
                                    : Styles.step
                            }
                        >
                            Choose your place
                        </p>
                        <p
                            className={
                                currentStep === 2
                                    ? Styles.activeStep
                                    : Styles.step
                            }
                        >
                            Payment
                        </p>
                        <p
                            className={
                                currentStep === 3
                                    ? Styles.activeStep
                                    : Styles.step
                            }
                        >
                            Ticket
                        </p>
                    </div>
                    {currentStep === 1 && (
                        <>
                            <div className={Styles.dateContainer}>
                                <p className={Styles.month}>Janvier</p>
                                <div className={Styles.chooseDate}>
                                    <div className={Styles.dateInfo}>
                                        <p>Mar</p>
                                        <span>4</span>
                                    </div>
                                    <div className={Styles.dateInfo}>
                                        <p>Mer</p>
                                        <span>5</span>
                                    </div>
                                    <div className={Styles.dateInfo}>
                                        <p>Jeu</p>
                                        <span>6</span>
                                    </div>
                                    <div className={Styles.dateInfo}>
                                        <p>Ven</p>
                                        <span>7</span>
                                    </div>
                                    <div className={Styles.dateInfo}>
                                        <p>Sam</p>
                                        <span>8</span>
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.movieTimeContainer}>
                                <p className={Styles.movieTimeTitle}>Horaire</p>
                                <div className={Styles.movieTime}>
                                    <div className={Styles.movieTimeInfo}>
                                        <p>16h30</p>
                                        <span>Salle 4</span>
                                    </div>
                                    <div className={Styles.movieTimeInfo}>
                                        <p>16h30</p>
                                        <span>Salle 4</span>
                                    </div>
                                    <div className={Styles.movieTimeInfo}>
                                        <p>16h30</p>
                                        <span>Salle 4</span>
                                    </div>
                                    <div className={Styles.movieTimeInfo}>
                                        <p>16h30</p>
                                        <span>Salle 4</span>
                                    </div>
                                    <div className={Styles.movieTimeInfo}>
                                        <p>16h30</p>
                                        <span>Salle 4</span>
                                    </div>
                                </div>
                            </div>
                            <div className={Styles.chooseSeat}>
                                <Seats onSeatSelect={handleSeatSelect} />
                            </div>
                        </>
                    )}
                    {/* Étape 2 : Paiement */}
                    {currentStep === 2 && (
                        <div>
                            <Payement />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

MovieDetails.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
    }),
};
