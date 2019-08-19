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
import Dance from './src/components/Dance';
import About from './src/components/About';
import cio from 'cheerio-without-node-native';
import RNCalendarEvents from 'react-native-calendar-events';
import Geolocation from '@react-native-community/geolocation';





export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      cal_auth: ''
    }
  }
  componentWillMount (){
      // iOS
      RNCalendarEvents.authorizationStatus()
       .then(status => {
         // if the status was previous accepted, set the authorized status to state
         this.setState({ cal_auth: status })
         if(status === 'undetermined') {
           // if we made it this far, we need to ask the user for access
           RNCalendarEvents.authorizeEventStore()
           .then((out) => {
             if(out == 'authorized') {
               // set the new status to the auth state
               this.setState({ cal_auth: out })
             }
           })
          }
        })
      .catch(error => console.warn('Auth Error: ', error));
      console.disableYellowBox = true;
    }
  handleAddEvent = (props) => {
    // console.log(JSON.stringify(props,0,2))
    if(this.state.cal_auth == 'authorized'){
      handleCreateDate = (date) => {
        var month = date[0];
        var year = new Date().getFullYear();
        var day = date[1];
        var eventDate = day + " " + month + " " + year;
        return eventDate;
      }
      console.log(handleCreateDate(props.navigation.getParam('item').date))
      handleCreateTime = (time) => {
        //ADD 0 PLACEHOLDER
        var showtime = time.replace("SHOW STARTS @ ", "");
        return showtime
      }
      // console.log(props.navigation.getParam('item').information[3])
      console.log(handleCreateTime(props.navigation.getParam('item').information[3]))

      var eventDate = handleCreateDate(props.navigation.getParam('item').date);
      var eventTime = handleCreateTime(props.navigation.getParam('item').information[3])
      var fullDate = eventDate + " " + eventTime + " UTC";
      var startDate = new Date(fullDate)

      var endDate = eventDate + " " + eventTime + " UTC";
      endDate = new Date(endDate)
      endDate.setHours(endDate.getHours() + 1)
      console.log("Start Date: " + startDate)
      console.log("End Date: " + endDate)
      console.log("Title: " + props.navigation.getParam('item').title)
      Alert.alert(
        'Confirm',
        'Add event to calendar?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            RNCalendarEvents.saveEvent(props.navigation.getParam('item').title, {
              location:"Toad's Place, 300 York St, New Haven CT 06510",
              notes: props.navigation.getParam('item').information[2],
              description: props.navigation.getParam('item').title + " live at Toad's!",
              startDate: startDate.toISOString(),
              endDate: endDate.toISOString(),
              alarm: [{
                date:-1
              }]
            })
            .then(() => {
              Alert.alert(
                'Event Added',
                'Event successfully added to calendar!',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            })
            .catch(error => {
              Alert.alert(
                'Error',
                'Please try again.',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            })
          }},
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Allow Access',
        'To save event please allow access to you calendar.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
            RNCalendarEvents.authorizationStatus()
             .then(status => {
               // if the status was previous accepted, set the authorized status to state
               this.setState({ cal_auth: status })
               if(status === 'undetermined') {
                 // if we made it this far, we need to ask the user for access
                 RNCalendarEvents.authorizeEventStore()
                 .then((out) => {
                   if(out == 'authorized') {
                     // set the new status to the auth state
                     this.setState({ cal_auth: out })
                   }
                 })
                }
              })
            .catch(error => console.warn('Auth Error: ', error));
          }},
        ],
        {cancelable: false},
      );
    }

    }
  render() {
    const DetailsScreen = props => (
      <ScrollView>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{props.navigation.getParam('item').title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.handleAddEvent(props)}
        >
          <View style={styles.imgWrapper}>
            <Image
               width={Dimensions.get('window').width}
               style={styles.image}
               resizeMode={'contain'}   /* <= changed  */
               source={{uri: props.navigation.getParam('item').img }}/>
          </View>
        </TouchableOpacity>
        <View
          style={styles.dateWrapper}>
          <Text
            style={styles.date}>
              {props.navigation.getParam('item').date[2]} \\
              <Text style={{fontWeight: 'bold'}}>
                {props.navigation.getParam('item').date[0]}
                {props.navigation.getParam('item').date[1]}
              </Text>
          </Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.act}>
            {props.navigation.getParam('item').acts.map(act => <Text key={props.navigation.getParam('item').acts.indexOf(act)}>{act}</Text>)}
          </View>
          <View style={styles.info}>
            <Text>{props.navigation.getParam('item').information[0]}</Text>
            <Text>{props.navigation.getParam('item').information[1]}</Text>
            <Text>{props.navigation.getParam('item').information[2]}</Text>
            <Text>{props.navigation.getParam('item').information[3]}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.starDetail}>{props.navigation.getParam('item').starInfo}</Text>
        </View>
        <View style={styles.starDetail}>
          {props.navigation.getParam('item').infoLinks.map(infoLink =>
            <Text
              key={props.navigation.getParam('item').infoLinks.indexOf(infoLink)}
              style={styles.infoLink}
            >
              {infoLink.text}**
            </Text>)}
        </View>
        <View style={styles.footer}>
          <Text>{props.navigation.getParam('item').information[4]}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(props.navigation.getParam('item').ticket)}
          >
            <Text>GET TIX</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.handleAddEvent(props)}
          >
            <Text>ADD EVENT TO CALENDAR</Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
    )

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
      Details: { screen: DetailsScreen }
    });

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
          Directions: { screen: Directions},
          Lillys: { screen: Lillys},
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
          },
          lazy: false
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
