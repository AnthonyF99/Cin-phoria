import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../styles/moviesDetails.module.scss';

export default function Seats({ onSeatSelect }) {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        fetch('/data/seats.json')
            .then((response) => response.json())
            .then((data) => setSeats(data.seating))
            .catch((error) => console.error('Error fetching seats:', error));
    }, []);

    const handleSeatClick = (seat, row) => {
        setSelectedSeats((prevSelected) => {
            const seatExists = prevSelected.some(
                (s) => s.seatNumber === seat.seatNumber && s.row === row
            );
            if (seatExists) {
                // Si le siège est déjà sélectionné, on le retire
                return prevSelected.filter(
                    (s) => s.seatNumber !== seat.seatNumber || s.row !== row
                );
            } else {
                // Sinon, on l'ajoute à la sélection
                return [...prevSelected, { ...seat, row }];
            }
        });
        onSeatSelect({ ...seat, row }); // Notifie le composant parent de la sélection
    };

    return (
        <div className={Styles.seatsContainer}>
            {seats.length > 0 ? (
                seats.map((seatRow, rowIndex) => (
                    <div key={rowIndex} className={Styles.row}>
                        {seatRow.seats.map((seat, seatIndex) => (
                            <div
                                key={seatIndex}
                                className={`${Styles.seat} ${
                                    selectedSeats.some(
                                        (selected) =>
                                            selected.seatNumber ===
                                                seat.seatNumber &&
                                            selected.row === seatRow.row
                                    )
                                        ? Styles.selected
                                        : ''
                                }`}
                                onClick={() =>
                                    handleSeatClick(seat, seatRow.row)
                                }
                            >
                                {seat.seatNumber}
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>Chargement des sièges...</p>
            )}
        </div>
    );
}

Seats.propTypes = {
    seats: PropTypes.arrayOf(
        PropTypes.shape({
            row: PropTypes.number.isRequired,
            seats: PropTypes.arrayOf(
                PropTypes.shape({
                    seatNumber: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ),
    onSeatSelect: PropTypes.func.isRequired, // Fonction pour gérer la sélection des sièges
};
