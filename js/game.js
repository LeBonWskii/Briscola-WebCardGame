player=new Player();
bot=new Player();
deck=new Deck();

deck.setDeck();

let remainingCards=deck.cards.length;

let cardsPlayed=0;

let playerStart=true;

let playerTurn=false;

let backToHome=false;

let lastHandBot;


function resetBoard(){
    for (let i=0;i<3;i++){
        removeCardFromDiv(document.getElementsByClassName("player_card")[i]);
        removeCardFromDiv(document.getElementsByClassName("bot_card")[i]);
    }
    removeCardFromDiv(document.getElementById("briscola_card"));
    removeCardFromDiv(document.getElementById("remaining_deck"));
    removeCardFromDiv(document.getElementById("played_card_player"));
    removeCardFromDiv(document.getElementById("played_card_bot"));
    removeCardFromDiv(document.getElementById("player_taken_cards"));
    removeCardFromDiv(document.getElementById("bot_taken_cards"));
    document.getElementById("remaining_cards_number").innerText="";
    
    document.getElementById("first_player_card").classList.remove("card_selection");
    document.getElementById("second_player_card").classList.remove("card_selection");
    document.getElementById("third_player_card").classList.remove("card_selection");


    document.getElementById("remaining_cards_number").innerText="";

}


document.getElementById("play_btn").addEventListener("click", () => {
    goToGamepage();
    startGame();
});

document.getElementById("back_to_home_img").addEventListener("click", () => {
   if(backToHome){
    resetBoard();
    backToHomepage(true)
    backToHome=false;
}

});


document.getElementById("first_player_card").addEventListener("click", () => {
    if (playerTurn && document.getElementById("first_player_card").hasChildNodes()) {
        playCard(player,player.handCards[0], 0, document.getElementById("first_player_card"));
        playerTurn = false;

        document.getElementById("first_player_card").classList.remove("card_selection");
        document.getElementById("second_player_card").classList.remove("card_selection");
        document.getElementById("third_player_card").classList.remove("card_selection");
        
        if(playerStart)//se è partito il giocatore parte il turno del bot
            setTimeout(() => {
                botRound();
            },1500);
        
        else{
            cardsPlayed+=2;
            setTimeout(() => {
            evaluetePlayedCards();
            },1100 );
        }// se è partito il bot valuto le carte giocate
    }
});

document.getElementById("second_player_card").addEventListener("click", () => {

    if (playerTurn && document.getElementById("second_player_card").hasChildNodes()) {
        let indexIntoArray=1;
        if(cardsPlayed===36 && player.indexOfPlayedCard===indexIntoArray-1) // se siamo al penultimo turno e il giocatore ha giocato la carta nel posto 0 (quindi esiste la carta nel posto successivo)
            indexIntoArray--;
        if(cardsPlayed===38) // se siamo all'ultimo turno si decrementa a prescindere perchè la carta nel posto 0 è stata sicuramente giocata
            indexIntoArray--;

        playCard(player,player.handCards[indexIntoArray], indexIntoArray, document.getElementById("second_player_card"));
        playerTurn = false;

        document.getElementById("first_player_card").classList.remove("card_selection");
        document.getElementById("second_player_card").classList.remove("card_selection");
        document.getElementById("third_player_card").classList.remove("card_selection");
    
        if(playerStart)//se è patito il giocatore parte il turno del bot
            setTimeout(() => {
                botRound();
            },1500);
    
        else{
            cardsPlayed+=2;
            setTimeout(() => {
                evaluetePlayedCards();
                }, 1100);
    }// se è partito il bot valuto le carte giocate
}
});
document.getElementById("third_player_card").addEventListener("click", () => {
    if (playerTurn  && document.getElementById("third_player_card").hasChildNodes()) {
        let indexIntoArray=2;
        if(cardsPlayed===36) // siamo al penultimo turno e il giocatore vuole giocare la terza carta allora sicuramente una tra le prime due è stata giocata
            indexIntoArray--;
        if(cardsPlayed===38)
            indexIntoArray-=2; // se siamo all'ultimo turno e il giocatore vuole giocare la terza carta allora sicuramente le prime due sono state giocate
        playCard(player,player.handCards[indexIntoArray], indexIntoArray, document.getElementById("third_player_card"));
        playerTurn = false;

        document.getElementById("first_player_card").classList.remove("card_selection");
        document.getElementById("second_player_card").classList.remove("card_selection");
        document.getElementById("third_player_card").classList.remove("card_selection");

        if(playerStart)//se è patito il giocatore parte il turno del bot
            setTimeout(() => {
                botRound();
            },1500);

        else{
            cardsPlayed+=2;
            setTimeout(() => {
                evaluetePlayedCards();
                }, 1100);
        }// se è partito il bot valuto le carte giocate
    }
});



document.getElementById("new_game_btn").addEventListener("click", () => {

    removeEndgameElements();

    document.getElementById("remaining_cards_number").innerText="";
    document.getElementById("endgame_container").classList.add("hidden");
    document.getElementById("game_container").classList.remove("hidden");
    document.getElementById("back_to_home_container").classList.remove("hidden");
    startGame();
});

document.getElementById("endgame_back_to_home_btn").addEventListener("click", () => {
    document.getElementById("order_stats").value="wins";
    showStats();
    removeEndgameElements();
    
    document.getElementById("remaining_cards_number").innerText="";
    document.getElementById("endgame_container").classList.add("hidden");
    document.getElementById("back_to_home_container").classList.add("hidden");
    document.getElementById("homepage_header_container").classList.remove("hidden");
    document.getElementById("homepage_main_container").classList.remove("hidden");
    document.getElementById("more_info").classList.remove("hidden");

});

function goToGamepage() {
    document.getElementById("homepage_header_container").classList.add("hidden");
    document.getElementById("homepage_main_container").classList.add("hidden");
    document.getElementById("game_container").classList.remove("hidden");
    document.getElementById("back_to_home_container").classList.remove("hidden");
    document.getElementById("more_info").classList.add("hidden");
}

function showCardIntoDiv(divElement, suit="back", value="back") {
    let img = document.createElement("img");
    divElement.appendChild(img);
    if(suit==="back"){
        img.src = "./images/decks/"+chosenDeck+"/back.svg";
        img.alt="back";
    }
    else{
        img.src = "./images/decks/"+chosenDeck+"/"+suit+"_"+value+".svg";
        img.alt=suit+" "+value;
    }
    img.style.width = "10vh"; 
    img.style.height = "15vh"; 


}

function removeCardFromDiv(divElement) {
    divElement.innerHTML = "";

}

function decrementRemainingCards(){
    remainingCards--;
    document.getElementById("remaining_cards_number").innerText=remainingCards;
}

function startGame(){
    document.getElementById("remaining_cards_number").classList.remove("remaining_cards_number");
    player.resetPlayer();
    bot.resetPlayer();
    deck.setDeck();
    cardsPlayed=0;
    remainingCards=deck.cards.length;
    showCardIntoDiv(document.getElementById("remaining_deck"));
    let clone=document.getElementById("remaining_deck").firstElementChild.cloneNode(true);
    document.getElementById("remaining_deck").appendChild(clone);
    deck.shuffle();


    document.getElementById('remaining_deck').firstElementChild.classList.add('shuffle');
    document.getElementById('remaining_deck').lastElementChild.classList.add('shuffle-reverse');

    
    
    setTimeout(() => {
        document.getElementById('remaining_deck').firstElementChild.classList.remove('shuffle');
        document.getElementById('remaining_deck').lastElementChild.classList.remove('shuffle-reverse');
        document.getElementById("remaining_cards_number").classList.add("remaining_cards_number");
        document.getElementById("remaining_deck").lastElementChild.remove();
        cardDistribution();
        
    }, 2000);

}

function cardAnimation(from,to,initialPosition){
    let finalPosition=to.getBoundingClientRect();

    let translateX = finalPosition.x - initialPosition.x;
    let translateY = finalPosition.y - initialPosition.y;


    from.style.transition = 'transform 0.5s linear';
    from.style.transform = `translate(${translateX}px, ${translateY}px)`;
}




async function animateAndShowCard(clone, target, card,initialPosition,fromHandWinner=false) {
    cardAnimation(clone, target, initialPosition);
    await new Promise(resolve => setTimeout(resolve, 600));
    clone.remove();
    if(!fromHandWinner){
        if(card==="back") //serve per mostrare le carte del bot coperte
            showCardIntoDiv(target);
        else
            showCardIntoDiv(target,card.suit,card.value);
    }
}

async function cardDistribution() {
    document.getElementById("remaining_cards_number").innerText = remainingCards;
    let clone;
    let initialPosition = document.getElementById("remaining_deck").getBoundingClientRect();


    if (Math.random() > 0.5) {
        for (let i = 0; i < 3; i++) {
            player.setCard(deck.deal());
            decrementRemainingCards();
            clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
            document.getElementById("remaining_deck").appendChild(clone);
            await animateAndShowCard(clone, document.getElementsByClassName("player_card")[i], player.handCards[i],initialPosition);

            bot.setCard(deck.deal());
            decrementRemainingCards();
            clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
            document.getElementById("remaining_deck").appendChild(clone);
            await animateAndShowCard(clone, document.getElementsByClassName("bot_card")[i], "back",initialPosition);
        }
        playerStart = true;
    } 
    else {
        for (let i = 0; i < 3; i++) {
            
            bot.setCard(deck.deal());
            decrementRemainingCards();
            clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
            document.getElementById("remaining_deck").appendChild(clone);
            await animateAndShowCard(clone, document.getElementsByClassName("bot_card")[i], "back",initialPosition);
            
            player.setCard(deck.deal());
            decrementRemainingCards();
            clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
            document.getElementById("remaining_deck").appendChild(clone);
            await animateAndShowCard(clone, document.getElementsByClassName("player_card")[i], player.handCards[i],initialPosition);
        }
        playerStart = false;
    }

    deck.briscola = deck.deal();
    clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
    document.getElementById("remaining_deck").appendChild(clone);
    await animateAndShowCard(clone, document.getElementById("briscola_card"), deck.briscola,initialPosition);
    backToHome=true;
    setTimeout(() => {
    playRound();
    },1000);
}

function playRound(){

    if(playerStart){
        document.getElementById("first_player_card").classList.add("card_selection");
        document.getElementById("second_player_card").classList.add("card_selection");
        document.getElementById("third_player_card").classList.add("card_selection");
        playerTurn=true;
    }
    else{
        playerTurn=false;
        botRound();
    }
    }

async function playMinCard(){
    let indexOfCardToPlay=findIndexOfMinCardNotBriscola();
    if(indexOfCardToPlay===-1){
        let minIndex=findIndexOfMinCard();
        indexOfDiv=findIndexOfDiv(bot.handCards[minIndex].suit,bot.handCards[minIndex].value);
        await playCard(bot,bot.handCards[minIndex],minIndex,document.getElementsByClassName("bot_card")[indexOfDiv]);
    }
    else{
        indexOfDiv=findIndexOfDiv(bot.handCards[indexOfCardToPlay].suit,bot.handCards[indexOfCardToPlay].value);
        await playCard(bot,bot.handCards[indexOfCardToPlay],indexOfCardToPlay,document.getElementsByClassName("bot_card")[indexOfDiv]);
    }
}

async function botRound(){
    let indexOfDiv;
    if(playerStart){ // se parte il giocatore il bot deve scegliere la carta da giocare con una strategia diversa
        if(player.cardPlayed.suit===deck.briscola.suit){ // la carta giocata dal giocatore è briscola
            let aceBriscola=bot.handCards.find(card => card.score===11 && card.suit===deck.briscola.suit); // cerco l'asso di briscola
            if(player.cardPlayed.score === 10 && aceBriscola){// se il giocatore ha giocato il 3 di briscola allora il bot deve giocare l'asso di briscola
                indexOfDiv=findIndexOfDiv(aceBriscola.suit,aceBriscola.value);
                await playCard(bot,aceBriscola,bot.handCards.indexOf(aceBriscola),document.getElementsByClassName("bot_card")[indexOfDiv]);
            }
            else
                await playMinCard();
        
    }
    else { // se il giocatore non ha giocato una carta di briscola
        let indexofMaxCard=findIndexOfMaxCard();
        if(indexofMaxCard!==-1){ // se trovo la carta dello stesso seme che supera la carta giocata dal player la gioco
            indexOfDiv=findIndexOfDiv(bot.handCards[indexofMaxCard].suit,bot.handCards[indexofMaxCard].value);
            await playCard(bot,bot.handCards[indexofMaxCard],indexofMaxCard,document.getElementsByClassName("bot_card")[indexOfDiv]);
        }
        else if(player.cardPlayed.score===10 || player.cardPlayed.score===11){ //  se il giocatore ha giocato un 3 o un asso
            let briscolaToPlay=bot.handCards.find(card => card.suit===deck.briscola.suit); // cerco una carta di briscola
            if(briscolaToPlay){ // se la trovo la gioco
                indexOfDiv=findIndexOfDiv(briscolaToPlay.suit,briscolaToPlay.value);
                await playCard(bot,briscolaToPlay,bot.handCards.indexOf(briscolaToPlay),document.getElementsByClassName("bot_card")[indexOfDiv]);
            }
            else // gioco la carta più bassa che ho
                await playMinCard();
            
            }
            else// gioco la carta più bassa che ho
                await playMinCard();
            
        }
    }
    else // se parte il bot gioca la carta con valore più basso
        await playMinCard();
    
    
    // viene verificato come deve proseguire il turno
    if(playerStart){
        cardsPlayed+=2;
        setTimeout(() => {
            evaluetePlayedCards();
        }, 1100);   
    }
    else{
        document.getElementById("first_player_card").classList.add("card_selection");
        document.getElementById("second_player_card").classList.add("card_selection");
        document.getElementById("third_player_card").classList.add("card_selection");
        playerTurn=true;
    }
    
}

async function evaluetePlayedCards(){
    
    if(player.cardPlayed.suit===bot.cardPlayed.suit){ // se le due carte hanno lo stesso seme
        if(player.cardPlayed.score>bot.cardPlayed.score)// se la carta del giocatore ha un punteggio maggiore
            await handWinner(player,document.getElementById("player_taken_cards"));
        else if(bot.cardPlayed.score>player.cardPlayed.score) // se la carta del bot ha un punteggio maggiore
            await handWinner(bot,document.getElementById("bot_taken_cards"));
        else{ // se hanno lo stesso punteggio
            if(player.cardPlayed.value>bot.cardPlayed.value) // se la carta del giocatore ha un valore maggiore
            await handWinner(player,document.getElementById("player_taken_cards"));
            else // se la carta del bot ha un valore maggiore
            await handWinner(bot,document.getElementById("bot_taken_cards"));
        }
    }

    else if(player.cardPlayed.suit===deck.briscola.suit) // se il giocatore ha giocato una briscola (siamo nel caso in cui i semi giocati sono diversi quindi il bot non ha giocato una briscola)
        await handWinner(player,document.getElementById("player_taken_cards"));
    else if(bot.cardPlayed.suit===deck.briscola.suit)
        await handWinner(bot,document.getElementById("bot_taken_cards"));
    else{
        if(playerStart)
            await handWinner(player,document.getElementById("player_taken_cards"));
        else
            await handWinner(bot,document.getElementById("bot_taken_cards"));
}

if(cardsPlayed===40) // se sono state giocate tutte le carte finisce la partita
    endGame();

else{
    if(remainingCards===0) // se non ci sono più carte da distribuire si gioca subito
        playRound();
    else                   // altrimenti si distribuisce prima le carte
        dealCard();
    
}

}

async function dealCard(){
    let clone;
    if(playerStart){
        player.setCard(deck.deal(),false,player.indexOfPlayedCard);
        decrementRemainingCards();
        clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
        document.getElementById("remaining_deck").appendChild(clone);
        if(remainingCards===1)
            document.getElementById("remaining_deck").removeChild(document.getElementById("remaining_deck").firstElementChild);
    
        await animateAndShowCard(clone, document.getElementsByClassName("player_card")[player.indexOfPlayedCard], player.handCards[player.indexOfPlayedCard],document.getElementById("remaining_deck").getBoundingClientRect());
    
        decrementRemainingCards();//per visibilità nel gioco si decrementa prima il contatore quindi successivamente il controllo è fatto con remainingCards===0
        if(remainingCards===0){ // se è rimasta una sola carta da distribuire allora devo dare al bot la briscola in tavola
            removeCardFromDiv(document.getElementById("remaining_deck"));
            bot.setCard(deck.briscola,false,bot.indexOfPlayedCard);

            lastHandBot=[...bot.handCards]; // faccio una copia dell'ultima mano del bot che servirà per trovare gli indici dei div all'ultima mano
        
            clone = document.getElementById("briscola_card").firstElementChild.cloneNode(true);
            document.getElementById("briscola_card").appendChild(clone);
            document.getElementById("briscola_card").removeChild(document.getElementById("briscola_card").firstElementChild);
            await animateAndShowCard(clone, document.getElementsByClassName("bot_card")[bot.indexOfPlayedCard], "back",document.getElementById("briscola_card").getBoundingClientRect());
        
        }
        else
        {
            bot.setCard(deck.deal(),false,bot.indexOfPlayedCard);
            clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
            document.getElementById("remaining_deck").appendChild(clone);
            await animateAndShowCard(clone, document.getElementsByClassName("bot_card")[bot.indexOfPlayedCard], "back",document.getElementById("remaining_deck").getBoundingClientRect());
        }

}

    else{
        bot.setCard(deck.deal(),false,bot.indexOfPlayedCard);
        decrementRemainingCards();
        clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
        document.getElementById("remaining_deck").appendChild(clone);

        if(remainingCards===1){
            document.getElementById("remaining_deck").removeChild(document.getElementById("remaining_deck").firstElementChild);
            lastHandBot=[...bot.handCards]; // faccio una copia dell'ultima mano del bot che servirà per trovare gli indici dei div all'ultima mano
        }

        await animateAndShowCard(clone, document.getElementsByClassName("bot_card")[bot.indexOfPlayedCard], "back",document.getElementById("remaining_deck").getBoundingClientRect());

        decrementRemainingCards();
        if(remainingCards===0){ // se è rimasta una sola carta da distribuire allora devo dare al player la briscola in tavola
            removeCardFromDiv(document.getElementById("remaining_deck"));
            player.setCard(deck.briscola,false,player.indexOfPlayedCard); //si usa l'operatore spread per passare una copia dell'oggetto
    
            clone = document.getElementById("briscola_card").firstElementChild.cloneNode(true);
            document.getElementById("briscola_card").appendChild(clone);
            document.getElementById("briscola_card").removeChild(document.getElementById("briscola_card").firstElementChild);
            await animateAndShowCard(clone, document.getElementsByClassName("player_card")[player.indexOfPlayedCard], player.handCards[player.indexOfPlayedCard],document.getElementById("briscola_card").getBoundingClientRect());
        }
        else{
            player.setCard(deck.deal(),false,player.indexOfPlayedCard);
            clone = document.getElementById("remaining_deck").lastElementChild.cloneNode(true);
            document.getElementById("remaining_deck").appendChild(clone);
            await animateAndShowCard(clone, document.getElementsByClassName("player_card")[player.indexOfPlayedCard], player.handCards[player.indexOfPlayedCard],document.getElementById("remaining_deck").getBoundingClientRect());
        }

}
playRound();
}

async function playCard(caller, card, index, divElement) {
    caller.setCardPlayed(card.suit, card.value, card.score);
    caller.setIndexOfPlayedCard(index);
    await animateAndShowCard(divElement.firstElementChild, document.getElementById(caller === player ? "played_card_player" : "played_card_bot"), card,divElement.getBoundingClientRect());
    caller.handCards.splice(index, 1);
}

async function handWinner(winner, divElement){
    winner.setPoints(player.cardPlayed.score+bot.cardPlayed.score);
    winner.setTakenCard(player.cardPlayed);
    winner.setTakenCard(bot.cardPlayed);
    
    
    await animateAndShowCard(document.getElementById("played_card_player").firstElementChild, divElement, player.cardPlayed,document.getElementById("played_card_player").getBoundingClientRect(),true);
    if(winner.cardsTaken.length===2) // si entra nell'if solo alla prima presa per evitare di chiamare la funzione showCardIntoDiv nelle volte successive
    showCardIntoDiv(divElement);
    await animateAndShowCard(document.getElementById("played_card_bot").firstElementChild, divElement, bot.cardPlayed,document.getElementById("played_card_bot").getBoundingClientRect(),true);
    

    let playerImg=document.createElement("img");
    playerImg.src="./images/decks/"+chosenDeck+"/"+player.cardPlayed.suit+"_"+player.cardPlayed.value+".svg";
    playerImg.alt=player.cardPlayed.suit+" "+player.cardPlayed.value;

    let botImg=document.createElement("img");
    botImg.src="./images/decks/"+chosenDeck+"/"+bot.cardPlayed.suit+"_"+bot.cardPlayed.value+".svg";
    botImg.alt=bot.cardPlayed.suit+" "+bot.cardPlayed.value;

    
    
    if(winner===player){
        document.getElementById("player_cards_review").appendChild(playerImg);
        document.getElementById("player_cards_review").appendChild(botImg);
        playerStart=true;
    }
    else{
        document.getElementById("bot_cards_review").appendChild(botImg);
        document.getElementById("bot_cards_review").appendChild(playerImg);
        playerStart=false; 
    }
}

function endGame(){
    
    
    sendGameToSave();

    botPoints=document.createElement("h3");
    document.getElementById("endgame_message_container").appendChild(botPoints);
    botPoints.id="bot_points";
    botPoints.classList.add("bot_points");

    endgameMessage=document.createElement("h2");
    document.getElementById("endgame_message_container").appendChild(endgameMessage);
    endgameMessage.id="endgame_message";
    endgameMessage.classList.add("endgame_message");

    playerPoints=document.createElement("h3");
    document.getElementById("endgame_message_container").appendChild(playerPoints);
    playerPoints.id="player_points";
    playerPoints.classList.add("player_points");


    document.getElementById("game_container").classList.add("hidden");
    document.getElementById("back_to_home_container").classList.add("hidden");
    document.getElementById("endgame_container").classList.remove("hidden");

if(player.points>bot.points){
    document.getElementById("player_cards_review").classList.add("win_style_img");
    document.getElementById("bot_cards_review").classList.add("lose_style_img");
}
else if(player.points<bot.points){
    document.getElementById("bot_cards_review").classList.add("win_style_img");
    document.getElementById("player_cards_review").classList.add("lose_style_img");
}
else{
    document.getElementById("player_cards_review").classList.add("draw_style_img");
    document.getElementById("bot_cards_review").classList.add("draw_style_img");
}

document.getElementById("bot_points").innerText=bot.points;

if(player.points>bot.points){
    document.getElementById("endgame_message").innerText="Hai vinto!";
    document.getElementById("bot_points").classList.add("lose_style");
    document.getElementById("endgame_message").classList.add("win_style");
    document.getElementById("player_points").classList.add("win_style");
    
}
else if(player.points<bot.points){
    document.getElementById("endgame_message").innerText="Hai perso!";
    document.getElementById("bot_points").classList.add("win_style");
    document.getElementById("endgame_message").classList.add("lose_style");
    document.getElementById("player_points").classList.add("lose_style");
    
}
else{
    document.getElementById("endgame_message").innerText="Pareggio!";
    document.getElementById("bot_points").classList.add("draw_style");
    document.getElementById("endgame_message").classList.add("draw_style");
    document.getElementById("player_points").classList.add("draw_style");
    
}

document.getElementById("player_points").innerText=player.points;

backToHome=false;

}

function sendGameToSave(){
    let game={
        result : (player.points>bot.points) ? "W" : (player.points<bot.points) ? "L" : "D",
        playerPoints : player.points
    }
    game=JSON.stringify(game);
    
    fetch('./php/save_game.php', {method: 'POST', body: game})
    .then(response => response.json())
    .then(data => {
        if(data["error"]){
            console.log(data["error"]);
        }
    })
    
}


function findIndexOfMaxCard(){
let maxIndex=-1;
let maxScore=player.cardPlayed.score;
let maxSuit=player.cardPlayed.suit;
for(let i=0;i<bot.handCards.length;i++){
    if(bot.handCards[i].suit===maxSuit && bot.handCards[i].score>maxScore){ //cerco una carta dello stesso seme di quella giocata dal player e che abbia un punteggio maggiore
        maxIndex=i;
        maxValue=bot.handCards[i].value;
        maxScore=bot.handCards[i].score;
    }
}
return maxIndex;
}




function findIndexOfMinCardNotBriscola(){
    let minScore = 10; //inizializzo il punteggio minimo a 10 perchè nel confronto voglio prendere soltanto le carte che sono inferiri al tre
    let minValue = Infinity;
    let minIndex=-1;
    for(let i=0;i<bot.handCards.length;i++){ // valuto le carte della mano
        if(bot.handCards[i].suit!==deck.briscola.suit){ //valuto soltanto le carte non di briscola
        
            if(bot.handCards[i].score<minScore){ // la carta deve avere un punteggio minore di 10
            minScore=bot.handCards[i].score; // allora la carta più bassa è quella che sto valutando
            minValue=bot.handCards[i].value;
            minIndex=i;
        }
        else if(bot.handCards[i].score!==10 && bot.handCards[i].score===minScore){ // se la carta che sto valutando ha lo stesso punteggio della carta minima (si devono escludere i tre dato che minScore è inizializzato a 10)
            if(bot.handCards[i].value<minValue){ // allora la carta più bassa è quella che ha il valore più basso
                minScore=bot.handCards[i].score;
                minValue=bot.handCards[i].value;
                minIndex=i;
            }
        }
    }
}
    return minIndex;
}

function findIndexOfDiv (suit,value){
    
    let index;
    if(cardsPlayed!==36 && cardsPlayed!==38)
        index=bot.handCards.findIndex(card => card.suit===suit && card.value===value); //se non siamo al penultimo o ultimo turno l'indice del div corrisponde all'indice dentro l'array
    else
        index=lastHandBot.findIndex(card => card.suit===suit && card.value===value); //altrimenti cerco l'indice del div nella copia dell'ultima mano originale del bot

return index;
    
}
function findIndexOfMinCard(){
    let minScore=bot.handCards[0].score;
    let minValue=bot.handCards[0].value;
    let minIndex=0;
    for(let i=1;i<bot.handCards.length;i++){ // valuto le restanti 2 carte della mano
        if(bot.handCards[i].score<minScore){ // se la carta che sto valutando ha un punteggio minore della carta minima
            minScore=bot.handCards[i].score; // allora la carta più bassa è quella che sto valutando
            minValue=bot.handCards[i].value;
            minIndex=i;
        }
        else if(bot.handCards[i].score===minScore){ // se la carta che sto valutando ha lo stesso punteggio della carta minima
            if(bot.handCards[i].value<minValue){ // allora la carta più bassa è quella che ha il valore più basso
                minScore=bot.handCards[i].score;
                minValue=bot.handCards[i].value;
                minIndex=i;
            }
        }
    }
    return minIndex;
}


function removeEndgameElements(){    

    
    document.getElementById("player_cards_review").innerHTML="";
    document.getElementById("bot_cards_review").innerHTML="";
    document.getElementById("endgame_message_container").innerHTML="";

    document.getElementById("player_cards_review").classList.remove("win_style_img");
    document.getElementById("player_cards_review").classList.remove("lose_style_img");
    document.getElementById("player_cards_review").classList.remove("draw_style_img");

    document.getElementById("bot_cards_review").classList.remove("win_style_img");
    document.getElementById("bot_cards_review").classList.remove("lose_style_img");
    document.getElementById("bot_cards_review").classList.remove("draw_style_img");
    

    
    removeCardFromDiv(document.getElementById("bot_taken_cards"))
    removeCardFromDiv(document.getElementById("player_taken_cards"))
    

}