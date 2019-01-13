import React, { Component } from 'react';

class StockPile extends Component {
  render() {
    const { src, handleStockClick } = this.props;

    return (

          <img
            id="stock"
            className='stock-pile'
            alt='Stock Pile'
            src={src}
            onClick={ handleStockClick }
            draggable='false'
          />
    )
  }
}

export default StockPile;