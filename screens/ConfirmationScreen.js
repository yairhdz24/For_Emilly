"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from "react-native"
import LottieView from "lottie-react-native"

const { width, height } = Dimensions.get("window")

const ConfirmationScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        
        {/* Contenedor de la imagen y animación */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/chilemorron.png")} // Reemplaza con el link de tu imagen
            style={styles.image}
          />
          <LottieView source={require("../assets/corazones-celebracion.json")} autoPlay loop style={styles.animation} />
        </View>

        {/* Texto principal */}
        <Text style={styles.thankYouText}>¡Gracias, mi amor! 💖</Text>

        {/* Mensaje romántico */}
        <Text style={styles.messageText}>
          Yo sabia que em ibas a decir que si {'>'}{'>'}//{'<'}{'<'}. ✨  
          Este es solo el inicio de una historia hermosa que seguimos escribiendo juntos💖.  
          Eres mi más grande amor, mi todo. 💫
        </Text>

        {/* Botón mágico */}
        <TouchableOpacity style={styles.treasureButton} onPress={() => navigation.navigate("Treasure")}>
          <Text style={styles.buttonText}>🎁 Ver tu regalo especial</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Para colocar la animación sobre la imagen
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20, // Puedes quitar esto si no quieres esquinas redondeadas
  },
  animation: {
    position: "absolute",
    width: "120%", // Aumenta un poco para cubrir toda la imagen
    height: "120%",
  },
  thankYouText: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    color: "#FF1493",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "#FF1493",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  messageText: {
    fontSize: width * 0.045,
    fontFamily: "Poppins-Regular",
    color: "#FF69B4",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  treasureButton: {
    width: 260,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FF1493",
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
})

export default ConfirmationScreen
  