import { useEffect, useState } from 'react';
import './App.css';
import cardImages from './utils/CardImages';
import shuffleCards from './utils/ShuffleCards';
import Card from './components/Card/Card';

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  useEffect(() => {
    handleNewGame();
  }, []);

  const handleNewGame = () => {
    const shuffledCards = shuffleCards(cardImages);
    setCards(shuffledCards);
    setTurns(0);
    console.log('> new game', shuffledCards, turns);
  }

  return (
    <div className='app'>
      <h1>Memo</h1>
      <button onClick={handleNewGame}>Nueva Partida</button>

      <div className='grid'>
        {cards.map(card => (
          <div className='card' key={card.id}>
            <div>
              <Card key={card.id} card={card} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;
