import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#4b6263',
    width: '100%',
  },
})

const ListSeparator = () => <View style={styles.divider} />

export default ListSeparator
