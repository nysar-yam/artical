import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Avatar, Button, Layout, Text, Divider } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import { HeartIcon, MessageCircleIcon } from '../icons';
import { Ellipse } from 'react-native-svg';

export default class DetailScreen extends Component {
  /**
   * 
   * @param {navigation} param exstend navigation on property
   * 
   */
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Details',
  });

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      item: null,
    };
  }

  /**
   * End Reander and then it will call to function fetchData 
   */
  async componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    /*
      Get data from asyncStorage and set it to state component
      Find matching item and set it to state component
    */

    /**
     * loop data form json
     */

    let data = await AsyncStorage.getItem("data")
    if (data) {
      // convert data for json to object
      let data1 = JSON.parse(data);
      // get Id form navigation
      let item_id = this.props.navigation.state.params.id;
      console.log(item_id);
      /**
       * check data the same it or not
       */
      let matchItem = null;
      data1.forEach(function (value, index) {
        if (value.id == item_id) {
          matchItem = value;
        }
      });
      /**
       * set Item to matchItem
       */
      this.setState({
        data: data1,
        item : matchItem
      })
    }
  }

  // like and dislike on icon heart
  onLike = async (item) => {
    /*
      Toggle likes button when user press on it and also update asyncStorage to keep data refreshing
    */
console.log(item);

    const {data} = this.state;
    console.log(data);
      let newData = data.map((element, index) => {
        if(element.id === item.id){
           element.likes = !element.likes;
           return element;
        }
        return element
        
      });
      console.log(newData);
      
      this.setState({data:newData},
        async () => {
          await AsyncStorage.setItem('data', JSON.stringify(newData))
        }
        );

     
  }

  onComment = (item) => {
    /*
      Navigate to CommentScreen and pass item as param
    */
    this.props.navigation.navigate('Comment',{
      item: item,
    });

  }
  

  render() {
    /** 
     * access to object article
     */
    const item = this.state;
    if (item.item != null) {
      let article = item.item;
      return (
        <Layout style={styles.container}>
          <NavigationEvents
            onWillFocus={this.fetchData}
            data={this.state.data}
            renderItem={this.renderItem}
          />

          <ImageBackground
            style={styles.headerContainer}
            source={{ uri: article.image }}
          >
            <View style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 'rgba(0, 0, 0, 0.45)' },
            ]} />
            <Text
              style={styles.headerTitle}
              category='h1'
              status='control'>
              {article.title}
            </Text>
          </ImageBackground>
          <Layout
            style={styles.contentContainer}
            level='1'>
            <Text>
              {article.content}
            </Text>
          </Layout>
          <Divider />
          <View style={styles.activityContainer}>
            <Avatar source={{ uri: article.avatar }} />
            <View style={styles.authoringInfoContainer}>
              <Text>
                {article.title}
              </Text>
              <Text
                appearance='hint'
                category='p2'>
                {this.state.date}
              </Text>
            </View>
            <Button
               onPress= {() => this.onComment(item.item)}
              style={styles.iconButton}
              appearance='ghost'
              status='basic'
              accessoryLeft={MessageCircleIcon}>
                 {item.item.comments.length}
                </Button>
            <Button
              onPress={() => this.onLike(item.item)}
              style={styles.iconButton}
              appearance='ghost'
              status={item.item.likes? 'danger' : 'basic'}
              accessoryLeft={HeartIcon} />
          </View>
        </Layout>
      );
    }

    return null;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    minHeight: 256,
    paddingVertical: 24,
  },
  headerTitle: {
    textAlign: 'center',
    marginVertical: 24,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  authoringInfoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
