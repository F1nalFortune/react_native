import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Alert
} from 'react-native';
import Image from 'react-native-scalable-image';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Calendar from './src/components/Calendar';
import Directions from './src/components/Directions';
import HomeScreen from './src/components/HomeScreen';
import Lillys from './src/components/Lillys';
import LillysCarousel from './src/components/galleries/LillysCarousel';
import RainforestCarousel from './src/components/galleries/RainforestCarousel'
import Dance from './src/components/Dance';
import About from './src/components/About';
import AddressScreen from './src/components/AddressScreen';
import ShowDetails from './src/components/ShowDetails';
import cio from 'cheerio-without-node-native';
import Geolocation from '@react-native-community/geolocation';





export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      cal_auth: ''
    }
  }
  componentWillMount (){

      console.disableYellowBox = true;
  }
  render() {
    const HomeStack = createStackNavigator({
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
          title: "Toad's Place",
          headerStyle: {
            backgroundColor: "#000000cc",
            opacity: .8
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            textShadowColor: "#66ff66",
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
            shadowOpacity: .58,
            textAlign: 'center',
            fontFamily: "Merriweather-Bold",
            textTransform: 'uppercase',
            fontSize: 24,
            padding: 10
          },
          headerBackTitle: "Back"
        }
      },
      About: { screen: About }
    });

    const CalendarStack = createStackNavigator({
      Calendar: {
        screen: Calendar,
        navigationOptions: {
          title: "Toad's Place",
          headerStyle: {
            backgroundColor: "#000000cc",
            opacity: .8
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            textShadowColor: "#66ff66",
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
            shadowOpacity: .58,
            textAlign: 'center',
            fontFamily: "Merriweather-Bold",
            textTransform: 'uppercase',
            fontSize: 24,
            padding: 10
          },
          headerBackTitle: "Events"
        }
      },
      Details: { screen: ShowDetails }
    });

    const LillyStack = createStackNavigator({
      Lillys: {
        screen: Lillys,
        navigationOptions: {
          title: "Toad's Place",
          headerStyle: {
            backgroundColor: "#000000cc",
            opacity: .8
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            textShadowColor: "#66ff66",
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
            shadowOpacity: .58,
            textAlign: 'center',
            fontFamily: "Merriweather-Bold",
            textTransform: 'uppercase',
            fontSize: 24,
            padding: 10
          },
          headerBackTitle: "Back"
        }
      },
      LillysScreen: { screen: LillysCarousel },
      RainforestScreen: { screen: RainforestCarousel }
    });

    const DirectionStack = createStackNavigator({
      Directions: { screen: Directions,
        navigationOptions: {
          title: "Toad's Place",
          headerStyle: {
            backgroundColor: "#000000cc",
            opacity: .8
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            textShadowColor: "#66ff66",
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
            shadowOpacity: .58,
            textAlign: 'center',
            fontFamily: "Merriweather-Bold",
            textTransform: 'uppercase',
            fontSize: 24,
            padding: 10
          },
          headerBackTitle: "Back"
        }
      },
      Address: { screen: AddressScreen }
    })

    const AppContainer = createAppContainer(
      createBottomTabNavigator(
        {
          HomeScreen: {
            screen: HomeStack,
            navigationOptions: {
              title: "Toad's Place",
              headerStyle: {
                backgroundColor: "#000000cc",
                opacity: .8
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                color: "#fff",
                textShadowColor: "#66ff66",
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
                textAlign: 'center',
                fontFamily: "Merriweather-Bold",
                textTransform: 'uppercase',
                fontSize: 24,
                padding: 10
              }
            }
           },
          Calendar: { screen: CalendarStack },
          Directions: { screen: DirectionStack},
          Lillys: { screen: LillyStack},
          Dance: { screen: Dance }
        },
        {
          defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName === 'HomeScreen') {
                iconName = 'home';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
                // We want to add badges to home tab icon
                // IconComponent = HomeIconWithBadge;
              } else if (routeName === 'Calendar') {
                iconName = 'calendar-alt'
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if (routeName === 'Directions'){
                iconName = 'location-arrow';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if (routeName ==='Lillys'){
                iconName = 'glass-martini';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              } else if(routeName ==='Dance'){
                iconName = 'compact-disc';
                icon = <Icon name={iconName} size={30} style={styles.glow}/>
              }
              return icon;
            },
          }),
          tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: 'white',
            inactiveBackgroundColor: 'black',
            activeBackgroundColor: '#272727',
            style:{
              height: 65
            }
          }
        }
      )
    );

    return <AppContainer />;
  }
}

const styles = StyleSheet.create ({
  act:{
    width: '50%'
  },
  bold:{
    fontWeight: 'bold'
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
  center:{
    textAlign: 'center'
  },
  date:{
    fontSize: 24,
    textTransform: 'uppercase'
  },
  dateWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  glow:{
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    padding: 10
  },
  infoLink:{
    textAlign: 'center',
    paddingTop: 10
  },
  info:{
    width: '50%'
  },
  icon:{

  },
  imgWrapper:{
    width: '100%'
  },
  image: {
      flex: 1,
      alignSelf: 'stretch'
  },
  link:{
    color: 'blue',
    zIndex: 100
  },
  starDetail:{
    textAlign: 'center',
    paddingTop: 10,
    position: 'relative'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    color: "#fff",
    textShadowColor: "#66ff66",
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlign: 'center',
    fontFamily: "Merriweather-Bold",
    textTransform: 'uppercase',
    padding:10
  },
  titleWrapper:{
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    // width: 100,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})
