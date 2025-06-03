import { useState } from 'react';
import { subirArchivo } from '../services/uploadService';
import { supabase } from '../services/supabaseClient';

const LibroImagenUploader = ({ idlibro, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    try {
      const ruta = `libro-${idlibro}.jpg`;
      const url = await subirArchivo(file, 'imagenes-libro', ruta); // ← CORREGIDO

      await supabase
        .from('libro')
        .update({ imagen: url })
        .eq('idlibro', idlibro);

      onUpdate?.();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mb-3">
      <input
        type="file"
        className="form-control form-control-sm mb-2"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn btn-secondary btn-sm" onClick={handleUpload}>Actualizar imagen</button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default LibroImagenUploader;
