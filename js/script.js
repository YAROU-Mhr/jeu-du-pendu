const hangmanImage = document.querySelector(".hangman-box img");
const wordDeplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters, wrongGuessCount ;
const maxGuesses = 6;

const resetGame = () => {
    //réinitialisation des variables
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDeplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modelText = isVictory ? `Vous avez trouvé le mots: ` : `Le mot correcte est: `;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Félicitation!' : 'Voud avez perdu la partie!'}`;
        gameModal.querySelector("p").innerHTML = `${modelText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 1000)
}


const initGame = (button, clickedLetter) => {
    //si la lettre existe
    if (currentWord.includes(clickedLetter)) {
        console.log(clickedLetter, "exists !");
        //afficher la letter 
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDeplay.querySelectorAll("li")[index].innerText = letter;
                wordDeplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {

        console.log(clickedLetter, " n'exists pas !");
        wrongGuessCount++;
        //affichage d'image seulon le nombre de faute
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    // console.log(String.fromCharCode(i));
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);