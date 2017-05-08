import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Header extends Component {

  render() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white', fontSize: 30}}>HEADER</Text>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  
})

export default Header