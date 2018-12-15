import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './App.css';
import OriginalDeck from './Constants/CardObjects.js'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentGame: {
        inProgress: false,
        stock: OriginalDeck,
        talon: {},
        club: {},
        diamond: {},
        spade: {},
        heart: {},
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
            <img className="card" src={require(`${this.state.currentGame.stock[2].src}`)} alt="Card Pile"/>
            <img className="card" src={require(`${this.state.currentGame.stock[14].src}`)} alt="Card Pile"/>
            <img className="card" src={require(`${this.state.currentGame.stock[28].src}`)} alt="Card Pile"/>
            <img className="card" src={require(`${this.state.currentGame.stock[0].src}`)} alt="Card Pile"/>
            <img className="card" src={require(`${this.state.currentGame.stock[41].src}`)} alt="Card Pile"/>
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
