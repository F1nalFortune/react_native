import React, { Component } from 'react';
import { Text, View, Image, Dimensions, StyleSheet } from 'react-native';


export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loading:{
    width: Dimensions.get('window').width
  }
})
