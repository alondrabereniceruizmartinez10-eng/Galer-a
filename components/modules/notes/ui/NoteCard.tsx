import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "../domain/note.interface";

type Props = {
  note: Note,
  onEdit: () => void;
  onDelete: () => void;
}

export default function NoteCard({ note, onEdit, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{note.title}</Text>

          <Text style={styles.description} numberOfLines={3}>
            {note.description}
          </Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
            <Text style={styles.editText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>

          <Text style={styles.date}>{new Date(note.date).toLocaleDateString()}</Text>
        </View>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#b0cef592",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    alignItems: 'center',
  },
  textcard: {
    backgroundColor: "#ffffffcb",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    backgroundColor: "#ffffffcb",
    padding: 4,
    borderRadius: 10,
    paddingHorizontal: 80,

  },
  description: {
    fontSize: 14,
    color: "#555",
    paddingHorizontal: 26,
    backgroundColor: "#ffffffcb",
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  date: {
    marginTop: 14,
    fontSize: 12,
    color: "#ffffffff",
    backgroundColor: "#00000056",
    borderRadius: 6,
    padding: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 10,
  },
  editBtn: {
    padding: 8,
    backgroundColor: "#4dabf7",
    borderRadius: 6,
  },
  deleteBtn: {
    padding: 8,
    backgroundColor: "#ff6b6b",
    borderRadius: 6,
  },
  editText: { color: "#fff", fontWeight: "bold" },
  deleteText: { color: "#fff", fontWeight: "bold" },
});