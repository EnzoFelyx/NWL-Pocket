import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from './styles'

export function Welcome() {

    return (
        <View>
            <TouchableOpacity>
                <Image source={require("@/assets/logo.png")} style={styles.logo} />
            </TouchableOpacity>
            <Text style={styles.title}>Boas vindas ao Nearby!</Text>

            <Text style={styles.subtitle}>
                Tenha cupons de vantagem para usar em seus estabelecimentos favoritos.
            </Text>

        </View>
    )
}
