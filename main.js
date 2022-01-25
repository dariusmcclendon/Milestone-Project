function main(){
    
    let data = {
        playerHand : [],
        computerHand : [],
        playerScore : 0,
        computerScore : 0,
        playerWins : 0,
        computerWins : 0
    }

    let deck = {
        //initDeck creates a standard 52 card deck, returns the deck
        new : function newDeck(){
            let suits = ['C', 'H', 'D', 'S']
            let values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
            let initDeck = []
            for (let i = 0; i < suits.length; i++) {
                for (let ii = 0; ii < values.length; ii++) {
                    let card = { suit: suits[i], value: values[ii] }
                    initDeck.push(card)
                }
            }
            console.log(initDeck)
            return initDeck  
        },//end initDeck
        //shuffles a deck
        shuffle : function shuffle(deck){
            let shuffled = deck
            //shuffled using Durstenfeld shuffle
            for(let i = shuffled.length - 1; i > 0; i--){
                let j = Math.floor(Math.random() * (i + 1))
                let temp = shuffled[i]
                shuffled[i] = shuffled[j]
                shuffled[j] = temp

            }
            return shuffled
            
        }//end shuffle
    }//end deck
    let graphics = {
        init : 
        function renderGame(){ //renders the game. Draws the canvas and initial imagery. Returns the canvas to allow for additional rendering.
            let canvas = document.querySelector('#canvas')
                canvas.style.minHeight = '500px'
                canvas.style.minWidth = '500px'
                canvas.style.backgroundColor = 'green'
            let buttonContainer = document.createElement('div')
                
                buttonContainer.style.minWidth = '500px'
                buttonContainer.style.minHeight = '150px'
                buttonContainer.style.display = 'flex'
                buttonContainer.style.justifyContent = 'center'
            // let playButton = document.createElement('button')
            //     playButton.type = 'button'
            //     playButton.innerText = 'PRESS PLAY TO BEGIN!'
            let drawButton = document.createElement('button')
                drawButton.type = 'button'
                drawButton.innerText = 'DRAW'
                drawButton.addEventListener('click', gameLogic.play)
            let dealButton = document.createElement('button')
                dealButton.type ='button'
                dealButton.innerText = 'DEAL'
                dealButton.addEventListener('click', gameLogic.deal)
            document.body.append(buttonContainer)
            buttonContainer.append(drawButton)
            buttonContainer.append(dealButton)
            return canvas
            
        },
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
        render : //creates a new element 
        function draw(){

        }
    }

    
    
 let gameLogic = {
        deal :
        function dealHands(){
            let shuffledDeck = deck.shuffle(deck.new())
            for(let i = 0; i < (shuffledDeck.length / 2); i++){
                data.playerHand.push(shuffledDeck[i])
                data.computerHand.push(shuffledDeck[i+1])
            }
            console.log('hands dealt!')
            console.log(JSON.stringify(data.playerHand))
            console.log(JSON.stringify(data.computerHand))
        },
        play :
        function doRound(){
            let index = 0
            let playerCard = data.playerHand[index]
            let computerCard = data.computerHand[index]
            console.log(`${playerCard.value} versus ${computerCard.value}`)
            /*
            ROUND LOGIC
            Two cards are drawn and placed.
            The player with the higher value wins.
            If the values are equal, WAR is declared.
            Players must draw an additional FOUR cards.
            The winner is decided then. 
            */
            
           
            if(playerCard.value === computerCard.value){//NOTE TO SELF - INCOMPLETE LOGIC. MAY REQUIRE SELF CALLING FUNCTION TO RECTIFY.
                doWar()

            }else if(playerCard.value > computerCard.value){
                playerWin()
                
            }else if(computerCard.value > playerCard.value){
                computerWin()
            }
            function doWar(){ //WORK IN PROGRESS
                console.log('WAR! IS DECLARED')
                index = index + 4
                playerCard = data.playerHand[index]
                computerCard = data.computerHand[index]
                console.log(`${playerCard.value} versus ${computerCard.value}`)
                if(playerCard.value > computerCard.value){
                    playerWin()
                }else if(computerCard.value > playerCard.value){
                   computerWin()
                }else if(computerCard.value == playerCard.value){
                    doWar()
                }
            }//end doWar
            function playerWin(){
                console.log('Player Wins!')
                data.playerHand.push(computerCard)
                data.computerHand.splice(index, 1)
                data.playerHand = deck.shuffle(data.playerHand)
                data.playerScore += data.playerScore
            }
            function computerWin(){
                console.log('Computer Wins!')
                data.playerHand.splice(index, 1)
                data.computerHand.push(playerCard)
                data.computerHand = deck.shuffle(data.computerHand)
                data.computerScore += data.computerScore
            }
        }
    //dealHands()
    }

   
let canvas = graphics.init()
//gameLogic()      
}//end of main
main()
console.log('script loaded')
