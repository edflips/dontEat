import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';

import Header from './Header';
import Listing from './Listing';
import Footer from './Footer';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      long: null,
      error: null,
      establishments: []
    }

    this.bringPlaces = this.bringPlaces.bind(this);
  }
  
  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      position => {
        // setTimeout(() => {
          this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude,
            error: null,
          },
          // once lat and long states have been set, use the callback
          // of setState to call the axios search which rely on theese
          // coordinates
          this.bringPlaces
        );
        // }, 10000);
        
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
    );
  }
  

  bringPlaces() {
    console.log('bringPlaces() called')
    console.log('lat', this.state.lat)
    console.log('long', this.state.long)

    const getPlaces = axios.create({
      baseURL: 'http://api.ratings.food.gov.uk/Establishments/',
      timeout: 10000,
      headers: {'x-api-version': '2', 'accept': 'application/json', 'content-type': 'application/json'},
      params: {
        latitude: this.state.lat,
        longitude: this.state.long,
        maxDistanceLimit: 1,
        sortOptionKey: 'distance',
        businessTypeId: 1,
        pageSize: 20
      },
    });

    getPlaces()
      .then( response => {
        if (response.status === 200) {

          ///////////////
          // lets sort results by the Distance key
          ///////////////
          
          this.setState({
            establishments: response.data.establishments
          })
        }
      })
      .catch( error => {
        console.log('error', error);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          
          {console.log('establishments', this.state.establishments)}
          <Text style={{color: 'white'}}>Latitude: {this.state.lat}</Text>
          <Text style={{color: 'white'}}>Longitude: {this.state.long}</Text>
        </Header>
        <View style={styles.content}>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          <Listing long={this.state.long} lat={this.state.lat} establishments={this.state.establishments} />
        </View>
        <Footer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    
    backgroundColor: 'yellow',
    paddingTop: 22,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  }
})

export default Main;