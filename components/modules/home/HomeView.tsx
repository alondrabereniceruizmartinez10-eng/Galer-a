import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function HomeView (){

    //vista principar donde el usuario va a ponder a:
    //*link para ver la cuenta de usuario
    // link para ver la galeria

    return(
        
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => router.push('/account')}
                style={styles.button}>
                <Text style={styles.buttonText}>Cuenta de usuario</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.push('/gallery')}
                style={styles.button}>
                <Text style={styles.buttonText}>Galeria</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.push('/notes')}
                style={styles.button}>
                <Text style={styles.buttonText}>Notas</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 60,
        backgroundColor: '#9ad2ff53',
        minHeight: '100%',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 40,
        backgroundColor: '#20537cff',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffffff',
        fontSize: 18,
        fontWeight: '600',

    }
})