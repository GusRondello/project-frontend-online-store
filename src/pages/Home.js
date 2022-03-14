import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from '../components/Products';
import CategoryList from '../components/CategoryList';

class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <h2>
          <Link to="/shopping-cart" data-testid="shopping-cart-button"> Carrinho </Link>
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
        <Products />
        <CategoryList />
      </div>
    );
  }
}

export default Home;
