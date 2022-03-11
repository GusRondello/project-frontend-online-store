import React, { Component } from 'react';
import { getCategories } from '../services/api';

class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      category: [],
    };
  }

  componentDidMount= async () => {
    const categorias = await getCategories();
    this.setState({
      category: categorias,
    });
  }

  render() {
    const { category } = this.state;
    console.log(category);
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
            />
            {elemento.name}
          </label>
        ))}
      </div>
    );
  }
}

export default CategoryList;

/*  */
