import { useEffect, useState } from 'react';
import { getTopBooks } from '../services/bookService';

const TopBooks = ({ idusuario }) => {
  const [topBooks, setTopBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const data = await getTopBooks(idusuario);
        setTopBooks(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTopBooks();
  }, [idusuario]);

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <ul className="list-group">
        <div className="page-container">
      {topBooks.map((book) => (
        <li key={book.idlibro} className="list-group-item">
          <strong>{book.titulo}</strong> - {book.calificacion}/10
        </li>
      ))}
    </div>
    </ul>
  );
};

export default TopBooks;
