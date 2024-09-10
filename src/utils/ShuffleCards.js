const shuffleCards = (cards) => {
    const shuffledCards = [...cards, ...cards]
        .sort(() => Math.random() - 0.5)
        .map(card => ({ ...card, id: Math.random() }));

    return shuffledCards;
}

export default shuffleCards;