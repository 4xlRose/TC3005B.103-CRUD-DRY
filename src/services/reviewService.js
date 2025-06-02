// src/services/reviewService.js
import { supabase } from './supabaseClient';

export const getResenasPorUsuario = async (idusuario) => {
  const { data, error } = await supabase
    .from('resena')
    .select('*, libro(titulo)')
    .eq('idusuario', idusuario)
    .order('fecha', { ascending: false });

  if (error) throw new Error('Error al obtener reseñas: ' + error.message);
  return data;
};

export const crearResena = async (resena) => {
  const resenaConFecha = {
    ...resena,
    fecha: new Date().toLocaleString() 
  };

  const { error } = await supabase.from('resena').insert(resenaConFecha);
  if (error) throw new Error('Error al crear reseña: ' + error.message);
};


export const editarResena = async (idresena, nuevoContenido) => {
  const { error } = await supabase
    .from('resena')
    .update({
      contenido: nuevoContenido,
      fecha: new Date().toLocaleString()
    })
    .eq('idresena', idresena);

  if (error) throw new Error('Error al editar reseña: ' + error.message);
};



export const eliminarResena = async (idresena) => {
  const { error } = await supabase
    .from('resena')
    .delete()
    .eq('idresena', idresena);

  if (error) throw new Error('Error al eliminar reseña: ' + error.message);
};
