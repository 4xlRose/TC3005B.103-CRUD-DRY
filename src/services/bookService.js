import { supabase } from './supabaseClient';

export const getBooksByUser = async (idusuario) => {
  const { data, error } = await supabase
    .from('libro')
    .select('*')
    .eq('idusuario', idusuario)
    .order('fecha_lectura', { ascending: false });

  if (error) throw new Error('Error al obtener libros: ' + error.message);

  return data; // ⬅️ YA contiene la URL pública, no hagas nada más
};



export const getTopBooks = async (idusuario) => {
  const { data, error } = await supabase
    .from('libro')
    .select('*')
    .eq('idusuario', idusuario)
    .order('calificacion', { ascending: false })
    .limit(5);
  if (error) throw new Error('Error al obtener top libros: ' + error.message);
  return data;
};

export const getBookById = async (idlibro) => {
  const { data, error } = await supabase
    .from('libro')
    .select('*')
    .eq('idlibro', idlibro)
    .single();

  if (error) throw new Error('Error al obtener el libro: ' + error.message);
  return data;
};


export const createBook = async (libro) => {
  const { error } = await supabase.from('libro').insert(libro);
  if (error) throw new Error('Error al registrar libro: ' + error.message);
};

export const updateBook = async (idlibro, libro) => {
  const { error } = await supabase.from('libro').update(libro).eq('idlibro', idlibro);
  if (error) throw new Error('Error al actualizar libro: ' + error.message);
};

export const deleteBook = async (idlibro) => {
  const { error } = await supabase.from('libro').delete().eq('idlibro', idlibro);
  if (error) throw new Error('Error al eliminar libro: ' + error.message);
};
