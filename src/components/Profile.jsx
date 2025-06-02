import { useEffect, useState } from 'react';
import { getTopBooks } from '../services/bookService';
import { getUserById } from '../services/userService';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');

  const idusuario = 1; // mi usuario en la db

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserById(idusuario);
        const books = await getTopBooks(idusuario);
        setUsuario(user);
        setTopBooks(books);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
  <div className="page-container">
    <h2><i className="bi bi-person-circle me-2"></i>Perfil de Usuario</h2>

    {usuario ? (
      <div className="mb-4">
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Correo:</strong> {usuario.correo}</p>
        {usuario.fotoperfil && (
          <img src={usuario.fotoperfil} alt="Foto de perfil" className="img-thumbnail" width="150" />
        )}
      </div>
    ) : (
      <p>Cargando datos del usuario...</p>
    )}

    <h3 className="mt-4"><i className="bi bi-star-fill me-2"></i>Top 5 Libros Leídos</h3>
    <ul className="list-group">
      {topBooks.map((book) => (
        <li key={book.idlibro} className="list-group-item">
          <strong>{book.titulo}</strong> - {book.calificacion}/10
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
