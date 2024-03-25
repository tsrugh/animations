import { MotiTransitionProp, MotiView } from 'moti';
import React, { useMemo, useState } from 'react'
import { View, StyleSheet, Text, SafeAreaView, StatusBar, Pressable, } from 'react-native'
import { Easing } from 'react-native-reanimated';

const _colors = {
    active: '#2C2C2C',
    inactive: '#DCDCDC'
}

type SwitchProps = {
    size: number;
    onPres: () => void;
    isActive: boolean;
}

const transition: MotiTransitionProp = {
    type: 'timing',
    duration: 300,
    easing: Easing.inOut(Easing.ease)
}

// Outro componente
const SwitchComp: React.FC<SwitchProps> = ({ size, onPres, isActive }) => {

    const trackWidth = useMemo(() => {
        return size * 1.5
    }, [size])

    const trackHight = useMemo(() => {
        return size * 0.4
    }, [size])

    const knobSize = useMemo(() => {
        return size * 0.6
    }, [size])

    return (
        <Pressable onPress={onPres}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {/* track */}
                <MotiView
                    animate={{
                        backgroundColor: isActive ? _colors.active : _colors.inactive
                    }}
                    transition={transition}
                    style={{
                        position: 'absolute',
                        width: trackWidth,
                        height: trackHight,
                        borderRadius: trackHight / 2,
                        backgroundColor: _colors.active
                    }}
                />
                {/* knob container */}
                <MotiView
                    transition={transition}
                    animate={{
                        translateX: isActive ? trackWidth / 4 : -trackWidth / 4
                    }}
                    style={{
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        backgroundColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* knob indicator */}
                    <MotiView
                        transition={transition}
                        animate={{
                            width: isActive ? 0 : knobSize,
                            borderColor: isActive ? _colors.active : _colors.inactive
                        }}
                        style={{
                            width: knobSize,
                            height: knobSize,
                            borderRadius: knobSize / 2,
                            borderWidth: size * 0.1,
                            borderColor: _colors.active,

                        }}
                    />
                </MotiView>
            </View>
        </Pressable>
    )

}

const Switch = ({ }) => {

    const [isActive, setIsActive] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                
                <SwitchComp size={50} isActive={isActive} onPres={ () => {setIsActive(isActive => !isActive)} } />
                
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f4',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Switch