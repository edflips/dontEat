import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Footer extends Component {
  render() {
    return (
      <View style={styles.footer}>
        <Text style={{color: 'white'}}>THIS IS THE FOOTER</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Footer;