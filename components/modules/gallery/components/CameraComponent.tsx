//visualizar la camara
//y tomar la foto

import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/*props
    -onCancel
    -onTakedPicture (uri: string)
*/

type Props = {
    onCancel: () => void,
    onTakedPicture: (uri: string) => void
}

export function CameraComponent({
    onCancel,
    onTakedPicture,
}: Props) {

    const [permission, requestPermission] = useCameraPermissions();
    //tipo de camara que se va a usar si la delantera o trasera
    const [facing, setFacing] = useState<CameraType>('back');

    //referencia para el acceso a la camara
    const ref = useRef <CameraView>(null);

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        //mostrar opcion al usuario para autorizar el acceso a la camara
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Se requiere acceso a la camara</Text>
                <Button
                    onPress={requestPermission}
                    title="Autorizar camara" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        const photo = await ref.current?.takePictureAsync();

        //enviar al componente padre, la uti del archivo
        if (photo) {
            onTakedPicture(photo?.uri);
        }
    }

    return (
        <View style={styles.container}>
            <CameraView 
            ref={ref}
            style={styles.camera} 
            facing={facing} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onCancel}>
                    <Ionicons
                        name="close"
                        size={32}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture}>
                    <Ionicons
                        name="camera"
                        size={32}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleCameraFacing}>
                    <Ionicons
                        name="camera-reverse-outline"
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
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
})