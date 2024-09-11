import './Card.css';

/**
 * Card component to display a single card with front and back sides.
 * 
 * @param {Object} card - The card object containing src for front image.
 * @param {Function} handleChoice - Function to handle card selection.
 * @param {boolean} flipped - Boolean indicating if the card is flipped.
 * @param {boolean} disabled - Boolean indicating if the card is disabled for interaction.
 * @returns {JSX.Element} JSX element representing the Card component.
 */
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