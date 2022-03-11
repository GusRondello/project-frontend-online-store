import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <h2>
          <Link to="/shopping-cart" data-testid="shopping-cart-button"> Carrinho </Link>
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      </div>
    );
  }
}

export default Home;
