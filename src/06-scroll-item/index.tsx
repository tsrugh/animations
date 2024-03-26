import { faker } from "@faker-js/faker";
import { useRef } from "react";
import { Dimensions, FlatList, Image, StatusBar, StyleSheet, Text, View, Animated } from "react-native";


const { width, height } = Dimensions.get('screen');

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
    return {
        key: faker.string.uuid(),
        image: `https://randomuser.me/api/portraits/women/${faker.number.int(60)}.jpg`,
        name: `${faker.person.firstName('female')} ${faker.person.lastName('female')}`,
        jobTitle: faker.person.jobTitle(),
        email: faker.internet.email({ firstName: faker.person.firstName('female') })
    }
})

const BG_IMG = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?'

const SPACING = 20
const AVATAR_SIZE = 70
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3

const ScrollItem = () => {

    const scrollY = useRef(new Animated.Value(0)).current;

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <Image
                source={{ uri: BG_IMG }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={80}
            />

            <Animated.FlatList
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                showsVerticalScrollIndicator={false}                
                data={DATA}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                renderItem={({ item, index }) => {

                    const inputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2)
                    ]
                    const opacityInputRange = [
                        -1,
                        0,
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 0.5)
                    ]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })
                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    return (
                        <Animated.View style={{
                            flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 12,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 10
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: 20,
                            elevation: 5,
                            transform: [{ scale }],
                            opacity: opacity
                        }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
                                    marginRight: SPACING / 2
                                }}
                            />
                            <View style={{ maxWidth: 250 }}>
                                <Text style={{ fontSize: 22, fontWeight: '700' }} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                                <Text style={{ fontSize: 18, opacity: 0.7, }} numberOfLines={1} ellipsizeMode="tail">{item.jobTitle}</Text>
                                <Text style={{ fontSize: 12, opacity: 0.8, color: '#0099cc' }}>{item.email}</Text>
                            </View>

                        </Animated.View>
                    )
                }}
            />


        </View>


    )

}

export default ScrollItem