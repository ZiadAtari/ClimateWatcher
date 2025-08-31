import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import Navbar from "../components/navigation/Navbar.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AlertsPage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HistoricalPage"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Wildlife"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>

  );
}
