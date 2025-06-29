import React from 'react';
import Cart from './Cart';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      showCart: false,
      cartItemsCount: 0
    };
  }

  async componentDidMount() {
    try {
      const [booksResponse, cartResponse] = await Promise.all([
        fetch('/api/books'),
        fetch(`/api/cart?userId=1`)
      ]);
      
      if (!booksResponse.ok) throw new Error('Books loading failed');
      if (!cartResponse.ok) throw new Error('Cart loading failed');
      
      const books = await booksResponse.json();
      const cart = await cartResponse.json();
      
      this.setState({ 
        books,
        cartItemsCount: cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  addToCart = async (bookId) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, bookId, quantity: 1 })
      });
      
      if (!response.ok) throw new Error('Add to cart failed');
      const cart = await response.json();
      
      this.setState({
        cartItemsCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
        showCart: true
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  toggleCart = () => {
    this.setState(prev => ({ showCart: !prev.showCart }));
  };

  render() {
    return (
      <Router>
        <div className="app">
          <header className="header">
            <h1>BookStore</h1>
            <nav className="nav">
              <Link to="/">Home</Link>
              <Link to="/catalog">Catalog</Link>
              <button className="cart-icon" onClick={this.toggleCart}>
                🛒 {this.state.cartItemsCount > 0 && 
                  <span className="cart-badge">{this.state.cartItemsCount}</span>}
              </button>
            </nav>
          </header>
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={
                <section className="featured-books">
                  <h2>Featured Books</h2>
                  <div className="book-list">
                    {this.state.books.map(book => (
                      <div key={book.id} className="book-card">
                        <img src={book.coverImage} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                        <p>${book.price.toFixed(2)}</p>
                        <button 
                          className="add-to-cart" 
                          onClick={() => this.addToCart(book.id)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              } />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          
          {this.state.showCart && (
            <div className="cart-overlay">
              <div className="cart-modal">
                <button className="close-cart" onClick={this.toggleCart}>×</button>
                <Cart />
              </div>
            </div>
          )}
          
          <footer className="footer">
            <p>&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    );
  }
}

export default HomePage;