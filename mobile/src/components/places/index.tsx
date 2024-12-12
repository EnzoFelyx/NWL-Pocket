import { Text, useWindowDimensions } from "react-native";
import { router } from "expo-router";

import { Place, PlaceProps } from "../place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { styles } from "./styles";

type Props = {
    data: PlaceProps[]
}

export function Places({ data }: Props) {

    const dimensions = useWindowDimensions()
    const bottomSheetRef = useRef<BottomSheet>(null)

    const snapPoints = {
        min: 278,
        max: dimensions.height
    }

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            handleIndicatorStyle={styles.indicator}
            backgroundStyle={styles.container}
            enableOverDrag={false}
            topInset={dimensions.height * 0.15}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Place data={item} onPress={() => router.navigate(`/market/${item.id}`)} />}
                contentContainerStyle={styles.content}
                ListHeaderComponent={() => (
                    <Text style={styles.title}>Explore locais perto de você</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </BottomSheet>
    )
}