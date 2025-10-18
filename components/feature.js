import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Feature({ title, description, icon }) {
  return (
    <ThemedView style={styles.card}>
      <View style={styles.iconWrap} accessible accessibilityLabel={title + " icon"}>
        {icon ? (
          <Image source={{ uri: icon }} style={styles.icon} resizeMode="contain" />
        ) : null}
      </View>

      <View style={styles.content}>
        <ThemedText type="defaultSemiBold" style={styles.title} numberOfLines={2}>
          {title}
        </ThemedText>
        <ThemedText style={styles.desc} numberOfLines={6}>
          {description}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    // elevation for Android
    elevation: 2,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#f6f7f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 6,
    fontSize: 16,
    lineHeight: 20,
  },
  desc: {
    color: "#555",
    fontSize: 14,
    lineHeight: 20,
  },
});
