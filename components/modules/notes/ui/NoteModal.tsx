import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { Note } from "../domain/note.interface";

type Props  = {
  note : Note | null;
  onSave: (note: Note) => void;
  onCancel: () => void;
}

export default function NoteModal({ note, onSave, onCancel 

}: Props) {

  //estado para los campos
    //estado para el titulo
    const [title, setTitle] = useState("");
    //estado para la descripcion
    const [description, setDescription] = useState("");
    const [date, setDate] = useState<Date>(new Date());

  /*funcion para mandar a guardar la nota
  const saveNote = () => {
    //si no hay nota, no continuar
    if (!note) return;
    //lamar a la propiedad onSave
    onSave({
      ...note, // tomar la info original de la nota
      title, // pasar el nuevo titulo
      description, // la nueva descripcion
    });
  }*/

  //monitorear la propiedad note
  //para mostrar o pasar sus datos al estado de los campos
    useEffect(() => {
      //si hay nota, leer el titulo, si no tiene valor poner una cadena vacia
            setTitle(note?.title || "");
      
            setDescription(note?.description || "");
    //monitorea o esta observando la propiedad note
    }, [note]);

    if (!note) {
        return null;
    }

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert("Error", "El título no puede estar vacío.");
            return;
        }

        const updatedNota: Note = {
            ...note,
            title,
            description,
            date,
        };

        onSave(updatedNota);
    };

    return (
        <Modal visible={!!note} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>
                        {note.id === "0" ? "Agregar nueva nota" : "Editar Nota"}
                    </Text>

                    <TextInput
                        placeholder="Título"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                        placeholderTextColor="#999"
                    />

                    <TextInput
                        placeholder="Descripción"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={5}
                        style={[styles.input, { minHeight: 100 }]}
                        placeholderTextColor="#999"
                    />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                            <Text style={styles.saveText}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 14,
  },
  input: {
    backgroundColor: "#f1f3f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
    gap: 10,
  },
  cancelBtn: {
    backgroundColor: "#ced4da",
    padding: 10,
    borderRadius: 8,
  },
  saveBtn: {
    backgroundColor: "#4dabf7",
    padding: 10,
    borderRadius: 8,
  },
  cancelText: { color: "#000", fontWeight: "bold" },
  saveText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.15)',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#f0f0f0',
        width: '80%',
        padding: 20,
        display: 'flex',
        borderRadius: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
});