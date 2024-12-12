import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { Places } from "@/components/places";
import { api } from "@/service/api";
import { router } from "expo-router";

type MarketsProps = PlaceProps & {
    latitude: number;
    longitude: number;
};

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
};

export default function Home() {
    const [categories, setCategories] = useState<CategoriesProps>([]);
    const [category, setCategory] = useState("");
    const [markets, setMarkets] = useState<MarketsProps[]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [mapKey, setMapKey] = useState(0);
    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
        } catch (error) {
            console.log(error);
            Alert.alert("Categorias", "Não foi possível carregar as categorias");
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                return;
            }
            const { data } = await api.get("/markets/category/" + category);
            setMarkets(data);
        } catch (error) {
            console.log(error);
            Alert.alert("Locais", "Não foi possível carregar os locais");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);

    // Função que será chamada quando o mapa terminar de carregar
    const handleMapReady = () => {
        setMapLoaded(true);
    };

    // Função para verificar se o mapa foi carregado corretamente
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!mapLoaded) {
                setMapKey(prevKey => prevKey + 1); // Força o recarregamento do MapView
                setMapLoaded(false); // Reseta o estado do mapa
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [mapLoaded]);

    return (
        <View style={{ flex: 1, backgroundColor: "#c6c6c6" }}>
            <Categories data={categories} onSelected={setCategory} selected={category} />
            <MapView
                key={mapKey}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onMapReady={handleMapReady}
            >
                <Marker
                    identifier="current"
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    image={require("@/assets/location.png")}
                />
                {markets.map((item) => (
                    <Marker
                        key={item.id}
                        identifier={item.id}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        image={require("@/assets/pin.png")}
                        title={item.name}
                        description={item.description}
                    >
                        <Callout
                            onPress={() => router.navigate(`/market/${item.id}`)}
                        >
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            {mapLoaded && <Places data={markets} />}
        </View>
    );
}
