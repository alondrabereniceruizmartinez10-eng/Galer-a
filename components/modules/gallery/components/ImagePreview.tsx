//visualizar la imagen selccionada

import { supabase } from "@/lib/supabase";
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
  // abrir la cámara / seleccionar otra imagen (no se pasa uri aquí)
  onNewImage: () => void,

}

export function ImagePreview({ uri, onCancel, onNewImage, onSave }: Props) {
  const uploadImage = async (uri: string) => {
    try {
        const fileData = await fetch(uri).then(res => res.arrayBuffer()); 
        // Subir directamente a la raíz del bucket
        const fileName = `public/photo-${Date.now()}.jpg`;
        const { error } = await supabase.storage
            .from("gallery")  
            .upload(fileName, fileData, {
                contentType: "image/jpg",
            });
        if (error) {
            console.error("Error al subir:", error.message);
        } else {
            console.log("Imagen subida correctamente:", fileName);
            // Obtener URL pública
            const { data } = supabase.storage
                .from("gallery")  
                .getPublicUrl(fileName);
            console.log("URL pública obtenida:", data.publicUrl);
            const{ data: insertData, error: dbError}  = await supabase
            .from("imagen")
            .insert([{
                id: fileName,
                url: data.publicUrl
            }]);
            // Guardar en el estado local (opcional)
            onSave(data.publicUrl);
        }
    } catch (error) {
        console.error("Error en uploadImage:", error);
    }
};

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        style={styles.image}
        resizeMode="contain"
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
          onPress={() => uploadImage(uri)}
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
      flex: 1,
      width: '100%',
      height: '100%',
    }
})