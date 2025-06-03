import { useState } from 'react';
import { subirArchivo } from '../services/uploadService';
import { supabase } from '../services/supabaseClient';

const FotoPerfilUploader = ({ idusuario, onUpdate }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [subiendo, setSubiendo] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    try {
      setSubiendo(true);
      setError('');

      const ruta = `usuario-${idusuario}.jpg`;
      const url = await subirArchivo(file, 'foto-perfil', ruta);

      const { error: updateError } = await supabase
        .from('usuario')
        .update({ fotoperfil: url })
        .eq('idusuario', idusuario);

      if (updateError) throw updateError;

      // Esperar un poco antes de actualizar el estado en el componente padre
      setTimeout(() => {
        onUpdate?.();
      }, 500);
    } catch (err) {
      setError('Error al subir la foto: ' + err.message);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="mb-3">
      <input
        type="file"
        className="form-control form-control-sm mb-2"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="btn btn-secondary btn-sm"
        onClick={handleUpload}
        disabled={!file || subiendo}
      >
        {subiendo ? 'Subiendo...' : 'Actualizar'}
      </button>
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default FotoPerfilUploader;
