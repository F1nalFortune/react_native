import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
  Button
} from 'react-native';
import {withNavigation} from 'react-navigation';

class Item extends Component{
  render(){
    return(

    )
  }
}

const styles = StyleSheet.create ({
 touchable:{
   // justifyContent: 'center',
   // alignItems: 'center',
   borderTopColor: 'green',
   borderStyle: 'solid',
   borderTopWidth: 2,
 },
 wrapper: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'flex-start',
   flexWrap: 'wrap',
   // width: 100,
   paddingTop: 10,
   justifyContent: 'center',
   alignItems: 'center'
 },
 dateWrapper:{
   paddingTop: 10,
   width: '10%'
 },
 date:{
   paddingLeft: 5,
   paddingRight: 5,
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 12
 },
 imgWrapper:{
   width: '90%'
 },
 img:{
   width: '100%',
   height: 200,
   marginTop: 10,
   marginLeft: '5%'
 },
 titleWrapper:{
   width: '45%'
 },
 title:{
   paddingTop: 5
 },
 infoWrapper:{
   width: '20%'
 },
 info:{

 }
})
export default withNavigation(Item);
