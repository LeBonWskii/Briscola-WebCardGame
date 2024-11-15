class Player{
    constructor(){
        this.handCards = [];
        this.cardsTaken = [];
        this.cardPlayed = null;
        this.points = 0;
        this.indexOfPlayedCard = null; // serve per sostituire la carta giocata con quella sitrubuita nello stesso punto
    }

    setCard(card,firstDeal=true,index=null){
        if(firstDeal)
            this.handCards.push(card);
        else
            this.handCards.splice(index,0,card);
    }
    resetPlayer(){
        this.handCards = [];
        this.cardsTaken = [];
        this.cardPlayed = null;
        this.points = 0;
        this.indexOfPlayedCard = null;
    }

    setTakenCard(card){
        this.cardsTaken.push(card);
    }

    setPoints(points){
        this.points += points;
    }

    setCardPlayed(suit,value,score){
        this.cardPlayed={suit,value,score};
}
    setIndexOfPlayedCard(index){
        this.indexOfPlayedCard=index;
}



}
