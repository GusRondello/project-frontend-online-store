import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import ProductsCard from './ProductsCard';

class Products extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      products: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
    });
  }

  buttonClick = async () => {
    const { inputSearch } = this.state;
    const obj = await getProductsFromCategoryAndQuery('', inputSearch);
    this.setState({
      inputSearch: '',
      products: obj.results,
    });
  }

  render() {
    const { inputSearch, products } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="query-input"
          id="inputSearch"
          value={ inputSearch }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.buttonClick }
        >
          Buscar
        </button>
        {
          products.length > 0
            ? products.map((product) => (
              <>
                <ProductsCard
                  key={ product.id }
                  title={ product.title }
                  thumbnail={ product.thumbnail }
                  price={ product.price }
                />
                <Link
                  to={ `/shopping-cart/${product.id}` }
                  data-testid="product-detail-link"
                >
                  Detalhes
                </Link>
              </>
            ))
            : <h1>Nenhum produto foi encontrado</h1>
        }
      </div>
    );
  }
}

export default Products;
