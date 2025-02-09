"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from "react-native"
import LottieView from "lottie-react-native"
import { useFonts } from "expo-font"
import { Audio } from "expo-av"

const { width, height } = Dimensions.get("window")

const WelcomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  })

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim])

  if (!fontsLoaded) {
    return null
  }

  // Función que se ejecuta al presionar el botón
  const handlePress = async () => {
    try {
      // Crea el objeto de sonido y reprodúcelo
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/piuw.mp3")
      )
      await sound.playAsync()

      // Opcional: descarga el recurso después de 1 segundo (ajusta según la duración del sonido)
      setTimeout(() => {
        sound.unloadAsync()
      }, 1000)
    } catch (error) {
      console.log("Error al reproducir el sonido:", error)
    }
    // Navega a la pantalla "Story" después de reproducir el sonido
    navigation.navigate("Story")
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LottieView
          source={require("../assets/welcome.json")}
          autoPlay
          loop
          style={styles.animation}
          resizeMode="cover"
        />
        <Text style={styles.title}>Hola, mi amor</Text>
        <Text style={styles.subtitle}>Bienvenida a un viaje muy especial...</Text>
        {/* Botón que reproduce el sonido al presionarlo y luego navega */}
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </Animated.View>
      <LottieView
        source={require("../assets/corazones-celebracion.json")}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#120338",
  },
  content: {
    alignItems: "center",
    zIndex: 2,
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  backgroundAnimation: {
    position: "absolute",
    width: width,
    height: height,
    zIndex: 1,
  },
  title: {
    fontSize: 36,
    fontFamily: "Poppins-Bold",
    color: "#FF1493",
    marginBottom: 10,
    textShadow: "0px 0px 10px rgba(255,20,147,0.5)",
    zIndex: 1000,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    color: "#FF69B4",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    position: "relative",
    width: 200,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    zIndex: 1,
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    backgroundColor: "rgba(255, 9, 181, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
})

export default WelcomeScreen
