import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

class EstablishmentRow extends Component {

  render() {
    let address = []
    this.props.address1 ? address.push(this.props.address1) : null
    this.props.address2 ? address.push(this.props.address2) : null
    address = address.join(', ')

    // check if the score is a number
    const score = (num) => !isNaN(parseFloat(num)) ? num : 'N'

    return (
      <TouchableHighlight {...this.props}>
        <View style={styles.establishment}>
          <View style={styles.scoreWrap}>
            <Text style={styles.scoreText}>{score(this.props.score)}</Text>
          </View>
          <View style={styles.nameWrap}>
            <Text style={{fontSize: 20, color: 'white'}}>{this.props.name}</Text>
            <Text style={{color: 'white'}}>{address}</Text>
            <Text style={{color: 'white'}}>{this.props.postcode}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

EstablishmentRow.propTypes = {
  address1: PropTypes.string.isRequired,
  address2: PropTypes.string.isRequired,
  postcode: PropTypes.string,
  score: PropTypes.string,
  name: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  establishment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    padding: 8,
    backgroundColor: '#53777A',
    height: 75
  },

  scoreWrap: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    marginTop: 5,
    marginRight: 13,
    marginLeft: 5,
    borderRadius: 100
    
  },
  scoreText: {
    color: '#53777A',
    fontSize: 42,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  nameWrap: {
    flex: 1,
  }
})

export default EstablishmentRow;
