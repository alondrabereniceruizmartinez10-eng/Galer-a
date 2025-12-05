//galeria
//botón para añadir la imagen

import { useState } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, View } from "react-native";
import { ImagePicker } from "./components/ImagePicker";


export function GalleryView() {

    //estado para la coleccion de imagenes
    const [images, setImages] = useState<string[]>([]);

    //recibir nueva imagen
    const onAdded = (uri: string) => {
        //agregar la nueva imagen a la coleccion
        setImages([uri, ...images]);
    }

    const renderItem = ({ item }: { item: string }) => (
        <Image
            source={{ uri: item }}
            style={styles.image}
        />
    );

    return (
        <ImageBackground
            source={{ uri: "https://w0.peakpx.com/wallpaper/949/976/HD-wallpaper-nubes-aesthetic-estrellas-fondo-de-pantalla-luna-noche-sky-thumbnail.jpg" }}
            style={styles.ImageBackground}>
            <View
                style={styles.container}
            >
                {/*selector de imagen*/}
                <ImagePicker
                    onImageSelected={onAdded}
                />

                {/*implemetar la galeria (flatlist)*/}
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => item.toString()}
                    numColumns={4}
                    contentContainerStyle={styles.gallery}
                    renderItem={renderItem}
                />

            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 2,
        paddingHorizontal: 6,
    },
    ImageBackground: {
        flex: 1,
        justifyContent: 'center',
    },
    gallery: {
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        margin: 5,
    },
})