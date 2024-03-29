// C = Clubs
// D = Diamonds
// H = Hearts
// S = Spades

let deck = [];
const cardTypes = ['C', 'D', 'H', 'S'];
const specialCards = ['A', 'J', 'Q', 'K'];

let playerScore = 0;
    computerScore = 0;

//? HMTL References
const btnHit = document.querySelector('#btnHit');
const btnStand = document.querySelector('#btnStand');
const btnNewGame = document.querySelector('#btnNewGame')
const playerScoreLabel = document.querySelector('#player-score-label');
const computerScoreLabel = document.querySelector('#computer-score-label');
const playerCardsDiv = document.querySelector('#player-cards');
const computerCardsDiv = document.querySelector('#computer-cards');

//? This function creates a deck and shuffles it.
const createDeck = () => {
    for(let i = 2; i <= 10; i++) {
        for(let cardType of cardTypes) {
            deck.push(i + cardType);
        }
    }
    for(let specialCard of specialCards) {
        for(let cardType of cardTypes) {
            deck.push(specialCard + cardType)
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

createDeck();

//? This function allows me to ask for a card.
const hit = () => {
    if(deck.length === 0) {
        throw 'No cards remaining';
    }
    const card = deck.shift();
    return card;
}

//? This function extracts the value of a card.
const cardValue = (card) => {
    // We remove the last character of the string.
    const value = card.substring(0, card.length - 1);
    // If the card has a character value.
    return (isNaN(value)) ?
        // Check if it's an Ace and assign its value.
        (value === 'A') ? 11 : 10
    // Otherwise convert the value to a number (* 1) and return it.
    : value * 1;
}

//? Computer turn
const computerTurn = (targetScore) => {
    do {
        const card = hit();
        computerScore += (cardValue(card));
        computerScoreLabel.innerHTML = computerScore;

        // <img class="blackjackCard" src="assets/cards/XX.png"></img>
        const cardImg = document.createElement('img');
        cardImg.src = `assets/cards/${card}.png`;
        cardImg.classList.add('blackjackCard');
        computerCardsDiv.append(cardImg);
    } while((computerScore < targetScore) && targetScore <= 21);

    setTimeout(() => {

    if (playerScore <= 21) {
        if (computerScore < playerScore || computerScore > 21) {
            alert("You won!");
        } else if (computerScore === playerScore) {
            alert("Tie!");
        } else {
            alert("Computer won!");
        }
    } else {
        alert("Computer won!");
    }

    }, 10);
}

//? Events
btnHit.addEventListener('click', () => {
    const card = hit();
    playerScore += (cardValue(card));
    playerScoreLabel.innerHTML = playerScore;

    // <img class="blackjackCard" src="assets/cards/XX.png"></img>
    const cardImg = document.createElement('img');
    cardImg.src = `assets/cards/${card}.png`;
    cardImg.classList.add('blackjackCard');
    playerCardsDiv.append(cardImg);

    if (playerScore > 21) {
        console.warn('You busted.');
        btnHit.disabled = true;
        btnStand.disabled = true;
        computerTurn(playerScore);
    } else if (playerScore === 21) {
        console.warn('21!');
        btnHit.disabled = true;
        btnStand.disabled = true;
        computerTurn(playerScore);
    }
});

btnStand.addEventListener('click', () => {
    btnHit.disabled = true;
    btnStand.disabled = true;
    computerTurn(playerScore);
});

btnNewGame.addEventListener('click', () => {
    console.clear();
    deck = [];
    createDeck();
    computerScore = 0;
    computerScoreLabel.innerHTML = computerScore;
    playerScore = 0;
    playerScoreLabel.innerHTML = playerScore;
    computerCardsDiv.innerHTML = '';
    playerCardsDiv.innerHTML = '';
    btnHit.disabled = false;
    btnStand.disabled = false;
})