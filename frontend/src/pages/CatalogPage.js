import React from 'react';

class CatalogPage extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('/api/books');
      if (!response.ok) throw new Error('Failed to load catalog');
      const books = await response.json();
      this.setState({ books, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    const { books, loading, error } = this.state;

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
      <div className="catalog">
        <h2>All Books</h2>
        <div className="book-grid">
          {books.map(book => (
            <div key={book.id} className="book-item">
              <img src={book.coverImage} alt={book.title} />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p className="price">${book.price.toFixed(2)}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CatalogPage;