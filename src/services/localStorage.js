if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem('listadetails'))) {
  localStorage.setItem('listadetails', JSON.stringify([]));
}

export const saveCartItem = (produto) => localStorage
  .setItem('cartItems', JSON.stringify(produto));

export const readCartItems = () => JSON.parse(localStorage.getItem('cartItems'));
