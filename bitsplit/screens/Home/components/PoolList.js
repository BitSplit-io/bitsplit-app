import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import data from '../../Test/data'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 77,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

const PoolList = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: props.picture.large }} style={styles.photo} />
    <Text style={styles.text}>
      {`${props.name.first} ${props.name.last}`}
    </Text>
  </View>
);

export default PoolList;