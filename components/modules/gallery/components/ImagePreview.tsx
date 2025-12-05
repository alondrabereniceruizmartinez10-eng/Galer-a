//visualizar la imagen selccionada

import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

/*debe de recibir:
  -uri de la imagen
  -funcion para guardar
  -funcion para cancelar
  -funcion para tomar o elegir otra imagen
*/

type Props = {
  uri: string,
  onCancel: () => void,
  onSave: (uri: string) => void,
  onNewImage: () => void, //void es un metodo de que no retorna nada

}

export function ImagePreview({
  uri,
  onSave,
  onNewImage,
  onCancel
}: Props) {

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
      />
      {/*Selecciones de botones */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onCancel}
          style={styles.button}>
          <Ionicons
            name="close"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSave(uri)}
          style={styles.button}>
          <Ionicons
            name="save-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNewImage}
          style={styles.button}>
          <Ionicons
            name="camera-outline"
            size={32}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)'
  },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#212242ff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  image: {
    height: '100%',
    objectFit: 'contain', //como se comporta la imagen dependiendo en la imagen que esta para que no se deforme
  }
})