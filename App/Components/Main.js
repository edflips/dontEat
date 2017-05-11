import React, { Component } from 'react'
import { View, StyleSheet, Text, Button, FlatList, RefreshControl } from 'react-native'
import axios from 'axios'

import HeaderMap from './HeaderMap'
import Spinner from './Spinner'
import EstablishmentRow from './EstablishmentRow'
import ListSeparator from './ListSeparator'

class Main extends Component {
  constructor() {
    super();
    this.state = {
      establishments: [],
      lat: null,
      long: null,
      error: null,
      isLoading: false
    }

    this.queryFSAAPI = this.queryFSAAPI.bind(this)
  }
  
  componentDidMount() {
    this.getPosition()
  }
  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getPosition() {
    //////////////////////////
    console.log('requesting position')
    //////////////////////////

    navigator.geolocation.getCurrentPosition(
      position => {},
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    )

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        // var lastPosition = JSON.stringify(position);
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          ///////////////
          // NEED TO HANDLE ERRORS
          ///////////////
          error: null
        })
        this.queryFSAAPI()
    })
  }

  queryFSAAPI() {
    //////////////////////////
    console.log('queryFSAAPI() called')
    //////////////////////////

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
      validateStatus: status => status >= 200 && status < 300
    });

    getPlaces()
      .then( response => {
        // convert latitude and longitude values from strings to floats
        return new Promise( (resolve, reject) => {
          response.data.establishments.forEach( (obj, i) => {
            obj.geocode.latitude = parseFloat(obj.geocode.latitude)
            obj.geocode.longitude = parseFloat(obj.geocode.longitude)
            obj.index = i
          })
          resolve(response)
        })

        /////////////////
        // HANDLE ERRORS ?
        /////////////////

      })
      .then( response => {
        this.setState({
          establishments: response.data.establishments,
          error: null,
          isLoading: false
        })
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
        <HeaderMap lat={this.state.lat} long={this.state.long} establishments={this.state.establishments}/>

        <View style={styles.content}>
          {this.state.error &&
              <Text style={styles.errorMsg}>
                {`OH NO!\n ${this.state.error}`}
              </Text>
          }

          <FlatList
            style={{ flex: 1 }}
            keyExtractor={ (item, index) => item.FHRSID}
            data={this.state.establishments}
            ItemSeparatorComponent={ListSeparator}

            refreshControl={
              <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={this.queryFSAAPI}
                  title="Pull to refresh"
                  tintColor="#fff"
                  titleColor="#fff"
                />
            }
            renderItem={ ({item, index}) =>
              <EstablishmentRow
                onPress={ () => { this.flatListRef.scrollToIndex({animated: true, index: index}) }}
                uid={item.FHRSID}
                name={item.BusinessName}
                address1={item.AddressLine1}
                address2={item.AddressLine2}
                postcode={item.PostCode}
                score={item.RatingValue}
                coords={item.geocode}
                {...this.props} />
            }
            
            ref={ref => this.flatListRef = ref}
            initialScrollIndex={9}
            getItemLayout={
              (data, index) => (
                {length: 101, offset: 101 * index, index}
              )}
            
            {...this.props} />

        </View>
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
    
    backgroundColor: 'deepskyblue',
    paddingTop: 22,
  },
  content: {
    flex: 2,
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