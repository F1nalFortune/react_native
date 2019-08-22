import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';

export default class Lillys extends Component {
  render() {
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1
        }}
      />
    );
    return (
      <ScrollView>
      <View style={styles.imgWrapper}>
      </View>
        <View style={styles.container}>
          <ImageBackground
             style={{width: '100%', resizeMode: 'cover'}}
             source={require("../../assets/images/Lilly/lilly_6.jpg")}
          >
            <Text style={styles.title}>Lilly's Pad</Text>
            <Text style={styles.subtitle}>Available for Private Parties</Text>
            <ColoredLine color="green" />
          </ImageBackground>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('LillysScreen')}
            >
              <Text>Lilly's Pad</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('RainforestScreen')}
            >
              <Text>Rainforest Room</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container:{
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     marginTop: 100
  },
  button:{
    borderColor: 'green',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textTransform: 'uppercase',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  imgWrapper:{
    width: '100%'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: 'bold',
    color: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 1,
    shadowColor: 'black',
    shadowOpacity: 0.8,
  },
})
