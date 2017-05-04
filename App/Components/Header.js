import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Header extends Component {
  render() {
    return (
      <View>
        <Text>THIS IS THE HEADER</Text>
        {this.props.children}
      </View>
    )
  }
}

export default Header;