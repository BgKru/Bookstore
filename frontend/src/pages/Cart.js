import React from 'react';
import cartService from '../services/CartService';

class Cart extends React.Component {
  state = {
    cart: null,
    loading: true,
    error: null
  };

  async componentDidMount() {
    await this.loadCart();
  }

  loadCart = async () => {
    try {
      this.setState({ loading: true });
      const cart = await cartService.getCart();
      this.setState({ cart, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleUpdateQuantity = async (bookId, quantity) => {
    try {
      await cartService.updateQuantity(bookId, quantity);
      await this.loadCart();
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  handleRemoveItem = async (bookId) => {
    try {
      await cartService.removeFromCart(bookId);
      await this.loadCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  handleCheckout = () => {
    alert('Proceeding to checkout');
    // Реальная реализация будет перенаправлять на страницу оформления заказа
  };

  render() {
    const { cart, loading, error } = this.state;

    if (loading) return <div className="loading">Loading cart...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!cart || !cart.items || cart.items.length === 0) {
      return <div className="empty-cart">Your cart is empty</div>;
    }

    return (
      <div className="cart-container">
        <h2>Your Shopping Cart</h2>
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.book.id} className="cart-item">
              <img src={item.book.coverImage} alt={item.book.title} />
              <div className="item-details">
                <h3>{item.book.title}</h3>
                <p>by {item.book.author}</p>
                <p>Price: ${item.book.price.toFixed(2)}</p>
              </div>
              <div className="item-controls">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => this.handleUpdateQuantity(item.book.id, parseInt(e.target.value))}
                />
                <button 
                  className="remove-btn"
                  onClick={() => this.handleRemoveItem(item.book.id)}
                >
                  Remove
                </button>
                <p className="subtotal">
                  Subtotal: ${item.subtotal.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Total: ${cart.totalPrice.toFixed(2)}</h3>
          <button 
            className="checkout-btn"
            onClick={this.handleCheckout}
          >
            Proceed to Checkout
          </button>
          <button 
            className="clear-cart-btn"
            onClick={async () => {
              await cartService.clearCart();
              await this.loadCart();
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    );
  }
}

export default Cart;