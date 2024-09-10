import './Card.css';

export default function Card({ card }) {

    return (
        <div className='card'>
            <img className='' src={card.src} alt='card'></img>
            <img className='back-card' src='/images/reverse.png' alt='card back'></img>
        </div>
    );
}