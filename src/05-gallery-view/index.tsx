import React, { useEffect, useRef, useState } from 'react'
import { Image, TextInput, TouchableOpacity } from 'react-native'
import { View, StyleSheet, Text, SafeAreaView, Dimensions, FlatList, } from 'react-native'
//import dados from './mock/image-data.json'

const { width, height } = Dimensions.get('screen')
const API_KEY = 'oEC5LEXiBTOeGtbptYCf4wcxzPaoIxtLyt0o9IGnTS13eEEjpJoNlre6'


const API_URL = 'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20'
const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async () => {

    const data = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': API_KEY
        }
    })

    const { photos } = await data.json();

    return photos

}

const GaleryView: React.FC<Element> = ({ }) => {

    // states
    const [images, setImages] = useState()
    const [activeIndex, setActiveIndex] = useState<number>(0)

    // refs
    const topRef = useRef<FlatList>(null)
    const thumbRef = useRef<FlatList>(null)

    useEffect(() => {

        const fetchImages = async () => {
            const dados = await fetchImagesFromPexels();

            setImages(dados)

        }
        fetchImages()

    }, [])

    const scrollToActiveIndex = (index: number) => {
        setActiveIndex(index)
        topRef?.current?.scrollToOffset({
            offset: index * width,
            animated: true
        })
        if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
            thumbRef?.current?.scrollToOffset({
                offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
                animated: true
            })
        } else {
            thumbRef?.current?.scrollToOffset({
                offset: 0,
                animated: true
            })

        }
    }


    if (!images) {

        return <Text>Loading...</Text>
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                ref={topRef}
                horizontal
                pagingEnabled
                data={images}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                onMomentumScrollEnd={ev => {
                    console.log('tela', width)
                    console.log('largura evento', ev.nativeEvent.contentOffset.x)
                    scrollToActiveIndex(Math.round(ev.nativeEvent.contentOffset.x / width))
                }}
                renderItem={({ item }) => {
                    return (
                        <View style={{ width, height }}>
                            <Image source={{ uri: item.src.portrait }}
                                style={StyleSheet.absoluteFillObject}
                            />
                        </View>
                    )
                }}
            />
            <FlatList
                ref={thumbRef}
                horizontal
                data={images}
                showsHorizontalScrollIndicator={false}
                style={{ position: 'absolute', bottom: IMAGE_SIZE }}
                contentContainerStyle={{ paddingHorizontal: SPACING }}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => scrollToActiveIndex(index)}
                        >
                            <Image source={{ uri: item.src.portrait }}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: 12,
                                    marginRight: SPACING,
                                    borderWidth: 2,
                                    borderColor: activeIndex === index ? '#fff' : 'transparent'
                                }}
                            />
                        </TouchableOpacity>

                    )
                }}
            />
        </SafeAreaView>
    )

}

export default GaleryView