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

// Communico il livello di difficoltà
console.log('il livello di difficoltá scelto è: ' + livelloDifficolta);

// a seconda del livello scelto determinare gli estremi dei numeri
var min = 1
var max = determinaMax(livelloDifficolta);

// generazione di 16 numeri casuali da un min ad un massimo
var bombNumbers = 16;
var bombValues = getNDifferentRandomNumbers(bombNumbers, min, max);
console.log('I 16 numeri generati casualmente sono: ' + bombValues);

// viene dichiarato un array in cui in posizione 0 c'è l'esito della partita e nella
// posizione 1 il punteggio fatto dal giocatore
var winningAndPoints = gioco(bombValues, bombNumbers);

// a seconda dell'esito (winningAndPoints[0]) comunicare un messaggio all'utente
// comunicandogli anche il suo punteggio (winningAndPoints[1])
if(winningAndPoints[0]) {
    console.log('Complimenti hai vinto! hai indovinato ' + winningAndPoints[1] + ' volte!');
} else {
    console.log('Hai perso! Il tuo punteggio è: ' + winningAndPoints[1] + '!');
}






function gioco(bombValues, bombNumbers) {
    // l'utente inserisce de numeri finche non sceglie un numero contenuto in bomb bombValues
    // o finché non sceglie max - 16 numeri diversi
    var quantitaScelte = 0;
    var numeriSceltiPrecedentemente = [];
    var numeroScelto;
    var winning = true;

    do {
        //l'utente sceglie un numero
        numeroScelto = parseInt(prompt('Inserire un numero da ' + min + ' a ' + max + ':'));

        // controlla se il numero sia valido e se il numero inserito sia una delle bombe meno
        // e ritorna il valore della variabile winning (false se si ha perso e true se si va avanti)
        winning = controlloNumero(numeroScelto, min, max, numeriSceltiPrecedentemente, bombValues);

        // se winning è ancora true (il numero scelto non é una delle bombe) allora
        // il contatore aumenta di 1 e aggiunge la scelta ai numeri scelti ai numeri scelti precedentemente
        if(winning) {
            quantitaScelte++;
            console.log('Non hai preso una bomba, puoi continuare! Per adesso sei a: ' + quantitaScelte);
            numeriSceltiPrecedentemente.push(numeroScelto);
        }
    } while (winning && quantitaScelte < (max - bombNumbers));

    // Crea un array con i 2 valori che servono per stampare il messaggio finale
    var array = [winning, quantitaScelte]
    return array;
}

function controlloNumero(numeroScelto, min, max, numeriSceltiPrecedentemente, bombValues) {
    if (!numeriSceltiPrecedentemente.includes(numeroScelto) && !isNaN(numeroScelto) && numeroScelto < max && numeroScelto > min) {
        // Stampa numero numero scdlto
        console.log('numero scelto: ' + numeroScelto);

        // Controlla che il numero scelto non sia una delle bombe scorrendo tutto l'array
        for (var i = 0; i < bombValues.length; i++) {
            // se il numero scelto è uguale ad una bomba allora winning va a false
            if(numeroScelto == bombValues[i]) {
                return false;
            }
        }
    }
    return true;
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
