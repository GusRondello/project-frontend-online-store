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
    const cartSaved = saveCartItem([...saveCar, findObject]);
    this.setState({
      cartList: cartSaved,
    });
  }

  removeCart = (index) => {
    const updatedCart = removeFromCart(index);
    this.setState({
      cartList: updatedCart,
    });
  }

  filterProductsCart = (id) => {
    const { cartList } = this.state;
    const filterProductId = cartList.filter((produto) => produto.id === id);
    return filterProductId.length;
  }

  render() {
    const { cartList } = this.state;
    return (
      <div>
        { cartList.length !== 0
          ? cartList.map((produto, index) => (
            <div key={ produto.id }>
              <p data-testid="shopping-cart-product-name">{ produto.title }</p>
              <img src={ produto.thumbnail } alt={ produto.title } />
              <p>{ `R$ ${produto.price}` }</p>
              <p data-testid="shopping-cart-product-quantity">
                { this.filterProductsCart(produto.id) }
              </p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.removeCart(index) }
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
