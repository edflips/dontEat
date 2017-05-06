import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Establishment = props => {
  let address = []
  props.address1 ? address.push(props.address1) : null
  props.address2 ? address.push(props.address2) : null
  props.postcode ? address.push(props.postcode) : null
  address = address.join('\n')

  // check if the score is a number
  const score = (num) => !isNaN(parseFloat(num)) ? num : 'N'

  return (
    <View style={styles.establishment}>
      <View style={styles.scoreWrap}>
        <Text style={styles.scoreText}>{score(props.score)}</Text>
      </View>
      <View style={styles.nameWrap}>
        <Text>{props.name}</Text>
        <Text>{address}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  establishment: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    padding: 8,
    marginBottom: 5,
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

export default Establishment;