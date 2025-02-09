"use client";

import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";

const NotificationsScheduler = () => {
  useEffect(() => {
    async function requestAndSchedule() {
      // Solicita permisos para notificaciones
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("No se otorgaron permisos para notificaciones.");
        return;
      }

      // Cancela notificaciones programadas previamente (opcional)
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Mensajes para cada uno de los 5 días
      const messages = [
        "¡Faltan 5 días para San Valentín! El amor se acerca 💖.",
        "¡Solo 4 días! Cada día es un paso hacia el romance 😍.",
        "¡Faltan 3 días! Prepárate para un día inolvidable ✨.",
        "¡Solo 2 días! El gran día está casi aquí 😘.",
        "¡Mañana es el gran día! ¡Feliz San Valentín anticipado! 🎉",
      ];

      // Programa una notificación de prueba que se disparará en 1 hora (3600 segundos)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Prueba de notificación",
          body: "Esta es una notificación de prueba que llegará en 1ed hora.",
        },
        trigger: { seconds: 60 },
      });

      // Programa una notificación para cada uno de los próximos 5 días a las 9:00 AM
      const now = new Date();
      for (let i = 1; i <= 5; i++) {
        const triggerDate = new Date(now);
        triggerDate.setDate(now.getDate() + i);
        triggerDate.setHours(9, 0, 0, 0);
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Recordatorio de amor 💌",
            body: messages[i - 1],
          },
          trigger: triggerDate,
        });
      }
      console.log("Notificaciones programadas para los próximos 5 días y una de prueba en 1 hora.");
    }
    requestAndSchedule();
  }, []);

  return null; // Este componente no renderiza nada en pantalla
};

export default NotificationsScheduler;
