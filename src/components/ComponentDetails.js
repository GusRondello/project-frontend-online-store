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
      inputEmail: '',
      inputMensage: '',
      inputAvaliar: 1,
      listArray: [],
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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      return false;
    }
    return true;

    // expressão utilizada feita pelo autor Matheus Battisti do site 'https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/'
  }

  handleClick = () => {
    const { inputEmail, inputMensage, inputAvaliar } = this.state;

    this.setState(() => ({
      listArray: { email: inputEmail, message: inputMensage, avaliar: inputAvaliar },
    }), () => {
      const { listArray } = this.state;
      const read = JSON.parse(localStorage.getItem('listadetails'));
      localStorage.setItem('listadetails', JSON.stringify([listArray, ...read]));

      this.setState({
        inputEmail: '',
        inputMensage: '',
        inputAvaliar: 1,
      });
    });
  }

  render() {
    const { product, inputEmail, inputMensage, inputAvaliar } = this.state;
    const storage = JSON.parse(localStorage.getItem('listadetails'));
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
          <form>
            <h3>Avaliações</h3>
            <input
              placeholder="Email"
              data-testid="product-detail-email"
              id="inputEmail"
              name="inputEmail"
              value={ inputEmail }
              onChange={ this.handleChange }
            />
            <textarea
              placeholder="Mensagem(opcional)"
              data-testid="product-detail-evaluation"
              cols="30"
              rows="20"
              id="inputMensage"
              name="inputMensage"
              value={ inputMensage }
              onChange={ this.handleChange }
            />
            <select
              onChange={ this.handleChange }
              value={ inputAvaliar }
              id="inputAvaliar"
              name="inputAvaliar"
            >
              <option data-testid="1-rating">1</option>
              <option data-testid="2-rating">2</option>
              <option data-testid="3-rating">3</option>
              <option data-testid="4-rating">4</option>
              <option data-testid="5-rating">5</option>
            </select>
            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.handleClick }
              disabled={ !!this.validateEmail(inputEmail) }
            >
              Avaliar
            </button>
          </form>
          <hr />
          {
            storage.map((el, index) => (
              <div key={ index }>
                <p>{el.email}</p>
                <p>{el.message}</p>
                <p>{el.avaliar}</p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

ComponentDetails.propTypes = {
  match: PropTypes.string.isRequired,
};

export default ComponentDetails;
