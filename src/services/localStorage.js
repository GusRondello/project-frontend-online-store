export const saveCartItem = (produto) => localStorage
  .setItem('cartItems', JSON.parse(produto));

export const readCartItems = () => JSON.parse(localStorage.getItem('cartItems'));
