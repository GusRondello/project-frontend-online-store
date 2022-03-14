import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductsCard extends Component {
  constructor() {
    super();

    this.state = {
      // cartProducts: [],
    };
  }

  render() {
    const { title, price, thumbnail, addToCart, productId } = this.props;
    return (
      <div data-testid="product">
        <h4>{ title }</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ `R$ ${price}` }</p>
        <label htmlFor={ productId }>
          <input
            type="button"
            id={ productId }
            data-testid="product-add-to-cart"
            value="Adicionar ao Carrinho"
            onClick={ addToCart }
          />
        </label>
      </div>
    );
  }
}

ProductsCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default ProductsCard;
