//fuente de datos para notas

import { supabase } from "@/lib/supabase";
import { Note } from "../domain/note.interface";

export async function getNotas(): Promise<Note[]> {
    //leer todos los registros desde
    //la tabla de notas

    let { data, error } = await supabase
        .from('notes4b')
        .select('*')

    //si no hay datos, retorna un arreglo vacio
    return (data as Note[]) || [];

}

export async function saveNote(note: Note): Promise<Note | null> {
    //si es nota nueva
    if (!note.id) {
        //crear la nota sin ID
        const { id, ...noteData } = note;

        const { data, error } = await supabase
            .from('notes4b')
            .insert([
                noteData,

            ])
            .select()
        console.log(JSON.stringify(error));
        //si data no es un null, tomar el primer registro
        //o retomar null
        return data !== null ? data[0] : null;
    } else {
        //actualizar la nota
        //update notes4b set title ='aaa', description = 'aaa' where
        //id ='aaaaa'
        const { data, error } = await supabase
            .from('notes4b')
            .update({
                title: note.title,
                description: note.description,
            })
            .eq('id', note.id)
            .select()

        //si data no es un null, tomar el primer registro
        //o retomar null
        return data !== null ? data[0] : null;
    }

}

//eliminar nota
export async function handleDelete(note: Note): Promise<boolean> {
    const { error } = await supabase
        .from('notes4b')
        .delete()
        .eq('id', note.id);
    return error ? false : true;
}

//editar nota
export async function editNote(note: Note): Promise<boolean> {
    // actualizar título y descripción (ajustar según los campos que quieras permitir)
    const { data, error } = await supabase
        .from('notes4b')
        .update({
            title: note.title,
            description: note.description,
        })
        .eq('id', note.id)
        .select();
    return error ? false : true;
}
