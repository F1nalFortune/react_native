import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class AddressScreen extends Component{
  render(){
    return(
      <View>
        <Text>Toad's Place</Text>
        <Text>300 York Street</Text>
        <Text>New Haven, CT 06510</Text>
        <Text>Tel: (203) 624-TOAD</Text>
      </View>
    )
  }
}
