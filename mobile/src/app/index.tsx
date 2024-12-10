import { View } from 'react-native'

import { Button } from '@/components/button'
import { Steps } from '@/components/steps'
import { Welcome } from '@/components/welcome'
import { styles } from './styles'



export default function Index() {
    return (
        <View style={styles.container}>
            <Welcome />
            <Steps />
            <Button >
                <Button.Title>Começar</Button.Title>
            </Button>
        </View>
    )
}