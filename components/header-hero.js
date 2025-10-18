import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export default function HeaderHero({ title, image }) {
  return (
    <ImageBackground
      source={image ? { uri: image } : require("@/assets/images/icon.png")}
      style={styles.hero}
      imageStyle={{ borderRadius: 12 }}
    >
      <View style={styles.overlay}>
        <ThemedText type="title" style={styles.title}>
          {title}
        </ThemedText>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.35)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    color: "white",
    textAlign: "center",
  },
});
