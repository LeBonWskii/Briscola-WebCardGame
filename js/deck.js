class Deck{
    constructor(){
        this.cards = [];
        this._briscola = null;
        this.setDeck();
        this.shuffle();
        this.deal();
    }

    setDeck(){
        this.cards = [];
        this._briscola = null;
        const suits = ['heart', 'diamond', 'club', 'spade'];
        const values = ['1', '2', '3', '4', '5', '6', '7','jack', 'queen', 'king'];

        for (const suit of suits){
            for (const value of values){
                let score;
                switch (value){
                    case '1':
                        score = 11;
                        break;
                    case '3':
                        score = 10;
                        break;
                    case 'jack':
                        score = 2;
                        break;
                    case 'queen':
                        score = 3;
                        break;
                    case 'king':
                        score = 4;
                        break;
                    default:
                        score = 0;
                }
                this.cards.push({suit,value, score});
            }
        }
    }
    set briscola(card){
        this._briscola=card;
    }
    shuffle(){
        const {cards}=this; 

        for(let i=cards.length-1;i>0;i--){
            let j=Math.floor(Math.random()*(i+1));
            [cards[i],cards[j]]=[cards[j],cards[i]];
        }
        return this;
    }

    deal(){
        return this.cards.pop();
    }

    get briscola(){
        return this._briscola;
    }
}