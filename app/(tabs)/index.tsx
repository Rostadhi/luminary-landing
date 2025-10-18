import Feature from "@/components/feature";
import HeaderHero from "@/components/header-hero";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { fetchLandingData } from "@/service/api-service";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet
} from "react-native";

type FeatureItem = {
    id: string;
    title: string;
    description: string;
    icon: string | null;
};

export default function HomeScreen() {
    const [title, setTitle] = useState<string>("");
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [features, setFeatures] = useState<FeatureItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const colorScheme = useColorScheme() ?? "light";

    useEffect(() => {
        const loadData = async () => {
            try {
                const json = await fetchLandingData();
                const item = json?.item;
                const modules = json?.modular_content || {};

                const pageTitle = item?.elements?.title_page?.value || "Welcome";
                const heroImg = item?.elements?.banner_image?.value?.[0]?.url || null;
                const linkedItems = item?.elements?.untitled_linked_items?.value || [];

                const mappedFeatures: FeatureItem[] = linkedItems
                    .map((key: string) => {
                        const content = modules[key];
                        if (!content) return null;
                        return {
                            id: key,
                            title: content?.elements?.title?.value || "",
                            description: content?.elements?.description?.value || "",
                            icon: content?.elements?.icon?.value?.[0]?.url || null,
                        } as FeatureItem;
                    })
                    .filter(Boolean) as FeatureItem[];

                setTitle(pageTitle);
                setBannerImage(heroImg);
                setFeatures(mappedFeatures);
            } catch (e) {
                console.error(e);
                setError("Failed to load content");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const renderItem = useCallback(({ item }: { item: FeatureItem }) => {
        return (
            <Feature
                title={item.title}
                description={item.description}
                icon={item.icon}
            />
        );
    }, []);

    if (loading) {
        return (
            <ThemedView style={styles.center}>
                <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
            </ThemedView>
        );
    }

    if (error) {
        return (
            <ThemedView style={styles.center}>
                <ThemedText>{error}</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={features}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    ListHeaderComponent={<HeaderHero title={title} image={bannerImage} />}
                    ListEmptyComponent={<ThemedText>No features available.</ThemedText>}
                />
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { padding: 16 },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
});
