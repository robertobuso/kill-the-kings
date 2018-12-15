import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './App.css';
import { originalDeck, kings } from './Constants/CardObjects.js'
import { shuffle } from './Adapters/'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentGame: {
        inProgress: false,
        stock: shuffle(originalDeck),
        talon: {},
        club: kings[0],
        diamond: kings[1],
        spade: kings[2],
        heart: kings[3],
        reserveOne: {},
        reserveTwo: {},
        reserveThree: {},
        reserveFour: {},
        reserveFive: {},
        reserveSix: {},
        reserveSeven: {}
      },
      history: {
        gamesPlayed: 0
      }
    }
  }

  render() {
    return (
      <div className="background">
        <div className="container">
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div/>
            <img  id="club" className="card"
                  src={require(`${this.state.currentGame.club.src}`)} alt="Card Pile"/>
            <img  id="diamond" className="card"
                  src={require(`${this.state.currentGame.diamond.src}`)} alt="Card Pile"/>
            <img  id="spade" className="card"
                  src={require(`${this.state.currentGame.spade.src}`)} alt="Card Pile"/>
            <img  id="heart" className="card"
                  src={require(`${this.state.currentGame.heart.src}`)} alt="Card Pile"/>
            <img  id="talon" className="card"
                  src={require('./Images/Cards/logo_kk.png') }alt="Card Pile"/>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
