import React, { Component } from 'react';
import { readCartItems } from '../services/localStorage';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartList: [],
      quantity: 0,
    };
  }

  componentDidMount() {
    const cartItems = readCartItems();
    this.setState((previosState) => ({
      cartList: [...previosState.cartList, cartItems],
    }));
  }

  qtnProducts = ({ id }) => {
    const cartItems = readCartItems();
    const productQtn = cartItems.map((produto) => produto.id === id);
    console.log(productQtn);
    this.setState({
      quantity: cartItems.length,
    });
  }

  render() {
    const { quantity, cartList } = this.state;
    console.log(readCartItems());
    console.log(quantity);
    return (
      <div>
        { cartList.length > 0
          ? cartList.map((produto) => (
            <div key={ produto.id }>
              <p data-testid="shopping-cart-product-name">{ produto.title }</p>
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p>{ `R$ ${produto.price}` }</p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                { cartList.length }
              </p>
            </div>
          ))
          : (
            <span data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </span>
          )}
      </div>
    );
  }
}

export default Cart;
