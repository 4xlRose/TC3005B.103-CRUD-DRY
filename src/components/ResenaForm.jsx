import { useEffect, useState } from 'react';
import { crearResena } from '../services/reviewService';
import { getBooksByUser } from '../services/bookService';

const ResenaForm = ({ onDone }) => {
  const [contenido, setContenido] = useState('');
  const [idlibro, setIdlibro] = useState('');
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');
  const idusuario = 1;

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const data = await getBooksByUser(idusuario);
        setLibros(data);
        if (data.length > 0) setIdlibro(data[0].idlibro);
      } catch (err) {
        setError('Error al cargar libros: ' + err.message);
      }
    };
    fetchLibros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contenido.trim()) return setError('Escribe algo para la reseña.');

    try {
      await crearResena({ contenido, idlibro, idusuario });
      setContenido('');
      onDone?.(); //refrescar la lista
    } catch (err) {
      setError('Error al crear reseña: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h5 className="mb-3">Escribir reseña</h5>

      <div className="mb-3">
        <label className="form-label">Selecciona un libro</label>
        <select
          className="form-select"
          value={idlibro}
          onChange={(e) => setIdlibro(parseInt(e.target.value))}
          required
        >
          {libros.map((libro) => (
            <option key={libro.idlibro} value={libro.idlibro}>
              {libro.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Tu reseña</label>
        <textarea
          className="form-control"
          rows="3"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe tu opinión del libro..."
          required
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <button type="submit" className="btn btn-primary">Publicar Reseña</button>
    </form>
  );
};

export default ResenaForm;
