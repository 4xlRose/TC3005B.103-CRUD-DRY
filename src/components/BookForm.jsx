import { useState, useEffect } from 'react';
import { createBook, updateBook, getBookById } from '../services/bookService';
import { useNavigate, useParams } from 'react-router-dom';
import { subirArchivo } from '../services/uploadService';

const BookForm = () => {
  const [titulo, setTitulo] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [fecha_lectura, setFechaLectura] = useState('');
  const [imagenFile, setImagenFile] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const idusuario = 1;

  useEffect(() => {
    if (id) {
      getBookById(id).then((libro) => {
        setTitulo(libro.titulo);
        setCalificacion(libro.calificacion);
        setFechaLectura(libro.fecha_lectura?.split('T')[0]);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !calificacion || !fecha_lectura) {
      return setError('Todos los campos son obligatorios');
    }

    try {
      const libro = { titulo, calificacion, fecha_lectura, idusuario };
      let imagenURL = '';

      if (imagenFile) {
        const ruta = `libro-${Date.now()}.jpg`;
        imagenURL = await subirArchivo(imagenFile, 'imagenes-libros', ruta);
        libro.imagen = imagenURL;
      }

      if (id) {
        await updateBook(id, libro);
      } else {
        await createBook(libro);
      }

      navigate('/historial');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <h2>{id ? 'Editar Libro' : 'Registrar Libro'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Calificación (1-10)</label>
          <input
            type="number"
            className="form-control"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            min="1"
            max="10"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de lectura</label>
          <input
            type="date"
            className="form-control"
            value={fecha_lectura}
            onChange={(e) => setFechaLectura(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen del libro</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImagenFile(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? 'Actualizar' : 'Guardar'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
