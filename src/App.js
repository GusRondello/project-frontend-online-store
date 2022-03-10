import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/shopping-cart" component={ Cart } />
          <Route exact path="/" component={ Home } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
