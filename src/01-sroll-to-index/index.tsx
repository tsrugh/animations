import React, { useEffect, useRef, useState } from 'react'
import { View, SafeAreaView, FlatList, TouchableOpacity, Text, Dimensions } from 'react-native'
import { faker } from '@faker-js/faker';
import Entypo from 'react-native-vector-icons/Entypo'
import { MotiView } from 'moti';




faker.seed(10)
const data = [...Array(20).keys()].map(() => ({
    key: faker.string.uuid(),
    job: faker.animal.crocodilia()

}))

const { width, height } = Dimensions.get('screen')

export default function ScrollToIndex() {

    const ref = useRef<FlatList>(null)
    const [index, setIndex] = useState(0)
    const [viewPosition, setViewPosition] = useState(0)

    useEffect(() => {

        ref.current?.scrollToIndex({
            index: index,
            animated: true,
            viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : 10,
            viewPosition //porcentage from the viewport starting from left handside
        })

    }, [index, viewPosition])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    // ref
                    ref={ref}
                    //index inicial
                    initialScrollIndex={index}
                    style={{ flexGrow: 0 }}
                    data={data}
                    keyExtractor={(item) => item.key}
                    contentContainerStyle={{ paddingLeft: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={({ item, index: fIndex }) => {
                        return (
                            <TouchableOpacity onPress={() => setIndex(fIndex)}>
                                <MotiView
                                    animate={{                                        
                                        backgroundColor: fIndex === index ?  '#FCD259FF' :'#FCD25900',
                                        opacity: fIndex === index ? 1 : 0.6
                                    }}
                                    transition={{
                                        duration: 500
                                    }}
                                    style={{
                                        marginRight: 10,
                                        padding: 10,
                                        borderWidth: 2,
                                        borderColor: '#FCD259FF',
                                        borderRadius: 12
                                    }}
                                >
                                    <Text style={{ color: '#36303f', fontWeight: '700' }}>{`${item.job}`}</Text>
                                </MotiView>
                            </TouchableOpacity>
                        )
                    }}
                />

                <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 100 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#36303F', fontWeight: '700', marginBottom: 10 }}>Scroll position</Text>
                        <View style={{ flexDirection: 'row', width: width / 2, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                setViewPosition(0)
                            }}>
                                <View style={{ padding: 10, backgroundColor: '#FCD259', borderRadius: 10, marginRight: 10 }}>
                                    <Entypo name='align-left' size={24} color='#36303F' />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setViewPosition(0.5)
                            }}>
                                <View style={{ padding: 10, backgroundColor: '#FCD259', borderRadius: 10, marginRight: 10 }}>
                                    <Entypo name='align-horizontal-middle' size={24} color='#36303F' />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setViewPosition(1)
                            }}>
                                <View style={{ padding: 10, backgroundColor: '#FCD259', borderRadius: 10, marginRight: 10 }}>
                                    <Entypo name='align-right' size={24} color='#36303F' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ color: '#36303F', fontWeight: '700', marginBottom: 10 }}>Scroll position</Text>
                        <View style={{ flexDirection: 'row', width: width / 2, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                if (index === 0)
                                    return

                                setIndex(index - 1)
                            }}>
                                <View style={{ padding: 10, backgroundColor: '#FCD259', borderRadius: 10, marginRight: 10 }}>
                                    <Entypo name='chevron-thin-left' size={24} color='#36303F' />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                if (index === data.length - 1)
                                    return

                                    setIndex(index + 1)
                            }}>
                                <View style={{ padding: 10, backgroundColor: '#FCD259', borderRadius: 10, marginRight: 10 }}>
                                    <Entypo name='chevron-thin-right' size={24} color='#36303F' />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )

}