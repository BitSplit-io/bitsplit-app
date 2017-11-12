import React from 'react';
import { View, Text, StyleSheet, Button, } from 'react-native';
import { RootNavigator } from '../../../config/router';

const styles = StyleSheet.create({
  container: {
    height: 56,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7EC480',
  },
  title: {
    flex: 1,
    color: '#f5fff5',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const Header = (props) => (
  <View style={styles.container}>
    <Button
      onPress={() => ('Refresh')}
      title='Refresh'
    />

    <Text style={styles.title}>Pools</Text>

    <Button
      onPress={() => navigate('Pool')}
      title='New'
    />
  </View>
);

export default Header;
