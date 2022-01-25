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
    let graphics = {
        card : //renderCard creates html image element using the card as a reference for the asset to draw with
        function renderCard(card){
            let img = document.createElement('img')
            img.src = `assets/zxyCards/Cards/${card.value}${card.suit}.png`
            img.alt = `${card.value} of ${card.suit}`
            img.width = '128px'
            img.height = '178px'
            img.className = 'card'
            return img
        },//end renderCard
    }

    
    
    function gameLogic(){
        let data = {
            playerHand : [],
            computerHand : [],
            playerScore : 0,
            computerScore : 0,
            playerWins : 0,
            computerWins : 0
        }

        function dealHands(){
            let shuffledDeck = deck.shuffle(deck.new())
            for(let i = 0; i < (shuffledDeck.length / 2); i++){
                data.playerHand.push(shuffledDeck[i])
                data.computerHand.push(shuffledDeck[i+1])
            }
            console.log('hands dealt!')
            console.log(JSON.stringify(data.playerHand))
            console.log(JSON.stringify(data.computerHand))
        }
    function play(){

    }
    dealHands()
    }

   
        
gameLogic()      
}
main()
console.log('script loaded')
