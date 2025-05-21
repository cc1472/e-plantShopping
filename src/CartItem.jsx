import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from '../features/CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  // Calculate total amount of the cart
  const calculateTotalAmount = () => {
    return items
      .reduce((total, item) => total + parseFloat(calculateTotalCost(item)), 0)
      .toFixed(2);
  };

  // Increment quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement quantity or remove item
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  // Remove item entirely
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Placeholder for future checkout
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  // Go back to shopping page
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Price: {item.cost}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <div className="item-controls">
                  <button onClick={() => handleIncrement(item)}>+</button>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <button onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
