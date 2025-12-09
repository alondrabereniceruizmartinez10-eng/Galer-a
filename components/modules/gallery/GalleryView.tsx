//galeria
//botón para añadir la imagen

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import { ImageModal } from "./components/ImageModal";
import { ImagePicker } from "./components/ImagePicker";


export function GalleryView() {

    //estado para la coleccion de imagenes
    const [images, setImages] = useState<string[]>([]);
    const[ selecterImage, setSelectedImage ] = useState<string | null>(null);

    useEffect(() => {
        async function loadImages() {
            const { data, error } = await supabase.storage
                .from("gallery")
                .list("public");
            if (error) {
                console.error("Error al listar imágenes:", error.message);
                return;
            }
            const urls = data.map((file) => {
                const { data } = supabase.storage
                    .from("gallery")
                    .getPublicUrl(`public / ${ file.name }`);
                return data.publicUrl;
            });
            setImages(urls);
        };
        loadImages();
    }, []);

    //recibir nueva imagen
    const onAdded = (uri: string) => {
        //agregar la nueva imagen a la coleccion
        setImages([uri, ...images]);
    }

    const deleteImage = async (url: string) => {
        try {
            // obtener el path relativo del archivo a partir de la URL pública
            const path = url.split("/").slice(-2).join("/"); // ej: "public/photo-123.jpg"
            const { error } = await supabase.storage
                .from("Imagenes")
                .remove([path]);
            if (error) {
                console.error("Error al eliminar:", error.message);
            } else {
                console.log("Imagen eliminada:", path);
                setImages(images.filter((img) => img !== url));
                setSelectedImage(null); // cerrar modal
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

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
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setSelectedImage(item)}>
                            <Image source={{ uri: item }} style={styles.image}/>
                        </TouchableOpacity>
                    )}
                />

                <ImageModal
                imageUrl={selecterImage}
                onCancel={() => setSelectedImage(null)}
                onDelete={deleteImage}
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