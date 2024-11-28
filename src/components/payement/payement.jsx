import Styles from '../../styles/payement.module.scss';

export default function Payement() {
    return (
        <div className={Styles.payementContainer}>
            <div className={Styles.payementCard}>
                <div className={Styles.leftPart}>
                    <p>Card Details</p>
                    <p>Card type</p>
                    <div className={Styles.cardVisualizer}></div>
                </div>
                <div className={Styles.rightPart}>
                    <div className={Styles.cardInfo}>
                        <label htmlFor="name">Name on Card</label>
                        <input type="text" placeholder="John Doe" id="name" />
                        <label htmlFor="cardNumber">Card Number</label>
                        <input
                            type="text"
                            placeholder="**** **** **** ****"
                            id="cardNumber"
                        />
                    </div>

                    <div className={Styles.expCV}>
                        <div>
                            <p>Expiration Date</p>
                            <span>CV</span>
                        </div>
                        <input type="text" placeholder="mm" id="month" />
                        <input type="text" placeholder="yy" id="year" />
                        <input type="text" placeholder="***" id="cv" />
                    </div>
                </div>
            </div>
            <div className={Styles.separator}>
                <span>OR</span>
            </div>
            <button className={Styles.payementButton}>Paypal</button>
        </div>
    );
}
