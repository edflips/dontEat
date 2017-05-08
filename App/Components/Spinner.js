import React, { Component } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Spinner = props =>
  <View style={styles.container}>
    <ActivityIndicator
      animating={props.animating}
      style={styles.activityIndicator}
      size="small"
      color="pink" />
  </View>

Spinner.propTypes = {
  animating: PropTypes.string.isRequired
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
      height: 10
   }
})

export default Spinner