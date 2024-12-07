let pCardEl = document.querySelector('#p-cards')
let dCardEl = document.querySelector('#d-cards')

let pSumEl = document.querySelector('#p-sum')
let dSumEl = document.querySelector('#d-sum')

let gameMsg = document.querySelector('#game-msg')

let pMoneyEl = document.querySelector('#player-money')

let nextBtnEl = document.querySelector('#next-game')
let cashInBtnEl = document.querySelector('#cash-in')
let oneMoreBtnEl = document.querySelector('#one-more-c')

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

cashInBtnEl.disabled = true

function newGame() {

	assignPLayer()

	gameMsg.textContent = "So...do you wanna get in?"

	pMoney = 10 - 5

	pMoneyEl.textContent = "$ " + pMoney

	hasBlackJack = false
	isAlive = true
	cashInBtnEl.disabled = false
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

		cashInBtnEl.disabled = true
		gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'

		if (pMoney < 5) {
			gameMsg.textContent = 'I think you can only click "new game"'
			isAlive = false
			cashInBtnEl.disabled = true
		} else {
			nextBtnEl.disabled = false
			gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'
		}
	}
}

function nextGame() {

	oneMoreBtnEl.disabled = false
	cashInBtnEl.disabled = false

	isAlive = true
	hasBlackJack = false

	assignPLayer()

	pMoney += - 5
	pMoneyEl.textContent = "$ " + pMoney

	renderGame()
}

function newCard() {

	let plusCard = randomCard()
	
	if (isAlive === true && hasBlackJack === false) {
	
		pCards.push(plusCard)
	
		pCardsC += " || " + plusCard
	
		pSum += plusCard

		pMoney += - 2
		pMoneyEl.textContent = "$ " + pMoney

		renderGame()

	}

}


function cashIn() {

	oneMoreBtnEl.disabled = true

	if (isAlive === true) {

		assignDealer()

		if (pSum === dSum) {

			pMoney += 5
		
			pMoneyEl.textContent = "$ " + pMoney

			nextBtnEl.disabled = false
			cashInBtnEl.disabled = true

			gameMsg.textContent = "EVEN! EVEN! EVEN! Next Game???"
		} else if (pSum > dSum) {

			pMoney += 10
			pMoneyEl.textContent = "$ " + pMoney

			gameMsg.textContent = "You've beaten the dealer! Let's move on."

			nextBtnEl.disabled = false
			cashInBtnEl.disabled = true

		} else {

			if (pMoney < 5) {
				isAlive = false
				gameMsg.textContent = 'I think you can only click "new game"'
			} else {
				nextBtnEl.disabled = false
				cashInBtnEl.disabled = true
				gameMsg.textContent = 'fuck......i\'m so sorry. Try again?'
			}
		}
	}
}


function assignPLayer() {

	pFirstCard = randomCard()
	pSecondCard = randomCard()
	
	pCards = [pFirstCard, pSecondCard]

	pCardsC = pCards[0] + " || " + pCards[1]

	pSum = pFirstCard + pSecondCard

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