function main(){
    
    let deck = {
        //initDeck creates a standard 52 card deck, returns the deck
        new : function newDeck(){
            let suits = ['C', 'H', 'D', 'S']
            let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            let initDeck = []
            for (let i = 0; i < suits.length; i++) {
                for (let ii = 0; ii < values.length; ii++) {
                    let card = { suit: suits[i], values: values[ii] }
                    initDeck.push(card)
                }
            }
            console.log(initDeck)
            return initDeck  
        },//end initDeck
        //shuffles a deck
        shuffle : function shuffle(deck){
            for(let i=0; i < deck.length; i++){
                let t = Math.floor(Math.random() * 1)
                let shuffled = deck[i]
                deck[i] = deck[t]
                deck[t] = shuffled;
                console.log('deck shuffled' + JSON.stringify(deck))
                return deck
            }
    
        }//end shuffle
          
    }//end deck

    //renderCard returns the path to the file of the asset for a card
    function renderCard(card){
        return `assets/zxyCards/Cards/${card.value}${card.suit}.png`
    }//end renderCard
    //shuffle takes an array of cards, shuffles them, returns the new array
    
    function gameLogic(){
        
        let playerHand = []
        let computerHand = []

        function dealHands(){
            let shuffledDeck = deck.shuffle(deck.new())
            for(let i = 0; i < (shuffledDeck.length / 2); i++){
                playerHand.push(shuffledDeck[i])
                computerHand.push(shuffledDeck[i+1])
            }
            console.log('hands dealt!')
            console.log(JSON.stringify(playerHand))
            console.log(JSON.stringify(computerHand))
        }
    
    dealHands()
    }

   
        
gameLogic()      
}
main()
console.log('script loaded')
