import React, {Component} from 'react';
import {StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import 'react-native-gesture-handler';
import AppRouter from './navigation/rootNavigator';

import Colors from './themes/colors';
const window = Dimensions.get('window');

export default class App extends Component {
  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <AppRouter />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    width: window.width,
    height: window.height,
  },
});
