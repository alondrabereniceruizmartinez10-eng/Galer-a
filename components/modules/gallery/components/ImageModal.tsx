import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  imageUrl: string | null
  onCancel: () => void
  onDelete: (url: string) => void
};

export function ImageModal({ imageUrl, onCancel, onDelete }: Props) {
  if (!imageUrl) return null;

  return (
    <Modal
      visible={!!imageUrl}
      transparent
      animationType="fade">

      <View style={styles.modalContainer}>
        <Image source={{ uri: imageUrl }} style={styles.fullImage} />
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(imageUrl)}
          >
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
    resizeMode: "contain",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 20,
  },
  deleteButton: {
    backgroundColor: "#ff0000cd",
    padding: 18,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#0084e9ff",
    padding: 18,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});