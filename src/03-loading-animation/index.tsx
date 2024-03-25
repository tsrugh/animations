import { MotiView } from "moti";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from 'react-native'

const LoadingIndicator = ({ size }: { size: number }) => {

    return <MotiView
        from={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 0,

        }}
        animate={{
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
            borderWidth: size / 10
        }}
        transition={{
            type: 'timing',
            duration: 1000,
            loop: true,
            //repeatReverse: false
        }}
        style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: size / 10,
            borderColor: '#fff',
            shadowColor: '#ffff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
            //elevation: 1
        }}
    />

}


export default function Loading() {

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#010100'
            }}
            >
                <LoadingIndicator size={100} />
            </View>
        </SafeAreaView>
    )

}