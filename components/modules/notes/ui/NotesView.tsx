import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { Note } from "../domain/note.interface";
import { handleDelete, saveNote } from "../infraestructure/datasource";
import NoteCard from "./NoteCard";
import NoteModal from "./NoteModal";

const addNote: Note = {
  id: "0",
  title: "",
  description: "",
  date: new Date(),
};

export function NotesView() {
  //estado para registro de notas
  const [notes, setNotes] = useState<Note[]>([]);

  //estado para editar o crear nota
  //se va a usar para abrir o cerrar el modal
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = () => {
    //inicializar una nueva nota
    setSelectedNote({
      id: '',
      title: '',
      description: '',
      date: new Date(),
    });
  }

  //recibir nota
  const onNoteChanged = (note: Note) => {
    console.log(JSON.stringify(note));
    //agregar la nota a la coleccion
    //mandar a guardar la nota a la base de datos
    saveNote(note)
      .then((result) => {
        //agregarlo o actualizarlo en la lista de nota (notes)
        if (result) { //respuesta que se obtiene del datasource
          //si la nota es nueva, agregarla al estado
          if (!note.id) {
            setNotes([
              result,
              ...notes,
            ]);
          } else {
            setNotes([
              ...notes.map((item) => item.id === result.id ? result : item)
            ]);
          }
        }
        setSelectedNote(null);

      });
  }

  const onCancelModal = () => {
    setSelectedNote(null);
  }

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // cargar las notas cuando se ingrese a esta pantalla (efecto cuando se ingrese a la pantalla)
    setLoading(true);
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      // Usuario no autenticado; mostrar la nota de ejemplo
      setLoading(false);
      return;
    }

    const { data: notesData, error } = await supabase
      .from("notes4b")
      .select("*")
    //.eq("user_id", user.id)
    //.order("fecha", { ascending: false });

    if (error) {
      Alert.alert("Error", "No se pudieron cargar las notas.");
      // No sobrescribir notas en caso de error; mantener el ejemplo
    } else if (notesData && notesData.length > 0) {
      // Solo actualizar si hay notas en la base de datos
      setNotes(notesData as Note[]);
    }
    // Si notesData está vacío, mantener la nota de ejemplo en el estado
    setLoading(false);

  };

  //funcion para editar nota
  const editNote = (notes: Note) => {
    setSelectedNote(notes);
    setIsEditing(true);
}

  //funcion para eliminar nota
  const onDeleteNote = async (note: Note) => {
    const deleted = await handleDelete(note);
    if (deleted) {
      setNotes(prev => prev.filter(item => item.id !== note.id));
    } else {
      Alert.alert("No se pudo eliminar la nota.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri:
          'https://w0.peakpx.com/wallpaper/949/976/HD-wallpaper-nubes-aesthetic-estrellas-fondo-de-pantalla-luna-noche-sky-thumbnail.jpg',
      }}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mis Notas</Text>

        <View style={styles.sectionHeader}>
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                onEdit={() => editNote(item)}
                onDelete={() => onDeleteNote(item)} />
            )}
          />


        </View>
        <TouchableOpacity style={styles.fab} onPress={addNote}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        <NoteModal
          note={selectedNote}
          onSave={onNoteChanged}
          onCancel={onCancelModal}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 4,
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 'auto',
    marginBottom: 1,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover', // Adjust image to cover the entire background
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    color: '#ffffffff',
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 50,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#20537cff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
});