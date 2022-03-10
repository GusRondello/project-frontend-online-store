import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <h2>
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>
      </div>
    );
  }
}

export default Home;
