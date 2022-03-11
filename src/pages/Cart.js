import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>
    );
  }
}

export default Cart;
