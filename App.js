import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Home from './src/pages/Home'

export default function App() {
  return (
    <>
      <Home></Home>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
