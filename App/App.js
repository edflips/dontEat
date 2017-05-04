import React, { Component } from 'react';
import {StyleSheet } from 'react-native';
import Main from './Components/Main';

class App extends Component {
  render() {
    return (
      <Main />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    marginTop: 22
  }
})

export default App;
