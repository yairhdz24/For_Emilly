import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import * as Notifications from "expo-notifications";

// Configura el handler para mostrar notificaciones en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true, // Muestra la alerta
    shouldPlaySound: true,  // Reproduce sonido (si se tiene configurado)
    shouldSetBadge: false,
  }),
});

const CountdownScreen = ({ navigation }) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [message, setMessage] = useState("");

  // Calcula los días restantes y selecciona un mensaje aleatorio
  useEffect(() => {
    const valentinesDay = new Date("2025-02-14T00:00:00");
    const today = new Date();
    const timeDiff = valentinesDay.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    setDaysLeft(daysDiff);

    const messages = [
      "Cada día que pasa, mi amor por ti crece más.",
      "Estoy contando los momentos hasta que estemos juntos.",
      "Tu sonrisa ilumina mis días.",
      "No puedo esperar para abrazarte.",
      "Eres lo mejor que me ha pasado.",
    ];
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  // Programa la notificación automáticamente a las 1:07 AM
  useEffect(() => {
    const scheduleNotificationAt107 = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("No se otorgaron permisos para notificaciones");
        return;
      }
      const now = new Date();
      // Crea un objeto Date para hoy a las 1:07:00 AM
      let notificationTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        1,    // Hora: 1 AM
        7,    // Minutos: 07
        0     // Segundos: 0
      );
      // Si ya pasó la hora de hoy, programa para mañana
      if (notificationTime <= now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Notificación Programada",
          body: "HOLAAAAAAAA",
        },
        trigger: notificationTime, // Se programa para la fecha calculada
      });
      console.log("Notificación programada para:", notificationTime);
    };

    scheduleNotificationAt107();
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/countdown.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.countdownText}>
        {daysLeft} días para San Valentín
      </Text>
      <Text style={styles.messageText}>{message}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
  },
  animation: {
    width: 200,
    height: 200,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF1493",
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    color: "#FF69B4",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FF1493",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CountdownScreen;
