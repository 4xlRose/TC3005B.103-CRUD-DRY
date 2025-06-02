import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBook, updateBook, getBooksByUser } from '../services/bookService';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const idusuario = 1;

  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    genero: '',
    fecha_lectura: '',
    calificacion: '',
    comentario: '',
    idusuario,
  });

  const [error, setError] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    if (id) {
      setModoEdicion(true);
      obtenerLibro(id);
    }
  }, [id]);

  const obtenerLibro = async (idLibro) => {
    try {
      const data = await getBooksByUser(idusuario);
      const encontrado = data.find((l) => l.idlibro === parseInt(idLibro));
      if (!encontrado) {
        setError('Libro no encontrado');
      } else {
        setLibro(encontrado);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setLibro({ ...libro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion) {
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
    <div>
    <div className="page-container">
      <h2>{modoEdicion ? 'Editar Libro' : 'Agregar Libro'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input type="text" name="titulo" className="form-control" value={libro.titulo} onChange={handleChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Autor</label>
          <input type="text" name="autor" className="form-control" value={libro.autor} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Género</label>
          <input type="text" name="genero" className="form-control" value={libro.genero} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha de lectura</label>
          <input type="date" name="fecha_lectura" className="form-control" value={libro.fecha_lectura} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Calificación (1-10)</label>
          <input type="number" name="calificacion" className="form-control" value={libro.calificacion} onChange={handleChange} min="1" max="10" />
        </div>
        <div className="col-12">
          <label className="form-label">Comentario</label>
          <textarea name="comentario" className="form-control" value={libro.comentario} onChange={handleChange}></textarea>
        </div>
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-success">{modoEdicion ? 'Actualizar' : 'Guardar'}</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default BookForm;
