import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';


import Establishment from './Establishment';

class Listing extends Component {

  render() {
    // console.log(this.props);
    // console.log(this.state.establishments);

    return (
      <View style={styles.wrap}>
          <ScrollView>

            {this.props.establishments
              .map(
                item =>
                  <Establishment
                    key={item.FHRSID}
                    name={item.BusinessName}
                    address1={item.AddressLine1}
                    address2={item.AddressLine2}
                    postcode={item.PostCode}
                    score={item.RatingValue} />
              )}

          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'red',
    
  }
})

export default Listing;