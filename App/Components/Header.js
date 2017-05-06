import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={{color: 'white'}}>THIS IS THE HEADER</Text>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Header;