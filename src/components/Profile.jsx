import { useEffect, useState } from 'react';
import { getTopBooks } from '../services/bookService';
import { getUserById } from '../services/userService';
import { Link } from 'react-router-dom';
import FotoPerfilUploader from './FotoPerfilUploader';

const Profile = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  const idusuario = 1; // tu ID de usuario en la DB

  const fetchUsuario = async () => {
    try {
      const user = await getUserById(idusuario);
      setUsuario(user);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchLibros = async () => {
    try {
      const books = await getTopBooks(idusuario);
      setTopBooks(books);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsuario();
    fetchLibros();
  }, []);

  return (
    <div className="page-container text-center">
      <h2><i className="bi bi-person-circle me-2"></i>Perfil de Usuario</h2>

      {usuario ? (
        <>
          {usuario.fotoperfil && (
            <div className="mb-3">
              <img
                src={usuario.fotoperfil}
                alt="Foto de perfil"
                className="img-thumbnail rounded-circle"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
            </div>
          )}
          <div className="mb-2">
            <strong>Nombre:</strong> {usuario.nombre}
          </div>
          <div className="mb-3">
            <strong>Correo:</strong> {usuario.correo}
          </div>
          <div style={{ maxWidth: '250px', margin: '0 auto', fontSize: '0.9rem' }}>
            <FotoPerfilUploader idusuario={idusuario} onUpdate={fetchUsuario} />
          </div>
        </>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}

      <h3 className="mt-4 text-start"><i className="bi bi-star-fill me-2"></i>Top 5 Libros Leídos</h3>
      <ul className="list-group text-start">
        {topBooks.map((book) => (
          <li key={book.idlibro} className="list-group-item d-flex align-items-center">
            {book.imagen && (
              <img
                src={book.imagen}
                alt="Portada"
                className="me-3 rounded"
                style={{ width: '50px', height: '70px', objectFit: 'cover' }}
              />
            )}
            <div>
              <strong>{book.titulo}</strong> — {book.calificacion}/10
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <Link to="/nuevo" className="btn btn-primary me-2">Agregar Libro</Link>
        <Link to="/historial" className="btn btn-secondary">Ver Historial</Link>
      </div>
    </div>
  );
};

export default Profile;
