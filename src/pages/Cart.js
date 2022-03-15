import React, { Component } from 'react';
import { readCartItems, removeFromCart } from '../services/localStorage';

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
    this.setState(({
      cartList: cartItems,
    }), () => this.qtnProducts());
  }

  qtnProducts = () => {
    const { cartList } = this.state;
    const cartItems = readCartItems();
    const productQtn = cartItems.filter((produto) => produto.id === cartList[0].id);

    this.setState({
      quantity: productQtn.length,
    });
  }

  removeCart = (index) => {
    const { cartList } = this.state;
    console.log(index);
    // const { id } = target;
    // const findArray = cartList.filter((produto) => produto.id === id);
    // console.log(findArray);
    removeFromCart(index);
  }

  render() {
    const { quantity, cartList } = this.state;
    return (
      <div>
        { cartList.length > 0
          ? cartList.map((produto, index) => (
            <div key={ produto.id }>
              <p data-testid="shopping-cart-product-name">{ produto.title }</p>
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p>{ `R$ ${produto.price}` }</p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                { cartList.length }
              </p>
              <button
                type="button"
                onClick={ () => this.removeCart(index) }
              >
                Remover
              </button>
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
