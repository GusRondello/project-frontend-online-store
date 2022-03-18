import React, { Component } from 'react';
import { readCartItems, removeFromCart, saveCartItem } from '../services/localStorage';

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      cartList: [],
    };
  }

  componentDidMount() {
    const cartItems = readCartItems();
    this.setState(({
      cartList: cartItems,
    }));
  }

  componentDidUpdate() {
    readCartItems();
  }

  addToCart = ({ target }) => {
    const { cartList } = this.state;
    const { id } = target;
    const findObject = cartList.find((produto) => produto.id === id);
    const saveCar = readCartItems();
    const updatedCart = saveCartItem([...saveCar, findObject]);
    this.setState({
      cartList: updatedCart,
    });
  }

  filterProductsCart = (id) => {
    const { cartList } = this.state;
    const filterProductId = cartList.filter((produto) => produto.id === id);
    return filterProductId.length;
  }

  removeCartItem = (index) => {
    const uptatedCart = removeFromCart(index);
    this.setState((prev) => ({
      cartList: [...prev.cartList, uptatedCart],
    }));
  }

  render() {
    const { cartList } = this.state;
    const reduceCart = cartList.reduce((acc, cur) => {
      if (acc.some((item) => item.id === cur.id)) {
        return acc;
      }
      acc.push(cur);
      return acc;
    }, []);
    return (
      <div>
        { cartList.length !== 0
          ? reduceCart.map((produto, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{ produto.title }</p>
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p>{ `R$ ${produto.price}` }</p>
              <p data-testid="shopping-cart-product-quantity">
                { this.filterProductsCart(produto.id) }
              </p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.removeCartItem(index) }
                id={ produto.id }
                // disabled={ itemOnCart }
              >
                -
              </button>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ this.addToCart }
                id={ produto.id }
              >
                +
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
