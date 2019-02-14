countReservePile = (reservePile) => {
  if (this.state.stats.reserveSpotsUsedBeforeWin.length < 1) {
    this.setState( {
            stats: {
                ...this.state.stats,
                currentReservePilesUsed: this.state.stats.currentReservePilesUsed.concat(reservePile),
                reserveSpotsUsedBeforeWin: this.state.stats.reserveSpotsUsedBeforeWin.concat(reservePile)
              }
  }
  for (let i = 0; i < this.state.stats.reserveSpotsUsedBeforeWin.length; i++)
    {
      if (this.state.stats.currentReservePilesUsed[i] === reservePile && this.state.stats.currentReservePilesUsed.length !== 0)
        {console.log('PILE!!!'); return}
      else if (this.state.stats.reserveSpotsUsedBeforeWin[i] === reservePile && this.state.stats.reserveSpotsUsedBeforeWin.length !== 0)
        { console.log('SPOT!!!'); return }
      else {
        this.setState( {
                stats: {
                    ...this.state.stats,
                    currentReservePilesUsed: this.state.stats.currentReservePilesUsed.concat(reservePile),
                    reserveSpotsUsedBeforeWin: this.state.stats.reserveSpotsUsedBeforeWin.concat(reservePile)
                  }
        }, () => console.log('New Reserve Pile Used! ', this.state.stats.reserveSpotsUsedBeforeWin)
        )
  }
}
