let pCardEl = document.querySelector('#p-cards')
let dCardEl = document.querySelector('#d-cards')

let pSumEl = document.querySelector('#p-sum')
let dSumEl = document.querySelector('#d-sum')

let gameMsg = document.querySelector('#game-msg')

let pMoneyEl = document.querySelector('#player-money')

let nextBtnEl = document.querySelector('#next-game')

let pFirstCard = 0
let pSecondCard = 0

let dFirstCard = ""
let dSecondCard = ""

let pSum = 0
let dSum = 0

let pCards = []
let dCards = [] 

let pCardsC = ""
let dCardsC = ""

let isAlive = false
let hasBlackJack = false

let pMoney = 0

function newGame() {

	gameMsg.textContent = "So...do you wanna get in?"

	pFirstCard = randomCard()
	pSecondCard = randomCard()
	
	pCards = [pFirstCard, pSecondCard]

	pCardsC = pCards[0] + " || " + pCards[1]

	pSum = pFirstCard + pSecondCard

	pMoney = 10 - 5

	pMoneyEl.textContent = "$ " + pMoney

	hasBlackJack = false
	isAlive = true
	renderGame()
}

function renderGame() {

	pCardEl.innerHTML = `<p class="cards" id="p-cards">your <span class="piazz piazz-bold">CARDS: ${pCardsC}</span></p>`

	pSumEl.textContent = "SUM: " + pSum

	dCardEl.innerHTML = `<p class="cards id="d-cards">dealer's <span class="piazz piazz-bold">CARDS: </span> ** || **</p>`
	dSumEl.textContent = "SUM: " + "**"

	if (pSum === 21) {
		
		hasBlackJack = true
	
		gameMsg.textContent = "Yes! BLACKJACK! What a fucking happiness!"
	
	} else if (pSum < 21) {

		gameMsg.textContent = "Ok...what’s the fellin’? Another card? Only if you’re sure."
	
	} else {

		assignDealer()

		isAlive = false
	
		gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'

		if (pMoney < 5) {
			gameMsg.textContent = 'I think you can only click "new game"'
		} else {
			nextBtnEl.disabled = false
			gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'
		}
	
	}


}


function nextGame() {

	console.log(pMoney)
	isAlive = true

	pFirstCard = randomCard()
	pSecondCard = randomCard()
	
	pCards = [pFirstCard, pSecondCard]

	pCardsC = pCards[0] + " || " + pCards[1]

	pSum = pFirstCard + pSecondCard

	pMoney += - 5
	pMoneyEl.textContent = "$ " + pMoney

	renderGame()
	nextBtnEl.disabled = true

}

function newCard() {

	let plusCard = randomCard()
	
	if (isAlive === true && hasBlackJack === false) {
	
		pCards.push(plusCard)
	
		pCardsC += " || " + plusCard
	
		pSum += plusCard

		renderGame()

	}

}


function cashIn() {

	if (isAlive === true) {

		assignDealer()

		if (pSum === dSum) {

			pMoney += 5
		
			pMoneyEl.textContent = "$ " + pMoney

			nextBtnEl.disabled = false

			gameMsg.textContent = "EVEN! EVEN! EVEN! Next Game???"
		} else if (pSum > dSum) {

			pMoney += 10
			pMoneyEl.textContent = "$ " + pMoney

			gameMsg.textContent = "You've beaten the dealer! Let's move on."

			nextBtnEl.disabled = false

		} else {

			isAlive = false
		
			gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'

			if (pMoney < 5) {
				gameMsg.textContent = 'I think you can only click "new game"'
			} else {
				nextBtnEl.disabled = false
				gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'
			}
		}
	}
}


function assignDealer() {

	dFirstCard = randomCard()
	dSecondCard = randomCard()

	dSum = dFirstCard + dSecondCard

	dCards = [dFirstCard, dSecondCard]

	dCardsC = dCards[0] + " || " + dCards[1]

	dCardEl.innerHTML = `<p class="cards id="d-cards">dealer's <span class="piazz piazz-bold">CARDS: ${dCardsC}</span></p>`
	dSumEl.textContent = "SUM: " + dSum

}


function randomCard() {

	let randomCard = Math.floor(Math.random()*12) + 1
	
	if (randomCard === 1) {
	
		return 11
	
	} else if (randomCard > 10) {
	
		return 10
		
	} else {

		return randomCard
	}
}