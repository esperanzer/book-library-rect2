import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import BookForm from './BookForm';

const BookLibrary = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Fetch books from API
    fetch('/api/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const addBook = (book) => {
    if (editingIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editingIndex] = book;
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, book]);
    }
    setCurrentBook(null);
  };

  const editBook = (index) => {
    setCurrentBook(books[index]);
    setEditingIndex(index);
  };

  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h1>Book Library</h1>
      <BookForm book={currentBook} onSubmit={addBook} />
      <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
    </div>
  );
};

export default BookLibrary;
