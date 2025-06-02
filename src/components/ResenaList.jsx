import { useEffect, useState } from 'react';
import {
  getResenasPorUsuario,
  eliminarResena,
  editarResena
} from '../services/reviewService';
import ResenaForm from './ResenaForm';

const ResenaList = () => {
  const [resenas, setResenas] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [editando, setEditando] = useState(null);
  const [nuevoContenido, setNuevoContenido] = useState('');

  const idusuario = 1;

  const fetchResenas = async () => {
    try {
      const data = await getResenasPorUsuario(idusuario);
      setResenas(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchResenas();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm('¿Deseas eliminar esta reseña?')) return;
    try {
      await eliminarResena(id);
      setRefresh(!refresh);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      await editarResena(id, nuevoContenido);
      setEditando(null);
      setNuevoContenido('');
      setRefresh(!refresh);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <h2><i className="bi bi-chat-square-text me-2"></i>Mis Reseñas</h2>

      <ResenaForm onDone={() => setRefresh(!refresh)} />

      {error && <div className="alert alert-danger">{error}</div>}

      {resenas.length === 0 && <p className="text-muted">Aún no has publicado ninguna reseña.</p>}

      {resenas.map((r) => (
        <div key={r.idresena} className="mb-4 p-3 rounded bg-secondary text-light">
          <h5>{r.libro.titulo}</h5>
          <small className="text-muted">{new Date(r.fecha).toLocaleString()}</small>

          {editando === r.idresena ? (
            <>
              <textarea
                className="form-control my-2"
                value={nuevoContenido}
                onChange={(e) => setNuevoContenido(e.target.value)}
              />
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => handleEdit(r.idresena)}
              >
                Guardar
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setEditando(null)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <p className="mt-2">{r.contenido}</p>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => {
                  setEditando(r.idresena);
                  setNuevoContenido(r.contenido);
                }}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(r.idresena)}
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResenaList;
