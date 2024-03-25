import React from 'react'
import {View, StyleSheet, Text, SafeAreaView, StatusBar, } from 'react-native'

const Switch = ({  }) => {

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <Text>Algum texto aqui</Text>
                <StatusBar barStyle='default' />
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Switch