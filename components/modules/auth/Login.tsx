import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { Alert, AppState, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
  }

  return (
    <ImageBackground
      source={{
        uri:
          'https://w0.peakpx.com/wallpaper/949/976/HD-wallpaper-nubes-aesthetic-estrellas-fondo-de-pantalla-luna-noche-sky-thumbnail.jpg',
      }}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Inicia sesión</Text>
          <Text style={styles.suptitulo}>Llene los espacios correctamente</Text>

          <Text style={styles.txtocj}>Correo</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />

          <Text style={styles.txtocj}>Contraseña</Text>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />

          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => signInWithEmail()}
          >
            <Text style={styles.buttonText}>Iniciar sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            disabled={loading}
            onPress={() => signUpWithEmail()}
          >
            <Text style={styles.buttonText}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add horizontal padding to center content
  },
  content: {
    width: '100%', // Make content take full width of container
    maxWidth: 400, // Limit content width for larger screens
  },
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover', // Adjust image to cover the entire background
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#ffffffff',
    textAlign: 'center', // Center the title text
  },
  suptitulo: {
    fontSize: 16,
    marginVertical: 0,
    marginBottom: 40,
    color: '#ffffffff',
    textAlign: 'center', // Center the subtitle text
  },
  txtocj: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffffff',
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#ffffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: '#ffffffff',
    backgroundColor: '#dadada81',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#89bcd8ff',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 6,
    color: '#ffffffff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});