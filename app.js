//+ una griglia di gioco quadrata
const gridContainer = document.querySelector(".grid-container");

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

//resetta il game
function reset() {
    location.reload();
}

//genera le 16 celle con le bombe
function generateBombsList() {
    const bombsList = [];

    while(bombsList.length < 16) {
        const randomNumber = getRandomNumber(1, 100); {
            if(!bombsList.includes(randomNumber)) {
                bombsList.push(randomNumber);
            }
        }
    }
    return bombsList;
}

//+ hai vinto/perso e punteggio
function gameOver(isWin, score) {
    //se vinco mostra alert con il punteggio totale e resetta il game
    if (isWin) {
        alert(`Hai vinto! Il tuo punteggio è ${score}`);
        reset();
    }   else {
        //se perdo mostra alert con punteggio totale e resetta il game
        alert(`Hai perso! Il tuo punteggio è ${score}`);
        reset();
    }
}

//+ celle 
function createGrid(xCells, yCells) {
    //calcolo quantità celle
    const cellsNumber = xCells * yCells;
    console.log(cellsNumber);

    //metto lo style con il calcolo delle celle fuori dal ciclo for altrimenti si ripete ad ogni cella
    gridContainer.style.width = `calc(50px * ${xCells})`; 

    const bombs = generateBombsList();
    let clicked = 0

    //+ le singole celle
    for(let i = 1; i <= cellsNumber; i++) {
        
        //+ div che rappresenta la singola cella
        const cell = document.createElement("div");
        //+ cella
        cell.classList.add("cell");

        cell.dataset.indice = i;

        cell.addEventListener("click", function() {

            if (bombs.includes(i)) {
                this.classList.add("red");
                gameOver(false, clicked);
                console.log("red");
            } else {
                this.classList.add("blue");
                console.log("blue");
                clicked++;

                if (clicked === cellsNumber - 16) {
                    gameOver(true, clicked);
                } 
            }
        })       
        //+ celle al grid container
        gridContainer.append(cell);
    }
}   

createGrid(10, 10);