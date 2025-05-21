import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/CartSlice';

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (name) => {
    return cartItems.some((item) => item.name === name);
  };

  const handleAddToCart = (product) => {
    if (!isInCart(product.name)) {
      dispatch(addItem({ ...product, quantity: 1 }));
    }
  };

  // Get total quantity of items in cart
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="product-list">
      <h2>Plant Catalog</h2>
      <p>Total Items in Cart: {totalQuantity}</p>

      {products.map((product) => (
        <div key={product.name} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Cost: {product.cost}</p>
          <button
            disabled={isInCart(product.name)}
            onClick={() => handleAddToCart(product)}
          >
            {isInCart(product.name) ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
