import { supabase } from './supabaseClient';

export const getUserById = async (idusuario) => {
  const { data, error } = await supabase
    .from('usuario')
    .select('*')
    .eq('idusuario', idusuario)
    .single(); // como esperamos solo 1

  if (error) throw new Error('Error al obtener usuario: ' + error.message);
  return data;
};
