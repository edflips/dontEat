import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './header';
import Footer from './footer';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
        
        </View>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    marginTop: 22
  },
  content: {
    flex: 1
  }
})

export default App;