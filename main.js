// l programma deve generare 16 numeri compresi tra 1 e 100: queste saranno le mine.
// Dopodiché, il programma deve chiedere all'utente un numero alla volta e verificare se il numero indicato dall'utente è una mina oppure no.
// Se l'utente becca una mina, il gioco finisce, mentre, se il numero non corrisponde ad una mina, il gioco prosegue e il programma chiede all'utente un nuovo numero.
// Alla fine della partita, il programma comunica all'utente il suo punteggio, cioè quanti numeri è riuscito ad inserire prima che il gioco finisse.
// BONUS (facoltativo): all'inizio del gioco, il programma chiede all'utente il livello di difficoltà:
// 0 = l'intervallo di numeri possibili è tra 1 e 100
// 1 = l'intervallo di numeri possibili è tra 1 e 80
// 2 = l'intervallo di numeri possibili è tra 1 e 50

// Selezione livello difficoltá
do {
    var livelloDifficolta = parseInt(prompt('Inserire il livello di difficoltá (da 1 a 3)'));
} while (isNaN(livelloDifficolta) || livelloDifficolta < 1 || livelloDifficolta > 3);
console.log('il livello di difficoltá scelto è: ' + livelloDifficolta);

// a seconda del livello scelto determinare gli estremi dei numeri
var min = 1
var max = determinaMax(livelloDifficolta);

// generazione di 16 numeri casuali da un min ad un massimo
var bombNumbers = 16;
var bombValues = getNDifferentRandomNumbers(bombNumbers, min, max);
console.log(bombValues);

// lútente inserisce de numeri finche non sceglie un numero contenuto in bomb bombValues
var quantitaScelte = 0;
var numeriSceltiPrecedentemente = [];
var numeroScelto;
var winning = true;
do {
    numeroScelto = parseInt(prompt('Inserire un numero da ' + min + ' a ' + max + ':'));

    if (!numeriSceltiPrecedentemente.includes(numeroScelto) && !isNaN(numeroScelto) && numeroScelto < max && numeroScelto > min) {
        for (var i = 0; i < bombValues.length; i++) {
            if(numeroScelto == bombValues[i]) {
                winning = false
            }
        }
        console.log('numero scelto: ' + numeroScelto);
        if(winning) {
            quantitaScelte++;
            console.log('Non hai preso una bomba, puoi continuare! Per adesso sei a: ' + quantitaScelte);
            numeriSceltiPrecedentemente.push(numeroScelto);
        }
    }
} while (winning && quantitaScelte < (max - bombNumbers));

if(winning) {
    console.log('Complimenti hai vinto! hai indovinato ' + quantitaScelte + ' volte!');
} else {
    console.log('Hai perso! Il tuo punteggio è: ' + quantitaScelte + '!');
}

function determinaMax(numeroDifficolta) {
    if (numeroDifficolta == 1) {
        return 100;
    } else if (numeroDifficolta == 2) {
        return 80;
    } else {
        return 50;
    }
}

function getNDifferentRandomNumbers(quantita, min, max) {
    var array = [];
    while (array.length < quantita) {
        var randomNumber = getRandomNumber(min, max);
        if(!array.includes(randomNumber)) {
            array.push(randomNumber);
        }
    }
    return array;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min
}
