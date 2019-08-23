import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
  StyleSheet,
  FlatList
} from 'react-native';
import LoadingScreen from './LoadingScreen';
import cio from 'cheerio-without-node-native';


export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: true
    }
  }
  async componentDidMount(){
    const searchUrl = "http://www.toadsplace.com";
    const response = await fetch(searchUrl);  // fetch page

    const htmlString = await response.text() // get response text
    const $ = cio.load(htmlString);
    var shows = new Array();
    $('.show').each((i, el) => {
      function info(){
        var info = $(el)
          .find('.showinfo')
          .text()
        info = info.split("\n")
        var new_info = []
        for(i=0;i<info.length;i++){
          if(info[i] != ""){
            new_info.push(info[i].replace(/\s\s/g, ""))
          }
        }
        info = new_info
        new_info = []
        for(i=0;i<info.length;i++){
          if(info[i] != ""){
            new_info.push(info[i].replace(/\s\s/g, ""))
          }
        }
        //DELETE /R STRINGS
        info = new_info
        new_info = []
        for(i=0;i<info.length;i++){
          info[i] = info[i].replace("\r", "")
          if(info[i] != ""){
            new_info.push(info[i])
          }
        }
        info = new_info
        // info.pop()
        return info
      }
      function date(){
        var date = $(el)
          .prev()
          .text()
        date = date.split("\n")
        var new_date = []
        for(i=0;i<date.length;i++){
          if(date[i] != ''){
            new_date.push(date[i].replace(/\s/g, ''))
          }
        }
        date = new_date
        date.pop()
        return date
      }
      var show_acts = $(el)
        .find('.showacts')
        .html()
        .replace("\n", "")
        .replace("\t", "")
        .replace("&amp;", "&")
        .replace("&amp;", "&")
        .replace("&apos;", "'")
        .replace("&#xF1;", "ñ")
        .split("<br>")
      var new_acts = []
      var info_links = []
      var cleaned_acts = []
      var starInfo = []
      for (i=0; i<show_acts.length;i++){
        show_acts[i] = show_acts[i].replace("</center>", "")
        if(show_acts[i].replace(/\s/g, "") != ""){
          cleaned_acts.push(show_acts[i].replace(/\s\s/g, ""))
        }
      }
      var show_acts = cleaned_acts
      for(i=0; i<show_acts.length;i++){
        if(show_acts[i].match(/[a-z]/i)
        && !show_acts[i].includes("\n")
        && !show_acts[i].includes("\t")){
          if(show_acts[i].includes("<u>")){
            show_acts[i] = show_acts[i].substr(3)
            show_acts[i] = show_acts[i].substring(0, show_acts[i].length - 5)
          }else if(show_acts[i].includes("<center>")){
            show_acts[i] = show_acts[i].substr(8)
          }
          if(show_acts[i].includes("</a>") || show_acts[i].includes("*")){
            if(show_acts[i].includes("</a>")){
              var string = show_acts[i]
              var href = $('<div>').append(string).find('a').attr('href');
              string = string.replace(/<a\b[^>]*>(.*?)<\/a>/i,"")
              string = string.substring(0, string.length - 3)
              var link = "HERE!"
              var item = {link: link, href: href, text: string}
              info_links.push(item)
            } else if(show_acts[i].includes("*")){
              var string = show_acts[i]
              string = string.replace(/<a\b[^>]*>(.*?)<\/a>/i,"")
              starInfo.push(string)
            }
          } else {
            show_acts[i] = show_acts[i].replace("&amp;", "&").replace("&apos;", "'").replace("&#xF1;", "ñ")
            new_acts.push(show_acts[i])
          }
        }
      }
      show_acts = new_acts
      show_acts.shift()
      var show_date = date();
      show_date.shift();
      const title = $(el)
        .find('strong')
        .text();
      const img = $(el)
        .find('.showimage')
        .find('img')
        .attr('src')
      const information = info()
      const ticket_link = $(el)
        .find('.showinfo')
        .find('a')
        .attr('href')
      var current_show = {
        date: show_date,
        title: title,
        img: img,
        information: information,
        ticket: ticket_link,
        acts: show_acts,
        infoLinks: info_links,
        starInfo: starInfo
      }
      shows.push(current_show)

    })
    this.setState({
      items: shows,
      isLoading: false
    })
    const items = shows
    return { items }
  }
  render(){
    const ColoredLine = ({ color }) => (
      <View
        style={{
          borderBottomColor: color,
          borderBottomWidth: 1
        }}
      />
    );

    if (this.state.isLoading) {
      return <LoadingScreen />;
    }
    return(
      <ScrollView>
        {this.state.items.map(item =>
          <View key={this.state.items.indexOf(item)}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => this.props.navigation.navigate('Details', {item})}
            >
              <View style={styles.imgWrapper}>
                <Image style={styles.img} source={{uri: item.img}}/>
              </View>
              <View style = {styles.wrapper}>
                <View style={styles.dateWrapper}>
                  <Text style= {styles.date}>{item.date[0]}</Text>
                  <Text style= {styles.dateNumber}>{item.date[1]}</Text>
                  <ColoredLine color="green" />
                  <Text style= {styles.date}>{item.date[2]}</Text>
                </View>
                <View style={styles.titleWrapper}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.info}>{item.information[2]}</Text>
                  <Text style={styles.info}>{item.information[3]}</Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.info}>{item.information[4]}</Text>
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('Details', {item})}
              >
                <Text>TICKETS & EVENT DETAILS</Text>
              </TouchableOpacity>
            </View>
          </View>)}
      </ScrollView>
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
   paddingTop: 10
 },
 dateWrapper:{
   paddingTop: 10,
   width: '20%',
   marginLeft: 10,
   paddingRight: 5,
 },
 date:{
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 14,
   fontWeight: 'bold'
 },
 dateNumber:{
   height: 30,
   lineHeight: 30,
   textAlign: 'center',
   textTransform: 'uppercase',
   fontSize: 32
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
   width: '65%'
 },
 title:{
   paddingTop: 5,
   fontWeight: 'bold',
   fontSize: 18
 },
 footer:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 info:{

 },
 buttonContainer:{
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   paddingHorizontal: 10
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
 }
})
