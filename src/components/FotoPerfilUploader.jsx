import { useState } from 'react';
import { subirArchivo } from '../services/uploadService';
import { supabase } from '../services/supabaseClient';

const FotoPerfilUploader = ({ idusuario, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) return;

    try {
      const ruta = `usuario-${idusuario}.jpg`;
      const url = await subirArchivo(file, 'foto-perfil', ruta);

      await supabase
        .from('usuario')
        .update({ fotoperfil: url })
        .eq('idusuario', idusuario);

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
      <button className="btn btn-secondary btn-sm" onClick={handleUpload}>Actualizar</button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default FotoPerfilUploader;
