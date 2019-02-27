export const shuffle = (cards) => {
  const array = [...cards]
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export const isNewCardHigher = (newCard, cardOnPile) => {
  return newCard.value > cardOnPile.value
}

export const isNewCardSameColorDifferentSuit = (newCard, cardOnPile) => {
  if ((newCard.suit === 'club' && cardOnPile.suit === 'spade') || (newCard.suit === 'spade' && cardOnPile.suit === 'club') || (newCard.suit === 'heart' && cardOnPile.suit === 'diamond') || (newCard.suit === 'diamond' && cardOnPile.suit === 'heart') ) {
    if (newCard.value !== cardOnPile.value) {
      return true
    }
  } else {
  return false
  }
}

export const isItThreeInARow = (pile) => {
  return pile.every( card => card.value === pile[0].value )
}

export const isItFourInARow = (pile) => {
  if (!pile.every( card => card.suit === pile[0].suit )) {
    return false
  } else {
    for (let i = 0; i < pile.length - 1; i++) {
      if (pile[i] < pile[i++]) {
        return false
      }
    }
    return true
    }
  }

  export const isItFiveInARow = (pile) => {
    for (let i = 0; i < pile.length - 1; i++) {
      if (pile[i].value <= pile[i+1].value) {
        return false
      } else {
        const newPile = pile.map( card => {
              switch(card.suit) {
                case 'spade':
                return 0
                case 'club':
                return 0
                case 'heart':
                return 1
                case 'diamond':
                return 1
                default:
                return ''
              }
            })
        for (let i = 0; i < newPile.length - 1; i++) {
          if (newPile[i] === newPile[i+1]) {
            return false
          }
        }
        return true
      }
    }
  }

  export const didYouLose = (props) => {
    let playableCards = [props.talon]
    const pileCards = []
    const allPiles = [...props.idArray]

    for (let i=0; i < allPiles.length; i++) {
      const pile = allPiles[i]

      if (pile === 'blank') {
          const index = allPiles.indexOf(pile)
          allPiles.splice(index, 1)
          i--;
      } else if (pile.charAt(0) === 'r') {
          if (props[pile][0]) {
            playableCards.push(props[pile][0])
          } else {
          return false}
      } else if (props[pile]) {
          pileCards.push(props[pile][props[pile].length-1])
      } else {
      return false
      }
    }

// Now we check if the player has lost
  let noMove = 0
//If a card is on Talon Pile, only check against that card.
  if (props.talon && Object.keys(props.talon).length > 0) {
    playableCards = [props.talon]
  }

    for (let i=0; i < playableCards.length; i++) {
      for (let x=0; x < pileCards.length; x++) {
        if (isNewCardHigher(playableCards[i], pileCards[x]) === true) {
          noMove = noMove + 1
        } else {
          if (isNewCardSameColorDifferentSuit(playableCards[i], pileCards[x]) === true) {
            noMove = noMove + 1
          }
        }
      }
    }
    if ((playableCards.length) * (pileCards.length) === noMove) {
      return true
    } else {
      return false
    }
  }
