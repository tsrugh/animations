/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ScrollToIndex from './src/01-sroll-to-index';
import WaveThingy from './src/02-wave-animation';
import Loading from './src/03-loading-animation';
import Switch from './src/04-switch';
import GaleryView from './src/05-gallery-view';
import ScrollItem from './src/06-scroll-item';
import FLatListBlur from './src/07-flatlist-blur';
import Carousel from './src/08-carousel-3d';
import StickyFooter from './src/09-sticky footer';
import TesteUnmount from './src/00-teste-unmounting'



function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <TesteUnmount/>
    // <Carousel/>
    <FLatListBlur/>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
