//This is an example code to get Geolocation//
import React, { Component } from 'react';
//import react in our code.
import {
  View,
  Text,
  StyleSheet,
  Image ,
  PermissionsAndroid,
  Platform,
  AppRegistry,
  Dimensions,
  StatusBar,
  Linking,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
//import all the components we are going to use.
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';


export default class Directions extends Component {
  constructor(props) {
  super(props);

  this.state = {
    longitude: 'unknown',//Initial Longitude
    latitude: 'unknown',//Initial Latitude
    error:null,
    concat: null,
    coords:[],
    x: 'false',
    cordLatitude:"41.311587",
    cordLongitude:"-72.929541",
 }

  this.mergeLot = this.mergeLot.bind(this);

}

componentDidMount = () => {
 var that =this;
 //Checking for the permission just after component loaded
 if(Platform.OS === 'ios'){
   this.callLocation(that);
 }else{
   async function requestLocationPermission() {
     try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
           'title': 'Location Access Required',
           'message': 'This App needs to Access your location'
         }
       )
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         //To Check, If Permission is granted
         that.callLocation(that);
       } else {
         alert("Permission Denied");
       }
     } catch (err) {
       alert("err",err);
       console.warn(err)
     }
   }
   requestLocationPermission();
 }
}

mergeLot(){
  if (this.state.latitude != null && this.state.longitude!=null)
   {
     let concatLot = this.state.latitude +","+this.state.longitude
     this.setState({
       concat: concatLot
     }, () => {
       this.getDirections(concatLot, "41.311587,-72.929541");
     });
   }

 }

 async getDirections(startLoc, destinationLoc) {

       try {
           let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
           let respJson = await resp.json();
           let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
           let coords = points.map((point, index) => {
               return  {
                   latitude : point[0],
                   longitude : point[1]
               }
           })
           this.setState({coords: coords})
           this.setState({x: "true"})
           return coords
       } catch(error) {
         console.log('masuk fungsi')
           this.setState({x: "error"})
           return error
       }
   }
callLocation(that){
 //alert("callLocation Called");
   Geolocation.getCurrentPosition(
     //Will give you the current location
      (position) => {
         const currentLongitude = JSON.stringify(position.coords.longitude);
         console.log("Longitude: " + position.coords.longitude)
         //getting the Longitude from the location json
         const currentLatitude = JSON.stringify(position.coords.latitude);
         console.log("Latitude: " + position.coords.latitude);
         //getting the Latitude from the location json
         that.setState({ longitude:currentLongitude });
         //Setting state Longitude to re re-render the Longitude Text
         that.setState({ latitude:currentLatitude });
         //Setting state Latitude to re re-render the Longitude Text
         this.mergeLot();
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
   );
   that.watchID = Geolocation.watchPosition((position) => {
     //Will give you the location on location change
       console.log(position);
       const currentLongitude = JSON.stringify(position.coords.longitude);
       //getting the Longitude from the location json
       const currentLatitude = JSON.stringify(position.coords.latitude);
       //getting the Latitude from the location json
      that.setState({ longitude:currentLongitude });
      //Setting state Longitude to re re-render the Longitude Text
      that.setState({ latitude:currentLatitude });
      //Setting state Latitude to re re-render the Longitude Text
   });
}
componentWillUnmount = () => {
   Geolocation.clearWatch(this.watchID);
}

handleNavigationLink = () => {
  var url = "https://www.google.com/maps/dir/?api=1" +
   "&origin=" + this.state.latitude + "," + this.state.longitude +
   "&destination=" + "Toad's+Place,+300+York+St,+New+Haven,+CT+06511"
  console.log(url)
  Linking.canOpenURL(url).then(supported => {
      if (!supported) {
          console.log('Can\'t handle url: ' + url);
      } else {
          return Linking.openURL(url);
      }
  }).catch(err => console.error('An error occurred', err));
}
render() {
   return (
     <View style={{flex: 1}}>
       <MapView
         style={styles.map}
         initialRegion={{
           latitude:41.311587,
           longitude:-72.929541,
           latitudeDelta: 1,
           longitudeDelta: 1
         }}
         provider={PROVIDER_GOOGLE}
         customMapStyle={mapStyles}
        >

       {!!this.state.latitude && !!this.state.longitude &&
         <MapView.Marker
          coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
          title={"Your Location"}
          image={require('../../assets/images/pin.png')}
        />}

        {!!this.state.cordLatitude && !!this.state.cordLongitude &&
          <MapView.Marker
           coordinate={{"latitude":this.state.cordLatitude,"longitude":this.state.cordLongitude}}
           title={"Your Destination"}
           image={require('../../assets/images/pin.png')}
         />}

        {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' &&
        <MapView.Polyline
             coordinates={this.state.coords}
             strokeWidth={2}
             strokeColor="green"/>
         }

         {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' &&
         <MapView.Polyline
           coordinates={[
               {latitude: this.state.latitude, longitude: this.state.longitude},
               {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
           ]}
           strokeWidth={2}
           strokeColor="green"/>
          }

       </MapView>
       <View style={styles.footer}>
         <View style={styles.leftButtonWrapper}>
           <TouchableOpacity
             style={styles.button}
             onPress={this.handleNavigationLink}
           >
             <Text>NAVIGATE</Text>
           </TouchableOpacity>
         </View>
         <View style={styles.rightButtonWrapper}>
           <TouchableOpacity
             style={styles.button}
             onPress={() => this.handleNavigationLink}
           >
             <Text>VIEW ADDRESS</Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
   )
}
}

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.school",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      },
      {
        "visibility": "on"
      },
      {
        "weight": 8
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }]

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 60,
    flex: 1
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
    height:50,
    width: '100%'
  },
  footer:{
    flex:1
  },
  leftButtonWrapper:{
    bottom: 0,
    left: 0,
    width: '46%',
    position: 'absolute'
  },
  rightButtonWrapper:{
    bottom: 0,
    right: 0,
    width: '46%',
    position: 'absolute'
  }
});
