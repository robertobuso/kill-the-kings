export const shuffle = (array) => {
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
    let pileArray = [props.club[props.club.length - 1], props.diamond[props.diamond.length - 1], props.spade[props.spade.length - 1], props.heart[props.heart.length - 1]]

    pileArray = pileArray.filter( card => card !== undefined)

    console.log('PILE ARRAY: ', pileArray)
    console.log('Number: ', pileArray.filter((card) => { return isNewCardHigher(props.talon,card) === true
    }).length === pileArray.length)

    console.log('Suit and Color: ', pileArray.filter((card) => { return isNewCardHigher(props.talon,card) === true
    }).length === pileArray.length)

    if (pileArray.filter((card) => { return isNewCardHigher(props.talon,card) === true
    }).length === pileArray.length) {
      return true
    }
    else if (pileArray.filter((card) => { return isNewCardSameColorDifferentSuit(props.talon,card) === true
      }).length === pileArray.length) {
        return true
      } else {
        return false
      }
    }
