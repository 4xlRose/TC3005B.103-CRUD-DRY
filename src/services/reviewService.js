import { supabase } from './supabaseClient';

export const getResenasPorUsuario = async (idusuario) => {
  const { data, error } = await supabase
    .from('resena')
    .select(`
      *,
      libro:libro (
        idlibro,
        titulo,
        imagen
      )
    `)
    .eq('idusuario', idusuario)
    .order('fecha', { ascending: false });

  if (error) throw new Error('Error al obtener reseñas: ' + error.message);

  // Convertir rutas de imagen a URLs públicas
  const resenasConUrl = data.map((r) => {
    if (r.libro?.imagen && !r.libro.imagen.startsWith('http')) {
      const { data: urlData } = supabase.storage
        .from('imagenes-libros')
        .getPublicUrl(r.libro.imagen);
      return {
        ...r,
        libro: {
          ...r.libro,
          imagen: urlData?.publicUrl || ''
        }
      };
    }

    return r;
  });

  return resenasConUrl;
};

export const crearResena = async ({ contenido, idlibro, idusuario }) => {
  const { error } = await supabase.from('resena').insert([{ contenido, idlibro, idusuario }]);
  if (error) throw new Error('Error al crear reseña: ' + error.message);
};

export const eliminarResena = async (idresena) => {
  const { error } = await supabase.from('resena').delete().eq('idresena', idresena);
  if (error) throw new Error('Error al eliminar reseña: ' + error.message);
};

export const editarResena = async (idresena, nuevoContenido) => {
  const { error } = await supabase
    .from('resena')
    .update({ contenido: nuevoContenido })
    .eq('idresena', idresena);
  if (error) throw new Error('Error al editar reseña: ' + error.message);
};
