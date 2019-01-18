import React, { Component } from 'react';

class StockPile extends Component {
  render() {
    const { handleStockClick } = this.props;

    return (
      <div className='king-container'>
        <img
          alt='Stock Pile'
          className='inserted-card'
          src={require('../Images/Cards/logo_kk.jpg')}
          onClick={ handleStockClick }
          draggable='false'
          style={{gridArea: '1 / 1 / 1 / 1',  marginTop: 0 }}
        />
      </div>
    )
  }
}

export default StockPile;
