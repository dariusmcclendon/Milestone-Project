function main(){
    
    //storing major gamestate data in an object
    //later versions will save/load data using this object
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
            //canvas
            let canvas = document.querySelector('#canvas')
                canvas.style.minHeight = '500px'
                canvas.style.minWidth = '500px'
                canvas.style.backgroundColor = 'green'
            //buttonContainer
            let buttonContainer = document.createElement('div')
                buttonContainer.style.minWidth = '500px'
                buttonContainer.style.display = 'flex'
                buttonContainer.style.justifyContent = 'space-around'
            //cardContainer
            let cardContainer = document.createElement('div')
                cardContainer.style.minHeight = '250px'
                cardContainer.style.display = 'flex'
                cardContainer.style.alignItems = 'center'
                cardContainer.style.justifyContent = 'space-around'
                cardContainer.className = 'cardContainer'
            //deckContainer
            let deckContainer = document.createElement('div')
                deckContainer.style.minHeight = '250px'
                deckContainer.style.display = 'flex'
                deckContainer.style.alignItems = 'center'
                deckContainer.style.justifyContent = 'space-around'
                deckContainer.className = 'deckContainer'
            //drawButton
            let drawButton = document.createElement('button')
                drawButton.type = 'button'
                drawButton.innerText = 'DRAW'
                drawButton.style.padding = '15px'
                drawButton.addEventListener('click',gameLogic.play)
            //dealButton
            // let dealButton = document.createElement('button')
            //     dealButton.type ='button'
            //     dealButton.innerText = 'DEAL'
            //     dealButton.style.padding = '15px'
            //     dealButton.addEventListener('click', gameLogic.deal)
            document.body.append(buttonContainer)
            canvas.append(cardContainer)
            canvas.append(deckContainer)
            buttonContainer.append(drawButton)
            //buttonContainer.append(dealButton)
            return canvas
            
        },
        card : //renderCard creates html image element using the card as a reference for the asset to draw with
        function renderCard(card){
            let container = document.querySelector('.cardContainer')
            let img = document.createElement('img')
                img.src = `assets/zxyCards/Cards/${card.value}${card.suit}.png`
                img.alt = `${card.value} of ${card.suit}`
                img.style.margin = '2px'
                img.style.width = '64px'
                img.style.height = '89px'
                img.style.boxShadow = '3px 3px 3px black'
                img.className = 'card'
            // img.style.position = 'absolute'
            // img.style.left = x.toString()
            // img.style.right = y.toString()
            
            container.append(img)
            return img
        },//end renderCard
        pile : //renderDeck creates a small pile of cards 
        function renderDeck(deck){
            let deckContainer = document.createElement('div')
                deckContainer.className = 'deck'
                deckContainer.style.position = 'relative'
                deckContainer.style.minHeight = '250px'
                deckContainer.style.minWidth = '200px'
                this.move(deckContainer,'.deckContainer')
            if(deck.length > 1){
                for(let i = 0; i < 10; i++){
                    let img = document.createElement('img')
                        img.src = 'assets/zxyCards/Cards/backB.png'
                        img.alt = 'deck'
                        img.style.position = 'absolute'
                        img.style.left = `${i+68}px`
                        img.style.bottom = `${i+75}px`
                        img.style.width = '64px'
                        img.style.height = '89px'
                        img.style.boxShadow = '0px 3px 3px black'
                    deckContainer.append(img)
                   
                }
            }else if(deck.length == 1){
                let img = document.createElement('img')
                    img.src = 'assets/zxyCards/Cards/backB.png'
                    img.style.width = '64px'
                    img.style.height = '89px'
                    img.alt = 'deck'
                    img.style.position = 'absolute'
                    img.style.left = `126px`
                    img.style.bottom = `101px`
                
                deckContainer.append(img)
            }
            
            return deckContainer

        },
        move : //moves element, assuming a card, to new container 
        function move(element, destination){
            let container = document.querySelector(destination)
            
            container.append(element)
            console.log('moved element')
        },
        clearCards : //clears the cards out of cardContainer
        function clearCards(){
            document.querySelector('.cardContainer').innerHTML = ''
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
            graphics.pile(data.playerHand)
            graphics.pile(data.computerHand)
            
        },
        play :
        function doRound(){
            if(data.playerHand[0] == null){
                gameLogic.deal()
            }
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
            //graphics logic here
            graphics.card(playerCard)
            graphics.card(computerCard)
            




            //round logic here
            if(playerCard.value === computerCard.value){
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
                
                setTimeout(()=>{
                    graphics.clearCards()
                    graphics.card(playerCard)
                    graphics.card(computerCard)
                    console.log(`${playerCard.value} versus ${computerCard.value}`)
                    if(playerCard.value > computerCard.value){
                        playerWin(true)
                    }else if(computerCard.value > playerCard.value){
                       computerWin(true)
                    }else if(computerCard.value == playerCard.value){
                        doWar()
                    }
                },2500)
               
            }//end doWar
            function playerWin(war){
               
                if(war==true){
                    console.log(`Player Wins the War! ${index} cards claimed!`)
                    for(let i = 0; i < index; i++){
                        computerCard = data.computerHand[i]
                        data.playerHand.push(computerCard)
                        data.computerHand.splice(i, 1)
                        console.log(`card added : ` + computerCard)
                    }
                }else{
                    
                    console.log('Player Wins!')
                    data.playerHand.push(computerCard)
                    data.computerHand.splice(index, 1)
                }
                data.playerHand = deck.shuffle(data.playerHand)
                data.playerScore += data.playerScore
                setTimeout(graphics.clearCards, 2500)
            }//end playerWin
            function computerWin(war){
                
                if(war==true){
                    console.log(`Computer Wins the War! ${index} cards claimed!`)
                    for(let i = 0; i < index; i++){
                        playerCard = data.playerHand[i]
                        data.computerHand.push(playerCard)
                        data.playerHand.splice(i, 1)
                        console.log('card added : ' + playerCard)
                    }
                }else{
                    console.log('Computer Wins!')
                    data.playerHand.splice(index, 1)
                    data.computerHand.push(playerCard)
                }
                data.computerHand = deck.shuffle(data.computerHand)
                data.computerScore += data.computerScore
                setTimeout(graphics.clearCards, 2500)
            }//end computerWin
        }//end doRound
    
    }

   
let canvas = graphics.init()
//gameLogic()      
}//end of main
main()
console.log('script loaded')
