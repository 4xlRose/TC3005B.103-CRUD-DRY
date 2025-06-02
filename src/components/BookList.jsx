import { useEffect, useState } from 'react';
import { getBooksByUser, deleteBook } from '../services/bookService';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const idusuario = 1;

  const fetchBooks = async () => {
    try {
      const data = await getBooksByUser(idusuario);
      setBooks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este libro?')) return;
    try {
      await deleteBook(id);
      setMensaje('Libro eliminado correctamente');
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
    <div className="page-container">
      <h2><i className="bi bi-book-half me-2"></i> Historial de Lectura</h2>
      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {books.map((book) => (
          <li key={book.idlibro} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{book.titulo}</strong> — {book.calificacion}/10
              <br />
              <small>{book.fecha_lectura}</small>
            </div>
            <div>
              <Link to={`/editar/${book.idlibro}`} className="btn btn-sm btn-warning me-2">Editar</Link>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(book.idlibro)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default BookList;
