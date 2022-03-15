if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

export const readCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

export const saveCartItem = (produto) => {
  localStorage.setItem('cartItems', JSON.stringify(produto));
  const cartItems = readCartItems();
  return cartItems;
};

export const removeFromCart = (productIndex) => {
  const cartItems = readCartItems();
  const removeIndex = cartItems.filter((_item, index) => index !== productIndex);
  saveCartItem(removeIndex);
  const updateCartItems = readCartItems();
  return updateCartItems;
};
