import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Avatar } from './Avatar'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageBackground
      source={{ uri: "https://w0.peakpx.com/wallpaper/949/976/HD-wallpaper-nubes-aesthetic-estrellas-fondo-de-pantalla-luna-noche-sky-thumbnail.jpg" }}
      style={styles.ImageBackground}>

      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Avatar
            size={200}
            url={avatarUrl}
            onUpload={(url: string) => {
              setAvatarUrl(url)
              updateProfile({ username, website, avatar_url: url })
            }}
          />
        </View>
        <View style={styles.spaced}>
          <Text style={styles.text}>Email</Text>
          <TextInput style={styles.textImput} value={session?.user?.email} readOnly />
        </View>

        <View style={styles.spaced}>
          <Text style={styles.text}>Username</Text>
          <TextInput style={styles.textImput} value={username || ''} onChangeText={(text) => setUsername(text)} />
        </View>

        <View style={styles.spaced}>
          <Text style={styles.text}>Website</Text>
          <TextInput style={styles.textImput} value={website || ''} onChangeText={(text) => setWebsite(text)} />
        </View>


        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Cargando ...' : 'Guardar perfil'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => supabase.auth.signOut()}>
            <Text style={styles.buttonText}>Cerrar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  sectionHeader: {
    alignItems: 'center',
    paddingHorizontal: 'auto',
    marginBottom: 1,
    backgroundColor: '#0000002c',
    borderRadius: 20,
  },
  ImageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  spaced: {
    paddingTop: 1,
    paddingBottom: 4,
    alignSelf: 'stretch',
    marginTop: 20,
    backgroundColor: '#b0cef592',
    borderRadius: 10,

  },
  text: {
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 1,
    backgroundColor: '#cbe2ff92',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#323232ff',
  },
  textImput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 1,
    fontSize: 16,
    color: '#000000ff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row', //para alinear imagen alado del texto 
    borderWidth: 1,
    borderColor: '#070a2dff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#fdfeff92',

  },
  buttonText: {
    fontSize: 16,
    color: '#131212ff',
    fontWeight: 'bold',
  },
})