import { TouchableOpacity, TouchableOpacityProps, Text, TextProps, ActivityIndicator } from "react-native";
import { IconProps as TableIconProps } from '@tabler/icons-react-native'

import { styles } from './styles'
import { colors } from "@/styles/theme"

type ButtonProps = TouchableOpacityProps & {
    isLoading?: boolean
}


function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.container, style]}
            activeOpacity={0.6}
            disabled={isLoading}
            {...rest}
        >
            {isLoading ? (
                <ActivityIndicator color={colors.gray[100]} size="small" />
            ) : (
                children
            )}
        </TouchableOpacity>
    )
}

function Title({ children }: TextProps) {
    return <Text style={styles.title}>
        {children}
    </Text>
}


type IconProps = {
    icon: React.ComponentType<TableIconProps>
}

function Icon({ icon: Icon }: IconProps) {
    return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title;
Button.Icon = Icon;

export { Button }