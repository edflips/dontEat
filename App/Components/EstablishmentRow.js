import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'

class EstablishmentRow extends Component {

  handleTouch(event) {
    console.log('touched:', this.props.name)
  }

  render() {
    let address = []
    this.props.address1 ? address.push(this.props.address1) : null
    this.props.address2 ? address.push(this.props.address2) : null
    this.props.postcode ? address.push(this.props.postcode) : null
    address = address.join('\n')

    // check if the score is a number
    const score = (num) => !isNaN(parseFloat(num)) ? num : 'N'

    return (
      <TouchableHighlight onPress={this.handleTouch.bind(this)}>
        <View style={styles.establishment}>
          <View style={styles.scoreWrap}>
            <Text style={styles.scoreText}>{score(this.props.score)}</Text>
          </View>
          <View style={styles.nameWrap}>
            <Text style={{fontSize: 20}}>{this.props.name}</Text>
            <Text>{address}</Text>
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
    marginBottom: 1,
    backgroundColor: 'white'
  },

  scoreWrap: {
    width: 50,
  },
  scoreText: {
    fontSize: 50,
  },

  nameWrap: {
    // flex: 1,
  }
})

export default EstablishmentRow;