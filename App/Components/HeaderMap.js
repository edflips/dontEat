import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import ListSeparator from './ListSeparator'


class HeaderMap extends Component {
  _onRegionChange() {
    setTimeout(() => {
      console.log('onRegionChange')
    }, 400);
  }

  render() {
    if (this.props.lat && this.props.long) {
      return (
        <View style={styles.container}>
          {console.log(this.props.establishments)}
          <MapView style={styles.map}
            initialRegion={{
              latitude: this.props.lat,
              longitude: this.props.long,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001
            }}
            onRegionChange={this._onRegionChange}>
            
            <Marker key={"currentPosition"} coordinate={{ latitude: this.props.lat, longitude: this.props.long, }}>
              <View style={styles.youMarker}><Text>:P</Text></View>
            </Marker>

            {this.props.establishments.map( marker =>
              <Marker key={marker.FHRSID} coordinate={marker.geocode} title={`${marker.RatingValue} ${marker.BusinessName}`} />
            )}

          </MapView>
{/*
          <View style={{height: 40}}>
            <Text style={{color: 'white'}}>Latitude: {this.props.lat}</Text>
            <Text style={{color: 'white'}}>Longitude: {this.props.long}</Text>
          </View>
*/}
          <ListSeparator />
        </View>
          

      )

    }

    return <View><Text>LOADING</Text></View>

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
    // padding: 20
  },
  map: {
    flex: 1,
    backgroundColor: '#222',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  youMarker: {
    width: 24,
    height: 24,
    backgroundColor: 'yellow',
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
  
})

export default HeaderMap