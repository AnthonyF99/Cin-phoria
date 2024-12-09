import React, { useState } from 'react';
import Styles from '../../styles/moviesDetails.module.scss';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isBefore,
    isAfter,
} from 'date-fns';
import fr from 'date-fns/locale/fr'; // Pour le formatage en français

export default function DateSelector({ onDateSelect, onTimeSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Par défaut : aujourd'hui
    const [selectedTime, setSelectedTime] = useState(null);

    // Liste des horaires disponibles (exemple, à personnaliser)
    const movieTimes = [
        { time: '16h30', room: 'Salle 1' },
        { time: '18h30', room: 'Salle 2' },
        { time: '20h30', room: 'Salle 3' },
    ];

    const today = new Date();
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const handleDateClick = (date) => {
        if (!isBefore(date, today)) {
            setSelectedDate(date);
            onDateSelect?.(date);
        }
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
        onTimeSelect?.(time);
    };

    // Fonction pour gérer le défilement
    const handleDayScroll = (direction) => {
        const newIndex = startIndex + direction * 5;
        const maxDate = new Date('2024-12-09'); // Date limite

        if (direction < 0) {
            // Si on essaie de reculer dans le mois
            if (startIndex > 0) {
                // On reste dans le même mois et on recule de 5 jours
                setStartIndex(newIndex);
            } else {
                // Si on est déjà au début du mois, on recule au mois précédent
                const previousMonth = subMonths(currentMonth, 1);
                const previousMonthDays = eachDayOfInterval({
                    start: startOfMonth(previousMonth),
                    end: endOfMonth(previousMonth),
                });

                // Trouver le premier jour valide (pas avant aujourd'hui et pas avant maxDate)
                const firstValidDay = previousMonthDays.find(
                    (day) => !isBefore(day, today) && !isBefore(day, maxDate)
                );

                // Si on trouve un jour valide, on met à jour le mois et le startIndex
                if (firstValidDay) {
                    setCurrentMonth(previousMonth);
                    setStartIndex(
                        previousMonthDays.findIndex(
                            (day) => day.getTime() === firstValidDay.getTime()
                        )
                    );
                }
            }
        } else if (direction > 0) {
            // Si on avance
            if (newIndex < daysInMonth.length) {
                setStartIndex(newIndex);
            } else {
                // Si on dépasse la fin du mois, on passe au mois suivant
                const nextMonth = addMonths(currentMonth, 1);
                setCurrentMonth(nextMonth);
                setStartIndex(0);
            }
        }
    };

    return (
        <div>
            {/* Choix du mois */}
            <div className={Styles.dateContainer}>
                <p className={Styles.month}>
                    {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                </p>

                {/* Liste des jours */}
                <div className={Styles.chooseDate}>
                    {/* Bouton pour défiler vers les jours précédents */}
                    <button
                        className={Styles.navButton}
                        onClick={() => handleDayScroll(-1)}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    {/* Affichage des 5 jours visibles */}
                    {daysInMonth
                        .slice(startIndex, startIndex + 5)
                        .map((day) => (
                            <div
                                key={day}
                                className={`${Styles.dateInfo} ${
                                    selectedDate?.getTime() === day.getTime()
                                        ? Styles.selected
                                        : ''
                                } ${
                                    isBefore(day, today) ? Styles.disabled : ''
                                }`}
                                onClick={() =>
                                    !isBefore(day, today) &&
                                    handleDateClick(day)
                                }
                            >
                                <p>{format(day, 'EEE', { locale: fr })}</p>
                                <span>{format(day, 'd')}</span>
                            </div>
                        ))}

                    {/* Bouton pour défiler vers les jours suivants */}
                    <button
                        className={Styles.navButton}
                        onClick={() => handleDayScroll(1)}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>

            {/* Affichage des horaires pour la date sélectionnée */}
            {selectedDate && (
                <div className={Styles.movieTimeContainer}>
                    <p className={Styles.movieTimeTitle}>
                        Horaires pour le{' '}
                        {format(selectedDate, 'EEEE d MMMM yyyy', {
                            locale: fr,
                        })}
                    </p>
                    <div className={Styles.movieTime}>
                        {movieTimes.map((schedule, index) => (
                            <div
                                className={`${Styles.movieTimeInfo} ${
                                    selectedTime?.time === schedule.time
                                        ? Styles['movieTimeInfo-selected']
                                        : ''
                                }`}
                                key={index}
                                onClick={() => handleTimeClick(schedule)}
                            >
                                <p>{schedule.time}</p>
                                <span>{schedule.room}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
