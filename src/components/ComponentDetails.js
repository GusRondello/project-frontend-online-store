import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { readCartItems, saveCartItem } from '../services/localStorage';

class ComponentDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: '',
    };
  }

  componentDidMount() {
    this.productsDetails();
  }

  productsDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const objProducts = await getProducts(id);

    this.setState({
      product: objProducts,
    });
  }

  addToCart = () => {
    const { product } = this.state;
    const saveCar = readCartItems();
    saveCartItem([...saveCar, product]);
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <Link to="/shopping-cart" data-testid="shopping-cart-button"> Carrinho </Link>
        <div>
          <h4 data-testid="product-detail-name">{product.title}</h4>
          <img src={ product.thumbnail } alt={ product.title } />
          <p>{`R$ ${product.price}`}</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ this.addToCart }
          >
            Adicionar ao Carrinho
          </button>
          <div>
            <h3>Avaliações</h3>
            <form>
              <input placeholder="Email" required />
              <textarea
                placeholder="Mensagem(opcional)"
                data-testid="product-detail-evaluation"
              />
              <button
                type="button"
              >
                Avaliar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ComponentDetails.propTypes = {
  match: PropTypes.string.isRequired,
};

export default ComponentDetails;
