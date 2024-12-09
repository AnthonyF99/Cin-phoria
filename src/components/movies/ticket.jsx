import Styles from '../../styles/ticket.module.scss';

export default function Ticket({
    movieTitle,
    bgImage,
    ticketNumbers,
    row,
    seat,
    date,
    time,
}) {
    const err = 'unknown';
    return (
        <div className={Styles.ticketContainer}>
            <div
                className={Styles.ticket}
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className={Styles.left}>
                    <div className={Styles.topLeft}>
                        <div className={Styles.topLeftInfo}>
                            <p>Rangée: {row || err}</p>
                            <p>14 Décembre 2024</p>
                        </div>
                        <div className={Styles.topLeftInfo}>
                            <p>Siège: {seat || err}</p>
                            <p>9:40</p>
                        </div>
                    </div>
                </div>
                <div className={Styles.right}>
                    <div className={Styles.topRight}>
                        <p>Cinephoria</p>
                        <span>Cinema</span>
                    </div>
                    <div className={Styles.movieTitle}>
                        <p>{movieTitle}</p>
                    </div>
                    <div className={Styles.ticketInfo}>
                        <div
                            className={Styles.ticketInfos}
                            id={Styles.ticketInfoRow}
                        >
                            <p>Rangée</p>
                            <span>{row || err}</span>
                        </div>
                        <div
                            className={Styles.ticketInfos}
                            id={Styles.ticketInfoSeat}
                        >
                            <p>Siège</p>
                            <span>{seat || err}</span>
                        </div>
                        <div
                            className={Styles.ticketInfos}
                            id={Styles.ticketInfoDate}
                        >
                            <p>Date</p>
                            <span>{date || err}</span>
                        </div>
                        <div
                            className={Styles.ticketInfos}
                            id={Styles.ticketInfoTime}
                        >
                            <p>Heure</p>
                            <span>{time || err}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
