import { supabase } from './supabaseClient';

export const subirArchivo = async (file, bucket, rutaDestino) => {
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(rutaDestino, file, {
      cacheControl: '3600',
      upsert: true
    });

  if (uploadError) throw new Error('Error al subir archivo: ' + uploadError.message);

  const { data } = supabase.storage.from(bucket).getPublicUrl(rutaDestino);
  return data.publicUrl;
};

