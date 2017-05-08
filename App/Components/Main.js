import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, ListView, RefreshControl } from 'react-native'
import axios from 'axios'

import Header from './Header'
import Spinner from './Spinner'
import EstablishmentRow from './EstablishmentRow'
import Footer from './Footer'

class Main extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      establishments: ds.cloneWithRows([]),
      lat: null,
      long: null,
      error: null,
      isLoading: false
    }

    this.bringPlaces = this.bringPlaces.bind(this)
  }
  
  componentDidMount() {
    this.getPosition()
  }
  
  getPosition() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            lat: position.coords.latitude,
            long: position.coords.longitude,
            ///////////////
            // NEED TO HANDLE ERRORS
            ///////////////
            error: null
          },
          // once lat and long states have been set, use the callback
          // of setState to call the axios search
          this.bringPlaces
        )
      },

      error => this.setState({
        error: error.message
      }),
      
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 5000 },
    );
  }

  bringPlaces() {
    console.log('bringPlaces() called')
    // console.log('lat', this.state.lat)
    // console.log('long', this.state.long)

    this.setState({ isLoading: true })

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

          console.log(response.data.establishments)

          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
          this.setState({
            establishments: ds.cloneWithRows(response.data.establishments),
            error: null,
            isLoading: false
          })
        }

        /////////////////
        // HANDLE ERRORS
        /////////////////

      })
      .catch( er => {
        this.setState({
          error: er
        })
        console.log('error', er)
      })
  }

  render() {
    return (
      <View style={styles.container}>

        <Header>
          <Button
            onPress={this.bringPlaces}
            title={`RELOAD API`}
            color="red"
            accessibilityLabel="refresh" />
          <Text style={{color: 'white'}}>Latitude: {this.state.lat}</Text>
          <Text style={{color: 'white'}}>Longitude: {this.state.long}</Text>
          {/*<Spinner animating={this.state.isLoading} />*/}
        </Header>

        <View style={styles.content}>
          {
            this.state.error &&
              <Text style={styles.errorMsg}>
                {`OH NO!\n ${this.state.error}`}
              </Text>
          }

          <ListView
            enableEmptySections
            refreshControl={ <RefreshControl refreshing={this.state.isLoading} onRefresh={this.bringPlaces.bind(this)} /> }
            dataSource={this.state.establishments}
            renderRow={rowData =>

              <EstablishmentRow 
                key={rowData.FHRSID}
                name={rowData.BusinessName}
                address1={rowData.AddressLine1}
                address2={rowData.AddressLine2}
                postcode={rowData.PostCode}
                score={rowData.RatingValue} />
            
            } />

          {/*<ListingRows long={this.state.long} lat={this.state.lat} establishments={this.state.establishments} />*/}
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
    
    backgroundColor: '#222',
    paddingTop: 22,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  errorMsg: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    padding: 10
  }
})

export default Main;