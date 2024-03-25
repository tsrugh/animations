import { MotiView } from 'moti'
import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Easing } from 'react-native-reanimated'
import Entypo from 'react-native-vector-icons/Entypo'

const _color = '#6E01EF'
const _size = 100

export default function WaveThingy(): React.JSX.Element {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={[styles.dot, styles.center]}>
                    {[...Array(10).keys()].map(index => {
                        return <MotiView
                            from={{ opacity: 0.5, scale: 1 }}
                            animate={{opacity: 0, scale: 4}}
                            transition={{
                                type: 'timing',
                                duration: 2000,
                                easing: Easing.out(Easing.ease),
                                delay: index * 400,
                                repeatReverse: false,
                                loop: true
                            }}
                            key={index}
                            style={[StyleSheet.absoluteFillObject,styles.dot ]}
                        />
                    })}
                    <Entypo name='phone' size={32} color='#ffffffff' />
                </View>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    dot: {
        width: _size,
        height: _size,
        borderRadius: _size,
        backgroundColor: _color
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }

})