import React, { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView, StyleSheet, FlatList } from "react-native";
import { fetchLandingData } from "../services/kontentService";
import HeaderHero from "../components/HeaderHero";
import FeatureCard from "../components/FeatureCard";

const LandingScreen = () => {
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const json = await fetchLandingData();
        const item = json.item;
        const modules = json.modular_content;

        const pageTitle = item?.elements?.title_page?.value || "Welcome";
        const heroImg = item?.elements?.banner_image?.value?.[0]?.url || null;

        const linkedItems = item?.elements?.untitled_linked_items?.value || [];

        const mappedFeatures = linkedItems.map((key) => {
          const content = modules[key];
          return {
            id: key,
            title: content?.elements?.title?.value || "",
            description: content?.elements?.description?.value || "",
            icon: content?.elements?.icon?.value?.[0]?.url || null,
          };
        });

        setTitle(pageTitle);
        setBannerImage(heroImg);
        setFeatures(mappedFeatures);
      } catch (e) {
        setError("Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} size="large" />;
  if (error) return <Text style={styles.center}>{error}</Text>;

  return (
    <ScrollView style={styles.container}>
      <HeaderHero title={title} image={bannerImage} />
      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeatureCard title={item.title} description={item.description} icon={item.icon} />
        )}
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 100 },
  list: { padding: 16 },
});

export default LandingScreen;
