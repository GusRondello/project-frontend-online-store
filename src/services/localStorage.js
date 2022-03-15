if (!JSON.parse(localStorage.getItem('cartItems'))) {
  localStorage.setItem('cartItems', JSON.stringify([]));
}

export const saveCartItem = (produto) => localStorage
  .setItem('cartItems', JSON.stringify(produto));

export const readCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

export const removeFromCart = (productIndex) => {
  const cartItems = readCartItems();
  const removeIndex = cartItems.map((item, index) => {
    if (index === productIndex) {
      console.log(item);
      return cartItems.splice(item, 1);
    }
    return cartItems;
  });
  // saveCartItem(removeIndex);

  console.log(removeIndex);
};
