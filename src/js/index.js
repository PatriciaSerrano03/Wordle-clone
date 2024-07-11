// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const All_Words = ['peli', 'animales', 'abrigarse', 'playas'];

const Number_tries = 5;

const gameBoardElement = document.getElementById('game-board');
const userWordFormElement = document.getElementById('user-word-form');

let secretWord;

//Elegir la palabra del wordle
const chooseSecretWord = () => {
  const randomNumber = Math.floor(Math.random() * All_Words.length);
  secretWord = All_Words[randomNumber];
  console.log(secretWord);
};

//Crear cuadrados de en funcion de la palabra
const createGameBoard = () => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < Number_tries; i++) {
    const newRow = document.createElement('div');
    newRow.classList.add('game-board__row');
    for (let j = 0; j < secretWord.length; j++) {
      const newContainer = document.createElement('span');
      newContainer.classList.add('letter');
      newRow.append(newContainer);
    }

    fragment.append(newRow);
  }

  gameBoardElement.append(fragment);
};

const StartGame = () => {
  chooseSecretWord();
  createGameBoard();
};

const printLetter = (letter, position, className) => {
  const letterBox = gameBoardElement.children[currentRow].children[position];
  letterBox.classList.add(className);
  letterBox.textContent = letter;
};

const CheckRow = word => {
  let className;
  let wordCheck = secretWord;
  // Buscar las letras que son correctas
  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (letter === secretWord[i]) {
      className = 'letter--correct';
      wordCheck = wordCheck.replace(letter, '-');
      printLetter(letter, i, className);
    }
  }

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];
    if (wordCheck.includes(letter)) {
      className = 'letter--present';
      wordCheck = wordCheck.replace(letter, '-');
    } else {
      className = 'letter--incorrect';
    }
    printLetter(letter, i, className);
  }
  currentRow++;
};

StartGame();

userWordFormElement.addEventListener('submit', event => {
  event.preventDefault();
  const userWord = event.target.word.value;
  if (secretWord.length !== userWord.length) {
    console.log(`La palabra tiene que tener ${secretWord.length} letras.`);
    return;
  }
  CheckRow(userWord);
  event.target.reset();
});
