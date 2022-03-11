import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProductsCard extends Component {
  render() {
    const { title, price, thumbnail } = this.props;
    return (
      <div data-testid="product">
        <h4>{ title }</h4>
        <img src={ thumbnail } alt={ title } />
        <p>{ `R$ ${price}` }</p>
      </div>
    );
  }
}

ProductsCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default ProductsCard;
