import { useEffect, useState } from 'react';
import './App.css';
import cardImages from './utils/CardImages';
import shuffleCards from './utils/ShuffleCards';
import Card from './components/Card/Card';

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // initialice game
  useEffect(() => {
    handleNewGame();
  }, []);

  // compare 2 selected cards
  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true);

      // if cards has match
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            // mark a card on state matched
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        console.log('> las cards no coinciden');
        setTimeout(() => {
          resetTurn();
        }, [1000])
      }
    }
  }, [choiceOne, choiceTwo]);

  // start a new game
  const handleNewGame = () => {
    const shuffledCards = shuffleCards(cardImages);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    console.log('> new game', shuffledCards, turns);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // reset player turn and enable card picking
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurn => prevTurn + 1);
    setDisabled(false);
  };

  return (
    <div className='app'>
      <h1>Memo</h1>
      <button onClick={handleNewGame}>Nueva Partida</button>
      <div className='turns'>Turnos: {turns}</div>
      <div className='grid'>
        {cards.map(card => (
          <div className='card' key={card.id}>
            <div>
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
