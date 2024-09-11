import { useEffect, useState } from 'react';
import './App.css';
import cardImages from './utils/CardImages';
import shuffleCards from './utils/ShuffleCards';
import Card from './components/Card/Card';
import Counter from './components/Counter/Counter';
import Modal from './components/Modal/Modal';
import formatTimeSecondsToMinutes from './utils/FormatTime';
import getLevelDifficulty from './utils/LevelAssignment';

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [numberOfPairsOfCards, setNumberOfPairsOfCards] = useState(cardImages.length);
  const [numberOfPairsOfCardsFound, setNumberOfPairsOfCardsFound] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const [levelDifficultySelected, setLevelDifficultySelected] = useState('normal');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const timerStart = () => setTimerIsActive(true);
  const timerStop = () => setTimerIsActive(false);

  const timerReset = () => {
    setTimerIsActive(false);
    setSeconds(0);
  };

  // initialice game
  useEffect(() => {
    handleNewGame();
  }, []);

  useEffect(() => {
    handleNewGame();
  }, [levelDifficultySelected]);

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
              setNumberOfPairsOfCardsFound(numberOfPairsOfCardsFound + 1);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, [1000])
      }
    }
  }, [choiceOne, choiceTwo]);

  // check if player win the game
  useEffect(() => {
    if (numberOfPairsOfCardsFound === numberOfPairsOfCards) {
      openModal();
      timerStop();
    }
  }, [numberOfPairsOfCardsFound]);

  // start a new game
  const handleNewGame = () => {
    const levelDifficulty = getLevelDifficulty(levelDifficultySelected);

    const shuffledCards = shuffleCards(cardImages.slice(0, levelDifficulty));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setNumberOfPairsOfCardsFound(0);
    setNumberOfPairsOfCards(levelDifficulty);
    timerReset();
    timerStart();
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

  const handleLevelDifficulty = (level) => {
    setLevelDifficultySelected(level);
  };

  return (
    <div className='app'>
      <h1>Memo</h1>
      <button onClick={handleNewGame}>Nueva Partida</button>

      <div>
        <button onClick={() => handleLevelDifficulty('veryEasy')}>Muy Facil</button>
        <button onClick={() => handleLevelDifficulty('easy')}>Facil</button>
        <button onClick={() => handleLevelDifficulty('normal')}>Normal</button>
        <button onClick={() => handleLevelDifficulty('hard')}>Dificil</button>
      </div>

      <div className='turns'>Turnos: {turns}</div>
      <div>
        <Counter
          seconds={seconds}
          setSeconds={setSeconds}
          isActive={timerIsActive}
        />
      </div>

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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>¡Ganaste!</h2>
        <p>Tu tiempo: {formatTimeSecondsToMinutes(seconds)}</p>
        <p>Total de turnos: {turns}</p>
      </Modal>
    </div>
  );
}

export default App;
