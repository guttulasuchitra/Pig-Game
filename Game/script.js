'use strict';
//Selecting elemnts
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// reating code functions
const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // generating Randon dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1:if true : switch player
    if (dice != 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //handy trick
      //current0El.textContent = currentScore;
    } else {
      //switch to next player
      switchplayer();
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the active player's score is >= 100 to finish the game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch the player
      switchPlayer();
    }
  }
});

// Fuctionality of Reset

btnNew.addEventListener('click', function () {
  //Reset fuctionality
  scores[0] = 0;
  scores[1] = 1;
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //Reset UI elements
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //Remove winner and active player styles
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //hide Dice
  diceEl.classList.add('hidden');
});
