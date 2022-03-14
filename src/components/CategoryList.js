import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { saveCartItem } from '../services/localStorage';
import ProductsCard from './ProductsCard';

class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      category: [],
      slcCategory: '',
      objCategory: [],
      // cartList: [],
    };
  }

  componentDidMount= async () => {
    const categorias = await getCategories();
    this.setState({
      category: categorias,
    });
  }

   radioClick= ({ target }) => {
     const { name } = target;
     this.setState({
       slcCategory: name,
     }, this.handleSelectedCategory);
   }

   addToCart = ({ target }) => {
     const { objCategory } = this.state;
     const { id } = target;
     const findObject = objCategory.find((produto) => produto.id === id);
     saveCartItem(findObject);
   }

  handleSelectedCategory = async () => {
    const { category, slcCategory } = this.state;
    const findSlcCategory = category.find((categoria) => categoria.name === slcCategory);
    const selectedId = findSlcCategory.id;
    const obj = await getProductsFromCategoryAndQuery(selectedId);
    this.setState({
      objCategory: obj.results,
    });
  }

  render() {
    const { category, objCategory } = this.state;
    return (
      <div>
        {category.map((elemento) => (
          <label
            htmlFor={ elemento.id }
            key={ elemento.id }
            data-testid="category"
          >
            <input
              id={ elemento.id }
              name={ elemento.name }
              type="radio"
              onClick={ this.radioClick }
            />
            {elemento.name}
          </label>
        ))}
        {
          objCategory.map((product) => (
            <ProductsCard
              key={ product.id }
              title={ product.title }
              thumbnail={ product.thumbnail }
              price={ product.price }
              productId={ product.id }
              addToCart={ this.addToCart }
            />
          ))
        }
      </div>
    );
  }
}

export default CategoryList;
