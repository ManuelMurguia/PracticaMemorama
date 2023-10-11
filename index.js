const memoramaBoard = document.getElementById('memorama-board');
let cards = [];
let flippedCards = [];
let matchedPairs = 0;

// Función para barajar un array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Función para crear una matriz con pares de tarjetas
function createCardPairs() {
    const imgPaths = Array.from({ length: 10 }, (_, i) => `img/img${i + 1}.jpg`);
    const pairs = imgPaths.concat(imgPaths);
    shuffleArray(pairs);
    return pairs;
}

// Función para crear una tarjeta y añadirla al tablero
function createCard(imgPath) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<img class="card-image hidden" src="${imgPath}" alt="Card Image">`;
    card.addEventListener('click', () => flipCard(card));
    memoramaBoard.appendChild(card);
    cards.push(card);
}

// Función para voltear una tarjeta
function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('hidden')) {
        card.classList.add('hidden');
        card.querySelector('.card-image').style.visibility = 'visible'; // Mostrar la imagen
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

// Función para comprobar si las tarjetas son iguales
function checkForMatch() {
    if (flippedCards[0].querySelector('.card-image').src === flippedCards[1].querySelector('.card-image').src) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        flippedCards = [];
        matchedPairs++;

        if (matchedPairs === cards.length / 2) {
            setTimeout(() => {
                alert('¡Has ganado!');
                resetGame();
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove('hidden');
            flippedCards[0].querySelector('.card-image').style.visibility = 'hidden'; // Ocultar la imagen
            flippedCards[1].classList.remove('hidden');
            flippedCards[1].querySelector('.card-image').style.visibility = 'hidden'; // Ocultar la imagen
            flippedCards = [];
        }, 500);
    }
}

// Función para reiniciar el juego
function resetGame() {
    cards.forEach(card => card.remove());
    cards = [];
    flippedCards = [];
    matchedPairs = 0;
    const imgPaths = createCardPairs();
    imgPaths.forEach(imgPath => createCard(imgPath));
}

// Iniciar el juego
const imgPaths = createCardPairs();
imgPaths.forEach(imgPath => createCard(imgPath));
