import React from 'react';

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      books: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) throw new Error('Network response was not ok');
      const books = await response.json();
      this.setState({ books });
    } catch (error) {
      console.error('Error loading books:', error);
    }
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>BookStore</h1>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/catalog">Catalog</a>
            <a href="/cart">Cart</a>
          </nav>
        </header>
        
        <main className="main-content">
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
        </main>
        
        <footer className="footer">
          <p>&copy; 2023 BookStore. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  addToCart(bookId) {
    console.log(`Adding book ${bookId} to cart`);
  }
}

export default HomePage;
