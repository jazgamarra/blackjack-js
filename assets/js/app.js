let deck = []; 
const tipos = ['C', 'D', 'H', 'S']; 
const especiales = ['A', 'J', 'Q', 'K']; 

/* Crear un deck */
const crearDeck = () => {
    for (let i = 2; i<=10; i++) {
        for (let tipo of tipos) {
            deck.push(i+tipo); 
        }
    }
    for (let tipo of tipos) {
        for  (let esp of especiales) {
            deck.push(esp+tipo); 
        }
    }
    deck = _.shuffle(deck); 
    console.log('Se genero el mazo: '+deck)
    return deck; 
}

/* Pedir una carta */ 
const pedirCarta = () => {
    // Valido que el array no este vacio 
    if (deck.length == 0) {
        throw 'No hay cartas en el deck';
    }

    let cartaEliminada = deck.pop(); 
    console.log('Se extrajo y elimino del mazo la carta: '+cartaEliminada);
    return cartaEliminada;
}

/* Calcular el valor de la carta */ 
const valorCarta = (carta) => {
    // Extraigo la primera parte de la carta 
    const valor = carta.substring(0, carta.length-1); 

    /* Si la primera parte es un numero, equivale al valor. 
    Si es una letra, depende de que letra sea */

    // let puntos = 0; 
    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10; 
    // } else {
    //     puntos = 1 * valor; 
    // }

    let puntos = (isNaN(valor)) ? 
                 ((valor === 'A') ? 11 : 10) :  
                 (1 * valor); 
    console.log('El valor de la carta extraida es:', puntos); 
    return puntos; 
}

deck = crearDeck(); 
valorCarta(pedirCarta()); 


























0/* 
    NOTAS: 

    Cartas: 
    C -> clubs (treboles) 
    D -> diamonds (diamantes)
    H -> hearts (corazones)
    S -> spades (espadas)
*/