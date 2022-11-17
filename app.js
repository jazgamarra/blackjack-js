/** Blackjack 
 * 17/11/2022
 * Jazmin Gamarra 
 * @jazgamarra;  
 */

let deck = []; 
const tipos = ['C', 'D', 'H', 'S']; 
const especiales = ['A', 'J', 'Q', 'K']; 
let puntosJugador = 0, 
    puntosComputadora = 0; 

// Referencias del html
const btnPedir = document.querySelector('#btnPedir'); 
const btnDetener = document.querySelector('#btnDetener'); 
const btnNuevo = document.querySelector('#btnNuevo'); 
const puntajeEnPantalla = document.querySelectorAll('small'); 
const cartasJugador = document.querySelector('#jugador-cartas')
const cartasComputadora = document.querySelector('#computadora-cartas')

/* Crear un deck: Genera un mazo de cartas y lo mezcla */
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

/* Pedir una carta: elimina y devuelve la ultima carta del mazo  */ 
const pedirCarta = () => {
    // Valido que el array no este vacio 
    if (deck.length == 0) {
        throw 'No hay cartas en el deck';
    }

    let cartaEliminada = deck.pop(); 
    console.log('Se extrajo y elimino del mazo la carta: '+cartaEliminada);
    return cartaEliminada;
}

/* Calcular el valor de la carta: Si la primera parte es un numero, equivale al valor. 
    Si es una letra, depende de que letra sea  */ 

/*let puntos = 0; 
if (isNaN(valor)) {
    puntos = (valor === 'A') ? 11 : 10; 
} else {
    puntos = 1 * valor; 
}
*/
const valorCarta = (carta) => {
    // Extraigo la primera parte de la carta 
    const valor = carta.substring(0, carta.length-1); 

    let puntos = (isNaN(valor)) ? 
                 ((valor === 'A') ? 11 : 10) :  
                 (1 * valor); 
    
    console.log('El valor de la carta extraida es:', puntos); 
    return puntos; 
}

/* El turno de la computadora */
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta(); 
        puntosComputadora += valorCarta(carta);    
        puntajeEnPantalla[1].innerText = puntosComputadora; 

        // Se crea dinamicamente la imagen de la carta extraida. Se agrega al html.  
        imagen = document.createElement('img'); 
        imagen.src = `assets/cartas/${carta}.png`; 
        imagen.classList.add('carta'); 
        cartasComputadora.append(imagen); 

        if (puntosMinimos>21) {
            break; 
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21)); 
    
    evaluarGanador(puntosMinimos, puntosComputadora); 

} 

/* Evaluar que alerta lanzar segun los puntajes.  El timeout sirve para darle tiempo de ejecuciona  un proceso. */
const evaluarGanador = (puntosMinimos, puntosComputadora) => { 
    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie gana, se empataron los puntajes')
        } else if (puntosMinimos > 21) {
            alert('Computadora gana, el jugador sobrepaso los 21'); 
        } else if (puntosComputadora > 21){
            alert('Jugador gana, la computadora sobrepaso 21')
        } else {
            alert('Computadora gana')
        }
    }, 60); 

}

const nuevoJuego = () => {
    deck = []; 
    crearDeck(); 

    // Los puntos vuelven a ser cero en el programa y html 
    puntosJugador = 0; 
    puntosComputadora = 0; 
    puntajeEnPantalla[1].innerText = '0';
    puntajeEnPantalla[0].innerText = '0';

    // Se borran las cartas del div de cartas del jugador 
    cartasJugador.innerHTML = ''; 
    cartasComputadora.innerHTML = ''; 


    // Se habilitan los botones 
    btnPedir.disabled = false; 
    btnDetener.disabled = false; 

    // Se limpia la consola
    console.clear(); 
}

/* Creamos el mazo */
deck = crearDeck(); 

/* Evento: Pedir una carta */
btnPedir.addEventListener('click', () => { 
    // Se llama a la funcion pedir carta, se calcula el puntaje del jugador. 
    const carta = pedirCarta(); 
    puntosJugador += valorCarta(carta);    
    puntajeEnPantalla[0].innerText = puntosJugador; 

    // Se crea dinamicamente la imagen de la carta extraida. Se agrega al html.  
    imagen = document.createElement('img'); 
    imagen.src = `assets/cartas/${carta}.png`; 
    imagen.classList.add('carta'); 
    cartasJugador.append(imagen); 

    // Si los puntos del jugador superan 21, se debe desabilitar el boton de pedir carta
    if (puntosJugador > 21) {
        console.warn('Perdiste!');
        btnPedir.disabled = true; 
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugador); 
    } else if (puntosJugador == 21){
        console.warn('21!'); 
        btnPedir.disabled = true; 
        btnDetener.disabled = true; 
        turnoComputadora(puntosJugador); 
    }
});

/* Evento: Detener el turno del jugador y pasar el turno a la computadora*/
btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true; 
    btnDetener.disabled = true; 
    turnoComputadora(puntosJugador); 
}); 

/*Evento: Empezar de nuevo el juego*/
btnNuevo.addEventListener('click', () => {
    nuevoJuego(); 
}); 
