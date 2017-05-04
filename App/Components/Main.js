import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      long: null,
      lat: null,
      error: null
    }
  }
  
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log('goelocate success', this.state.long);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header}>
          <Text>Latitude: {this.props.lat}</Text>
          <Text>Longitude: {this.props.long}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </Header>
        <View style={styles.content}>
          <Text>MAIN VIEW</Text>
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
  header: {
    flex: 1,
    backgroundColor: 'blue'
  },
  content: {
    flex: 1
  }
})

export default Main;