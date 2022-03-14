import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProducts } from '../services/api';

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
    console.log(objProducts);

    this.setState({
      product: objProducts,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div>
        <h4 data-testid="product-detail-name">{product.title}</h4>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>{`R$ ${product.price}`}</p>
        <div>
          <h3>Avaliações</h3>
          <form>
            <input placeholder="Email" required />
            <textarea
              placeholder="Mensagem(opcional)"
              data-testid="product-detail-evaluation"
            />
            <button type="button">Avaliar</button>
          </form>
        </div>
      </div>
    );
  }
}

ComponentDetails.propTypes = {
  match: PropTypes.string.isRequired,
};

export default ComponentDetails;
