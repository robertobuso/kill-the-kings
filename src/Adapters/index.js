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

export const isItThreeInARow = (pile) => {
  console.log(pile)
  return pile.every( card => card.value === pile[0].value )
}

export const isItFourInARow = (pile) => {
  if (!pile.every( card => card.suit === pile[0].suit )) {
    console.log('The four cards are not the same suit!')
    return false
  } else {
    for (let i = 0; i < pile.length - 1; i++) {
      if (pile[i] < pile[i++]) {
        console.log('NOT IN DESCENDING ORDER!')
        return false
      }
    }
    console.log('Descending order, YES!')
    return true
    }
  }

  export const isItFiveInARow = (pile) => {
    console.log('FIVE IN A ROW YO!')
    for (let i = 0; i < pile.length - 1; i++) {
      if (pile[i] < pile[i++]) {
        console.log('NOT IN DESCENDING ORDER!')
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
                }
              })
              console.log('The suits in the pile are: ', newPile)
              
      console.log('New Pile: ', newPile)
      for (let i = 0; i < newPile.length - 1; i++) {
        console.log(newPile[1])
        console.log('Suit A: ', newPile[i])
        console.log('Suit B: ', newPile[i+1])
        console.log(newPile[i] === newPile[i+1])

        if (newPile[i] === newPile[i+1]) {
          console.log('NOT DIFFERENT SUITS!')
          return false
        } else {
         console.log('AT LEAST TWO DIFFERENT SUITS!!!!')
      }
    }
    return true
    }
    }
  }
