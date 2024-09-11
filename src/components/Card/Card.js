import './Card.css';

export default function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) handleChoice(card);
    }

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt='card'></img>
                <img className='back' src='/images/reverse.png' alt='card back' onClick={handleClick}></img>
            </div>
        </div>
    );
}