//galeria
//botón para añadir la imagen

import { useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { ImagePicker } from "./components/ImagePicker";


export function GalleryView(){

    //estado para la coleccion de imagenes
    const [images, setImages] = useState<string [] > ([]);

    //recibir nueva imagen
    const onAdded = (uri: string) => {
        //agregar la nueva imagen a la coleccion
        setImages([uri, ... images]);
    }

    return(
        <View 
            style={styles.container}
        >
            {
                //selector de imagen
            }
            <ImagePicker
             onImageSelected={onAdded}
            />
            
            {
                //implemetar la galeria (flatlist)
            }
            <FlatList
                data={images}
                keyExtractor={(item, index) => item.toString()}
                renderItem={({item}) => (
                <Image 
                    source={{uri: item}} 
                    style={{width: 100, height: 100, }} />)}
                numColumns={4}
                style={{width:300, height:300}}
                
            />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 60,
        paddingHorizontal: 14,
    }
})